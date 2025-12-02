import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Palette, Plus, Wallet, Store, ChevronDown, Power, Network } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import WalletModal from './WalletModal';
import { getChainName } from '@/lib/utils';
import { useState } from 'react';

export default function Layout() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { 
    isConnected, 
    displayName, 
    openModal, 
    disconnect, 
    chainId,
    chains,
    switchNetwork,
    isConnecting 
  } = useWallet();
  const [showNetworkMenu, setShowNetworkMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-accent/5">
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate({ to: '/' })}
              className="flex items-center gap-3 group transition-transform hover:scale-105"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                <Palette className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col items-start">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  NFT Marketplace
                </h1>
                <p className="text-xs text-muted-foreground">Mint, Trade, Collect</p>
              </div>
            </button>

            <nav className="flex items-center gap-2">
              <Button
                variant={currentPath === '/' ? 'default' : 'ghost'}
                onClick={() => navigate({ to: '/' })}
                className="gap-2"
              >
                <Store className="w-4 h-4" />
                <span className="hidden sm:inline">Explore</span>
              </Button>
              <Button
                variant={currentPath === '/mint' ? 'default' : 'ghost'}
                onClick={() => navigate({ to: '/mint' })}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Mint</span>
              </Button>
              <Button
                variant={currentPath === '/my-nfts' ? 'default' : 'ghost'}
                onClick={() => navigate({ to: '/my-nfts' })}
                className="gap-2"
              >
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline">My NFTs</span>
              </Button>

              {/* Network Selector (when connected) */}
              {isConnected && chainId && (
                <div className="relative">
                  <Button
                    variant="outline"
                    onClick={() => setShowNetworkMenu(!showNetworkMenu)}
                    className="gap-2 hidden md:flex"
                  >
                    <Network className="w-4 h-4" />
                    <span className="text-sm">{getChainName(chainId)}</span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                  
                  {showNetworkMenu && (
                    <>
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setShowNetworkMenu(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                        <div className="p-2">
                          <p className="text-xs text-muted-foreground px-2 py-1 font-semibold">
                            Switch Network
                          </p>
                          {chains.map((chain) => (
                            <button
                              key={chain.id}
                              onClick={() => {
                                switchNetwork(chain.id);
                                setShowNetworkMenu(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors ${
                                chainId === chain.id ? 'bg-accent/50 font-medium' : ''
                              }`}
                            >
                              {chain.name}
                              {chainId === chain.id && (
                                <span className="ml-2 text-xs text-primary">✓</span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Wallet Connection Button */}
              {!isConnected ? (
                <Button
                  onClick={openModal}
                  disabled={isConnecting}
                  className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  <Wallet className="w-4 h-4" />
                  <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
                </Button>
              ) : (
                <div className="relative">
                  <Button
                    variant="outline"
                    onClick={() => setShowAccountMenu(!showAccountMenu)}
                    className="gap-2 border-primary/50"
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="font-mono text-sm">{displayName}</span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                  
                  {showAccountMenu && (
                    <>
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setShowAccountMenu(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50">
                        <button
                          onClick={() => {
                            disconnect();
                            setShowAccountMenu(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-accent transition-colors rounded-lg flex items-center gap-2 text-sm text-destructive"
                        >
                          <Power className="w-4 h-4" />
                          Disconnect
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border/40 backdrop-blur-sm bg-background/80 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © 2025. Built with love using{' '}
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="px-2 py-1 rounded-md bg-accent/20 text-accent-foreground">
                ⚡ Multi-Chain
              </span>
              <span className="px-2 py-1 rounded-md bg-accent/20 text-accent-foreground">
                🔒 Secure
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Wallet Modal */}
      <WalletModal />
    </div>
  );
}
