# NFT Marketplace Specification

## Overview
A simple NFT marketplace where users can mint, list, and trade NFTs without authentication or real payments. All transactions are simulated and free.

## Core Features

### NFT Minting
- Users can create NFTs by uploading an image file
- Required fields: name, description
- Optional metadata field for additional information
- Each minted NFT is automatically assigned to the creator as owner

### NFT Trading
- Users can list their owned NFTs for sale by setting a price
- Users can browse all listed NFTs in the marketplace
- Users can purchase listed NFTs through simulated transactions
- Successful purchases transfer ownership to the buyer
- Purchased NFTs are automatically removed from sale listings

### NFT Management
- Users can view all NFTs they have minted
- Users can manage the sale status of their owned NFTs (list/unlist)
- Users can view detailed information about any NFT

## Pages Required
- **Explore Page**: Browse all NFTs currently listed for sale
- **Mint Page**: Create new NFTs by uploading images and metadata
- **My NFTs Page**: View and manage self-minted NFTs
- **NFT Detail Page**: View individual NFT information and purchase options

## Backend Data Storage
The backend must store NFT data including:
- Image file (uploaded by user)
- NFT name and description
- Optional metadata
- Current owner identifier
- Sale status (available/not for sale)
- Sale price (when listed)
- Unique NFT identifier

## Backend Operations
- Store uploaded NFT images and metadata
- Track NFT ownership changes
- Manage NFT sale listings and status updates
- Process simulated purchase transactions
- Retrieve NFT data for browsing and detail views
- Filter NFTs by owner for management views
