import { createConfig, http } from 'wagmi';
import { 
  mainnet, 
  polygon, 
  arbitrum, 
  optimism, 
  base,
  bsc,
  avalanche,
  fantom,
  gnosis,
  celo,
  moonbeam,
  aurora,
  cronos,
  zkSync,
  polygonZkEvm,
  linea,
  scroll,
  mantle
} from 'wagmi/chains';
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors';

// WalletConnect Project ID - Get one at https://cloud.walletconnect.com
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

// Configure supported chains
export const chains = [
  mainnet,
  polygon,
  arbitrum,
  optimism,
  base,
  bsc,
  avalanche,
  fantom,
  gnosis,
  celo,
  moonbeam,
  aurora,
  cronos,
  zkSync,
  polygonZkEvm,
  linea,
  scroll,
  mantle
] as const;

// Create wagmi config
export const config = createConfig({
  chains: chains,
  connectors: [
    // Injected wallets (MetaMask, Rabby, etc.)
    injected({ 
      shimDisconnect: true,
    }),
    // WalletConnect v2
    walletConnect({
      projectId,
      metadata: {
        name: 'NFT Marketplace',
        description: 'Mint, Trade, and Collect NFTs',
        url: typeof window !== 'undefined' ? window.location.origin : '',
        icons: ['https://avatars.githubusercontent.com/u/37784886']
      },
      showQrModal: true,
    }),
    // Coinbase Wallet
    coinbaseWallet({
      appName: 'NFT Marketplace',
      appLogoUrl: 'https://avatars.githubusercontent.com/u/37784886'
    })
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
    [bsc.id]: http(),
    [avalanche.id]: http(),
    [fantom.id]: http(),
    [gnosis.id]: http(),
    [celo.id]: http(),
    [moonbeam.id]: http(),
    [aurora.id]: http(),
    [cronos.id]: http(),
    [zkSync.id]: http(),
    [polygonZkEvm.id]: http(),
    [linea.id]: http(),
    [scroll.id]: http(),
    [mantle.id]: http(),
  },
});
