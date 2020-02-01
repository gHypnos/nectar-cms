import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { Config } from '../../../../config';
import { UserDao } from '../../../database/daos/UserDao';

export default (req: Request, res: Response, next: NextFunction) => {
  var token = req.headers.authorization;
  if (!token) { next() };

  jwt.verify(token, Config.jwtSecret, async function (err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    const character = await UserDao.getUserById(decoded.character_id)

    const banned = await UserDao.checkBanned(character, req)
    if (banned) {
      res.json({ "error": "banned", "ban": banned });
      return
    } else {
      next()
    }

  });
}