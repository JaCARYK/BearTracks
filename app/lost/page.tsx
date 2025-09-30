'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  PhotoIcon,
  MapPinIcon,
  CalendarIcon,
  TagIcon,
  ArrowLeftIcon,
  SparklesIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function ReportLostPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    lastSeenLocation: '',
    lastSeenDate: '',
    lastSeenTime: '',
    photo: null as File | null
  })
  
  const [dragActive, setDragActive] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const categories = [
    { id: 'electronics', name: 'Electronics', icon: '📱' },
    { id: 'clothing', name: 'Clothing', icon: '👕' },
    { id: 'accessories', name: 'Accessories', icon: '👜' },
    { id: 'books', name: 'Books & Supplies', icon: '📚' },
    { id: 'keys', name: 'Keys & Cards', icon: '🔑' },
    { id: 'bottles', name: 'Water Bottles', icon: '🍶' },
    { id: 'other', name: 'Other', icon: '📦' }
  ]

  const locations = [
    'Powell Library',
    'Kerckhoff Hall', 
    'Ackerman Union',
    'Royce Hall',
    'Hedrick Hall',
    'De Neve Plaza',
    'Wooden Center',
    'Engineering Building',
    'Life Sciences Building',
    'Other'
  ]

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData({ ...formData, photo: e.dataTransfer.files[0] })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, photo: e.target.files[0] })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const submitData = {
        title: formData.title,
        description: formData.description,
        last_seen_location_id: parseInt(formData.lastSeenLocation),
        last_seen_at: `${formData.lastSeenDate}T${formData.lastSeenTime || '12:00'}:00`,
        reporter_name: 'Student User', // TODO: Get from auth
        reporter_email: 'student@ucla.edu', // TODO: Get from auth
        photo_url: formData.photo ? URL.createObjectURL(formData.photo) : null
      }
      
      const { apiClient } = await import('@/lib/api')
      await apiClient.createLostItem(submitData)
      
      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting lost item:', error)
      // TODO: Show error message to user
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-3xl p-12 text-center max-w-md mx-4"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-success-500 to-success-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold gradient-text mb-4">Report Submitted!</h2>
          <p className="text-gray-600 mb-8">
            We're searching for matches using AI. You'll get notified when we find potential matches.
          </p>
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/" className="mr-4 p-2 rounded-lg hover:bg-white/50 transition-colors">
            <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Report Lost Item</h1>
            <p className="text-gray-600 mt-1">Help us find your missing item with detailed information</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-8"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <SparklesIcon className="w-6 h-6 mr-2 text-primary-500" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Blue Hydro Flask"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-field"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe your item in detail: color, brand, size, distinctive features, etc."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field resize-none"
              />
            </div>
          </motion.div>

          {/* Location & Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-8"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <MapPinIcon className="w-6 h-6 mr-2 text-primary-500" />
              Last Seen Location & Time
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <select
                  required
                  value={formData.lastSeenLocation}
                  onChange={(e) => setFormData({ ...formData, lastSeenLocation: e.target.value })}
                  className="input-field"
                >
                  <option value="">Select location</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.lastSeenDate}
                  onChange={(e) => setFormData({ ...formData, lastSeenDate: e.target.value })}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approximate Time
                </label>
                <input
                  type="time"
                  value={formData.lastSeenTime}
                  onChange={(e) => setFormData({ ...formData, lastSeenTime: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>
          </motion.div>

          {/* Photo Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-8"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <PhotoIcon className="w-6 h-6 mr-2 text-primary-500" />
              Photo (Optional but Recommended)
            </h2>
            
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                dragActive 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-300 hover:border-primary-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {formData.photo ? (
                <div className="space-y-4">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center">
                    <PhotoIcon className="w-16 h-16 text-primary-500" />
                  </div>
                  <p className="text-sm text-gray-600">{formData.photo.name}</p>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, photo: null })}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove photo
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center">
                    <PhotoIcon className="w-8 h-8 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-700">
                      Drag & drop a photo here
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      or click to browse files
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="inline-block btn-primary cursor-pointer"
                  >
                    Choose Photo
                  </label>
                </div>
              )}
            </div>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              Photos help our AI match your item more accurately. Max file size: 10MB
            </p>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <button
              type="submit"
              className="btn-primary text-lg px-12 py-4 flex items-center"
            >
              <SparklesIcon className="w-5 h-5 mr-2" />
              Submit Lost Report
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  )
}