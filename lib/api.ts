const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export class ApiClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = API_BASE_URL
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Found Items
  async createFoundItem(formData: FormData) {
    const response = await fetch(`${this.baseUrl}/api/found`, {
      method: 'POST',
      body: formData, // Don't set Content-Type for FormData
    })
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }
    
    return response.json()
  }

  async getFoundItems(params?: {
    status?: string
    category?: string
    location_id?: number
    skip?: number
    limit?: number
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }
    
    return this.request(`/api/found?${searchParams}`)
  }

  async getFoundItem(itemId: string) {
    return this.request(`/api/found/${itemId}`)
  }

  async updateItemStatus(itemId: string, status: string) {
    return this.request(`/api/found/${itemId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    })
  }

  // Lost Items
  async createLostItem(data: any) {
    return this.request('/api/lost', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getMatches(lostItemId: string) {
    return this.request(`/api/lost/${lostItemId}/matches`)
  }

  // Claims
  async createClaim(data: any) {
    return this.request('/api/claims', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getClaims(params?: { status?: string; skip?: number; limit?: number }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }
    
    return this.request(`/api/claims?${searchParams}`)
  }

  async verifyClaim(claimId: string, data: any) {
    return this.request(`/api/claims/${claimId}/verify`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // Locations
  async getLocations() {
    return this.request('/api/locations')
  }

  // Stats
  async getStats() {
    return this.request('/api/stats')
  }

  // Auth (simplified for MVP)
  async login(email: string, password: string = 'temp') {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async register(data: any) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

export const apiClient = new ApiClient()