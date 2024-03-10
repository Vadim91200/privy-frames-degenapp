import { ethers } from 'ethers';

export const getWalletFromFidAndPassword = async (fid: number, ownerAddress: string, password: string) => {
    const privateKey = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(`${fid}${ownerAddress}${password}`));
    const wallet = new ethers.Wallet(privateKey);
    return wallet;
}

