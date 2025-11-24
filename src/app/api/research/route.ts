import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { z, ZodError } from "zod";

const prisma = new PrismaClient();

const createJobSchema = z.object({
    topic: z.string().min(1),
    objectives: z.string().min(1),
    audience: z.string().min(1),
    specificQuestions: z.string().optional(),
});

export async function POST(req: Request) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const formData = await req.formData();
        const topic = formData.get('topic') as string;
        const objectives = formData.get('objectives') as string;
        const audience = formData.get('audience') as string;
        const specificQuestions = formData.get('specificQuestions') as string | undefined;
        const file = formData.get('file') as File | null;

        // Validate using Zod
        const { topic: validTopic, objectives: validObjectives, audience: validAudience, specificQuestions: validQuestions } = createJobSchema.parse({
            topic,
            objectives,
            audience,
            specificQuestions
        });

        const job = await prisma.researchJob.create({
            data: {
                userId: session.user.id!,
                topic: validTopic,
                objectives: validObjectives,
                audience: validAudience,
                specificQuestions: validQuestions,
                status: "PENDING",
            },
        });

        // Trigger n8n workflow
        // Assuming N8N_WEBHOOK_URL is in env
        const n8nUrl = process.env.N8N_WEBHOOK_URL;
        if (n8nUrl) {
            // Create FormData for n8n to support file upload
            const n8nFormData = new FormData();
            n8nFormData.append('jobId', job.id);
            n8nFormData.append('topic', validTopic);
            n8nFormData.append('objectives', validObjectives);
            n8nFormData.append('audience', validAudience);
            if (validQuestions) n8nFormData.append('specificQuestions', validQuestions);
            n8nFormData.append('callbackUrl', `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/n8n/complete`);

            if (file && file.size > 0) {
                n8nFormData.append('file', file);
            }

            // Fire and forget (or await if critical)
            fetch(n8nUrl, {
                method: "POST",
                body: n8nFormData,
            }).catch((err) => console.error("Failed to trigger n8n:", err));

            // Update status to PROCESSING immediately
            await prisma.researchJob.update({
                where: { id: job.id },
                data: { status: "PROCESSING" },
            });
        }

        return NextResponse.json(job, { status: 201 });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ error: (error as any).errors }, { status: 400 });
        }
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const jobs = await prisma.researchJob.findMany({
        where: { userId: session.user.id! },
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(jobs);
}
