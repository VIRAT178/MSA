import { SportProgram, Coach, Athlete, Event, Achievement } from "./types";
import academyBuilding from "./assets/images/academy_building.jpg";
import athleteCricket from "./assets/images/athlete_cricket.png";
import athleticsBg from "./assets/images/athletics_bg.png";
import badmintonBg from "./assets/images/badminton_bg.png";
import basketballBg from "./assets/images/basketball_bg.png";
import carromBg from "./assets/images/carrom_bg.jpeg";
import coach1 from "./assets/images/coach_1.png";
import coach2 from "./assets/images/coach_2.png";
import coach3 from "./assets/images/coach_3.png";
import coach4 from "./assets/images/coach_4.png";
import cricketBg from "./assets/images/cricket_bg.png";
import footballBg from "./assets/images/football_bg.png";
import gymBg from "./assets/images/gym_bg.png";
import kabaddiBg from "./assets/images/kabaddi_bg.png";
import shootingBg from "./assets/images/shooting_bg.png";
import swimmingBg from "./assets/images/swimming_bg.jpg";
import tableTennisBg from "./assets/images/table_tennis_bg.jpeg";
import volleyballBg from "./assets/images/volleyball_bg.png";
import facilityGym from "./assets/images/facility_gym.png";
import facilityShooting from "./assets/images/facility_shooting.jpg";
import facilitySwimming from "./assets/images/swimming_bg.jpg";

export const SPORTS_PROGRAMS: SportProgram[] = [
  {
    id: "msa-campus",
    name: "MSA Campus",
    tagline: "Welcome to the Malwa Sports Academy Campus",
    bgImage: academyBuilding,
    bgPosition: "center 20%",
    athleteImage: "🏢",
    color: "from-slate-700 to-zinc-950",
    description: "Experience the iconic Malwa Sports Academy campus on Sanwer Road, featuring world-class training arenas, athlete residences, and championship-ready facilities.",
    ageGroups: ["Campus Tours", "Junior Athletes", "Elite Preparation"],
    methodology: [
      "Premium training grounds built for national-level sports development.",
      "Integrated athlete support facilities including physiotherapy, nutrition, and recovery.",
      "Campus environment designed for focus, resilience, and championship culture."
    ],
    schedule: "Open year-round for athlete training, trials, and youth programs.",
    coaches: ["MSA Elite Training Staff"],
    facilities: ["Indoor/Outdoor sports arenas", "Professional gym and pool", "Performance recovery center"]
  },
  {
    id: "cricket",
    name: "Cricket",
    tagline: "Unleash Elite Leather & Willow Excellence",
    bgImage: cricketBg,
    bgPosition: "center 8%",
    athleteImage: "🏏",
    color: "from-rose-700 to-red-950",
    description: "Our premium Cricket Academy offers a professional pathway from grassroots to national levels. We combine cutting-edge technology like high-speed camera analysis with authentic match scenarios on manicured turf wickets.",
    ageGroups: ["Under 12 (Junior Development)", "Under 16 (Youth Academy)", "Elite / High Performance (Open)"],
    methodology: [
      "Vicon 3D Motion Analysis for biomechanical correction.",
      "Professional bowling machine sessions with varying speeds & spin simulations.",
      "Tactical mental conditioning and match-scenario pressure drills.",
      "One-on-one video analysis sessions with certified BCCI-level coaches."
    ],
    schedule: "Mon, Wed, Fri: 4:00 PM - 7:00 PM | Sat Matchplay: 8:00 AM - 12:30 PM",
    coaches: ["Coach Vikram Dev (BCCI Level 3 Certified)", "Coach Amitesh Sharma (Ranji Trophy Veteran)"],
    facilities: ["Indoor Bowling Lanes", "Pristine Natural Turf Wickets", "Bolas Bowling Simulator", "Speed Radar Traps"]
  },
  {
    id: "football",
    name: "Football",
    tagline: "Dynamic Fluidity & Tactical Mastery",
    bgImage: footballBg,
    bgPosition: "center 5%",
    athleteImage: "⚽",
    color: "from-red-600 to-black",
    description: "The Football Development Program focuses on speed, technical precision, positional intelligence, and teamwork. Athletes train on our FIFA-certified synthetic turf field.",
    ageGroups: ["Under 11 (Foundation)", "Under 15 (Competitive Academy)", "Under 19 & Elite (Performance Team)"],
    methodology: [
      "Spanish-style tiki-taka technical possession drills.",
      "GPS tracker vests to measure athlete sprint speed, stamina, and positioning.",
      "Strength and agility conditioning specifically for modern football.",
      "Tactical video debriefs of weekly inter-academy match fixtures."
    ],
    schedule: "Tue, Thu, Sat: 4:30 PM - 7:30 PM | Sun Tactical Masterclass: 9:00 AM",
    coaches: ["Coach Rohan Khare (AFC 'A' Licensed)", "Coach Diego Silva (International Youth Consultant)"],
    facilities: ["FIFA-Standard Synthetic Pitch", "Elite Agility Training Hub", "GPS Athlete Tracking Vest System"]
  },
  {
    id: "basketball",
    name: "Basketball",
    tagline: "Rise Above: Precision, Speed, Authority",
    bgImage: basketballBg,
    bgPosition: "center 5%",
    athleteImage: "🏀",
    color: "from-amber-600 to-red-950",
    description: "At MSA, our basketballers develop elite dribbling mechanics, perimeter shooting consistency, explosive vertical jumps, and sophisticated defensive schemes.",
    ageGroups: ["Under 13 (Rising Stars)", "Under 17 (Championship Squad)", "Elite Varsity Program"],
    methodology: [
      "High-repetition shooting machine sessions (Dr. Dish).",
      "Slam-dunk vertical leap plyometric conditioning.",
      "Full-court tactical press, zone transitions, and pick-and-roll defense.",
      "Agility ladders and reaction-timer light drills."
    ],
    schedule: "Mon, Wed, Fri: 5:00 PM - 8:00 PM | Sat Drills & Scrimmages: 4:00 PM",
    coaches: ["Coach Satnam Gill (FIBA Certified)", "Coach Neha Iyer (Former National Women's Captain)"],
    facilities: ["Indoor Maplewood FIBA Court", "Dr. Dish Shooting Machine", "Reaction-Light Agility Boards"]
  },
  {
    id: "volleyball",
    name: "Volleyball",
    tagline: "Power Spikes & Unshakable Court Defense",
    bgImage: volleyballBg,
    bgPosition: "center 5%",
    athleteImage: "🏐",
    color: "from-red-800 to-stone-900",
    description: "Train with champions to master high-velocity jumps, aggressive serves, impenetrable blocks, and fluid team transition systems.",
    ageGroups: ["Under 14 (Juniors)", "Under 18 (Seniors)", "Elite Championship Prep"],
    methodology: [
      "Spike force and vertical reach measurement tracking.",
      "Continuous rally stamina simulation.",
      "High-intensity visual-tracking reactive drills.",
      "Server precision analysis."
    ],
    schedule: "Tue, Thu, Sat: 5:00 PM - 7:30 PM",
    coaches: ["Coach Suresh Rawat (Former Indian Team Player)", "Coach Tina Sen (National medalist)"],
    facilities: ["Premium Acrylic Outdoor Courts", "High-Reach Volleyball Drills Net", "Speed Spike Launchers"]
  },
  {
    id: "badminton",
    name: "Badminton",
    tagline: "Explosive Reflexes & Precise Court Craft",
    bgImage: badmintonBg,
    bgPosition: "center 5%",
    athleteImage: "🏸",
    color: "from-emerald-700 to-red-950",
    description: "Refine your footwork, deceptive wrist-work, smash velocities, and lightning-fast net play on our international-spec synthetic courts.",
    ageGroups: ["Under 12 (Foundational)", "Under 16 (Pro-Junior)", "Elite Single/Double Mastery"],
    methodology: [
      "Multi-shuttle continuous feeding drills.",
      "Reflex and dynamic lunge response tracking.",
      "Stroke-play analysis (deceptions, drops, cross-court smashes).",
      "Stamina intervals mimicking high-elevation lunges."
    ],
    schedule: "Mon, Wed, Fri: 3:30 PM - 6:30 PM | Sat Advanced Drills: 9:00 AM",
    coaches: ["Coach Prakash Nair (Former National Coach)", "Coach Anjali Jha (BWF Certified Level 2)"],
    facilities: ["6 International Yonex-Approved Synthetic Courts", "Automatic Shuttle Feeders", "Reflex Lighting Pads"]
  },
  {
    id: "tabletennis",
    name: "Table Tennis",
    tagline: "Sub-Second Decisions & Complex Spin Vectors",
    bgImage: tableTennisBg,
    bgPosition: "center 10%",
    athleteImage: "🏓",
    color: "from-teal-700 to-black",
    description: "Harness spin, velocity, and sharp angles on MSA's premium ITTF-certified tables. Our academy focuses on tactical variations and mental presence.",
    ageGroups: ["Under 12 (Sub-Juniors)", "Under 16 (Youth Squad)", "Elite National Pathway"],
    methodology: [
      "Robotic multi-spin feeding simulators.",
      "High-speed wrist rotation biomechanical tracking.",
      "Paddle angle adjustment and micro-adjustment drills.",
      "Psychology preparation for rapid score-turnarounds."
    ],
    schedule: "Tue, Thu, Sat: 4:00 PM - 7:00 PM",
    coaches: ["Coach Debashish Sen (ITTF Level 3)", "Coach Priyanka Das (National Champion)"],
    facilities: ["10 ITTF-Approved Tables", "Butterfly Amicus Prime Robot", "High-Resolution Spin Camera"]
  },
  {
    id: "athletics",
    name: "Athletics",
    tagline: "Fractions of Seconds. Pinnacles of Human Performance.",
    bgImage: athleticsBg,
    bgPosition: "center 10%",
    athleteImage: "🏃",
    color: "from-amber-700 to-red-950",
    description: "Sprint, jump, and throw with absolute efficiency. MSA Athletics program covers sprints (100m, 200m, 400m), middle-distance, long jump, triple jump, and throwing events.",
    ageGroups: ["Under 14 (Sprints & Jumps)", "Under 18 (Elite Track & Field)", "National Aspirants Pool"],
    methodology: [
      "Sprint stride frequency and length analysis via motion tags.",
      "Plyometric explosion and starting block response timing.",
      "Lactate threshold endurance mapping.",
      "Aerodynamics and throwing posture biomechanics."
    ],
    schedule: "Mon, Tue, Thu, Fri: 5:30 AM - 8:00 AM & 4:30 PM - 6:30 PM",
    coaches: ["Coach Jagtar Singh (Former Olympic Athletics Coach)", "Coach Meera Patil (NIS Diploma in Athletics)"],
    facilities: ["8-Lane Synthetic Track", "Laser-Targeted Long Jump Pit", "Automatic Electronic Finish Timers"]
  },
  {
    id: "kabaddi",
    name: "Kabaddi",
    tagline: "Strength, Strategy, Unyielding Grip",
    bgImage: kabaddiBg,
    bgPosition: "center 10%",
    athleteImage: "🤼",
    color: "from-orange-700 to-stone-900",
    description: "Learn elite raiding footwork, defensive combinations (ankle holds, thigh holds), and breathing holding techniques. Prepares athletes for Pro Kabaddi League standard.",
    ageGroups: ["Under 15 (Junior Warriors)", "Under 19 (State Prep)", "MSA Elite Kabaddi Club"],
    methodology: [
      "Raider footwork speed and touch response training.",
      "Multi-defender tackling resistance drills.",
      "Lung and abdominal capacity hold exercises.",
      "Tactical visual coordination for defensive chains."
    ],
    schedule: "Tue, Thu, Sat: 4:30 PM - 7:30 PM",
    coaches: ["Coach Harpreet Singh (Pro Kabaddi Lead Scout)", "Coach Vijay Yadav (National Medalist)"],
    facilities: ["Indoor International Mat Arena", "High-Impact Crash Pads", "Isometric Strength Stations"]
  },
  {
    id: "swimming",
    name: "Swimming",
    tagline: "Master the Water. Command Every Stroke.",
    bgImage: swimmingBg,
    bgPosition: "center 50%",
    athleteImage: "🏊",
    color: "from-blue-700 to-red-950",
    description: "Our world-class Olympic-size pool trains competitive swimmers in butterfly, backstroke, breaststroke, and freestyle, combined with underwater video analysis.",
    ageGroups: ["Under 10 (Stroke Correct)", "Under 15 (Junior Competitive)", "Elite National Squad"],
    methodology: [
      "Underwater camera stroke efficiency feedback.",
      "Hydrodynamics and flip-turn velocity drills.",
      "Aerobic and anaerobic threshold training.",
      "Resistance parachute swimming and drag training."
    ],
    schedule: "Mon to Sat: 6:00 AM - 8:30 AM & 5:00 PM - 7:30 PM",
    coaches: ["Coach Sandeep Gupta (NIS, ASCA Level 4)", "Coach Sophia Ray (International Competitor)"],
    facilities: ["Olympic-size 10-Lane Pool", "Underwater Video Recording Rig", "Swim-Parachutes & Resistance Bungees"]
  },
  {
    id: "rifleshooting",
    name: "Rifle Shooting",
    tagline: "Inhale. Focus. Execute. Complete Stillness.",
    bgImage: shootingBg,
    bgPosition: "center 40%",
    athleteImage: "🎯",
    color: "from-zinc-700 to-red-950",
    description: "Experience absolute precision training in 10m Air Rifle and Air Pistol. Our state-of-the-art shooting range uses electronic scoring targets.",
    ageGroups: ["Under 14 (Foundational Focus)", "Under 18 (Pre-National)", "Elite Championship shooters"],
    methodology: [
      "SCATT Shooter Training System (optical sensor laser feedback).",
      "Heart-rate and pulse control breathing drills.",
      "Body posture symmetry and muscle-memory locking.",
      "Match-stress simulators and psychological calming."
    ],
    schedule: "Mon, Wed, Fri: 3:00 PM - 6:00 PM | Sat Target Scrimmage: 10:00 AM",
    coaches: ["Coach Rajendra Rathore (Former National Shooter)", "Coach Tanvi Shah (ISSF Level 'B' Coach)"],
    facilities: ["10m Air Rifle Electronic Shooting Range", "Sius Ascor Electronic Targets", "SCATT Biomechanical Sensors"]
  },
  {
    id: "gym",
    name: "Gym & Fitness",
    tagline: "The Crucible of Strength & Athletic Power",
    bgImage: gymBg,
    bgPosition: "center 50%",
    athleteImage: "🏋️",
    color: "from-red-700 to-stone-900",
    description: "The engine room of all MSA athletes. We focus on sport-specific conditioning, explosive power, muscular endurance, and bulletproof injury rehabilitation.",
    ageGroups: ["Youth Strength (Age 12+)", "Athlete High-Performance Tuning", "Adult Functional Fitness"],
    methodology: [
      "Sport-specific strength programming (e.g. bowler shoulders, sprinter calves).",
      "Explosive Olympic weightlifting coaching.",
      "Functional fitness, core stability, and agility drills.",
      "Physiotherapy and post-session soft tissue recovery."
    ],
    schedule: "Mon to Sat: 5:00 AM - 10:00 AM & 4:00 PM - 9:00 PM",
    coaches: ["Coach Hardik Patel (CSCS, Sports Physio)", "Coach Kavita Roy (Sports Nutritionist & Trainer)"],
    facilities: ["Elite Olympic Platforms", "Functional Cross-Fit Rig", "Physiotherapy & Rehab Lounge", "Body Composition Analyzer"]
  },
  {
    id: "indoorgames",
    name: "Indoor Games (Carrom)",
    tagline: "Tactical Recreation",
    bgImage: carromBg,
    bgPosition: "center 15%",
    athleteImage: "🔘",
    color: "from-red-600 to-zinc-900",
    description: "Hone micro-angle calculations, finger-striking metrics, and extreme cognitive calmness in high-stakes indoor tournaments. Malwa Sports Academy's premium Indoor Arena supports state-of-the-art Carrom boards and professional board game equipment under accredited national guides.",
    ageGroups: ["Under 12 (Junior Development)", "Under 16 (Youth Cup Prep)", "Elite / High Performance (Open)"],
    methodology: [
      "Precision angle striker calculation training.",
      "Fine-motor fingertip muscle reflex conditioning.",
      "Board friction assessment & powder application mechanics.",
      "Simulated high-pressure tournament match-play under stress."
    ],
    schedule: "Mon to Sat: 4:00 PM - 7:00 PM | Sun Tactical Tourney: 10:00 AM",
    coaches: ["Coach Satnam Gill (FIBA & Indoor Games Advisor)", "Coach Neha Iyer (Former National Champion)"],
    facilities: ["International-Standard Synco Carrom Boards", "Advanced Micro-Angle Laser Cameras", "High-Precision Striker Weight Scales", "Ergonomic Performance Chairs"]
  }
];

export const COACHES: Coach[] = [
  {
    id: "1",
    name: "Coach Vikram Dev",
    role: "Head Cricket Coach",
    specialty: "Batting Biomechanics & Spin Strategy",
    experience: "8+ Years",
    bio: "Former domestic veteran who has coached state-level teams and holds BCCI Level 3 accreditation.",
    image: coach2,
    achievements: ["Coached 15+ athletes who played under-19 national level.", "Indore Best Sports Mentor Award 2024."]
  },
  {
    id: "2",
    name: "Coach Rohani Khare",
    role: "Head Football Coach",
    specialty: "High-Press Tactics & Tactical Playmaking",
    experience: "2+ Years",
    bio: "AFC 'A' licensed tactician who spent 4 years studying European academy methods in Madrid.",
    image: coach3,
    achievements: ["Led Malwa FC to the State Youth League Championship 2025.", "Specialist in GPS-based athlete telemetry."]
  },
  {
    id: "3",
    name: "Coach Satnam Gill",
    role: "Senior Basketball Coach",
    specialty: "Vertical Leap Programming & Perimeter Offense",
    experience: "5+ Years",
    bio: "FIBA certified elite coach with extensive experience playing in national leagues.",
    image: coach4,
    achievements: ["Trained 4 international athletes representing national squads.", "Indore Inter-School MVP Selector."]
  },
  {
    id: "4",
    name: "Coach Sakshi Mehra",
    role: "Elite Rifle Shooting Director",
    specialty: "Mental Focus & Olympic 10m Standing Grip",
    experience: "2+ Years",
    bio: "Former national gold medalist and national team selector, expert in optical-laser training technology.",
    image: coach1,
    achievements: ["Coached 2 shooters currently in the national Olympic pool.", "Indore Lifetime Achievement in Sports 2023."]
  }
];

export const FEATURED_ATHLETES: Athlete[] = [
  {
    id: "1",
    name: "Arjun Malviya",
    sport: "Cricket",
    achievement: "Selected for MP Ranji Trophy Team & India U-19 Challengers Pool",
    image: athleteCricket,
    level: "Elite Athlete"
  },
  {
    id: "2",
    name: "Kriti Chandak",
    sport: "Rifle Shooting",
    achievement: "National Gold Medalist (10m Air Rifle) & Ranked No. 3 in India Juniors",
    image: shootingBg,
    level: "Youth International"
  },
  {
    id: "3",
    name: "Rishi Rathore",
    sport: "Football",
    achievement: "Selected for I-League Youth Division & MSA League Top Scorer",
    image: footballBg,
    level: "State Representative"
  },
  {
    id: "4",
    name: "Simran Gill",
    sport: "Basketball",
    achievement: "Captain of MP State Girls Team & School National MVP",
    image: basketballBg,
    level: "National Youth Medalist"
  }
];

export const UPCOMING_EVENTS: Event[] = [
  {
    id: "event_1",
    title: "MSA National Level Cricket Selections",
    date: "July 12, 2026",
    time: "8:00 AM - 4:00 PM",
    location: "Malwa Turf Complex, Sanwer Road, Indore",
    sport: "Cricket",
    description: "Open selection trials for our highly acclaimed residency cricket programs. Fully sponsored scholarships available for top 3 selected talents.",
    registrationOpen: true
  },
  {
    id: "event_2",
    title: "Malwa Youth Elite Cup (Football U-16)",
    date: "July 24-28, 2026",
    time: "3:00 PM - 9:00 PM",
    location: "FIFA Turf Ground, MSA Campus",
    sport: "Football",
    description: "A premium inter-state tournament bringing top clubs and academy scouts from across Central India.",
    registrationOpen: true
  },
  {
    id: "event_3",
    title: "Olympic Hopefuls Shooting Exhibition",
    date: "August 10, 2026",
    time: "10:00 AM - 2:00 PM",
    location: "Electronic Shooting Arena, Indore",
    sport: "Rifle Shooting",
    description: "A showcasing tournament evaluated by ISSF international judges. Open invitation for regional shooters.",
    registrationOpen: false
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach_1",
    title: "Central India Football Champions",
    sport: "Football",
    year: "2025",
    athleteName: "MSA Under-17 Boys Team",
    medal: "Championship",
    description: "Defeated Indore FC 4-1 in the final match to secure the regional gold cup title."
  },
  {
    id: "ach_2",
    title: "Gold Medal - 10m Air Rifle Nationals",
    sport: "Rifle Shooting",
    year: "2024",
    athleteName: "Kriti Chandak",
    medal: "Gold",
    description: "Scored a record 631.2 points in the youth finals to secure the national title."
  },
  {
    id: "ach_3",
    title: "MP State Inter-Academy Cup Champions",
    sport: "Cricket",
    year: "2025",
    athleteName: "MSA Elite Squad",
    medal: "Championship",
    description: "Clean sweep in the entire tournament, finishing unbeaten over 12 fixtures."
  }
];

export const TESTIMONIALS = [
  {
    quote: "The coaching at MSA has transformed my son's bowling action and mental resilience. They use elite video analytics that we didn't find anywhere else in MP.",
    author: "Sanjay Malviya",
    relation: "Father of Arjun Malviya (Cricket State Athlete)",
    rating: 5
  },
  {
    quote: "MSA is more than just an academy; it's a launchpad for professional careers. The facilities are on par with national stadiums, and Coach Rajendra's shooting program is world-class.",
    author: "Kriti Chandak",
    relation: "Elite Athlete, National Gold Medalist",
    rating: 5
  },
  {
    quote: "The combination of tactical coaches and a modern sports gym helps our daughter remain injury-free while expanding her vertical jump. Highly recommended!",
    author: "Gurvinder Gill",
    relation: "Father of Simran Gill (Basketball Captain)",
    rating: 5
  }
];

export const FACILITIES = [
  {
    title: "FIFA-Standard Turf Pitch",
    description: "Lush synthetic football turf with professional LED floodlights for nighttime technical matches and GPS athlete tracking support.",
    image: footballBg
  },
  {
    title: "Electronic Shooting Arena",
    description: "Equipped with world-class Sius Ascor target scoreboards and SCATT laser biomechanical alignment tools.",
    image: facilityShooting
  },
  {
    title: "Maplewood Indoor Basketball Court",
    description: "FIBA-certified shock-absorbent maple wood floor configured with professional glass backboards and automatic shot counters.",
    image: basketballBg
  },
  {
    title: "Olympic-Sized Training Pool",
    description: "10-lane regulated temperature pool with professional anti-wave lane boundaries and integrated high-speed underwater video feedback rigs.",
    image: facilitySwimming
  },
  {
    title: "Apex Sports Performance Gym",
    description: "Advanced strength conditioning machines, Olympic lifting pads, physical therapy rooms, and computerized body fat trackers.",
    image: facilityGym
  }
];
