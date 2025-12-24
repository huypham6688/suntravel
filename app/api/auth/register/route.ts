import { NextRequest, NextResponse } from 'next/server';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '../../../../payload.config';

export async function POST(request: NextRequest) {
  try {
    const config = await configPromise;
    const payload = await getPayloadHMR({ config });
    const body = await request.json();

    // Kiểm tra số lượng users
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    });

    const isFirstUser = existingUsers.totalDocs === 0;

    // Tạo user mới
    const user = await payload.create({
      collection: 'users',
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
        role: isFirstUser ? 'admin' : 'user',
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Registration failed'
    }, { status: 400 });
  }
}