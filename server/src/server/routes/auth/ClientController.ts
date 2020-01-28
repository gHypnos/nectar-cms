import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getManager } from "typeorm";
import * as config from '../../../../config.json';
import { UserEntity } from '../../../database/entities/UserEntity';

export default class ClientController {
    static index = async (req: Request, res: Response) => {
        var token = req.headers.authorization;
        let decoded = jwt.verify(token, config.jwtSecret);
        let id = decoded.id

        let sso = 'hi-123'
        let auth = await await getManager()
            .createQueryBuilder().update(UserEntity).set({ auth_ticket: sso })
            .where("id = :id", { id: id }).execute();

        res.json(sso)

    }
}