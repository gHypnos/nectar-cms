import { Request, Response } from "express";
import { getManager } from "typeorm";
import { SettingsEntity } from '../../../database/entities/SettingsEntity';

export default class SettingsController {
    static index = async (req: Request, res: Response) => {
        let settings = {}
        let user = await await getManager()
            .createQueryBuilder(SettingsEntity, "key").getMany();
        user.forEach(query => {
            settings[query.key] = query.value
        })
        res.json(settings)
    }
}