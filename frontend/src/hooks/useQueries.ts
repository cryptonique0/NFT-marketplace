import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { NFT, NFTInput, SaleStatus } from '../backend';

export function useGetAllNFTs() {
  const { actor, isFetching } = useActor();

  return useQuery<NFT[]>({
    queryKey: ['nfts', 'all'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllNFTs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetNFTsForSale() {
  const { actor, isFetching } = useActor();

  return useQuery<NFT[]>({
    queryKey: ['nfts', 'for-sale'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNFTsForSale();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetNFTsByOwner(owner: string) {
  const { actor, isFetching } = useActor();

  return useQuery<NFT[]>({
    queryKey: ['nfts', 'owner', owner],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNFTsByOwner(owner);
    },
    enabled: !!actor && !isFetching && !!owner,
  });
}

export function useGetNFT(id: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<NFT | null>({
    queryKey: ['nfts', 'detail', id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getNFT(id.toString());
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useMintNFT() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: NFTInput) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.mintNFT(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nfts'] });
    },
  });
}

export function useSetSaleStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (status: SaleStatus) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.setSaleStatus(status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nfts'] });
    },
  });
}

export function usePurchaseNFT() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (nftId: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.purchaseNFT(nftId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nfts'] });
    },
  });
}
