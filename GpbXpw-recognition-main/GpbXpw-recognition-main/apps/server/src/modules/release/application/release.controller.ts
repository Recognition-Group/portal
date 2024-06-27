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
import { Release, ReleaseDomainFacade } from '@server/modules/release/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ReleaseApplicationEvent } from './release.application.event'
import { ReleaseCreateDto, ReleaseUpdateDto } from './release.dto'

@Controller('/v1/releases')
export class ReleaseController {
  constructor(
    private eventService: EventService,
    private releaseDomainFacade: ReleaseDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.releaseDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ReleaseCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.releaseDomainFacade.create(body)

    await this.eventService.emit<ReleaseApplicationEvent.ReleaseCreated.Payload>(
      ReleaseApplicationEvent.ReleaseCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:releaseId')
  async findOne(
    @Param('releaseId') releaseId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.releaseDomainFacade.findOneByIdOrFail(
      releaseId,
      queryOptions,
    )

    return item
  }

  @Patch('/:releaseId')
  async update(
    @Param('releaseId') releaseId: string,
    @Body() body: ReleaseUpdateDto,
  ) {
    const item = await this.releaseDomainFacade.findOneByIdOrFail(releaseId)

    const itemUpdated = await this.releaseDomainFacade.update(
      item,
      body as Partial<Release>,
    )
    return itemUpdated
  }

  @Delete('/:releaseId')
  async delete(@Param('releaseId') releaseId: string) {
    const item = await this.releaseDomainFacade.findOneByIdOrFail(releaseId)

    await this.releaseDomainFacade.delete(item)

    return item
  }
}
