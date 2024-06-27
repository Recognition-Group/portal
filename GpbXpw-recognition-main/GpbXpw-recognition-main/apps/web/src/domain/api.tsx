import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { BillingApi } from './billing/billing.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { RightsHolderApi } from './rightsHolder/rightsHolder.api'

import { AdminApi } from './admin/admin.api'

import { TrackApi } from './track/track.api'

import { ReleaseApi } from './release/release.api'

import { ReleaseTrackApi } from './releaseTrack/releaseTrack.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Billing extends BillingApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class RightsHolder extends RightsHolderApi {}

  export class Admin extends AdminApi {}

  export class Track extends TrackApi {}

  export class Release extends ReleaseApi {}

  export class ReleaseTrack extends ReleaseTrackApi {}
}
