import { notFound } from 'next/navigation'
import { getTenantByDomain, getTenantDatabase } from '../../lib/tenant'
import { Service } from '../../models/Service'
import { Rate } from '../../models/Rate'
import { Notice } from '../../models/Notice'
import Link from 'next/link'

interface PageProps {
  params: { domain: string }
}

export default async function DomainHome({ params }: PageProps) {
  const domain = params.domain
  const tenant = await getTenantByDomain(domain)

  if (!tenant || !tenant.isSetupComplete) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text mb-4">Coming Soon</h1>
          <p className="text-text-muted">यो वेबसाइट चाँडै उपलब्ध हुनेछ।</p>
        </div>
      </div>
    )
  }

  const db = await getTenantDatabase(domain)
  if (!db) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text mb-4">Coming Soon</h1>
          <p className="text-text-muted">यो वेबसाइट चाँडै उपलब्ध हुनेछ।</p>
        </div>
      </div>
    )
  }
  const services = await db.collection('services').find({ isActive: true }).toArray() as Service[]
  const rates = await db.collection('rates').find({ isActive: true }).toArray() as Rate[]
  const notices = await db.collection('notices').find({ isActive: true }).sort({ publishedAt: -1 }).limit(3).toArray() as Notice[]

  return (
    <div className="min-h-screen bg-bg">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white shadow z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {tenant.logo && <img src={tenant.logo} alt={tenant.name} className="h-10 w-10 mr-2" />}
              <span className="text-xl font-bold text-text">{tenant.name}</span>
            </div>
            <div className="flex space-x-8">
              <a href="#services" className="text-text hover:text-primary">सेवाहरू</a>
              <a href="#rates" className="text-text hover:text-primary">ब्याजदर</a>
              <a href="#notices" className="text-text hover:text-primary">सूचनाहरू</a>
              <a href="#contact" className="text-text hover:text-primary">सम्पर्क</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-bg-soft py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {tenant.logo && <img src={tenant.logo} alt={tenant.name} className="h-20 w-20 mx-auto mb-4" />}
          <h1 className="text-4xl font-bold text-text mb-4">{tenant.name}</h1>
          <p className="text-xl text-text-muted mb-8">आफ्नो भविष्य सुरक्षित गर्नुहोस्</p>
          <div className="space-x-4">
            <a href="#services" className="bg-primary text-white px-6 py-3 rounded hover:bg-primary-light">सेवाहरू हेर्नुहोस्</a>
            <a href="#contact" className="bg-accent text-white px-6 py-3 rounded hover:opacity-90">सम्पर्क गर्नुहोस्</a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text text-center mb-8">हाम्रा सेवाहरू</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service._id} className="bg-bg-soft p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-text mb-2">{service.name}</h3>
                <p className="text-text-muted">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rates Section */}
      <section id="rates" className="py-16 bg-bg-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text text-center mb-8">ब्याजदरहरू</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rates.map((rate) => (
              <div key={rate._id} className={`p-6 rounded-lg text-center ${
                rate.type === 'Saving' ? 'bg-green-100 text-green-800' :
                rate.type === 'FD' ? 'bg-blue-100 text-blue-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                <h3 className="text-xl font-semibold mb-2">{rate.type}</h3>
                <p className="text-2xl font-bold mb-1">{rate.rate}%</p>
                <p className="text-sm">{rate.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notices Section */}
      <section id="notices" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text text-center mb-8">सूचनाहरू</h2>
          <div className="space-y-4">
            {notices.map((notice) => (
              <div key={notice._id} className="bg-bg-soft p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-text mb-2">{notice.title}</h3>
                <p className="text-text-muted text-sm mb-2">
                  {new Date(notice.publishedAt).toLocaleDateString('ne-NP')}
                </p>
                <p className="text-text-muted">{notice.content}</p>
              </div>
            ))}
          </div>
          {notices.length === 3 && (
            <div className="text-center mt-8">
              <Link href="/notices" className="text-primary hover:text-primary-light">सबै हेर्नुहोस्</Link>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-bg-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-text mb-8">सम्पर्क गर्नुहोस्</h2>
          <div className="space-y-4">
            <p className="text-text">{tenant.address}</p>
            <p className="text-text">Phone: {tenant.phone}</p>
            <p className="text-text">Email: {tenant.email}</p>
          </div>
        </div>
      </section>
    </div>
  )
}