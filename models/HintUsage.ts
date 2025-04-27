import mongoose, { Schema, type Document } from "mongoose"

export interface IHintUsage extends Document {
  userId: mongoose.Types.ObjectId
  bookSlug: string
  hintType: string
  createdAt: Date
}

const HintUsageSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bookSlug: { type: String, required: true },
  hintType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.HintUsage || mongoose.model<IHintUsage>("HintUsage", HintUsageSchema)
