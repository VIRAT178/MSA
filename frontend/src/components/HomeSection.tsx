import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin, Phone, ArrowRight, Play, Info, Award, User, Sparkles, CheckCircle, ShieldAlert } from "lucide-react";
import { PROGRAMS, ATHLETES } from "../data";
import { Program, Athlete, Inquiry } from "../types";
import { createInquiry } from "../lib/firebase";
// @ts-ignore
import academyHeroBg from "../assets/images/academy_hero_bg_1782471195705.jpg";

interface HomeSectionProps {
  setActiveTab: (tab: string) => void;
  onInquirySubmitted: (inquiry: Inquiry) => void;
  inquiryFormRef: React.RefObject<HTMLFormElement | null>;
}

export default function HomeSection({ setActiveTab, onInquirySubmitted, inquiryFormRef }: HomeSectionProps) {
  // Counters state
  const [athletesCount, setAthletesCount] = useState(0);
  const [coachesCount, setCoachesCount] = useState(0);
  const [championshipsCount, setChampionshipsCount] = useState(0);

  // Selected details modal
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [isTourOpen, setIsTourOpen] = useState(false);

  // Form states
  const [athleteName, setAthleteName] = useState("");
  const [sportCategory, setSportCategory] = useState("Cricket");
  const [professionalEmail, setProfessionalEmail] = useState("");
  const [performanceBackground, setPerformanceBackground] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [loadingStep, setLoadingStep] = useState("");
  const [newScoutingReport, setNewScoutingReport] = useState<Inquiry | null>(null);

  // Horizontal scroll container reference
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Count animations on mount
  useEffect(() => {
    const duration = 2000;
    const intervalTime = 20;
    const steps = duration / intervalTime;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setAthletesCount(Math.min(Math.floor((104 / steps) * step), 104));
      setCoachesCount(Math.min(Math.floor((4 / steps) * step), 4));
      setChampionshipsCount(Math.min(Math.floor((7 / steps) * step), 7));

      if (step >= steps) {
        clearInterval(timer);
        setAthletesCount(104);
        setCoachesCount(4);
        setChampionshipsCount(7);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Horizontal scroll handling
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Form Submit Handler
  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!athleteName || !professionalEmail || !performanceBackground) {
      alert("Please fill in all athletic details.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setLoadingStep("Connecting to Malwa Scout Server...");

    const steps = [
      "Transmitting performance records...",
      "Activating AI Scouting Diagnostics...",
      "Synthesizing biomechanical metrics...",
      "Generating Expert Coach Match...",
      "Scouting Report Finalized!"
    ];

    let currentStep = 0;
    const loadingInterval = setInterval(() => {
      if (currentStep < steps.length) {
        setLoadingStep(steps[currentStep]);
        currentStep++;
      } else {
        clearInterval(loadingInterval);
      }
    }, 1200);

    try {
      const inquiryData = await createInquiry(
        athleteName,
        professionalEmail,
        sportCategory,
        performanceBackground
      );
      
      clearInterval(loadingInterval);
      
      setTimeout(() => {
        setNewScoutingReport(inquiryData);
        onInquirySubmitted(inquiryData);
        setIsSubmitting(false);
        setSubmitStatus("success");
        // Reset form
        setAthleteName("");
        setProfessionalEmail("");
        setPerformanceBackground("");
      }, 500);

    } catch (err) {
      console.error(err);
      clearInterval(loadingInterval);
      setIsSubmitting(false);
      setSubmitStatus("error");
    }
  };

  return (
    <div className="w-full bg-white text-neutral-800">
      {/* Hero Section styled exactly like the screenshot with steel gray / silver background and custom headers */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-neutral-900 py-20 px-6 md:px-12 overflow-hidden border-b border-neutral-300">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-neutral-950/45 z-10" />
          {/* subtle athletic backdrop mixed overlay */}
          <div 
            className="w-full h-full bg-cover bg-center opacity-85" 
            style={{ 
              backgroundImage: `url(${academyHeroBg})` 
            }}
          />
        </div>

        {/* Circular Slider Navigation on Left and Right (exactly like screenshot) */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30 hidden md:block">
          <button 
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full border border-white/50 bg-black/15 text-white flex items-center justify-center hover:bg-[#cc0000] hover:border-transparent transition-all hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 hidden md:block">
          <button 
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full border border-white/50 bg-black/15 text-white flex items-center justify-center hover:bg-[#cc0000] hover:border-transparent transition-all hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        <div className="relative z-20 px-6 md:px-12 w-full max-w-[1280px] mx-auto text-center flex flex-col items-center">
          <div className="max-w-3xl">
            <h2 className="font-sans text-2xl sm:text-5xl md:text-8xl text-white mb-8 font-normal leading-tight tracking-tight select-none">
              Welcome to <br />
              <span className="font-semibold text-white tracking-tighter">MIST, Indore</span>
            </h2>
            
            <p className="font-sans text-sm md:text-lg text-white/95 mb-10 max-w-xl mx-auto leading-relaxed font-medium">
              Experience the pinnacle of high-performance sports training and academic brilliance. We combine raw grit, state-of-the-art biomechanics, and legendary coaching to forge tomorrow's leaders.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                id="hero-primary-cta"
                onClick={() => {
                  inquiryFormRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-[#cc0000] text-white px-12 py-4 font-sans text-sm font-black uppercase tracking-wider transition-colors hover:bg-[#aa0000] active:scale-95 shadow-lg rounded-none"
              >
                ABOUT US
              </button>
              
              <button
                id="hero-secondary-cta"
                onClick={() => setIsTourOpen(true)}
                className="px-10 py-4 font-sans text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/40 transition-colors flex items-center justify-center gap-2 active:scale-95 rounded-none"
              >
                <Play className="w-4 h-4 text-white fill-white" />
                WATCH ACADEMY TOUR
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with PRESTIGIOUS header exactly matching the screenshot style */}
      <section id="stats-section" className="py-20 bg-white border-b border-neutral-100">
        <div className="px-6 md:px-12 w-full max-w-[1280px] mx-auto">
          {/* "PRESTIGIOUS Awards & Achievements" heading block */}
          <div className="text-center mb-16">
            <span className="font-sans text-xs md:text-sm font-extrabold text-[#cc0000] tracking-[0.25em] uppercase block mb-2">
              PRESTIGIOUS
            </span>
            <h3 className="font-sans text-3xl md:text-5xl font-black text-neutral-900 tracking-tight">
              Awards & Achievements
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div id="stat-card-athletes" className="bg-neutral-50 border border-neutral-200 p-8 text-center hover:border-[#cc0000]/30 transition-all duration-300 group shadow-sm">
              <div className="font-sans text-5xl md:text-6xl font-black text-[#cc0000] mb-3">
                {athletesCount}+
              </div>
              <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
                ATHLETES ENROLLED
              </p>
            </div>
            
            <div id="stat-card-coaches" className="bg-neutral-50 border border-neutral-200 p-8 text-center hover:border-[#cc0000]/30 transition-all duration-300 group shadow-sm">
              <div className="font-sans text-5xl md:text-6xl font-black text-neutral-900 mb-3">
                {coachesCount}
              </div>
              <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
                PRO COACHING STAFF
              </p>
            </div>
            
            <div id="stat-card-championships" className="bg-neutral-50 border border-neutral-200 p-8 text-center hover:border-[#cc0000]/30 transition-all duration-300 group shadow-sm">
              <div className="font-sans text-5xl md:text-6xl font-black text-[#cc0000] mb-3">
                {championshipsCount}
              </div>
              <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
                CHAMPIONSHIPS WON
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Programs Section */}
      <section id="programs-section" className="py-24 bg-neutral-50 border-b border-neutral-100">
        <div className="px-6 md:px-12 w-full max-w-[1280px] mx-auto text-left">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
            <div>
              <span className="font-sans text-xs font-bold text-[#cc0000] tracking-widest uppercase block mb-1">
                DISCIPLINES
              </span>
              <h3 className="font-sans text-2xl sm:text-4xl font-black text-neutral-900">
                Sports Programs
              </h3>
              <p className="text-neutral-500 font-sans text-xs md:text-sm mt-2">
                Specialized high-performance training modules engineered for elite athletes.
              </p>
            </div>
            <div className="flex gap-2">
              <button 
                id="program-slide-left"
                onClick={() => scroll("left")}
                className="w-10 h-10 border border-neutral-300 bg-white text-neutral-700 hover:bg-[#cc0000] hover:text-white transition-all active:scale-90 flex items-center justify-center shadow-xs"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                id="program-slide-right"
                onClick={() => scroll("right")}
                className="w-10 h-10 border border-neutral-300 bg-white text-neutral-700 hover:bg-[#cc0000] hover:text-white transition-all active:scale-90 flex items-center justify-center shadow-xs"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scroll-hide pb-8 snap-x"
          >
            {PROGRAMS.map((program) => (
              <div 
                key={program.id}
                id={`program-card-${program.id}`}
                onClick={() => setSelectedProgram(program)}
                className="min-w-[280px] sm:min-w-[320px] flex-shrink-0 snap-start group cursor-pointer"
              >
                <div className="relative h-[380px] overflow-hidden bg-white border border-neutral-200 shadow-sm hover:shadow-md hover:border-[#cc0000]/40 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10" />
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt={program.name} 
                    src={program.image}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-6 left-6 right-6 z-20 text-left">
                    <div className="inline-block bg-[#cc0000] px-2.5 py-1 text-[9px] font-black uppercase text-white mb-3">
                      {program.name.split(" ")[0]}
                    </div>
                    <h4 className="font-sans text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                      {program.name}
                    </h4>
                    <p className="font-sans text-xs text-neutral-200 line-clamp-2">
                      {program.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Athletes Section */}
      <section id="prodigies-section" className="py-24 bg-white overflow-hidden relative border-b border-neutral-100">
        <div className="px-6 md:px-12 w-full max-w-[1280px] mx-auto relative z-10 text-center">
          <div className="performance-chip px-3 py-1 mb-4 inline-block">
            <span className="font-mono text-[10px] text-[#cc0000] tracking-widest uppercase font-bold">
              SCUTTING PIPELINE
            </span>
          </div>
          <h3 className="font-sans text-3xl sm:text-4xl font-black text-neutral-900 mb-16 uppercase tracking-tight">
            ELITE PRODIGIES
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ATHLETES.map((athlete) => (
              <div 
                key={athlete.id}
                id={`athlete-card-${athlete.id}`}
                onClick={() => setSelectedAthlete(athlete)}
                className="bg-neutral-50 border border-neutral-200 p-5 flex flex-col items-center group cursor-pointer hover:border-[#cc0000]/40 hover:bg-neutral-100/50 transition-all duration-300"
              >
                <div className="w-full aspect-[3/4] mb-4 overflow-hidden border border-neutral-200 relative">
                  <div className="absolute top-2 right-2 bg-neutral-900/90 text-white px-2 py-0.5 z-20">
                    <span className="font-mono text-[9px] text-[#cc0000] font-black uppercase tracking-wider">
                      {athlete.badge}
                    </span>
                  </div>
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt={athlete.name} 
                    src={athlete.image}
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <span className="font-mono text-[9px] text-[#cc0000] mb-1.5 uppercase tracking-widest font-black">
                  {athlete.category} • {athlete.role}
                </span>
                <h5 className="font-sans text-base sm:text-lg font-bold text-neutral-900 group-hover:text-[#cc0000] transition-colors">
                  {athlete.name}
                </h5>
                <p className="font-sans text-[11px] text-neutral-500 line-clamp-2 mt-1">
                  {athlete.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Submission & Contact Section */}
      <section id="join-section" className="py-24 bg-neutral-50 relative overflow-hidden text-left border-b border-neutral-200">
        <div className="px-6 md:px-12 w-full max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-12 relative z-10">
          
          {/* Left info column */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className="border border-[#cc0000]/30 bg-[#cc0000]/5 px-3 py-1 mb-4 inline-block self-start">
              <span className="font-mono text-[9px] text-[#cc0000] tracking-widest uppercase font-bold">
                2026 RECRUITMENT & ADMISSIONS
              </span>
            </div>
            <h3 className="font-sans text-2xl sm:text-4xl font-black text-neutral-900 mb-6 uppercase">
              READY TO JOIN THE ELITE?
            </h3>
            <p className="text-neutral-600 font-sans text-sm md:text-base leading-relaxed mb-10 max-w-lg">
              Submit your detailed performance record to our scouting board. Our AI evaluation engine and high-performance recruitment squad will audit your profile and formulate your initial developmental diagnostics within 48 hours.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white border border-neutral-200 flex items-center justify-center text-[#cc0000] shadow-xs">
                  <MapPin className="w-5 h-5 text-[#cc0000]" />
                </div>
                <div>
                  <h6 className="text-neutral-900 font-sans text-sm font-bold uppercase tracking-wider">Main Campus</h6>
                  <p className="text-neutral-500 text-xs font-semibold">Sanwer Road, Indore, Madhya Pradesh, India</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white border border-neutral-200 flex items-center justify-center text-[#cc0000] shadow-xs">
                  <Phone className="w-5 h-5 text-[#cc0000]" />
                </div>
                <div>
                  <h6 className="text-neutral-900 font-sans text-sm font-bold uppercase tracking-wider">Direct Admissions Desk</h6>
                  <p className="text-neutral-500 text-xs font-semibold">+91 731-4014600 (Malwa Group Office)</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right inquiry form */}
          <div className="lg:w-1/2">
            <div className="bg-white border border-neutral-200 p-6 sm:p-10 shadow-lg">
              <form ref={inquiryFormRef} onSubmit={handleSubmitInquiry} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] text-neutral-600 uppercase tracking-wider font-extrabold block">
                      Athlete Name
                    </label>
                    <input 
                      id="form-athlete-name"
                      type="text" 
                      required
                      value={athleteName}
                      onChange={(e) => setAthleteName(e.target.value)}
                      placeholder="Enter full name"
                      className="w-full bg-white border border-neutral-200 py-2.5 px-4 focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-all text-neutral-800 text-xs outline-none"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] text-neutral-600 uppercase tracking-wider font-extrabold block">
                      Sport Category
                    </label>
                    <select 
                      id="form-sport-category"
                      value={sportCategory}
                      onChange={(e) => setSportCategory(e.target.value)}
                      className="w-full bg-white border border-neutral-200 py-2.5 px-4 focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-all text-neutral-800 text-xs outline-none cursor-pointer"
                    >
                      <option value="Cricket">Cricket</option>
                      <option value="Football">Football</option>
                      <option value="Basketball">Basketball</option>
                      <option value="Athletics">Athletics</option>
                      <option value="Volleyball">Volleyball</option>
                      <option value="Kabaddi">Kabaddi</option>
                      <option value="Badminton">Badminton</option>
                      <option value="Table Tennis">Table Tennis</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="font-mono text-[10px] text-neutral-600 uppercase tracking-wider font-extrabold block">
                    Professional Email
                  </label>
                  <input 
                    id="form-email"
                    type="email" 
                    required
                    value={professionalEmail}
                    onChange={(e) => setProfessionalEmail(e.target.value)}
                    placeholder="athlete@example.com"
                    className="w-full bg-white border border-neutral-200 py-2.5 px-4 focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-all text-neutral-800 text-xs outline-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="font-mono text-[10px] text-neutral-600 uppercase tracking-wider font-extrabold block">
                    Performance Background & Accolades
                  </label>
                  <textarea 
                    id="form-background"
                    required
                    value={performanceBackground}
                    onChange={(e) => setPerformanceBackground(e.target.value)}
                    placeholder="Briefly describe your sporting achievements, state ranking, club levels, speed/power stats..." 
                    rows={4}
                    className="w-full bg-white border border-neutral-200 py-2.5 px-4 focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-all text-neutral-800 text-xs outline-none resize-none leading-relaxed"
                  />
                </div>
                
                <button 
                  id="form-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#cc0000] hover:bg-[#aa0000] transition-colors text-white font-sans text-xs font-bold uppercase tracking-widest active:scale-[0.98] rounded-none"
                >
                  {isSubmitting ? "Running High-Performance Scan..." : "Submit Inquiry"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Atmospheric ambient glow */}
        <div className="absolute -top-[20%] -left-[10%] w-[450px] h-[450px] bg-secondary-fixed/5 blur-[120px] rounded-full pointer-events-none" />
      </section>

      {/* Program Immersive Side Sheet / Modal */}
      {selectedProgram && (
        <div 
          id="program-modal-overlay"
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProgram(null)}
        >
          <div 
            id="program-modal-content"
            className="bg-white max-w-2xl w-full border border-neutral-300 shadow-2xl relative text-left rounded-none overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48 md:h-64">
              <img 
                className="w-full h-full object-cover" 
                alt={selectedProgram.name} 
                src={selectedProgram.image}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent" />
              <button 
                id="close-program-modal"
                onClick={() => setSelectedProgram(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black/60 text-white flex items-center justify-center border border-white/10 hover:bg-[#cc0000] hover:text-white transition-colors rounded-none"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="font-mono text-[9px] text-white bg-[#cc0000] uppercase font-bold tracking-widest px-2 py-1">
                  {selectedProgram.name.split(" ")[0]} HIGH PERFORMANCE
                </span>
                <h4 className="font-sans text-2xl font-black text-white mt-1 uppercase">
                  {selectedProgram.name}
                </h4>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              <div>
                <h5 className="font-mono text-[10px] text-[#cc0000] uppercase tracking-widest font-black mb-2">
                  Curriculum Scope
                </h5>
                <p className="font-sans text-xs md:text-sm text-neutral-600 leading-relaxed">
                  {selectedProgram.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-neutral-100 pt-4">
                <div>
                  <h6 className="font-mono text-[9px] text-neutral-800 uppercase tracking-wider font-extrabold mb-2">
                    State-of-the-art Facilities
                  </h6>
                  <ul className="space-y-1">
                    {selectedProgram.facilities.map((fac, idx) => (
                      <li key={idx} className="text-xs text-neutral-600 flex items-start gap-2">
                        <span className="text-[#cc0000]">•</span> {fac}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h6 className="font-mono text-[9px] text-neutral-800 uppercase tracking-wider font-extrabold mb-2">
                    Biomechanical Tools
                  </h6>
                  <ul className="space-y-1">
                    {selectedProgram.highlights.map((high, idx) => (
                      <li key={idx} className="text-xs text-neutral-600 flex items-start gap-2">
                        <span className="text-[#cc0000]">•</span> {high}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-neutral-100 pt-4">
                <h6 className="font-mono text-[9px] text-[#cc0000] uppercase tracking-widest font-black mb-3">
                  Scouted Coaches In Charge
                </h6>
                <div className="flex flex-wrap gap-2">
                  {selectedProgram.coaches.map((coach, idx) => (
                    <span key={idx} className="bg-neutral-50 border border-neutral-200 px-3 py-1.5 rounded-none text-xs font-bold text-neutral-800">
                      {coach}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-neutral-100 pt-4">
                <h6 className="font-mono text-[9px] text-[#cc0000] uppercase tracking-widest font-black mb-2">
                  4-Week Diagnostic Path
                </h6>
                <div className="space-y-2">
                  <p className="text-xs text-neutral-600">
                    <strong className="text-neutral-900">Week 1-2:</strong> {selectedProgram.curriculum.week1} {selectedProgram.curriculum.week2}
                  </p>
                  <p className="text-xs text-neutral-600">
                    <strong className="text-neutral-900">Week 3-4:</strong> {selectedProgram.curriculum.week3} {selectedProgram.curriculum.week4}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Athlete Scouting Passport Modal */}
      {selectedAthlete && (
        <div 
          id="athlete-modal-overlay"
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedAthlete(null)}
        >
          <div 
            id="athlete-modal-content"
            className="bg-white max-w-lg w-full border border-neutral-300 shadow-2xl relative text-left rounded-none overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              id="close-athlete-modal"
              onClick={() => setSelectedAthlete(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-black/60 text-white flex items-center justify-center border border-white/10 hover:bg-[#cc0000] hover:text-white transition-colors z-50 rounded-none"
            >
              ✕
            </button>

            <div className="p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-24 h-32 sm:w-28 sm:h-36 overflow-hidden border border-neutral-200 flex-shrink-0 rounded-none">
                  <img 
                    className="w-full h-full object-cover" 
                    alt={selectedAthlete.name} 
                    src={selectedAthlete.image}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-left flex flex-col justify-center">
                  <span className="font-mono text-[9px] text-white uppercase font-bold tracking-widest bg-[#cc0000] px-2 py-0.5 rounded-none self-start mb-2">
                    {selectedAthlete.badge}
                  </span>
                  <h4 className="font-sans text-xl sm:text-2xl font-black text-neutral-900 uppercase leading-tight">
                    {selectedAthlete.name}
                  </h4>
                  <p className="font-mono text-xs text-neutral-500 uppercase mt-1">
                    {selectedAthlete.category} • {selectedAthlete.role}
                  </p>
                </div>
              </div>

              <div>
                <h5 className="font-mono text-[9px] text-[#cc0000] uppercase tracking-widest font-black mb-1">
                  Athlete Bio
                </h5>
                <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                  {selectedAthlete.bio}
                </p>
              </div>

              <div>
                <h5 className="font-mono text-[9px] text-neutral-800 uppercase tracking-wider font-black mb-2">
                  Key Achievements
                </h5>
                <ul className="space-y-1.5">
                  {selectedAthlete.achievements.map((ach, idx) => (
                    <li key={idx} className="text-xs text-neutral-700 flex items-start gap-2 leading-relaxed">
                      <Award className="w-4 h-4 text-[#cc0000] flex-shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-neutral-100 pt-4">
                <h5 className="font-mono text-[9px] text-[#cc0000] uppercase tracking-widest font-black mb-3">
                  Telemetry Performance Scores (Out of 100)
                </h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-neutral-500">Sprint Speed</span>
                      <span className="text-neutral-900 font-bold font-mono">{selectedAthlete.metrics.speed}</span>
                    </div>
                    <div className="w-full bg-neutral-100 h-1.5 rounded-none overflow-hidden">
                      <div className="bg-[#cc0000] h-full" style={{ width: `${selectedAthlete.metrics.speed}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-neutral-500">Lactate Stamina</span>
                      <span className="text-neutral-900 font-bold font-mono">{selectedAthlete.metrics.stamina}</span>
                    </div>
                    <div className="w-full bg-neutral-100 h-1.5 rounded-none overflow-hidden">
                      <div className="bg-[#cc0000] h-full" style={{ width: `${selectedAthlete.metrics.stamina}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-neutral-500">Explosive Power</span>
                      <span className="text-neutral-900 font-bold font-mono">{selectedAthlete.metrics.power}</span>
                    </div>
                    <div className="w-full bg-neutral-100 h-1.5 rounded-none overflow-hidden">
                      <div className="bg-[#cc0000] h-full" style={{ width: `${selectedAthlete.metrics.power}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-neutral-500">Tactical IQ</span>
                      <span className="text-neutral-900 font-bold font-mono">{selectedAthlete.metrics.tactical}</span>
                    </div>
                    <div className="w-full bg-neutral-100 h-1.5 rounded-none overflow-hidden">
                      <div className="bg-[#cc0000] h-full" style={{ width: `${selectedAthlete.metrics.tactical}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tour Video Modal */}
      {isTourOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setIsTourOpen(false)}
        >
          <div 
            className="bg-white max-w-xl w-full border border-neutral-300 shadow-2xl p-6 relative text-center rounded-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsTourOpen(false)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-[#cc0000] text-sm"
            >
              ✕
            </button>
            <h4 className="font-sans text-xl font-black text-neutral-900 mb-2 uppercase">
              MIST INDORE HIGH PERFORMANCE TOUR
            </h4>
            <p className="font-sans text-xs text-neutral-500 mb-6 font-semibold">
              Step inside our world-class indoor sports lab in Sanwer Road, Indore, India.
            </p>
            <div className="aspect-video bg-neutral-950 flex flex-col items-center justify-center border border-neutral-200 p-4 relative group overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:scale-105 transition-transform" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCirPwzbgP-6jxHZj4jpq4RflW2S7nyfKFU0piqKmntNLfsXSmf0iV9c4O9xkReCOLRPpFwgKNARKg6RABGvw95Yq6NDBjK680ioU1TmQohEfb2ioBCOb_4y-9SPCPjYb0HSpQTEpdGiVfg8WlKYkUqf2m0KmAvTRhekpZu7gq2QPRWK3sXNWunGFaYIsK_6JbuD1MBelYeoYmV6RYYu_BCtQwR3v__ZNKFC4e5QxdQjuLtrTYLOkP9m4zJjy8gD_JoJG9Pd7oWZCTp')` }} />
              <div className="z-10 w-12 h-12 rounded-none bg-[#cc0000] flex items-center justify-center text-white shadow-lg animate-bounce cursor-pointer">
                <Play className="w-5 h-5 fill-white" />
              </div>
              <span className="z-10 text-xs text-white font-mono mt-4 font-bold bg-black/60 px-3 py-1">
                SIMULATING INDORE HIGH PERFORMANCE LAB
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-6">
              <div className="bg-neutral-50 border border-neutral-200 p-2 text-left">
                <span className="font-mono text-[9px] text-[#cc0000] block uppercase font-black">Speed Gun</span>
                <span className="text-[10px] text-neutral-700 font-semibold">Full bowling tracking</span>
              </div>
              <div className="bg-neutral-50 border border-neutral-200 p-2 text-left">
                <span className="font-mono text-[9px] text-[#cc0000] block uppercase font-black">Force Plate</span>
                <span className="text-[10px] text-neutral-700 font-semibold">Vertical load sensor</span>
              </div>
              <div className="bg-neutral-50 border border-neutral-200 p-2 text-left">
                <span className="font-mono text-[9px] text-[#cc0000] block uppercase font-black">Oxygen Lab</span>
                <span className="text-[10px] text-neutral-700 font-semibold">Lactate analysis</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scouting Evaluation Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-neutral-50/98 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 border-4 border-[#cc0000] border-t-transparent animate-spin mb-8" />
          <div className="border border-[#cc0000]/30 bg-[#cc0000]/5 px-3 py-1.5 mb-3 inline-block">
            <span className="font-mono text-xs text-[#cc0000] uppercase font-bold tracking-widest animate-pulse">
              Scouting Diagnostics Engine Active
            </span>
          </div>
          <h4 className="font-sans text-xl sm:text-2xl font-black text-neutral-900 uppercase mb-2">
            AUDITING ATHLETIC REGISTRY
          </h4>
          <p className="font-sans text-sm text-neutral-500 max-w-sm">
            {loadingStep}
          </p>
        </div>
      )}

      {/* Scouting Diagnostic Success Modal */}
      {submitStatus === "success" && newScoutingReport && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full border border-neutral-300 shadow-2xl relative text-left rounded-none overflow-hidden">
            <div className="bg-neutral-50 p-6 border-b border-neutral-200 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-600 font-mono text-[10px] font-extrabold uppercase tracking-wider mb-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Scouting File Generated Successfully
                </div>
                <h4 className="font-sans text-xl font-black text-neutral-900 uppercase">
                  INSTANT SCOUT EVALUATION
                </h4>
              </div>
              <button 
                onClick={() => setSubmitStatus("idle")}
                className="text-neutral-500 hover:text-[#cc0000] text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              {newScoutingReport.aiEvaluation ? (
                <>
                  <div className="flex items-center gap-6 bg-neutral-50 border border-neutral-200 p-4 rounded-none">
                    <div className="text-center">
                      <span className="font-mono text-[9px] text-neutral-500 block uppercase font-bold">Score</span>
                      <div className="font-sans text-3xl font-black text-[#cc0000]">
                        {newScoutingReport.aiEvaluation.score}/100
                      </div>
                    </div>
                    <div className="border-l border-neutral-200 h-10" />
                    <div>
                      <span className="font-mono text-[9px] text-[#cc0000] block uppercase font-black">Assigned Scout Director</span>
                      <div className="font-sans text-xs font-bold text-neutral-900">
                        {newScoutingReport.aiEvaluation.coachName}
                      </div>
                      <p className="text-[10px] text-neutral-500 mt-0.5">High Performance Board</p>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-mono text-[9px] text-[#cc0000] uppercase tracking-widest font-black mb-2">
                      Athletic Diagnostics Audit
                    </h5>
                    <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                      {newScoutingReport.aiEvaluation.assessment}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-mono text-[9px] text-emerald-600 uppercase tracking-wider font-extrabold mb-2">
                        Identified Strengths
                      </h6>
                      <ul className="space-y-1">
                        {newScoutingReport.aiEvaluation.strengths.map((str: string, idx: number) => (
                          <li key={idx} className="text-xs text-neutral-600 flex items-start gap-2">
                            <span className="text-emerald-500">•</span> {str}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-mono text-[9px] text-amber-600 uppercase tracking-wider font-extrabold mb-2">
                        Development Gaps
                      </h6>
                      <ul className="space-y-1">
                        {newScoutingReport.aiEvaluation.gaps.map((gap: string, idx: number) => (
                          <li key={idx} className="text-xs text-neutral-600 flex items-start gap-2">
                            <span className="text-amber-500">•</span> {gap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-neutral-100 pt-4">
                    <h6 className="font-mono text-[9px] text-[#cc0000] uppercase tracking-widest font-black mb-3">
                      High-Performance Routine Phase 1
                    </h6>
                    <div className="bg-neutral-50 border border-neutral-200 p-3 rounded-none">
                      <span className="font-mono text-[10px] text-neutral-800 uppercase font-black">
                        {newScoutingReport.aiEvaluation.recommendedSchedule[0].phase}
                      </span>
                      <p className="text-[11px] text-neutral-600 mt-1 mb-2 font-semibold">
                        Focus: {newScoutingReport.aiEvaluation.recommendedSchedule[0].focus}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {newScoutingReport.aiEvaluation.recommendedSchedule[0].routine.map((rout: string, idx: number) => (
                          <span key={idx} className="bg-white border border-neutral-200 px-2.5 py-1 text-[10px] text-neutral-800 font-semibold">
                            {rout}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-6 text-neutral-500 text-xs">
                  Error parsing scouting evaluation. Please visit the Scout Portal to retry.
                </div>
              )}

              <div className="border-t border-neutral-100 pt-6 flex items-center justify-between gap-4">
                <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">
                  ID: {newScoutingReport.id}
                </span>
                <button
                  onClick={() => {
                    setSubmitStatus("idle");
                    setActiveTab("scout");
                  }}
                  className="bg-[#cc0000] text-white font-sans font-bold px-4 py-2 text-xs hover:bg-[#aa0000] transition-colors rounded-none"
                >
                  Go to Scout Portal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* General Submission Failure Modal */}
      {submitStatus === "error" && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full border border-red-500/30 p-6 shadow-2xl relative text-center rounded-none">
            <ShieldAlert className="w-12 h-12 text-[#cc0000] mx-auto mb-4 animate-bounce" />
            <h4 className="font-sans text-lg font-black text-neutral-900 mb-2 uppercase">
              Connection Blocked
            </h4>
            <p className="font-sans text-xs text-neutral-500 leading-relaxed mb-6 font-semibold">
              Unable to reach the high-performance scouting registry. Please check your network connection and retry the transmission.
            </p>
            <button 
              onClick={() => setSubmitStatus("idle")}
              className="bg-[#cc0000] hover:bg-[#aa0000] text-white font-sans font-bold px-6 py-2 text-xs transition-colors rounded-none"
            >
              Retry Transmission
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
