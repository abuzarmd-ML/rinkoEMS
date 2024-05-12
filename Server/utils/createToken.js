import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'

dotenv.config();

// Generating JWT

const createToken = (userId,companyId = 'all',roleId) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
	let data = {
		time: Date(),
		userId,
        companyId,
        roleId
	}

	const token = jwt.sign(data, jwtSecretKey);
    return token
}

export default createToken;

