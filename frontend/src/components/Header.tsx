import React, { useState } from "react";
import { Menu, User, Flame, LogOut, FileText, Settings, ShieldCheck } from "lucide-react";
import Logo from "./Logo";

import type { AppUser } from "../types";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openInquiryModal: () => void;
  currentUser: AppUser | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export default function Header({ activeTab, setActiveTab, openInquiryModal, currentUser, onLoginClick, onLogout }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "programs", label: "Programs" },
    { id: "admissions", label: "Admissions" },
    { id: "train", label: "AI Coach" },
    { id: "stats", label: "Stats" },
    { id: "profile", label: "Profile" },
    { id: "scout", label: "Scout Portal" },
  ];

  return (
    <header className="w-full fixed top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-sm">
      <div className="flex justify-between items-center px-4 md:px-8 py-3 w-full max-w-[1280px] mx-auto">
        <div className="flex items-center gap-4">
          <button 
            id="mobile-menu-trigger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-neutral-800 hover:text-[#cc0000] transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div 
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <Logo variant="horizontal" size="md" />
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`font-sans text-xs uppercase tracking-wider font-bold transition-all duration-300 relative py-1 ${
                activeTab === item.id 
                  ? "text-[#cc0000]" 
                  : "text-neutral-600 hover:text-[#cc0000]"
              }`}
            >
              {item.label}
              {activeTab === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#cc0000]" />
              )}
            </button>
          ))}
        </nav>

        {/* Action / Profile */}
        <div className="flex items-center gap-3 relative">
          <button
            id="header-cta"
            onClick={openInquiryModal}
            className="hidden sm:inline-flex bg-[#cc0000] text-white font-bold font-sans px-4 py-2 rounded-none text-[10px] tracking-wider uppercase hover:bg-[#aa0000] transition-colors active:scale-95 duration-100"
          >
            Scouting Open
          </button>

          {currentUser ? (
            <>
              <button
                id="profile-trigger"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-9 h-9 rounded-full border-2 border-neutral-200 overflow-hidden active:scale-95 transition-transform"
              >
                <img 
                  className="w-full h-full object-cover" 
                  alt="Professional Athlete Profile" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_mnhZhJ4k5qcLhRndXPsiGiW4h9RdQjzR3B5vYPI4C6MiccGNjgwSjlceZbPJDBmU6lDf5R45ayrP3SlY68OTZdX3Ml2ddmbXdzuf8zb6zt9_-KaSCkHrRMitZUajhO8-biIjSUeDxLDyQ0YIx-6e5_W-3xvn1ngJtodonTsRSNFGse0Qnvq3_DsOBXpl4kVKfzu2Th9h-_FYx4dy58n2NdCzqOvd9lY_xVveNPSo--tu1tBla2J3jbPVWJ3TFD4MCvWRzc_ONao8"
                  referrerPolicy="no-referrer"
                />
              </button>

              {isProfileOpen && (
                <div 
                  id="profile-dropdown"
                  className="absolute right-0 top-11 w-60 bg-white rounded-none p-4 shadow-xl border border-neutral-200 z-50 text-left"
                >
                  <div className="flex items-center gap-3 pb-3 mb-3 border-b border-neutral-100">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-neutral-200">
                      <img 
                        className="w-full h-full object-cover" 
                        alt="Athlete Profile" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_mnhZhJ4k5qcLhRndXPsiGiW4h9RdQjzR3B5vYPI4C6MiccGNjgwSjlceZbPJDBmU6lDf5R45ayrP3SlY68OTZdX3Ml2ddmbXdzuf8zb6zt9_-KaSCkHrRMitZUajhO8-biIjSUeDxLDyQ0YIx-6e5_W-3xvn1ngJtodonTsRSNFGse0Qnvq3_DsOBXpl4kVKfzu2Th9h-_FYx4dy58n2NdCzqOvd9lY_xVveNPSo--tu1tBla2J3jbPVWJ3TFD4MCvWRzc_ONao8"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <p className="font-sans text-sm font-bold text-neutral-800">{currentUser.name}</p>
                      <p className="font-mono text-[9px] text-[#cc0000] font-extrabold uppercase">MIST Student Athlete</p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <button 
                      onClick={() => { setActiveTab("profile"); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-3 text-xs text-neutral-600 hover:text-[#cc0000] py-1.5 transition-colors text-left font-bold"
                    >
                      <User className="w-4 h-4 text-[#cc0000]" />
                      My Athlete Profile
                    </button>
                    <button 
                      onClick={() => { setActiveTab("scout"); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-3 text-xs text-neutral-600 hover:text-[#cc0000] py-1.5 transition-colors text-left font-bold"
                    >
                      <FileText className="w-4 h-4 text-[#cc0000]" />
                      My Scout Inquiries
                    </button>
                    <button 
                      onClick={() => { setActiveTab("train"); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-3 text-xs text-neutral-600 hover:text-[#cc0000] py-1.5 transition-colors text-left font-bold"
                    >
                      <Flame className="w-4 h-4 text-[#cc0000]" />
                      AI Coach Consultation
                    </button>
                    <button
                      onClick={() => { onLogout(); setIsProfileOpen(false); }}
                      className="w-full text-left text-xs text-neutral-600 hover:text-[#cc0000] py-1.5 transition-colors font-bold"
                    >
                      Logout
                    </button>
                    <div className="flex items-center gap-3 text-[9px] text-emerald-600 py-1.5 border-t border-neutral-100 mt-2 font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      MIST Performance Link Stable
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <button
              id="profile-trigger"
              onClick={onLoginClick}
              className="w-9 h-9 rounded-full border-2 border-neutral-200 flex items-center justify-center text-[#cc0000] active:scale-95 transition-transform"
            >
              <User className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-6 py-4 space-y-4 shadow-xl">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`font-sans text-xs uppercase tracking-wider text-left font-extrabold py-2 block ${
                  activeTab === item.id ? "text-[#cc0000]" : "text-neutral-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => {
              openInquiryModal();
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-center bg-[#cc0000] text-white font-bold font-sans py-2.5 text-xs uppercase tracking-widest rounded-none"
          >
            Apply for Scouting
          </button>
        </div>
      )}
    </header>
  );
}
