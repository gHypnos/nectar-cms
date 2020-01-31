import * as bcrypt from "bcryptjs";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('accounts')
export class AccountEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'mail' })
    public mail: string;

    @Column({ name: 'password' })
    public password: string;

    @Column({ name: 'selected_user', default: 0 })
    public selected_user: number;

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }

}