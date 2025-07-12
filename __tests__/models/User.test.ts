import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';

describe('User Model', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it('should create and save a user successfully', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123',
    };
    const user = new User(userData);
    const savedUser = await user.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.role).toBe('member');
    expect(savedUser.emailVerified).toBe(false);
    expect(savedUser.password).not.toBe(userData.password); // Should be hashed
  });

  it('should not save user with invalid email', async () => {
    const user = new User({
      name: 'Test User',
      email: 'invalid-email',
      password: 'Password123',
    });
    await expect(user.save()).rejects.toThrow();
  });

  it('should not save user with weak password', async () => {
    const user = new User({
      name: 'Test User',
      email: 'test2@example.com',
      password: 'weak',
    });
    await expect(user.save()).rejects.toThrow();
  });

  it('should hash the password before saving', async () => {
    const user = new User({
      name: 'Test User',
      email: 'test3@example.com',
      password: 'Password123',
    });
    await user.save();
    expect(await bcrypt.compare('Password123', user.password)).toBe(true);
  });

  it('should compare passwords correctly', async () => {
    const user = new User({
      name: 'Test User',
      email: 'test4@example.com',
      password: 'Password123',
    });
    await user.save();
    expect(await user.comparePassword('Password123')).toBe(true);
    expect(await user.comparePassword('WrongPassword')).toBe(false);
  });

  it('should increment login attempts and lock account after 5 failed attempts', async () => {
    const user = new User({
      name: 'Test User',
      email: 'test5@example.com',
      password: 'Password123',
    });
    await user.save();
    for (let i = 0; i < 5; i++) {
      await user.incrementLoginAttempts();
      await user.reload();
    }
    const updatedUser = await User.findById(user._id);
    expect(updatedUser!.loginAttempts).toBeGreaterThanOrEqual(5);
    expect(updatedUser!.lockUntil).toBeInstanceOf(Date);
    expect(updatedUser!.isLocked).toBe(true);
  });

  it('should reset login attempts and update lastLoginAt', async () => {
    const user = new User({
      name: 'Test User',
      email: 'test6@example.com',
      password: 'Password123',
    });
    await user.save();
    await user.incrementLoginAttempts();
    await user.incrementLoginAttempts();
    await user.resetLoginAttempts();
    const updatedUser = await User.findById(user._id);
    expect(updatedUser!.loginAttempts).toBe(0);
    expect(updatedUser!.lockUntil).toBeNull();
    expect(updatedUser!.lastLoginAt).toBeInstanceOf(Date);
  });

  it('should find user by email (case insensitive)', async () => {
    const user = new User({
      name: 'Test User',
      email: 'test7@example.com',
      password: 'Password123',
    });
    await user.save();
    const found = await (User as any).findByEmail('TEST7@EXAMPLE.COM');
    expect(found).not.toBeNull();
    expect(found.email).toBe('test7@example.com');
  });

  it('should find active users', async () => {
    const user1 = new User({
      name: 'User1',
      email: 'active1@example.com',
      password: 'Password123',
    });
    const user2 = new User({
      name: 'User2',
      email: 'active2@example.com',
      password: 'Password123',
    });
    await user1.save();
    await user2.save();
    // Lock user2
    user2.lockUntil = new Date(Date.now() + 2 * 60 * 60 * 1000);
    await user2.save();
    // Only user1 should be active
    const activeUsers = await (User as any).findActive();
    expect(activeUsers.length).toBe(1);
    expect(activeUsers[0].email).toBe('active1@example.com');
  });
});
