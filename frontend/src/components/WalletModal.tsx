import { useWallet } from '@/hooks/useWallet';
import { X, Wallet as WalletIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WalletModal() {
  const { isModalOpen, closeModal, connectors, connect, isConnecting } = useWallet();

  if (!isModalOpen) return null;

  const getConnectorIcon = (name: string) => {
    // Return appropriate icons based on connector name
    if (name.toLowerCase().includes('metamask')) {
      return '🦊';
    } else if (name.toLowerCase().includes('walletconnect')) {
      return '🔗';
    } else if (name.toLowerCase().includes('coinbase')) {
      return '🔵';
    } else if (name.toLowerCase().includes('injected')) {
      return '💼';
    }
    return '🔌';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeModal}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-background border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Connect Wallet
          </h2>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Connectors */}
        <div className="p-6 space-y-3">
          <p className="text-sm text-muted-foreground mb-4">
            Choose how you want to connect. Supports all EVM-compatible chains.
          </p>
          
          {connectors.map((connector) => (
            <Button
              key={connector.id}
              onClick={() => connect(connector.id)}
              disabled={isConnecting}
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-4 hover:bg-accent/10 hover:border-primary transition-all"
            >
              <span className="text-2xl">{getConnectorIcon(connector.name)}</span>
              <div className="flex flex-col items-start">
                <span className="font-semibold">{connector.name}</span>
                {connector.id === 'walletConnect' && (
                  <span className="text-xs text-muted-foreground">
                    Supports 300+ wallets
                  </span>
                )}
                {connector.id === 'injected' && (
                  <span className="text-xs text-muted-foreground">
                    Browser extension
                  </span>
                )}
                {connector.id === 'coinbaseWalletSDK' && (
                  <span className="text-xs text-muted-foreground">
                    Coinbase Wallet
                  </span>
                )}
              </div>
              {isConnecting && (
                <div className="ml-auto">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </Button>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 bg-accent/5 border-t border-border">
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <WalletIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>
              By connecting a wallet, you agree to our Terms of Service and Privacy Policy.
              Your wallet will work across all supported EVM chains.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
