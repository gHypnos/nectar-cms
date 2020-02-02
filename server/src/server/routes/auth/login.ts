import * as bcrypt from "bcryptjs";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { Config } from '../../../../config';
import { AccountDao } from "../../../database/daos/AccountDao";
import { UserDao } from "../../../database/daos/UserDao";

export default class Login {
    static index = async (req: Request, res: Response) => {
        let { mail, password } = req.body;
        if (!(mail && password)) {
            res.json({ "error": "no_data" });
            return;
        }

        //Get user from database
        const account = await AccountDao.findAccountByMail(mail);

        if (!account) {
            res.json({ "error": "no_account" });
            return;
        }

        //Check if encrypted password match
        if (!bcrypt.compareSync(password, account.password)) {
            res.json({ "error": "no_password" });
            return;
        }

        const character = await UserDao.getUserById(account.selected_user)

        if (!character) {
            res.json({ "error": "no_character" });
            return;
        }

        const characters = await AccountDao.getCharacters(account.id)

        await UserDao.login(character);


        //Sing JWT, valid for 1 hour
        const token = jwt.sign(
            { id: account.id, mail: account.mail, character_id: account.selected_user },
            Config.jwtSecret,
            { expiresIn: "4h" }
        );

        res.json({ token: token, account: account, character: character, characters: characters });

    }
}
