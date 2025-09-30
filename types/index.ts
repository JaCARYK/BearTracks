export interface User {
  id: string
  campusId?: string
  email: string
  name: string
  role: 'student' | 'office' | 'admin'
  createdAt: string
}

export interface Location {
  id: number
  name: string
  building: string
  floor?: string
}

export interface ItemFound {
  id: string
  title: string
  description: string
  category: string
  locationId: number
  location?: Location
  reporterId: string
  reporter?: User
  foundAt: string
  status: 'available' | 'on_hold' | 'claimed' | 'donated' | 'disposed'
  createdAt: string
  photos?: ItemPhoto[]
  claims?: Claim[]
}

export interface ItemPhoto {
  id: string
  itemId: string
  url: string
  phash?: number
  imgEmbedding?: number[]
  createdAt: string
}

export interface ItemLost {
  id: string
  reporterId: string
  reporter?: User
  title: string
  description: string
  lastSeenLocationId: number
  lastSeenLocation?: Location
  lastSeenAt: string
  photoUrl?: string
  textEmbedding?: number[]
  createdAt: string
  matches?: Match[]
}

export interface Match {
  id: string
  lostId: string
  foundId: string
  lostItem?: ItemLost
  foundItem?: ItemFound
  score: number
  autoSuggested: boolean
  createdAt: string
}

export interface Claim {
  id: string
  foundId: string
  foundItem?: ItemFound
  claimantId: string
  claimant?: User
  status: 'requested' | 'verified' | 'rejected' | 'picked_up'
  holdCode?: string
  requestedAt: string
  verifiedAt?: string
  verifierId?: string
  verifier?: User
}

export interface ApiResponse<T> {
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export type ItemCategory = 
  | 'electronics'
  | 'clothing' 
  | 'accessories'
  | 'books'
  | 'keys'
  | 'bottles'
  | 'jewelry'
  | 'other'

export type ItemStatus = 
  | 'available'
  | 'on_hold'
  | 'claimed'
  | 'donated'
  | 'disposed'

export type ClaimStatus = 
  | 'requested'
  | 'verified'
  | 'rejected'
  | 'picked_up'