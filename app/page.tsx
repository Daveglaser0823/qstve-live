function QIcon({ className = '', size = 200 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
    >
      {/* Top lid */}
      <path
        d="M 34 100 Q 100 42 166 100"
        fill="none"
        stroke="#c8281e"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* Bottom lid */}
      <path
        d="M 34 100 Q 100 158 166 100"
        fill="none"
        stroke="#c8281e"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.35"
      />
      {/* Iris ring */}
      <circle
        cx="100"
        cy="100"
        r="30"
        fill="none"
        stroke="#c8281e"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeDasharray="155 38"
        strokeDashoffset="-8"
      />
      {/* Pupil */}
      <circle cx="100" cy="100" r="10" fill="#c8281e" className="pupil-pulse" />
      {/* Power stem */}
      <line
        x1="100"
        y1="54"
        x2="100"
        y2="78"
        stroke="#c8281e"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      {/* Q tail */}
      <path
        d="M 122 122 L 150 150"
        fill="none"
        stroke="#c8281e"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function QIconSmall({ size = 32 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
    >
      {/* Iris ring */}
      <circle
        cx="100"
        cy="100"
        r="30"
        fill="none"
        stroke="#c8281e"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="155 38"
        strokeDashoffset="-8"
      />
      {/* Pupil */}
      <circle cx="100" cy="100" r="12" fill="#c8281e" />
      {/* Power stem */}
      <line
        x1="100"
        y1="50"
        x2="100"
        y2="78"
        stroke="#c8281e"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Q tail */}
      <path
        d="M 122 122 L 154 154"
        fill="none"
        stroke="#c8281e"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-dark px-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <QIcon size={120} />
          <span className="font-chakra font-bold text-light text-6xl sm:text-7xl lg:text-8xl tracking-tight">
            Stve
          </span>
        </div>
        <p className="mt-8 font-mono uppercase text-light/40 text-xs sm:text-sm tracking-[0.25em]">
          Power On Intelligence
        </p>
      </section>

      {/* ABOUT */}
      <section className="bg-light text-dark py-20 sm:py-28 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-chakra font-semibold text-3xl sm:text-4xl mb-6">
            Man & Machine
          </h2>
          <p className="text-lg leading-relaxed text-dark/80">
            QStve is a personal AI system built for executive augmentation. It combines human judgment with autonomous intelligence to handle the operational complexity of modern leadership, from daily briefings and deal tracking to content strategy and home automation. One person, amplified.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark py-12 px-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
          <QIconSmall size={28} />
          <p className="font-mono text-light/30 text-xs tracking-wider">
            &copy; 2026 QStve
          </p>
        </div>
      </footer>
    </main>
  )
}
