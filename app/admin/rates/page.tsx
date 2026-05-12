'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

interface Rate {
  _id: string
  type: string
  rate: number
  duration: string
  isActive: boolean
}

export default function RatesPage() {
  const { data: session, status } = useSession()
  const [rates, setRates] = useState<Rate[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({ type: 'Saving', rate: '', duration: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/admin/login')
    }
    if (status === 'authenticated') {
      fetchRates()
    }
  }, [status])

  const fetchRates = async () => {
    try {
      const res = await fetch('/api/content/rates')
      if (res.ok) {
        const data = await res.json()
        setRates(data)
      }
    } catch (error) {
      console.error('Failed to fetch rates')
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/content/rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        const newRate = await res.json()
        setRates([...rates, newRate])
        setFormData({ type: 'Saving', rate: '', duration: '' })
      }
    } catch (error) {
      console.error('Failed to add rate')
    }
    setSubmitting(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('के तपाईं निश्चित हुनुहुन्छ?')) return
    try {
      await fetch(`/api/content/rates/${id}`, { method: 'DELETE' })
      setRates(rates.filter(r => r._id !== id))
    } catch (error) {
      console.error('Failed to delete rate')
    }
  }

  if (status === 'loading' || loading) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-bg-soft p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-text mb-8">ब्याजदर व्यवस्थापन</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-semibold text-text mb-4">नयाँ ब्याजदर थप्नुहोस्</h2>
          <div className="mb-4">
            <label className="block text-text-muted mb-1">प्रकार</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded text-base"
            >
              <option value="Saving">Saving</option>
              <option value="FD">Fixed Deposit</option>
              <option value="Loan">Loan</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-text-muted mb-1">ब्याजदर (%)</label>
            <input
              type="number"
              step="0.01"
              value={formData.rate}
              onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded text-base"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-text-muted mb-1">अवधि</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="e.g., 1 year, 6 months"
              className="w-full px-3 py-2 border border-border rounded text-base"
              required
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
          <h2 className="text-2xl font-semibold text-text mb-4">ब्याजदरहरूको सूची</h2>
          {rates.length === 0 ? (
            <p className="text-text-muted">कुनै ब्याजदर छैन</p>
          ) : (
            <ul className="space-y-4">
              {rates.map((rate) => (
                <li key={rate._id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <h3 className="text-lg font-medium text-text">{rate.type} - {rate.rate}%</h3>
                    <p className="text-text-muted">Duration: {rate.duration}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => handleDelete(rate._id)}
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