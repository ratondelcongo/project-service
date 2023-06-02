import mongoose from "mongoose";

const CourseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  teacher: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
  ],
});

export default mongoose.model("Course", CourseSchema);
