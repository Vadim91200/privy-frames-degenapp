import { ethers } from 'ethers';
import { LiFi } from '@lifi/sdk';

const switchChainHook = async (requiredChainId: number) => {
    const infuraUrl = 'https://mainnet.infura.io/v3/34767e2742004b759dda09e31e8d60b2';
    const newProvider = new ethers.providers.JsonRpcProvider(infuraUrl);
    return newProvider.getSigner()
}

export const performTheLifiSwap = async (wallet: ethers.Wallet) => {
    try{
        const infuraUrl = 'https://mainnet.infura.io/v3/34767e2742004b759dda09e31e8d60b2';
        const provider = new ethers.providers.JsonRpcProvider(infuraUrl);
        const signer = wallet.connect(provider);
        const lifi = new LiFi({
            integrator: 'Your dApp/company name'
        })
        const routeOptions = {
            slippage: 3 / 100, // 3%
            order: 'RECOMMENDED' as const,
            allowSwitchChain: false
        }
        const routesRequest = {
            fromChainId: 137,
            fromAmount: '1000000000000', // 1USDT
            fromTokenAddress: '0x0000000000000000000000000000000000000000',
            toChainId: 137,
            toTokenAddress: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
            options: routeOptions,
        }
        const result = await lifi.getRoutes(routesRequest)
        const routes = result.routes
        const chosenRoute = routes[0]
        const route = await lifi.executeRoute(signer, chosenRoute, { switchChainHook })
        return true;
    }catch (e) {
        console.log(e);
        return false;
    }
}