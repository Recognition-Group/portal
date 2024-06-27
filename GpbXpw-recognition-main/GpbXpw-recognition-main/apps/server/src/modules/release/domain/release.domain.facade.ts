import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Release } from './release.model'

import { RightsHolder } from '../../rightsHolder/domain'

@Injectable()
export class ReleaseDomainFacade {
  constructor(
    @InjectRepository(Release)
    private repository: Repository<Release>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Release>): Promise<Release> {
    return this.repository.save(values)
  }

  async update(item: Release, values: Partial<Release>): Promise<Release> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Release): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Release> = {},
  ): Promise<Release[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Release> = {},
  ): Promise<Release> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByRightsHolder(
    item: RightsHolder,
    queryOptions: RequestHelper.QueryOptions<Release> = {},
  ): Promise<Release[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('rightsHolder')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        rightsHolderId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
