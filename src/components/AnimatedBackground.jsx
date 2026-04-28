import React from 'react'
import '../styles/AnimatedBackground.css'

const AnimatedBackground = () => {
  return (
    <div className="animated-bg" aria-hidden="true">
      {/* Layer 1: Animated base gradient */}
      <div className="animated-bg__base" />

      {/* Layer 2: Mesh gradient (radial overlaps) */}
      <div className="animated-bg__mesh" />

      {/* Layer 3: Floating orbs */}
      <div className="animated-bg__orbs">
        <div className="orb orb--1" />
        <div className="orb orb--2" />
        <div className="orb orb--3" />
        <div className="orb orb--4" />
        <div className="orb orb--5" />
        <div className="orb orb--6" />
      </div>

      {/* Layer 4: Aurora light streaks */}
      <div className="animated-bg__aurora">
        <div className="aurora-streak aurora-streak--1" />
        <div className="aurora-streak aurora-streak--2" />
        <div className="aurora-streak aurora-streak--3" />
      </div>

      {/* Layer 5: Rising particles */}
      <div className="animated-bg__particles">
        <div className="particle particle--1" />
        <div className="particle particle--2" />
        <div className="particle particle--3" />
        <div className="particle particle--4" />
        <div className="particle particle--5" />
        <div className="particle particle--6" />
        <div className="particle particle--7" />
        <div className="particle particle--8" />
        <div className="particle particle--9" />
        <div className="particle particle--10" />
      </div>

      {/* Layer 6: Geometric accents */}
      <div className="animated-bg__geo">
        <div className="geo-ring geo-ring--1" />
        <div className="geo-ring geo-ring--2" />
        <div className="geo-ring geo-ring--3" />
      </div>

      {/* Layer 7: Shimmer sweep */}
      <div className="animated-bg__shimmer" />

      {/* Layer 8: Noise texture for depth */}
      <div className="animated-bg__noise" />
    </div>
  )
}

export default AnimatedBackground
