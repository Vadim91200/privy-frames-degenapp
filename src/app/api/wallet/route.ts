import { errorFrame, parseFrameRequest, getOwnerAddressFromFid, successFrame, createWalletFrame } from '@/lib/farcaster';
import { FrameRequest } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { getWalletFromFidAndPassword } from '@/lib/embedded-wallet';

export async function POST(req: NextRequest): Promise<Response> {
    let frameRequest: FrameRequest | undefined;

    const wallet = await getWalletFromFidAndPassword(123, 'ownerAddress', 'password');
    const embeddedWalletAddress = wallet.address;

    return new NextResponse(createWalletFrame(embeddedWalletAddress));
}

export const dynamic = 'force-dynamic';