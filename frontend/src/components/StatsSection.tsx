import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, ScatterChart, Scatter, ZAxis } from "recharts";
import { TrendingUp, BarChart3, Target, Activity, ShieldCheck, Zap } from "lucide-react";

// Progression over 6-month cycles
const PROGRESSION_DATA = [
  { month: "Jan", speed: 72, power: 65, stamina: 70 },
  { month: "Feb", speed: 78, power: 70, stamina: 75 },
  { month: "Mar", speed: 82, power: 74, stamina: 80 },
  { month: "Apr", speed: 85, power: 81, stamina: 84 },
  { month: "May", speed: 91, power: 88, stamina: 89 },
  { month: "Jun", speed: 96, power: 93, stamina: 94 },
];

// Medal Tally over 4 Years
const MEDAL_DATA = [
  { year: "2023", Gold: 8, Silver: 12, Bronze: 15 },
  { year: "2024", Gold: 11, Silver: 15, Bronze: 18 },
  { year: "2025", Gold: 15, Silver: 19, Bronze: 21 },
  { year: "2026", Gold: 19, Silver: 22, Bronze: 26 },
];

// Athlete Biomechanical Mapping (Power vs Speed)
const BIOMECHANICAL_DATA = [
  { name: "Sanya Mirza", speed: 99, power: 95, category: "Athletics", score: 97 },
  { name: "Aman Gill", speed: 95, power: 82, category: "Basketball", score: 88 },
  { name: "Vikram Singh", speed: 84, power: 92, category: "Cricket", score: 88 },
  { name: "Riya Sharma", speed: 91, power: 78, category: "Football", score: 84 },
  { name: "Rajveer Brar", speed: 88, power: 91, category: "Cricket", score: 89 },
  { name: "Baljit Singh", speed: 74, power: 94, category: "Basketball", score: 84 },
  { name: "Sukhwinder Sidhu", speed: 96, power: 80, category: "Football", score: 88 },
  { name: "Karan Johal", speed: 92, power: 89, category: "Athletics", score: 90 },
];

export default function StatsSection() {
  const [selectedDashboard, setSelectedDashboard] = useState<"progression" | "medals" | "biomechanics">("progression");

  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 py-12 text-left bg-white">
      <div className="mb-12">
        <div className="border border-[#cc0000]/30 bg-[#cc0000]/5 px-3 py-1 mb-3 inline-block">
          <span className="font-mono text-[9px] text-[#cc0000] tracking-widest uppercase font-bold">
            ACADEMY TELEMETRY DATABASE
          </span>
        </div>
        <h2 className="font-sans text-3xl sm:text-5xl font-black text-neutral-900 uppercase tracking-tight">
          ANALYTICS & BIOMECHANICS
        </h2>
        <p className="text-neutral-600 font-sans text-xs md:text-sm mt-2 max-w-2xl font-semibold">
          Track the development progress, structural achievements, and physical metrics of our athletes using scientific data analytics charts.
        </p>
      </div>

      {/* Grid selector buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => setSelectedDashboard("progression")}
          className={`p-4 border text-left transition-all flex items-start gap-3 rounded-none ${
            selectedDashboard === "progression"
              ? "border-[#cc0000] bg-[#cc0000]/5 shadow-xs"
              : "border-neutral-200 bg-white hover:border-[#cc0000]/30 hover:bg-neutral-55"
          }`}
        >
          <TrendingUp className={`w-5 h-5 mt-0.5 ${selectedDashboard === "progression" ? "text-[#cc0000]" : "text-neutral-400"}`} />
          <div>
            <h4 className="font-sans text-xs font-bold text-neutral-900 uppercase tracking-wider">6-Month Development Progression</h4>
            <p className="text-[10px] text-neutral-500 mt-1 font-semibold">Lactate, speed acceleration, and explosive jump averages.</p>
          </div>
        </button>

        <button
          onClick={() => setSelectedDashboard("biomechanics")}
          className={`p-4 border text-left transition-all flex items-start gap-3 rounded-none ${
            selectedDashboard === "biomechanics"
              ? "border-[#cc0000] bg-[#cc0000]/5 shadow-xs"
              : "border-neutral-200 bg-white hover:border-[#cc0000]/30 hover:bg-neutral-55"
          }`}
        >
          <Activity className={`w-5 h-5 mt-0.5 ${selectedDashboard === "biomechanics" ? "text-[#cc0000]" : "text-neutral-400"}`} />
          <div>
            <h4 className="font-sans text-xs font-bold text-neutral-900 uppercase tracking-wider">Athlete Biomechanics Mapping</h4>
            <p className="text-[10px] text-neutral-500 mt-1 font-semibold">Explosive power against maximum sprint velocity benchmarks.</p>
          </div>
        </button>

        <button
          onClick={() => setSelectedDashboard("medals")}
          className={`p-4 border text-left transition-all flex items-start gap-3 rounded-none ${
            selectedDashboard === "medals"
              ? "border-[#cc0000] bg-[#cc0000]/5 shadow-xs"
              : "border-neutral-200 bg-white hover:border-[#cc0000]/30 hover:bg-neutral-55"
          }`}
        >
          <BarChart3 className={`w-5 h-5 mt-0.5 ${selectedDashboard === "medals" ? "text-[#cc0000]" : "text-neutral-400"}`} />
          <div>
            <h4 className="font-sans text-xs font-bold text-neutral-900 uppercase tracking-wider">Scouting Tournament Medals</h4>
            <p className="text-[10px] text-neutral-500 mt-1 font-semibold">Annual national, state, and district trophies accumulation.</p>
          </div>
        </button>
      </div>

      {/* Main Chart Card */}
      <div className="bg-white border border-neutral-200 p-6 md:p-8 rounded-none shadow-sm">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-100">
          <div>
            <h3 className="font-sans text-sm font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#cc0000] animate-pulse" />
              {selectedDashboard === "progression" && "6-Month Development Progression"}
              {selectedDashboard === "biomechanics" && "Athlete Biomechanics Scatter Mapping"}
              {selectedDashboard === "medals" && "Scouting Tournament Trophies Cabinet"}
            </h3>
            <p className="text-[10px] text-neutral-500 mt-1 font-mono uppercase font-bold">
              {selectedDashboard === "progression" && "Telemetry Metrics: Mean Scores (0 - 100)"}
              {selectedDashboard === "biomechanics" && "Telemetry Metrics: Sprint Velocity (X) vs Muscle Output (Y)"}
              {selectedDashboard === "medals" && "Telemetry Metrics: Cumulative Podiums won annually"}
            </p>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Calibration Secure
          </div>
        </div>

        <div className="w-full h-[320px] md:h-[400px]">
          {selectedDashboard === "progression" && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PROGRESSION_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#cc0000" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#cc0000" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#171717" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#171717" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#737373" fontSize={11} tickLine={false} />
                <YAxis stroke="#737373" fontSize={11} tickLine={false} domain={[50, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e5e5e5", borderRadius: "0px" }}
                  labelStyle={{ color: "#cc0000", fontSize: "11px", fontWeight: "bold" }}
                  itemStyle={{ fontSize: "11px", color: "#171717" }}
                />
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "15px" }} />
                <Area type="monotone" dataKey="speed" name="Speed Acceleration Index" stroke="#cc0000" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSpeed)" />
                <Area type="monotone" dataKey="power" name="Explosive Power Output" stroke="#171717" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPower)" />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {selectedDashboard === "biomechanics" && (
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" dataKey="speed" name="Max Speed Score" unit="%" stroke="#737373" fontSize={11} tickLine={false} domain={[70, 100]} />
                <YAxis type="number" dataKey="power" name="Dynamic Power Output" unit="%" stroke="#737373" fontSize={11} tickLine={false} domain={[70, 100]} />
                <ZAxis type="number" dataKey="score" range={[60, 240]} name="Overall Rating" />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e5e5e5", borderRadius: "0px" }}
                  itemStyle={{ fontSize: "11px", color: "#171717" }}
                  labelStyle={{ color: "#cc0000", fontSize: "11px" }}
                />
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "15px" }} />
                <Scatter name="Elite Candidates" data={BIOMECHANICAL_DATA} fill="#cc0000" shape="circle" />
              </ScatterChart>
            </ResponsiveContainer>
          )}

          {selectedDashboard === "medals" && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MEDAL_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" stroke="#737373" fontSize={11} tickLine={false} />
                <YAxis stroke="#737373" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e5e5e5", borderRadius: "0px" }}
                  labelStyle={{ color: "#cc0000", fontSize: "11px", fontWeight: "bold" }}
                  itemStyle={{ fontSize: "11px", color: "#171717" }}
                />
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "15px" }} />
                <Bar dataKey="Gold" fill="#cc0000" radius={[0, 0, 0, 0]} name="Gold Podiums" />
                <Bar dataKey="Silver" fill="#171717" radius={[0, 0, 0, 0]} name="Silver Podiums" />
                <Bar dataKey="Bronze" fill="#a3a3a3" radius={[0, 0, 0, 0]} name="Bronze Podiums" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Metric Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="bg-white border border-neutral-200 p-5 shadow-xs rounded-none">
          <span className="font-mono text-[9px] text-[#cc0000] uppercase block mb-1 font-black">Max Speed Trigger</span>
          <span className="text-xl font-bold text-neutral-900 font-mono">11.18s</span>
          <p className="text-[10px] text-neutral-500 mt-1 leading-relaxed font-semibold">
            Record regional sprint time held by athlete Sanya Mirza.
          </p>
        </div>

        <div className="bg-white border border-neutral-200 p-5 shadow-xs rounded-none">
          <span className="font-mono text-[9px] text-neutral-700 uppercase block mb-1 font-black">Max Ball Speed</span>
          <span className="text-xl font-bold text-neutral-900 font-mono">132 km/h</span>
          <p className="text-[10px] text-neutral-500 mt-1 leading-relaxed font-semibold">
            Registered District fast bowling velocity of bowler Rajveer Brar.
          </p>
        </div>

        <div className="bg-white border border-neutral-200 p-5 shadow-xs rounded-none">
          <span className="font-mono text-[9px] text-[#cc0000] uppercase block mb-1 font-black">Mean Jump Height</span>
          <span className="text-xl font-bold text-neutral-900 font-mono">38.4 in</span>
          <p className="text-[10px] text-neutral-500 mt-1 leading-relaxed font-semibold">
            FIBA wooden court force-plate vertical average of our core team.
          </p>
        </div>

        <div className="bg-white border border-neutral-200 p-5 shadow-xs rounded-none">
          <span className="font-mono text-[9px] text-neutral-700 uppercase block mb-1 font-black">Sprint Blocks</span>
          <span className="text-xl font-bold text-neutral-900 font-mono">0.115s</span>
          <p className="text-[10px] text-neutral-500 mt-1 leading-relaxed font-semibold">
            Starting block load-cell sensor reaction speed average.
          </p>
        </div>
      </div>
    </div>
  );
}
