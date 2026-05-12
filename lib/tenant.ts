import clientPromise from './mongodb'
import { Tenant } from '../models/Tenant'

export async function getTenantByDomain(domain: string): Promise<Tenant | null> {
  try {
    const client = await clientPromise
    const db = client.db('sahakari-hub') // Master DB for tenant metadata
    const tenants = db.collection('tenants')
    const tenant = await tenants.findOne({ domain })
    return tenant as Tenant | null
  } catch (error) {
    console.error('Error fetching tenant:', error)
    return null
  }
}

export async function getTenantDatabaseByDomain(domain: string) {
  const client = await clientPromise
  return client.db(domain.replace(/\./g, '-'))
}