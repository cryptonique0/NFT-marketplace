import { useAccount, useConnect, useDisconnect, useEnsName, useChainId, useSwitchChain } from 'wagmi';
import { useEffect, useState } from 'react';
import { formatAddress } from '@/lib/utils';

export function useWallet() {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();
  const { connect, connectors, error: connectError, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const chainId = useChainId();
  const { switchChain, chains, error: switchError } = useSwitchChain();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto-close modal on successful connection
  useEffect(() => {
    if (isConnected) {
      setIsModalOpen(false);
    }
  }, [isConnected]);

  const connectWallet = async (connectorId?: string) => {
    try {
      const connector = connectorId 
        ? connectors.find(c => c.id === connectorId)
        : connectors[0];
      
      if (connector) {
        await connect({ connector });
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnectWallet = () => {
    disconnect();
    setIsModalOpen(false);
  };

  const switchNetwork = async (chainId: number) => {
    try {
      await switchChain({ chainId });
    } catch (error) {
      console.error('Failed to switch network:', error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return {
    // Connection state
    address,
    isConnected,
    isConnecting: isConnecting || isReconnecting || isPending,
    displayName: ensName || (address ? formatAddress(address) : undefined),
    
    // Chain state
    chainId,
    chains,
    
    // Actions
    connect: connectWallet,
    disconnect: disconnectWallet,
    switchNetwork,
    
    // Modal state
    isModalOpen,
    openModal,
    closeModal,
    
    // Available connectors
    connectors,
    
    // Errors
    error: connectError || switchError,
  };
}
