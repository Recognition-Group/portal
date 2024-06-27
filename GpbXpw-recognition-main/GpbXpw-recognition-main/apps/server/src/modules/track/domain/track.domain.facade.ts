import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Track } from './track.model'

import { RightsHolder } from '../../rightsHolder/domain'

@Injectable()
export class TrackDomainFacade {
  constructor(
    @InjectRepository(Track)
    private repository: Repository<Track>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Track>): Promise<Track> {
    return this.repository.save(values)
  }

  async update(item: Track, values: Partial<Track>): Promise<Track> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Track): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Track> = {},
  ): Promise<Track[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Track> = {},
  ): Promise<Track> {
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
    queryOptions: RequestHelper.QueryOptions<Track> = {},
  ): Promise<Track[]> {
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
