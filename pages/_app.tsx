import { AuthProvider } from '@/context/auth';
import '@/styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider>
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		</SessionProvider>
	);
}
