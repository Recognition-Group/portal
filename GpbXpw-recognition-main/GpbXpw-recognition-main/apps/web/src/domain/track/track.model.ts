import { RightsHolder } from '../rightsHolder'

import { ReleaseTrack } from '../releaseTrack'

export class Track {
  id: string

  title?: string

  displayTitle?: string

  duration?: string

  mainArtists?: string

  isrc?: string

  creationDate?: string

  albumPosition?: number

  albumVolume?: number

  alternateGenre?: string

  alternateSubgenre?: string

  audioLanguage?: string

  catalog?: string

  clearedTerritories?: string

  explicitLyrics?: boolean

  exploitable?: boolean

  fullPublishingRights?: boolean

  instrumental?: boolean

  lyrics?: string

  mainGenre?: string

  mainRecordingSessionCountry?: string

  mainSubgenre?: string

  notes?: string

  originalSubtitle?: string

  originalTitle?: string

  originalTitleLanguage?: string

  publicDomain?: boolean

  recipientAccounts?: string

  recordingFirstOwnerCountry?: string

  recordingOwnership?: string

  recordingType?: string

  recordingYear?: number

  reprtoirIdentifier?: string

  sender?: string

  subtitle?: string

  titleLanguage?: string

  trackReference?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  rightsHolderId?: string

  rightsHolder?: RightsHolder

  releaseTracks?: ReleaseTrack[]
}
