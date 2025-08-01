import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const today = new Date();

    const activeOffers = await prisma.offer.findMany({
      where: {
        startsAt: { lte: today },
        endsAt: { gte: today },
      },
      include: {
        offerProducts: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log("✅ /api/offers/active was called");

    return NextResponse.json({ success: true, offers: activeOffers });
  } catch (error) {
    console.error('[GET_ACTIVE_OFFERS]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
