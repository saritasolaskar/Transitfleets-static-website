const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();
console.log("App Password is:", process.env.GMAIL_APP_PASSWORD);

const app = express();
app.use(express.static(path.join(__dirname, "public")));
// Middleware
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// GET - display contact form
app.get("/", (req, res) => {
    res.render("contact");
});

// POST - send email
app.post("/send", async (req, res) => {
    const {
        fullName,
        mobile,
        email,
        pickupLocation,
        dropLocation,
        travelDate,
        travelTime,
        tripType,
        returnRequired,
        vehicleType,
        passengers,
        acType,
        duration,
        notes,
        corporateBooking,
        callBack
    } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "saritasolaskar@gmail.com",
                pass: process.env.GMAIL_APP_PASSWORD, // your app password
            },
        });

        const mailOptions = {
            from: email, // user’s entered email
            to: "saritasolaskar@gmail.com", // your official email
            subject: `New Travel Requirement from ${fullName}`,
            text: `
New Travel Requirement Details:

Full Name: ${fullName}
Mobile: ${mobile}
Email: ${email}

Pickup Location: ${pickupLocation}
Drop Location: ${dropLocation}
Travel Date: ${travelDate}
Travel Time: ${travelTime}

Trip Type: ${tripType}
Return Required: ${returnRequired}

Vehicle Type: ${vehicleType}
Passengers: ${passengers}
AC/Non-AC: ${acType}
Duration: ${duration}

Corporate Booking: ${corporateBooking}
Call Back Requested: ${callBack}

Additional Notes:
${notes}
            `,
        };

        await transporter.sendMail(mailOptions);
        res.send("<h2>✅ Thank you! Your travel requirement has been submitted successfully.</h2>");
    } catch (error) {
        console.error("❌ Error sending email:", error);
        res.send("<h2>⚠️ Oops! Something went wrong. Please try again later.</h2>");
    }
});


app.listen(5500, () => console.log("Server running on http://localhost:3000"));



app.get("/home",(req,res)=>{
    res.render("index");
});

app.get("/about",(req,res)=>{
    res.render("about");
});

app.get("/services",(req,res)=>{
    res.render("services");
});

app.get("/contact",(req,res)=>{
    res.render("contact");
});