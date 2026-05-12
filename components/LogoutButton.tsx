'use client'

import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="text-primary hover:text-primary-light"
    >
      Logout
    </button>
  )
}