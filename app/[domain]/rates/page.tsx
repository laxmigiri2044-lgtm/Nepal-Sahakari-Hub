import { notFound } from 'next/navigation'
import { getTenantByDomain, getTenantDatabase } from '../../../lib/tenant'
import { Rate } from '../../../models/Rate'
import Link from 'next/link'

interface PageProps {
  params: { domain: string }
}

export default async function RatesPage({ params }: PageProps) {
  const domain = params.domain
  const tenant = await getTenantByDomain(domain)

  if (!tenant || !tenant.isSetupComplete) {
    notFound()
  }

  const db = await getTenantDatabase(domain)
  if (!db) notFound()
  const rates = await db.collection('rates').find({ isActive: true }).toArray() as Rate[]

  // Group rates by type
  const groupedRates = rates.reduce((acc, rate) => {
    if (!acc[rate.type]) acc[rate.type] = []
    acc[rate.type].push(rate)
    return acc
  }, {} as Record<string, Rate[]>)

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
              <Link href="/services" className="text-text hover:text-primary">सेवाहरू</Link>
              <Link href="/rates" className="text-primary">ब्याजदर</Link>
              <Link href="/notice" className="text-text hover:text-primary">सूचनाहरू</Link>
              <Link href="/contact" className="text-text hover:text-primary">सम्पर्क</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Rates Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-text text-center mb-8">ब्याजदरहरू</h1>

          {Object.keys(groupedRates).map((type) => (
            <div key={type} className="mb-12">
              <h2 className={`text-2xl font-semibold mb-6 text-center ${
                type === 'Saving' ? 'text-green-600' :
                type === 'FD' ? 'text-blue-600' :
                'text-orange-600'
              }`}>
                {type}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-white shadow rounded-lg">
                  <thead className="bg-bg-soft">
                    <tr>
                      <th className="px-6 py-3 text-left text-text font-semibold">ब्याजदर</th>
                      <th className="px-6 py-3 text-left text-text font-semibold">अवधि</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedRates[type].map((rate) => (
                      <tr key={rate._id} className="border-b border-border">
                        <td className="px-6 py-4 text-text font-medium">{rate.rate}%</td>
                        <td className="px-6 py-4 text-text-muted">{rate.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {rates.length === 0 && (
            <p className="text-center text-text-muted text-lg">कुनै ब्याजदरहरू उपलब्ध छैनन्।</p>
          )}
        </div>
      </section>
    </div>
  )
}