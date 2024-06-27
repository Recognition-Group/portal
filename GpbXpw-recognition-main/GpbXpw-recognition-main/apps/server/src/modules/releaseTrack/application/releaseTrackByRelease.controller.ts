import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ReleaseTrackDomainFacade } from '@server/modules/releaseTrack/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ReleaseTrackApplicationEvent } from './releaseTrack.application.event'
import { ReleaseTrackCreateDto } from './releaseTrack.dto'

import { ReleaseDomainFacade } from '../../release/domain'

@Controller('/v1/releases')
export class ReleaseTrackByReleaseController {
  constructor(
    private releaseDomainFacade: ReleaseDomainFacade,

    private releaseTrackDomainFacade: ReleaseTrackDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/release/:releaseId/releaseTracks')
  async findManyReleaseId(
    @Param('releaseId') releaseId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.releaseDomainFacade.findOneByIdOrFail(releaseId)

    const items = await this.releaseTrackDomainFacade.findManyByRelease(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/release/:releaseId/releaseTracks')
  async createByReleaseId(
    @Param('releaseId') releaseId: string,
    @Body() body: ReleaseTrackCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, releaseId }

    const item = await this.releaseTrackDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ReleaseTrackApplicationEvent.ReleaseTrackCreated.Payload>(
      ReleaseTrackApplicationEvent.ReleaseTrackCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
