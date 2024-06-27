import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class TrackCreateDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  displayTitle?: string

  @IsString()
  @IsOptional()
  duration?: string

  @IsString()
  @IsOptional()
  mainArtists?: string

  @IsString()
  @IsOptional()
  isrc?: string

  @IsString()
  @IsOptional()
  creationDate?: string

  @IsNumber()
  @IsOptional()
  albumPosition?: number

  @IsNumber()
  @IsOptional()
  albumVolume?: number

  @IsString()
  @IsOptional()
  alternateGenre?: string

  @IsString()
  @IsOptional()
  alternateSubgenre?: string

  @IsString()
  @IsOptional()
  audioLanguage?: string

  @IsString()
  @IsOptional()
  catalog?: string

  @IsString()
  @IsOptional()
  clearedTerritories?: string

  @IsBoolean()
  @IsOptional()
  explicitLyrics?: boolean

  @IsBoolean()
  @IsOptional()
  exploitable?: boolean

  @IsBoolean()
  @IsOptional()
  fullPublishingRights?: boolean

  @IsBoolean()
  @IsOptional()
  instrumental?: boolean

  @IsString()
  @IsOptional()
  lyrics?: string

  @IsString()
  @IsOptional()
  mainGenre?: string

  @IsString()
  @IsOptional()
  mainRecordingSessionCountry?: string

  @IsString()
  @IsOptional()
  mainSubgenre?: string

  @IsString()
  @IsOptional()
  notes?: string

  @IsString()
  @IsOptional()
  originalSubtitle?: string

  @IsString()
  @IsOptional()
  originalTitle?: string

  @IsString()
  @IsOptional()
  originalTitleLanguage?: string

  @IsBoolean()
  @IsOptional()
  publicDomain?: boolean

  @IsString()
  @IsOptional()
  recipientAccounts?: string

  @IsString()
  @IsOptional()
  recordingFirstOwnerCountry?: string

  @IsString()
  @IsOptional()
  recordingOwnership?: string

  @IsString()
  @IsOptional()
  recordingType?: string

  @IsNumber()
  @IsOptional()
  recordingYear?: number

  @IsString()
  @IsOptional()
  reprtoirIdentifier?: string

  @IsString()
  @IsOptional()
  sender?: string

  @IsString()
  @IsOptional()
  subtitle?: string

  @IsString()
  @IsOptional()
  titleLanguage?: string

  @IsString()
  @IsOptional()
  trackReference?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string

  @IsString()
  @IsOptional()
  rightsHolderId?: string
}

export class TrackUpdateDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  displayTitle?: string

  @IsString()
  @IsOptional()
  duration?: string

  @IsString()
  @IsOptional()
  mainArtists?: string

  @IsString()
  @IsOptional()
  isrc?: string

  @IsString()
  @IsOptional()
  creationDate?: string

  @IsNumber()
  @IsOptional()
  albumPosition?: number

  @IsNumber()
  @IsOptional()
  albumVolume?: number

  @IsString()
  @IsOptional()
  alternateGenre?: string

  @IsString()
  @IsOptional()
  alternateSubgenre?: string

  @IsString()
  @IsOptional()
  audioLanguage?: string

  @IsString()
  @IsOptional()
  catalog?: string

  @IsString()
  @IsOptional()
  clearedTerritories?: string

  @IsBoolean()
  @IsOptional()
  explicitLyrics?: boolean

  @IsBoolean()
  @IsOptional()
  exploitable?: boolean

  @IsBoolean()
  @IsOptional()
  fullPublishingRights?: boolean

  @IsBoolean()
  @IsOptional()
  instrumental?: boolean

  @IsString()
  @IsOptional()
  lyrics?: string

  @IsString()
  @IsOptional()
  mainGenre?: string

  @IsString()
  @IsOptional()
  mainRecordingSessionCountry?: string

  @IsString()
  @IsOptional()
  mainSubgenre?: string

  @IsString()
  @IsOptional()
  notes?: string

  @IsString()
  @IsOptional()
  originalSubtitle?: string

  @IsString()
  @IsOptional()
  originalTitle?: string

  @IsString()
  @IsOptional()
  originalTitleLanguage?: string

  @IsBoolean()
  @IsOptional()
  publicDomain?: boolean

  @IsString()
  @IsOptional()
  recipientAccounts?: string

  @IsString()
  @IsOptional()
  recordingFirstOwnerCountry?: string

  @IsString()
  @IsOptional()
  recordingOwnership?: string

  @IsString()
  @IsOptional()
  recordingType?: string

  @IsNumber()
  @IsOptional()
  recordingYear?: number

  @IsString()
  @IsOptional()
  reprtoirIdentifier?: string

  @IsString()
  @IsOptional()
  sender?: string

  @IsString()
  @IsOptional()
  subtitle?: string

  @IsString()
  @IsOptional()
  titleLanguage?: string

  @IsString()
  @IsOptional()
  trackReference?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string

  @IsString()
  @IsOptional()
  rightsHolderId?: string
}
