import express from "express"
const router = express.Router()

import Contact from "../models/Contact.js";


router.post("/", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof message !== "string" ||
            !name.trim() ||
            !email.trim() ||
            !message.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and message are required."
            });
        }

        const contact = await Contact.create({
            name,
            email,
            message
        });

        res.status(201).json({
            success: true,
            message: "Contact submitted successfully!",
            data: contact
        });

    } catch (error) {
        console.error("Error saving contact:", error);

        res.status(500).json({
            success: false,
            message: "Server error while saving contact."
        });
    }
});


router.get("/", async (req, res) => {
    try {
        const contacts = await Contact.find()
            .sort({
                submissionDate: -1
            });

        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });

    } catch (error) {
        console.error("Error fetching contacts:", error);

        res.status(500).json({
            success: false,
            message: "Server error while retrieving contacts."
        });
    }
});



export default router