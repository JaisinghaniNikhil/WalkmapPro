const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./Models/user');
const cors = require('cors');
const targetroutes = require('./Routes/TargetRoutes');

app.use(express.json());
app.use(cors());

const mongourl = "mongodb+srv://Jaisinghaninikhil:Nikhil%403006@cluster0.y60ff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongourl)
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch((e) => {
        console.log(e);
    });

    

app.post("/signup", async (req, res) => {
    const { name, age, gender, height, weight, email, password } = req.body;

    const oldUser = await User.findOne({ email });
    if (oldUser) {
        return res.status(400).send({ status: "error", data: "User Already Exists" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            age,
            gender,
            height,
            weight,
            email,
            password: hashedPassword
        });

        res.status(200).send({
            status: "ok",
            message: "User Created",
            user: {
                id: newUser._id,
                name: newUser.name,
                age: newUser.age,
                gender: newUser.gender,
                height: newUser.height,
                weight: newUser.weight,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).send({ status: "error", data: "Internal Server Error" });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ status: "error", data: "User Not Found!" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).send({ status: "error", data: "Incorrect Password" });
        }

        res.status(200).json({
            message: 'Login Successful',
            user: { 
                id: user._id,
                name: user.name,
                age: user.age,
                gender: user.gender,
                height: user.height,
                weight: user.weight,
                email: user.email
            },
        });
    } catch (error) {
        res.status(500).send({ status: "error", data: "Something Went Wrong!" });
        console.log(error);
    }
});

// Profile Route
app.get('/profile/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); 
        if (!user) {
            return res.status(404).send({ status: "error", data: "User Not Found!" });
        }
        res.status(200).json({ status: "ok", user });
    } catch (error) {
        res.status(500).send({ status: "error", data: "Something Went Wrong!" });
    }
});

// Routes
app.use('/target', targetroutes);


// Start Server
app.listen(5001, () => {
    console.log('🚀 Server Started At Port 5001');
});
