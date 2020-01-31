import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('users_currency')
export class UserCurrencyEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'user_id' })
    public user_id: number;

    @Column({ name: 'type', default: 0 })
    public type: number;

    @Column({ name: 'amount', default: 0 })
    public amount: number;

}