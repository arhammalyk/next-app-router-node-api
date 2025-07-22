"use client"

import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { UserCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/solid'
import { updateUser } from '../../apicalls/services/user'
import { useState } from 'react'
import { getAccessToken, setStoredAuth } from '../../utils/localStorage'
import { User } from '../../context/AuthContext'

const Settings = () => {
  const { user, setUser } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess('')
    setError('')
    try {

      const res = await updateUser({ name: name })
      if (res.success && res.user) {
        setUser(res.user as User)
        setSuccess('Profile updated successfully!')
        const token = getAccessToken();
        await setStoredAuth({
          user: res.user as User,
          accessToken: token || "",
        })
      } else {
        setError('Update failed')
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Update failed')
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-4 border border-blue-100">
      <div className="flex flex-col items-center gap-2 w-full">
        <div className="relative">
          <UserCircleIcon className="w-20 h-20 text-blue-300" />
          <span className="absolute bottom-1 right-1 bg-blue-600 rounded-full p-1">
            <Cog6ToothIcon className="w-5 h-5 text-white" />
          </span>
        </div>
        <h2 className="text-2xl font-bold text-blue-800">{user?.name || 'User'}</h2>
        <div className="bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm font-medium border border-blue-100">
          {user?.email}
        </div>
      </div>
      <form onSubmit={handleUpdate} className="w-full flex flex-col gap-3 mt-4">
        <label className="text-sm font-medium text-gray-700">Update Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition disabled:opacity-60"
          disabled={loading || !name.trim() || name === user?.name}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
        {success && <div className="text-green-600 text-sm mt-1">{success}</div>}
        {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
      </form>
      <div className="w-full mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Account Settings</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-gray-600">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            Email notifications enabled
          </li>
          <li className="flex items-center gap-2 text-gray-600">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            Two-factor authentication active
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Settings
