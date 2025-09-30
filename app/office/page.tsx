'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    MagnifyingGlassIcon,
    PlusIcon,
    FunnelIcon,
    EyeIcon,
    CheckCircleIcon,
    XMarkIcon,
    ClockIcon,
    MapPinIcon,
    TagIcon,
    UserIcon,
    ArrowDownTrayIcon,
    SparklesIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function OfficeDashboard() {
    const [activeTab, setActiveTab] = useState('items')
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [foundItems, setFoundItems] = useState([])
    const [pendingClaims, setPendingClaims] = useState([])
    const [stats, setStats] = useState({
        totalItems: 0,
        availableItems: 0,
        onHoldItems: 0,
        claimedItems: 0,
        pendingClaims: 0
    })
    const [loading, setLoading] = useState(true)

    // Load data from API
    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const { apiClient } = await import('@/lib/api')

            // Load found items
            const itemsResponse = await apiClient.getFoundItems()
            setFoundItems(itemsResponse)

            // Load claims
            const claimsResponse = await apiClient.getClaims({ status: 'requested' })
            setPendingClaims(claimsResponse)

            // Load stats
            const statsResponse = await apiClient.getStats()
            setStats(statsResponse)

        } catch (error) {
            console.error('Error loading data:', error)
            // Fallback to mock data if API fails
            setFoundItems([
                {
                    id: "1",
                    title: "Blue Hydro Flask",
                    description: "21oz blue water bottle with UCLA sticker",
                    category: "bottles",
                    location: { name: "Kerckhoff Hall - Information Desk" },
                    found_at: "2024-09-28T14:22:00Z",
                    status: "available",
                    photos: [],
                    reporter: { name: "Sarah Johnson" }
                }
            ])
            setStats({
                totalItems: 1,
                availableItems: 1,
                onHoldItems: 0,
                claimedItems: 0,
                pendingClaims: 0
            })
        } finally {
            setLoading(false)
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'available':
                return <span className="status-available">Available</span>
            case 'on-hold':
                return <span className="status-on-hold">On Hold</span>
            case 'claimed':
                return <span className="status-claimed">Claimed</span>
            default:
                return <span className="status-badge bg-gray-100 text-gray-800">{status}</span>
        }
    }

    const filteredItems = foundItems.filter(item => {
        const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter
        return matchesSearch && matchesStatus
    })

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                                <SparklesIcon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold gradient-text">Office Dashboard</h1>
                                <p className="text-sm text-gray-600">Manage found items and claims</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href="/found" className="btn-primary flex items-center">
                                <PlusIcon className="w-5 h-5 mr-2" />
                                Add Found Item
                            </Link>
                            <Link href="/" className="text-gray-600 hover:text-primary-600 font-medium">
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card rounded-xl p-6 text-center"
                    >
                        <div className="text-2xl font-bold text-gray-800">{stats.totalItems}</div>
                        <div className="text-sm text-gray-600">Total Items</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card rounded-xl p-6 text-center"
                    >
                        <div className="text-2xl font-bold text-success-600">{stats.availableItems}</div>
                        <div className="text-sm text-gray-600">Available</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card rounded-xl p-6 text-center"
                    >
                        <div className="text-2xl font-bold text-warning-600">{stats.onHoldItems}</div>
                        <div className="text-sm text-gray-600">On Hold</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-card rounded-xl p-6 text-center"
                    >
                        <div className="text-2xl font-bold text-primary-600">{stats.claimedItems}</div>
                        <div className="text-sm text-gray-600">Claimed</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="glass-card rounded-xl p-6 text-center"
                    >
                        <div className="text-2xl font-bold text-secondary-600">{stats.pendingClaims}</div>
                        <div className="text-sm text-gray-600">Pending Claims</div>
                    </motion.div>
                </div>

                {/* Tabs */}
                <div className="mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab('items')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'items'
                                        ? 'border-primary-500 text-primary-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Found Items ({foundItems.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('claims')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'claims'
                                        ? 'border-primary-500 text-primary-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Pending Claims ({pendingClaims.length})
                            </button>
                        </nav>
                    </div>
                </div>

                {activeTab === 'items' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        {/* Search and Filters */}
                        <div className="glass-card rounded-xl p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search items..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="input-field pl-10"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="input-field"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="available">Available</option>
                                        <option value="on-hold">On Hold</option>
                                        <option value="claimed">Claimed</option>
                                    </select>
                                    <button className="btn-secondary flex items-center">
                                        <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                                        Export CSV
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Items List */}
                        <div className="space-y-4">
                            {filteredItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass-card rounded-xl p-6 hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                                                {getStatusBadge(item.status)}
                                                {item.photos?.length > 0 && (
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                                        📷 {item.photos.length} photo{item.photos.length > 1 ? 's' : ''}
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-gray-600 mb-3">{item.description}</p>

                                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                                <div className="flex items-center">
                                                    <MapPinIcon className="w-4 h-4 mr-1" />
                                                    {item.location?.name || 'Unknown Location'}
                                                </div>
                                                <div className="flex items-center">
                                                    <ClockIcon className="w-4 h-4 mr-1" />
                                                    Found {new Date(item.found_at || item.foundDate).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center">
                                                    <UserIcon className="w-4 h-4 mr-1" />
                                                    {item.reporter?.name || item.reporter}
                                                </div>
                                                {item.claimant && (
                                                    <div className="flex items-center">
                                                        <TagIcon className="w-4 h-4 mr-1" />
                                                        Claimed by {item.claimant}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 ml-4">
                                            <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                                                <EyeIcon className="w-5 h-5" />
                                            </button>
                                            {item.status === 'available' && (
                                                <button className="btn-primary text-sm px-4 py-2">
                                                    Mark as Donated
                                                </button>
                                            )}
                                            {item.status === 'on-hold' && (
                                                <div className="flex gap-2">
                                                    <button className="bg-success-500 hover:bg-success-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                                                        Confirm Pickup
                                                    </button>
                                                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                                                        Reject Claim
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'claims' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                    >
                        {pendingClaims.map((claim, index) => (
                            <motion.div
                                key={claim.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card rounded-xl p-6"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-800">{claim.itemTitle}</h3>
                                            <span className="status-badge bg-warning-100 text-warning-800">
                                                Pending Verification
                                            </span>
                                        </div>

                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <UserIcon className="w-4 h-4 mr-2" />
                                                <span className="font-medium">Claimant:</span> {claim.claimantName} ({claim.claimantEmail})
                                            </div>
                                            <div className="flex items-center">
                                                <ClockIcon className="w-4 h-4 mr-2" />
                                                <span className="font-medium">Requested:</span> {new Date(claim.requestedAt).toLocaleString()}
                                            </div>
                                            <div className="flex items-center">
                                                <TagIcon className="w-4 h-4 mr-2" />
                                                <span className="font-medium">Hold Code:</span>
                                                <code className="ml-2 px-2 py-1 bg-gray-100 rounded text-xs font-mono">{claim.holdCode}</code>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 ml-4">
                                        <button className="bg-success-500 hover:bg-success-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center">
                                            <CheckCircleIcon className="w-5 h-5 mr-2" />
                                            Verify & Hold
                                        </button>
                                        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center">
                                            <XMarkIcon className="w-5 h-5 mr-2" />
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {pendingClaims.length === 0 && (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircleIcon className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-800 mb-2">No Pending Claims</h3>
                                <p className="text-gray-600">All claims have been processed.</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    )
}