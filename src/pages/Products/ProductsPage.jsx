import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import {
  FiBox, FiBarChart2, FiUsers, FiGlobe, FiHeadphones,
  FiDollarSign, FiTrendingUp, FiCheckCircle, FiArrowRight,
  FiCloud, FiMonitor, FiSmartphone, FiServer, FiLayers, FiMail
} from 'react-icons/fi'
import PageHero from '../../components/PageHero/PageHero'
import styles from './ProductsPage.module.css'

const products = [
  {
    id: 'erp', icon: FiBarChart2, color: '#0057FF',
    gradient: 'linear-gradient(135deg,#0057FF,#00C2FF)',
    title: 'Enterprise ERP', category: 'Enterprise Resource Planning',
    tagline: 'Unify your entire business on one platform',
    desc: 'A comprehensive ERP covering Finance, HR, Procurement, Inventory, and Operations — built for enterprises that demand reliability and scale.',
    modules: ['Finance & Accounting','HR & Payroll','Inventory Management','Procurement & Sourcing','Project Management','Reporting & Analytics'],
    deployments: ['Cloud','On-Premise','SaaS'],
    clients: '80+', industries: '15+',
  },
  {
    id: 'ats', icon: FiUsers, color: '#7B61FF',
    gradient: 'linear-gradient(135deg,#7B61FF,#A78BFA)',
    title: 'Applicant Tracking', category: 'HR Technology',
    tagline: 'Hire smarter, faster, better',
    desc: 'End-to-end recruitment management — from job posting to onboarding — with AI-assisted screening and collaborative hiring workflows.',
    modules: ['Job Posting & Distribution','Resume Parsing & Screening','Interview Scheduling','Offer Management','Onboarding Workflows','Analytics Dashboard'],
    deployments: ['SaaS','Multi-Tenant'],
    clients: '40+', industries: '10+',
  },
  {
    id: 'citizen', icon: FiGlobe, color: '#FF6B35',
    gradient: 'linear-gradient(135deg,#FF6B35,#FDCB6E)',
    title: 'Citizen Services', category: 'E-Governance',
    tagline: 'Government services at citizens\' fingertips',
    desc: 'A unified digital platform enabling governments to deliver seamless, transparent, and efficient citizen services across departments.',
    modules: ['Service Request Portal','Document Management','Online Payments','Grievance Redressal','Status Tracking','Audit & Compliance'],
    deployments: ['Cloud','Edge','On-Premise'],
    clients: '60+', industries: 'Govt.',
  },
  {
    id: 'support', icon: FiHeadphones, color: '#00B894',
    gradient: 'linear-gradient(135deg,#00B894,#00CEC9)',
    title: 'Customer Support', category: 'CRM & Helpdesk',
    tagline: 'Delight customers at every touchpoint',
    desc: 'Omnichannel customer support with intelligent ticket routing, SLA management, and real-time analytics for superior service delivery.',
    modules: ['Ticket Management','SLA Tracking','Multi-channel Inbox','Knowledge Base','Customer Portal','Performance Analytics'],
    deployments: ['SaaS','Cloud'],
    clients: '50+', industries: '12+',
  },
  {
    id: 'auction', icon: FiTrendingUp, color: '#E84393',
    gradient: 'linear-gradient(135deg,#E84393,#A855F7)',
    title: 'Auction Platform', category: 'Commerce & Procurement',
    tagline: 'Transparent, real-time procurement auctions',
    desc: 'A secure online auction system for government and enterprise procurement with real-time bidding, vendor management, and complete audit trails.',
    modules: ['Real-time Bidding Engine','Vendor Registration','Bid Management','Auction Scheduling','Audit Trail','Reporting & Exports'],
    deployments: ['Cloud','SaaS'],
    clients: '30+', industries: 'Govt. & Enterprise',
  },
  {
    id: 'loans', icon: FiDollarSign, color: '#0EA5E9',
    gradient: 'linear-gradient(135deg,#0EA5E9,#38BDF8)',
    title: 'Loan Management', category: 'FinTech',
    tagline: 'Complete loan lifecycle in one system',
    desc: 'Full loan lifecycle management for NBFCs and PF Trusts — from origination and disbursement to collections and closure with regulatory compliance.',
    modules: ['Loan Origination','Credit Assessment','Disbursement Management','EMI & Repayment','Collections Module','Regulatory Compliance'],
    deployments: ['Cloud','On-Premise'],
    clients: '25+', industries: 'NBFC & PF',
  },
]

const deployIcons = { Cloud: FiCloud, 'On-Premise': FiServer, SaaS: FiLayers, 'Multi-Tenant': FiMonitor, Edge: FiSmartphone }

export default function ProductsPage() {
  const [selected, setSelected] = useState(products[0].id)
  const active = products.find(p => p.id === selected)
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <PageHero
        icon={FiBox}
        tag="Products We Offer"
        title="Enterprise Products"
        accent="for Every Application"
        description="ERP, HR Tech, E-Governance, CRM, Auction, and FinTech — covering the entire spectrum of enterprise business processes."
        breadcrumb="Products"
        gradient="linear-gradient(135deg,#001F6B 0%,#7B61FF 60%,#E84393 100%)"
      />

      {/* ── Product Explorer ── */}
      <section className={styles.explorerSection} ref={ref}>
        <div className={styles.container}>
          <div className={styles.explorer}>
            {/* Sidebar */}
            <div className={styles.sidebar}>
              <p className={styles.sidebarLabel}>Select a Product</p>
              {products.map((p, i) => {
                const Icon = p.icon
                return (
                  <motion.button
                    key={p.id}
                    className={`${styles.sidebarItem} ${selected === p.id ? styles.sidebarActive : ''}`}
                    style={{ '--pc': p.color }}
                    onClick={() => setSelected(p.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    whileHover={{ x: 4, transition: { duration: 0.15 } }}
                  >
                    <div className={styles.sidebarIcon}><Icon size={18} /></div>
                    <div className={styles.sidebarText}>
                      <span className={styles.sidebarTitle}>{p.title}</span>
                      <span className={styles.sidebarCat}>{p.category}</span>
                    </div>
                    {selected === p.id && <FiArrowRight size={14} className={styles.sidebarArrow} />}
                  </motion.button>
                )
              })}
            </div>

            {/* Detail Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                className={styles.detailPanel}
                style={{ '--pc': active.color, '--pg': active.gradient }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Header */}
                <div className={styles.detailHeader}>
                  <div className={styles.detailIconWrap}>
                    <active.icon size={32} />
                  </div>
                  <div>
                    <span className={styles.detailCat}>{active.category}</span>
                    <h2 className={styles.detailTitle}>{active.title}</h2>
                    <p className={styles.detailTagline}>{active.tagline}</p>
                  </div>
                </div>

                <p className={styles.detailDesc}>{active.desc}</p>

                {/* Stats */}
                <div className={styles.detailStats}>
                  <div className={styles.detailStat}>
                    <span className={styles.detailStatVal}>{active.clients}</span>
                    <span className={styles.detailStatLabel}>Clients</span>
                  </div>
                  <div className={styles.detailStat}>
                    <span className={styles.detailStatVal}>{active.industries}</span>
                    <span className={styles.detailStatLabel}>Industries</span>
                  </div>
                  <div className={styles.detailStat}>
                    <span className={styles.detailStatVal}>{active.deployments.length}</span>
                    <span className={styles.detailStatLabel}>Deploy Options</span>
                  </div>
                </div>

                {/* Modules */}
                <div className={styles.modulesSection}>
                  <h4 className={styles.modulesTitle}>Key Modules</h4>
                  <div className={styles.modulesGrid}>
                    {active.modules.map(m => (
                      <div key={m} className={styles.moduleItem}>
                        <FiCheckCircle size={14} className={styles.moduleCheck} />
                        {m}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deployments */}
                <div className={styles.deploySection}>
                  <h4 className={styles.deployTitle}>Deployment Options</h4>
                  <div className={styles.deployTags}>
                    {active.deployments.map(d => {
                      const DIcon = deployIcons[d] || FiCloud
                      return (
                        <span key={d} className={styles.deployTag}>
                          <DIcon size={13} /> {d}
                        </span>
                      )
                    })}
                  </div>
                </div>

                <Link to="/contact" className={styles.detailCta}>
                  <FiMail size={15} /> Request a Demo
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── All Products Grid ── */}
      <AllProductsGrid inView={inView} />

      {/* ── CTA ── */}
      <ProductsCta />
    </motion.div>
  )
}

function AllProductsGrid({ inView }) {
  return (
    <section className={styles.gridSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>At a Glance</span>
          <h2 className={styles.sectionTitle}>All <span className={styles.accent}>Products</span></h2>
        </div>
        <div className={styles.allGrid}>
          {products.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.id}
                className={styles.gridCard}
                style={{ '--pc': p.color, '--pg': p.gradient }}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <div className={styles.gridCardIcon}><Icon size={24} /></div>
                <h3 className={styles.gridCardTitle}>{p.title}</h3>
                <p className={styles.gridCardCat}>{p.category}</p>
                <p className={styles.gridCardDesc}>{p.desc.slice(0, 90)}…</p>
                <div className={styles.gridCardFooter}>
                  <span className={styles.gridCardClients}>{p.clients} clients</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ProductsCta() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  return (
    <section className={styles.ctaSection} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.ctaBanner}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.ctaOrb} />
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>See Our Products in Action</h2>
            <p className={styles.ctaDesc}>Request a live demo and discover how our products can transform your operations.</p>
            <div className={styles.ctaBtns}>
              <Link to="/contact" className={styles.ctaPrimary}><FiMail size={16} /> Request Demo</Link>
              <Link to="/services" className={styles.ctaSecondary}>Our Services <FiArrowRight size={14} /></Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
