import { notFound } from 'next/navigation'
import { getTenantByDomain, getTenantDatabase } from '../../../lib/tenant'
import { Notice } from '../../../models/Notice'
import Link from 'next/link'

interface PageProps {
  params: { domain: string }
}

export default async function NoticePage({ params }: PageProps) {
  const domain = params.domain
  const tenant = await getTenantByDomain(domain)

  if (!tenant || !tenant.isSetupComplete) {
    notFound()
  }

  const db = await getTenantDatabase(domain)
  const notices = await db.collection('notices').find({ isActive: true }).sort({ publishedAt: -1 }).toArray() as unknown as Notice[]

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
              <Link href="/notice" className="text-primary">सूचनाहरू</Link>
              <Link href="/contact" className="text-text hover:text-primary">सम्पर्क</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Notices Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-text text-center mb-8">सूचनाहरू</h1>

          {notices.length === 0 ? (
            <p className="text-center text-text-muted text-lg">कुनै सूचनाहरू उपलब्ध छैनन्।</p>
          ) : (
            <div className="space-y-6">
              {notices.map((notice) => (
                <article key={notice._id} className="bg-white p-8 rounded-lg shadow">
                  <h2 className="text-2xl font-semibold text-text mb-4">{notice.title}</h2>
                  <p className="text-text-muted text-sm mb-6">
                    प्रकाशित मिति: {new Date(notice.publishedAt).toLocaleDateString('ne-NP')}
                  </p>
                  <div className="text-text-muted text-base leading-relaxed whitespace-pre-line">
                    {notice.content}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}