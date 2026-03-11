import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import shroomLogo from "../../assets/images/Logo.png";
import { AlertTriangle } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-[#E8E8E8] mt-16 pt-12 pb-8 font-sans">
            <div className="container mx-auto px-12">

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-12 ">

                    {/* Column 1: Logo & Info */}
                    <div className="md:col-span-12 lg:col-span-3">
                        <Link to="/store" className="inline-block mb-5">
                            <img src={shroomLogo} alt="Shroom Express" className="h-20 w-auto" />
                        </Link>
                        <p className="text-sm text-[#886663] tracking-normal leading-relaxed mb-5 font-normal w-[85%]">
                            The world's premium marketplace for legal cannabis and functional fungi.
                            Elevating wellness through quality and transparency.
                        </p>
                        <div className="flex items-center gap-3.5">
                            <a href="#" className="w-10 h-10 rounded-full bg-[#F4F1F0] flex items-center justify-center text-[var(--store-primary)] hover:bg-[var(--store-primary)] hover:text-white transition-colors">
                                <Icon icon="hugeicons:new-twitter" width="24" height="24" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[#F4F1F0] flex items-center justify-center text-[var(--store-primary)] hover:bg-[var(--store-primary)] hover:text-white transition-colors">
                                <Icon icon="iconoir:pinterest" width="24" height="24" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[#F4F1F0] flex items-center justify-center text-[var(--store-primary)] hover:bg-[var(--store-primary)] hover:text-white transition-colors">
                                <Icon icon="hugeicons:reddit" width="24" height="24" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="md:col-span-6 lg:col-span-2 ">
                        <h3 className="text-sm font-bold text-[#181211] uppercase tracking-wider mb-6 whitespace-nowrap">Quick Links</h3>
                        <ul className="space-y-4 text-[#886663] text-sm font-normal whitespace-nowrap">
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                            <li><Link to="/my-account">My Account</Link></li>
                            <li><Link to="/faq-cannabis" >Cannabis FAQ</Link></li>
                            <li><Link to="/faq-mushroom" >Mushroom FAQ</Link></li>
                            <li><Link to="/track-order">Track Your Order</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Knowledge Center */}
                    <div className="md:col-span-6 lg:col-span-2 lg:ml-16">
                        <h3 className="text-[14px] font-bold text-[#181211] uppercase tracking-wider mb-6 whitespace-nowrap">Knowledge Center</h3>
                        <ul className="space-y-4 text-[#886663] text-sm font-normal whitespace-nowrap">
                            <li><Link to="/expect" >What to Expect</Link></li>
                            <li><Link to="/strains">Mushroom Strains</Link></li>
                            <li><Link to="/choosing" >Choosing Your Product</Link></li>
                            <li><Link to="/vs" >Cannabis vs. Psilocybin</Link></li>
                            <li><Link to="/dosage" >Psilocybin Dosage Guide</Link></li>
                            <li><Link to="/microdosing">Safe Microdosing Practices</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div className="md:col-span-10 lg:col-span-5">
                        <div className="bg-[#181211] rounded-[12px] p-8 h-[90%] w-[72%] ml-auto flex flex-col justify-center">
                            <h3 className="text-sm font-bold text-white uppercase tracking-[2.5px] mb-2">Industry Insights</h3>
                            <p className="text-sm font-light text-[#FFFFFF] leading-relaxed mb-6">
                                Receive professional updates on regulatory changes and new product research.
                            </p>
                            <form className="flex flex-col gap-3">
                                <input
                                    type="email"
                                    placeholder="Corporate Email"
                                    className="w-full px-4 py-3.5 rounded-md bg-[#2A2A2A] text-white text-[14px] placeholder-[#FFFFFF] placeholder-font-light focus:outline-none focus:ring-1 focus:ring-[var(--store-primary)]"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-[var(--store-primary)] text-white font-bold text-[14px] tracking-wider py-3.5 rounded-md uppercase hover:opacity-90 transition-opacity mb-3.5"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Legal Disclaimer Box */}
                <div className="bg-[#E93E2B]/5 rounded-lg p-3.5 md:p-3.5 mb-6 border border-[#E93E2B]/10  ">
                    <div className="flex items-start gap-6">
                        <AlertTriangle className="text-[var(--store-primary)] shrink-0 w-6 h-6 mt-0.5" strokeWidth={2} />
                        <p className="text-sm text-[#333333]  font-medium">
                            <strong className="text-[#181211] font-bold uppercase mr-1">Legal Disclaimer:</strong >
                            19+ ONLY (or applicable provincial age requirement). Cannabis and certain mushroom products are subject to federal and provincial laws in Canada. Please consult your local regulations before purchasing. Shroom Express sells cannabis and mushroom products in accordance with applicable Canadian laws. Keep out of reach of children and pets. Do not operate a vehicle or heavy machinery after consumption.
                        </p>
                    </div>
                </div>

                {/* Bottom Footer Area */}
                <div className="border-t border-[#F4F1F0] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[11px] text-[#886663] font-medium">
                        &copy; {new Date().getFullYear()} ShroomExpress. All Rights Reserved. Must be 19+ to enter.
                    </p>
                    <div className="flex items-center gap-8">
                        <Link to="/terms" className="text-[11px] font-medium text-[#886663] hover:text-[var(--store-primary)] uppercase tracking-wider transition-colors">Terms of Service</Link>
                        <Link to="/privacy" className="text-[11px] font-medium text-[#886663] hover:text-[var(--store-primary)] uppercase tracking-wider transition-colors">Privacy Policy</Link>
                        <Link to="/compliance" className="text-[11px] font-medium text-[#886663] hover:text-[var(--store-primary)] uppercase tracking-wider transition-colors">Compliance</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
