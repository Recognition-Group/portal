import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'
import {
  BillingPayment as BillingPaymentModel,
  BillingProduct as BillingProductModel,
  BillingSubscription as BillingSubscriptionModel,
} from './billing/billing.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { RightsHolder as RightsHolderModel } from './rightsHolder/rightsHolder.model'

import { Admin as AdminModel } from './admin/admin.model'

import { Track as TrackModel } from './track/track.model'

import { Release as ReleaseModel } from './release/release.model'

import { ReleaseTrack as ReleaseTrackModel } from './releaseTrack/releaseTrack.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}
  export class BillingProduct extends BillingProductModel {}
  export class BillingPayment extends BillingPaymentModel {}
  export class BillingSubscription extends BillingSubscriptionModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class RightsHolder extends RightsHolderModel {}

  export class Admin extends AdminModel {}

  export class Track extends TrackModel {}

  export class Release extends ReleaseModel {}

  export class ReleaseTrack extends ReleaseTrackModel {}
}
