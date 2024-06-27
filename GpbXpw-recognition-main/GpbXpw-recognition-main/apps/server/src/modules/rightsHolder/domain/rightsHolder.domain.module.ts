import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { RightsHolderDomainFacade } from './rightsHolder.domain.facade'
import { RightsHolder } from './rightsHolder.model'

@Module({
  imports: [TypeOrmModule.forFeature([RightsHolder]), DatabaseHelperModule],
  providers: [RightsHolderDomainFacade, RightsHolderDomainFacade],
  exports: [RightsHolderDomainFacade],
})
export class RightsHolderDomainModule {}
