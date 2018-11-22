import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MaxLength, Required } from '@tsed/common';
import { Thread } from './thread';
import { Comment } from './comment';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  @Required()
  @MaxLength(50)
  username: string;

  @Column()
  @Required()
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

  @OneToMany(type => Thread, thread => thread.owner)
  threads: Array<Thread>;

  @OneToMany(type => Thread, comment => comment.owner)
  comments: Array<Comment>;
}
