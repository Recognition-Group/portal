import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { TrackDomainModule } from '../domain'
import { TrackController } from './track.controller'

import { RightsHolderDomainModule } from '../../../modules/rightsHolder/domain'

import { TrackByRightsHolderController } from './trackByRightsHolder.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    TrackDomainModule,

    RightsHolderDomainModule,
  ],
  controllers: [TrackController, TrackByRightsHolderController],
  providers: [],
})
export class TrackApplicationModule {}
