import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./UserEntity";


@Entity('nectar_news')
export class NewsEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'title', nullable: true })
    public title: string;

    @Column({ name: 'author_id', nullable: true })
    public authorID: number;

    @Column({ name: 'shortstory', nullable: true })
    public shortstory: string;

    @Column({ name: 'longstory', nullable: true })
    public longstory: string;

    @Column({ name: 'image', nullable: true })
    public image: string;

    @Column({ name: 'timestamp_created', default: () => 'CURRENT_TIMESTAMP' })
    public timestampCreated: Date;

    @ManyToOne(type => UserEntity, user => user.id)
    @JoinColumn({ name: 'author_id' })
    public user: UserEntity;
}