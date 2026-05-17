const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true, trim: true },
    customerEmail: { type: String, required: true, trim: true },
    customerPhone: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    requestType: {
      type: String,
      enum: ["RFQ", "Item", "Technician"],
      required: true,
    },
    sealType: { type: String, default: "" },
    submittedTo: { type: String, required: true, trim: true },
    submittedRole: { type: String, required: true, trim: true },
    notes: { type: String, default: "" },
    details: { type: mongoose.Schema.Types.Mixed, required: true },
    status: {
      type: String,
      enum: ["Pending", "Complete"],
      default: "Pending",
    },
    lastFollowUpAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
