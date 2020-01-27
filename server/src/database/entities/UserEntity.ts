import * as bcrypt from "bcryptjs";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'username', unique: true })
    public username: string;

    @Column({ name: 'password', select: false })
    public password: string;

    @Column({ name: 'mail', select: false })
    public email: string;

    @Column({ name: 'motto', nullable: true })
    public motto: string;

    @Column({ name: 'gender', type: 'enum', enum: ['M', 'F'], default: 'M' })
    public gender: string;

    @Column({ name: 'look', default: 'lg-270-82.hd-180-1.ch-210-66.sh-290-81.hr-100-40' })
    public figure: string;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }

}