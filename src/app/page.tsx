import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tighter text-blue-600">
          Leanlytics
        </div>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 py-20 lg:py-32">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            Automate your research with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">AI precision</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Leanlytics turns your questions into comprehensive research reports in minutes.
            Powered by advanced AI agents and automated workflows.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Start Researching Now
            </Link>
            <Link
              href="#features"
              className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"
            >
              How it works
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div id="features" className="grid md:grid-cols-3 gap-8 mt-32">
          {[
            {
              title: "AI-Powered Analysis",
              description: "Our agents analyze market trends and data to give you actionable insights.",
              icon: "🤖",
            },
            {
              title: "Automated Surveys",
              description: "We generate and distribute surveys automatically based on your research goals.",
              icon: "📊",
            },
            {
              title: "Instant PDF Reports",
              description: "Get professional, ready-to-present PDF reports delivered to your dashboard.",
              icon: "📄",
            },
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-20">
        <div className="max-w-7xl mx-auto px-8 py-12 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Leanlytics. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
