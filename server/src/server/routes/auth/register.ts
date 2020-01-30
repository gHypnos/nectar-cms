import * as bcrypt from "bcryptjs";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as moment from 'moment';
import { getConnection, getManager, getRepository } from "typeorm";
import { Config } from '../../../../config';
import Logger from "../../../common/Logger";
import { UserCurrencyDao } from "../../../database/daos/UserCurrencyDao";
import { SettingsEntity } from "../../../database/entities/SettingsEntity";
import { UserEntity } from '../../../database/entities/UserEntity';

export default class Register {
    static index = async (req: Request, res: Response) => {
        let { username, mail, password, password_confirm, gender } = req.body;
        if (!(username && password && mail && password_confirm && gender)) {
            res.status(500).json({});
            return;
        }
        const userRepository = await getRepository(UserEntity)
            .createQueryBuilder("user")
            .where("user.username = :name OR user.mail = :mail", { name: username, mail: mail })
            .getOne();

        if (userRepository) {
            res.status(500).json({ "error": "Username taken" });
            return;
        }

        let settings = {}
        let data = await getManager().createQueryBuilder(SettingsEntity, "key").getMany();
        data.forEach(query => {
            settings[query.key] = query.value
        })
        let newUser = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(UserEntity)
            .values([
                {
                    username: username,
                    mail: mail,
                    password: bcrypt.hashSync(password, 8),
                    gender: gender,
                    last_login: moment().unix(),
                    account_created: moment().unix(),
                    motto: settings["starting_motto"],
                    credits: settings["starting_credits"]
                }
            ])
            .execute();

        let newdata = newUser.generatedMaps[0];

        await UserCurrencyDao.createCurrency(newdata.id, 0, settings["starting_duckets"])
        await UserCurrencyDao.createCurrency(newdata.id, 5, settings["starting_diamonds"])


        const token = jwt.sign(
            { id: newUser.generatedMaps[0].id, username: newUser.generatedMaps[0].username, data: 'data' },
            Config.jwtSecret,
            { expiresIn: "3h" }
        );

        res.json({ token: token, user: newUser.generatedMaps[0] });

        Logger.user(username + ' Registered');
        return
    }
}