import clientPromise from '../../../lib/mongodb'
import { Tenant } from '../../../models/Tenant'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, domain, logo, address, phone, email, adminPassword } = body

    if (!name || !domain || !adminPassword) {
      return new Response(JSON.stringify({ error: 'Required fields missing' }), { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 12)

    const tenant: Tenant = {
      name,
      domain,
      logo: logo || '',
      address: address || '',
      phone: phone || '',
      email: email || '',
      isSetupComplete: true,
      adminPassword: hashedPassword,
      createdAt: new Date()
    }

    const client = await clientPromise
    const db = client.db('sahakari-hub')
    const tenants = db.collection('tenants')

    // Check if domain exists
    const existing = await tenants.findOne({ domain })
    if (existing) {
      return new Response(JSON.stringify({ error: 'Domain already exists' }), { status: 400 })
    }

    await tenants.insertOne(tenant)

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    console.error('Setup error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 })
  }
}