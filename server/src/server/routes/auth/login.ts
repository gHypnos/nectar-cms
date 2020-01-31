import * as bcrypt from "bcryptjs";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { Config } from '../../../../config';
import Logger from "../../../common/Logger";
import { AccountDao } from "../../../database/daos/AccountDao";
import { UserDao } from "../../../database/daos/UserDao";

export default class Login {
    static index = async (req: Request, res: Response) => {
        let { mail, password } = req.body;
        if (!(mail && password)) {
            res.status(400).json({});
            return;
        }

        //Get user from database
        const account = await AccountDao.findAccount(mail);

        if (!account) {
            res.status(401).json();
        }

        //Check if encrypted password match
        if (!bcrypt.compareSync(password, account.password)) {
            res.status(401).json();
            return;
        }
        const character = await UserDao.getUserById(account.selected_user)

        if (!character) {
            res.status(401).json();
            return;
        }

        //Sing JWT, valid for 1 hour
        const token = jwt.sign(
            { id: account.id, mail: account.mail, character_id: account.selected_user },
            Config.jwtSecret,
            { expiresIn: "3h" }
        );

        //Send the jwt in the response
        res.json({ token: token, account: account, character: character });
        Logger.user(character.username + ' logged in')
    }
}
