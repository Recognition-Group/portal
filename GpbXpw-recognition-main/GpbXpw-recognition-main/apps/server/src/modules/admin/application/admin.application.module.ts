import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { AdminDomainModule } from '../domain'
import { AdminController } from './admin.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { AdminByUserController } from './adminByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, AdminDomainModule, UserDomainModule],
  controllers: [AdminController, AdminByUserController],
  providers: [],
})
export class AdminApplicationModule {}
