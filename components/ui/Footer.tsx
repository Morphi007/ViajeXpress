import { IoCarOutline, IoLogoFacebook, IoLogoTwitter, IoLogoYoutube } from 'react-icons/io5';

const Footer = () => {
	return (
		<footer className="footer p-1 bg-blue-500 text-white text-center ">
    <div className="mb-4">
        <svg className="mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="50" height="50">
		<IoCarOutline size={24} />

	    </svg>
        <h2 className="text-2xl font-bold">ViajeXpress Ltd.</h2>
        <p className="font-semibold">seguro </p>
    </div>
    <div className="flex justify-center space-x-6">
        <a href="https://twitter.com" aria-label="Twitter" title="Twitter">
            <IoLogoTwitter size={24} />
        </a>
        <a href="https://youtube.com" aria-label="YouTube" title="YouTube">
            <IoLogoYoutube size={24} />
        </a>
        <a href="https://facebook.com" aria-label="Facebook" title="Facebook">
            <IoLogoFacebook size={24} />
        </a>
    </div>
    <p className="mb-4">Copyright © 2024 - All rights reserved</p>
</footer>
	);
};

export default Footer;
