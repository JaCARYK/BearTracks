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
  CheckCircleIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function ReportFoundPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    foundLocation: '',
    foundDate: '',
    foundTime: '',
    reporterName: '',
    reporterEmail: '',
    photos: [] as File[]
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
    { id: 'jewelry', name: 'Jewelry', icon: '💍' },
    { id: 'other', name: 'Other', icon: '📦' }
  ]

  const locations = [
    'Powell Library - Front Desk',
    'Kerckhoff Hall - Information Desk', 
    'Ackerman Union - Lost & Found',
    'Royce Hall - Security Office',
    'Hedrick Hall - Residential Desk',
    'De Neve Plaza - Front Desk',
    'Wooden Center - Reception',
    'Engineering Building - Office',
    'Life Sciences Building - Office',
    'Campus Security Office',
    'Other Office Location'
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
    
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFormData({ ...formData, photos: [...formData.photos, ...newFiles] })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFormData({ ...formData, photos: [...formData.photos, ...newFiles] })
    }
  }

  const removePhoto = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index)
    setFormData({ ...formData, photos: newPhotos })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Create FormData for file upload
      const submitData = new FormData()
      submitData.append('title', formData.title)
      submitData.append('description', formData.description)
      submitData.append('category', formData.category)
      submitData.append('location_id', formData.foundLocation)
      submitData.append('reporter_name', formData.reporterName)
      submitData.append('reporter_email', formData.reporterEmail)
      submitData.append('found_date', formData.foundDate)
      if (formData.foundTime) {
        submitData.append('found_time', formData.foundTime)
      }
      
      // Add photos
      formData.photos.forEach((photo, index) => {
        submitData.append('photos', photo)
      })
      
      // Submit to API
      const { apiClient } = await import('@/lib/api')
      await apiClient.createFoundItem(submitData)
      
      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting found item:', error)
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
          <h2 className="text-2xl font-bold gradient-text mb-4">Item Added Successfully!</h2>
          <p className="text-gray-600 mb-8">
            The found item has been added to the system. We'll automatically notify potential owners if we find matches.
          </p>
          <div className="space-y-3">
            <Link href="/office" className="btn-primary block">
              Go to Office Dashboard
            </Link>
            <Link href="/found" className="btn-secondary block">
              Add Another Item
            </Link>
          </div>
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
            <h1 className="text-3xl font-bold gradient-text">Report Found Item</h1>
            <p className="text-gray-600 mt-1">Add a found item to help reunite it with its owner</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Reporter Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-8"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <TagIcon className="w-6 h-6 mr-2 text-primary-500" />
              Reporter Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Staff member name"
                  value={formData.reporterName}
                  onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Office Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="office@university.edu"
                  value={formData.reporterEmail}
                  onChange={(e) => setFormData({ ...formData, reporterEmail: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>
          </motion.div>

          {/* Item Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-8"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <SparklesIcon className="w-6 h-6 mr-2 text-primary-500" />
              Item Information
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
                placeholder="Describe the item in detail: color, brand, size, condition, distinctive features, etc."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field resize-none"
              />
            </div>
          </motion.div>

          {/* Location & Time Found */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-8"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <MapPinIcon className="w-6 h-6 mr-2 text-primary-500" />
              Found Location & Time
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Office Location *
                </label>
                <select
                  required
                  value={formData.foundLocation}
                  onChange={(e) => setFormData({ ...formData, foundLocation: e.target.value })}
                  className="input-field"
                >
                  <option value="">Select office location</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Found *
                </label>
                <input
                  type="date"
                  required
                  value={formData.foundDate}
                  onChange={(e) => setFormData({ ...formData, foundDate: e.target.value })}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Found
                </label>
                <input
                  type="time"
                  value={formData.foundTime}
                  onChange={(e) => setFormData({ ...formData, foundTime: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>
          </motion.div>

          {/* Photo Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-8"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <PhotoIcon className="w-6 h-6 mr-2 text-primary-500" />
              Photos (Highly Recommended)
            </h2>
            
            {/* Existing Photos */}
            {formData.photos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center">
                      <PhotoIcon className="w-8 h-8 text-primary-500" />
                    </div>
                    <p className="text-xs text-gray-600 mt-1 truncate">{photo.name}</p>
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Upload Area */}
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
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center">
                  <PlusIcon className="w-8 h-8 text-primary-500" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    Add more photos
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Multiple angles help with matching
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="inline-block btn-primary cursor-pointer"
                >
                  Choose Photos
                </label>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              Clear photos from multiple angles improve matching accuracy. Max 5 photos, 10MB each.
            </p>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <button
              type="submit"
              className="btn-primary text-lg px-12 py-4 flex items-center"
            >
              <SparklesIcon className="w-5 h-5 mr-2" />
              Add Found Item
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  )
}