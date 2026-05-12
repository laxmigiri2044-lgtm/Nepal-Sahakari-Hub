import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'
import { getTenantDatabaseByDomain } from '../../../../lib/tenant'
import { Service } from '../../../../models/Service'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const db = await getTenantDatabaseByDomain(session.user.domain)
    const services = await db.collection('services').find({}).toArray()
    return new Response(JSON.stringify(services), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch services' }), { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const body = await request.json()
    const { name, description } = body

    if (!name) {
      return new Response(JSON.stringify({ error: 'Name is required' }), { status: 400 })
    }

    const db = await getTenantDatabaseByDomain(session.user.domain)
    const service: Service = {
      tenantId: session.user.id, // or from tenant
      name,
      description: description || '',
      isActive: true
    }

    const result = await db.collection('services').insertOne(service)
    return new Response(JSON.stringify({ ...service, _id: result.insertedId }), { status: 201 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to add service' }), { status: 500 })
  }
}