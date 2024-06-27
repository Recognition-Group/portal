import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { User } from '../../../modules/user/domain'

import { Track } from '../../../modules/track/domain'

import { Release } from '../../../modules/release/domain'

@Entity()
export class RightsHolder {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  name: string

  @Column({ nullable: true })
  userId?: string

  @ManyToOne(() => User, parent => parent.rightsHolders)
  @JoinColumn({ name: 'userId' })
  user?: User

  @OneToMany(() => Track, child => child.rightsHolder)
  tracks?: Track[]

  @OneToMany(() => Release, child => child.rightsHolder)
  releases?: Release[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
