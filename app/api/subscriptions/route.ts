import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-utils';

export async function GET(req: NextRequest) {
  try {
    // This will automatically check authentication and return 401 if not authenticated
    const user = await requireAuth(req);

    // If we get here, the user is authenticated
    return NextResponse.json({
      message: 'Protected subscriptions data',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // This will automatically check authentication and return 401 if not authenticated
    const user = await requireAuth(req);

    const body = await req.json();

    // Process the subscription data here
    // For now, just return a success message
    return NextResponse.json({
      message: 'Subscription created successfully',
      user: user.name,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
