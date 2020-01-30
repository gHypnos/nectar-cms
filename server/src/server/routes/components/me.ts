import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Config } from '../../../../config';
import { UserEntity } from '../../../database/entities/UserEntity';

export default class Me {
    static index = async (req: Request, res: Response) => {
        var token = req.headers.authorization;
        jwt.verify(token, Config.jwtSecret, async function (err, decoded) {
            if (decoded) {
                let id = decoded.id
                let user = await getRepository(UserEntity)
                    .createQueryBuilder("user")
                    .where("user.id = :id", { id: id })
                    .innerJoin('user.currencies', 'currency')
                    .select(['user', 'currency'])
                    .getOne();
                res.json(user);
            } else {
                res.json('hi')
            }

        });
    }
}