import { NextRequest, NextResponse } from 'next/server';
import { Langfuse } from 'langfuse';

export async function POST(req: NextRequest) {
  try {
    // Check if environment variables are set
    if (!process.env.LANGFUSE_PUBLIC_KEY || !process.env.LANGFUSE_SECRET_KEY) {
      console.error('Langfuse API keys not found in environment variables');
      return NextResponse.json(
        { error: 'Server configuration error: Langfuse API keys not found' },
        { status: 500 }
      );
    }

    const { company } = await req.json();
    console.log('Initializing Langfuse with config:', { 
      publicKeyExists: !!process.env.LANGFUSE_PUBLIC_KEY,
      secretKeyExists: !!process.env.LANGFUSE_SECRET_KEY,
      baseUrl: process.env.LANGFUSE_HOST || 'https://cloud.langfuse.com'
    });

    const langfuse = new Langfuse({
      publicKey: process.env.LANGFUSE_PUBLIC_KEY,
      secretKey: process.env.LANGFUSE_SECRET_KEY,
      baseUrl: process.env.LANGFUSE_HOST || 'https://cloud.langfuse.com',
    });

    console.log('Fetching prompt "test" with label "production"');
    // Get the production prompt
    const prompt = await langfuse.getPrompt('test', undefined, { label: 'production' });
    
    console.log('Prompt fetched successfully, compiling with company:', company);
    // Compile the prompt with the company variable
    const compiled = prompt.compile({ company });
    
    return NextResponse.json({ prompt: compiled });
  } catch (error: unknown) {
    console.error('Langfuse API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to fetch or compile prompt', details: errorMessage },
      { status: 500 }
    );
  }
} 