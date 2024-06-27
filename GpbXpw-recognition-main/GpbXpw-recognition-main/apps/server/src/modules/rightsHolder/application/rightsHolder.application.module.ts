import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { RightsHolderDomainModule } from '../domain'
import { RightsHolderController } from './rightsHolder.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { RightsHolderByUserController } from './rightsHolderByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    RightsHolderDomainModule,

    UserDomainModule,
  ],
  controllers: [RightsHolderController, RightsHolderByUserController],
  providers: [],
})
export class RightsHolderApplicationModule {}
