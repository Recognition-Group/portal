export namespace TrackApplicationEvent {
  export namespace TrackCreated {
    export const key = 'track.application.track.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
