import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import * as config from '../../../../config.json';
import { UserEntity } from '../../../database/entities/UserEntity';

export default class HomeController {
    static index = async (req: Request, res: Response) => {
        let data = []

        var token = req.headers.authorization;
        jwt.verify(token, config.jwtSecret, async function (err, decoded) {
            if (decoded) {
                let id = decoded.id

                const userRepository = getRepository(UserEntity);
                let user = await userRepository.findOne({ where: { id } });

                data.push(user)

                res.json(data);
            }

        });
    }
}