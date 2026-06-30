import React from "react";
import { MapPin, Phone, Mail, Trophy, Facebook, Twitter, Instagram, Shield, Award } from "lucide-react";
import Logo from "./Logo";

interface FooterProps {
  setView: (view: string) => void;
}

export default function Footer({ setView }: FooterProps) {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 text-zinc-600 text-xs sm:text-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Column: Brand summary */}
        <div className="md:col-span-4 space-y-4">
          <Logo />
          
          <p className="text-zinc-500 text-xs leading-relaxed max-w-sm">
            Malwa Sports Academy is Central India's premier athletic development organization, offering elite-level training pathways for youth and professionals. Our physical facility features international turf grounds, indoor climate-controlled shooting ranges, and Olympic-size pools.
          </p>

          {/* Social icons */}
          <div className="flex items-center space-x-3.5 pt-2">
            <a href="#facebook" className="p-2 rounded bg-white border border-zinc-200 text-zinc-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#instagram" className="p-2 rounded bg-white border border-zinc-200 text-zinc-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#twitter" className="p-2 rounded bg-white border border-zinc-200 text-zinc-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Middle Column: 12 Sport Specialties list */}
        <div className="md:col-span-3 space-y-4 text-left">
          <h4 className="font-title text-xs font-black uppercase tracking-widest text-zinc-900 border-l-2 border-red-600 pl-2">
            12 Elite Specialties
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {["Cricket", "Football", "Basketball", "Volleyball", "Badminton", "Table Tennis", "Athletics", "Kabaddi", "Swimming", "Rifle Shooting", "Gym & Fitness", "Indoor Games"].map((sport) => (
              <button
                key={sport}
                onClick={() => setView("home")}
                className="text-left text-zinc-500 hover:text-red-500 transition-colors"
              >
                • {sport}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Physical Location details */}
        <div className="md:col-span-5 space-y-4">
          <h4 className="font-title text-xs font-black uppercase tracking-widest text-zinc-900 border-l-2 border-red-600 pl-2">
            Sanwer Road Headquarters
          </h4>
          
          <div className="space-y-3 font-semibold text-xs text-zinc-400">
            <div className="flex items-start space-x-2.5">
              <MapPin className="h-4.5 w-4.5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-zinc-900 font-bold block">Malwa Sports Academy Arena</span>
                <span className="text-zinc-500 block">Sanwer Road, Indore, Madhya Pradesh - 452015</span>
              </div>
            </div>

            <div className="flex items-center space-x-2.5">
              <Phone className="h-4.5 w-4.5 text-red-600 shrink-0" />
              <span className="text-zinc-700 font-bold">+91 95000-MSA-ID / +91 731-29000-XX</span>
            </div>

            <div className="flex items-center space-x-2.5">
              <Mail className="h-4.5 w-4.5 text-red-600 shrink-0" />
              <span className="text-zinc-700 font-bold">admissions@malwasportsacademy.org</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-zinc-200 text-[11px] text-zinc-500">
            * Security and admissions desk remains open from 05:00 AM to 09:30 PM. Parents/visitors are advised to carry national photo ID clearance.
          </div>
        </div>

      </div>

      {/* Sub-footer copyright */}
      <div className="border-t border-zinc-200 bg-zinc-100 py-4 text-center text-[11px] text-zinc-500 font-semibold">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 Malwa Sports Academy (MSA). All rights and athletic patents reserved.</span>
          <div className="flex space-x-3">
            <a href="#privacy" className="hover:text-red-600">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-red-600">Admissions Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
