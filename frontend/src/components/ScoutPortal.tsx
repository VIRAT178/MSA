import React, { useState, useEffect } from "react";
import { Inquiry } from "../types";
import { FileText, ClipboardList, ShieldAlert, CheckCircle, Clock, Sparkles, Trophy, Star, ChevronRight, UserCheck, RefreshCw } from "lucide-react";

interface ScoutPortalProps {
  inquiries: Inquiry[];
  onRefresh: () => void;
  openInquiryForm: () => void;
}

export default function ScoutPortal({ inquiries, onRefresh, openInquiryForm }: ScoutPortalProps) {
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Auto-select the first or newest inquiry if available
  useEffect(() => {
    if (inquiries.length > 0 && !selectedInquiry) {
      setSelectedInquiry(inquiries[inquiries.length - 1]);
    }
  }, [inquiries]);

  const handleRefreshData = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 py-12 text-left bg-white">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
        <div>
          <div className="border border-[#cc0000]/30 bg-[#cc0000]/5 px-3 py-1 mb-3 inline-block">
            <span className="font-mono text-[9px] text-[#cc0000] tracking-widest uppercase font-bold">
              SCOUTING BOARD REGISTRY
            </span>
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl font-black text-neutral-900 uppercase tracking-tight">
            ATHLETE CANDIDATE PORTAL
          </h2>
          <p className="text-neutral-600 font-sans text-xs md:text-sm mt-2 max-w-2xl font-semibold">
            Track your submission files, check AI diagnostic reviews, and explore drafted development routines assigned by our Scouting Board.
          </p>
        </div>

        <button
          onClick={handleRefreshData}
          disabled={isRefreshing}
          className="flex items-center gap-2 bg-white hover:bg-neutral-50 text-xs text-neutral-800 border border-neutral-300 px-4 py-2 rounded-none transition-all font-mono uppercase font-bold shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[#cc0000]" : ""}`} />
          Refresh Registry
        </button>
      </div>

      {inquiries.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-none border border-neutral-200 p-12 text-center max-w-md mx-auto space-y-6 shadow-sm">
          <ClipboardList className="w-16 h-16 text-[#cc0000] mx-auto animate-pulse" />
          <div>
            <h4 className="font-sans text-lg font-bold text-neutral-900 uppercase">No Scouting Files Found</h4>
            <p className="font-sans text-xs text-neutral-500 leading-relaxed mt-2 font-semibold">
              You haven't submitted a performance profile to the scouting board yet. Complete the quick-scout registration to generate your AI performance evaluation.
            </p>
          </div>
          <button
            onClick={openInquiryForm}
            className="w-full bg-[#cc0000] hover:bg-[#aa0000] py-3 text-xs font-bold text-white uppercase tracking-wider rounded-none font-sans"
          >
            Apply for Scouting
          </button>
        </div>
      ) : (
        /* Portal Dashboard Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: List of inquiries */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-sans text-xs font-bold text-neutral-900 uppercase tracking-widest mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#cc0000]" /> Active Applications ({inquiries.length})
            </h3>
            
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 scroll-hide">
              {inquiries.map((inq) => {
                const isSelected = selectedInquiry?.id === inq.id;
                return (
                  <div
                    key={inq.id}
                    id={`portal-list-item-${inq.id}`}
                    onClick={() => setSelectedInquiry(inq)}
                    className={`p-4 border cursor-pointer text-left transition-all rounded-none ${
                      isSelected
                        ? "bg-neutral-50 border-[#cc0000]"
                        : "bg-white border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h4 className="font-sans text-xs font-bold text-neutral-900 truncate max-w-[140px]">
                        {inq.name}
                      </h4>
                      <span className={`font-mono text-[9px] px-2 py-0.5 rounded-none font-extrabold uppercase ${
                        inq.status === "accepted" 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : inq.status === "reviewed"
                            ? "bg-neutral-50 text-neutral-700 border border-neutral-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200 animate-pulse"
                      }`}>
                        {inq.status}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-neutral-500 font-mono font-bold">
                      <span>{inq.sportCategory} Track</span>
                      <span>{new Date(inq.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <button
              onClick={openInquiryForm}
              className="w-full bg-white hover:bg-neutral-50 text-xs text-neutral-800 border border-neutral-300 py-3 rounded-none transition-all font-sans uppercase font-bold text-center"
            >
              + Submit Another Inquiry
            </button>
          </div>

          {/* Right Column: Scouting Details & AI Diagnostics */}
          <div className="lg:col-span-8">
            {selectedInquiry ? (
              <div className="bg-white border border-neutral-200 overflow-hidden shadow-sm rounded-none">
                
                {/* Section title & badge */}
                <div className="p-6 bg-neutral-50 border-b border-neutral-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="font-mono text-[9px] text-[#cc0000] uppercase font-black tracking-widest block mb-1">
                      File ID: {selectedInquiry.id}
                    </span>
                    <h3 className="font-sans text-xl font-black text-neutral-900 uppercase">
                      Scouting File Overview
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {selectedInquiry.status === "accepted" ? (
                      <span className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-none">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Accepted for Selection Trial
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs text-amber-700 font-bold bg-amber-50 border border-amber-200 px-3 py-1 rounded-none animate-pulse">
                        <Clock className="w-3.5 h-3.5" />
                        Under Scout Board Audit
                      </span>
                    )}
                  </div>
                </div>

                {/* Candidate record summary */}
                <div className="p-6 md:p-8 space-y-6">
                  
                  {/* Basic Athlete Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-neutral-100">
                    <div>
                      <span className="font-mono text-[9px] text-neutral-500 block uppercase font-bold">Athlete Candidate</span>
                      <span className="text-xs font-bold text-neutral-900">{selectedInquiry.name}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-neutral-500 block uppercase font-bold">Registered Channel</span>
                      <span className="text-xs font-bold text-neutral-900 truncate block max-w-[180px]">{selectedInquiry.email}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-neutral-500 block uppercase font-bold">Target Sport Disciplines</span>
                      <span className="text-xs font-bold text-[#cc0000]">{selectedInquiry.sportCategory}</span>
                    </div>
                  </div>

                  {/* Submitted background achievements */}
                  <div>
                    <h4 className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider font-bold mb-2">
                      Applicant Sporting Record Statement
                    </h4>
                    <p className="font-sans text-xs text-neutral-800 leading-relaxed p-4 bg-neutral-50 border border-neutral-200 rounded-none whitespace-pre-line italic font-semibold">
                      "{selectedInquiry.performanceBackground}"
                    </p>
                  </div>

                  {/* AI Evaluation */}
                  {selectedInquiry.aiEvaluation ? (
                    <div className="space-y-6 border-t border-neutral-100 pt-6">
                      
                      {/* Score Metrics Gauge */}
                      <div className="flex flex-col sm:flex-row gap-6 bg-neutral-50 border border-neutral-200 p-5 rounded-none">
                        <div className="text-center sm:text-left flex flex-col justify-center">
                          <span className="font-mono text-[9px] text-neutral-500 block uppercase font-bold">Elite Readiness Index</span>
                          <div className="font-sans text-4xl sm:text-5xl font-black text-[#cc0000] tracking-tighter mt-1">
                            {selectedInquiry.aiEvaluation.score}/100
                          </div>
                        </div>
                        <div className="hidden sm:block border-l border-neutral-200 h-14" />
                        <div className="flex-1 text-left flex flex-col justify-center">
                          <span className="font-mono text-[9px] text-[#cc0000] block uppercase font-black">Assigned High-Performance Scout</span>
                          <div className="font-sans text-xs md:text-sm font-bold text-neutral-900 flex items-center gap-1.5 mt-1">
                            {selectedInquiry.aiEvaluation.coachName} <Sparkles className="w-3.5 h-3.5 text-[#cc0000] animate-pulse" />
                          </div>
                          <p className="text-[10px] text-neutral-500 mt-0.5 font-semibold">Scouting & Biomechanical Advisory Board</p>
                        </div>
                      </div>

                      {/* Scout opinion */}
                      <div>
                        <h4 className="font-mono text-[9px] text-[#cc0000] uppercase tracking-widest font-black mb-2">
                          Scouting Board Diagnostics Report
                        </h4>
                        <p className="font-sans text-xs text-neutral-600 leading-relaxed font-semibold">
                          {selectedInquiry.aiEvaluation.assessment}
                        </p>
                      </div>

                      {/* Strengths & Gaps */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                        <div className="bg-emerald-50/10 border border-emerald-100 p-4 rounded-none">
                          <h5 className="font-mono text-[9px] text-emerald-700 uppercase tracking-wider font-extrabold mb-3 flex items-center gap-1.5">
                            <Star className="w-3.5 h-3.5 text-emerald-600" /> Strengths Identified
                          </h5>
                          <ul className="space-y-1.5">
                            {selectedInquiry.aiEvaluation.strengths.map((str: string, idx: number) => (
                              <li key={idx} className="text-[11px] text-neutral-700 flex items-start gap-2 font-semibold">
                                <span className="text-emerald-500 font-bold">•</span>
                                <span>{str}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-amber-50/10 border border-amber-100 p-4 rounded-none">
                          <h5 className="font-mono text-[9px] text-amber-700 uppercase tracking-wider font-extrabold mb-3 flex items-center gap-1.5">
                            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> Development Areas
                          </h5>
                          <ul className="space-y-1.5">
                            {selectedInquiry.aiEvaluation.gaps.map((gap: string, idx: number) => (
                              <li key={idx} className="text-[11px] text-neutral-700 flex items-start gap-2 font-semibold">
                                <span className="text-amber-500 font-bold">•</span>
                                <span>{gap}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Tailored Workout Routine */}
                      {selectedInquiry.aiEvaluation.recommendedSchedule && selectedInquiry.aiEvaluation.recommendedSchedule.length > 0 && (
                        <div className="border-t border-neutral-100 pt-6">
                          <h4 className="font-mono text-[9px] text-[#cc0000] uppercase tracking-widest font-black mb-4">
                            Formulated High-Performance Drills Schedule
                          </h4>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {selectedInquiry.aiEvaluation.recommendedSchedule.map((phase: any, idx: number) => (
                              <div key={idx} className="bg-neutral-50 border border-neutral-200 p-4 rounded-none text-left">
                                <span className="font-mono text-[9px] text-neutral-700 uppercase font-black">
                                  {phase.phase}
                                </span>
                                <p className="text-[11px] text-neutral-600 font-bold mt-1 mb-3">
                                  Focus: {phase.focus}
                                </p>
                                <div className="space-y-1.5">
                                  {phase.routine.map((rout: string, rIdx: number) => (
                                    <div key={rIdx} className="flex items-center gap-2 text-xs text-neutral-700 font-semibold">
                                      <ChevronRight className="w-3 h-3 text-[#cc0000] flex-shrink-0" />
                                      <span className="truncate">{rout}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  ) : (
                    <div className="border-t border-neutral-100 pt-6 text-center py-6">
                      <Sparkles className="w-8 h-8 text-amber-500 mx-auto animate-spin mb-3" />
                      <p className="text-xs text-neutral-500 font-semibold">
                        Our scouting board is evaluating your credentials...
                      </p>
                    </div>
                  )}

                </div>
              </div>
            ) : (
              <div className="bg-white border border-neutral-200 p-12 text-center text-neutral-500 text-xs font-semibold rounded-none">
                Select an application file on the left side to review scouting reports.
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
