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

import { RightsHolder } from '../../../modules/rightsHolder/domain'

import { ReleaseTrack } from '../../../modules/releaseTrack/domain'

@Entity()
export class Release {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  albumCoverUrl?: string

  @Column({ nullable: true })
  releaseDate?: string

  @Column({ nullable: true })
  uPceancode?: string

  @Column({ nullable: true })
  status?: string

  @Column({ nullable: true })
  albumRef?: string

  @Column({ nullable: true })
  alternateGenre?: string

  @Column({ nullable: true })
  alternateSubgenre?: string

  @Column({ nullable: true })
  artwork?: string

  @Column({ nullable: true })
  artworkSize?: string

  @Column({ nullable: true })
  catalog?: string

  @Column({ nullable: true })
  creationDate?: string

  @Column({ nullable: true })
  displayTitle?: string

  @Column({ nullable: true })
  duration?: string

  @Column({ nullable: true })
  format?: string

  @Column({ nullable: true })
  grid?: string

  @Column({ nullable: true })
  mainGenre?: string

  @Column({ nullable: true })
  mainSubgenre?: string

  @Column({ nullable: true })
  notes?: string

  @Column({ nullable: true })
  originalReleaseDate?: string

  @Column({ nullable: true })
  recipientAccounts?: string

  @Column({ nullable: true })
  releaseStatuses?: string

  @Column({ nullable: true })
  reprtoirIdentifier?: string

  @Column({ nullable: true })
  sender?: string

  @Column({ nullable: true })
  subtitle?: string

  @Column({ nullable: true })
  title?: string

  @Column({ nullable: true })
  titleLanguage?: string

  @Column({ nullable: true })
  upc?: string

  @Column({ nullable: true })
  rightsHolderId?: string

  @ManyToOne(() => RightsHolder, parent => parent.releases)
  @JoinColumn({ name: 'rightsHolderId' })
  rightsHolder?: RightsHolder

  @OneToMany(() => ReleaseTrack, child => child.release)
  releaseTracks?: ReleaseTrack[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
