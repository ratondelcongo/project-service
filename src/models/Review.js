import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    idCourse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Review", ReviewSchema);
