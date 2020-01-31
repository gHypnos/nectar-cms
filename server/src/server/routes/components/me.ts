import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { Config } from '../../../../config';
import { UserCurrencyDao } from "../../../database/daos/UserCurrencyDao";
import { UserDao } from "../../../database/daos/UserDao";

export default class Me {
    static index = async (req: Request, res: Response) => {
        var token = req.headers.authorization;
        jwt.verify(token, Config.jwtSecret, async function (err: string, decoded: any) {
            if (decoded) {
                var data = []
                let id = decoded.character_id
                let user = await UserDao.getUserById(id)
                let currencies = await UserCurrencyDao.loadCurrencies(id);
                data.push(user)
                data.push(currencies)
                res.json(data);
            } else {
                res.status(500).json(err)
            }
        });
    }
}