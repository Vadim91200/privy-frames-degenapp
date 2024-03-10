import { createWalletClient, encodeFunctionData, http } from "viem";
import { mnemonicToAccount } from "viem/accounts";
import { getContract } from 'viem'
import { baseSepolia  } from "viem/chains";
import { ethers, Wallet } from 'ethers';
const { Web3 } = require('web3');
import { LiFi, Route } from '@lifi/sdk'
const switchChainHook = async (requiredChainId: number) => {
    const formatedChainId = "0x" +requiredChainId.toString(16)
    const ethereum = (window as any).ethereum 
    
    if (typeof ethereum === 'undefined') return
    
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: formatedChainId }],
    })
    const newProvider = new ethers.providers.Web3Provider(window.ethereum)

    return newProvider.getSigner()
}
export const performTheLifiSwap = async (address: string) => {
    try{
        const provider = ethers.getDefaultProvider(1);
const signer = Wallet.createRandom().connect(provider);

const account = signer.address;
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
        const updateCallback = (updatedRoute: Route) => {
            console.log('Ping! Everytime a status update is made!')
        }
        const route = await lifi.executeRoute(signer, chosenRoute, { switchChainHook })
        return true;
    }catch (e) {
        console.log(e);
        return false;
    }
}