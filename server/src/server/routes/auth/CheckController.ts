import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as config from '../../../../config.json';

export default class CheckController {
    static index = async (req: Request, res: Response) => {
        var token = req.headers.authorization;
        jwt.verify(token, config.jwtSecret, function (err, decoded) {
            if (err) {
                res.json('expired');
            }
        });
    }
}