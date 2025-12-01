import OrderedMap "mo:base/OrderedMap";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  let storage = Storage.new();
  include MixinStorage(storage);

  transient let nftMap = OrderedMap.Make<Nat>(Nat.compare);
  transient let textMap = OrderedMap.Make<Text>(Text.compare);

  var nextNftId = 0;
  var nfts : OrderedMap.Map<Nat, NFT> = nftMap.empty();
  var ownerIndex : OrderedMap.Map<Text, [Nat]> = textMap.empty();

  type NFT = {
    id : Nat;
    name : Text;
    description : Text;
    metadata : ?Text;
    image : Storage.ExternalBlob;
    owner : Text;
    forSale : Bool;
    price : ?Nat;
  };

  public type NFTInput = {
    name : Text;
    description : Text;
    metadata : ?Text;
    image : Storage.ExternalBlob;
    owner : Text;
  };

  public type NFTUpdate = {
    id : Nat;
    name : Text;
    description : Text;
    metadata : ?Text;
  };

  public type SaleStatus = {
    id : Nat;
    forSale : Bool;
    price : ?Nat;
  };

  public func mintNFT(input : NFTInput) : async Nat {
    let id = nextNftId;
    nextNftId += 1;

    let nft : NFT = {
      id;
      name = input.name;
      description = input.description;
      metadata = input.metadata;
      image = input.image;
      owner = input.owner;
      forSale = false;
      price = null;
    };

    nfts := nftMap.put(nfts, id, nft);

    switch (textMap.get(ownerIndex, input.owner)) {
      case (null) {
        ownerIndex := textMap.put(ownerIndex, input.owner, [id]);
      };
      case (?existing) {
        ownerIndex := textMap.put(ownerIndex, input.owner, Array.append(existing, [id]));
      };
    };

    id;
  };

  public query func getNFT(id : Nat) : async ?NFT {
    nftMap.get(nfts, id);
  };

  public query func getAllNFTs() : async [NFT] {
    Iter.toArray(nftMap.vals(nfts));
  };

  public query func getNFTsByOwner(owner : Text) : async [NFT] {
    switch (textMap.get(ownerIndex, owner)) {
      case (null) { [] };
      case (?ids) {
        let ownedNFTs = Iter.toArray(
          Iter.map(
            Iter.fromArray(ids),
            func(id : Nat) : NFT {
              switch (nftMap.get(nfts, id)) {
                case (null) { Debug.trap("NFT not found") };
                case (?nft) { nft };
              };
            },
          )
        );
        ownedNFTs;
      };
    };
  };

  public query func getNFTsForSale() : async [NFT] {
    let forSale = Iter.toArray(
      Iter.filter(
        nftMap.vals(nfts),
        func(nft : NFT) : Bool {
          nft.forSale;
        },
      )
    );
    forSale;
  };

  public func updateNFT(input : NFTUpdate) : async () {
    switch (nftMap.get(nfts, input.id)) {
      case (null) { Debug.trap("NFT not found") };
      case (?nft) {
        let updatedNFT : NFT = {
          id = nft.id;
          name = input.name;
          description = input.description;
          metadata = input.metadata;
          image = nft.image;
          owner = nft.owner;
          forSale = nft.forSale;
          price = nft.price;
        };
        nfts := nftMap.put(nfts, input.id, updatedNFT);
      };
    };
  };

  public func setSaleStatus(status : SaleStatus) : async () {
    switch (nftMap.get(nfts, status.id)) {
      case (null) { Debug.trap("NFT not found") };
      case (?nft) {
        let updatedNFT : NFT = {
          id = nft.id;
          name = nft.name;
          description = nft.description;
          metadata = nft.metadata;
          image = nft.image;
          owner = nft.owner;
          forSale = status.forSale;
          price = status.price;
        };
        nfts := nftMap.put(nfts, status.id, updatedNFT);
      };
    };
  };

  public func purchaseNFT(nftId : Nat, buyer : Text) : async () {
    switch (nftMap.get(nfts, nftId)) {
      case (null) { Debug.trap("NFT not found") };
      case (?nft) {
        if (not nft.forSale) {
          Debug.trap("NFT is not for sale");
        };

        let updatedNFT : NFT = {
          id = nft.id;
          name = nft.name;
          description = nft.description;
          metadata = nft.metadata;
          image = nft.image;
          owner = buyer;
          forSale = false;
          price = null;
        };

        nfts := nftMap.put(nfts, nftId, updatedNFT);

        // Update owner index
        switch (textMap.get(ownerIndex, buyer)) {
          case (null) {
            ownerIndex := textMap.put(ownerIndex, buyer, [nftId]);
          };
          case (?existing) {
            ownerIndex := textMap.put(ownerIndex, buyer, Array.append(existing, [nftId]));
          };
        };
      };
    };
  };
};

