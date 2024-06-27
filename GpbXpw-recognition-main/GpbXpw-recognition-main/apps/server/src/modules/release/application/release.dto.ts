import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ReleaseCreateDto {
  @IsString()
  @IsOptional()
  albumCoverUrl?: string

  @IsString()
  @IsOptional()
  releaseDate?: string

  @IsString()
  @IsOptional()
  uPceancode?: string

  @IsString()
  @IsOptional()
  status?: string

  @IsString()
  @IsOptional()
  albumRef?: string

  @IsString()
  @IsOptional()
  alternateGenre?: string

  @IsString()
  @IsOptional()
  alternateSubgenre?: string

  @IsString()
  @IsOptional()
  artwork?: string

  @IsString()
  @IsOptional()
  artworkSize?: string

  @IsString()
  @IsOptional()
  catalog?: string

  @IsString()
  @IsOptional()
  creationDate?: string

  @IsString()
  @IsOptional()
  displayTitle?: string

  @IsString()
  @IsOptional()
  duration?: string

  @IsString()
  @IsOptional()
  format?: string

  @IsString()
  @IsOptional()
  grid?: string

  @IsString()
  @IsOptional()
  mainGenre?: string

  @IsString()
  @IsOptional()
  mainSubgenre?: string

  @IsString()
  @IsOptional()
  notes?: string

  @IsString()
  @IsOptional()
  originalReleaseDate?: string

  @IsString()
  @IsOptional()
  recipientAccounts?: string

  @IsString()
  @IsOptional()
  releaseStatuses?: string

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
  title?: string

  @IsString()
  @IsOptional()
  titleLanguage?: string

  @IsString()
  @IsOptional()
  upc?: string

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

export class ReleaseUpdateDto {
  @IsString()
  @IsOptional()
  albumCoverUrl?: string

  @IsString()
  @IsOptional()
  releaseDate?: string

  @IsString()
  @IsOptional()
  uPceancode?: string

  @IsString()
  @IsOptional()
  status?: string

  @IsString()
  @IsOptional()
  albumRef?: string

  @IsString()
  @IsOptional()
  alternateGenre?: string

  @IsString()
  @IsOptional()
  alternateSubgenre?: string

  @IsString()
  @IsOptional()
  artwork?: string

  @IsString()
  @IsOptional()
  artworkSize?: string

  @IsString()
  @IsOptional()
  catalog?: string

  @IsString()
  @IsOptional()
  creationDate?: string

  @IsString()
  @IsOptional()
  displayTitle?: string

  @IsString()
  @IsOptional()
  duration?: string

  @IsString()
  @IsOptional()
  format?: string

  @IsString()
  @IsOptional()
  grid?: string

  @IsString()
  @IsOptional()
  mainGenre?: string

  @IsString()
  @IsOptional()
  mainSubgenre?: string

  @IsString()
  @IsOptional()
  notes?: string

  @IsString()
  @IsOptional()
  originalReleaseDate?: string

  @IsString()
  @IsOptional()
  recipientAccounts?: string

  @IsString()
  @IsOptional()
  releaseStatuses?: string

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
  title?: string

  @IsString()
  @IsOptional()
  titleLanguage?: string

  @IsString()
  @IsOptional()
  upc?: string

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
