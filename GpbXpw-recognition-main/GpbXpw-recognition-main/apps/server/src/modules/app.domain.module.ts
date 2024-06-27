import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { RightsHolderDomainModule } from './rightsHolder/domain'

import { AdminDomainModule } from './admin/domain'

import { TrackDomainModule } from './track/domain'

import { ReleaseDomainModule } from './release/domain'

import { ReleaseTrackDomainModule } from './releaseTrack/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    RightsHolderDomainModule,

    AdminDomainModule,

    TrackDomainModule,

    ReleaseDomainModule,

    ReleaseTrackDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
