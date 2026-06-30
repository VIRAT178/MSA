import mongoose from "mongoose";

let isConnected = false;

// Mock database for when MONGODB_URI is not set
export interface InMemoryDb {
  admissions: any[];
  contacts: any[];
  events: any[];
  users: any[];
}

export const inMemoryDb: InMemoryDb = {
  admissions: [],
  contacts: [],
  events: [],
  users: []
};

export async function connectToDatabase() {
  if (isConnected) return true;

  let mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.warn("⚠️ MONGODB_URI is not defined. Server is running in In-Memory fallback mode.");
    return false;
  }

  mongoUri = mongoUri.trim();
  mongoUri = mongoUri.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");

  if (mongoUri.includes('""') || mongoUri.includes("''")) {
    console.warn("⚠️ MONGODB_URI contains stray quotes; attempting to sanitize it.");
    mongoUri = mongoUri.replace(/""/g, "").replace(/''/g, "");
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log("✅ Successfully connected to MongoDB via Mongoose.");
    return true;
  } catch (error: any) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    return false;
  }
}

// ---------------- MODEL SCHEMAS ----------------

// 1. User Schema (supporting Roles: admin, coach, student, parent)
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "coach", "student", "parent"], default: "student" },
  phone: { type: String, default: "" },
  resetPasswordToken: { type: String, default: "" },
  resetPasswordExpires: { type: Date },
  createdAt: { type: Date, default: Date.now },
  
  // Custom profiles for users
  sportsProfile: {
    sport: { type: String, default: "cricket" },
    streak: { type: Number, default: 0 },
    maxVelocity: { type: String, default: "28 km/h" },
    verticalLeap: { type: String, default: "55 cm" },
    accuracy: { type: String, default: "80%" },
    lungRecovery: { type: String, default: "50 bpm" },
    caloriesTarget: { type: Number, default: 2500 },
    proteinTarget: { type: String, default: "120g" },
    carbsTarget: { type: String, default: "280g" },
    coachingNote: { type: String, default: "Stay hydrated and complete post-practice drills." },
    attendanceSessions: { type: Number, default: 35 },
    attendanceAttended: { type: Number, default: 32 },
  }
});

// 2. Admission Schema
const AdmissionSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true },
  athleteName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  parentName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  emailAddress: { type: String, required: true },
  selectedSport: { type: String, required: true },
  skillLevel: { type: String, required: true },
  medicalNotes: { type: String, default: "" },
  trialDate: { type: String, required: true },
  time: { type: String, default: "4:30 PM" },
  location: { type: String, default: "Malwa Sports Academy Arena, Sanwer Road, Indore" },
  status: { type: String, enum: ["Pending", "Accepted", "Denied"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

// 3. Contact Inquiry Schema
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  query: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// 4. Event Registration Schema
const EventRegistrationSchema = new mongoose.Schema({
  athleteName: { type: String, required: true },
  eventTitle: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  token: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Accepted", "Denied"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

export const User = (mongoose.models.User || mongoose.model("User", UserSchema)) as any;
export const Admission = (mongoose.models.Admission || mongoose.model("Admission", AdmissionSchema)) as any;
export const Contact = (mongoose.models.Contact || mongoose.model("Contact", ContactSchema)) as any;
export const EventRegistration = (mongoose.models.EventRegistration || mongoose.model("EventRegistration", EventRegistrationSchema)) as any;
