import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getManager } from "typeorm";
import * as uuid from 'uuid';
import { Config } from '../../../../config';
import { UserEntity } from '../../../database/entities/UserEntity';

export default class ClientController {
    static index = async (req: Request, res: Response) => {
        var token = req.headers.authorization;
        try {
            jwt.verify(token, Config.jwtSecret, async function (err, decoded) {
                if (err) {
                    res.status(500).json()
                } else {
                    let id = decoded.id

                    let sso = uuid();

                    await getManager().update(UserEntity, { id: decoded.id }, { auth_ticket: sso });

                    res.json(sso)
                }
            });
        } catch (e) {

        }

    }
}