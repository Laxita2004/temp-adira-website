import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
    const today = new Date();

    const activeOffers = await prisma.offer.findMany({
      where: {
        startDate: { lte: today },
        endDate: { gte: today },
      },
      include: {
        saleProducts: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(activeOffers);
  } catch (error) {
    console.error('[GET_ACTIVE_OFFERS]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}