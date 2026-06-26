export interface Program {
  id: string;
  name: string;
  iconName: string;
  image: string;
  description: string;
  coaches: string[];
  facilities: string[];
  highlights: string[];
  curriculum: {
    week1: string;
    week2: string;
    week3: string;
    week4: string;
  };
}

export interface Athlete {
  id: string;
  name: string;
  role: string;
  category: string;
  badge: string;
  image: string;
  bio: string;
  achievements: string[];
  metrics: {
    speed: number; // out of 100
    stamina: number;
    power: number;
    discipline: number;
    tactical: number;
  };
}

export interface AiEvaluation {
  score: number; // 0-100 Elite Readiness Score
  assessment: string;
  strengths: string[];
  gaps: string[];
  recommendedSchedule: {
    phase: string;
    focus: string;
    routine: string[];
  }[];
  coachName: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  sportCategory: string;
  performanceBackground: string;
  createdAt: string;
  status: 'pending' | 'reviewed' | 'accepted';
  aiEvaluation?: AiEvaluation;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  sport: string;
}
