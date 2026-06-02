import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Server, Cloud, Code2, Globe, ShieldCheck, Link2,
  Users, Calendar, Layers, TrendingUp, CheckCircle2
} from 'lucide-react'
import styles from './Hero.module.css'

/* Floating tech icon orbs for the right side */
const techOrbs = [
  { Icon: Server,       label: 'IT Services',   color: '#0057FF', delay: 0.7,  x: 60,  y: 30  },
  { Icon: Cloud,        label: 'M-SaaS',        color: '#00C2FF', delay: 0.85, x: 220, y: 80  },
  { Icon: Code2,        label: 'App Dev',        color: '#7B61FF', delay: 1.0,  x: 30,  y: 200 },
  { Icon: Globe,        label: 'E-Governance',   color: '#FF6B35', delay: 1.15, x: 250, y: 220 },
  { Icon: ShieldCheck,  label: 'Security',       color: '#00B894', delay: 1.3,  x: 130, y: 310 },
  { Icon: Link2,        label: 'Integration',    color: '#E84393', delay: 1.45, x: 310, y: 150 },
]

const statCards = [
  { Icon: Calendar,   value: '35+',   label: 'Years',      color: '#0057FF' },
  { Icon: Users,      value: '500+',  label: 'Experts',    color: '#00B894' },
  { Icon: Layers,     value: '25+',   label: 'Verticals',  color: '#7B61FF' },
  { Icon: TrendingUp, value: '100K+', label: 'Users',      color: '#FF6B35' },
]

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.3,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      o: Math.random() * 0.45 + 0.08,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.o})`
        ctx.fill()
      })
      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 90) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255,255,255,${0.06 * (1 - d / 90)})`
            ctx.lineWidth = 0.6; ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section id="home" className={styles.hero}>
      <canvas ref={canvasRef} className={styles.particles} aria-hidden="true" />

      {/* decorative grid */}
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      <div className={styles.inner}>
        {/* ── LEFT CONTENT ── */}
        <div className={styles.left}>
          {/* Badge */}
          <motion.div className={styles.badge}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <span className={styles.badgePulse} />
            <CheckCircle2 size={13} strokeWidth={2.5} className={styles.badgeIcon} />
            CMMI Level 5 · Enabling IT Since 1991
          </motion.div>

          {/* Headline */}
          <motion.h1 className={styles.headline}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}>
            Enterprise Solutions
            <br />
            <span className={styles.headlineGrad}>for Govt, Business</span>
            <br />
            and Industries
          </motion.h1>

          <motion.p className={styles.sub}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}>
            We innovate and implement Digital Transformation to see your success — from
            Enterprise Application Development to full IT Infrastructure Management.
          </motion.p>

          {/* CTAs */}
          <motion.div className={styles.ctas}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.64 }}>
            <Link to="/contact" className={styles.ctaPrimary}>
              <span>Start Your Project</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <Link to="/services" className={styles.ctaSecondary}>
              <span>Explore Services</span>
            </Link>
          </motion.div>

          {/* Stat cards */}
          <div className={styles.statRow}>
            {statCards.map(({ Icon, value, label, color }, i) => (
              <motion.div key={label} className={styles.statCard}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.75 + i * 0.09, duration: 0.5 }}
                style={{ '--sc': color }}>
                <div className={styles.statCardIcon}><Icon size={17} strokeWidth={2} /></div>
                <div className={styles.statCardVal}>{value}</div>
                <div className={styles.statCardLabel}>{label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Tech-icon visual ── */}
        <div className={styles.right}>
          <motion.div className={styles.orbCanvas}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}>

            {/* Central glowing sphere */}
            <div className={styles.centerSphere}>
              <motion.div className={styles.sphereRing1}
                animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} />
              <motion.div className={styles.sphereRing2}
                animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} />
              <div className={styles.sphereCore}>
                <img
                  src="/espl-logo-wh2.png"
                  alt="E-Connect Solutions"
                  className={styles.sphereLogo}
                />
              </div>
            </div>

            {/* Floating tech orbs */}
            {techOrbs.map(({ Icon, label, delay, x, y }) => (
              <motion.div key={label} className={styles.techOrb}
                style={{ left: x, top: y }}
                initial={{ opacity: 0, scale: 0, x: -20, y: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                transition={{ delay, duration: 0.5, type: 'spring', stiffness: 200 }}>
                <motion.div className={styles.techOrbInner}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 2 }}>
                  <div className={styles.techOrbIcon}><Icon size={20} strokeWidth={1.5} /></div>
                  <span className={styles.techOrbLabel}>{label}</span>
                </motion.div>
              </motion.div>
            ))}

            {/* Dotted orbit rings */}
            <div className={styles.orbit1} aria-hidden="true" />
            <div className={styles.orbit2} aria-hidden="true" />
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div className={styles.scroll}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}>
        <div className={styles.scrollMouse}>
          <motion.div className={styles.scrollDot}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }} />
        </div>
        <span>Scroll</span>
      </motion.div>
    </section>
  )
}
