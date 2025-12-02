// Backend type definitions for NFT Marketplace

export class BlobURL extends Uint8Array {
  getDirectURL(): string {
    const blob = new Blob([this], { type: 'image/*' });
    return URL.createObjectURL(blob);
  }
}

export interface NFT {
  id: string;
  name: string;
  description: string;
  metadata?: string;
  image: BlobURL;
  owner: string;
  forSale: boolean;
  price: bigint;
  createdAt: bigint;
}

export interface NFTInput {
  name: string;
  description: string;
  metadata?: string;
  image: Uint8Array;
}

export type SaleStatus = {
  id: bigint;
  forSale: boolean;
  price?: bigint;
};

export class ExternalBlob {
  private data: Uint8Array;
  private uploadProgressCallback?: (percentage: number) => void;

  constructor(data: Uint8Array) {
    this.data = data;
  }

  static fromBytes(data: Uint8Array): ExternalBlob {
    return new ExternalBlob(data);
  }

  withUploadProgress(callback: (percentage: number) => void): ExternalBlob {
    this.uploadProgressCallback = callback;
    return this;
  }

  async upload(): Promise<void> {
    // Simulate upload progress
    if (this.uploadProgressCallback) {
      for (let i = 0; i <= 100; i += 10) {
        this.uploadProgressCallback(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
  }

  toBytes(): Uint8Array {
    return this.data;
  }
}
