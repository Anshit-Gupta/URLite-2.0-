import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const urls = await prisma.url.findMany({
      where: { createdById: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { visitHistory: true },
        },
        visitHistory: {
          select: { timeStamp: true },
          orderBy: { timeStamp: "desc" },
          take: 1,
        },
      },
    });

    const totalClicks = urls.reduce((sum, url) => sum + url._count.visitHistory, 0);

    const items = urls.map((url) => ({
      id: url.id,
      shortId: url.shortId,
      redirectUrl: url.redirectUrl,
      createdAt: url.createdAt,
      totalClicks: url._count.visitHistory,
      lastVisitedAt: url.visitHistory[0]?.timeStamp ?? null,
    }));

    return NextResponse.json({
      totals: {
        urls: urls.length,
        clicks: totalClicks,
      },
      items,
    });
  } catch (error) {
    console.error("Error fetching analytics", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
