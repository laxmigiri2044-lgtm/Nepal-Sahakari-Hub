import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'
import clientPromise from '../../../../lib/mongodb'

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const body = await request.json()
    const { name, logo, address, phone, email } = body

    const client = await clientPromise
    const db = client.db('sahakari-hub')
    const tenants = db.collection('tenants')

    const updateData: any = {}
    if (name) updateData.name = name
    if (logo !== undefined) updateData.logo = logo
    if (address !== undefined) updateData.address = address
    if (phone !== undefined) updateData.phone = phone
    if (email !== undefined) updateData.email = email

    await tenants.updateOne({ domain: session.user.domain }, { $set: updateData })

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update tenant' }), { status: 500 })
  }
}