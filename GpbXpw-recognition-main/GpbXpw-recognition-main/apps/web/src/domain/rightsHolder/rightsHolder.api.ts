import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { RightsHolder } from './rightsHolder.model'

export class RightsHolderApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<RightsHolder>,
  ): Promise<RightsHolder[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/rightsHolders${buildOptions}`)
  }

  static findOne(
    rightsHolderId: string,
    queryOptions?: ApiHelper.QueryOptions<RightsHolder>,
  ): Promise<RightsHolder> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/rightsHolders/${rightsHolderId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<RightsHolder>): Promise<RightsHolder> {
    return HttpService.api.post(`/v1/rightsHolders`, values)
  }

  static updateOne(
    rightsHolderId: string,
    values: Partial<RightsHolder>,
  ): Promise<RightsHolder> {
    return HttpService.api.patch(`/v1/rightsHolders/${rightsHolderId}`, values)
  }

  static deleteOne(rightsHolderId: string): Promise<void> {
    return HttpService.api.delete(`/v1/rightsHolders/${rightsHolderId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<RightsHolder>,
  ): Promise<RightsHolder[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/rightsHolders${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<RightsHolder>,
  ): Promise<RightsHolder> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/rightsHolders`,
      values,
    )
  }
}
