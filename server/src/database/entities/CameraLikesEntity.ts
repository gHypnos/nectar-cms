import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserEntity } from ".";


@Entity('nectar_camera_likes')
@Unique(['user_id', 'photo_id'])

export class CameraLikesEntity {

  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'user_id', nullable: true })
  public user_id: number;

  @Column({ name: 'photo_id', nullable: true })
  public photo_id: number;

  @Column({ name: 'timestamp', nullable: true })
  public timestamp: number;

  @ManyToOne(type => UserEntity, user => user.id)
  @JoinColumn({ name: 'user_id' })
  public user: UserEntity[];

}