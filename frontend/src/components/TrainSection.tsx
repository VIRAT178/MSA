import React, { useState, useRef, useEffect } from "react";
import { PROGRAMS } from "../data";
import { Program } from "../types";
import { getCoachFallbackResponse } from "../lib/firebase";
import { Sparkles, Send, ShieldAlert, Dumbbell, Flame, RotateCcw, AlertCircle, Heart } from "lucide-react";

export default function TrainSection() {
  const [selectedSport, setSelectedSport] = useState<Program>(PROGRAMS[0]);
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "model"; text: string }[]>([
    {
      role: "model",
      text: "Athlete, Coach Baldev here. I have trained elite state champions and Olympians. What specific performance gap, nutritional query, or biomechanical challenge are we analyzing today? Let's write your formula for victory."
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isSending) return;

    const userText = userInput.trim();
    setUserInput("");
    setChatMessages((prev) => [...prev, { role: "user", text: userText }]);
    setIsSending(true);

    try {
      // Simulate network response time for high-quality feel
      await new Promise((resolve) => setTimeout(resolve, 600));
      
      const coachReplyText = getCoachFallbackResponse(selectedSport.name, userText);
      setChatMessages((prev) => [...prev, { role: "model", text: coachReplyText }]);
    } catch (err) {
      console.error(err);
      setChatMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: `Coach Baldev here. Keep pushing. For ${selectedSport.name}, focus on core rigidity and rapid sprint intervals today. Hydrate with electrolyte-dense water and focus on clean protein recovery.`
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const clearChatHistory = () => {
    setChatMessages([
      {
        role: "model",
        text: `Coach Baldev here. Tactical whiteboard cleared. What core sports science or physical training metric shall we optimize next for your ${selectedSport.name} development?`
      }
    ]);
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 py-12 text-left bg-white">
      <div className="mb-12">
        <div className="border border-[#cc0000]/30 bg-[#cc0000]/5 px-3 py-1 mb-3 inline-block">
          <span className="font-mono text-[9px] text-[#cc0000] tracking-widest uppercase font-bold">
            HIGH PERFORMANCE COCKPIT
          </span>
        </div>
        <h2 className="font-sans text-3xl sm:text-5xl font-black text-neutral-900 uppercase tracking-tight">
          ELITE TRAINING ENGINE
        </h2>
        <p className="text-neutral-600 font-sans text-xs md:text-sm mt-2 max-w-2xl font-semibold">
          Deploy state-of-the-art biomechanical telemetry, view weekly curriculum plans, and consult our legendary AI coach to optimize your high-performance schedule.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Sports Select & Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-neutral-200 p-6 shadow-xs">
            <h3 className="font-sans text-sm font-bold text-neutral-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-[#cc0000]" /> Select Your Track
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {PROGRAMS.map((prog) => (
                <button
                  key={prog.id}
                  onClick={() => setSelectedSport(prog)}
                  className={`py-3 px-4 text-xs font-mono uppercase font-bold tracking-wider transition-all text-center border rounded-none ${
                    selectedSport.id === prog.id
                      ? "bg-[#cc0000] text-white border-[#cc0000] font-bold shadow-xs"
                      : "bg-white text-neutral-600 border-neutral-200 hover:border-[#cc0000]/40 hover:text-[#cc0000]"
                  }`}
                >
                  {prog.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Program Curriculum Card */}
          <div className="bg-white border border-neutral-200 overflow-hidden shadow-sm">
            <div className="relative h-40">
              <img
                src={selectedSport.image}
                alt={selectedSport.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <span className="font-mono text-[9px] text-white bg-[#cc0000] uppercase font-bold tracking-widest px-2 py-0.5">
                  {selectedSport.name}
                </span>
                <h4 className="font-sans text-lg font-black text-white uppercase mt-0.5">
                  High-Performance Path
                </h4>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-xs text-neutral-600 leading-relaxed font-semibold">
                {selectedSport.description}
              </p>

              <div className="border-t border-neutral-100 pt-4 space-y-3">
                <h5 className="font-mono text-[9px] text-[#cc0000] uppercase tracking-widest font-black">
                  Weekly Micro-Cycles
                </h5>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-neutral-50 border-l-2 border-[#cc0000]">
                    <span className="font-bold text-neutral-900">Week 1-2: Mechanical Baseline</span>
                    <p className="text-[11px] text-neutral-600 mt-1 font-semibold">{selectedSport.curriculum.week1}</p>
                  </div>
                  <div className="p-3 bg-neutral-50 border-l-2 border-neutral-800">
                    <span className="font-bold text-neutral-900">Week 3-4: Tactical Overload</span>
                    <p className="text-[11px] text-neutral-600 mt-1 font-semibold">{selectedSport.curriculum.week3}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-100 pt-4">
                <h5 className="font-mono text-[9px] text-[#cc0000] uppercase tracking-widest font-black mb-2">
                  Facility Diagnostics Active
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSport.highlights.map((high, idx) => (
                    <span key={idx} className="bg-neutral-50 border border-neutral-200 text-neutral-700 font-bold text-[10px] px-2.5 py-1">
                      {high}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Coach Baldev Chat */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-neutral-200 flex flex-col h-[520px] md:h-[580px] overflow-hidden shadow-md">
            
            {/* Chat Header */}
            <div className="p-4 bg-neutral-50 border-b border-neutral-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 border border-neutral-200 overflow-hidden rounded-none">
                    <img 
                      className="w-full h-full object-cover" 
                      alt="Coach Baldev Singh" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_mnhZhJ4k5qcLhRndXPsiGiW4h9RdQjzR3B5vYPI4C6MiccGNjgwSjlceZbPJDBmU6lDf5R45ayrP3SlY68OTZdX3Ml2ddmbXdzuf8zb6zt9_-KaSCkHrRMitZUajhO8-biIjSUeDxLDyQ0YIx-6e5_W-3xvn1ngJtodonTsRSNFGse0Qnvq3_DsOBXpl4kVKfzu2Th9h-_FYx4dy58n2NdCzqOvd9lY_xVveNPSo--tu1tBla2J3jbPVWJ3TFD4MCvWRzc_ONao8"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
                </div>
                <div>
                  <h4 className="font-sans text-xs md:text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                    Coach Baldev Singh <Sparkles className="w-3.5 h-3.5 text-[#cc0000]" />
                  </h4>
                  <p className="font-mono text-[9px] text-[#cc0000] uppercase font-bold">
                    Head of Performance • {selectedSport.name.split(" ")[0]}
                  </p>
                </div>
              </div>

              <button
                onClick={clearChatHistory}
                className="text-neutral-500 hover:text-[#cc0000] p-1.5 hover:bg-neutral-150 transition-colors"
                title="Reset Tactical Board"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Message Window */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scroll-hide bg-neutral-50/50">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 max-w-[85%] ${
                    msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-7 h-7 flex-shrink-0 flex items-center justify-center font-bold text-[10px] ${
                      msg.role === "user"
                        ? "bg-neutral-800 text-white"
                        : "bg-[#cc0000] text-white"
                    }`}
                  >
                    {msg.role === "user" ? "A" : "CB"}
                  </div>
                  
                  <div
                    className={`p-3.5 text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-white border border-neutral-200 text-neutral-800 text-right font-sans"
                        : "bg-white border border-neutral-100 text-neutral-600 font-semibold"
                    }`}
                  >
                    {/* Simplified markdown format rendering */}
                    <div className="space-y-1 text-left whitespace-pre-wrap">
                      {msg.text.split("\n").map((line, lIdx) => {
                        let styledLine = line;
                        // Replace **text** with bold tags
                        const boldRegex = /\*\*(.*?)\*\*/g;
                        const parts = [];
                        let lastIndex = 0;
                        let match;
                        while ((match = boldRegex.exec(line)) !== null) {
                          if (match.index > lastIndex) {
                            parts.push(styledLine.substring(lastIndex, match.index));
                          }
                          parts.push(<strong key={match.index} className="text-[#cc0000] font-bold">{match[1]}</strong>);
                          lastIndex = boldRegex.lastIndex;
                        }
                        if (lastIndex < line.length) {
                          parts.push(line.substring(lastIndex));
                        }

                        return (
                          <p key={lIdx}>
                            {parts.length > 0 ? parts : line}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isSending && (
                <div className="flex gap-3 max-w-[80%] items-center">
                  <div className="w-7 h-7 bg-[#cc0000] text-white flex items-center justify-center font-bold text-[10px]">
                    CB
                  </div>
                  <div className="p-3 bg-white border border-neutral-100 text-neutral-500 font-semibold flex items-center gap-1.5 font-mono">
                    <span className="w-1.5 h-1.5 bg-[#cc0000] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-[#cc0000] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-[#cc0000] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    Analyzing athletic metrics...
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-neutral-50 border-t border-neutral-200 flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={`Ask Coach Baldev about ${selectedSport.name} metrics, diet, or routines...`}
                className="flex-1 bg-white border border-neutral-200 px-4 py-2.5 text-xs text-neutral-800 placeholder-neutral-400 focus:border-[#cc0000] outline-none"
              />
              <button
                type="submit"
                disabled={!userInput.trim() || isSending}
                className="w-10 h-10 bg-[#cc0000] hover:bg-[#aa0000] text-white flex items-center justify-center transition-all disabled:opacity-40 disabled:scale-100 active:scale-95 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
