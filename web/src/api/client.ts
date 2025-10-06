const DEFAULT_TIMEOUT_MS = 5000

const normalizeBaseUrl = (value: unknown): string => {
  if (typeof value !== 'string') {
    return ''
  }

  const trimmed = value.trim()
  if (trimmed.length === 0) {
    return ''
  }

  return trimmed.endsWith('/') ? trimmed.slice(0, -1) : trimmed
}

const appendPath = (path: string): string => {
  const base = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL)
  return base.length > 0 ? `${base}${path}` : path
}

export interface HealthResponse {
  status: string
}

const isHealthResponse = (value: unknown): value is HealthResponse => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'status' in value &&
    typeof (value as { status?: unknown }).status === 'string'
  )
}

export async function fetchGatewayHealth(signal?: AbortSignal): Promise<HealthResponse> {
  const controller = signal ? undefined : new AbortController()
  const timeoutId: ReturnType<typeof setTimeout> | undefined = controller
    ? setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS)
    : undefined
  const activeSignal = signal ?? controller?.signal

  try {
    const requestInit: RequestInit = {
      headers: { Accept: 'application/json' },
      ...(activeSignal ? { signal: activeSignal } : {}),
    }

    const response = await fetch(appendPath('/healthz'), requestInit)

    if (!response.ok) {
      throw new Error(`Gateway responded with status ${response.status}`)
    }

    const payload: unknown = await response.json()
    if (!isHealthResponse(payload)) {
      throw new Error('Gateway responded with unexpected payload')
    }

    return payload
  } finally {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
    }
  }
}
