import { getManager } from 'typeorm';
import { UserCurrencyEntity } from '../entities';

export class UserCurrencyDao {
    public static async createCurrency(userId: number, type: number, amount: number = 0): Promise<UserCurrencyEntity> {
        const entity = new UserCurrencyEntity();

        entity.user_id = userId;
        entity.type = type;
        entity.amount = amount;

        await getManager().save(entity);

        return entity;
    }

    public static async updateCurrency(userId: number, type: number, amount: number): Promise<void> {
        if (!userId || !type || !amount) return null;

        await getManager().update(UserCurrencyEntity, { userId, type }, { amount });
    }

    public static async loadCurrencies(userId: number): Promise<UserCurrencyEntity[]> {
        if (!userId) return null;

        const results = await getManager().find(UserCurrencyEntity, { where: { userId } });

        if (!results || !results.length) return null;

        return results;
    }
}