import { Release } from '../release'

import { Track } from '../track'

export class ReleaseTrack {
  id: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  releaseId?: string

  release?: Release

  trackId?: string

  track?: Track
}
