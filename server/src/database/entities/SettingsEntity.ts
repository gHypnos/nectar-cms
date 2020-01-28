import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity('nectar_settings')
export class SettingsEntity {

    @PrimaryColumn({ name: 'key', unique: true })
    public key: string;

    @Column({ name: 'value', nullable: true })
    public value: string;

}