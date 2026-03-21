import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { urlSchema } from "@/lib/schema/url";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const body = await request.json();
    const result = urlSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
        }

    try {
            const shortId = nanoid(8);
            let createdById: string | undefined;

            if (userEmail) {
                const user = await prisma.user.findUnique({
                    where: { email: userEmail },
                    select: { id: true },
                });

                if (!user) {
                    return NextResponse.json({ error: "User not found" }, { status: 404 });
                }

                createdById = user.id;
            }

            await prisma.url.create({
                data: {
                    shortId,
                    redirectUrl: result.data.url,
                    ...(createdById ? { createdById } : {}),
                },
            });

            return NextResponse.json({ shortId });
    } catch (error) {
            console.log("error in generating new short url", error);
            return NextResponse.json({ error: "error in generating short url" }, { status: 500 });
    }
}
