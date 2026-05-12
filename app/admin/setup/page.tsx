'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SetupPage() {
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    logo: '',
    address: '',
    phone: '',
    email: '',
    adminPassword: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.adminPassword !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const result = await response.json()
      if (response.ok) {
        router.push('/admin/login')
      } else {
        setError(result.error || 'Setup failed')
      }
    } catch (err) {
      setError('Network error')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-text">First-Time Setup</h1>
        {error && <p className="text-danger text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
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
          <div>
            <label className="block text-text-muted mb-1">Domain</label>
            <input
              type="text"
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              placeholder="e.g., sahakari-xyz.com"
              className="w-full px-3 py-2 border border-border rounded text-base"
              required
            />
          </div>
          <div>
            <label className="block text-text-muted mb-1">Logo URL (optional)</label>
            <input
              type="url"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded text-base"
            />
          </div>
          <div>
            <label className="block text-text-muted mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded text-base"
            />
          </div>
          <div>
            <label className="block text-text-muted mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded text-base"
            />
          </div>
          <div>
            <label className="block text-text-muted mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded text-base"
            />
          </div>
          <div>
            <label className="block text-text-muted mb-1">Admin Password</label>
            <input
              type="password"
              name="adminPassword"
              value={formData.adminPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded text-base"
              required
            />
          </div>
          <div>
            <label className="block text-text-muted mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded text-base"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-white py-3 rounded hover:opacity-90 disabled:opacity-50 text-base"
          >
            {loading ? 'Setting up...' : 'Complete Setup'}
          </button>
        </form>
      </div>
    </div>
  )
}