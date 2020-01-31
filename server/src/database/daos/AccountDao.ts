import * as bcrypt from "bcryptjs";
import { getManager, getRepository } from 'typeorm';
import { AccountEntity } from '../entities';

export class AccountDao {
    public static async findAccount(mail: string) {
        const entity = await getRepository(AccountEntity)
            .createQueryBuilder("account")
            .where("account.mail = :mail", { mail: mail })
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
}