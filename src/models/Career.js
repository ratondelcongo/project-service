import mongoose from "mongoose";

const CareerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Career", CareerSchema);
