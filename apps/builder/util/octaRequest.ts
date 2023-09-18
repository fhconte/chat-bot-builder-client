import { headers, services } from '@octadesk-tech/services'

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

interface OctaRequest {
  url: string
  method: HttpMethod
  body?: unknown
  timeout?: number
}

type OctaResponse = unknown

const TIMEOUT_DURATION = 30000

const sendOctaRequest = async (request: OctaRequest): Promise<OctaResponse> => {
  const client = await services.chatBots.getClient()
  const authorationHeaders = headers.getAuthorizedHeaders()

  const timeout = new Promise<never>((_, reject) =>
    setTimeout(
      () => reject({ timeout: true }),
      request.timeout ?? TIMEOUT_DURATION
    )
  )

  let requestPromise: Promise<OctaResponse>

  switch (request.method) {
    case HttpMethod.GET:
      requestPromise = client.get(request.url, authorationHeaders)
      break
    case HttpMethod.POST:
      requestPromise = client.post(
        request.url,
        request.body,
        authorationHeaders
      )
      break
    case HttpMethod.PUT:
      requestPromise = client.put(request.url, request.body, authorationHeaders)
      break
    case HttpMethod.PATCH:
      requestPromise = client.patch(
        request.url,
        request.body,
        authorationHeaders
      )
      break
    case HttpMethod.DELETE:
      requestPromise = client.delete(request.url, authorationHeaders)
      break
    default:
      throw new Error(`Unsupported HTTP method: ${request.method}`)
  }

  return Promise.race([requestPromise, timeout])
}

export { sendOctaRequest, HttpMethod }
