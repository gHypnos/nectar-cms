import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as moment from 'moment';
import { getManager, getRepository } from "typeorm";
import * as config from '../../../../config.json';
import { UserEntity } from '../../../database/entities/UserEntity';

export default class LoginController {
    static index = async (req: Request, res: Response) => {
        let { username, password } = req.body;
        if (!(username && password)) {
            res.status(400).json({});
            return;
        }

        //Get user from database
        const userRepository = getRepository(UserEntity);
        let user: UserEntity;
        try {
            user = await userRepository.findOne({ select: ['username', 'password', 'id'], where: { username } });
        } catch (error) {
            res.status(401).json();
            return;
        }

        //Check if encrypted password match
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            res.status(401).json();
            return;
        }

        //Sing JWT, valid for 1 hour
        const token = jwt.sign(
            { id: user.id, username: user.username, data: 'data' },
            config.jwtSecret,
            { expiresIn: "1h" }
        );


        let sso = 'hi-123'
        let auth = await await getManager()
            .createQueryBuilder().update(UserEntity).set({ auth_ticket: sso, last_login: moment().unix() })
            .where("id = :id", { id: user.id }).execute();
        //Send the jwt in the response
        res.json(token);
    }
}
