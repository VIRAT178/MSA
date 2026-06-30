import React, { useState } from "react";
import { Menu, X, Trophy, Shield, Calendar, Sparkles, LogIn, ChevronDown, MapPin } from "lucide-react";
import Logo from "./Logo";
import { SPORTS_PROGRAMS } from "../data";
import { getSportIcon } from "../types";

interface NavbarProps {
  currentView: string;
  setView: (view: string) => void;
  onLoginClick: () => void;
  selectedSportId: string;
  setSelectedSportId: (id: string) => void;
  currentUser: any;
  onLogout: () => void;
}

export default function Navbar({
  currentView,
  setView,
  onLoginClick,
  setSelectedSportId,
  currentUser,
  onLogout
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sportsDropdownOpen, setSportsDropdownOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About MSA" },
    { id: "athletes", label: "Athletes" },
    { id: "events", label: "Events" },
    { id: "ai-coach", label: "AI Coach", badge: "NEW" },
    { id: "dashboard", label: "Dashboard" }
  ];

  const handleSportSelect = (sportId: string) => {
    setSelectedSportId(sportId);
    setView("sports-detail");
    setSportsDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleNavClick = (viewId: string) => {
    if (viewId === "dashboard" && !currentUser) {
      onLoginClick();
    } else {
      setView(viewId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick("home")}
          className="group flex items-center focus:outline-none"
          id="nav-logo"
        >
          <Logo />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative px-3 py-2 text-xs font-black uppercase tracking-widest transition-all duration-200 rounded-md ${
                currentView === item.id 
                  ? "text-red-600" 
                  : "text-zinc-600 hover:text-red-600"
              }`}
              id={`nav-${item.id}`}
            >
              <span className="flex items-center gap-1.5">
                {item.label}
                {item.badge && (
                  <span className="flex h-4 items-center bg-red-600 text-[9px] font-black text-white px-1.5 rounded-full animate-pulse">
                    {item.badge}
                  </span>
                )}
              </span>
              {currentView === item.id && (
                <div className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-red-600 rounded-full" />
              )}
            </button>
          ))}

          {/* Sports Programs Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSportsDropdownOpen(!sportsDropdownOpen)}
              onMouseEnter={() => setSportsDropdownOpen(true)}
              className="flex items-center gap-1 px-3 py-2 text-xs font-black uppercase tracking-widest text-zinc-600 hover:text-red-600 rounded-md"
              id="nav-sports-trigger"
            >
              Programs <ChevronDown className="h-4 w-4" />
            </button>
            
            {sportsDropdownOpen && (
              <div 
                className="absolute right-0 mt-1 w-64 rounded-xl border border-zinc-200 bg-white p-2 shadow-2xl z-50"
                onMouseLeave={() => setSportsDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-black text-red-600 uppercase tracking-widest border-b border-zinc-100 mb-1.5">
                  Our 12 Sports
                </div>
                <div className="grid grid-cols-1 gap-1 max-h-80 overflow-y-auto">
                  {SPORTS_PROGRAMS.map((sport) => (
                    <button
                      key={sport.id}
                      onClick={() => handleSportSelect(sport.id)}
                      className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-lg text-xs font-black tracking-widest text-zinc-600 hover:text-white hover:bg-red-600 transition-colors"
                    >
                      <span className="flex items-center justify-center h-4 w-4 shrink-0">
                        {getSportIcon(sport.id, "h-4 w-4 text-zinc-500 group-hover:text-white")}
                      </span>
                      <span>{sport.name.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Location & CTA Actions - Matching screenshot details */}
        <div className="hidden lg:flex items-center space-x-3">
          {currentUser ? (
            <div className="flex items-center space-x-3 bg-zinc-50 border border-zinc-200 rounded-xl p-1.5 pr-3">
              {/* User profile picture next to portal button */}
              <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-red-600/30 shadow-sm shrink-0">
                <img 
                  src={athleteCricket}
                  alt="MSA Athlete Profile" 
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="text-left">
                <span className="block text-[10px] font-black text-zinc-800 leading-none truncate max-w-28 uppercase">{currentUser.name}</span>
                <span className="block text-[8px] font-bold text-red-600 uppercase tracking-widest">{currentUser.role}</span>
              </div>

              <button
                onClick={onLogout}
                className="ml-2 rounded-lg bg-zinc-200/60 hover:bg-red-600 hover:text-white px-2.5 py-1.5 text-[9px] font-black uppercase tracking-widest text-zinc-650 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={onLoginClick}
                className="flex items-center space-x-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 px-4 py-2.5 text-xs font-black uppercase tracking-widest text-zinc-600 hover:text-zinc-900 transition-colors"
                id="nav-login"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Portal</span>
              </button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center space-x-2 lg:hidden">
          {currentUser ? (
            <button
              onClick={onLogout}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-100 text-[10px] font-black uppercase text-zinc-650 hover:text-red-600"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={onLoginClick}
              className="p-2 rounded-lg bg-zinc-100 text-zinc-600 hover:text-zinc-900 focus:outline-none"
            >
              <LogIn className="h-5 w-5" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-zinc-100 text-zinc-600 hover:text-zinc-900 focus:outline-none"
            aria-expanded="false"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide-out */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 bg-white p-4 space-y-3 shadow-lg z-50">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-center p-2.5 text-xs font-black uppercase tracking-widest rounded-lg transition-colors ${
                  currentView === item.id 
                    ? "bg-red-600 text-white" 
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="border-t border-zinc-100 pt-3">
            <span className="block text-zinc-400 text-[10px] font-black uppercase tracking-wider mb-2">
              Explore Programs
            </span>
            <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto">
              {SPORTS_PROGRAMS.map((sport) => (
                <button
                  key={sport.id}
                  onClick={() => handleSportSelect(sport.id)}
                  className="flex items-center space-x-1.5 p-2 rounded-lg bg-zinc-50 text-[10px] font-bold text-left text-zinc-700 hover:bg-zinc-100"
                >
                  <span className="flex items-center justify-center shrink-0">
                    {getSportIcon(sport.id, "h-3.5 w-3.5 text-zinc-500")}
                  </span>
                  <span className="truncate uppercase">{sport.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Removed Media Hub container */}
        </div>
      )}
    </header>
  );
}
