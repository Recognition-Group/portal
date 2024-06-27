import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ReleaseDomainFacade } from './release.domain.facade'
import { Release } from './release.model'

@Module({
  imports: [TypeOrmModule.forFeature([Release]), DatabaseHelperModule],
  providers: [ReleaseDomainFacade, ReleaseDomainFacade],
  exports: [ReleaseDomainFacade],
})
export class ReleaseDomainModule {}
