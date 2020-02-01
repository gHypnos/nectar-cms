import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserEntity } from ".";


@Entity('users_currency')
@Unique(['user_id', 'type'])
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
    public user: UserEntity;

}