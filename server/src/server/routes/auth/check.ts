import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { Config } from '../../../../config';

export default class Check {
    static index = async (req: Request, res: Response) => {
        var token = req.headers.authorization;
        jwt.verify(token, Config.jwtSecret, function (err, decoded) {
            if (err) {
                res.json('expired');
            } else {
                res.json('good');
            }
        });
    }
}