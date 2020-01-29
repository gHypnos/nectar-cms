import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getManager, getRepository } from "typeorm";
import { Config } from '../../../../config';
import { NewsEntity } from "../../../database/entities/NewsEntity";
import { UserEntity } from '../../../database/entities/UserEntity';

export default class HomeController {
    static index = async (req: Request, res: Response) => {
        let data = []

        var token = req.headers.authorization;
        jwt.verify(token, Config.jwtSecret, async function (err, decoded) {
            if (decoded) {
                let id = decoded.id

                const userRepository = getRepository(UserEntity);
                let user = await userRepository.findOne({ where: { id } });

                const news = await getManager().createQueryBuilder(NewsEntity, "key").getMany();

                let articles = {}
                news.forEach(query => {
                    articles["article-" + query.id] = query
                })

                data.push(user)
                data.push(articles)

                res.json(data);
            }

        });
    }
}