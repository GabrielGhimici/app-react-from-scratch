import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MaxLength, Property, Required } from '@tsed/common';
import { Thread } from './thread';
import { Comment } from './comment';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Column({unique: true})
  @MaxLength(50)
  username: string;

  @Column({select: false})
  @MaxLength(50)
  password: string;

  @Column({name: 'first_name'})
  @Required()
  @MaxLength(50)
  firstName: string;

  @Column({name: 'last_name'})
  @Required()
  @MaxLength(50)
  lastName: string;

  @Column({name:  'is_admin'})
  @Property()
  isAdmin: number;

  @OneToMany(type => Thread, thread => thread.owner)
  @Property()
  threads: Array<Thread>;

  @OneToMany(type => Comment, comment => comment.owner)
  @Property()
  comments: Array<Comment>;
}
