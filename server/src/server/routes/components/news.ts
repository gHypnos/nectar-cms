import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { NewsEntity } from "../../../database/entities/NewsEntity";

export default class News {
    static index = async (req: Request, res: Response) => {
        const news = await getRepository(NewsEntity)
            .createQueryBuilder("article")
            .innerJoin('article.author', 'user')
            .select(['article', 'user.username'])
            .orderBy('article.id', 'DESC')
            .limit(10)
            .getMany();

        res.json(news);
    }
}