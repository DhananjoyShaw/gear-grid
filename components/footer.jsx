import React from "react";

const IconGitHub = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 21.13V25" /></svg>
);

const IconTwitter = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9.09 9.09 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.67 1.64 1.15c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.94 3.65A4.48 4.48 0 0 1 .96 6.1v.06c0 2.13 1.52 3.91 3.54 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.72 2.16 2.97 4.07 3A9.05 9.05 0 0 1 0 19.54a12.8 12.8 0 0 0 6.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.41-.02-.61A9.22 9.22 0 0 0 23 3z" /></svg>
);

const IconInstagram = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" /><circle cx="17" cy="7" r="1.5" fill="currentColor" /></svg>
);

const IconFacebook = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 2.5h-2.5A4.5 4.5 0 0 0 10 7v3H7v4h3v8h4v-8h3l1-4h-4V7a1.5 1.5 0 0 1 1.5-1.5H17V2.5z"/></svg>
);


const Footer = () => {
    return (
        <footer className="bg-slate-50">
            <div className="container mx-auto px-6 pt-10">

                {/* Footer top section */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-10">

                    {/* Logo & Tagline */}
                    <div className="md:w-1/3">
                        <span className="text-3xl font-bold text-slate-900 tracking-tight">GearGrid</span>
                        <p className="mt-2 text-sm text-slate-800 max-w-xl">
                            A modern, full-stack car marketplace built with Next.js 15, featuring AI-powered image search, test drive bookings, and comprehensive car management. GearGrid provides an intuitive platform for users to discover, save, and test drive vehicles with advanced search capabilities.
                        </p>
                    </div>

                    {/* Links & Socials Container */}
                    <div className="flex flex-col sm:flex-row gap-10 sm:gap-16">

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-base font-semibold text-slate-900 uppercase tracking-wider">Quick Links</h3>
                            <ul className="mt-4 text-sm space-y-1">
                                <li><a href="#about" className="text-slate-800 hover:text-blue-600 transition-colors">About</a></li>
                                <li><a href="#contact" className="text-slate-800 hover:text-blue-600 transition-colors">Browse</a></li>
                                <li><a href="#contact" className="text-slate-800 hover:text-blue-600 transition-colors">Contacts</a></li>
                                <li><a href="#privacy" className="text-slate-800 hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                            </ul>
                        </div>

                        {/* Follow Us */}
                        <div>
                            <h3 className="text-base font-semibold text-slate-900 uppercase tracking-wider">Follow Us</h3>
                            <div className="flex justify-center md:justify-start mt-4 space-x-3">
                                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:text-slate-900 transition-all hover:scale-110">
                                    <IconGitHub />
                                </a>
                                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:text-blue-500 transition-all hover:scale-110">
                                    <IconTwitter />
                                </a>
                                <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:text-pink-500 transition-all hover:scale-110">
                                    <IconInstagram />
                                </a>
                                <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:text-blue-700 transition-all hover:scale-110">
                                    <IconFacebook />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer bottom section with copyright */}
                <div className="m-8 pt-8 border-t border-slate-200">
                    <p className="text-center text-sm text-slate-700">
                        &copy; {new Date().getFullYear()} GearGrid. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

