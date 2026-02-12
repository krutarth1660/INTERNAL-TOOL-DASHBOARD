import payload from 'payload'
import dotenv from 'dotenv'

dotenv.config()

const seed = async () => {
  try {
    await payload.init({
      secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
      local: true,
    })

    console.log('🌱 Seeding database...')
    console.log('🗑️  Clearing existing data...')

    // Clear existing data
    await payload.delete({
      collection: 'leave-requests',
      where: {},
    })
    await payload.delete({
      collection: 'tasks',
      where: {},
    })
    await payload.delete({
      collection: 'projects',
      where: {},
    })
    await payload.delete({
      collection: 'employees',
      where: {},
    })
    await payload.delete({
      collection: 'users',
      where: {},
    })

    console.log('✅ Existing data cleared')
    console.log('📝 Creating new data...')

    // Create Admin User
    const admin = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@example.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'admin',
      },
    })
    console.log('✅ Admin user created')

    // Create Manager User
    const manager = await payload.create({
      collection: 'users',
      data: {
        email: 'manager@example.com',
        password: 'manager123',
        name: 'Manager User',
        role: 'manager',
      },
    })
    console.log('✅ Manager user created')

    // Create Employee Users
    const employee1 = await payload.create({
      collection: 'users',
      data: {
        email: 'employee1@example.com',
        password: 'employee123',
        name: 'John Doe',
        role: 'employee',
      },
    })

    const employee2 = await payload.create({
      collection: 'users',
      data: {
        email: 'employee2@example.com',
        password: 'employee123',
        name: 'Jane Smith',
        role: 'employee',
      },
    })
    console.log('✅ Employee users created')

    // Create Employee Records
    await payload.create({
      collection: 'employees',
      data: {
        user: employee1.id,
        department: 'Engineering',
        designation: 'Software Developer',
        status: 'Active',
        joinDate: '2024-01-15',
        salary: 75000,
      },
    })

    await payload.create({
      collection: 'employees',
      data: {
        user: employee2.id,
        department: 'Design',
        designation: 'UI/UX Designer',
        status: 'Active',
        joinDate: '2024-02-01',
        salary: 70000,
      },
    })
    console.log('✅ Employee records created')

    // Create Projects
    const project1 = await payload.create({
      collection: 'projects',
      data: {
        name: 'Website Redesign',
        description: 'Complete redesign of company website',
        manager: manager.id,
        startDate: '2024-03-01',
        endDate: '2024-06-30',
        status: 'Active',
        budget: 50000,
      },
    })

    const project2 = await payload.create({
      collection: 'projects',
      data: {
        name: 'Mobile App Development',
        description: 'Build iOS and Android mobile application',
        manager: manager.id,
        startDate: '2024-04-01',
        status: 'Planning',
        budget: 100000,
      },
    })
    console.log('✅ Projects created')

    // Create Tasks
    await payload.create({
      collection: 'tasks',
      data: {
        title: 'Design Homepage Mockup',
        description: [
          {
            children: [
              {
                text: 'Create high-fidelity mockup for the new homepage design',
              },
            ],
          },
        ],
        project: project1.id,
        assignedTo: employee2.id,
        priority: 'High',
        status: 'In Progress',
        dueDate: '2024-03-15',
        estimatedHours: 20,
        actualHours: 15,
      },
    })

    await payload.create({
      collection: 'tasks',
      data: {
        title: 'Implement Frontend Components',
        description: [
          {
            children: [
              {
                text: 'Build reusable React components for the website',
              },
            ],
          },
        ],
        project: project1.id,
        assignedTo: employee1.id,
        priority: 'High',
        status: 'Todo',
        dueDate: '2024-03-20',
        estimatedHours: 40,
      },
    })

    await payload.create({
      collection: 'tasks',
      data: {
        title: 'Setup Mobile App Project',
        description: [
          {
            children: [
              {
                text: 'Initialize React Native project with necessary dependencies',
              },
            ],
          },
        ],
        project: project2.id,
        assignedTo: employee1.id,
        priority: 'Medium',
        status: 'Todo',
        dueDate: '2024-04-10',
        estimatedHours: 8,
      },
    })
    console.log('✅ Tasks created')

    // Create Leave Requests
    await payload.create({
      collection: 'leave-requests',
      data: {
        employee: employee1.id,
        leaveType: 'Vacation',
        startDate: '2024-05-01',
        endDate: '2024-05-05',
        reason: 'Family vacation',
        status: 'Pending',
      },
    })

    await payload.create({
      collection: 'leave-requests',
      data: {
        employee: employee2.id,
        leaveType: 'Sick',
        startDate: '2024-03-10',
        endDate: '2024-03-11',
        reason: 'Medical appointment',
        status: 'Approved',
        approvedBy: manager.id,
        approvalDate: '2024-03-08',
      },
    })
    console.log('✅ Leave requests created')

    console.log('\n🎉 Database seeded successfully!')
    console.log('\n📝 Login Credentials:')
    console.log('Admin: admin@example.com / admin123')
    console.log('Manager: manager@example.com / manager123')
    console.log('Employee: employee1@example.com / employee123')
    console.log('Employee: employee2@example.com / employee123')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seed()
