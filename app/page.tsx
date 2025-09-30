'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  MagnifyingGlassIcon, 
  PlusIcon, 
  SparklesIcon,
  HeartIcon,
  MapPinIcon,
  ClockIcon,
  StarIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { UCLALogo } from '@/components/UCLALogo'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating UCLA Colors */}
        <motion.div 
          className="floating-element w-32 h-32 bg-gradient-to-r from-primary-400 to-primary-600 top-20 left-10"
          style={{ x: mousePosition.x * 0.02, y: mousePosition.y * 0.02 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="floating-element w-24 h-24 bg-gradient-to-r from-secondary-400 to-secondary-600 top-40 right-20"
          style={{ x: mousePosition.x * -0.03, y: mousePosition.y * 0.03 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="floating-element w-20 h-20 bg-gradient-to-r from-accent-400 to-accent-600 bottom-20 left-1/4"
          style={{ x: mousePosition.x * 0.025, y: mousePosition.y * -0.02 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Sparkle Effects */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-secondary-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header 
        className="glass-card rounded-none border-0 border-b relative z-10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <UCLALogo size="lg" />
              <div>
                <h1 className="text-3xl font-bold shimmer-text">BearTracks.Nice</h1>
                <p className="text-sm text-primary-600 font-medium">UCLA Lost & Found</p>
              </div>
            </motion.div>
            <nav className="hidden md:flex items-center space-x-8">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link href="/lost" className="text-gray-700 hover:text-primary-600 font-semibold transition-all duration-300 hover:drop-shadow-lg">
                  Report Lost
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link href="/found" className="text-gray-700 hover:text-primary-600 font-semibold transition-all duration-300 hover:drop-shadow-lg">
                  Report Found
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link href="/office" className="text-gray-700 hover:text-primary-600 font-semibold transition-all duration-300 hover:drop-shadow-lg">
                  Office Dashboard
                </Link>
              </motion.div>
              <motion.button 
                className="btn-primary text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AcademicCapIcon className="w-4 h-4 mr-2" />
                UCLA Sign In
              </motion.button>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 hero-section">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ y: y1 }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-8"
            >
              <UCLALogo size="xl" className="mx-auto mb-4" />
            </motion.div>
            
            <motion.h2 
              className="text-6xl md:text-8xl font-black mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="shimmer-text block">Lost Something?</span>
              <motion.span 
                className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-primary-600"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                We'll Find It! 🐻
              </motion.span>
            </motion.h2>
            
            <motion.p 
              className="text-2xl text-gray-700 mb-16 max-w-3xl mx-auto font-medium leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              UCLA's most advanced lost & found system. Beautiful design meets smart AI to reunite Bruins with their belongings.
            </motion.p>

            {/* Enhanced Search Bar */}
            <motion.div 
              className="max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 w-7 h-7 text-primary-500" />
                  <input
                    type="text"
                    placeholder="Search for your lost Bruin gear..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-16 pr-6 py-6 text-xl rounded-3xl border-3 border-primary-300 focus:border-primary-500 shadow-2xl"
                  />
                  <motion.button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Search
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-8 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <Link href="/lost" className="btn-primary text-xl px-12 py-6 rounded-3xl relative z-10 flex items-center">
                  <PlusIcon className="w-6 h-6 mr-3" />
                  Report Lost Item
                  <StarIcon className="w-5 h-5 ml-3 animate-pulse" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <Link href="/found" className="btn-secondary text-xl px-12 py-6 rounded-3xl relative z-10 flex items-center">
                  <HeartIcon className="w-6 h-6 mr-3" />
                  Report Found Item
                  <SparklesIcon className="w-5 h-5 ml-3 animate-pulse" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Floating Elements */}
        <motion.div 
          className="absolute top-32 left-20 w-32 h-32 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full opacity-20"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute top-48 right-32 w-24 h-24 bg-gradient-to-r from-secondary-400 to-secondary-600 rounded-full opacity-20"
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -180, -360],
            scale: [1, 0.9, 1]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-32 left-1/3 w-20 h-20 bg-gradient-to-r from-accent-400 to-accent-600 rounded-full opacity-20"
          animate={{ 
            y: [0, -25, 0],
            rotate: [0, 270, 540],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        />
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
      <motion.section 
        className="py-24 relative"
        style={{ y: y2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-5xl font-black shimmer-text mb-4">
              Bruin Success Stories
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real impact for the UCLA community
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="text-center glass-card rounded-3xl p-10 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <motion.div 
                className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <HeartIcon className="w-10 h-10 text-white" />
              </motion.div>
              <motion.h4 
                className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 mb-3"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                247
              </motion.h4>
              <p className="text-gray-700 font-semibold text-lg">Items Reunited with Bruins</p>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="text-center glass-card rounded-3xl p-10 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/10 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <motion.div 
                className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <MagnifyingGlassIcon className="w-10 h-10 text-white" />
              </motion.div>
              <motion.h4 
                className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700 mb-3"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                94%
              </motion.h4>
              <p className="text-gray-700 font-semibold text-lg">AI Match Accuracy</p>
              <div className="absolute -top-2 -left-2 w-12 h-12 bg-primary-200 rounded-full opacity-20 animate-bounce-gentle"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="text-center glass-card rounded-3xl p-10 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-400/10 to-secondary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <motion.div 
                className="w-20 h-20 bg-gradient-to-r from-secondary-500 to-secondary-700 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <ClockIcon className="w-10 h-10 text-white" />
              </motion.div>
              <motion.h4 
                className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-secondary-500 to-secondary-700 mb-3"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                1.8
              </motion.h4>
              <p className="text-gray-700 font-semibold text-lg">Avg Days to Reunite</p>
              <div className="absolute -bottom-2 -left-2 w-14 h-14 bg-secondary-200 rounded-full opacity-20 animate-float"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-900 via-primary-900 to-accent-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        <div className="relative z-10 py-16 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="flex items-center justify-center space-x-4 mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <UCLALogo size="md" />
                <div className="text-left">
                  <h3 className="text-2xl font-bold shimmer-text">BearTracks.Nice</h3>
                  <p className="text-secondary-300 font-medium">UCLA Lost & Found</p>
                </div>
              </motion.div>
              
              <motion.p 
                className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Connecting Bruins with their belongings through beautiful design and smart technology
              </motion.p>
              
              <motion.div 
                className="flex justify-center space-x-8 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.div whileHover={{ scale: 1.1, color: "#f59e0b" }}>
                  <Link href="/about" className="text-gray-300 hover:text-secondary-400 transition-colors font-medium">
                    About
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1, color: "#f59e0b" }}>
                  <Link href="/privacy" className="text-gray-300 hover:text-secondary-400 transition-colors font-medium">
                    Privacy
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1, color: "#f59e0b" }}>
                  <Link href="/contact" className="text-gray-300 hover:text-secondary-400 transition-colors font-medium">
                    Contact
                  </Link>
                </motion.div>
              </motion.div>
              
              <motion.div
                className="border-t border-white/20 pt-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="text-gray-400 text-sm">
                  © 2024 BearTracks.Nice • Made with 💙💛 for UCLA Bruins
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Footer floating elements */}
        <div className="absolute top-4 left-4 w-16 h-16 bg-secondary-500/20 rounded-full animate-float"></div>
        <div className="absolute bottom-4 right-4 w-12 h-12 bg-primary-500/20 rounded-full animate-bounce-gentle"></div>
      </footer>
    </div>
  )
}