import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z, ZodError } from "zod";

const prisma = new PrismaClient();

const callbackSchema = z.object({
    jobId: z.string(),
    status: z.enum(["COMPLETED", "FAILED"]),
    resultUrl: z.string().optional(),
    error: z.string().optional(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { jobId, status, resultUrl, error } = callbackSchema.parse(body);

        // Optional: Verify secret if passed in headers
        // const secret = req.headers.get("x-webhook-secret");
        // if (secret !== process.env.WEBHOOK_SECRET) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await prisma.researchJob.update({
            where: { id: jobId },
            data: {
                status,
                resultUrl: status === "COMPLETED" ? resultUrl : null,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ error: (error as any).errors }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
