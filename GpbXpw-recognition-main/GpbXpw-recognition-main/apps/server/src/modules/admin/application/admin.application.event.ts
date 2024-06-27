export namespace AdminApplicationEvent {
  export namespace AdminCreated {
    export const key = 'admin.application.admin.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
