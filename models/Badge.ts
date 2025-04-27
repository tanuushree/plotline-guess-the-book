import mongoose, { Schema, type Document } from "mongoose"

export interface IBadge extends Document {
  userId: mongoose.Types.ObjectId
  badgeType: string
  awardedAt: Date
}

const BadgeSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  badgeType: { type: String, required: true },
  awardedAt: { type: Date, default: Date.now },
})

export default mongoose.models.Badge || mongoose.model<IBadge>("Badge", BadgeSchema)
