import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import {
  Server, Cloud, Code2, Globe, Link2, ShieldCheck,
  ChevronRight, Sparkles
} from 'lucide-react'
import { staggerContainer, fadeUp } from '../../utils/animations'
import styles from './Services.module.css'

const services = [
  {
    Icon: Server, color: '#0057FF', bg: 'linear-gradient(135deg,#0057FF,#00C2FF)',
    title: 'IT Services',
    description: 'System & Network Administration, Server Management, IT Infrastructure, Application Administration.',
    tags: ['Infrastructure','Networking','Server Mgmt'],
  },
  {
    Icon: Cloud, color: '#00B894', bg: 'linear-gradient(135deg,#00B894,#00CEC9)',
    title: 'M-SaaS Products',
    description: 'Managed Software Application as a Service for Business, Industries and Enterprises — scalable and cost-effective.',
    tags: ['Cloud','SaaS','Managed'],
  },
  {
    Icon: Code2, color: '#7B61FF', bg: 'linear-gradient(135deg,#7B61FF,#A78BFA)',
    title: 'App Development',
    description: 'Full SDLC on Microsoft, Java, Open Source platforms for Cloud, Edge, Desktop and Mobile applications.',
    tags: ['Full SDLC','Mobile','Web'],
  },
  {
    Icon: Globe, color: '#FF6B35', bg: 'linear-gradient(135deg,#FF6B35,#FDCB6E)',
    title: 'E-Governance',
    description: 'End-to-End Enterprise Solutions for Government, State Owned Enterprises and PSUs enabling digital services.',
    tags: ['Government','PSU','Citizen'],
  },
  {
    Icon: Link2, color: '#E84393', bg: 'linear-gradient(135deg,#E84393,#A855F7)',
    title: 'Systems Integration',
    description: 'Seamlessly connect your IT and OT systems — bridging shop floor to top floor for complete operational visibility.',
    tags: ['IT/OT','API','Middleware'],
  },
  {
    Icon: ShieldCheck, color: '#0EA5E9', bg: 'linear-gradient(135deg,#0EA5E9,#38BDF8)',
    title: 'IT Security',
    description: 'Comprehensive security covering hardware, software, networking and data protection for enterprise environments.',
    tags: ['Security','Compliance','DLP'],
  },
]

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section id="services" className={styles.section} ref={ref}>
      {/* subtle top-right glow */}
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.container}>
        {/* Header */}
        <motion.div className={styles.header}
          variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.div className={styles.tagRow} variants={fadeUp}>
            <Sparkles size={13} strokeWidth={2.5} className={styles.tagIcon} />
            <span>What We Do</span>
          </motion.div>
          <motion.h2 className={styles.title} variants={fadeUp}>
            Many Ways to Address Your
            <span className={styles.accent}> Business Challenge</span>
          </motion.h2>
          <motion.p className={styles.desc} variants={fadeUp}>
            Project Based · Effort Based · Managed Services · Team Augmentation
          </motion.p>
        </motion.div>

        {/* Grid */}
        <div className={styles.grid}>
          {services.map((svc, i) => (
            <ServiceCard key={svc.title} svc={svc} index={i} inView={inView} />
          ))}
        </div>

        {/* CTA row */}
        <motion.div className={styles.ctaRow}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}>
          <Link to="/services" className={styles.allServicesBtn}>
            View All Services <ChevronRight size={15} strokeWidth={2.5} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function ServiceCard({ svc, index, inView }) {
  const { Icon, color, bg, title, description, tags } = svc
  return (
    <motion.div className={styles.card}
      style={{ '--c': color, '--bg': bg }}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.22 } }}>

      {/* Gradient top strip */}
      <div className={styles.topStrip} />

      {/* Icon block */}
      <div className={styles.iconBlock}>
        <div className={styles.iconGlow} aria-hidden="true" />
        <div className={styles.iconBox}>
          <Icon size={26} strokeWidth={1.5} />
        </div>
      </div>

      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{description}</p>

      <div className={styles.tags}>
        {tags.map(t => (
          <span key={t} className={styles.tag}>{t}</span>
        ))}
      </div>

      <div className={styles.cardFooter}>
        <Link to="/services" className={styles.learnMore}>
          Learn more <ChevronRight size={13} strokeWidth={2.5} />
        </Link>
      </div>
    </motion.div>
  )
}
