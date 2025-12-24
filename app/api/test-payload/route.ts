import { NextResponse } from 'next/server';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '../../../payload.config';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const config = await configPromise;
    const payload = await getPayloadHMR({ config });

    const users = await payload.find({
      collection: 'users',
      limit: 1,
    });

    return NextResponse.json({
      success: true,
      totalUsers: users.totalDocs,
      message: 'Payload is working!',
      config: {
        hasMongoUri: !!config.db,
        hasSecret: !!config.secret,
      }
    });
  } catch (error) {
    console.error('Test API Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}