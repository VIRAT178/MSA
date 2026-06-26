import { Program, Athlete } from "./types";

// @ts-ignore
import cricketImg from "./assets/images/cricket_program.png";
// @ts-ignore
import footballImg from "./assets/images/football_program.png";
// @ts-ignore
import basketballImg from "./assets/images/basketball_program.jpeg";
// @ts-ignore
import athleticsImg from "./assets/images/athletics_program.png";
// @ts-ignore
import volleyballImg from "./assets/images/volleyball_program.jpeg";
// @ts-ignore
import kabaddiImg from "./assets/images/kabaddi_program.png";
// @ts-ignore
import badmintonImg from "./assets/images/badminton_program.jpeg";
// @ts-ignore
import tableTennisImg from "./assets/images/table_tennis_program.jpeg";
// @ts-ignore
import carromImg from "./assets/images/carrom_program.jpeg";
// @ts-ignore
import swimmingImg from "./assets/images/swimming_program.jpg";
// @ts-ignore
import shootingImg from "./assets/images/shooting_program.png";
// @ts-ignore
import gymImg from "./assets/images/gym_program.png";

// @ts-ignore
import athletePrinceImg from "./assets/images/athlete_prince.png";
// @ts-ignore
import athleteRiyaImg from "./assets/images/athlete_riya.png";
// @ts-ignore
import athleteAmanImg from "./assets/images/athlete_aman.png";
// @ts-ignore
import athleteMahiImg from "./assets/images/athlete_mahi.png";

export const PROGRAMS: Program[] = [
  {
    id: "prog-cricket",
    name: "Elite Cricket",
    iconName: "sports_cricket",
    image: cricketImg,
    description: "State-of-the-art fast bowling analysis, spin biomechanics, and technical batting mastery under stadium floodlights.",
    coaches: ["Coach Stayandra Singh (Bowling Specialist)", "Coach Prince Pathak (Batting Tactician)"],
    facilities: ["Indoor Pitch with High-Speed 500FPS Cameras", "Dynamic Bowling Simulators", "Grass Turf Pitches"],
    highlights: ["Speed Gun Telemetry", "Grip Tension Sensor Gloves", "Match Play Under Stadium Floodlights"],
    curriculum: {
      week1: "Stance analysis and spinal loading biomechanics during delivery stride.",
      week2: "Kinetic chain synchronization and front foot block stability workouts.",
      week3: "Tactical match simulations, crease management, and crease manipulation.",
      week4: "High-intensity endurance intervals and pressure threshold batting sets."
    }
  },
  {
    id: "prog-football",
    name: "Pro Football",
    iconName: "sports_soccer",
    image: footballImg,
    description: "High-intensity speed tactical football training, spatial awareness coaching, and athletic conditioning systems.",
    coaches: ["Coach Stayandra Singh (Pro License Coach)", "Coach Prince Pathak (Fitness Specialist)"],
    facilities: ["FIFA-Certified Synthetic Pitch", "Reaction Time Gate System", "Oxygen Deprivation Chamber"],
    highlights: ["GPS Player Tracking Vests", "Reaction Light Agility Sets", "Cardiovascular Lactate Analysis"],
    curriculum: {
      week1: "Anaerobic threshold sprint metrics and acceleration gate benchmarks.",
      week2: "Spatial visual awareness, transition play patterns, and dynamic passing.",
      week3: "High-pressing physical defensive shapes and counter-attacking drills.",
      week4: "Full-game simulation with live GPS telemetry tracking and load monitoring."
    }
  },
  {
    id: "prog-basketball",
    name: "Basketball Core",
    iconName: "sports_basketball",
    image: basketballImg,
    description: "Vertical jump maximization, advanced court positioning strategy, and explosive physical transition play.",
    coaches: ["Coach Prince Pathak (Former National Coach)", "Coach Davinder Singh (Strength Coord.)"],
    facilities: ["Premium FIBA Wooden Indoor Court", "Force-Plate Jump Sensors", "Heavy Resistance Bands"],
    highlights: ["Force-Plate Biomechanical Jump Diagnostics", "Shot release angle mapping", "Dynamic visual response trackers"],
    curriculum: {
      week1: "Reactive strength index assessment and plyometric jump mechanics.",
      week2: "High-tempo fast break coordination and screen transition mechanics.",
      week3: "Defensive closeouts, physical containment, and physical blockout drills.",
      week4: "High-intensity crunch-time shot execution under elevated heart rate."
    }
  },
  {
    id: "prog-athletics",
    name: "Athletics Hub",
    iconName: "sprint",
    image: athleticsImg,
    description: "Olympic-grade sprinting block analytics, explosive power output, and running stride length optimization.",
    coaches: ["Coach Prince Pathak", "Coach Styandra Singh (Sprint Coach)"],
    facilities: ["Indoor Polyurethane Track", "Starting Block Load Cells", "High-Velocity Resistance Fans"],
    highlights: ["Starting Block Reaction Load Telemetry", "Wind-tunnel resistance simulations", "Continuous blood-oxygen monitoring"],
    curriculum: {
      week1: "Sprinting block departure angle and dynamic power generation metrics.",
      week2: "Max velocity stride frequency optimization and posture analysis.",
      week3: "Lactate clearance tempo drills and interval breathing control.",
      week4: "Simulated tournament heats with electronic timing system feedback."
    }
  },
  {
    id: "prog-volleyball",
    name: "Pro Volleyball",
    iconName: "sports_volleyball",
    image: volleyballImg,
    description: "Rotator cuff durability, vertical attack setups, and lateral court blocking patterns under professional sensors.",
    coaches: ["Coach Jasdev", "Coach Priya (Setter Specialist)"],
    facilities: ["Canada Maple Indoor Court", "High-Velocity Spiking Rig", "Volleyball Launch Cannons"],
    highlights: ["Rotator Cuff Biomechanical Stabilization", "Attack velocity tracking sensors", "Dynamic jump fatigue maps"],
    curriculum: {
      week1: "Rotational scapular tracking and dynamic shoulder health stabilization.",
      week2: "Transition blocking footwork mechanics and landing impact balance.",
      week3: "Serve trajectory velocities and targeted serve placement patterns.",
      week4: "Tactical defensive block-and-cover setups under simulated scrimmage."
    }
  },
  {
    id: "prog-kabaddi",
    name: "Tactical Kabaddi",
    iconName: "sports_kabaddi",
    image: kabaddiImg,
    description: "Develop supreme lung capacity, explosive leg power, and high-precision tactical chain defense maneuvers.",
    coaches: ["Coach Prince Pathak", "Coach Styandra Singh (Strength & Power)"],
    facilities: ["Pro-Standard Synthetic Mat Arena", "Reaction Agility Laser Gates", "Grip Strength Suspension Rigs"],
    highlights: ["Raid Escape Acceleration Sensors", "Thigh Clutch Impact Pads", "Breath Recovery Telemetry"],
    curriculum: {
      week1: "Raid footwork pacing, lateral ankle clutches, and escape acceleration.",
      week2: "Chain alignment mechanics, team tackle timing, and core bracing.",
      week3: "High-pressure raider simulation drills and reflex dodging angles.",
      week4: "Full simulated Pro-Kabaddi mats trial tournament series."
    }
  },
  {
    id: "prog-badminton",
    name: "Elite Badminton",
    iconName: "sports_badminton",
    image: badmintonImg,
    description: "Lightning court transitions, hyper-reflex hexagonal agility grids, and explosive smash terminal velocities.",
    coaches: ["Coach Prince Pathak ", "Coach Sachin Yadav (Doubles Strategist)"],
    facilities: ["Anti-slip Mat Courts", "Reflex Light Wall Modules", "Smash Speed Sensor Rackets"],
    highlights: ["Hexagonal Agility Footwork Telemetry", "Terminal Smash Release Speeds", "Lateral Deceleration Safety Checks"],
    curriculum: {
      week1: "Hexagonal court coverage patterns, lunge balance, and stance recovery.",
      week2: "Terminal wrist snap swing accelerations and smash impact velocities.",
      week3: "Deceptive backcourt drops, net play spin, and defensive recovery.",
      week4: "High-aerobic lateral speed matches under micro-second reaction timers."
    }
  },
  {
    id: "prog-table-tennis",
    name: "Table Tennis Pro",
    iconName: "sports_table_tennis",
    image: tableTennisImg,
    description: "Neural-reflex coordination, high-tempo visual loop tracking, and micro-footwork table positioning mastery.",
    coaches: ["Coach Prince Pathak", "Coach Meenakshi Iyer (Spin Technique Specialist)"],
    facilities: ["ITTF Premium 25mm Arena", "Multi-Ball Robotic Pitchers", "Spin Analytics Visual Trackers"],
    highlights: ["Neural-Reflex Response Clocking", "Ball Rotations-Per-Second Vectoring", "Close-Table Micro-Footwork Grids"],
    curriculum: {
      week1: "Hand-eye visual speed coordination and multi-ball rhythm tracking.",
      week2: "Topspin/backspin vector adjustment, wrist control, and loop angles.",
      week3: "Close-table counter hitting, blocking defense, and court side-stepping.",
      week4: "Erratic high-speed robotic feeds and pressure game score sets."
    }
  },
  {
    id: "prog-carrom",
    name: "Indoor Games (Carrom)",
    iconName: "sports_esports",
    image: carromImg,
    description: "Hone micro-angle calculations, finger-striking metrics, and extreme cognitive calmness in high-stakes indoor tournaments.",
    coaches: ["Coach Prince Pathak ", "Coach Meera"],
    facilities: ["Premium Championship Boards", "Zero-Shadow Diffused Studio Lights", "Calibrated Weight Strikers"],
    highlights: ["Strike rebound trajectory maps", "Calibrated fingertip strike sensor trials", "Cognitive focal testing labs"],
    curriculum: {
      week1: "Striker finger releasing alignment and rebounding physics calibration.",
      week2: "Coin state reading strategies and defensive coin blocking setups.",
      week3: "Tournament style singles pressure matches and focus exercises.",
      week4: "Finger fatigue management and micro-muscle recovery workouts."
    }
  },
  {
    id: "prog-swimming",
    name: "Olympic Swimming",
    iconName: "pool",
    image: swimmingImg,
    description: "Hydrodynamic drag reduction, peak oxygen utilization, and explosive starts under underwater high-speed camera sensors.",
    coaches: ["Coach Prince Pathak ", "Coach Styandra Singh"],
    facilities: ["Olympic-Sized 10-lane 50m Pool", "Underwater Stroke Cam Systems", "Sensory Propulsive Force Paddles"],
    highlights: ["Live Hydrodynamic Drag Mapping", "Under-water kick rate sensors", "Lung threshold VO2 expanders"],
    curriculum: {
      week1: "Hydrodynamic surface area reduction and hand entry angle alignments.",
      week2: "Interval threshold sets for peak cardiac recovery.",
      week3: "Starting block reaction takeoff mechanics and dolphin kick sync.",
      week4: "Full race pacing with underwater camera feedback."
    }
  },
  {
    id: "prog-shooting",
    name: "Precision Rifle Shooting",
    iconName: "target",
    image: shootingImg,
    description: "Elite trigger pull consistency, respiratory rhythm sync, and supreme mental calm under micro-scale target metrics.",
    coaches: ["Coach Vikramjeet", "Coach Prince Pathak "],
    facilities: ["10m Air Rifle Electronic Arena", "Sius Ascor Tech acoustic sensor targets", "Biometric chest-wall stress suits"],
    highlights: ["Tremor index monitoring", "Skeletal alignment balance boards", "Trigger creep tracking scales"],
    curriculum: {
      week1: "Breathing sync patterns and trigger release timing matches.",
      week2: "Skeletal weight distribution analysis and muscle tremor offsets.",
      week3: "Trigger fingertip micro-gram pressure logging sessions.",
      week4: "Championship style simulated 10m target series under timer constraints."
    }
  },
  {
    id: "prog-gym",
    name: "Strength & Conditioning Gym",
    iconName: "fitness_center",
    image: gymImg,
    description: "Build explosive kinetic transfer, maximum structural durability, and customized athletic power foundations.",
    coaches: ["Coach Prince Pathak ", "Coach Sukhdev"],
    facilities: ["Olympic Lifting Zone", "Indoor Turf Sled Push Lane", "Keiser Pneumatic Rig"],
    highlights: ["Barbell velocity speed gates", "Joint deceleration safety telemetry", "Metabolic reserves threshold mapping"],
    curriculum: {
      week1: "Olympic power lift techniques and barbell trajectory path safety.",
      week2: "Joint support stability and loaded cartilage eccentric strengthening.",
      week3: "High-intensity sled push and late-game fatigue simulations.",
      week4: "Fitathlon challenge trials and power outputs assessment."
    }
  }
];

export const ATHLETES: Athlete[] = [
  {
    id: "ath-1",
    name: "Prince Singh",
    role: "Opening Batsman",
    category: "Cricket",
    badge: "STATE MVP",
    image: athletePrinceImg,
    bio: "Vikram represents the modern aggressive batter archetype, boasting extreme strike-rotation capabilities and backfoot force transfer.",
    achievements: [
      "Highest run-scorer in the State League (642 runs in 10 matches)",
      "Voted State High-Performance Tournament MVP 2025",
      "Selected for national academy camp selection"
    ],
    metrics: {
      speed: 84,
      stamina: 89,
      power: 92,
      discipline: 95,
      tactical: 90
    }
  },
  {
    id: "ath-2",
    name: "Riya Sharma",
    role: "Midfielder",
    category: "Football",
    badge: "PRO DRAFT",
    image: athleteRiyaImg,
    bio: "Riya controls the midfield engine with a pristine 91% passing accuracy and supreme aerobic threshold, running averages of 12.4km per match.",
    achievements: [
      "Malwa Football Federation Elite Playmaker Award",
      "Pro League Draft First Round Pick #3",
      "Represented India U-20 National team in Asia Cup"
    ],
    metrics: {
      speed: 91,
      stamina: 96,
      power: 78,
      discipline: 94,
      tactical: 95
    }
  },
  {
    id: "ath-3",
    name: "Aman Kumar",
    role: "Point Guard",
    category: "Basketball",
    badge: "ALL-STAR",
    image: athleteAmanImg,
    bio: "Aman's court vision is elite, complemented by an explosive 38-inch vertical and a signature lightning crossover that scrambles defenses.",
    achievements: [
      "National High School All-Star starting PG",
      "Most assists record holder (average 11.2 per game)",
      "Tournament gold medalist with North Malwa Elite"
    ],
    metrics: {
      speed: 95,
      stamina: 87,
      power: 82,
      discipline: 88,
      tactical: 94
    }
  },
  {
    id: "ath-4",
    name: "Mahi kaur",
    role: "100m Sprinter",
    category: "Athletics",
    badge: "RECORD HOLDER",
    image: athleteMahiImg,
    bio: "Sanya holds the absolute regional 100m sprint record with an astronomical 11.18 seconds, driven by high acceleration force off the starting blocks.",
    achievements: [
      "Regional 100m Champion (Record time of 11.18s)",
      "Gold medal in National Junior Federation Athletics",
      "Fastest block reaction speed in academy history (0.115s)"
    ],
    metrics: {
      speed: 99,
      stamina: 81,
      power: 95,
      discipline: 91,
      tactical: 80
    }
  }
];
