import ReactDOM from 'react-dom/client';
import { initEditor } from './hooks/useEditor';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from './lib/wagmi';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initEditor());
} else {
    initEditor();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </WagmiProvider>
);
