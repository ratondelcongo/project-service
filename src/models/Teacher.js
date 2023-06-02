import mongoose from "mongoose";

const TeacherSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Teacher", TeacherSchema);
