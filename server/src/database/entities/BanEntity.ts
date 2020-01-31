import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('bans')
export class BanEntity {

  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'user_id', nullable: false })
  public user_id: number;

  @Column({ name: 'ip', nullable: false })
  public ip: string;

  @Column({ name: 'machine_id', nullable: false })
  public machine_id: string;

  @Column({ name: 'user_staff_id', nullable: false })
  public user_staff_id: number;

  @Column({ name: 'timestamp', nullable: false })
  public timestamp: number;

  @Column({ name: 'ban_expire', nullable: false })
  public ban_expire: number;

  @Column({ name: 'ban_reason', nullable: false })
  public ban_reason: string;

  @Column({ name: 'type', type: 'enum', enum: ['account', 'super', 'ip'], default: 'account' })
  public type: string;

  @Column({ name: 'cfh_topic', nullable: false })
  public cfh_topic: number;

}