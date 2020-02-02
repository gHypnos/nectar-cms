import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { Config } from '../../../../config';

export default (req: Request, res: Response, next: NextFunction) => {
  var token = req.headers.authorization;
  if (!token) { return next(); }
  jwt.verify(token, Config.jwtSecret, async function (err, decoded) {
    if (err) {
      return res.json({ error: 'expired' });
    } else {
      next();
    }
  });
}