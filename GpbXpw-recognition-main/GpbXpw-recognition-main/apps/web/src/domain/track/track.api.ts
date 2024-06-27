import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Track } from './track.model'

export class TrackApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Track>,
  ): Promise<Track[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/tracks${buildOptions}`)
  }

  static findOne(
    trackId: string,
    queryOptions?: ApiHelper.QueryOptions<Track>,
  ): Promise<Track> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/tracks/${trackId}${buildOptions}`)
  }

  static createOne(values: Partial<Track>): Promise<Track> {
    return HttpService.api.post(`/v1/tracks`, values)
  }

  static updateOne(trackId: string, values: Partial<Track>): Promise<Track> {
    return HttpService.api.patch(`/v1/tracks/${trackId}`, values)
  }

  static deleteOne(trackId: string): Promise<void> {
    return HttpService.api.delete(`/v1/tracks/${trackId}`)
  }

  static findManyByRightsHolderId(
    rightsHolderId: string,
    queryOptions?: ApiHelper.QueryOptions<Track>,
  ): Promise<Track[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/rightsHolders/rightsHolder/${rightsHolderId}/tracks${buildOptions}`,
    )
  }

  static createOneByRightsHolderId(
    rightsHolderId: string,
    values: Partial<Track>,
  ): Promise<Track> {
    return HttpService.api.post(
      `/v1/rightsHolders/rightsHolder/${rightsHolderId}/tracks`,
      values,
    )
  }
}
