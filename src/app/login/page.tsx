'use client'

import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleLogin() {
        setLoading(true)
        setError('')
        await authClient.signIn.email({
            email,
            password,
        }, {
            onSuccess: () => {
                router.push('/dashboard')
            },
            onError: (ctx) => {
                setError(ctx.error.message)
                setLoading(false)
            }
        })
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-900">Sign in to Leanlytics</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="m@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                                Don't have an account? Register
                            </a>
                        </div>
                    </div>
                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Log in'}
                    </button>
                    {error && (
                        <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
                    )}
                </div>
            </div>
        </div>
    )
}
