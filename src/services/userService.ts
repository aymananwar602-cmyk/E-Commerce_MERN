import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


interface RegisterParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}



export const register = async (params: RegisterParams) => {
    const { firstName, lastName, email, password } = params;
    const findUser = await userModel.findOne({ email });
    if (findUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });
    return generateJWT({firstName, lastName, email});
};  



interface LoginParams {
    email: string;
    password: string;
}

export const login = async (params: LoginParams) => {
    const { email, password } = params;

    const findUser = await userModel.findOne({ email });
    if (!findUser) {
        throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (!passwordMatch) {
        throw new Error("Invalid password");
    }
    return {data: generateJWT({email, firstName : findUser.firstName , lastName : findUser.lastName}) , statuscode :200}
};


const generateJWT = (data : any) => {
    return jwt.sign(data, 'sdafifb9273bujbdasjkkajsd')
}