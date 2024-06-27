import { RightsHolder } from '../rightsHolder'

import { ReleaseTrack } from '../releaseTrack'

export class Release {
  id: string

  albumCoverUrl?: string

  releaseDate?: string

  uPceancode?: string

  status?: string

  albumRef?: string

  alternateGenre?: string

  alternateSubgenre?: string

  artwork?: string

  artworkSize?: string

  catalog?: string

  creationDate?: string

  displayTitle?: string

  duration?: string

  format?: string

  grid?: string

  mainGenre?: string

  mainSubgenre?: string

  notes?: string

  originalReleaseDate?: string

  recipientAccounts?: string

  releaseStatuses?: string

  reprtoirIdentifier?: string

  sender?: string

  subtitle?: string

  title?: string

  titleLanguage?: string

  upc?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  rightsHolderId?: string

  rightsHolder?: RightsHolder

  releaseTracks?: ReleaseTrack[]
}
