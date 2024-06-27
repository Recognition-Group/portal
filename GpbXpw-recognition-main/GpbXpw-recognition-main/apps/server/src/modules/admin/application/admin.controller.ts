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
import { Admin, AdminDomainFacade } from '@server/modules/admin/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { AdminApplicationEvent } from './admin.application.event'
import { AdminCreateDto, AdminUpdateDto } from './admin.dto'

@Controller('/v1/admins')
export class AdminController {
  constructor(
    private eventService: EventService,
    private adminDomainFacade: AdminDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.adminDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: AdminCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.adminDomainFacade.create(body)

    await this.eventService.emit<AdminApplicationEvent.AdminCreated.Payload>(
      AdminApplicationEvent.AdminCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:adminId')
  async findOne(@Param('adminId') adminId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.adminDomainFacade.findOneByIdOrFail(
      adminId,
      queryOptions,
    )

    return item
  }

  @Patch('/:adminId')
  async update(
    @Param('adminId') adminId: string,
    @Body() body: AdminUpdateDto,
  ) {
    const item = await this.adminDomainFacade.findOneByIdOrFail(adminId)

    const itemUpdated = await this.adminDomainFacade.update(
      item,
      body as Partial<Admin>,
    )
    return itemUpdated
  }

  @Delete('/:adminId')
  async delete(@Param('adminId') adminId: string) {
    const item = await this.adminDomainFacade.findOneByIdOrFail(adminId)

    await this.adminDomainFacade.delete(item)

    return item
  }
}
