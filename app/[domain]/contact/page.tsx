import { notFound } from 'next/navigation'
import { getTenantByDomain } from '../../../lib/tenant'
import Link from 'next/link'

interface PageProps {
  params: { domain: string }
}

export default async function ContactPage({ params }: PageProps) {
  const domain = params.domain
  const tenant = await getTenantByDomain(domain)

  if (!tenant || !tenant.isSetupComplete) {
    notFound()
  }

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
              <Link href="/rates" className="text-text hover:text-primary">ब्याजदर</Link>
              <Link href="/notice" className="text-text hover:text-primary">सूचनाहरू</Link>
              <Link href="/contact" className="text-primary">सम्पर्क</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-text text-center mb-8">सम्पर्क गर्नुहोस्</h1>

          <div className="bg-white p-8 rounded-lg shadow">
            <div className="text-center mb-8">
              {tenant.logo && <img src={tenant.logo} alt={tenant.name} className="h-16 w-16 mx-auto mb-4" />}
              <h2 className="text-2xl font-semibold text-text">{tenant.name}</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-text">ठेगाना</h3>
                  <p className="text-text-muted">{tenant.address || 'ठेगाना उपलब्ध छैन'}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-text">फोन</h3>
                  <p className="text-text-muted">{tenant.phone || 'फोन नम्बर उपलब्ध छैन'}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-text">इमेल</h3>
                  <p className="text-text-muted">{tenant.email || 'इमेल उपलब्ध छैन'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}