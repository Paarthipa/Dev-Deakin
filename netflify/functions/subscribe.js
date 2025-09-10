
const sgMail = require("@sendgrid/mail");

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const { email } = JSON.parse(event.body);

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Email is required" }),
      };
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email,
      from: "noreply.devdeakin@gmail.com", // must be a verified sender in SendGrid
      subject: "Subscription Confirmed",
      text: "Thanks for subscribing!",
    };

    await sgMail.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Subscription successful!" }),
    };
  } catch (error) {
    console.error("SendGrid Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Subscription failed. Try again." }),
    };
  }
};