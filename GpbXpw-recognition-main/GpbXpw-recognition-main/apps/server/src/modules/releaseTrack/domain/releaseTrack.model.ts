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

import { Release } from '../../../modules/release/domain'

import { Track } from '../../../modules/track/domain'

@Entity()
export class ReleaseTrack {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  releaseId?: string

  @ManyToOne(() => Release, parent => parent.releaseTracks)
  @JoinColumn({ name: 'releaseId' })
  release?: Release

  @Column({ nullable: true })
  trackId?: string

  @ManyToOne(() => Track, parent => parent.releaseTracks)
  @JoinColumn({ name: 'trackId' })
  track?: Track

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
