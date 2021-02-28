const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    is_active: {
      type: Boolean,
      default: true,
    },
    date: {
      type: Date,
      required: true,
    },
    subject: {
      type: String,
    },
    note: {
      type: String,
    },
    author: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
    about: [
      {
        type: mongoose.Schema.Types.ObjectId,
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

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
