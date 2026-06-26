import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, 
  Activity, 
  Award, 
  Calendar, 
  Clock, 
  Share2, 
  Edit, 
  Check, 
  Plus, 
  Trash2, 
  X, 
  Hash, 
  Dumbbell, 
  Star, 
  Trophy, 
  UserCheck, 
  TrendingUp, 
  Compass, 
  Heart,
  ChevronRight,
  ShieldAlert,
  Save,
  Grid
} from "lucide-react";

interface PerformanceMetric {
  name: string;
  value: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "star" | "trophy" | "badge";
}

interface TrainingSession {
  id: string;
  date: string;
  month: string;
  title: string;
  location: string;
  time: string;
  isMandatory: boolean;
}

interface ProfileData {
  name: string;
  idCode: string;
  sport: string;
  memberTier: string;
  avatarUrl: string;
  metrics: PerformanceMetric[];
  attendance: number;
  achievements: Achievement[];
  sessions: TrainingSession[];
}

const DEFAULT_PROFILE: ProfileData = {
  name: "Aryan Singh",
  idCode: "MIST-2026-042",
  sport: "Cricket (All-rounder)",
  memberTier: "MIST Indore Cadet",
  avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_mnhZhJ4k5qcLhRndXPsiGiW4h9RdQjzR3B5vYPI4C6MiccGNjgwSjlceZbPJDBmU6lDf5R45ayrP3SlY68OTZdX3Ml2ddmbXdzuf8zb6zt9_-KaSCkHrRMitZUajhO8-biIjSUeDxLDyQ0YIx-6e5_W-3xvn1ngJtodonTsRSNFGse0Qnvq3_DsOBXpl4kVKfzu2Th9h-_FYx4dy58n2NdCzqOvd9lY_xVveNPSo--tu1tBla2J3jbPVWJ3TFD4MCvWRzc_ONao8",
  metrics: [
    { name: "Strength", value: 88 },
    { name: "Agility", value: 92 },
    { name: "Endurance", value: 79 },
    { name: "Technical Skill", value: 95 }
  ],
  attendance: 94,
  achievements: [
    {
      id: "ach-1",
      title: "Player of the Month",
      description: "Awarded for exceptional performance in June domestic trials.",
      date: "JUNE 2026",
      type: "star"
    },
    {
      id: "ach-2",
      title: "State Level Gold Medalist",
      description: "First place in the Inter-State Youth Championship.",
      date: "MARCH 2026",
      type: "trophy"
    }
  ],
  sessions: [
    {
      id: "sess-1",
      date: "15",
      month: "JUL",
      title: "Intensive Batting Drill",
      location: "Main Pavilion",
      time: "06:00 AM",
      isMandatory: true
    },
    {
      id: "sess-2",
      date: "17",
      month: "JUL",
      title: "High Intensity Strength Training",
      location: "Academy Gym",
      time: "04:30 PM",
      isMandatory: false
    }
  ]
};

interface ProfileSectionProps {
  currentUser: AppUser;
}

export default function ProfileSection({ currentUser }: ProfileSectionProps) {
  const [profile, setProfile] = useState<ProfileData>(() => {
    const saved = localStorage.getItem("malwa_academy_profile");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return { ...DEFAULT_PROFILE, name: currentUser.name, sport: currentUser.sport || DEFAULT_PROFILE.sport };
      }
    }
    return { ...DEFAULT_PROFILE, name: currentUser.name, sport: currentUser.sport || DEFAULT_PROFILE.sport };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Form states for editing
  const [editForm, setEditForm] = useState<ProfileData>({ ...profile });

  // Sync edit form with profile when modal opens
  useEffect(() => {
    if (isEditing) {
      setEditForm({ ...profile });
    }
  }, [isEditing, profile]);

  // Persist state
  const saveProfileData = (newData: ProfileData) => {
    setProfile(newData);
    localStorage.setItem("malwa_academy_profile", JSON.stringify(newData));
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfileData(editForm);
    setIsEditing(false);
  };

  const handleShare = () => {
    setIsSharing(true);
    setCopiedLink(false);
  };

  const handleCopyLink = () => {
    const shareText = `MIST Indore Athlete Profile: ${profile.name} (${profile.sport}) - ID: ${profile.idCode}. Attendance: ${profile.attendance}%. Strength: ${profile.metrics[0].value}%. Agility: ${profile.metrics[1].value}%.`;
    navigator.clipboard.writeText(shareText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Circular progress math
  const radius = 64;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (profile.attendance / 100) * circumference;

  // Add / Remove item helpers
  const handleMetricChange = (index: number, val: number) => {
    const updatedMetrics = [...editForm.metrics];
    updatedMetrics[index].value = Math.min(100, Math.max(0, val));
    setEditForm({ ...editForm, metrics: updatedMetrics });
  };

  const addAchievement = () => {
    const newAch: Achievement = {
      id: `ach-${Date.now()}`,
      title: "New Certificate / Award",
      description: "Short details of the performance achievement.",
      date: "CURRENT MONTH",
      type: "star"
    };
    setEditForm({ ...editForm, achievements: [newAch, ...editForm.achievements] });
  };

  const removeAchievement = (id: string) => {
    setEditForm({
      ...editForm,
      achievements: editForm.achievements.filter(a => a.id !== id)
    });
  };

  const updateAchievementField = (id: string, field: keyof Achievement, value: string) => {
    setEditForm({
      ...editForm,
      achievements: editForm.achievements.map(a => a.id === id ? { ...a, [field]: value } : a)
    });
  };

  const addSession = () => {
    const newSess: TrainingSession = {
      id: `sess-${Date.now()}`,
      date: "20",
      month: "JUL",
      title: "Interactive Biometrics Trial",
      location: "Main Ground",
      time: "08:00 AM",
      isMandatory: true
    };
    saveProfileData({
      ...profile,
      sessions: [...profile.sessions, newSess]
    });
  };

  const removeSession = (id: string) => {
    saveProfileData({
      ...profile,
      sessions: profile.sessions.filter(s => s.id !== id)
    });
  };

  return (
    <div className="w-full min-h-screen bg-white text-neutral-800 pb-16 selection:bg-[#cc0000] selection:text-white">
      <div className="max-w-[540px] mx-auto px-4 pt-4 md:pt-8 flex flex-col gap-6">
        
        {/* Profile Card */}
        <div id="profile-header-card" className="bg-white border border-neutral-200 p-6 rounded-none shadow-sm relative overflow-hidden flex flex-col items-center text-center">
          {/* Subtle light effect behind avatar */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#cc0000]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Profile Picture Frame */}
          <div className="relative w-32 h-32 mb-4 group">
            {/* straight-edged rectangular frame */}
            <div className="absolute inset-0 bg-[#cc0000] p-1 rounded-none shadow-md" />
            <div className="absolute inset-[3px] bg-white rounded-none" />
            <img 
              className="absolute inset-[6px] w-[116px] h-[116px] object-cover rounded-none grayscale-[0.05] contrast-[1.1]" 
              src={profile.avatarUrl} 
              alt={profile.name} 
              referrerPolicy="no-referrer"
            />
            {/* Verification / Security check overlay icon */}
            <div className="absolute bottom-1 right-1 bg-[#cc0000] text-white p-1.5 rounded-none border border-white shadow-lg flex items-center justify-center">
              <UserCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Athlete Info */}
          <h2 className="font-sans text-2xl font-black uppercase tracking-tight text-neutral-900 mb-1">
            {profile.name}
          </h2>

          <span className="inline-block px-3 py-1 bg-[#cc0000]/5 border border-[#cc0000]/20 rounded-none text-[9px] font-mono font-black text-[#cc0000] uppercase tracking-widest mb-3">
            {profile.memberTier}
          </span>

          <div className="flex items-center gap-1.5 text-neutral-500 text-[10px] font-mono font-bold mb-1 bg-neutral-50 px-3 py-1 rounded-none border border-neutral-200">
            <Hash className="w-3 h-3 text-[#cc0000]" />
            <span>ID: {profile.idCode}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#cc0000] text-[11px] font-sans font-extrabold mb-6">
            <Award className="w-4 h-4" />
            <span>{profile.sport}</span>
          </div>

          {/* Core Action Buttons */}
          <div className="grid grid-cols-2 gap-3 w-full">
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center justify-center gap-2 bg-[#cc0000] hover:bg-[#aa0000] text-white font-sans font-bold text-xs uppercase tracking-wider py-3.5 rounded-none border border-[#cc0000] transition-all cursor-pointer shadow-xs"
            >
              <Edit className="w-3.5 h-3.5 shrink-0" />
              Edit Profile
            </button>
            <button 
              onClick={handleShare}
              className="flex items-center justify-center gap-2 bg-white text-neutral-800 border border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400 transition-all py-3.5 rounded-none text-xs uppercase tracking-wider font-bold cursor-pointer shadow-xs"
            >
              <Share2 className="w-3.5 h-3.5 shrink-0 text-[#cc0000]" />
              Share Stats
            </button>
          </div>
        </div>

        {/* Performance Metrics */}
        <div id="performance-metrics-card" className="bg-white border border-neutral-200 p-6 rounded-none shadow-xs text-left">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#cc0000]/5 border border-[#cc0000]/25 text-[#cc0000]">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="font-sans text-base uppercase font-black tracking-tight text-neutral-900">
                Performance Metrics
              </h3>
            </div>
            <span className="font-mono text-[9px] font-black text-neutral-400 tracking-widest uppercase">
              UPDATED 2H AGO
            </span>
          </div>

          <div className="space-y-4">
            {profile.metrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[11px] font-bold font-sans">
                  <span className="text-neutral-600">{metric.name}</span>
                  <span className="text-neutral-900 font-mono">{metric.value}%</span>
                </div>
                <div className="w-full h-2 bg-neutral-100 border border-neutral-200 rounded-none overflow-hidden">
                  <div 
                    className="h-full bg-[#cc0000] rounded-none shadow-xs"
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance */}
        <div id="attendance-card" className="bg-white border border-neutral-200 p-6 rounded-none shadow-xs text-left flex flex-col items-center">
          <div className="flex items-center gap-2.5 self-start w-full mb-6">
            <div className="p-2 bg-[#cc0000]/5 border border-[#cc0000]/25 text-[#cc0000]">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="font-sans text-base uppercase font-black tracking-tight text-neutral-900">
              Attendance
            </h3>
          </div>

          {/* Circular Wheel */}
          <div className="relative flex items-center justify-center w-40 h-40 mb-4">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background Circle */}
              <circle
                className="text-neutral-100"
                strokeWidth={stroke}
                stroke="currentColor"
                fill="transparent"
                r={normalizedRadius}
                cx={radius + stroke}
                cy={radius + stroke}
              />
              {/* Progress Circle */}
              <circle
                className="text-[#cc0000] transition-all duration-500 ease-out"
                strokeWidth={stroke}
                strokeDasharray={circumference + " " + circumference}
                style={{ strokeDashoffset }}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={normalizedRadius}
                cx={radius + stroke}
                cy={radius + stroke}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="font-sans text-3xl font-black text-neutral-900">{profile.attendance}%</span>
              <span className="font-mono text-[9px] text-[#cc0000] uppercase tracking-widest font-black mt-0.5">ACTIVE</span>
            </div>
          </div>

          <p className="font-sans text-center text-xs text-neutral-500 leading-relaxed max-w-[320px] font-semibold">
            Consistent participation across all elite training modules this quarter.
          </p>
        </div>

        {/* Recent Achievements */}
        <div id="achievements-card" className="bg-white border border-neutral-200 p-6 rounded-none shadow-xs text-left">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="p-2 bg-[#cc0000]/5 border border-[#cc0000]/25 text-[#cc0000]">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="font-sans text-base uppercase font-black tracking-tight text-neutral-900">
              Recent Achievements
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            {profile.achievements.map((ach) => (
              <div 
                key={ach.id} 
                className="p-4 bg-neutral-50 border border-neutral-200 rounded-none flex gap-4 hover:border-[#cc0000]/20 hover:bg-white transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-none bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                  {ach.type === "trophy" ? (
                    <Trophy className="w-5 h-5 text-amber-500" />
                  ) : (
                    <Star className="w-5 h-5 text-amber-500" />
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <h4 className="font-sans text-sm font-bold text-neutral-900 uppercase tracking-tight leading-tight">
                    {ach.title}
                  </h4>
                  <p className="font-sans text-xs text-neutral-500 leading-normal font-semibold">
                    {ach.description}
                  </p>
                  <span className="font-mono text-[9px] text-[#cc0000] font-bold uppercase tracking-wider mt-0.5">
                    {ach.date}
                  </span>
                </div>
              </div>
            ))}

            {profile.achievements.length === 0 && (
              <p className="text-center text-xs text-neutral-400 py-4 font-semibold">
                No achievements recorded yet. Add some in the profile editor!
              </p>
            )}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div id="upcoming-sessions-card" className="bg-white border border-neutral-200 p-6 rounded-none shadow-xs text-left mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#cc0000]/5 border border-[#cc0000]/25 text-[#cc0000]">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="font-sans text-base uppercase font-black tracking-tight text-neutral-900">
                Upcoming Sessions
              </h3>
            </div>
            <button 
              onClick={() => setIsCalendarOpen(true)}
              className="font-mono text-[9px] font-black text-[#cc0000] hover:text-[#aa0000] uppercase tracking-widest flex items-center gap-1 transition-all"
            >
              VIEW FULL CALENDAR <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {profile.sessions.map((sess) => (
              <div 
                key={sess.id} 
                className="p-4 bg-neutral-50 border border-neutral-200 rounded-none flex items-center justify-between gap-4 hover:border-neutral-300 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white border border-neutral-200 rounded-none flex flex-col items-center justify-center shrink-0">
                    <span className="font-mono text-[9px] text-[#cc0000] font-black uppercase leading-none mb-0.5">{sess.month}</span>
                    <span className="font-sans text-base font-black text-neutral-950 leading-none">{sess.date}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-sans text-xs font-bold text-neutral-900 uppercase tracking-tight leading-tight">
                      {sess.title}
                    </h4>
                    <p className="font-sans text-[11px] text-neutral-500 font-semibold flex items-center gap-1 flex-wrap">
                      <span>{sess.location}</span>
                      <span className="text-neutral-300">•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#cc0000]" /> {sess.time}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-none text-[8px] font-mono font-black uppercase tracking-wider ${
                    sess.isMandatory 
                      ? "bg-red-50 text-red-700 border border-red-200" 
                      : "bg-neutral-100 text-neutral-600 border border-neutral-200"
                  }`}>
                    {sess.isMandatory ? "MANDATORY" : "OPTIONAL"}
                  </span>
                </div>
              </div>
            ))}

            {profile.sessions.length === 0 && (
              <p className="text-center text-xs text-neutral-400 py-4 font-semibold">
                No upcoming training sessions. Click "View Full Calendar" to add.
              </p>
            )}
          </div>
        </div>

      </div>

      {/* 1. EDIT PROFILE MODAL */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-neutral-300 rounded-none w-full max-w-[500px] overflow-y-auto max-h-[90vh] p-6 text-left relative shadow-2xl"
            >
              <div className="flex justify-between items-center pb-4 mb-4 border-b border-neutral-200">
                <h3 className="font-sans text-lg font-black uppercase text-[#cc0000]">Edit Athlete Profile</h3>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="p-1.5 rounded-none text-neutral-400 hover:text-[#cc0000] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="font-sans text-[10px] uppercase font-black text-neutral-800">Full Athlete Name</label>
                  <input 
                    type="text"
                    required
                    value={editForm.name}
                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full bg-white border border-neutral-200 rounded-none px-4 py-3 text-xs text-neutral-800 focus:outline-none focus:border-[#cc0000] transition-colors font-semibold"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] uppercase font-black text-neutral-800">Athlete ID Code</label>
                    <input 
                      type="text"
                      required
                      value={editForm.idCode}
                      onChange={e => setEditForm({ ...editForm, idCode: e.target.value })}
                      className="w-full bg-white border border-neutral-200 rounded-none px-4 py-3 text-xs text-neutral-800 focus:outline-none focus:border-[#cc0000] transition-colors font-mono font-bold"
                      placeholder="MIST-2026-XXX"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] uppercase font-black text-neutral-800">Sport Focus</label>
                    <input 
                      type="text"
                      required
                      value={editForm.sport}
                      onChange={e => setEditForm({ ...editForm, sport: e.target.value })}
                      className="w-full bg-white border border-neutral-200 rounded-none px-4 py-3 text-xs text-neutral-800 focus:outline-none focus:border-[#cc0000] transition-colors font-semibold"
                      placeholder="Cricket, Football, etc"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] uppercase font-black text-neutral-800">Membership Tier</label>
                    <input 
                      type="text"
                      value={editForm.memberTier}
                      onChange={e => setEditForm({ ...editForm, memberTier: e.target.value })}
                      className="w-full bg-white border border-neutral-200 rounded-none px-4 py-3 text-xs text-neutral-800 focus:outline-none focus:border-[#cc0000] transition-colors font-semibold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] uppercase font-black text-neutral-800">Attendance %</label>
                    <input 
                      type="number"
                      min="0"
                      max="100"
                      value={editForm.attendance}
                      onChange={e => setEditForm({ ...editForm, attendance: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) })}
                      className="w-full bg-white border border-neutral-200 rounded-none px-4 py-3 text-xs text-neutral-800 focus:outline-none focus:border-[#cc0000] transition-colors font-mono font-bold"
                    />
                  </div>
                </div>

                {/* Performance Metrics sliders */}
                <div className="space-y-3.5 pt-2 border-t border-neutral-100">
                  <h4 className="font-sans text-[10px] uppercase font-black text-neutral-900 tracking-wider">Configure Metrics</h4>
                  {editForm.metrics.map((metric, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-neutral-500">{metric.name}</span>
                        <span className="text-[#cc0000] font-mono">{metric.value}%</span>
                      </div>
                      <input 
                        type="range"
                        min="0"
                        max="100"
                        value={metric.value}
                        onChange={e => handleMetricChange(idx, parseInt(e.target.value))}
                        className="w-full accent-[#cc0000] bg-neutral-100 rounded-none appearance-none h-1.5 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>

                {/* Achievements List */}
                <div className="space-y-3 pt-3 border-t border-neutral-100">
                  <div className="flex justify-between items-center">
                    <h4 className="font-sans text-[10px] uppercase font-black text-neutral-900 tracking-wider">Configure Achievements</h4>
                    <button 
                      type="button" 
                      onClick={addAchievement}
                      className="text-[#cc0000] text-[10px] font-mono font-black hover:text-[#aa0000] uppercase flex items-center gap-1 py-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>

                  <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                    {editForm.achievements.map((ach) => (
                      <div key={ach.id} className="p-3 bg-neutral-50 border border-neutral-200 rounded-none space-y-2 relative">
                        <button 
                          type="button"
                          onClick={() => removeAchievement(ach.id)}
                          className="absolute top-2 right-2 p-1 text-[#cc0000] hover:bg-red-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <input 
                            type="text"
                            value={ach.title}
                            onChange={e => updateAchievementField(ach.id, "title", e.target.value)}
                            className="bg-white border border-neutral-200 rounded-none px-2.5 py-1.5 text-[11px] text-neutral-800 focus:outline-none font-bold"
                            placeholder="Title"
                          />
                          <input 
                            type="text"
                            value={ach.date}
                            onChange={e => updateAchievementField(ach.id, "date", e.target.value)}
                            className="bg-white border border-neutral-200 rounded-none px-2.5 py-1.5 text-[11px] text-neutral-800 focus:outline-none font-mono"
                            placeholder="Date"
                          />
                        </div>

                        <textarea 
                          value={ach.description}
                          onChange={e => updateAchievementField(ach.id, "description", e.target.value)}
                          className="w-full bg-white border border-neutral-200 rounded-none px-2.5 py-1.5 text-[10px] text-neutral-600 font-semibold focus:outline-none h-12"
                          placeholder="Description details"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-3">
                  <button 
                    type="submit"
                    className="flex-1 bg-[#cc0000] hover:bg-[#aa0000] text-white font-sans font-black text-xs uppercase tracking-wider py-3.5 rounded-none flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Save className="w-4 h-4" /> Save Profile
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 bg-white text-neutral-800 border border-neutral-300 rounded-none text-xs uppercase font-bold hover:bg-neutral-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. SHARE STATS MODAL */}
      <AnimatePresence>
        {isSharing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-neutral-300 rounded-none w-full max-w-[420px] p-6 text-center relative shadow-2xl"
            >
              <button 
                onClick={() => setIsSharing(false)}
                className="absolute top-4 right-4 p-1.5 rounded-none text-neutral-400 hover:text-[#cc0000] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 rounded-none bg-[#cc0000]/5 border border-[#cc0000]/25 flex items-center justify-center mx-auto mb-4 text-[#cc0000]">
                <Share2 className="w-6 h-6" />
              </div>

              <h3 className="font-sans text-lg font-black uppercase text-neutral-900 mb-2">Share Athlete Card</h3>
              <p className="font-sans text-xs text-neutral-500 mb-6 max-w-[280px] mx-auto leading-relaxed font-semibold">
                Copy the digital certificate link or present this code to athletic scouts.
              </p>

              {/* Mock QR Code Card */}
              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-none max-w-[240px] mx-auto mb-6 flex flex-col items-center">
                <div className="w-36 h-36 bg-white p-2 rounded-none mb-3 flex items-center justify-center border border-neutral-200 shadow-xs">
                  {/* Generated clean grid lines resembling QR code */}
                  <div className="grid grid-cols-4 gap-1 w-full h-full opacity-95">
                    {[...Array(16)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`rounded-sm ${
                          (i * 3) % 2 === 0 ? "bg-neutral-900" : "bg-transparent"
                        } ${i === 0 || i === 3 || i === 12 ? "border-2 border-neutral-900 bg-neutral-900" : ""}`} 
                      />
                    ))}
                  </div>
                </div>
                <span className="font-mono text-[9px] font-black text-[#cc0000] tracking-widest uppercase">MIST-SCOUT-LINK-SECURE</span>
              </div>

              <div className="flex flex-col gap-2.5">
                <button 
                  onClick={handleCopyLink}
                  className="w-full bg-[#cc0000] hover:bg-[#aa0000] text-white font-sans font-black text-xs uppercase tracking-wider py-3.5 rounded-none flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-colors"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 shrink-0" />
                      Copied Secure Stats!
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 shrink-0" />
                      Copy Share Link
                    </>
                  )}
                </button>
                <button 
                  onClick={() => setIsSharing(false)}
                  className="w-full bg-white text-neutral-800 border border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400 py-3 rounded-none text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. CALENDAR MANAGER DRAWER */}
      <AnimatePresence>
        {isCalendarOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-neutral-300 rounded-none w-full max-w-[480px] p-6 text-left relative shadow-2xl"
            >
              <button 
                onClick={() => setIsCalendarOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-none text-neutral-400 hover:text-[#cc0000] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 mb-5 border-b border-neutral-100 pb-4">
                <div className="p-2 bg-[#cc0000]/5 border border-[#cc0000]/25 text-[#cc0000]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans text-base font-black uppercase text-neutral-900 leading-none">Schedule Manager</h3>
                  <span className="text-[10px] text-neutral-500 font-mono mt-1 font-bold inline-block">Active Micro-Cycles</span>
                </div>
              </div>

              <div className="space-y-4 max-h-[350px] overflow-y-auto mb-6 pr-1">
                {profile.sessions.map((sess) => (
                  <div key={sess.id} className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-none flex justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white border border-neutral-200 rounded-none flex flex-col items-center justify-center font-mono">
                        <span className="text-[8px] text-[#cc0000] font-black uppercase leading-none">{sess.month}</span>
                        <span className="text-xs font-black text-neutral-900 leading-none mt-0.5">{sess.date}</span>
                      </div>
                      <div>
                        <h4 className="font-sans text-xs font-bold text-neutral-900 uppercase">{sess.title}</h4>
                        <p className="text-[10px] text-neutral-500 font-semibold mt-0.5">{sess.location} • {sess.time}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeSession(sess.id)}
                      className="p-2 text-[#cc0000] hover:bg-red-50 rounded-none transition-colors"
                      title="Cancel Session"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {profile.sessions.length === 0 && (
                  <p className="text-center text-xs text-neutral-400 py-8 font-semibold">
                    No sessions on your schedule. Click below to add.
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={addSession}
                  className="flex-1 bg-[#cc0000] hover:bg-[#aa0000] text-white font-sans font-black text-xs uppercase tracking-wider py-3.5 rounded-none flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4 shrink-0" />
                  Add Training Session
                </button>
                <button 
                  onClick={() => setIsCalendarOpen(false)}
                  className="px-6 bg-white text-neutral-800 border border-neutral-300 rounded-none text-xs font-bold uppercase hover:bg-neutral-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
