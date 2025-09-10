const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(express.json());
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || "*",
  methods: ["POST","OPTIONS"]
}));

app.post("/subscribe", async (req, res) => {
  const email = (req.body && req.body.email || "").trim();
  if (!email) return res.status(400).send("Email is required");

  const msg = {
    to: email,
    from: "noreply.devdeakin@gmail.com",
    subject: "Welcome to Dev@Deakin!",
    text: "Thanks for subscribing!",
    html: "<strong>Thanks for subscribing to Dev@Deakin!</strong>"
  };

  try {
    await sgMail.send(msg);
    return res.status(200).send("Subscription successful. Check your inbox.");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Failed to send email.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
