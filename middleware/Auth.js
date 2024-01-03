import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token=authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized Access' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.CODE);
        req.userData = { userId: decodedToken.userId, email: decodedToken.email };
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Unauthorized Access or token expired' });
    }
};

export default authMiddleware;
