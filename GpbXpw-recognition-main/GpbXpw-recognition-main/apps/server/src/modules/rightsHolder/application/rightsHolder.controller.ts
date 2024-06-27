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
  RightsHolder,
  RightsHolderDomainFacade,
} from '@server/modules/rightsHolder/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { RightsHolderApplicationEvent } from './rightsHolder.application.event'
import {
  RightsHolderCreateDto,
  RightsHolderUpdateDto,
} from './rightsHolder.dto'

@Controller('/v1/rightsHolders')
export class RightsHolderController {
  constructor(
    private eventService: EventService,
    private rightsHolderDomainFacade: RightsHolderDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.rightsHolderDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: RightsHolderCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.rightsHolderDomainFacade.create(body)

    await this.eventService.emit<RightsHolderApplicationEvent.RightsHolderCreated.Payload>(
      RightsHolderApplicationEvent.RightsHolderCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:rightsHolderId')
  async findOne(
    @Param('rightsHolderId') rightsHolderId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.rightsHolderDomainFacade.findOneByIdOrFail(
      rightsHolderId,
      queryOptions,
    )

    return item
  }

  @Patch('/:rightsHolderId')
  async update(
    @Param('rightsHolderId') rightsHolderId: string,
    @Body() body: RightsHolderUpdateDto,
  ) {
    const item =
      await this.rightsHolderDomainFacade.findOneByIdOrFail(rightsHolderId)

    const itemUpdated = await this.rightsHolderDomainFacade.update(
      item,
      body as Partial<RightsHolder>,
    )
    return itemUpdated
  }

  @Delete('/:rightsHolderId')
  async delete(@Param('rightsHolderId') rightsHolderId: string) {
    const item =
      await this.rightsHolderDomainFacade.findOneByIdOrFail(rightsHolderId)

    await this.rightsHolderDomainFacade.delete(item)

    return item
  }
}
