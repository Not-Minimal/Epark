"use strict";

// Se importa el módulo de 'mongoose'
import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  {
    versionKey: false,
  },
);

// Modelo de datos de usuario
const Issue = mongoose.model("issues", issueSchema);

export default Issue;
