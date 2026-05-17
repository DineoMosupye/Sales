const express = require("express");
const Request = require("../models/Request");
const { sendRequestEmail } = require("../utils/email");
const { ADMIN_EMAILS, ENGINEER_EMAILS, TECHNICIAN_EMAIL } = require("../config");

const router = express.Router();

function validateRequired(required, body) {
  for (const field of required) {
    if (!body[field]) return field;
  }
  return null;
}

router.post("/quote", async (req, res) => {
  try {
    const missing = validateRequired(
      ["CustomerName", "CustomerEmail", "CustomerPhone", "company", "quotePath", "sealType", "submittedTo", "details"],
      req.body
    );
    if (missing) {
      return res.status(400).json({ message: `${missing} is required` });
    }

    const isKnowPath = req.body.quotePath === "know";
    const allowedEmails = isKnowPath ? ADMIN_EMAILS : ENGINEER_EMAILS;
    if (!allowedEmails.includes(req.body.submittedTo)) {
      return res.status(400).json({ message: "Invalid recipient selected." });
    }

    const request = await Request.create({
      CustomerName: req.body.CustomerName,
      CustomerEmail: req.body.CustomerEmail,
      CustomerPhone: req.body.CustomerPhone,
      company: req.body.company,
      requestType: isKnowPath ? "RFQ" : "Item",
      sealType: req.body.sealType,
      submittedTo: req.body.submittedTo,
      submittedRole: isKnowPath ? "Admin" : "Engineer",
      details: req.body.details,
      notes: req.body.notes || "",
    });

    await sendRequestEmail({
      to: request.submittedTo,
      subject: `${request.requestType} request from ${request.repName}`,
      request,
    });

    return res.status(201).json(request);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/technician", async (req, res) => {
  try {
    const missing = validateRequired(
      ["CustomerName", "CustomerEmail", "CustomerPhone", "company", "date", "time", "serviceDescription"],
      req.body
    );
    if (missing) {
      return res.status(400).json({ message: `${missing} is required` });
    }

    const request = await Request.create({
      CustomerName: req.body.CustomerName,
      CustomerEmail: req.body.CustomerEmail,
      CustomerPhone: req.body.CustomerPhone,
      company: req.body.company,
      requestType: "Technician",
      sealType: "",
      submittedTo: TECHNICIAN_EMAIL,
      submittedRole: "Technician",
      details: {
        date: req.body.date,
        time: req.body.time,
        serviceDescription: req.body.serviceDescription,
      },
      notes: req.body.notes || "",
    });

    await sendRequestEmail({
      to: request.submittedTo,
      subject: `Technician booking request from ${request.repName}`,
      request,
    });

    return res.status(201).json(request);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/requests", async (_req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    return res.json(requests);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/request/:id", async (req, res) => {
  try {
    const update = {};
    if (req.body.action === "complete") {
      update.status = "Complete";
    }
    if (req.body.action === "followup") {
      update.lastFollowUpAt = new Date();
    }

    const request = await Request.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    if (req.body.action === "followup") {
      await sendRequestEmail({
        to: request.submittedTo,
        subject: `Follow up: ${request.requestType} request from ${request.customerName}`,
        request,
      });
    }

    return res.json(request);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
