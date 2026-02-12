import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const collection = searchParams.get('collection') || 'tasks'

    // Get the auth cookie from the request
    const cookie = request.headers.get('cookie')

    // Fetch data from backend API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${collection}?limit=1000&depth=1`, {
      headers: {
        'Cookie': cookie || '',
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: response.status })
    }

    const data = await response.json()
    const docs = data.docs || []

    // Convert to CSV
    if (docs.length === 0) {
      return NextResponse.json({ error: 'No data to export' }, { status: 404 })
    }

    // Get all unique keys from all documents
    const allKeys = new Set<string>()
    docs.forEach((doc: any) => {
      Object.keys(doc).forEach(key => {
        if (key !== 'id' && typeof doc[key] !== 'object') {
          allKeys.add(key)
        }
      })
    })

    const headers = ['id', ...Array.from(allKeys)]
    
    // Create CSV content
    const csvRows = [headers.join(',')]
    
    docs.forEach((doc: any) => {
      const values = headers.map(header => {
        let value = doc[header]
        
        // Handle relationships (objects)
        if (typeof value === 'object' && value !== null) {
          value = value.name || value.email || value.title || value.id || ''
        }
        
        // Handle dates
        if (header.includes('Date') && value) {
          value = new Date(value).toLocaleDateString()
        }
        
        // Escape commas and quotes
        if (typeof value === 'string') {
          value = `"${value.replace(/"/g, '""')}"`
        }
        
        return value || ''
      })
      csvRows.push(values.join(','))
    })

    const csv = csvRows.join('\n')

    // Return CSV file
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${collection}-${Date.now()}.csv"`
      }
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json({ error: 'Export failed' }, { status: 500 })
  }
}
