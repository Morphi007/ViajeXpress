import { AuthProvider } from '@/context/auth';
import { TicketProvider } from '@/context/auth/TicketContext';
import '@/styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<NextUIProvider>
         <SessionProvider>
			<AuthProvider>
			<TicketProvider>

				<Component {...pageProps} />
			</TicketProvider>
			</AuthProvider>
		</SessionProvider>
		</NextUIProvider>
	);
}
