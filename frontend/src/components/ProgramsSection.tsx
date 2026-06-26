import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Flame, 
  Target, 
  Zap, 
  Brain,
  Clock, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  FileText,
  Activity,
  Award
} from "lucide-react";

// @ts-ignore
import carromProgramImg from "../assets/images/carrom_program.jpeg";
// @ts-ignore
import basketballProgramImg from "../assets/images/basketball_program.jpeg";
// @ts-ignore
import tableTennisProgramImg from "../assets/images/table_tennis_program.jpeg";
// @ts-ignore
import badmintonProgramImg from "../assets/images/badminton_program.jpeg";
// @ts-ignore
import swimmingProgramImg from "../assets/images/swimming_program.jpg";
// @ts-ignore
import shootingProgramImg from "../assets/images/shooting_program.png";
// @ts-ignore
import gymProgramImg from "../assets/images/gym_program.png";

interface ProgramsSectionProps {
  scrollToInquiryForm: () => void;
  setActiveTab: (tab: string) => void;
}

interface Pillar {
  title: string;
  description: string;
  bullets: string[];
  icon: "target" | "brain" | "shield";
}

interface ScheduleRow {
  day: string;
  morning: string;
  afternoon: string;
}

interface Facility {
  name: string;
  description: string;
  image: string;
}

interface SportDetail {
  id: string;
  name: string;
  tagline: string;
  bannerImg: string;
  overview: string;
  threePillars: Pillar[];
  scheduleRows: ScheduleRow[];
  saturdayEvent: string;
  facilities: Facility[];
  trialDate: string;
}

export default function ProgramsSection({ scrollToInquiryForm, setActiveTab }: ProgramsSectionProps) {
  const sportsData: SportDetail[] = [
    {
      id: "cricket",
      name: "Cricket",
      tagline: "EXCELLENCE PROGRAM",
      bannerImg: "https://images.unsplash.com/photo-1531415080295-943444538676?auto=format&fit=crop&q=80&w=1200",
      overview: "Master the pitch with professional-grade training systems. We fuse biomechanical analysis with elite match simulation to forge the next generation of cricketing icons.",
      threePillars: [
        {
          title: "Technical Mastery",
          description: "Precision-focused sessions using high-speed camera analysis to refine batting stances, bowling actions, and fielding mechanics.",
          bullets: ["Biomechanical analysis", "Shot selection optimization"],
          icon: "target"
        },
        {
          title: "Mental Conditioning",
          description: "Building the cognitive resilience required for high-stakes competition. Concentration drills and pressure-cooker scenario training.",
          bullets: ["Focus drills", "Emotional regulation"],
          icon: "brain"
        },
        {
          title: "Match Simulation",
          description: "Contextual learning through game-specific scenarios. Translating practice skills into match-winning performances under real-world conditions.",
          bullets: ["Open Net Sessions", "Tactical Game Plans"],
          icon: "shield"
        }
      ],
      scheduleRows: [
        { day: "Monday", morning: "06:00 - 09:00", afternoon: "15:00 - 18:00" },
        { day: "Wednesday", morning: "06:00 - 09:00", afternoon: "15:00 - 18:00" },
        { day: "Friday", morning: "06:00 - 09:00", afternoon: "15:00 - 18:00" }
      ],
      saturdayEvent: "FULL SQUAD MATCH SIMULATION",
      facilities: [
        {
          name: "Turf wickets",
          description: "High-maintenance natural grass tracks mimicking international standards.",
          image: "https://images.unsplash.com/photo-1540747737956-378724044282?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Smart Machines",
          description: "Programmable 158km/h+ capability.",
          image: "https://images.unsplash.com/photo-1624526261182-ab3df86a734e?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Recovery Lab",
          description: "Advanced cryo and physio suites.",
          image: "https://images.unsplash.com/photo-1544033527-b192daee1f5b?auto=format&fit=crop&q=80&w=800"
        }
      ],
      trialDate: "OCTOBER 15, 2026"
    },
    {
      id: "football",
      name: "Football",
      tagline: "EXCELLENCE PROGRAM",
      bannerImg: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1200",
      overview: "Experience high-intensity tactical football training modeled after European leagues. We combine real-time GPS tracking and spatial overload drills to perfect your positioning and ball mastery.",
      threePillars: [
        {
          title: "Spatial Positional Play",
          description: "Positional structural awareness and pressing patterns designed to maximize ball recovery in the final third.",
          bullets: ["Gegenpressing metrics", "Transition geometry"],
          icon: "target"
        },
        {
          title: "Anaerobic Lactate Work",
          description: "Interval training setups that push player aerobic-anaerobic thresholds, allowing maximum speed recovery during full match length.",
          bullets: ["VO2 max expansion", "Lactate clearance tempo"],
          icon: "brain"
        },
        {
          title: "Tactical Scenarios",
          description: "Developing critical game intelligence in half-spaces under simulated league pressure and defender overload.",
          bullets: ["Half-space overloading", "Set piece positioning"],
          icon: "shield"
        }
      ],
      scheduleRows: [
        { day: "Monday", morning: "05:30 - 08:30", afternoon: "16:00 - 18:30" },
        { day: "Wednesday", morning: "05:30 - 08:30", afternoon: "16:00 - 18:30" },
        { day: "Friday", morning: "05:30 - 08:30", afternoon: "16:00 - 18:30" }
      ],
      saturdayEvent: "11V11 INTER-SQUAD LEAGUE MATCH",
      facilities: [
        {
          name: "FIFA-Certified Turf",
          description: "All-weather tactical pitches with advanced shock-absorbing subsurfaces.",
          image: "https://images.unsplash.com/photo-1431324155629-1a6edd1d141d?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "GPS Vest Telemetry",
          description: "Real-time wearable tracking for positioning heatmaps and deceleration rates.",
          image: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Cryo Recovery Center",
          description: "State-of-the-art cold-water therapy and biomechanical recovery labs.",
          image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
        }
      ],
      trialDate: "OCTOBER 18, 2026"
    },
    {
      id: "basketball",
      name: "Basketball",
      tagline: "EXCELLENCE PROGRAM",
      bannerImg: basketballProgramImg,
      overview: "Refine your vertical mechanics, dynamic court transition speeds, and high-tempo fast break execution under synchronized force-plate analysis.",
      threePillars: [
        {
          title: "Vertical Lift & Power",
          description: "Plyometric force plate loading designed to add vertical inches while preventing dynamic valgus knee injuries.",
          bullets: ["Triple extension force", "Landing shock balance"],
          icon: "target"
        },
        {
          title: "Shot Arc Trajectory",
          description: "Computerized sensory hoop analytics maps release angle, rotation vectors, and wrist-snap alignment.",
          bullets: ["Trajectory arc mapping", "Catch-and-shoot timing"],
          icon: "brain"
        },
        {
          title: "Transition Flow",
          description: "Organizing aggressive court transition runs, screening geometries, and zone defense breakdown drills.",
          bullets: ["Pick-and-roll transition", "Zone overload setups"],
          icon: "shield"
        }
      ],
      scheduleRows: [
        { day: "Monday", morning: "06:30 - 09:30", afternoon: "15:30 - 18:00" },
        { day: "Wednesday", morning: "06:30 - 09:30", afternoon: "15:30 - 18:00" },
        { day: "Friday", morning: "06:30 - 09:30", afternoon: "15:30 - 18:00" }
      ],
      saturdayEvent: "HIGH-SPEED CHAMPIONS TOURNAMENT TRIALS",
      facilities: [
        {
          name: "Maple Wood Hardwood",
          description: "Canadian Maple court featuring shock-protective elastic floor support.",
          image: "https://images.unsplash.com/photo-1505666287802-931dc83948e9?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Dual Force-Plates",
          description: "Integrated ground sensors tracking takeoff imbalances and landing load profiles.",
          image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Smart Trajectory Hoops",
          description: "Sensory ring cameras tracking rotation speeds and pocket entry angles.",
          image: "https://images.unsplash.com/photo-1544033527-b192daee1f5b?auto=format&fit=crop&q=80&w=800"
        }
      ],
      trialDate: "OCTOBER 20, 2026"
    },
    {
      id: "volleyball",
      name: "Volleyball",
      tagline: "EXCELLENCE PROGRAM",
      bannerImg: "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&q=80&w=1200",
      overview: "Optimize your rotator cuff power, attack leap setups, and lateral net blocking transitions under pro-grade high-speed biomechanics sensors.",
      threePillars: [
        {
          title: "Attack Biomechanics",
          description: "Rotational scapular stabilization and wrist snap speed adjustments to maximize ball strike velocity.",
          bullets: ["Scapular speed analysis", "Spike angle adjustments"],
          icon: "target"
        },
        {
          title: "Transition Block & Cover",
          description: "Dynamic multi-player footwork patterns designed for sudden net deceleration and vertical recovery.",
          bullets: ["Block alignment setups", "Landing impact balance"],
          icon: "brain"
        },
        {
          title: "Tactical Serve Vectors",
          description: "Training on aggressive topspin and float serves with micro-second trajectory analysis.",
          bullets: ["Trajectory speed analysis", "Targeted serve placements"],
          icon: "shield"
        }
      ],
      scheduleRows: [
        { day: "Monday", morning: "06:00 - 09:00", afternoon: "15:00 - 18:00" },
        { day: "Wednesday", morning: "06:00 - 09:00", afternoon: "15:00 - 18:00" },
        { day: "Friday", morning: "06:00 - 09:00", afternoon: "15:00 - 18:00" }
      ],
      saturdayEvent: "TACTICAL SET-AND-SPIKE CHAMPIONSHIP HEATS",
      facilities: [
        {
          name: "Pro Maple Court",
          description: "Resilient court floor optimizing flight bounce and absorbing landing shock.",
          image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Spiking Velocity Rigs",
          description: "Scapular load sensors analyzing arm rotation speed and joint safety.",
          image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "High-Velocity Cannons",
          description: "Programmable serve projectors mimicking high-spin national trajectories.",
          image: "https://images.unsplash.com/photo-1544033527-b192daee1f5b?auto=format&fit=crop&q=80&w=800"
        }
      ],
      trialDate: "OCTOBER 22, 2026"
    },
    {
      id: "athletics",
      name: "Athletics",
      tagline: "EXCELLENCE PROGRAM",
      bannerImg: "https://images.unsplash.com/photo-1486282424019-122841f715ac?auto=format&fit=crop&q=80&w=1200",
      overview: "Improve starting block power, stride frequency, and lactate clearing intervals under electronic timing gates.",
      threePillars: [
        {
          title: "Starting Block Launch",
          description: "Meticulous pressure-sensor calibrations targeting an optimal 45-degree angle departure with peak thrust.",
          bullets: ["Thrust vector analysis", "Takeoff acceleration"],
          icon: "target"
        },
        {
          title: "Stride Posture",
          description: "Micro-frequency analysis of stride length, spinal alignment, and lateral deceleration footwork.",
          bullets: ["Stride length mapping", "High-velocity posture"],
          icon: "brain"
        },
        {
          title: "Lactate Thresholds",
          description: "Interval running sets designed to accelerate oxygen recovery under maximal cardiac loads.",
          bullets: ["Lactate clearance tempo", "VO2 max threshold"],
          icon: "shield"
        }
      ],
      scheduleRows: [
        { day: "Monday", morning: "05:00 - 08:00", afternoon: "14:30 - 17:30" },
        { day: "Wednesday", morning: "05:00 - 08:00", afternoon: "14:30 - 17:30" },
        { day: "Friday", morning: "05:00 - 08:00", afternoon: "14:30 - 17:30" }
      ],
      saturdayEvent: "ELECTRONICALLY TIMED CHAMPIONSHIP HEATS",
      facilities: [
        {
          name: "Olympic-Standard Tracks",
          description: "High-grade polyurethane all-weather tracks to protect knee cartilage.",
          image: "https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Laser Acceleration Gates",
          description: "Infrared timers mapping micro-second deceleration and terminal sprints.",
          image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Wind Overload Tunnels",
          description: "Dynamic headwinds simulating high-altitude pressure profiles.",
          image: "https://images.unsplash.com/photo-1544033527-b192daee1f5b?auto=format&fit=crop&q=80&w=800"
        }
      ],
      trialDate: "OCTOBER 25, 2026"
    },
    {
      id: "kabaddi",
      name: "Kabaddi",
      tagline: "EXCELLENCE PROGRAM",
      bannerImg: "https://images.unsplash.com/photo-1628891890467-b79f2c8ba9ed?auto=format&fit=crop&q=80&w=1200",
      overview: "Forge peak core bracing, lung endurance, and team chain maneuvers under pro mat and grip-strength sensors.",
      threePillars: [
        {
          title: "Raid Escape Speed",
          description: "Agility block acceleration and dodging escape maneuvers designed to beat defensive corner clutches.",
          bullets: ["Reflex dodging angles", "Raid footwork pacing"],
          icon: "target"
        },
        {
          title: "Chain Defense Alignment",
          description: "Team defensive synchronization, synchronized core bracing, and clean tackle locking dynamics.",
          bullets: ["Chain timing coordination", "Tackle locking strength"],
          icon: "brain"
        },
        {
          title: "Grip & Body Control",
          description: "Advanced isometric grip power and rotational core stabilization drills for escape acceleration.",
          bullets: ["Finger grip strength", "Core bracing stability"],
          icon: "shield"
        }
      ],
      scheduleRows: [
        { day: "Monday", morning: "05:30 - 08:30", afternoon: "16:00 - 18:30" },
        { day: "Wednesday", morning: "05:30 - 08:30", afternoon: "16:00 - 18:30" },
        { day: "Friday", morning: "05:30 - 08:30", afternoon: "16:00 - 18:30" }
      ],
      saturdayEvent: "PRO KABADDI STYLE SYNTHETIC MAT TOURNAMENT",
      facilities: [
        {
          name: "Premium Mat Arena",
          description: "High-density synthetic mats designed to protect against impact abrasions.",
          image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Laser Agility Gates",
          description: "Sensor system measuring raider reaction speeds on dynamic court rotations.",
          image: "https://images.unsplash.com/photo-1628891890467-b79f2c8ba9ed?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Grip Strength Rigs",
          description: "Suspension rigs and finger boards designed to develop supreme tackling locks.",
          image: "https://images.unsplash.com/photo-1544033527-b192daee1f5b?auto=format&fit=crop&q=80&w=800"
        }
      ],
      trialDate: "OCTOBER 27, 2026"
    },
    {
      id: "badminton",
      name: "Badminton",
      tagline: "EXCELLENCE PROGRAM",
      bannerImg: badmintonProgramImg,
      overview: "Improve hexagonal court footwork, rapid body direction changes, and terminal wrist snap smash speeds.",
      threePillars: [
        {
          title: "Hexagonal Footwork",
          description: "Analyzing micro-second delays between shuttle release and player footwork launch across the court.",
          bullets: ["Lunge balance stability", "Hexagonal court transitions"],
          icon: "target"
        },
        {
          title: "Smash Terminal Speed",
          description: "Optimizing shoulder rotation, scapular stretch, and terminal wrist-snap speed for high-impact smashes.",
          bullets: ["Wrist snap speed", "Smash exit acceleration"],
          icon: "brain"
        },
        {
          title: "Deceptive Net Control",
          description: "Dynamic wrist micro-adjustments for net spins, backcourt drop-shots, and rapid net recoveries.",
          bullets: ["Net play spin metrics", "Deceptive drop angles"],
          icon: "shield"
        }
      ],
      scheduleRows: [
        { day: "Monday", morning: "06:00 - 09:00", afternoon: "15:00 - 18:00" },
        { day: "Wednesday", morning: "06:00 - 09:00", afternoon: "15:00 - 18:00" },
        { day: "Friday", morning: "06:00 - 09:00", afternoon: "15:00 - 18:00" }
      ],
      saturdayEvent: "TOURNAMENT LEVEL SINGLES/DOUBLES SCRIMMAGES",
      facilities: [
        {
          name: "Friction-Coated Mats",
          description: "Anti-slip pro court mats providing peak friction and high knee joint protection.",
          image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Reflex Light Modules",
          description: "Smart wall target grids testing reflex response speed under micro-second timers.",
          image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Smash Speed Sensors",
          description: "Sensor-equipped test rackets measuring racket swing path and exit shuttle speeds.",
          image: "https://images.unsplash.com/photo-1544033527-b192daee1f5b?auto=format&fit=crop&q=80&w=800"
        }
      ],
      trialDate: "OCTOBER 29, 2026"
    },
    {
      id: "table-tennis",
      name: "Table Tennis",
      tagline: "EXCELLENCE PROGRAM",
      bannerImg: tableTennisProgramImg,
      overview: "Develop hyper-fast neural reflexes, ball rotation-per-second spin detection, and table positioning micro-footwork.",
      threePillars: [
        {
          title: "Neural-Reflex Response",
          description: "High-speed hand-eye visual tracking designed to reduce reaction latency on fast multi-ball feeds.",
          bullets: ["Hand-eye neural latency", "Rhythm tracking metrics"],
          icon: "target"
        },
        {
          title: "Spin Vector Mastery",
          description: "Manipulating topspin, backspin, and sidespin loops through wrist and angle adjustments.",
          bullets: ["Topspin loop dynamics", "Spin rotation detection"],
          icon: "brain"
        },
        {
          title: "Close-Table Footwork",
          description: "Micro side-stepping, stance balance, and defensive block positioning under rapid counter feeds.",
          bullets: ["Micro side-stepping", "Close-table defense blocks"],
          icon: "shield"
        }
      ],
      scheduleRows: [
        { day: "Monday", morning: "06:00 - 09:00", afternoon: "15:00 - 18:00" },
        { day: "Wednesday", morning: "06:00 - 09:00", afternoon: "15:00 - 18:00" },
        { day: "Friday", morning: "06:00 - 09:00", afternoon: "15:00 - 18:00" }
      ],
      saturdayEvent: "RAPID REACTION CHAMPIONSHIP SCORE SETS",
      facilities: [
        {
          name: "ITTF Arena Tables",
          description: "Professional-grade 25mm tables with anti-glare overhead diffuse lighting.",
          image: "https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Robotic Pitchers",
          description: "Programmable multi-ball robotic pitchers feeding erratic trajectories and variable spins.",
          image: "https://images.unsplash.com/photo-1609710223199-14b364e2e7ba?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Spin Vector Sensors",
          description: "High-speed cameras tracking ball rotational speeds (RPS) and deflection angles.",
          image: "https://images.unsplash.com/photo-1544033527-b192daee1f5b?auto=format&fit=crop&q=80&w=800"
        }
      ],
      trialDate: "NOVEMBER 01, 2026"
    },
    {
      id: "carrom",
      name: "Indoor Games (Carrom)",
      tagline: "TACTICAL RECREATION",
      bannerImg: carromProgramImg,
      overview: "Hone micro-angle calculations, finger-striking metrics, and extreme cognitive calmness in high-stakes indoor tournaments.",
      threePillars: [
        {
          title: "Striking Precision",
          description: "Calibrating strike velocity and release angles using finger rebound dynamics for maximum pocketing accuracy.",
          bullets: ["Rebound geometry", "Velocity control"],
          icon: "target"
        },
        {
          title: "Board State Reading",
          description: "Dynamic tactical analysis of coin spacing, cover defense arrangements, and optimal break strategies.",
          bullets: ["Board spacing analysis", "Deceptive angles"],
          icon: "brain"
        },
        {
          title: "Fingertip Recovery",
          description: "Targeted conditioning drills for micro-muscle groups in fingers to maximize consistency over long tourneys.",
          bullets: ["Fingertip coordination", "Repetitive strain care"],
          icon: "shield"
        }
      ],
      scheduleRows: [
        { day: "Tuesday", morning: "07:00 - 09:30", afternoon: "15:30 - 17:30" },
        { day: "Thursday", morning: "07:00 - 09:30", afternoon: "15:30 - 17:30" },
        { day: "Saturday", morning: "07:00 - 09:30", afternoon: "15:30 - 17:30" }
      ],
      saturdayEvent: "MIST INDORE CARROM TOURNAMENT SERIES",
      facilities: [
        {
          name: "Premium Championship Boards",
          description: "Svenska Baltic Birchwood boards with frictionless powder coatings for smooth play.",
          image: "https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Diffused Studio Lights",
          description: "Zero-shadow overhead illumination rigs mapping clean strike vectors.",
          image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Precision Striker Kits",
          description: "Custom balanced ivory acrylic strikers with calibrated weights for technical speed play.",
          image: "https://images.unsplash.com/photo-1544033527-b192daee1f5b?auto=format&fit=crop&q=80&w=800"
        }
      ],
      trialDate: "NOVEMBER 03, 2026"
    },
    {
      id: "swimming",
      name: "Swimming",
      tagline: "OLYMPIC SPEEDWAY",
      bannerImg: swimmingProgramImg,
      overview: "Perfect your hydrodynamic drag reduction, peak oxygen utilization, and explosive starts under computerized underwater cameras.",
      threePillars: [
        {
          title: "Stroke Hydrodynamics",
          description: "Analyzing hand entry angles and body roll metrics to minimize frontal surface area drag.",
          bullets: ["Frontal drag index", "Propulsive pull power"],
          icon: "target"
        },
        {
          title: "VO2 Max & Aerobic Base",
          description: "High-intensity threshold cycles expanding lung capacity and boosting lactate threshold clearance.",
          bullets: ["Hypoxic training runs", "Lactate clearing pace"],
          icon: "brain"
        },
        {
          title: "Starts & Turns Velocity",
          description: "Optimizing starting block reaction times, underwater dolphin kicks, and explosive flip-turns.",
          bullets: ["Block liftoff vector", "Dolphin kick frequency"],
          icon: "shield"
        }
      ],
      scheduleRows: [
        { day: "Monday", morning: "05:30 - 08:30", afternoon: "16:00 - 18:00" },
        { day: "Wednesday", morning: "05:30 - 08:30", afternoon: "16:00 - 18:00" },
        { day: "Friday", morning: "05:30 - 08:30", afternoon: "16:00 - 18:00" }
      ],
      saturdayEvent: "TIME-TRIAL SWIM SCRIMMAGES",
      facilities: [
        {
          name: "Olympic-Sized Pool",
          description: "10-lane 50m temperature-controlled pool with advanced anti-wave lane lines.",
          image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Underwater Camera Rigs",
          description: "High-speed multi-angle tracking cameras providing live stroke analysis.",
          image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Biomechanical Hand Paddles",
          description: "Smart sensory paddles measuring exact propulsive force in real-time.",
          image: "https://images.unsplash.com/photo-1544033527-b192daee1f5b?auto=format&fit=crop&q=80&w=800"
        }
      ],
      trialDate: "NOVEMBER 05, 2026"
    },
    {
      id: "shooting",
      name: "Rifle Shooting",
      tagline: "PRECISION FOCUS",
      bannerImg: shootingProgramImg,
      overview: "Develop elite trigger pull consistency, respiratory rhythm sync, and supreme mental calm under micro-scale target metrics.",
      threePillars: [
        {
          title: "Respiratory Syncing",
          description: "Synchronizing the trigger squeeze with the natural respiratory pause to ensure zero barrel wobble.",
          bullets: ["Heart-rate tracking", "Trigger release timing"],
          icon: "target"
        },
        {
          title: "Sighting & Posture Balance",
          description: "Using weight-plate sensors to verify absolute skeletal alignment and minimal muscle tremor.",
          bullets: ["Tremor index monitoring", "Skeletal load balance"],
          icon: "brain"
        },
        {
          title: "Micro-Squeeze Control",
          description: "Sensory trigger attachments logging fingertip pressure gradients in micro-grams.",
          bullets: ["Fingertip pressure map", "Trigger creep tracking"],
          icon: "shield"
        }
      ],
      scheduleRows: [
        { day: "Tuesday", morning: "08:00 - 11:00", afternoon: "14:00 - 17:00" },
        { day: "Thursday", morning: "08:00 - 11:00", afternoon: "14:00 - 17:00" },
        { day: "Friday", morning: "08:00 - 11:00", afternoon: "14:00 - 17:00" }
      ],
      saturdayEvent: "MIST INDORE SHOOTING LEAGUE STAGE",
      facilities: [
        {
          name: "10m Air Rifle Arena",
          description: "Electronic targets conforming to ISSF guidelines with computerized instant scores.",
          image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Sius Ascor Tech Targets",
          description: "High-precision acoustic sensor targets tracking shots within 0.1 millimeter accuracy.",
          image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Biometric Stress Suits",
          description: "Wearables measuring heart rate variability and chest wall expandability.",
          image: "https://images.unsplash.com/photo-1544033527-b192daee1f5b?auto=format&fit=crop&q=80&w=800"
        }
      ],
      trialDate: "NOVEMBER 08, 2026"
    },
    {
      id: "gym",
      name: "Athletic Gym",
      tagline: "STRENGTH & CONDITIONING",
      bannerImg: gymProgramImg,
      overview: "Build explosive kinetic transfer, maximum structural durability, and customized athletic power foundations.",
      threePillars: [
        {
          title: "Kinetic Power Transfer",
          description: "Optimizing power cleans, snatch techniques, and kettlebell drives for sport-specific extension.",
          bullets: ["Force vector output", "Barbell path velocity"],
          icon: "target"
        },
        {
          title: "Injury Durability",
          description: "Unilateral stability drills and loaded eccentric movements to shield joint cartilage and tendons.",
          bullets: ["Eccentric strength index", "Joint tracking metrics"],
          icon: "brain"
        },
        {
          title: "Metabolic Thresholds",
          description: "Dynamic super-sets and sled pushes structured to mimic late-game physical fatigue conditions.",
          bullets: ["Lactate recovery interval", "VO2 reserve tracking"],
          icon: "shield"
        }
      ],
      scheduleRows: [
        { day: "Monday", morning: "06:00 - 09:00", afternoon: "16:00 - 19:30" },
        { day: "Wednesday", morning: "06:00 - 09:00", afternoon: "16:00 - 19:30" },
        { day: "Friday", morning: "06:00 - 09:00", afternoon: "16:00 - 19:30" }
      ],
      saturdayEvent: "MIST INDORE FITATHLON COMPETITION",
      facilities: [
        {
          name: "Olympic Lift Zone",
          description: "Canadian maple platforms with Rogue barbell kits and bumper plates.",
          image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Indoor Turf Sprint Lane",
          description: "30m premium track lane for sled push and elastic resistance sprint analysis.",
          image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Keiser Pneumatic Rig",
          description: "Pneumatic resistance equipment measuring muscle velocity without inert shock loads.",
          image: "https://images.unsplash.com/photo-1544033527-b192daee1f5b?auto=format&fit=crop&q=80&w=800"
        }
      ],
      trialDate: "NOVEMBER 10, 2026"
    }
  ];

  const [activeSportIndex, setActiveSportIndex] = useState(0);
  const selectedSport = {
    ...sportsData[activeSportIndex],
    scheduleRows: [
      { day: "Monday", morning: "07:00 AM - 02:00 PM", afternoon: "02:00 PM - 09:00 PM" },
      { day: "Tuesday", morning: "07:00 AM - 02:00 PM", afternoon: "02:00 PM - 09:00 PM" },
      { day: "Wednesday", morning: "07:00 AM - 02:00 PM", afternoon: "02:00 PM - 09:00 PM" },
      { day: "Thursday", morning: "07:00 AM - 02:00 PM", afternoon: "02:00 PM - 09:00 PM" },
      { day: "Friday", morning: "07:00 AM - 02:00 PM", afternoon: "02:00 PM - 09:00 PM" },
      { day: "Saturday", morning: "07:00 AM - 02:00 PM", afternoon: "02:00 PM - 09:00 PM" },
      { day: "Sunday", morning: "07:00 AM - 02:00 PM", afternoon: "02:00 PM - 09:00 PM" }
    ]
  };

  // Helper to render icon
  const renderPillarIcon = (iconName: "target" | "brain" | "shield") => {
    switch (iconName) {
      case "target":
        return <Target className="w-8 h-8 text-[#cc0000]" />;
      case "brain":
        return <Brain className="w-8 h-8 text-[#cc0000]" />;
      case "shield":
        return <ShieldCheck className="w-8 h-8 text-[#cc0000]" />;
    }
  };

  const handleDownloadProspectus = () => {
    // Generate simple dynamic text file as a mock download
    const prospectusText = `MIST INDORE - PROSPECTUS 2026
--------------------------------------
SPORT: ${selectedSport.name} ${selectedSport.tagline}
OVERVIEW: ${selectedSport.overview}

METHODOLOGY: THE MIST INDORE METHOD
-----------------------------
Pillar 1: ${selectedSport.threePillars[0].title}
- ${selectedSport.threePillars[0].description}
- Highlights: ${selectedSport.threePillars[0].bullets.join(", ")}

Pillar 2: ${selectedSport.threePillars[1].title}
- ${selectedSport.threePillars[1].description}
- Highlights: ${selectedSport.threePillars[1].bullets.join(", ")}

Pillar 3: ${selectedSport.threePillars[2].title}
- ${selectedSport.threePillars[2].description}
- Highlights: ${selectedSport.threePillars[2].bullets.join(", ")}

WEEKLY MICRO-CYCLE SCHEDULE:
-----------------------------
${selectedSport.scheduleRows.map(row => `${row.day}: Morning (${row.morning}) | Afternoon (${row.afternoon})`).join("\n")}
Saturday Event: ${selectedSport.saturdayEvent}

WORLD-CLASS FACILITIES:
------------------------
1. ${selectedSport.facilities[0].name}: ${selectedSport.facilities[0].description}
2. ${selectedSport.facilities[1].name}: ${selectedSport.facilities[1].description}
3. ${selectedSport.facilities[2].name}: ${selectedSport.facilities[2].description}

NEXT TRIAL DATE: ${selectedSport.trialDate}
--------------------------------------
Join us and elevate your performance to the next level.
`;
    const element = document.createElement("a");
    const file = new Blob([prospectusText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `MIST_Indore_${selectedSport.name}_Prospectus.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="w-full bg-white text-neutral-850 selection:bg-[#cc0000] selection:text-white">
      {/* Interactive Tabs Header */}
      <section className="py-6 bg-white/95 border-b border-neutral-200 px-6 md:px-12 sticky top-16 z-30 backdrop-blur-xl">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#cc0000]">
              <Flame className="w-4 h-4" />
              <span className="font-mono text-[10px] tracking-widest uppercase font-black">Select Sports Academy Track</span>
            </div>
            
            {/* Horizontal Scroll Sports Navigation */}
            <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
              {sportsData.map((sport, index) => (
                <button
                  key={sport.id}
                  id={`sport-tab-${sport.id}`}
                  onClick={() => setActiveSportIndex(index)}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-none font-mono text-[11px] uppercase tracking-wider font-bold transition-all border ${
                    activeSportIndex === index
                      ? "bg-[#cc0000] text-white border-[#cc0000] shadow-sm"
                      : "bg-neutral-50 text-neutral-500 border-neutral-200 hover:border-neutral-300 hover:text-neutral-900"
                  }`}
                >
                  {sport.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sport Page Section with Motion */}
      <motion.div
        key={selectedSport.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        {/* 1. Hero Content Block */}
        <section className="relative py-24 px-6 md:px-12 overflow-hidden border-b border-neutral-900 text-center flex flex-col items-center justify-center min-h-[65vh] bg-neutral-950">
          {/* Ambient Background Graphic with dark premium overlay like homepage cards */}
          <div className="absolute inset-0 z-0">
            <img 
              src={selectedSport.bannerImg} 
              alt={selectedSport.name} 
              className="w-full h-full object-cover transition-transform duration-700" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/90 via-neutral-950/75 to-neutral-950 z-10" />
          </div>

          <div className="relative z-20 max-w-[800px] w-full flex flex-col items-center gap-6 mt-8">
            <div className="border border-white/20 px-3 py-1 rounded-none inline-flex items-center gap-1.5 bg-neutral-900/80 backdrop-blur-md shadow-xs">
              <span className="w-1.5 h-1.5 bg-[#cc0000] rounded-full animate-pulse" />
              <span className="font-mono text-[9px] tracking-widest text-neutral-300 uppercase font-bold">
                ELITE PERFORMANCE TRACK
              </span>
            </div>
            
            <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl uppercase leading-none font-black tracking-tighter text-white">
              {selectedSport.name} <span className="text-[#cc0000]">{selectedSport.tagline}</span>
            </h2>
            
            <p className="font-sans text-sm md:text-base text-neutral-300 max-w-xl leading-relaxed text-center font-medium">
              {selectedSport.overview}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
              <button 
                id="program-register-trials-btn"
                onClick={scrollToInquiryForm}
                className="bg-[#cc0000] hover:bg-[#aa0000] text-white px-8 py-3.5 rounded-none font-sans text-sm font-black uppercase tracking-wider active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                Register For Trials
              </button>
              
              <button 
                id="program-download-prospectus-btn"
                onClick={handleDownloadProspectus}
                className="bg-white/10 hover:bg-white/15 text-white border border-white/20 px-8 py-3.5 rounded-none font-sans text-xs font-bold uppercase tracking-widest active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs backdrop-blur-sm"
              >
                <FileText className="w-4 h-4 text-[#cc0000]" />
                download prospectus
              </button>
            </div>
          </div>
        </section>

        {/* 2. The MIST Indore Method */}
        <section className="py-24 px-6 md:px-12 bg-white border-b border-neutral-200 text-center">
          <div className="max-w-[1280px] mx-auto">
            <span className="font-mono text-[10px] text-[#cc0000] uppercase tracking-[0.22em] font-black">OUR FRAMEWORK</span>
            <h3 className="font-sans text-3xl sm:text-5xl font-black uppercase tracking-tight text-neutral-900 mt-2 mb-4">
              THE MIST INDORE METHOD
            </h3>
            <p className="font-sans text-xs sm:text-sm text-neutral-500 max-w-2xl mx-auto mb-16 leading-relaxed font-semibold">
              A three-pillar approach designed to optimize every facet of an athlete's performance cycle.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {selectedSport.threePillars.map((pillar, idx) => (
                <div 
                  key={idx}
                  className="bg-neutral-50 border border-neutral-200 hover:border-[#cc0000]/40 p-8 rounded-none transition-all duration-300 flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-6">
                    <div className="w-14 h-14 rounded-none bg-white border border-neutral-200 flex items-center justify-center">
                      {renderPillarIcon(pillar.icon)}
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-sans text-xl font-bold text-neutral-900 uppercase tracking-tight">
                        {pillar.title}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed font-semibold">
                        {pillar.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-neutral-200 space-y-2">
                    {pillar.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2 text-xs text-neutral-800">
                        <span className="text-[#cc0000] font-mono text-[14px]">›</span>
                        <span className="font-mono text-neutral-700 text-[11px] uppercase tracking-wide font-bold">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Training Schedule */}
        <section className="py-24 px-6 md:px-12 bg-neutral-50 border-b border-neutral-200 text-center">
          <div className="max-w-[700px] mx-auto">
            <h3 className="font-sans text-3xl sm:text-5xl font-black uppercase tracking-tight text-neutral-900 mb-4">
              TRAINING SCHEDULE
            </h3>
            <p className="font-sans text-xs sm:text-sm text-neutral-500 mb-12 leading-relaxed font-semibold">
              Rigorous training cycles optimized for peak performance. Choose your tier and commit to the grind.
            </p>

            <div className="bg-white rounded-none border border-neutral-200 overflow-hidden shadow-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50/50">
                    <th className="p-5 font-mono text-[10px] text-[#cc0000] uppercase tracking-widest font-black">DAY</th>
                    <th className="p-5 font-mono text-[10px] text-neutral-500 uppercase tracking-widest font-black">MORNING (ELITE)</th>
                    <th className="p-5 font-mono text-[10px] text-neutral-500 uppercase tracking-widest font-black">AFTERNOON (PRO)</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSport.scheduleRows.map((row, idx) => (
                    <tr key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                      <td className="p-5 font-sans text-xs font-bold text-neutral-900">{row.day}</td>
                      <td className="p-5 font-mono text-xs text-neutral-600 font-semibold">{row.morning}</td>
                      <td className="p-5 font-mono text-xs text-neutral-600 font-semibold">{row.afternoon}</td>
                    </tr>
                  ))}
                  {/* Saturday Row */}
                  <tr className="bg-[#cc0000]/5">
                    <td className="p-5 font-sans text-xs font-bold text-neutral-900">Saturday Showcase</td>
                    <td colSpan={2} className="p-5 text-center font-mono text-xs text-[#cc0000] font-black tracking-widest uppercase">
                      {selectedSport.saturdayEvent}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 4. World Class Facilities */}
        <section className="py-24 px-6 md:px-12 bg-white border-b border-neutral-200 text-center">
          <div className="max-w-[700px] mx-auto">
            <h3 className="font-sans text-3xl sm:text-5xl font-black uppercase tracking-tight text-neutral-900 mb-16">
              WORLD-CLASS FACILITIES
            </h3>

            <div className="flex flex-col gap-6">
              {selectedSport.facilities.map((fac, idx) => (
                <div 
                  key={idx}
                  className="relative aspect-[16/7] rounded-none overflow-hidden group border border-neutral-200 shadow-sm"
                >
                  <img 
                    src={fac.image} 
                    alt={fac.name} 
                    className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-700 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-6 left-6 text-left z-10">
                    <h4 className="font-sans text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-1">
                      {fac.name}
                    </h4>
                    <p className="font-sans text-xs md:text-sm text-neutral-350 font-medium">
                      {fac.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Ready to be Elite CTA */}
        <section className="py-24 px-6 md:px-12 bg-neutral-50 text-center">
          <div className="max-w-[500px] mx-auto bg-white border border-neutral-200 p-10 md:p-12 rounded-none flex flex-col items-center gap-6 shadow-md">
            <h3 className="font-sans text-3xl md:text-4xl font-black uppercase tracking-tight text-[#cc0000]">
              READY TO BE ELITE?
            </h3>
            
            <p className="font-sans text-xs md:text-sm text-neutral-500 leading-relaxed font-semibold">
              Trials for the 2026 Performance Batch are now open. Limited seats per age group to ensure individual attention.
            </p>

            <button 
              id="program-cta-trials-register-btn"
              onClick={scrollToInquiryForm}
              className="w-full bg-[#cc0000] hover:bg-[#aa0000] text-white py-4 rounded-none font-sans text-xs font-black uppercase tracking-wider active:scale-[0.98] transition-colors cursor-pointer mt-4 shadow-sm"
            >
              Register for Trials
            </button>

            <div className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black mt-2">
              NEXT TRIALS: {selectedSport.trialDate}
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
