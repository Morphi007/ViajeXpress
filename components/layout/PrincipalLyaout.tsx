import Head from 'next/head';
import { FC } from 'react';
import Footer from '../ui/Footer';
import Navbar from '../ui/Navbar';

type Props = {
	children: React.ReactNode;
	title: string;
	imageFullUrl?: string;
};

export const ExpressLayout: FC<Props> = ({ children, title, imageFullUrl }) => {
	return (
		<div className="flex flex-col min-h-screen">
			<Head>
				<title>{title}</title>
				<meta name="description" content={'ViajeXpress'} />
				<meta name="keywords" content="" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="og:title" content={title} />
				<meta name="og:description" content={''} />
				<link rel="icon" href="/favicon.ico" />
				{imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
			</Head>
			<Navbar/>
			<main className="flex-grow">
				{children}
			</main>
			<Footer />
		</div>
	);
};
