import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'
import { getTenantDatabase } from '../../../../lib/tenant'
import { Rate } from '../../../../models/Rate'

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
    const rates = await db.collection('rates').find({}).toArray()
    return new Response(JSON.stringify(rates), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch rates' }), { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const body = await request.json()
    const { type, rate, duration } = body

    if (!type || !rate || !duration) {
      return new Response(JSON.stringify({ error: 'All fields required' }), { status: 400 })
    }

    const db = await getTenantDatabase(session.user.domain)
    if (!db) {
      return new Response(JSON.stringify({ error: 'Tenant not found' }), { status: 404 })
    }
    const rateDoc: Rate = {
      tenantId: session.user.id,
      type,
      rate: Number(rate),
      duration,
      isActive: true
    }

    const result = await db.collection('rates').insertOne(rateDoc)
    return new Response(JSON.stringify({ ...rateDoc, _id: result.insertedId }), { status: 201 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to add rate' }), { status: 500 })
  }
}