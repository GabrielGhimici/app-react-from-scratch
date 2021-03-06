import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { MaxLength, Property, Required } from '@tsed/common';
import { User } from './user';
import { Thread } from './thread';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Column()
  @Required()
  @MaxLength(500)
  content: string;

  @Column({name: 'id_owner'})
  @Required()
  ownerId: number;

  @Column({name: 'id_parent_thread'})
  @Required()
  parentThreadId: number;

  @Column({name: 'create_date'})
  createdAt: Date;

  @ManyToOne(type => User, owner => owner.comments)
  @JoinColumn({name: 'id_owner'})
  @Property()
  owner: User;

  @ManyToOne(type => Thread, thread => thread.comments)
  @JoinColumn({name: 'id_parent_thread'})
  @Property()
  parentThread: Thread
}
