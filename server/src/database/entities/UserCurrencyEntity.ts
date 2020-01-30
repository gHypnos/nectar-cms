import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./UserEntity";


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

    @ManyToOne(type => UserEntity, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    public user: UserEntity[];

}