import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import contactRout from "./routes/contact.js"

const app = express();


app.use(express.json());
app.use("/submit-contact", contactRout)

app.get("/", (req, res) => {
    res.send("<h1>hello</h1>")
});

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully!");

        app.listen(process.env.PORT || 5009, () => {
            console.log("Server is running");
        });
    } catch (error) {
        console.error("Failed to start:", error.message);
        process.exit(1);
    }
}

startServer();
