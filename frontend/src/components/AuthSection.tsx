import React, { useState } from "react";
import { ShieldCheck, UserPlus, Lock, Mail, ArrowRight, Award, ArrowLeft } from "lucide-react";

interface AuthSectionProps {
  mode: "login" | "register";
  setMode: (mode: "login" | "register") => void;
  onLogin: (email: string, password: string) => void;
  onRegister: (payload: { name: string; email: string; password: string; sport: string }) => void;
  onClose: () => void;
}

export default function AuthSection({ mode, setMode, onLogin, onRegister, onClose }: AuthSectionProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [sport, setSport] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    try {
      await onLogin(email.trim(), password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    }
  };

  const handleRegisterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    if (!name || !email || !password || !sport) {
      setError("Please complete all fields to register.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await onRegister({ name: name.trim(), email: email.trim(), password, sport: sport.trim() });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to register.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-96px)] bg-white text-neutral-900 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-[960px] grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-none border border-neutral-200 bg-[#f7f5f2] p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-full bg-[#cc0000] text-white grid place-items-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] font-bold text-[#cc0000]">Athlete Access</p>
              <h2 className="mt-2 text-3xl font-black text-neutral-900">Elite Registration</h2>
            </div>
          </div>
          <p className="text-sm text-neutral-700 leading-relaxed mb-6">
            Register once to unlock your personal athlete dashboard, growth metrics, and progression roadmap. Returning users can sign in immediately and continue their training journey.
          </p>
          <div className="space-y-4 text-sm text-neutral-700">
            <p className="flex items-start gap-3"><span className="mt-1 text-[#cc0000]">•</span> Personalized profile and performance analytics.</p>
            <p className="flex items-start gap-3"><span className="mt-1 text-[#cc0000]">•</span> Scout portal access and inquiry tracking.</p>
            <p className="flex items-start gap-3"><span className="mt-1 text-[#cc0000]">•</span> Exclusive member-only progress, attendance, and evaluation insights.</p>
          </div>
          <button
            onClick={onClose}
            className="mt-8 inline-flex items-center gap-2 text-[#cc0000] border border-[#cc0000] px-4 py-3 font-bold uppercase tracking-[0.2em] hover:bg-[#cc0000]/5 transition-colors rounded-none"
          >
            <ArrowLeft className="w-4 h-4" /> Continue as guest
          </button>
        </div>

        <div className="rounded-none border border-neutral-200 bg-white p-10 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-500 font-bold">{mode === "login" ? "Sign In" : "Register"}</p>
              <h3 className="mt-2 text-2xl font-black text-neutral-900">
                {mode === "login" ? "Welcome Back" : "Create Your Account"}
              </h3>
            </div>
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-xs uppercase tracking-[0.35em] text-[#cc0000] font-bold"
            >
              {mode === "login" ? "Create account" : "Have an account?"}
            </button>
          </div>

          <form onSubmit={mode === "login" ? handleLoginSubmit : handleRegisterSubmit} className="space-y-5">
            {mode === "register" && (
              <div className="space-y-3">
                <label className="block text-[11px] uppercase tracking-[0.35em] text-neutral-600 font-black" htmlFor="auth-name">
                  Full Name
                </label>
                <input
                  id="auth-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-none border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-[#cc0000]"
                  placeholder="Athlete Name"
                />
              </div>
            )}

            <div className="space-y-3">
              <label className="block text-[11px] uppercase tracking-[0.35em] text-neutral-600 font-black" htmlFor="auth-email">
                Email address
              </label>
              <div className="flex items-center gap-2 border border-neutral-200 rounded-none px-3 py-2">
                <Mail className="w-4 h-4 text-neutral-500" />
                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="name@domain.com"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-[11px] uppercase tracking-[0.35em] text-neutral-600 font-black" htmlFor="auth-password">
                Password
              </label>
              <div className="flex items-center gap-2 border border-neutral-200 rounded-none px-3 py-2">
                <Lock className="w-4 h-4 text-neutral-500" />
                <input
                  id="auth-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="Enter password"
                />
              </div>
            </div>

            {mode === "register" && (
              <>
                <div className="space-y-3">
                  <label className="block text-[11px] uppercase tracking-[0.35em] text-neutral-600 font-black" htmlFor="auth-confirm-password">
                    Confirm Password
                  </label>
                  <input
                    id="auth-confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-none border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-[#cc0000]"
                    placeholder="Confirm password"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-[11px] uppercase tracking-[0.35em] text-neutral-600 font-black" htmlFor="auth-sport">
                    Primary Sport
                  </label>
                  <input
                    id="auth-sport"
                    value={sport}
                    onChange={(e) => setSport(e.target.value)}
                    className="w-full rounded-none border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-[#cc0000]"
                    placeholder="Cricket, Football, Basketball..."
                  />
                </div>
              </>
            )}

            {error && (
              <p className="text-sm text-[#cc0000] font-semibold">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#cc0000] hover:bg-[#aa0000] text-white uppercase tracking-[0.35em] font-bold py-3 rounded-none transition-colors"
            >
              {mode === "login" ? "Sign In" : "Register & Continue"}
            </button>
          </form>

          <div className="mt-6 text-[11px] text-neutral-500 leading-relaxed">
            {mode === "login"
              ? "Use your registered email and password to unlock your athlete dashboard."
              : "Register once to save your progress, profile details and growth metrics for every visit."}
          </div>
        </div>
      </div>
    </div>
  );
}
