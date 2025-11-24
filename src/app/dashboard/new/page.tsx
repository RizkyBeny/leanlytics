'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import {
    ArrowLeft,
    Sparkles,
    Upload,
    Bell,
    User,
    ChevronDown,
    Info
} from 'lucide-react'

export default function NewResearchPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { data: session } = authClient.useSession()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0])
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        setError('')

        const formData = new FormData(event.currentTarget)

        try {
            const res = await fetch('/api/research', {
                method: 'POST',
                body: formData,
            })

            if (res.ok) {
                router.push('/dashboard')
            } else {
                const json = await res.json()
                setError(json.error || 'Failed to create research job')
            }
        } catch (err) {
            setError('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-white flex font-sans text-gray-900">
            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-100 flex flex-col fixed h-full bg-white z-10">
                <div className="p-6 flex items-center gap-2 font-bold text-xl tracking-tight">
                    <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white">
                        <Sparkles size={18} />
                    </div>
                    Leanlytics
                </div>

                <div className="px-6 py-4">
                    <Link href="/dashboard" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                        <ArrowLeft size={16} />
                        Back to home
                    </Link>
                </div>

                <nav className="flex-1 px-6 space-y-6 mt-4">
                    <div className="relative pl-4 border-l-2 border-gray-100 space-y-8">
                        <div className="relative">
                            <div className="absolute -left-[21px] top-0 w-6 h-6 bg-gray-900 rounded text-white flex items-center justify-center text-xs font-bold">1</div>
                            <div className="font-bold text-gray-900 text-sm">Fill the form</div>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[21px] top-0 w-6 h-6 bg-gray-200 rounded text-gray-500 flex items-center justify-center text-xs font-bold">2</div>
                            <div className="font-medium text-gray-400 text-sm">Preview</div>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[21px] top-0 w-6 h-6 bg-gray-200 rounded text-gray-500 flex items-center justify-center text-xs font-bold">3</div>
                            <div className="font-medium text-gray-400 text-sm">Custom Audience</div>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[21px] top-0 w-6 h-6 bg-gray-200 rounded text-gray-500 flex items-center justify-center text-xs font-bold">4</div>
                            <div className="font-medium text-gray-400 text-sm">Payment</div>
                        </div>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64">
                {/* Header */}
                <header className="h-16 border-b border-gray-100 flex items-center justify-end px-8 gap-6 bg-white sticky top-0 z-10">
                    <button className="text-gray-400 hover:text-gray-600">
                        <Bell size={20} />
                    </button>
                    <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                            <User size={16} />
                        </div>
                        <span className="text-sm font-medium">{session?.user?.name || 'User'}</span>
                        <ChevronDown size={16} className="text-gray-400" />
                    </div>
                </header>

                <div className="p-8 max-w-4xl mx-auto">
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white">
                                <Sparkles size={16} />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">Auto Analysis</h1>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
                            Combine your data with our AI engine to get a comprehensive results to boost your research projects. Get faster results and make a rapid solutions for your own strategies
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                        <h2 className="font-bold text-lg mb-1">Research Plan</h2>
                        <p className="text-sm text-gray-400 mb-6">Please add your survey title and description below</p>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Topic</label>
                                <input
                                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-gray-300"
                                    name="topic"
                                    type="text"
                                    placeholder="Please tell me your topics (ex. Tokopedia Market Research)"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Categories</label>
                                <div className="relative">
                                    <select
                                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all appearance-none bg-white text-gray-500"
                                        name="audience"
                                        required
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Select categories research</option>
                                        <option value="market">Market Research</option>
                                        <option value="product">Product Research</option>
                                        <option value="user">User Experience</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Descriptions</label>
                                <div className="bg-gray-50 p-2.5 rounded-lg flex items-start gap-2.5 mb-2.5">
                                    <Info size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-xs text-gray-500">Give your research objective and expectations to get a better results</p>
                                </div>
                                <textarea
                                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-gray-300 min-h-[100px]"
                                    name="objectives"
                                    placeholder="ex. Deep research about tokopedia market strategies using SWOT framework"
                                    required
                                />
                                <div className="text-right text-xs text-gray-400 mt-1">0/1000</div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Add Source</label>
                                <input
                                    type="file"
                                    name="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx,.txt,.csv,.jpg,.jpeg,.png"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    <Plus size={16} />
                                    {selectedFile ? selectedFile.name : 'Upload file'}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                                {error}
                            </div>
                        )}

                        <div className="mt-6 flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-green-500 text-white px-8 py-2.5 rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-50 shadow-lg shadow-green-200 text-sm"
                            >
                                {loading ? 'Generating...' : 'Generate Now'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

function Plus({ size, className }: { size?: number, className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}
