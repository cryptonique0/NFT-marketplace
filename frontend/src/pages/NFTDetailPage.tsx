import { useGetNFT, usePurchaseNFT } from '../hooks/useQueries';
import { useNavigate, useParams } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { ArrowLeft, ShoppingCart, User, Tag, FileText, Sparkles } from 'lucide-react';
import { getOwnerId } from '../lib/owner';

export default function NFTDetailPage() {
  const { nftId } = useParams({ from: '/nft/$nftId' });
  const navigate = useNavigate();
  const purchaseNFT = usePurchaseNFT();
  const ownerId = getOwnerId();

  const nftIdBigInt = nftId ? BigInt(nftId) : null;
  const { data: nft, isLoading } = useGetNFT(nftIdBigInt);

  const handlePurchase = async () => {
    if (!nft || !nftIdBigInt) return;

    if (nft.owner === ownerId) {
      toast.error('You cannot purchase your own NFT');
      return;
    }

    if (!nft.forSale) {
      toast.error('This NFT is not for sale');
      return;
    }

    try {
      await purchaseNFT.mutateAsync(nftIdBigInt.toString());
      toast.success('NFT purchased successfully!');
      navigate({ to: '/my-nfts' });
    } catch (error) {
      console.error('Error purchasing NFT:', error);
      toast.error('Failed to purchase NFT');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Skeleton className="h-10 w-32 mb-8" />
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="w-full aspect-square rounded-lg" />
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!nft) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">NFT Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The NFT you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate({ to: '/' })}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Explore
        </Button>
      </div>
    );
  }

  const isOwner = nft.owner === ownerId;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Button
        variant="ghost"
        onClick={() => navigate({ to: '/' })}
        className="mb-6 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Explore
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative">
          <div className="aspect-square rounded-lg overflow-hidden bg-muted shadow-2xl border border-border/50">
            <img
              src={nft.image.getDirectURL()}
              alt={nft.name}
              className="w-full h-full object-cover"
            />
          </div>
          {nft.forSale && (
            <Badge className="absolute top-4 right-4 bg-primary shadow-lg text-base px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              For Sale
            </Badge>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {nft.name}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {nft.description}
            </p>
          </div>

          <Separator />

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Owner
                </span>
                <Badge variant="outline" className="font-mono">
                  {isOwner ? 'You' : `${nft.owner.slice(0, 8)}...${nft.owner.slice(-6)}`}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Token ID
                </span>
                <Badge variant="outline" className="font-mono">
                  #{nft.id.toString()}
                </Badge>
              </div>

              {nft.forSale && nft.price > 0n && (
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm font-medium">Price</span>
                  <Badge className="text-lg px-4 py-2 font-mono">
                    {nft.price.toString()} ICP
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {nft.metadata && (
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Additional Metadata</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {nft.metadata}
                </p>
              </CardContent>
            </Card>
          )}

          {nft.forSale && !isOwner && (
            <Button
              size="lg"
              className="w-full gap-2 text-lg py-6"
              onClick={handlePurchase}
              disabled={purchaseNFT.isPending}
            >
              {purchaseNFT.isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Purchase for {nft.price?.toString()} ICP
                </>
              )}
            </Button>
          )}

          {isOwner && (
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">You Own This NFT</CardTitle>
                <CardDescription>
                  Manage this NFT from your collection page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate({ to: '/my-nfts' })}
                >
                  Go to My NFTs
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
