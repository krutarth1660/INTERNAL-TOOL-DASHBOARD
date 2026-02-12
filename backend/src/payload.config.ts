import { buildConfig } from 'payload/config'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'

// Import collections
import Users from './collections/Users'
import Employees from './collections/Employees'
import Projects from './collections/Projects'
import Tasks from './collections/Tasks'
import LeaveRequests from './collections/LeaveRequests'

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:4000',
  admin: {
    user: Users.slug,
    disable: true,
  },
  collections: [
    Users,
    Employees,
    Projects,
    Tasks,
    LeaveRequests,
  ],
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://localhost:27017/internal-dashboard',
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  cors: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
  ],
  csrf: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
  ],
})
