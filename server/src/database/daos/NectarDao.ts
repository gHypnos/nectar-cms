import { getRepository } from 'typeorm';
import { SettingsEntity } from '../entities';

export class NectarDao {
    public static async findSetting(key: string) {
        const entity = await getRepository(SettingsEntity)
            .createQueryBuilder("setting")
            .where("setting.key = :key", { key: key })
            .getOne();
        return entity;
    }
}