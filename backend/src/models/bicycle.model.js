"use strict";
import moongose from "mongoose";

const BicycleSchema = new moongose.Schema({
  user: {
    type: moongose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  brand: String,
  color: String,
  model: String,
});

const Bicycle = moongose.model("Bicycle", BicycleSchema);

export default Bicycle;
