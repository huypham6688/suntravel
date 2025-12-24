  import { NextRequest, NextResponse } from 'next/server';
  import { getPayloadHMR } from '@payloadcms/next/utilities';
  import configPromise from '../../../../payload.config';

  export async function POST(request: NextRequest) {
    try {
      const config = await configPromise;
      const payload = await getPayloadHMR({ config });
      const body = await request.json();

      const result = await payload.login({
        collection: 'users',
        data: {
          email: body.email,
          password: body.password,
        },
      });

      return NextResponse.json({
        success: true,
        token: result.token,
        user: result.user,
      });
    } catch (error) {
      console.error('Login error:', error);
      return NextResponse.json({
        success: false,
        error: error instanceof Error ? error.message : 'Login failed'
      }, { status: 401 });
    }
  }