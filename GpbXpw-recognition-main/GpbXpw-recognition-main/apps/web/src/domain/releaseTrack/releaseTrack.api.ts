import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { ReleaseTrack } from './releaseTrack.model'

export class ReleaseTrackApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<ReleaseTrack>,
  ): Promise<ReleaseTrack[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/releaseTracks${buildOptions}`)
  }

  static findOne(
    releaseTrackId: string,
    queryOptions?: ApiHelper.QueryOptions<ReleaseTrack>,
  ): Promise<ReleaseTrack> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/releaseTracks/${releaseTrackId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<ReleaseTrack>): Promise<ReleaseTrack> {
    return HttpService.api.post(`/v1/releaseTracks`, values)
  }

  static updateOne(
    releaseTrackId: string,
    values: Partial<ReleaseTrack>,
  ): Promise<ReleaseTrack> {
    return HttpService.api.patch(`/v1/releaseTracks/${releaseTrackId}`, values)
  }

  static deleteOne(releaseTrackId: string): Promise<void> {
    return HttpService.api.delete(`/v1/releaseTracks/${releaseTrackId}`)
  }

  static findManyByReleaseId(
    releaseId: string,
    queryOptions?: ApiHelper.QueryOptions<ReleaseTrack>,
  ): Promise<ReleaseTrack[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/releases/release/${releaseId}/releaseTracks${buildOptions}`,
    )
  }

  static createOneByReleaseId(
    releaseId: string,
    values: Partial<ReleaseTrack>,
  ): Promise<ReleaseTrack> {
    return HttpService.api.post(
      `/v1/releases/release/${releaseId}/releaseTracks`,
      values,
    )
  }

  static findManyByTrackId(
    trackId: string,
    queryOptions?: ApiHelper.QueryOptions<ReleaseTrack>,
  ): Promise<ReleaseTrack[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/tracks/track/${trackId}/releaseTracks${buildOptions}`,
    )
  }

  static createOneByTrackId(
    trackId: string,
    values: Partial<ReleaseTrack>,
  ): Promise<ReleaseTrack> {
    return HttpService.api.post(
      `/v1/tracks/track/${trackId}/releaseTracks`,
      values,
    )
  }
}
