import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Release } from './release.model'

export class ReleaseApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Release>,
  ): Promise<Release[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/releases${buildOptions}`)
  }

  static findOne(
    releaseId: string,
    queryOptions?: ApiHelper.QueryOptions<Release>,
  ): Promise<Release> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/releases/${releaseId}${buildOptions}`)
  }

  static createOne(values: Partial<Release>): Promise<Release> {
    return HttpService.api.post(`/v1/releases`, values)
  }

  static updateOne(
    releaseId: string,
    values: Partial<Release>,
  ): Promise<Release> {
    return HttpService.api.patch(`/v1/releases/${releaseId}`, values)
  }

  static deleteOne(releaseId: string): Promise<void> {
    return HttpService.api.delete(`/v1/releases/${releaseId}`)
  }

  static findManyByRightsHolderId(
    rightsHolderId: string,
    queryOptions?: ApiHelper.QueryOptions<Release>,
  ): Promise<Release[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/rightsHolders/rightsHolder/${rightsHolderId}/releases${buildOptions}`,
    )
  }

  static createOneByRightsHolderId(
    rightsHolderId: string,
    values: Partial<Release>,
  ): Promise<Release> {
    return HttpService.api.post(
      `/v1/rightsHolders/rightsHolder/${rightsHolderId}/releases`,
      values,
    )
  }
}
