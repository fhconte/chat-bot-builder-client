import { subDomain, environment, url } from '@octadesk-tech/services'
import Storage from '@octadesk-tech/storage'

export const setupEnvironment = () =>
{
  const env = process.env.NODE_ENV_OCTADESK || 'qa'
  if (env === 'production') {
    environment.resolveEnvironment()
  } else {
    const { apis } = require(`./environments/${env}`)
  
    environment.setEnvironment(env)
    url.setAPIURLs(apis)
  }
}

export const setupMockUser = async () =>
{
  const env = process.env.NODE_ENV_OCTADESK || 'qa'
  if (env !== 'production') {
    const { mock } = require(`./environments/mocks/${env}`)
    
    Storage.setItem('userLogged', mock.user)

    Storage.setItem('company', mock.user.subDomain)
  
    subDomain.setSubDomain(mock.user.subDomain)
  
    Storage.setItem('status', mock.status)

    Storage.setItem('userToken', mock.userToken)
  }
}