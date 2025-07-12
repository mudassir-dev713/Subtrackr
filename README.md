# 🚀 SubTrackr - Subscription Management Platform

A modern, secure, and scalable subscription management platform built with Next.js 15, TypeScript, and MongoDB.

## ✨ Features

- 🔐 **Secure Authentication** - NextAuth.js with role-based access control
- 📊 **Dashboard Analytics** - Real-time subscription insights and cost tracking
- 👥 **Team Collaboration** - Multi-user support with role management
- 🔔 **Smart Notifications** - Renewal reminders and cost alerts
- 📱 **Responsive Design** - Mobile-first approach with modern UI
- ⚡ **High Performance** - Optimized for speed and scalability
- 🛡️ **Enterprise Security** - Comprehensive security measures

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Backend**: Next.js API Routes, MongoDB with Mongoose
- **Authentication**: NextAuth.js with JWT
- **Database**: MongoDB with connection pooling
- **Performance**: Turbo, Image optimization, Bundle analysis

### Security Features

- Rate limiting on all API endpoints
- Input validation and sanitization
- CSRF protection
- XSS prevention
- Secure password hashing
- Account lockout protection
- Content Security Policy headers

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- MongoDB instance

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/subtrackr.git
   cd subtrackr
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your configuration:

   ```env
   MONGODB_URI=mongodb://localhost:27017/subtrackr
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
subtrackr/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── login/            # Authentication pages
│   └── signup/
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature components
├── lib/                  # Utility libraries
│   ├── auth.ts           # Authentication utilities
│   ├── db.js             # Database connection
│   ├── security.ts       # Security utilities
│   └── performance.ts    # Performance monitoring
├── models/               # MongoDB models
├── types/                # TypeScript type definitions
├── styles/               # Global styles
└── public/               # Static assets
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server with Turbo
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run type-check       # TypeScript type checking
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting

# Testing
npm run test             # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate test coverage

# Performance
npm run analyze          # Analyze bundle size
npm run clean            # Clean build artifacts

# Database
npm run db:seed          # Seed database with sample data
npm run db:migrate       # Run database migrations
```

## 🛡️ Security Features

### Authentication & Authorization

- **Multi-factor authentication** support
- **Role-based access control** (Owner, Member, Admin)
- **Session management** with secure JWT tokens
- **Account lockout** after failed login attempts
- **Password strength validation**

### API Security

- **Rate limiting** on all endpoints
- **Input validation** with Zod schemas
- **SQL injection prevention** (MongoDB query sanitization)
- **XSS protection** with input sanitization
- **CSRF protection** with token validation

### Infrastructure Security

- **Security headers** (HSTS, CSP, X-Frame-Options)
- **Content Security Policy** implementation
- **Secure cookie settings**
- **Environment variable validation**

## ⚡ Performance Optimizations

### Frontend Performance

- **Next.js 15** with App Router
- **Turbo** for faster builds
- **Image optimization** with WebP/AVIF support
- **Font optimization** with display swap
- **Bundle analysis** and code splitting
- **Lazy loading** for components

### Backend Performance

- **Database connection pooling**
- **Query optimization** with indexes
- **Caching strategies**
- **Rate limiting** to prevent abuse
- **Response compression**

### Monitoring

- **Performance metrics** tracking
- **Memory usage** monitoring
- **Error tracking** and logging
- **Health checks** for services

## 🧪 Testing

### Test Coverage

- **Unit tests** for utilities and components
- **Integration tests** for API routes
- **E2E tests** for critical user flows
- **Performance tests** for key operations

### Running Tests

```bash
npm run test              # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

## 📊 Database Schema

### User Model

```typescript
interface User {
  name: string;
  email: string;
  password: string;
  role: 'owner' | 'member' | 'admin';
  emailVerified: boolean;
  lastLoginAt: Date;
  loginAttempts: number;
  lockUntil: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Subscription Model (Planned)

```typescript
interface Subscription {
  name: string;
  description: string;
  amount: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: Date;
  status: 'active' | 'cancelled' | 'paused';
  category: string;
  assignedTo: User[];
  team: Team;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Docker

```bash
# Build image
docker build -t subtrackr .

# Run container
docker run -p 3000:3000 subtrackr
```

### Environment Variables

```env
# Required
MONGODB_URI=mongodb://localhost:27017/subtrackr
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-secret-key

# Optional
NEXT_PUBLIC_APP_URL=https://your-domain.com
GOOGLE_SITE_VERIFICATION=your-verification-code
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Wiki](https://github.com/your-username/subtrackr/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-username/subtrackr/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/subtrackr/discussions)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - UI components
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [MongoDB](https://www.mongodb.com/) - Database

---

Made with ❤️ by the Mudassir
