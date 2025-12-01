import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Layout from './components/Layout';
import ExplorePage from './pages/ExplorePage';
import MintPage from './pages/MintPage';
import MyNFTsPage from './pages/MyNFTsPage';
import NFTDetailPage from './pages/NFTDetailPage';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: ExplorePage,
});

const mintRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/mint',
  component: MintPage,
});

const myNFTsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/my-nfts',
  component: MyNFTsPage,
});

const nftDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/nft/$nftId',
  component: NFTDetailPage,
});

const routeTree = rootRoute.addChildren([indexRoute, mintRoute, myNFTsRoute, nftDetailRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
