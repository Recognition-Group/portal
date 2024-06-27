import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ReleaseDomainFacade } from '@server/modules/release/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ReleaseApplicationEvent } from './release.application.event'
import { ReleaseCreateDto } from './release.dto'

import { RightsHolderDomainFacade } from '../../rightsHolder/domain'

@Controller('/v1/rightsHolders')
export class ReleaseByRightsHolderController {
  constructor(
    private rightsHolderDomainFacade: RightsHolderDomainFacade,

    private releaseDomainFacade: ReleaseDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/rightsHolder/:rightsHolderId/releases')
  async findManyRightsHolderId(
    @Param('rightsHolderId') rightsHolderId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.rightsHolderDomainFacade.findOneByIdOrFail(rightsHolderId)

    const items = await this.releaseDomainFacade.findManyByRightsHolder(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/rightsHolder/:rightsHolderId/releases')
  async createByRightsHolderId(
    @Param('rightsHolderId') rightsHolderId: string,
    @Body() body: ReleaseCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, rightsHolderId }

    const item = await this.releaseDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ReleaseApplicationEvent.ReleaseCreated.Payload>(
      ReleaseApplicationEvent.ReleaseCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
