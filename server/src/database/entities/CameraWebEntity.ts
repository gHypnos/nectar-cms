import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from ".";


@Entity('camera_web')
export class CameraWebEntity {

  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'user_id', nullable: true })
  public user_id: number;

  @Column({ name: 'room_id', nullable: true })
  public room_id: number;

  @Column({ name: 'timestamp', nullable: true })
  public timestamp: number;

  @Column({ name: 'url', nullable: true })
  public url: string;

  @ManyToOne(type => UserEntity, user => user.id)
  @JoinColumn({ name: 'user_id' })
  public user: UserEntity[];

}