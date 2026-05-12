import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'
import { getTenantDatabase } from '../../../../lib/tenant'
import { Notice } from '../../../../models/Notice'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const db = await getTenantDatabase(session.user.domain)
    if (!db) {
      return new Response(JSON.stringify({ error: 'Tenant not found' }), { status: 404 })
    }
    const notices = await db.collection('notices').find({}).sort({ publishedAt: -1 }).toArray()
    return new Response(JSON.stringify(notices), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch notices' }), { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const body = await request.json()
    const { title, content } = body

    if (!title || !content) {
      return new Response(JSON.stringify({ error: 'Title and content required' }), { status: 400 })
    }

    const db = await getTenantDatabase(session.user.domain)
    if (!db) {
      return new Response(JSON.stringify({ error: 'Tenant not found' }), { status: 404 })
    }
    const notice: Notice = {
      tenantId: session.user.id,
      title,
      content,
      publishedAt: new Date(),
      isActive: true
    }

    const result = await db.collection('notices').insertOne(notice)
    return new Response(JSON.stringify({ ...notice, _id: result.insertedId }), { status: 201 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to add notice' }), { status: 500 })
  }
}