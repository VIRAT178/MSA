import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import HomeSection from "./components/HomeSection";
import TrainSection from "./components/TrainSection";
import StatsSection from "./components/StatsSection";
import ScoutPortal from "./components/ScoutPortal";
import AdmissionsSection from "./components/AdmissionsSection";
import ProgramsSection from "./components/ProgramsSection";
import ProfileSection from "./components/ProfileSection";
import AuthSection from "./components/AuthSection";
import Logo from "./components/Logo";
import { Inquiry, AppUser } from "./types";
import { getDbInquiries } from "./lib/firebase";
import { getCurrentUser, loginAppUser, logoutUser, registerAppUser } from "./lib/auth";
import { Flame, Share2, Globe, Heart, Shield, Award, Smartphone, Home, Dumbbell, TrendingUp, UserCheck, GraduationCap, Trophy, User } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "register">("register");
  const [authVisible, setAuthVisible] = useState(false);
  const inquiryFormRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  // Fetch inquiries from Firestore on mount
  const fetchInquiries = async () => {
    try {
      const data = await getDbInquiries();
      setInquiries(data);
    } catch (err) {
      console.error("Failed to fetch inquiries:", err);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  // Handle new inquiry submission
  const handleInquirySubmitted = (newInquiry: Inquiry) => {
    setInquiries((prev) => [...prev, newInquiry]);
  };

  const scrollToInquiryForm = () => {
    setActiveTab("home");
    setTimeout(() => {
      inquiryFormRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const openAuth = (mode: "login" | "register" = "register") => {
    setAuthMode(mode);
    setAuthVisible(true);
  };

  const closeAuth = () => {
    setAuthVisible(false);
    if (activeTab === "profile" || activeTab === "scout") {
      setActiveTab("home");
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const user = await loginAppUser(email, password);
      setCurrentUser(user);
      setAuthVisible(false);
      setActiveTab("profile");
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  const handleRegister = async (payload: { name: string; email: string; password: string; sport: string }) => {
    try {
      const user = await registerAppUser(payload);
      setCurrentUser(user);
      setAuthVisible(false);
      setActiveTab("profile");
    } catch (err) {
      console.error("Registration error:", err);
      throw err;
    }
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setActiveTab("home");
  };

  return (
    <>
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        openInquiryModal={scrollToInquiryForm}
        currentUser={currentUser}
        onLoginClick={() => openAuth("login")}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-16 pb-20 md:pb-0">
        {authVisible ? (
          <AuthSection
            mode={authMode}
            setMode={setAuthMode}
            onLogin={handleLogin}
            onRegister={handleRegister}
            onClose={closeAuth}
          />
        ) : (
          <>
            {activeTab === "home" && (
              <HomeSection 
                setActiveTab={setActiveTab}
                onInquirySubmitted={handleInquirySubmitted}
                inquiryFormRef={inquiryFormRef}
              />
            )}
            {activeTab === "admissions" && (
              <AdmissionsSection 
                onInquirySubmitted={handleInquirySubmitted}
                setActiveTab={setActiveTab}
              />
            )}
            {activeTab === "programs" && (
              <ProgramsSection 
                scrollToInquiryForm={scrollToInquiryForm}
                setActiveTab={setActiveTab}
              />
            )}
            {activeTab === "train" && <TrainSection />}
            {activeTab === "stats" && <StatsSection />}
            {activeTab === "profile" && (
              currentUser ? (
                <ProfileSection currentUser={currentUser} />
              ) : (
                <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 py-16 text-center">
                  <div className="inline-flex flex-col items-center gap-4 rounded-none border border-neutral-200 bg-white p-12 shadow-sm">
                    <h2 className="text-3xl font-black text-neutral-900 uppercase tracking-tight">
                      Athlete Profile Login
                    </h2>
                    <p className="max-w-2xl text-sm text-neutral-600 leading-relaxed">
                      Please sign in or create a new profile first. If you are new, register to start tracking your scouting inquiry and profile.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                      <button
                        onClick={() => openAuth("register")}
                        className="px-6 py-3 bg-[#cc0000] text-white uppercase tracking-[0.35em] font-bold rounded-none"
                      >
                        Create Profile
                      </button>
                      <button
                        onClick={() => openAuth("login")}
                        className="px-6 py-3 border border-[#cc0000] text-[#cc0000] uppercase tracking-[0.35em] font-bold rounded-none"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
            {activeTab === "scout" && (
              currentUser ? (
                <ScoutPortal 
                  inquiries={inquiries}
                  onRefresh={fetchInquiries}
                  openInquiryForm={scrollToInquiryForm}
                />
              ) : (
                <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 py-16 text-center">
                  <div className="inline-flex flex-col items-center gap-4 rounded-none border border-neutral-200 bg-white p-12 shadow-sm">
                    <h2 className="text-3xl font-black text-neutral-900 uppercase tracking-tight">
                      Scout Portal Access
                    </h2>
                    <p className="max-w-2xl text-sm text-neutral-600 leading-relaxed">
                      To track your scouting inquiries and manage your athlete profile, please sign in or create a new account. New prospects can still submit an inquiry from the home page.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                      <button
                        onClick={() => openAuth("register")}
                        className="px-6 py-3 bg-[#cc0000] text-white uppercase tracking-[0.35em] font-bold rounded-none"
                      >
                        Create Profile
                      </button>
                      <button
                        onClick={() => openAuth("login")}
                        className="px-6 py-3 border border-[#cc0000] text-[#cc0000] uppercase tracking-[0.35em] font-bold rounded-none"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full pt-16 pb-8 bg-surface-container-low border-t border-neutral-200 text-left text-xs text-on-surface-variant">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Logo variant="horizontal" size="sm" />
            </div>
            <p className="text-on-surface-variant leading-relaxed text-[11px]">
              Defining the future of high-stakes Indian sports & modern engineering through world-class biometric telemetry infrastructure, Olympic-tier coaching, and academic excellence.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-neutral-900 font-sans text-xs font-bold uppercase tracking-wider">Explore Paths</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => setActiveTab("train")} className="text-on-surface-variant hover:text-primary transition-colors text-left text-[11px]">
                  Training Curriculums
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("home")} className="text-on-surface-variant hover:text-primary transition-colors text-left text-[11px]">
                  Elite Athlete Profiles
                </button>
              </li>
              <li>
                <button onClick={scrollToInquiryForm} className="text-on-surface-variant hover:text-primary transition-colors text-left text-[11px]">
                  Recruiting Scouting Form
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("stats")} className="text-on-surface-variant hover:text-primary transition-colors text-left text-[11px]">
                  Academy Success Metrics
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-neutral-900 font-sans text-xs font-bold uppercase tracking-wider">Scout Protocol</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-on-surface-variant hover:text-primary transition-colors block text-[11px]">
                  Privacy & Data Protocols
                </a>
              </li>
              <li>
                <a href="#" className="text-on-surface-variant hover:text-primary transition-colors block text-[11px]">
                  Terms of Elite Service
                </a>
              </li>
              <li>
                <a href="#" className="text-on-surface-variant hover:text-primary transition-colors block text-[11px]">
                  Federation Sponsorships
                </a>
              </li>
              <li>
                <a href="#" className="text-on-surface-variant hover:text-primary transition-colors block text-[11px]">
                  Campus High-Performance HQ
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-neutral-900 font-sans text-xs font-bold uppercase tracking-wider">Connect & Share</h4>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-primary hover:bg-[#cc0000] hover:text-white transition-all border border-neutral-200">
                <Share2 className="w-4 h-4 text-[#cc0000] hover:text-white" />
              </button>
              <button className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-primary hover:bg-[#cc0000] hover:text-white transition-all border border-neutral-200">
                <Globe className="w-4 h-4 text-[#cc0000] hover:text-white" />
              </button>
            </div>
            <p className="text-[10px] text-on-surface-variant/70 leading-relaxed">
              Main Campus: Sanwer Road, Indore, Madhya Pradesh, India.
            </p>
          </div>
        </div>

        {/* Accreditation and Copyright footer */}
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-[10px]">
          <p className="text-on-surface-variant">
            © 2026 MIST, Indore (Malwa Group of Institutes). Precision Biometrics. All rights reserved.
          </p>
          <div className="flex gap-6 font-mono text-[9px] text-[#cc0000] font-bold tracking-wider">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> ISO 9001 CERTIFIED
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> PRO-FEDERATION PARTNER
            </span>
          </div>
        </div>
      </footer>

      {/* Bottom Nav Bar (Mobile viewport only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-white/90 backdrop-blur-2xl border-t border-neutral-200 shadow-lg">
        <button 
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center justify-center p-2 rounded-none transition-all ${
            activeTab === "home" ? "text-[#cc0000] bg-[#cc0000]/10 px-4" : "text-neutral-500 hover:text-neutral-900"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[9px] font-mono uppercase tracking-wider mt-0.5">Home</span>
        </button>
 
        <button 
          onClick={() => setActiveTab("train")}
          className={`flex flex-col items-center justify-center p-2 rounded-none transition-all ${
            activeTab === "train" ? "text-[#cc0000] bg-[#cc0000]/10 px-4" : "text-neutral-500 hover:text-neutral-900"
          }`}
        >
          <Dumbbell className="w-5 h-5" />
          <span className="text-[9px] font-mono uppercase tracking-wider mt-0.5">Train</span>
        </button>
 
        <button 
          onClick={() => setActiveTab("stats")}
          className={`flex flex-col items-center justify-center p-2 rounded-none transition-all ${
            activeTab === "stats" ? "text-[#cc0000] bg-[#cc0000]/10 px-4" : "text-neutral-500 hover:text-neutral-900"
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          <span className="text-[9px] font-mono uppercase tracking-wider mt-0.5">Stats</span>
        </button>
 
        <button 
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center justify-center p-2 rounded-none transition-all ${
            activeTab === "profile" ? "text-[#cc0000] bg-[#cc0000]/10 px-4" : "text-neutral-500 hover:text-neutral-900"
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[9px] font-mono uppercase tracking-wider mt-0.5">Profile</span>
        </button>
      </nav>
    </>
  );
}
