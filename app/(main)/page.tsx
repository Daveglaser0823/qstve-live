import Logo from '@/components/Logo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QStve - Power On Intelligence',
  description: 'Man & Machine',
}

export default function HomePage() {
  return (
    <>
      {/* Hero - full viewport, dark */}
      <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-deep-black px-6">
        <div className="flex flex-col items-center text-center">
          {/* Large bionic eye logo */}
          <Logo variant="full" theme="dark" size={80} className="mb-8" />

          {/* Tagline */}
          <p className="font-mono text-sm md:text-base tracking-[0.2em] md:tracking-[0.3em] uppercase text-muted mt-4">
            Power On Intelligence
          </p>
        </div>
      </section>

      {/* About section - light background */}
      <section className="bg-warm-white text-deep-black">
        <div className="max-w-content mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.025em] mb-8">
              Man & Machine
            </h2>
            <div className="space-y-5 text-lg leading-relaxed text-[#2A2A2E]">
              <p>
                QStve is the intersection of human leadership and artificial intelligence. A real-time experiment in what happens when a CEO builds, thinks, and operates alongside AI every single day.
              </p>
              <p>
                Not theory. Not hype. The actual work of integrating AI into how decisions get made, how teams operate, and how companies compete.
              </p>
              <p className="font-semibold text-deep-black">
                Better. Stronger. Smarter.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
