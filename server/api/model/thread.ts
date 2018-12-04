import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { MaxLength, Property, Required } from '@tsed/common';
import { User } from './user';
import { Comment } from './comment';

@Entity()
export class Thread {
  @PrimaryGeneratedColumn()
  @Property()
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
  @Property()
  createDate: Date;

  @ManyToOne(type => User, owner => owner.threads)
  @JoinColumn({name: 'id_owner'})
  @Property()
  owner: User;

  @OneToMany(type => Comment, comment => comment.parentThread)
  @Property()
  comments: Array<Comment>;
}
