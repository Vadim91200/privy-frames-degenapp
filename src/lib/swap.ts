import { ethers } from 'ethers';
import { LiFi } from '@lifi/sdk';

const switchChainHook = async (requiredChainId: number) => {
    const infuraUrl = 'https://polygon-mainnet.infura.io/v3/21d658c695324ea4a9005dfa835ba7fc';
    const newProvider = new ethers.providers.JsonRpcProvider(infuraUrl);
    return newProvider.getSigner()
}

export const performTheLifiSwap = async (wallet: ethers.Wallet) => {
    try{
        const infuraUrl = 'https://polygon-mainnet.infura.io/v3/21d658c695324ea4a9005dfa835ba7fc';
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
            fromAmount: '100000000000000', // 1USDT
            fromTokenAddress: '0x0000000000000000000000000000000000000000',
            toChainId: 137,
            toTokenAddress: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
            options: routeOptions,
        }
        const result = await lifi.getRoutes(routesRequest)
        const routes = result.routes
        console.log(routes);
        const chosenRoute = routes[0]
        console.log('we are ready');
        const route = await lifi.executeRoute(signer, chosenRoute, { switchChainHook })
        console.log('It is done');
        return true;
    }catch (e) {
        alert(e);
        console.log(e);
        return false;
    }
}