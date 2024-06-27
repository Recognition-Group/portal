export namespace ReleaseTrackApplicationEvent {
  export namespace ReleaseTrackCreated {
    export const key = 'releaseTrack.application.releaseTrack.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
