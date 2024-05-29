import { NextResponse } from "next/server";

export async function GET() {
    const env = process.env.ENV;
    return new NextResponse(env, {
        status: 200,
        headers: {
            'Content-Type': 'text/plain'
        }
    });
    // return NextResponse.json({env});
}