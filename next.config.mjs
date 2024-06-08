/** @type {import('next').NextConfig} */
import withVideos from "next-videos";
const nextConfig = {
  reactStrictMode: true,
  images: {
		remotePatterns: [
			{	protocol: 'https',hostname: 'th.bing.com',}
		],
	},
};

export default {
  ...nextConfig,
  ...withVideos(),
};