'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MagnifyingGlassIcon, 
  PlusIcon, 
  SparklesIcon,
  HeartIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')

  const recentItems = [
    {
      id: 1,
      title: "Blue Hydro Flask",
      description: "21oz blue water bottle with UCLA sticker",
      location: "Kerckhoff Hall",
      timeAgo: "2 hours ago",
      image: "/api/placeholder/150/150",
      status: "available"
    },
    {
      id: 2,
      title: "iPhone 14 Pro",
      description: "Space Gray iPhone with clear case",
      location: "Powell Library",
      timeAgo: "4 hours ago", 
      image: "/api/placeholder/150/150",
      status: "on-hold"
    },
    {
      id: 3,
      title: "Black Backpack",
      description: "Jansport backpack with laptop inside",
      location: "Ackerman Union",
      timeAgo: "1 day ago",
      image: "/api/placeholder/150/150", 
      status: "available"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-card rounded-none border-0 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">BearTracks.Nice</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/lost" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                Report Lost
              </Link>
              <Link href="/found" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                Report Found
              </Link>
              <Link href="/office" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                Office Dashboard
              </Link>
              <button className="btn-primary text-sm">
                Sign In
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
              Lost Something?
              <br />
              <span className="text-gray-800">We'll Help You Find It</span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Campus lost & found made simple. Report, match, and reunite with your belongings using smart AI-powered matching.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for your lost item..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-12 pr-4 py-4 text-lg"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/lost" className="btn-primary text-lg px-8 py-4">
                <PlusIcon className="w-5 h-5 mr-2" />
                Report Lost Item
              </Link>
              <Link href="/found" className="btn-secondary text-lg px-8 py-4">
                <HeartIcon className="w-5 h-5 mr-2" />
                Report Found Item
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-bounce-gentle"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-secondary-200 rounded-full opacity-20 animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-success-200 rounded-full opacity-20 animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Recent Items */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-center mb-12 gradient-text">
              Recently Found Items
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="glass-card rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
                      <SparklesIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-lg text-gray-800">{item.title}</h4>
                    <span className={`status-${item.status}`}>
                      {item.status === 'available' ? 'Available' : 'On Hold'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      {item.location}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {item.timeAgo}
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2 rounded-lg hover:shadow-lg transition-all duration-200">
                    View Details
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center glass-card rounded-2xl p-8"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-success-500 to-success-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-3xl font-bold text-gray-800 mb-2">247</h4>
              <p className="text-gray-600">Items Reunited</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center glass-card rounded-2xl p-8"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MagnifyingGlassIcon className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-3xl font-bold text-gray-800 mb-2">89%</h4>
              <p className="text-gray-600">Match Accuracy</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center glass-card rounded-2xl p-8"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-3xl font-bold text-gray-800 mb-2">2.3</h4>
              <p className="text-gray-600">Avg Days to Match</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">BearTracks.Nice</h3>
            </div>
            <p className="text-gray-400 mb-6">Making campus lost & found simple and beautiful</p>
            <div className="flex justify-center space-x-6">
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}