import mongoose, { Schema, type Document } from "mongoose"

export interface IGuess extends Document {
  userId: mongoose.Types.ObjectId
  bookSlug: string
  wasCorrect: boolean
  usedHint: boolean
  createdAt: Date
}

const GuessSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bookSlug: { type: String, required: true },
  wasCorrect: { type: Boolean, required: true },
  usedHint: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Guess || mongoose.model<IGuess>("Guess", GuessSchema)
