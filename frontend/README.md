# NFT Marketplace with WalletConnect Integration

A multi-chain NFT marketplace supporting all EVM-compatible blockchains through WalletConnect.

## Features

### 🔗 Multi-Chain Support
- Supports 19+ EVM chains including:
  - Ethereum Mainnet
  - Polygon
  - Arbitrum
  - Optimism
  - Base
  - BNB Chain
  - Avalanche
  - Fantom
  - And many more!

### 💼 Wallet Integration
- **WalletConnect v2**: Connect with 300+ wallets
- **MetaMask**: Browser extension support
- **Coinbase Wallet**: Native integration
- **Injected Wallets**: Support for Rabby, Brave Wallet, etc.

### 🎨 NFT Features
- Mint NFTs with custom metadata
- Browse marketplace listings
- Buy and sell NFTs
- Manage your NFT collection

## Setup Instructions

### 1. Get WalletConnect Project ID

1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Create a new project
3. Copy your Project ID

### 2. Configure Environment Variables

```bash
cd frontend
cp .env.example .env
```

Edit `.env` and add your WalletConnect Project ID:
```
VITE_WALLETCONNECT_PROJECT_ID=your_actual_project_id
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Layout.tsx          # Main layout with wallet UI
│   │   ├── WalletModal.tsx     # Wallet connection modal
│   │   └── ui/                 # UI components
│   ├── hooks/
│   │   └── useWallet.ts        # Wallet connection hook
│   ├── lib/
│   │   ├── wagmi.ts            # Wagmi/WalletConnect config
│   │   └── utils.ts            # Helper functions
│   └── pages/                  # App pages
├── package.json
└── vite.config.ts
```

## Usage

### Connecting a Wallet

1. Click "Connect Wallet" button in the header
2. Choose your preferred wallet provider:
   - **Injected**: Use MetaMask or other browser extensions
   - **WalletConnect**: Scan QR code with mobile wallet
   - **Coinbase Wallet**: Connect with Coinbase Wallet
3. Approve the connection in your wallet

### Switching Networks

1. Once connected, click the network name in the header
2. Select your desired chain from the dropdown
3. Approve the network switch in your wallet

### Disconnecting

1. Click your address in the header
2. Select "Disconnect"

## Supported Chains

| Chain | Chain ID | RPC |
|-------|----------|-----|
| Ethereum | 1 | Public RPC |
| Polygon | 137 | Public RPC |
| Arbitrum | 42161 | Public RPC |
| Optimism | 10 | Public RPC |
| Base | 8453 | Public RPC |
| BNB Chain | 56 | Public RPC |
| Avalanche | 43114 | Public RPC |
| Fantom | 250 | Public RPC |
| Gnosis | 100 | Public RPC |
| Celo | 42220 | Public RPC |
| Moonbeam | 1284 | Public RPC |
| Aurora | 1313161554 | Public RPC |
| Harmony | 1666600000 | Public RPC |
| Cronos | 25 | Public RPC |
| zkSync | 324 | Public RPC |
| Polygon zkEVM | 1101 | Public RPC |
| Linea | 59144 | Public RPC |
| Scroll | 534352 | Public RPC |
| Mantle | 5000 | Public RPC |

## Technologies Used

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool
- **Wagmi**: React hooks for Ethereum
- **Viem**: TypeScript Ethereum library
- **WalletConnect**: Multi-wallet support
- **TanStack Router**: Routing
- **TanStack Query**: Data fetching
- **Tailwind CSS**: Styling

## Development

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Troubleshooting

### Connection Issues

If you're having trouble connecting:

1. Make sure your wallet is unlocked
2. Check that you have the correct network selected
3. Clear your browser cache and try again
4. Verify your WalletConnect Project ID is correct

### Network Switching Issues

If network switching fails:

1. Some wallets may not support automatic network switching
2. Manually switch networks in your wallet
3. Refresh the page

## License

MIT
