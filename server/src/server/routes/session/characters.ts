import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { Config } from '../../../../config';
import Logger from "../../../common/Logger";
import { AccountDao } from "../../../database/daos/AccountDao";
import { NectarDao } from "../../../database/daos/NectarDao";
import { UserCurrencyDao } from "../../../database/daos/UserCurrencyDao";
import { UserDao } from "../../../database/daos/UserDao";

export default class Characters {
    static switch = async (req: Request, res: Response) => {
        var token = req.headers.authorization;
        try {
            jwt.verify(token, Config.jwtSecret, async function (err, decoded) {
                if (err) {
                    res.status(500).json()
                } else {
                    let id = decoded.character_id;


                    const character = await UserDao.getUserById(req.body.id);


                    if (!character) return res.status(500).json()

                    const banned = await UserDao.checkBanned(character, req);

                    if (banned) {
                        res.json({ "error": "banned", "ban": banned });
                        return;
                    }

                    await AccountDao.setCharacter(character.owner_id, character.id)

                    const characters = await AccountDao.getCharacters(character.owner_id)

                    const account = await AccountDao.findAccountById(character.owner_id)

                    await UserDao.login(character);

                    const token = jwt.sign(
                        { id: account.id, mail: account.mail, character_id: account.selected_user },
                        Config.jwtSecret,
                        { expiresIn: "3h" }
                    );

                    res.json({ token: token, account: account, character: character, characters: characters });
                }
            });
        } catch (e) {
            console.log(e)
        }

    }
    static create = async (req: Request, res: Response) => {
        var token = req.headers.authorization;
        try {
            jwt.verify(token, Config.jwtSecret, async function (err, decoded) {
                let { mail, username, gender } = req.body;

                if (!(username && gender)) {
                    res.json({ "error": "no_data" });
                    return;
                }

                if (username.length >= 15) {
                    res.json({ "error": "username_long" })
                    return
                }

                const account = await AccountDao.findAccountById(decoded.id);

                if (!account) {
                    res.json({ "error": "no_account" });
                    return;
                }

                const user = await UserDao.getUserByUsername(username);

                if (user) {
                    res.json({ "error": "username_taken" });
                    return;
                }
                const character = await UserDao.createUser(username, account.mail, account.password, gender, account.id, req.connection.remoteAddress);

                const token = jwt.sign(
                    { id: account.id, mail: account.mail, character_id: character.id },
                    Config.jwtSecret,
                    { expiresIn: "3h" }
                );

                await AccountDao.setCharacter(account.id, character.id);
                await UserCurrencyDao.createCurrency(character.id, 0, parseInt((await NectarDao.findSetting('starting_duckets')).value))
                await UserCurrencyDao.createCurrency(character.id, 5, parseInt((await NectarDao.findSetting('starting_diamonds')).value))
                const characters = await AccountDao.getCharacters(character.owner_id)

                if (characters.length > parseInt((await NectarDao.findSetting('max_accounts_per_user')).value)) {
                    res.json({ "error": "max_characters" })
                    return;
                }

                var usernameRegex = /^[a-zA-Z0-9]+$/;
                if (!username.match(usernameRegex)) {
                    res.json({ "error": "username_invalid" })
                    return
                }

                res.json({ token: token, account: account, character: character, characters: characters });

                Logger.user(username + '@' + account.mail + ' Registered');
            });
        } catch (e) {
            console.log(e)
        }


    }
}