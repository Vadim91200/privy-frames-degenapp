import { errorFrame, parseFrameRequest, getOwnerAddressFromFid, successFrame } from '@/lib/farcaster';
import { FrameRequest } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { performTheLifiSwap } from '@/lib/swap';
import { getWalletFromFidAndPassword } from '@/lib/embedded-wallet';

export async function POST(req: NextRequest): Promise<Response> {
    let frameRequest: FrameRequest | undefined;
    // Parse and validate request from Frame for fid
    try {
        frameRequest = await req.json();
        if (!frameRequest) throw new Error('Could not deserialize request from frame');
    } catch (e) {
        console.log("It's a fail");
        return new NextResponse(errorFrame);
    }
    const wallet = await getWalletFromFidAndPassword(123, 'address', 'password');
    const tx = await performTheLifiSwap(wallet);
    if (!tx) return new NextResponse(errorFrame);
    return new NextResponse(successFrame);
}

export const dynamic = 'force-dynamic';