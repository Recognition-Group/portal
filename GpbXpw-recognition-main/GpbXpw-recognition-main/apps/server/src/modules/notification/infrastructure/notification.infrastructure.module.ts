import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationRightsHolderSubscriber } from './subscribers/notification.rightsHolder.subscriber'

import { NotificationAdminSubscriber } from './subscribers/notification.admin.subscriber'

import { NotificationTrackSubscriber } from './subscribers/notification.track.subscriber'

import { NotificationReleaseSubscriber } from './subscribers/notification.release.subscriber'

import { NotificationReleaseTrackSubscriber } from './subscribers/notification.releaseTrack.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationRightsHolderSubscriber,

    NotificationAdminSubscriber,

    NotificationTrackSubscriber,

    NotificationReleaseSubscriber,

    NotificationReleaseTrackSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
