import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { AdminDomainFacade } from './admin.domain.facade'
import { Admin } from './admin.model'

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), DatabaseHelperModule],
  providers: [AdminDomainFacade, AdminDomainFacade],
  exports: [AdminDomainFacade],
})
export class AdminDomainModule {}
