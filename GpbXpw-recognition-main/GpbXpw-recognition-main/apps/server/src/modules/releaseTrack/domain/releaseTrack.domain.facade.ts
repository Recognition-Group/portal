import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { ReleaseTrack } from './releaseTrack.model'

import { Release } from '../../release/domain'

import { Track } from '../../track/domain'

@Injectable()
export class ReleaseTrackDomainFacade {
  constructor(
    @InjectRepository(ReleaseTrack)
    private repository: Repository<ReleaseTrack>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<ReleaseTrack>): Promise<ReleaseTrack> {
    return this.repository.save(values)
  }

  async update(
    item: ReleaseTrack,
    values: Partial<ReleaseTrack>,
  ): Promise<ReleaseTrack> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: ReleaseTrack): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<ReleaseTrack> = {},
  ): Promise<ReleaseTrack[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<ReleaseTrack> = {},
  ): Promise<ReleaseTrack> {
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

  async findManyByRelease(
    item: Release,
    queryOptions: RequestHelper.QueryOptions<ReleaseTrack> = {},
  ): Promise<ReleaseTrack[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('release')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        releaseId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByTrack(
    item: Track,
    queryOptions: RequestHelper.QueryOptions<ReleaseTrack> = {},
  ): Promise<ReleaseTrack[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('track')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        trackId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
