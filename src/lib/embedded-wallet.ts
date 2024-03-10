import { ethers } from 'ethers';

export const getWalletFromFidAndPassword = async (fid: number, ownerAddress: string, password: string) => {
    const private_key = process.env.NEXT_PUBLIC_PRIVATE_KEY;
    const wallet = new ethers.Wallet(private_key!);
    return wallet;
}

