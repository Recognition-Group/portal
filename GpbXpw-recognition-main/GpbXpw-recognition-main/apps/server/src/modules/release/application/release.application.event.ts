export namespace ReleaseApplicationEvent {
  export namespace ReleaseCreated {
    export const key = 'release.application.release.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
