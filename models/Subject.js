const mongoose = require("mongoose");
const { Schema } = mongoose;

const subjectSchema = new Schema(
  {
    email: String,
    step: { type: Number, default: 0 }
  },
  {
    // allows for request.subject.save()
    usePushEach: true
  }
);

mongoose.model("subjects", subjectSchema);
