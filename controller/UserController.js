import User from '../models/UserModal.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.CODE, {
            expiresIn: '1h',
        });

        res.json({ token, userId: user._id, expiresIn: 3600 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username) {
            res.status(400).json({ error: "username is required" })
        }
        if (!email) {
            res.status(400).json({ error: "email is required" })
        }
        if (!password) {
            res.status(400).json({ error: "password is required" })
        }
        const hashpassword =await bcrypt.hash(password,10);
        const newUser = new User({
            username,   
            email, 
            password:hashpassword,
        })

        await newUser.save()
        res.status(201).json(newUser)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export { loginController, registerController };