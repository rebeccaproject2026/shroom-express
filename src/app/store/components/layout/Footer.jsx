import React from 'react';
import NewsletterForm from './NewsletterForm';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import shroomLogo from "../../assets/images/Logo.png";
import { AlertTriangle } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white pt-12 md:pt-16 pb-8 font-sans border-t border-[#F4F1F0]">
            <div className="w-full max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16">

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12 mb-12">

                    {/* Column 1: Logo & Info */}
                    <div className="lg:col-span-3">
                        <Link to="/store" className="inline-block mb-6">
                            <img src={shroomLogo} alt="Shroom Express" className="h-16 md:h-20 w-auto" />
                        </Link>
                        <p className="text-sm text-[#886663] tracking-normal leading-relaxed mb-6 font-normal max-w-sm">
                            The world's premium marketplace for legal cannabis and functional fungi.
                            Elevating wellness through quality and transparency.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-[#F4F1F0] flex items-center justify-center text-[var(--store-primary)] hover:bg-[var(--store-primary)] hover:text-white transition-all transform hover:-translate-y-1">
                                <Icon icon="hugeicons:new-twitter" width="22" height="22" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[#F4F1F0] flex items-center justify-center text-[var(--store-primary)] hover:bg-[var(--store-primary)] hover:text-white transition-all transform hover:-translate-y-1">
                                <Icon icon="iconoir:pinterest" width="22" height="22" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[#F4F1F0] flex items-center justify-center text-[var(--store-primary)] hover:bg-[var(--store-primary)] hover:text-white transition-all transform hover:-translate-y-1">
                                <Icon icon="hugeicons:reddit" width="22" height="22" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-bold text-[#181211] uppercase tracking-wider mb-6">Quick Links</h3>
                        <ul className="space-y-4 text-[#886663] text-sm font-normal">
                            <li><Link to="#" className="hover:text-[var(--store-primary)] transition-colors">About Us</Link></li>
                            <li><Link to="#" className="hover:text-[var(--store-primary)] transition-colors">Contact Us</Link></li>
                            <li><Link to="/store/myaccount" className="hover:text-[var(--store-primary)] transition-colors">My Account</Link></li>
                            <li><Link to="#" className="hover:text-[var(--store-primary)] transition-colors">Cannabis FAQ</Link></li>
                            <li><Link to="#" className="hover:text-[var(--store-primary)] transition-colors">Mushroom FAQ</Link></li>
                            <li><Link to="/store/track-order" className="hover:text-[var(--store-primary)] transition-colors">Track Your Order</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Knowledge Center */}
                    <div className="lg:col-span-2">
                        <h3 className="text-[14px] font-bold text-[#181211] uppercase tracking-wider mb-6">Knowledge Center</h3>
                        <ul className="space-y-4 text-[#886663] text-sm font-normal">
                            <li><Link to="#" className="hover:text-[var(--store-primary)] transition-colors">What to Expect</Link></li>
                            <li><Link to="#" className="hover:text-[var(--store-primary)] transition-colors">Mushroom Strains</Link></li>
                            <li><Link to="#" className="hover:text-[var(--store-primary)] transition-colors">Choosing Your Product</Link></li>
                            <li><Link to="#" className="hover:text-[var(--store-primary)] transition-colors">Cannabis vs. Psilocybin</Link></li>
                            <li><Link to="#" className="hover:text-[var(--store-primary)] transition-colors">Psilocybin Dosage Guide</Link></li>
                            <li><Link to="#" className="hover:text-[var(--store-primary)] transition-colors">Safe Microdosing Practices</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div className="md:col-span-2 lg:col-span-5">
                        <div className="bg-[#181211] rounded-2xl p-8 lg:p-10 w-full lg:w-[90%] xl:w-[85%] lg:ml-auto flex flex-col justify-center shadow-xl shadow-black/5">
                            <h3 className="text-sm font-bold text-white uppercase tracking-[2.5px] mb-3">Industry Insights</h3>
                            <p className="text-sm font-light text-white/80 leading-relaxed mb-8">
                                Receive professional updates on regulatory changes and new product research.
                            </p>
                            <NewsletterForm />
                        </div>
                    </div>
                </div>

                {/* Legal Disclaimer Box */}
                <div className="bg-[#E93E2B]/5 rounded-2xl p-5 md:p-6 mb-10 border border-[#E93E2B]/10 max-w-full">
                    <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                        <AlertTriangle className="text-[var(--store-primary)] shrink-0 w-6 h-6 sm:mt-0.5" strokeWidth={2.5} />
                        <p className="text-sm text-[#333333] leading-relaxed font-medium">
                            <strong className="text-[#181211] font-bold uppercase mr-1">Legal Disclaimer:</strong >
                            19+ ONLY (or applicable provincial age requirement). Cannabis and certain mushroom products are subject to federal and provincial laws in Canada. Please consult your local regulations before purchasing. Shroom Express sells cannabis and mushroom products in accordance with applicable Canadian laws. Keep out of reach of children and pets. Do not operate a vehicle or heavy machinery after consumption.
                        </p>
                    </div>
                </div>

                {/* Bottom Footer Area */}
                <div className="border-t border-[#F4F1F0] pt-8 flex flex-col lg:flex-row justify-between items-center gap-6 text-center lg:text-left">
                    <p className="text-[11px] text-[#886663] font-semibold order-2 lg:order-1">
                        &copy; {new Date().getFullYear()} ShroomExpress. All Rights Reserved. Must be 19+ to enter.
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 order-1 lg:order-2">
                        <Link to="#" className="text-[11px] font-bold text-[#886663] hover:text-[var(--store-primary)] uppercase tracking-wider transition-colors">Terms of Service</Link>
                        <Link to="#" className="text-[11px] font-bold text-[#886663] hover:text-[var(--store-primary)] uppercase tracking-wider transition-colors">Privacy Policy</Link>
                        <Link to="#" className="text-[11px] font-bold text-[#886663] hover:text-[var(--store-primary)] uppercase tracking-wider transition-colors">Compliance</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
