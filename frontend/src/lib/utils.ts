import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string, chars: number = 4): string {
  if (!address) return '';
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
}

export function getChainName(chainId: number): string {
  const chainNames: Record<number, string> = {
    1: 'Ethereum',
    137: 'Polygon',
    42161: 'Arbitrum',
    10: 'Optimism',
    8453: 'Base',
    56: 'BNB Chain',
    43114: 'Avalanche',
    250: 'Fantom',
    100: 'Gnosis',
    42220: 'Celo',
    1284: 'Moonbeam',
    1313161554: 'Aurora',
    25: 'Cronos',
    324: 'zkSync',
    1101: 'Polygon zkEVM',
    59144: 'Linea',
    534352: 'Scroll',
    5000: 'Mantle',
  };
  return chainNames[chainId] || `Chain ${chainId}`;
}
