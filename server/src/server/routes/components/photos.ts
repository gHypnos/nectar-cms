import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { CameraWebEntity } from "../../../database/entities";

export default class Photos {
  static index = async (req: Request, res: Response) => {
    const news = await getRepository(CameraWebEntity)
      .createQueryBuilder("photo")
      .innerJoin('photo.user', 'user')
      .select(['photo', 'user.username', 'user.look'])
      .orderBy('photo.timestamp', 'DESC')
      .limit(200)
      .getMany();

    res.json(news);
  }
}