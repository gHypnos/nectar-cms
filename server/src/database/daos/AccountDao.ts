import * as bcrypt from "bcryptjs";
import { getManager, getRepository } from 'typeorm';
import { AccountEntity, UserEntity } from '../entities';

export class AccountDao {
    public static async findAccountByMail(mail: string) {
        const entity = await getRepository(AccountEntity)
            .createQueryBuilder("account")
            .where("account.mail = :mail", { mail: mail })
            .getOne();
        return entity;
    }

    public static async findAccountById(id: number) {
        const entity = await getRepository(AccountEntity)
            .createQueryBuilder("account")
            .where("account.id = :id", { id })
            .getOne();
        return entity;
    }

    public static async createAccount(email: string, password: string, ): Promise<AccountEntity> {
        const entity = new AccountEntity();

        entity.mail = email;
        entity.password = bcrypt.hashSync(password, 8);

        await getManager().save(entity);

        return entity;
    }

    public static async setCharacter(owner_id: number, character_id: any): Promise<void> {

        if (!owner_id || !character_id) return null;

        await getManager().update(AccountEntity, { id: owner_id }, { selected_user: character_id });

    }

    public static async getCharacters(owner: number) {
        if (!owner) return null;
        const entity = await getRepository(UserEntity)
            .createQueryBuilder("user")
            .where("user.owner_id = :owner", { owner: owner })
            .getMany();
        return entity;
    }

}