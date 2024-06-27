import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ReleaseTrackDomainModule } from '../domain'
import { ReleaseTrackController } from './releaseTrack.controller'

import { ReleaseDomainModule } from '../../../modules/release/domain'

import { ReleaseTrackByReleaseController } from './releaseTrackByRelease.controller'

import { TrackDomainModule } from '../../../modules/track/domain'

import { ReleaseTrackByTrackController } from './releaseTrackByTrack.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ReleaseTrackDomainModule,

    ReleaseDomainModule,

    TrackDomainModule,
  ],
  controllers: [
    ReleaseTrackController,

    ReleaseTrackByReleaseController,

    ReleaseTrackByTrackController,
  ],
  providers: [],
})
export class ReleaseTrackApplicationModule {}
