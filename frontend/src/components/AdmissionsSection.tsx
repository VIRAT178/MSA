import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  ClipboardCheck, 
  Target, 
  ShieldCheck, 
  CheckCircle, 
  FileText, 
  Heart, 
  GraduationCap, 
  Camera, 
  Trophy, 
  Phone, 
  User, 
  Send, 
  ArrowRight,
  Info,
  ChevronRight,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { Inquiry } from "../types";
import { createInquiry } from "../lib/firebase";

interface AdmissionsSectionProps {
  onInquirySubmitted: (inquiry: Inquiry) => void;
  setActiveTab: (tab: string) => void;
}

export default function AdmissionsSection({ onInquirySubmitted, setActiveTab }: AdmissionsSectionProps) {
  // Form states
  const [athleteName, setAthleteName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sportCategory, setSportCategory] = useState("Athletics");
  const [ageGroup, setAgeGroup] = useState("Under 17");
  const [message, setMessage] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmitCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!athleteName || !phoneNumber) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setStatusMessage("Establishing link with Admissions HQ...");

    const progressSteps = [
      "Establishing link with Admissions HQ...",
      "Matching age standards with scout roster...",
      "Analyzing profile through AI athletic engine...",
      "Finalizing scout evaluation..."
    ];

    let stepIndex = 0;
    const progressInterval = setInterval(() => {
      stepIndex++;
      if (stepIndex < progressSteps.length) {
        setStatusMessage(progressSteps[stepIndex]);
      }
    }, 900);

    try {
      const email = `${phoneNumber.replace(/[^0-9]/g, "") || "athlete"}@callback.mist.indore.in`;
      const performanceBackground = `Phone Contact: ${phoneNumber}. Age Category: ${ageGroup}. Candidate Statement: ${message || "Interested in joining the high-performance trials."}`;
      
      const data = await createInquiry(
        athleteName,
        email,
        sportCategory,
        performanceBackground
      );

      clearInterval(progressInterval);
      
      // Update local context
      onInquirySubmitted(data);
      
      setIsSubmitting(false);
      setSubmitStatus("success");
      
      // Clear form fields
      setAthleteName("");
      setPhoneNumber("");
      setMessage("");
    } catch (err) {
      console.error(err);
      clearInterval(progressInterval);
      setIsSubmitting(false);
      setSubmitStatus("error");
    }
  };

  const steps = [
    {
      num: "01",
      title: "Registration",
      desc: "Fill the digital form with personal metrics, performance statistics, and sport achievements.",
      icon: <ClipboardCheck className="w-8 h-8 text-[#cc0000] group-hover:text-white" />,
    },
    {
      num: "02",
      title: "Trial/Assessment",
      desc: "On-field physical trials, endurance evaluations, and technical skills scoring by certified head coaches.",
      icon: <Target className="w-8 h-8 text-[#cc0000] group-hover:text-white" />,
    },
    {
      num: "03",
      title: "Eligibility Check",
      desc: "Comprehensive background metric verification and elite sports-science medical screening.",
      icon: <ShieldCheck className="w-8 h-8 text-[#cc0000] group-hover:text-white" />,
    },
    {
      num: "04",
      title: "Final Admission",
      desc: "Official roster registration, gear package allocation, and entry into the high-stakes academy tier.",
      icon: <CheckCircle className="w-8 h-8 text-[#cc0000] group-hover:text-white" />,
    },
  ];

  const documents = [
    { name: "Birth Certificate (Govt. Authorized)", icon: <FileText className="w-5 h-5 text-[#cc0000]" /> },
    { name: "Medical Fitness Certificate", icon: <Heart className="w-5 h-5 text-[#cc0000]" /> },
    { name: "Academic Transcripts (Previous 2 Years)", icon: <GraduationCap className="w-5 h-5 text-[#cc0000]" /> },
    { name: "6 Recent Passport Size Photographs", icon: <Camera className="w-5 h-5 text-[#cc0000]" /> },
    { name: "Sports Achievement Certificates", icon: <Trophy className="w-5 h-5 text-[#cc0000]" /> },
  ];

  return (
    <div className="w-full bg-white text-neutral-800 selection:bg-[#cc0000] selection:text-white">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center bg-neutral-50/85 px-6 md:px-12 py-16 overflow-hidden border-b border-neutral-200 text-left">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(204,0,0,0.04),transparent_60%)] pointer-events-none" />
        <div className="relative z-10 max-w-[1280px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="border border-[#cc0000]/30 bg-[#cc0000]/5 px-3 py-1 inline-block w-fit font-mono text-xs font-bold text-[#cc0000] tracking-widest uppercase">
              ADMISSIONS OPEN 2026-27
            </div>
            
            <h2 className="font-sans text-4xl sm:text-5xl md:text-7xl uppercase leading-none font-black tracking-tighter text-neutral-900">
              Start Your <br />
              <span className="text-[#cc0000]">Journey</span>
            </h2>
            
            <p className="font-sans text-sm md:text-base text-neutral-600 max-w-xl leading-relaxed font-semibold">
              Join the ranks of elite Indian athletes. MIST, Indore delivers world-class biomechanical training, premium infrastructure, and sports-science powered coaching to build future Olympic champions.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => document.getElementById("callback-form-section")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-[#cc0000] hover:bg-[#aa0000] text-white px-8 py-4 font-sans font-bold uppercase tracking-wider text-xs flex items-center gap-2 cursor-pointer transition-colors rounded-none"
              >
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => document.getElementById("protocol-section")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300 px-8 py-4 font-mono text-xs uppercase tracking-widest hover:border-neutral-400 transition-all cursor-pointer rounded-none shadow-xs"
              >
                View Protocol
              </button>
            </div>
          </motion.div>
          
          {/* Hero Right Visual Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex justify-center relative"
          >
            <div className="relative w-full aspect-square bg-white border border-neutral-200 rounded-full flex items-center justify-center p-8 max-w-[420px] shadow-sm">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-neutral-300 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent z-10" />
                <img 
                  className="w-full h-full object-cover grayscale-[0.1] contrast-110" 
                  alt="Modern High Tech Athletic Stadium" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuASrTIiEwKOfRBqhPl4BwePVxXfux0NcVheDlXbKrMNNaBTETHWOBRy59iDt1ReQpXHa5j-FvX2pkEhDXOl5iEb_puyMDhxtBjyTKpJ-CEQBAIH-twdMM1UcdmyEepK42tktsERFHuvfPFERVBG75LXyrLrjilezQE0T85Lw2ExFH_Ft1Y-mX2rLvk3Y0JDsnRPrcsfc4AyztIINe5V7PeZzYZEdFEmrZInPPh4NQIsoM8mh_6DWPuwSiqG2_omrKvkJeY5aRhQS8rV"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Legacy Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 bg-white border border-neutral-200 p-5 rounded-none flex flex-col gap-1 text-left shadow-lg"
              >
                <span className="font-mono text-[9px] text-[#cc0000] tracking-widest uppercase font-black">LEGACY</span>
                <span className="font-sans text-lg font-black text-neutral-900">150+ Medals</span>
              </motion.div>
              
              {/* Biometrics Pulse Dot */}
              <div className="absolute top-12 right-12 w-3 h-3 bg-[#cc0000] rounded-full animate-ping" />
              <div className="absolute top-12 right-12 w-3 h-3 bg-[#cc0000] rounded-full" />
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* Admission Protocol (Process Steps) */}
      <section id="protocol-section" className="py-24 px-6 md:px-12 bg-neutral-50 border-b border-neutral-200 text-left relative">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="font-mono text-[10px] text-[#cc0000] uppercase tracking-[0.2em] font-extrabold">THE ROSTER BLUEPRINT</span>
              <h3 className="font-sans text-3xl sm:text-5xl font-black uppercase tracking-tight mt-1 text-neutral-900">
                Admission <span className="text-[#cc0000]">Protocol</span>
              </h3>
              <p className="font-sans text-xs md:text-sm text-neutral-500 mt-2 max-w-xl font-semibold">
                Our strict four-stage selection standard guarantees that only athletes with ultimate drive and potential join our elite roster.
              </p>
            </div>
            <div className="h-px flex-grow bg-neutral-200 mx-8 hidden md:block"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {steps.map((step, idx) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white border border-neutral-200 p-8 rounded-none flex flex-col gap-6 relative overflow-hidden group hover:border-[#cc0000]/50 hover:bg-neutral-50 transition-all shadow-xs"
              >
                {/* Massive Translucent Watermark */}
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity select-none pointer-events-none text-neutral-900">
                  <span className="text-9xl font-sans font-black">{step.num}</span>
                </div>
                
                {/* Icon Wrapper with glowing hover effect */}
                <div className="w-14 h-14 rounded-none bg-neutral-50 border border-neutral-200 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-[#cc0000] group-hover:border-[#cc0000] shadow-xs">
                  {step.icon}
                </div>

                <div className="flex flex-col gap-2 relative z-10">
                  <span className="font-mono text-[10px] text-[#cc0000] uppercase font-black tracking-widest">STAGE {step.num}</span>
                  <h4 className="font-sans text-xl font-bold text-neutral-900 transition-colors group-hover:text-[#cc0000]">
                    {step.title}
                  </h4>
                  <p className="font-sans text-xs text-neutral-500 leading-relaxed font-semibold">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Required Documentation */}
      <section className="py-24 px-6 md:px-12 text-left border-b border-neutral-200 bg-white relative">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div>
              <span className="font-mono text-[10px] text-[#cc0000] uppercase tracking-[0.2em] font-extrabold">VERIFICATION METRICS</span>
              <h3 className="font-sans text-3xl sm:text-5xl font-black uppercase tracking-tight mt-2 text-neutral-900">
                Required <span className="text-[#cc0000]">Documentation</span>
              </h3>
              <p className="font-sans text-xs md:text-sm text-neutral-500 mt-3 leading-relaxed font-semibold">
                Ensure perfect alignment with physical credentials. Original documents and three sets of certified physical prints must be prepared for verification.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {documents.map((doc, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-4 bg-neutral-50 border border-neutral-200 p-4 rounded-none hover:border-[#cc0000]/30 transition-all group shadow-xs"
                >
                  <div className="w-10 h-10 rounded-none bg-white border border-neutral-200 flex items-center justify-center group-hover:bg-neutral-100 transition-colors">
                    {doc.icon}
                  </div>
                  <span className="font-sans text-sm font-bold text-neutral-800 group-hover:text-[#cc0000] transition-colors">
                    {doc.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-video w-full border border-neutral-200 rounded-none overflow-hidden relative shadow-md">
              <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950/80 via-neutral-950/20 to-transparent z-10" />
              <img 
                className="w-full h-full object-cover" 
                alt="Elite Administrative Standard of Malwa Sports Academy" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWiI7NraW7Wy8wttlJ9CD2xG9YwdCMoEXEhUygGCrUws7reldm1U12PSyrWozusGZFIgwyrRS9vMuuuaS8ug_nNS6bIoLv2RWdVgqf8I937yvGaR0qGs-xV05-iXiWJby_pP0jp4EwdTxGz5VK_82I1hITj8BtT3964ScT5O3hirCc1Pd_DnIFm8NjQUIH_b4q8RkTz3HvbbFMkZ6TwVkCYsqIiMzOPJWidPHVh8xCJu5iGkHkNLgj-WesB9n_GkePLzk8ah39MYTr"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
                <Info className="w-4 h-4 text-white animate-pulse" />
                <span className="font-mono text-[9px] text-white uppercase font-bold tracking-widest">SECURED REGISTRATION DEPT</span>
              </div>
            </div>
            
            {/* Soft decorative glow */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#cc0000]/5 blur-[80px] rounded-full pointer-events-none" />
          </motion.div>
          
        </div>
      </section>

      {/* Inquiry Callback Form */}
      <section id="callback-form-section" className="py-24 px-6 md:px-12 relative text-left overflow-hidden bg-neutral-50/50">
        <div className="absolute inset-0 bg-[#cc0000]/[0.01] -skew-y-2 z-0 pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          
          <div className="bg-white p-8 md:p-14 border border-neutral-200 rounded-none shadow-lg relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#cc0000]/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="text-center mb-10 flex flex-col gap-3">
              <div className="w-12 h-12 rounded-none bg-neutral-50 border border-neutral-200 flex items-center justify-center mx-auto mb-2 text-[#cc0000]">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-sans text-2xl sm:text-4xl font-black uppercase tracking-tight text-neutral-900">
                Request a <span className="text-[#cc0000]">Callback</span>
              </h3>
              <p className="font-sans text-xs md:text-sm text-neutral-500 max-w-lg mx-auto font-semibold">
                Ready to stand before our scouting coordinators? Submit your metrics and an officer will review your background to coordinate trials.
              </p>
            </div>

            <form onSubmit={handleSubmitCallback} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="flex flex-col gap-2">
                <label className="font-sans text-[10px] text-neutral-800 uppercase tracking-widest font-black">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input 
                    type="text"
                    required
                    value={athleteName}
                    onChange={(e) => setAthleteName(e.target.value)}
                    className="w-full bg-white py-3.5 pl-11 pr-4 rounded-none border border-neutral-200 focus:border-[#cc0000] outline-none text-neutral-800 text-sm font-semibold transition-all"
                    placeholder="Athlete Name" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-sans text-[10px] text-neutral-800 uppercase tracking-widest font-black">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input 
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-white py-3.5 pl-11 pr-4 rounded-none border border-neutral-200 focus:border-[#cc0000] outline-none text-neutral-800 text-sm font-semibold transition-all"
                    placeholder="+91 00000 00000" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-sans text-[10px] text-neutral-800 uppercase tracking-widest font-black">Discipline of Interest</label>
                <select 
                  value={sportCategory}
                  onChange={(e) => setSportCategory(e.target.value)}
                  className="w-full bg-white py-3.5 px-4 rounded-none border border-neutral-200 focus:border-[#cc0000] outline-none text-neutral-800 text-sm font-bold transition-all appearance-none"
                >
                  <option value="Cricket">Cricket Athletics</option>
                  <option value="Football">Tactical Football</option>
                  <option value="Basketball">Elite Basketball</option>
                  <option value="Athletics">Track & Field / Athletics</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-sans text-[10px] text-neutral-800 uppercase tracking-widest font-black">Age Category</label>
                <select 
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
                  className="w-full bg-white py-3.5 px-4 rounded-none border border-neutral-200 focus:border-[#cc0000] outline-none text-neutral-800 text-sm font-bold transition-all appearance-none"
                >
                  <option value="Under 14">Under 14</option>
                  <option value="Under 17">Under 17</option>
                  <option value="Under 19">Under 19</option>
                  <option value="Senior Pro">Senior Pro</option>
                </select>
              </div>

              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="font-sans text-[10px] text-neutral-800 uppercase tracking-widest font-black">Performance Credentials & Background</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white p-4 rounded-none border border-neutral-200 focus:border-[#cc0000] outline-none text-neutral-800 text-sm font-semibold transition-all resize-none" 
                  placeholder="Outline recent matches, run times, bowl speed, physical scores, or relevant sports credentials..." 
                  rows={4}
                />
              </div>

              <div className="md:col-span-2 pt-2">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#cc0000] hover:bg-[#aa0000] text-white w-full py-4 rounded-none font-sans text-xs uppercase font-black tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      <span>{statusMessage}</span>
                    </>
                  ) : (
                    <>
                      <span>Connect with Scout HQ</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {submitStatus === "success" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="md:col-span-2 p-5 bg-emerald-50 border border-emerald-200 rounded-none text-emerald-800 text-xs flex flex-col gap-3 text-left"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span className="font-bold">CALLBACK LINK ESTABLISHED!</span>
                  </div>
                  <p className="leading-relaxed font-semibold">
                    A scouting coordinator has been matched to your profile.
                  </p>
                  <div className="h-px bg-emerald-100" />
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] text-emerald-700 font-semibold">We have also generated a Dynamic AI Scouting Analysis for you.</span>
                    <button 
                      type="button"
                      onClick={() => setActiveTab("scout")}
                      className="flex items-center gap-1 font-bold text-[#cc0000] hover:underline font-mono text-[10px]"
                    >
                      <span>GO TO SCOUT PORTAL</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <div className="md:col-span-2 p-4 bg-red-50 border border-red-200 rounded-none text-red-800 text-xs flex items-center gap-2 font-bold">
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#cc0000]" />
                  <span>Failed to coordinate database entry. Please retry.</span>
                </div>
              )}
              
            </form>
          </div>
          
        </div>
      </section>
    </div>
  );
}
