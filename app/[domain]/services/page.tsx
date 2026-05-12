import { notFound } from 'next/navigation'
import { getTenantByDomain, getTenantDatabase } from '../../../lib/tenant'
import { Service } from '../../../models/Service'
import Link from 'next/link'

interface PageProps {
  params: { domain: string }
}

export default async function ServicesPage({ params }: PageProps) {
  const domain = params.domain
  const tenant = await getTenantByDomain(domain)

  if (!tenant || !tenant.isSetupComplete) {
    notFound()
  }

  const db = await getTenantDatabase(domain)
  if (!db) notFound()
  const services = await db.collection('services').find({ isActive: true }).toArray() as Service[]

  return (
    <div className="min-h-screen bg-bg">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white shadow z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {tenant.logo && <img src={tenant.logo} alt={tenant.name} className="h-10 w-10 mr-2" />}
              <Link href="/" className="text-xl font-bold text-text">{tenant.name}</Link>
            </div>
            <div className="flex space-x-8">
              <Link href="/" className="text-text hover:text-primary">होम</Link>
              <Link href="/services" className="text-primary">सेवाहरू</Link>
              <Link href="/rates" className="text-text hover:text-primary">ब्याजदर</Link>
              <Link href="/notice" className="text-text hover:text-primary">सूचनाहरू</Link>
              <Link href="/contact" className="text-text hover:text-primary">सम्पर्क</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-text text-center mb-8">हाम्रा सेवाहरू</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service._id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                <h2 className="text-2xl font-semibold text-text mb-4">{service.name}</h2>
                <p className="text-text-muted text-base">{service.description}</p>
              </div>
            ))}
          </div>
          {services.length === 0 && (
            <p className="text-center text-text-muted text-lg">कुनै सेवाहरू उपलब्ध छैनन्।</p>
          )}
        </div>
      </section>
    </div>
  )
}