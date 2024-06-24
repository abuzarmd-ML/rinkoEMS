import jwt from 'jsonwebtoken'

const verifyTokenAndRole  = (req, res, next)=>{
    const token = req.cookies.token;
    console.log('token',req.cookies.token)
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}

export default verifyTokenAndRole