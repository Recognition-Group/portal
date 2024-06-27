import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { AdminDomainFacade } from '@server/modules/admin/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { AdminApplicationEvent } from './admin.application.event'
import { AdminCreateDto } from './admin.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class AdminByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private adminDomainFacade: AdminDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/admins')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.adminDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/admins')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: AdminCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.adminDomainFacade.create(valuesUpdated)

    await this.eventService.emit<AdminApplicationEvent.AdminCreated.Payload>(
      AdminApplicationEvent.AdminCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
