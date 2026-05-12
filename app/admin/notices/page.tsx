'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

interface Notice {
  _id: string
  title: string
  content: string
  publishedAt: string
  isActive: boolean
}

export default function NoticesPage() {
  const { data: session, status } = useSession()
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({ title: '', content: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/admin/login')
    }
    if (status === 'authenticated') {
      fetchNotices()
    }
  }, [status])

  const fetchNotices = async () => {
    try {
      const res = await fetch('/api/content/notices')
      if (res.ok) {
        const data = await res.json()
        setNotices(data)
      }
    } catch (error) {
      console.error('Failed to fetch notices')
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/content/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        const newNotice = await res.json()
        setNotices([newNotice, ...notices])
        setFormData({ title: '', content: '' })
      }
    } catch (error) {
      console.error('Failed to add notice')
    }
    setSubmitting(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('के तपाईं निश्चित हुनुहुन्छ?')) return
    try {
      await fetch(`/api/content/notices/${id}`, { method: 'DELETE' })
      setNotices(notices.filter(n => n._id !== id))
    } catch (error) {
      console.error('Failed to delete notice')
    }
  }

  if (status === 'loading' || loading) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-bg-soft p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-text mb-8">सूचना व्यवस्थापन</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-semibold text-text mb-4">नयाँ सूचना थप्नुहोस्</h2>
          <div className="mb-4">
            <label className="block text-text-muted mb-1">शीर्षक</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded text-base"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-text-muted mb-1">सामग्री</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded text-base"
              rows={5}
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
          <h2 className="text-2xl font-semibold text-text mb-4">सूचनाहरूको सूची</h2>
          {notices.length === 0 ? (
            <p className="text-text-muted">कुनै सूचना छैन</p>
          ) : (
            <ul className="space-y-4">
              {notices.map((notice) => (
                <li key={notice._id} className="border-b pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-text">{notice.title}</h3>
                      <p className="text-text-muted text-sm mb-2">
                        {new Date(notice.publishedAt).toLocaleDateString('ne-NP')}
                      </p>
                      <p className="text-text-muted">
                        {notice.content.length > 100 ? `${notice.content.substring(0, 100)}...` : notice.content}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(notice._id)}
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