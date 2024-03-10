import { errorFrame, parseFrameRequest, getOwnerAddressFromFid, successFrame } from '@/lib/farcaster';
import { FrameRequest } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { performTheLifiSwap } from '@/lib/swap';
import { createOrFindEmbeddedWalletForFid } from '@/lib/embedded-wallet';

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

    const {fid, isValid} = await parseFrameRequest(frameRequest);
    console.log("And I don't know why")
    if (!fid || !isValid) return new NextResponse(errorFrame);
    
    const address = req.url.split('/').slice(-1)[0];
    console.log("I would like", address)
    if (typeof address !== 'string') return new NextResponse(errorFrame);
    
    // Airdrop NFT to the user's wallet
    const tx = await performTheLifiSwap(address);
    if (!tx) return new NextResponse(errorFrame);

    return new NextResponse(successFrame);
}

export const dynamic = 'force-dynamic';