'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
//import { authClient } from '@/lib/auth-client'
import {
    LayoutGrid,
    BarChart2,
    CreditCard,
    BookOpen,
    Award,
    Bell,
    User,
    ChevronDown,
    Sparkles,
    FileText,
    Edit3
} from 'lucide-react'

interface Job {
    id: string
    topic: string
    status: string
    resultUrl: string | null
    createdAt: string
}

export default function DashboardPage() {
    const [jobs, setJobs] = useState<Job[]>([])
    const [loading, setLoading] = useState(true)
    // const { data: session } = authClient.useSession()

    useEffect(() => {
        fetch('/api/research')
            .then(res => res.json())
            .then(data => {
                setJobs(data)
                setLoading(false)
            })
            .catch(err => setLoading(false))
    }, [])

    return (
        <div className="min-h-screen bg-white flex font-sans text-gray-900">
            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-100 flex flex-col fixed h-full bg-white z-10">
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white">
                            <BarChart2 size={18} />
                        </div>
                        Leanlytics
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                        <LayoutGrid size={20} />
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-gray-50 text-gray-900 rounded-lg font-medium">
                        <LayoutGrid size={20} />
                        Home
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-lg font-medium transition-colors">
                        <BarChart2 size={20} />
                        Projects
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-lg font-medium transition-colors">
                        <CreditCard size={20} />
                        Transactions
                    </Link>

                    <div className="pt-8 pb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Contributor Panel
                    </div>
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-lg font-medium transition-colors">
                        <BookOpen size={20} />
                        Survey List
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-lg font-medium transition-colors">
                        <Award size={20} />
                        Reward Points
                    </Link>
                </nav>

                <div className="p-6 text-xs text-gray-400">
                    Copyright©{new Date().getFullYear()}. Leanlytics
                </div>
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
                        <span className="text-sm font-medium">User</span>
                        <ChevronDown size={16} className="text-gray-400" />
                    </div>
                </header>

                <div className="p-8 max-w-6xl mx-auto space-y-10">
                    {/* Banner */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                                <BarChart2 size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">Becoming our research partner</h3>
                                <p className="text-sm text-gray-500 mt-1">Help each other to becoming our research partner, and get more income.</p>
                            </div>
                        </div>
                        <button className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                            Join Now
                        </button>
                    </div>

                    {/* Welcome Section */}
                    <div>
                        <div className="text-sm text-gray-500 mb-1">My Workspace</div>
                        <h1 className="text-2xl font-bold text-gray-900">Welcome, User</h1>
                    </div>

                    {/* Action Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Auto Analysis Card */}
                        <div className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white mb-4">
                                <Sparkles size={20} />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Auto Analysis</h3>
                            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                Create a comprehensive deep research with auto analysis
                            </p>
                            <Link
                                href="/dashboard/new"
                                className="block w-full py-3 bg-green-500 text-white text-center rounded-lg font-medium hover:bg-green-600 transition-colors"
                            >
                                Craft Now
                            </Link>
                        </div>

                        {/* Survey with AI Card */}
                        <div className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm">
                            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white mb-4">
                                <Sparkles size={20} />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Survey with AI</h3>
                            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                Instantly create your survey just a few seconds
                            </p>
                            <button disabled className="block w-full py-3 bg-gray-200 text-gray-500 text-center rounded-lg font-medium cursor-not-allowed">
                                Coming Soon
                            </button>
                        </div>

                        {/* Manual Survey Card */}
                        <div className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 mb-4">
                                <LayoutGrid size={20} />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Manual Survey</h3>
                            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                Create survey manually and customize your audience with us
                            </p>
                            <button disabled className="block w-full py-3 bg-gray-200 text-gray-500 text-center rounded-lg font-medium cursor-not-allowed">
                                Coming Soon
                            </button>
                        </div>
                    </div>

                    {/* Recent Projects */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-500 mb-4">Recent Projects</h2>
                        <div className="space-y-4">
                            {loading ? (
                                <div className="text-center py-8 text-gray-400">Loading projects...</div>
                            ) : jobs.length === 0 ? (
                                <div className="text-center py-8 text-gray-400 border border-dashed border-gray-200 rounded-xl">
                                    No projects yet. Start one above!
                                </div>
                            ) : (
                                jobs.map(job => (
                                    <div key={job.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-white hover:border-gray-200 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                                                <Sparkles size={18} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <h4 className="font-bold text-gray-900">{job.topic}</h4>
                                                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${job.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                                                        job.status === 'FAILED' ? 'bg-red-100 text-red-700' :
                                                            'bg-orange-100 text-orange-700'
                                                        }`}>
                                                        {job.status === 'PENDING' ? 'Draft' : job.status}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-gray-400 mt-1">
                                                    Last edited: {new Date(job.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {job.status === 'COMPLETED' && job.resultUrl && (
                                                <a
                                                    href={job.resultUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                                                >
                                                    <FileText size={16} />
                                                    View Report
                                                </a>
                                            )}
                                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                                                <Edit3 size={16} />
                                                Edit project
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
