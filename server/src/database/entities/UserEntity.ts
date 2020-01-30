import * as bcrypt from "bcryptjs";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserCurrencyEntity } from "./UserCurrencyEntity";

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'username', unique: true })
    public username: string;

    @Column({ name: 'real_name', nullable: true })
    public real_name: string;

    @Column({ name: 'password', select: false })
    public password: string;

    @Column({ name: 'mail', select: false })
    public mail: string;

    @Column({ name: 'mail_verified', select: false, default: 0 })
    public mail_verified: number;

    @Column({ name: 'account_created' })
    public account_created: number;

    @Column({ name: 'account_day_of_birth', default: 0 })
    public account_day_of_birth: number;

    @Column({ name: 'last_login' })
    public last_login: number;

    @Column({ name: 'last_online', default: 0 })
    public last_online: number;

    @Column({ name: 'motto', nullable: true, default: 'Nectar' })
    public motto: string;

    @Column({ name: 'look', default: 'lg-270-82.hd-180-1.ch-210-66.sh-290-81.hr-100-40' })
    public look: string;

    @Column({ name: 'gender', type: 'enum', enum: ['M', 'F'], default: 'M' })
    public gender: string;

    @Column({ name: 'rank', default: 1 })
    public rank: number;

    @Column({ name: 'credits', default: 0 })
    public credits: number;

    @Column({ name: 'pixels', default: 0 })
    public pixels: number;

    @Column({ name: 'points', default: 0 })
    public points: number;

    @Column({ name: 'online', type: 'enum', enum: ['0', '1', '2'], default: '0' })
    public online: number;

    @Column({ name: 'auth_ticket', default: 0 })
    public auth_ticket: string;

    @Column({ name: 'ip_register', default: '127.0.0.1' })
    public ip_register: string;

    @Column({ name: 'ip_current', default: '127.0.0.1' })
    public ip_current: string;

    @Column({ name: 'machine_id', nullable: true })
    public machine_id: string;

    @Column({ name: 'home_room', default: 0 })
    public home_room: number;

    @OneToMany(type => UserCurrencyEntity, currencies => currencies.user)
    public currencies: UserCurrencyEntity[];

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }

}