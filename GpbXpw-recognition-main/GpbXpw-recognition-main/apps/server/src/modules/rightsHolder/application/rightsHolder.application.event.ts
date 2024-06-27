export namespace RightsHolderApplicationEvent {
  export namespace RightsHolderCreated {
    export const key = 'rightsHolder.application.rightsHolder.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
