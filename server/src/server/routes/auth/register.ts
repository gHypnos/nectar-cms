import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { Config } from '../../../../config';
import Logger from '../../../common/Logger';
import { AccountDao } from '../../../database/daos/AccountDao';
import { NectarDao } from "../../../database/daos/NectarDao";
import { UserCurrencyDao } from "../../../database/daos/UserCurrencyDao";
import { UserDao } from "../../../database/daos/UserDao";

export default class Register {
    static index = async (req: Request, res: Response) => {
        let { mail, password, password_confirm } = req.body;

        if (!(mail && password && password_confirm)) {
            res.json({ "error": "no_data" });
            return;
        }

        const userRepo = await AccountDao.findAccountByMail(mail);

        if (userRepo) {
            res.json({ "error": "email_taken" });
            return;
        }

        const accountRepo = await AccountDao.createAccount(mail, password);

        const token = jwt.sign(
            { id: accountRepo.id, mail: accountRepo.mail },
            Config.jwtSecret,
            { expiresIn: "3h" }
        );

        res.json({ token: token, user: accountRepo });

        Logger.user(accountRepo.mail + ' Registered');
        return
    }
    static character = async (req: Request, res: Response) => {
        let { mail, password, password_confirm, username, gender } = req.body;
        if (!(username && gender && mail)) {
            res.json({ "error": "no_data" });
            return;
        }
        const account = await AccountDao.findAccountByMail(mail);

        if (!account) {
            res.json({ "error": "no_account" });
            return;
        }

        if (username.length >= 20) {
            res.json({ "error": "username_long" })
            return
        }

        var usernameRegex = /^[a-zA-Z0-9]+$/;
        if (!username.match(usernameRegex)) {
            res.json({ "error": "username_invalid" })
            return
        }

        const user = await UserDao.getUserByUsername(username);

        if (user) {
            res.json({ "error": "username_taken" });
            return;
        }
        const character = await UserDao.createUser(username, account.mail, account.password, gender, account.id, req.ip.split(":").pop());

        const token = jwt.sign(
            { id: account.id, mail: account.mail, character_id: character.id },
            Config.jwtSecret,
            { expiresIn: "3h" }
        );

        await AccountDao.setCharacter(account.id, character.id);
        await UserCurrencyDao.createCurrency(character.id, 0, parseInt((await NectarDao.findSetting('starting_duckets')).value))
        await UserCurrencyDao.createCurrency(character.id, 5, parseInt((await NectarDao.findSetting('starting_diamonds')).value))
        const characters = await AccountDao.getCharacters(account.id)

        res.json({ token: token, account: account, character: character, characters: characters });

        Logger.user(username + '@' + account.mail + ' Registered');

    }
}