import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { Config } from '../../../../config';
import { UserDao } from "../../../database/daos/UserDao";

export default class Check {
    static index = async (req: Request, res: Response) => {
        var token = req.headers.authorization;
        jwt.verify(token, Config.jwtSecret, async function (err, decoded) {
            if (err) {
                res.json('expired');
            } else {
                let character = await UserDao.getUserById(decoded.character_id)
                res.json({ character: character });
            }
        });
    }
}