'use client'

import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleRegister() {
        setLoading(true)
        setError('')
        await authClient.signUp.email({
            email,
            password,
            name,
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
                <h2 className="text-2xl font-bold text-center text-gray-900">Create an Account</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                        />
                    </div>
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
                    <button
                        onClick={handleRegister}
                        disabled={loading}
                        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:opacity-50"
                    >
                        {loading ? 'Creating account...' : 'Register'}
                    </button>
                    {error && (
                        <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
                    )}
                    <div className="text-center text-sm">
                        <a href="/login" className="text-blue-600 hover:text-blue-500">Already have an account? Log in</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
