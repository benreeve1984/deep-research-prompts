import { NextRequest, NextResponse } from 'next/server';
import { Langfuse } from 'langfuse';

export async function POST(req: NextRequest) {
  try {
    const { company } = await req.json();
    const langfuse = new Langfuse({
      publicKey: process.env.LANGFUSE_PUBLIC_KEY,
      secretKey: process.env.LANGFUSE_SECRET_KEY,
      baseUrl: process.env.LANGFUSE_HOST || 'https://cloud.langfuse.com',
    });
    // Get the production prompt
    const prompt = await langfuse.getPrompt('test', undefined, { label: 'production' });
    // Compile the prompt with the company variable
    const compiled = prompt.compile({ company });
    return NextResponse.json({ prompt: compiled });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to fetch or compile prompt', details: errorMessage },
      { status: 500 }
    );
  }
} 