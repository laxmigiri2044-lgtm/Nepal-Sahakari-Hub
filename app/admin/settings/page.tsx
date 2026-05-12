'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { getTenantByDomain } from '../../../lib/tenant'

interface Tenant {
  name: string
  logo: string
  address: string
  phone: string
  email: string
}

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const [tenant, setTenant] = useState<Tenant | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    address: '',
    phone: '',
    email: ''
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/admin/login')
    }
    if (status === 'authenticated') {
      fetchTenant()
    }
  }, [status])

  const fetchTenant = async () => {
    if (!session?.user.domain) return
    const data = await getTenantByDomain(session.user.domain)
    if (data) {
      setTenant(data)
      setFormData({
        name: data.name,
        logo: data.logo || '',
        address: data.address || '',
        phone: data.phone || '',
        email: data.email || ''
      })
    }
    setLoading(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setFormData({ ...formData, logo: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/content/tenant', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        alert('Settings updated successfully')
        fetchTenant()
      } else {
        alert('Failed to update')
      }
    } catch (error) {
      alert('Error updating settings')
    }
    setSubmitting(false)
  }

  if (status === 'loading' || loading) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-bg-soft p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-text mb-8">सेटिङहरू</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <label className="block text-text-muted mb-1">Cooperative Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded text-base"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-text-muted mb-1">Logo</label>
            {formData.logo && (
              <img src={formData.logo} alt="Logo" className="w-24 h-24 object-cover mb-2" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-border rounded text-base"
            />
          </div>

          <div className="mb-4">
            <label className="block text-text-muted mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded text-base"
            />
          </div>

          <div className="mb-4">
            <label className="block text-text-muted mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded text-base"
            />
          </div>

          <div className="mb-4">
            <label className="block text-text-muted mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded text-base"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-accent text-white py-2 px-4 rounded hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? 'अपडेट गर्दै...' : 'अपडेट गर्नुहोस्'}
          </button>
        </form>
      </div>
    </div>
  )
}