import { environment, subDomain, services } from '@octadesk-tech/services'
import Storage from '@octadesk-tech/storage'
import { loadParameterHeader } from '../helpers/headers'
import { getBaseClient } from '../http'

export const getCompanyFeatures = async () => {
  const client = await services.createClient('tenant')

  const headers = {
    'Content-Type': 'application/json',
    environment: environment.getEnvironment(),
    subdomain: subDomain.getSubDomain(),
  }

  const response = await client.get(
    '/api/tenant/get-feature-toggle?source=chat-settings',
    { headers }
  )

  return response.data
}

const getClient = () => getBaseClient('company')

export const getCompany = () =>
  getClient()
    .then((client) => client.get('/model', loadParameterHeader()))
    .then((r) => r.data)

export const getStatus = async () => {
  const authStorage = Storage.getItem('auth') as any
  const tenantId = authStorage?.octaAuthenticated?.tenantId

  if (tenantId) {
    try {
      const accessToken = authStorage.access_token

      const { data } = await services.nucleus
        .getClient()
        .get(`Tenants/${tenantId}/status`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

      return data
    } catch (ex) {
      throw new Error('Error in get status: ' + ex)
    }
  }
}