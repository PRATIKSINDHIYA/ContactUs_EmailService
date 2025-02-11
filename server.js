const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pratiksindhiya103@gmail.com', // Replace with your email
        pass: 'ehgw ijij rkop cmws', // Replace with your email password or app-specific password
    },
});

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
    const { name, email, phone, role, school, program, location } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'recipient-email@gmail.com', // Replace with the recipient's email
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
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});