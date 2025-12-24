import { NextRequest, NextResponse } from 'next/server';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '../../../payload.config';

export async function GET(request: NextRequest) {
    try {
        const config = await configPromise;
        const payload = await getPayloadHMR({ config });

        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');

        const where: any = {};
        if (category) {
            where.category = { equals: category };
        }

        const tours = await payload.find({
            collection: 'tours',
            where,
            page,
            limit,
            sort: '-createdAt',
        });

        return NextResponse.json({
            success: true,
            docs: tours.docs,
            totalDocs: tours.totalDocs,
            totalPages: tours.totalPages,
            page: tours.page,
        });
    } catch (error) {
        console.error('Error fetching tours:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch tours'
        }, { status: 500 });
    }
}

// app/api/tours/route.ts
export async function POST(request: NextRequest) {
    try {
        const config = await configPromise;
        const payload = await getPayloadHMR({ config });
        const body = await request.json();

        console.log('📨 Received body:', JSON.stringify(body, null, 2));
        console.log('📋 Checking required fields...');

        // Check các trường required
        const requiredFields = [
            'title', 'location', 'category', 'region', 'duration',
            'price', 'rating', 'reviews', 'image', 'description',
            'highlights', 'itinerary', 'includes', 'excludes',
            'gallery', 'departureDate'
        ];

        const missingFields = requiredFields.filter(field => !body[field]);
        if (missingFields.length > 0) {
            console.log('❌ Missing fields:', missingFields);
            return NextResponse.json({
                success: false,
                error: `Missing required fields: ${missingFields.join(', ')}`
            }, { status: 400 });
        }

        console.log('✅ All required fields present');
        console.log('🚀 Creating tour...');

        const tour = await payload.create({
            collection: 'tours',
            data: body,
        });

        console.log('✅ Tour created successfully:', tour.id);

        return NextResponse.json({
            success: true,
            tour,
        });
    } catch (error) {
        console.error('❌ Error creating tour:', error);

        // Log chi tiết error
        if (error instanceof Error) {
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
        }

        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create tour',
            errorDetails: error
        }, { status: 400 });
    }
}