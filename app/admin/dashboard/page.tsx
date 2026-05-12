import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { getTenantByDomain } from '../../../lib/tenant'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import Link from 'next/link'
import LogoutButton from '../../../components/LogoutButton'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/admin/login')
  }

  const tenant = await getTenantByDomain(session.user.domain)
  if (!tenant) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-bg-soft p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-text">{tenant.name}</h1>
            <p className="text-text-muted text-lg">Admin Dashboard</p>
          </div>
          <div className="text-right">
            <p className="text-text-muted">{tenant.domain}</p>
            <LogoutButton />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/services" className="block">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold text-text mb-2">सेवाहरू</h2>
              <p className="text-text-muted">Add and manage services</p>
            </div>
          </Link>

          <Link href="/admin/rates" className="block">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold text-text mb-2">ब्याजदर</h2>
              <p className="text-text-muted">Manage interest rates</p>
            </div>
          </Link>

          <Link href="/admin/notices" className="block">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold text-text mb-2">सूचनाहरू</h2>
              <p className="text-text-muted">Post and edit notices</p>
            </div>
          </Link>

          <Link href="/admin/settings" className="block">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold text-text mb-2">सेटिङहरू</h2>
              <p className="text-text-muted">Update cooperative info</p>
            </div>
          </Link>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-text mb-2">Statistics</h2>
            <p className="text-text-muted">Visitors: 1,234</p>
            <p className="text-text-muted">Services: 5</p>
          </div>
        </div>
      </div>
    </div>
  )
}