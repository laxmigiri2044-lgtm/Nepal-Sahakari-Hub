'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

interface Service {
  _id: string
  name: string
  description: string
  isActive: boolean
}

export default function ServicesPage() {
  const { data: session, status } = useSession()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({ name: '', description: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/admin/login')
    }
    if (status === 'authenticated') {
      fetchServices()
    }
  }, [status])

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/content/services')
      if (res.ok) {
        const data = await res.json()
        setServices(data)
      }
    } catch (error) {
      console.error('Failed to fetch services')
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/content/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        const newService = await res.json()
        setServices([...services, newService])
        setFormData({ name: '', description: '' })
      }
    } catch (error) {
      console.error('Failed to add service')
    }
    setSubmitting(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return
    try {
      await fetch(`/api/content/services/${id}`, { method: 'DELETE' })
      setServices(services.filter(s => s._id !== id))
    } catch (error) {
      console.error('Failed to delete service')
    }
  }

  if (status === 'loading' || loading) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-bg-soft p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-text mb-8">सेवाहरू व्यवस्थापन</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-semibold text-text mb-4">नयाँ सेवा थप्नुहोस्</h2>
          <div className="mb-4">
            <label className="block text-text-muted mb-1">सेवाको नाम</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded text-base"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-text-muted mb-1">विवरण</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded text-base"
              rows={3}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-accent text-white py-2 px-4 rounded hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? 'थप्दै...' : 'थप्नुहोस्'}
          </button>
        </form>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-text mb-4">सेवाहरूको सूची</h2>
          {services.length === 0 ? (
            <p className="text-text-muted">कुनै सेवा छैन</p>
          ) : (
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service._id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <h3 className="text-lg font-medium text-text">{service.name}</h3>
                    <p className="text-text-muted">{service.description}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="text-danger hover:text-red-700 ml-4"
                    >
                      मेटाउनुहोस्
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}