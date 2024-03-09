import { createWalletClient, encodeFunctionData, http } from "viem";
import { mnemonicToAccount } from "viem/accounts";
import { getContract } from 'viem'
import { baseSepolia  } from "viem/chains";
const { ethers } = require('ethers');
const { Web3 } = require('web3');
import { providers } from 'ethers'
 
const provider = new providers.Web3Provider(window.ethereum)
 
const [address] = await provider.listAccounts()
const signer = provider.getSigner(address)

const NFT_WALLET_MNEMONIC = process.env.NFT_WALLET_MNEMONIC as string;
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS as `0x${string}`; // Optimism Sepolia Testnet


export const performTheLifiSwap = async () => {
    const lifi = new LiFi({
        integrator: 'Your dApp/company name'
    })
    const routeOptions = {
        slippage: 3 / 100, // 3%
        order: 'RECOMMENDED' as const
    }

    const routesRequest = {
        fromChainId: 100,
        fromAmount: '1000000', // 1USDT
        fromTokenAddress: '0x4ecaba5870353805a9f068101a40e0f32ed605c6',
        toChainId: 56,
        toTokenAddress: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
        options: routeOptions,
    }

    const result = await lifi.getRoutes(routesRequest)
    const routes = result.routes
    const chosenRoute = routes[0]

    const updateCallback = (updatedRoute: Route) => {
        console.log('Ping! Everytime a status update is made!')
    }

    // executing a route
    const route = await lifi.executeRoute(signer, chosenRoute, {...updateCallback})
}
