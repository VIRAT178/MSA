import { Inquiry } from "../types";

interface ImportMetaWithEnv extends ImportMeta {
  readonly env?: {
    readonly VITE_API_URL?: string;
  };
}

const API_BASE_URL = (import.meta as ImportMetaWithEnv).env?.VITE_API_URL || "http://localhost:5000";

function mapInquiryPayload(payload: any): Inquiry {
  return {
    id: payload.id || payload._id || `inq-${Math.random().toString(36).slice(2, 10)}`,
    name: payload.name || "",
    email: payload.email || "",
    sportCategory: payload.sport || payload.sportCategory || "",
    performanceBackground: payload.message || payload.performanceBackground || "",
    createdAt: payload.createdAt || new Date().toISOString(),
    status: (payload.status as Inquiry["status"]) || "pending",
    aiEvaluation: payload.aiEvaluation,
  };
}

export async function getDbInquiries(): Promise<Inquiry[]> {
  const response = await fetch(`${API_BASE_URL}/api/inquiries`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch inquiries.");
  }
  const json = await response.json();
  const items = Array.isArray(json?.data?.inquiries) ? json.data.inquiries : [];
  return items.map(mapInquiryPayload);
}

export function getFallbackEvaluation(sport: string, background: string) {
  const score = Math.floor(Math.random() * 20) + 75;
  const sportCoaches: Record<string, string> = {
    Cricket: "Coach Stayandra Singh (Bowling Specialist)",
    Football: "Coach Stayandra Singh (Pro License Coach)",
    Basketball: "Coach Prince Pathak (Former National Coach)",
    Athletics: "Coach Prince Pathak",
    Volleyball: "Coach Jasdev",
    Kabaddi: "Coach Styandra Singh (Strength & Power)",
    Badminton: "Coach Prince Pathak",
    TableTennis: "Coach Prince Pathak",
    Carrom: "Coach Prince Pathak",
    Swimming: "Coach Prince Pathak",
    Shooting: "Coach Vikramjeet",
    Gym: "Coach Prince Pathak",
  };

  const coachName = sportCoaches[sport] || "Coach Baldev Singh";

  return {
    score,
    assessment: `Based on your application detailing: "${background.substring(0, 100)}...", our coaching board finds high technical competence. To succeed in our elite tier for ${sport}, you must focus heavily on dynamic joint stabilization and power output transfer. Your athletic journey aligns well with our intensive development methodologies.`,
    strengths: [
      "Competitive match temperament and baseline dedication",
      "Solid understanding of standard sports discipline and rules",
      "Highly responsive physical profile with immediate coachability",
    ],
    gaps: [
      "Lactate threshold endurance at maximum match intensity",
      "Explosive acceleration and deceleration angular foot blocks",
    ],
    recommendedSchedule: [
      {
        phase: "Phase 1: Athletic Foundation & Power",
        focus: "Strengthening dynamic stabilization and neuromuscular control.",
        routine: ["3x10 Single-Leg Lateral Plyo Hops", "4x15m Acceleration burst sprints with 90s recovery"],
      },
      {
        phase: "Phase 2: Sport-Specific Tactical Integration",
        focus: "Refining skill precision and high-intensity match scenario replication.",
        routine: ["Targeted skill endurance drills (30 mins of high-tempo sets)", "Contrast training involving explosive resistance banding"],
      },
    ],
    coachName,
  };
}

export async function createInquiry(
  name: string,
  email: string,
  sportCategory: string,
  performanceBackground: string
): Promise<Inquiry> {
  const response = await fetch(`${API_BASE_URL}/api/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      name,
      email,
      phone: email,
      sport: sportCategory,
      message: performanceBackground,
    }),
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json?.message || "Failed to submit inquiry.");
  }

  const inquiry = json?.data?.inquiry;
  return mapInquiryPayload({ ...inquiry, sportCategory, performanceBackground, status: inquiry?.status || "pending" });
}

export function getCoachFallbackResponse(sport: string, query: string): string {
  const lQuery = query.toLowerCase();

  if (lQuery.includes("diet") || lQuery.includes("food") || lQuery.includes("nutrition")) {
    return `Coach Baldev here. For **${sport}**, elite nutrition is non-negotiable:\n\n- **Pre-workout (90 mins prior):** Complex carbohydrates like oats or brown rice to power glycogen levels.\n- **Post-workout (within 45 mins):** 25-30g clean whey or plant protein paired with rapid-acting simple carbs to kickstart muscle repair.\n- **Hydration:** Minimum 4 liters of water daily, adding electrolytes during intensive training sessions in Malwa.\n\nFuel the engine, athlete!`;
  }

  if (lQuery.includes("recovery") || lQuery.includes("sleep") || lQuery.includes("sore")) {
    return `Coach Baldev here. Muscle recovery is when champions are forged, not just on the training turf:\n\n- **Active Recovery:** 15 minutes of dynamic foam rolling, focusing on glutes and calf complexes.\n- **Sleep Protocol:** Minimum 8.5 hours of deep, dark sleep. This is when human growth hormone (HGH) naturally peaks to rebuild micro-tears.\n- **Contrast Therapy:** Alternate 1 minute cold plunge (10°C) with 2 minutes warm shower, repeated 3 times to flush lactic acid.\n\nRespect the rest cycle!`;
  }

  if (lQuery.includes("strength") || lQuery.includes("gym") || lQuery.includes("weight")) {
    return `Coach Baldev here. Strength is our baseline shield. For **${sport}** development, prioritize these exercises:\n\n- **Trap Bar Deadlifts:** 4 sets of 5 reps to build absolute posterior chain power.\n- **Single-Leg Bulgarian Split Squats:** 3 sets of 8 reps per side to fix athletic imbalances.\n- **Explosive Plyo Box Jumps:** 3 sets of 6 reps, landing soft and stable to build reaction drive.\n\nFocus on speed of execution, not just heavy load!`;
  }

  return `Coach Baldev here. Tactical whiteboard active. For **${sport}**, focus heavily on dynamic joint stabilization and rapid power output transfer.\n\nWhat other aspects of training, diet, or mental focus shall we optimize next to accelerate your sports performance? Keep pushing hard!`;
}
