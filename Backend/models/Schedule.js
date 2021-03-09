const mongoose = require("mongoose");

const { Schema } = mongoose;

const scheduleSchema = new Schema(
  {
    is_active: {
      type: Boolean,
      default: true,
    },
    type: {
      type: Boolean,
      default: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
    doctor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        default: "Sin doctor",
        required: true,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
