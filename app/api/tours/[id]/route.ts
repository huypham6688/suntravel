import { NextRequest, NextResponse } from 'next/server';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '../../../../payload.config';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const config = await configPromise;
        const payload = await getPayloadHMR({ config });
        const { id } = await params;

        const tour = await payload.findByID({
            collection: 'tours',
            id,
        });

        return NextResponse.json({
            success: true,
            tour,
        });
    } catch (error) {
        console.error('Error fetching tour:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Tour not found'
        }, { status: 404 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const config = await configPromise;
        const payload = await getPayloadHMR({ config });
        const { id } = await params;
        const body = await request.json();

        const tour = await payload.update({
            collection: 'tours',
            id,
            data: body,
        });

        return NextResponse.json({
            success: true,
            tour,
        });
    } catch (error) {
        console.error('Error updating tour:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to update tour'
        }, { status: 400 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const config = await configPromise;
        const payload = await getPayloadHMR({ config });
        const { id } = await params;

        await payload.delete({
            collection: 'tours',
            id,
        });

        return NextResponse.json({
            success: true,
            message: 'Tour deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting tour:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to delete tour'
        }, { status: 400 });
    }
}