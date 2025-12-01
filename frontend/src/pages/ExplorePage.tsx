import { useGetNFTsForSale } from '../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingCart, Eye, Sparkles } from 'lucide-react';

export default function ExplorePage() {
  const { data: nfts, isLoading } = useGetNFTsForSale();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Discover Unique NFTs</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Explore Marketplace
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Browse and purchase unique digital collectibles from creators around the world
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
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
              className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-border/50 hover:border-primary/50"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={nft.image.getDirectURL()}
                  alt={nft.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1 text-lg">{nft.name}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {nft.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Price</span>
                  <Badge variant="secondary" className="font-mono">
                    {nft.price ? `${nft.price.toString()} ICP` : 'N/A'}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2"
                  onClick={() => navigate({ to: '/nft/$nftId', params: { nftId: nft.id.toString() } })}
                >
                  <Eye className="w-4 h-4" />
                  View
                </Button>
                <Button
                  size="sm"
                  className="flex-1 gap-2"
                  onClick={() => navigate({ to: '/nft/$nftId', params: { nftId: nft.id.toString() } })}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Buy
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <ShoppingCart className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">No NFTs Listed</h3>
          <p className="text-muted-foreground mb-6">
            Be the first to mint and list an NFT for sale!
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
