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

    // Parse the request body
    const body = await req.json();
    const { promptName = 'test', ...variables } = body;
    
    console.log(`Initializing Langfuse to fetch prompt "${promptName}" with variables:`, variables);

    const langfuse = new Langfuse({
      publicKey: process.env.LANGFUSE_PUBLIC_KEY,
      secretKey: process.env.LANGFUSE_SECRET_KEY,
      baseUrl: process.env.LANGFUSE_HOST || 'https://cloud.langfuse.com',
    });

    // Get the production prompt with the specified name
    const prompt = await langfuse.getPrompt(promptName, undefined, { label: 'production' });
    
    console.log(`Prompt "${promptName}" fetched successfully, compiling with variables:`, variables);
    // Compile the prompt with the provided variables
    const compiled = prompt.compile(variables);
    
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