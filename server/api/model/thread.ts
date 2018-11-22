import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { MaxLength, Required } from '@tsed/common';
import { User } from './user';
import { Comment } from './comment';

@Entity()
export class Thread {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Required()
  @MaxLength(50)
  title: string;

  @Column()
  @MaxLength(500)
  description: string;

  @Column({name: 'id_owner'})
  @Required()
  ownerId: number;

  @Column({name: 'create_date'})
  createdAt: Date;

  @ManyToOne(type => User, owner => owner.threads)
  owner: User;

  @OneToMany(type => Thread, comment => comment.owner)
  comments: Array<Comment>;
}
