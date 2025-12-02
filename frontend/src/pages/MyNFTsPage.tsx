import { useGetNFTsByOwner, useSetSaleStatus } from '../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useState } from 'react';
import { Eye, Tag, X, Wallet, Sparkles } from 'lucide-react';
import { getOwnerId } from '../lib/owner';

export default function MyNFTsPage() {
  const ownerId = getOwnerId();
  const { data: nfts, isLoading } = useGetNFTsByOwner(ownerId);
  const setSaleStatus = useSetSaleStatus();
  const navigate = useNavigate();
  const [selectedNFT, setSelectedNFT] = useState<string | null>(null);
  const [price, setPrice] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleListForSale = async () => {
    if (!selectedNFT) return;

    const priceValue = parseInt(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    try {
      await setSaleStatus.mutateAsync({
        id: BigInt(selectedNFT),
        forSale: true,
        price: BigInt(priceValue),
      });
      toast.success('NFT listed for sale!');
      setDialogOpen(false);
      setPrice('');
      setSelectedNFT(null);
    } catch (error) {
      console.error('Error listing NFT:', error);
      toast.error('Failed to list NFT for sale');
    }
  };

  const handleUnlist = async (nftId: string) => {
    try {
      await setSaleStatus.mutateAsync({
        id: BigInt(nftId),
        forSale: false,
        price: undefined,
      });
      toast.success('NFT unlisted from sale');
    } catch (error) {
      console.error('Error unlisting NFT:', error);
      toast.error('Failed to unlist NFT');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary">
          <Wallet className="w-4 h-4" />
          <span className="text-sm font-medium">Your Collection</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          My NFTs
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage your digital collectibles and list them for sale
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="w-full aspect-square" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : nfts && nfts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {nfts.map((nft) => (
            <Card
              key={nft.id.toString()}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-border/50"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={nft.image.getDirectURL()}
                  alt={nft.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {nft.forSale && (
                  <Badge className="absolute top-3 right-3 bg-primary shadow-lg">
                    For Sale
                  </Badge>
                )}
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1 text-lg">{nft.name}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {nft.description}
                </p>
              </CardHeader>
              <CardContent>
                {nft.forSale && nft.price > 0n && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Listed Price</span>
                    <Badge variant="secondary" className="font-mono">
                      {nft.price.toString()} ICP
                    </Badge>
                  </div>
                )}
              </CardContent>
              <CardFooter className="gap-2 flex-col">
                <div className="flex gap-2 w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => navigate({ to: '/nft/$nftId', params: { nftId: nft.id.toString() } })}
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  {nft.forSale ? (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1 gap-2"
                      onClick={() => handleUnlist(nft.id)}
                      disabled={setSaleStatus.isPending}
                    >
                      <X className="w-4 h-4" />
                      Unlist
                    </Button>
                  ) : (
                    <Dialog open={dialogOpen && selectedNFT === nft.id} onOpenChange={(open: boolean) => {
                      setDialogOpen(open);
                      if (open) {
                        setSelectedNFT(nft.id);
                      } else {
                        setSelectedNFT(null);
                        setPrice('');
                      }
                    }}>
                      <Button size="sm" className="flex-1 gap-2" onClick={() => {
                        setDialogOpen(true);
                        setSelectedNFT(nft.id);
                      }}>
                        <Tag className="w-4 h-4" />
                        List
                      </Button>
                      <DialogContent onClose={() => {
                        setDialogOpen(false);
                        setSelectedNFT(null);
                        setPrice('');
                      }}>
                        <DialogHeader>
                          <DialogTitle>List NFT for Sale</DialogTitle>
                          <DialogDescription>
                            Set a price for your NFT. Buyers will be able to purchase it at this price.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="price">Price (ICP)</Label>
                            <Input
                              id="price"
                              type="number"
                              placeholder="Enter price"
                              value={price}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
                              min="1"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setDialogOpen(false);
                              setPrice('');
                              setSelectedNFT(null);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleListForSale}
                            disabled={setSaleStatus.isPending}
                          >
                            {setSaleStatus.isPending ? 'Listing...' : 'List for Sale'}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <Wallet className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">No NFTs Yet</h3>
          <p className="text-muted-foreground mb-6">
            Start your collection by minting your first NFT
          </p>
          <Button onClick={() => navigate({ to: '/mint' })} className="gap-2">
            <Sparkles className="w-4 h-4" />
            Mint Your First NFT
          </Button>
        </div>
      )}
    </div>
  );
}
