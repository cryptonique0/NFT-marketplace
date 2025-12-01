import type { PropsWithChildren } from 'react';

// Placeholder provider to keep existing API surface without IC auth.
export function InternetIdentityProvider({ children }: PropsWithChildren) {
  return children as any;
}
