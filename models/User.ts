import mongoose, { Schema, type Document } from "mongoose"

export interface IUser extends Document {
  _id: string
  googleId: string
  username: string
  email: string
  profilePic: string
  bio?: string
  createdAt: Date
  streak: number
  bestStreak: number
  totalCorrect: number
  totalGuesses: number
  lastActive: Date
  favoriteGenre?: string
}

const UserSchema: Schema = new Schema({
  googleId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: false },
  profilePic: { type: String, required: false },
  bio: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  streak: { type: Number, default: 0 },
  bestStreak: { type: Number, default: 0 },
  totalCorrect: { type: Number, default: 0 },
  totalGuesses: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now },
  favoriteGenre: { type: String, required: false },
})

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
