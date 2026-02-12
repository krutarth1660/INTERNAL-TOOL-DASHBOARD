import express from 'express'
import payload from 'payload'
import cors from 'cors'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

console.log('🔧 Starting server initialization...')
console.log('📝 Environment:', {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 4000,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  MONGODB_URI: process.env.MONGODB_URI ? '✅ Set' : '❌ Not set',
  PAYLOAD_SECRET: process.env.PAYLOAD_SECRET ? '✅ Set' : '❌ Not set',
})

const app = express()
const PORT = process.env.PORT || 4000

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}

console.log('🌐 CORS enabled for:', corsOptions.origin)

app.use(cors(corsOptions))

// Redirect root to Admin panel
app.get('/', (_, res) => {
  console.log('📍 Root route accessed, redirecting to /admin')
  res.redirect('/admin')
})

const start = async () => {
  try {
    console.log('🔌 Initializing Payload CMS...')
    
    // Initialize Payload
    await payload.init({
      secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
      express: app,
      onInit: async () => {
        console.log('✅ Payload CMS initialized successfully')
        console.log(`📊 Admin Panel URL: ${payload.getAdminURL()}`)
        
        // Log all collections
        const collections = payload.collections
        console.log('📚 Available Collections:', Object.keys(collections).join(', '))
      },
    })

    // Start Express server
    app.listen(PORT, async () => {
      console.log('\n' + '='.repeat(60))
      console.log('🎉 SERVER READY!')
      console.log('='.repeat(60))
      console.log(`🚀 Server running on: http://localhost:${PORT}`)
      console.log(`📊 Admin Panel: http://localhost:${PORT}/admin`)
      console.log(`🔌 API Endpoint: http://localhost:${PORT}/api`)
      console.log(`📝 API Docs: http://localhost:${PORT}/api-docs`)
      console.log('='.repeat(60) + '\n')
      console.log('💡 Tip: Use the seed script to populate test data')
      console.log('   Run: npm run seed\n')
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

start()
