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
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  title?: string

  @Column({ nullable: true })
  displayTitle?: string

  @Column({ nullable: true })
  duration?: string

  @Column({ nullable: true })
  mainArtists?: string

  @Column({ nullable: true })
  isrc?: string

  @Column({ nullable: true })
  creationDate?: string

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  albumPosition?: number

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  albumVolume?: number

  @Column({ nullable: true })
  alternateGenre?: string

  @Column({ nullable: true })
  alternateSubgenre?: string

  @Column({ nullable: true })
  audioLanguage?: string

  @Column({ nullable: true })
  catalog?: string

  @Column({ nullable: true })
  clearedTerritories?: string

  @Column({ nullable: true })
  explicitLyrics?: boolean

  @Column({ nullable: true })
  exploitable?: boolean

  @Column({ nullable: true })
  fullPublishingRights?: boolean

  @Column({ nullable: true })
  instrumental?: boolean

  @Column({ nullable: true })
  lyrics?: string

  @Column({ nullable: true })
  mainGenre?: string

  @Column({ nullable: true })
  mainRecordingSessionCountry?: string

  @Column({ nullable: true })
  mainSubgenre?: string

  @Column({ nullable: true })
  notes?: string

  @Column({ nullable: true })
  originalSubtitle?: string

  @Column({ nullable: true })
  originalTitle?: string

  @Column({ nullable: true })
  originalTitleLanguage?: string

  @Column({ nullable: true })
  publicDomain?: boolean

  @Column({ nullable: true })
  recipientAccounts?: string

  @Column({ nullable: true })
  recordingFirstOwnerCountry?: string

  @Column({ nullable: true })
  recordingOwnership?: string

  @Column({ nullable: true })
  recordingType?: string

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  recordingYear?: number

  @Column({ nullable: true })
  reprtoirIdentifier?: string

  @Column({ nullable: true })
  sender?: string

  @Column({ nullable: true })
  subtitle?: string

  @Column({ nullable: true })
  titleLanguage?: string

  @Column({ nullable: true })
  trackReference?: string

  @Column({ nullable: true })
  rightsHolderId?: string

  @ManyToOne(() => RightsHolder, parent => parent.tracks)
  @JoinColumn({ name: 'rightsHolderId' })
  rightsHolder?: RightsHolder

  @OneToMany(() => ReleaseTrack, child => child.track)
  releaseTracks?: ReleaseTrack[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
