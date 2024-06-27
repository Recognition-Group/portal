import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { TrackDomainFacade } from '@server/modules/track/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { TrackApplicationEvent } from './track.application.event'
import { TrackCreateDto } from './track.dto'

import { RightsHolderDomainFacade } from '../../rightsHolder/domain'

@Controller('/v1/rightsHolders')
export class TrackByRightsHolderController {
  constructor(
    private rightsHolderDomainFacade: RightsHolderDomainFacade,

    private trackDomainFacade: TrackDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/rightsHolder/:rightsHolderId/tracks')
  async findManyRightsHolderId(
    @Param('rightsHolderId') rightsHolderId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.rightsHolderDomainFacade.findOneByIdOrFail(rightsHolderId)

    const items = await this.trackDomainFacade.findManyByRightsHolder(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/rightsHolder/:rightsHolderId/tracks')
  async createByRightsHolderId(
    @Param('rightsHolderId') rightsHolderId: string,
    @Body() body: TrackCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, rightsHolderId }

    const item = await this.trackDomainFacade.create(valuesUpdated)

    await this.eventService.emit<TrackApplicationEvent.TrackCreated.Payload>(
      TrackApplicationEvent.TrackCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
