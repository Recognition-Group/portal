import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Admin } from './admin.model'

export class AdminApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Admin>,
  ): Promise<Admin[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/admins${buildOptions}`)
  }

  static findOne(
    adminId: string,
    queryOptions?: ApiHelper.QueryOptions<Admin>,
  ): Promise<Admin> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/admins/${adminId}${buildOptions}`)
  }

  static createOne(values: Partial<Admin>): Promise<Admin> {
    return HttpService.api.post(`/v1/admins`, values)
  }

  static updateOne(adminId: string, values: Partial<Admin>): Promise<Admin> {
    return HttpService.api.patch(`/v1/admins/${adminId}`, values)
  }

  static deleteOne(adminId: string): Promise<void> {
    return HttpService.api.delete(`/v1/admins/${adminId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Admin>,
  ): Promise<Admin[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/users/user/${userId}/admins${buildOptions}`)
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Admin>,
  ): Promise<Admin> {
    return HttpService.api.post(`/v1/users/user/${userId}/admins`, values)
  }
}
