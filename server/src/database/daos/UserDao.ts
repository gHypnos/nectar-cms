import { getManager, getRepository } from 'typeorm';
import Logger from '../../common/Logger';
import { UserEntity } from '../entities';
import { NectarDao } from './NectarDao';
import moment = require('moment');

export class UserDao {
    public static async createUser(username: string, mail: string, password: string, gender: string, owner: number, ip: string): Promise<UserEntity> {

        const entity = new UserEntity();

        let look = (await NectarDao.findSetting('starting_look_male')).value;

        if (gender === "F") {
            look = (await NectarDao.findSetting('starting_look_female')).value;
        }

        entity.owner_id = owner
        entity.username = username;
        entity.password = password;
        entity.gender = gender;
        entity.look = look;
        entity.mail = mail;
        entity.motto = (await NectarDao.findSetting('starting_motto')).value
        entity.account_created = moment().unix()
        entity.last_login = moment().unix()
        entity.ip_register = ip
        entity.ip_current = ip

        entity.credits = parseInt((await NectarDao.findSetting('starting_credits')).value);


        await getManager().save(entity);

        return entity;
    }

    public static async getIdByUsername(username: string): Promise<number> {
        if (!username) return null;

        const result = await getManager().findOne(UserEntity, { select: ['id', 'username'], where: { username } });

        if (!result) return null;

        return result.id;
    }

    public static async getUserById(id: number): Promise<UserEntity> {
        if (!id) return null;

        const result = await getManager()
            .createQueryBuilder(UserEntity, 'user')
            .where('user.id = :id', { id })
            .getOne();

        if (!result) return null;

        return result;
    }

    public static async getUserByUsername(username: string): Promise<UserEntity> {
        if (!username) return null;

        const result = await getRepository(UserEntity)
            .createQueryBuilder("user")
            .where("user.username = :username", { username: username })
            .getOne();

        return result;
    }

    public static async login(character: any): Promise<void> {
        Logger.user(character.username + ' logged in')
        await getManager()
            .createQueryBuilder()
            .update(UserEntity)
            .set({ last_login: moment().unix() })
            .where("id = :id", { id: character.id }).execute();
    }

}