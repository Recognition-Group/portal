import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ReleaseDomainModule } from '../domain'
import { ReleaseController } from './release.controller'

import { RightsHolderDomainModule } from '../../../modules/rightsHolder/domain'

import { ReleaseByRightsHolderController } from './releaseByRightsHolder.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ReleaseDomainModule,

    RightsHolderDomainModule,
  ],
  controllers: [ReleaseController, ReleaseByRightsHolderController],
  providers: [],
})
export class ReleaseApplicationModule {}
