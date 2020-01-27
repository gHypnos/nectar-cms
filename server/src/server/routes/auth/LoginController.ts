import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import * as config from '../../../../config.json';
import { UserEntity } from '../../../database/entities/UserEntity';

export default class LoginController {
    static index = async (req: Request, res: Response) => {
        console.log(req.body)
        //Check if username and password are set
        let { username, password } = req.body;
        if (!(username && password)) {
            res.status(400).json({ "hi": "hi" });
            return;
        }

        //Get user from database
        const userRepository = getRepository(UserEntity);
        let user: UserEntity;
        try {
            user = await userRepository.findOne({ select: ['username', 'password'], where: { username } });
        } catch (error) {
            res.status(401).json();
            return;
        }
        console.log(user)
        //Check if encrypted password match
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            res.status(401).json();
            return;
        }

        //Sing JWT, valid for 1 hour
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            config.jwtSecret,
            { expiresIn: "1h" }
        );

        //Send the jwt in the response
        res.json(token);
    }
}
