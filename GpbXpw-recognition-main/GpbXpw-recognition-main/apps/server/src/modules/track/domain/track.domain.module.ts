import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { TrackDomainFacade } from './track.domain.facade'
import { Track } from './track.model'

@Module({
  imports: [TypeOrmModule.forFeature([Track]), DatabaseHelperModule],
  providers: [TrackDomainFacade, TrackDomainFacade],
  exports: [TrackDomainFacade],
})
export class TrackDomainModule {}
