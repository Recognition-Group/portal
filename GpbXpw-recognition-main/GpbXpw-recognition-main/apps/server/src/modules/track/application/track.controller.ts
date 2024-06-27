import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import { Track, TrackDomainFacade } from '@server/modules/track/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { TrackApplicationEvent } from './track.application.event'
import { TrackCreateDto, TrackUpdateDto } from './track.dto'

@Controller('/v1/tracks')
export class TrackController {
  constructor(
    private eventService: EventService,
    private trackDomainFacade: TrackDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.trackDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: TrackCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.trackDomainFacade.create(body)

    await this.eventService.emit<TrackApplicationEvent.TrackCreated.Payload>(
      TrackApplicationEvent.TrackCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:trackId')
  async findOne(@Param('trackId') trackId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.trackDomainFacade.findOneByIdOrFail(
      trackId,
      queryOptions,
    )

    return item
  }

  @Patch('/:trackId')
  async update(
    @Param('trackId') trackId: string,
    @Body() body: TrackUpdateDto,
  ) {
    const item = await this.trackDomainFacade.findOneByIdOrFail(trackId)

    const itemUpdated = await this.trackDomainFacade.update(
      item,
      body as Partial<Track>,
    )
    return itemUpdated
  }

  @Delete('/:trackId')
  async delete(@Param('trackId') trackId: string) {
    const item = await this.trackDomainFacade.findOneByIdOrFail(trackId)

    await this.trackDomainFacade.delete(item)

    return item
  }
}
