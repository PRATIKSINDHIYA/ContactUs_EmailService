const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Use environment variable
        pass: process.env.EMAIL_PASS, // Use environment variable
    },
});

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
    const { name, email, phone, role, school, program, location } = req.body;

    const mailOptions = {
        from: email,
        to: "pratiksindhiya3@gmail.com", // Use environment variable
        subject: 'New Form Submission',
        text: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Role: ${role}
            Institute/Company: ${school}
            Program: ${program}
            Location: ${location}
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Form submitted successfully');
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});