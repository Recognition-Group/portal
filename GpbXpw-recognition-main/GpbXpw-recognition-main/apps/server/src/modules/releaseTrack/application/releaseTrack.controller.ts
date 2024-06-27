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
import {
  ReleaseTrack,
  ReleaseTrackDomainFacade,
} from '@server/modules/releaseTrack/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ReleaseTrackApplicationEvent } from './releaseTrack.application.event'
import {
  ReleaseTrackCreateDto,
  ReleaseTrackUpdateDto,
} from './releaseTrack.dto'

@Controller('/v1/releaseTracks')
export class ReleaseTrackController {
  constructor(
    private eventService: EventService,
    private releaseTrackDomainFacade: ReleaseTrackDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.releaseTrackDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ReleaseTrackCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.releaseTrackDomainFacade.create(body)

    await this.eventService.emit<ReleaseTrackApplicationEvent.ReleaseTrackCreated.Payload>(
      ReleaseTrackApplicationEvent.ReleaseTrackCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:releaseTrackId')
  async findOne(
    @Param('releaseTrackId') releaseTrackId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.releaseTrackDomainFacade.findOneByIdOrFail(
      releaseTrackId,
      queryOptions,
    )

    return item
  }

  @Patch('/:releaseTrackId')
  async update(
    @Param('releaseTrackId') releaseTrackId: string,
    @Body() body: ReleaseTrackUpdateDto,
  ) {
    const item =
      await this.releaseTrackDomainFacade.findOneByIdOrFail(releaseTrackId)

    const itemUpdated = await this.releaseTrackDomainFacade.update(
      item,
      body as Partial<ReleaseTrack>,
    )
    return itemUpdated
  }

  @Delete('/:releaseTrackId')
  async delete(@Param('releaseTrackId') releaseTrackId: string) {
    const item =
      await this.releaseTrackDomainFacade.findOneByIdOrFail(releaseTrackId)

    await this.releaseTrackDomainFacade.delete(item)

    return item
  }
}
