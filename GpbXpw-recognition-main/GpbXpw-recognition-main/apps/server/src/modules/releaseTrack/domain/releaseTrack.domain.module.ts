import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ReleaseTrackDomainFacade } from './releaseTrack.domain.facade'
import { ReleaseTrack } from './releaseTrack.model'

@Module({
  imports: [TypeOrmModule.forFeature([ReleaseTrack]), DatabaseHelperModule],
  providers: [ReleaseTrackDomainFacade, ReleaseTrackDomainFacade],
  exports: [ReleaseTrackDomainFacade],
})
export class ReleaseTrackDomainModule {}
