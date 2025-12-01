const OWNER_ID_KEY = 'nft_marketplace_owner_id';

export function getOwnerId(): string {
  let ownerId = localStorage.getItem(OWNER_ID_KEY);
  
  if (!ownerId) {
    ownerId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    localStorage.setItem(OWNER_ID_KEY, ownerId);
  }
  
  return ownerId;
}

export function clearOwnerId(): void {
  localStorage.removeItem(OWNER_ID_KEY);
}
