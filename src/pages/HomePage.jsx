import React from 'react'

function HomePage() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[var(--background)]">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background to-background/50" />
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
         </div>
  )
}

export default HomePage