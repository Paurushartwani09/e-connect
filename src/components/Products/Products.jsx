import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { staggerContainer, fadeUp } from '../../utils/animations'
import styles from './Products.module.css'

const products = [
  {
    id: 'erp',
    icon: '📊',
    title: 'ERP System',
    category: 'Enterprise',
    desc: 'Comprehensive Enterprise Resource Planning covering Finance, HR, Procurement, and Operations in a unified platform.',
    features: ['Finance & Accounting', 'HR & Payroll', 'Inventory Management', 'Procurement'],
    deployments: ['Cloud', 'On-Premise', 'SaaS'],
  },
  {
    id: 'ats',
    icon: '👥',
    title: 'Applicant Tracking',
    category: 'HR Tech',
    desc: 'End-to-end recruitment management system for streamlining hiring workflows and talent acquisition.',
    features: ['Job Posting', 'Resume Screening', 'Interview Scheduling', 'Offer Management'],
    deployments: ['SaaS', 'Multi-Tenant'],
  },
  {
    id: 'citizen',
    icon: '🏛️',
    title: 'Citizen Services',
    category: 'E-Governance',
    desc: 'Digital platform enabling governments to deliver seamless citizen services and improve public administration.',
    features: ['Service Delivery', 'Document Management', 'Grievance Redressal', 'Payments'],
    deployments: ['Cloud', 'Edge', 'On-Premise'],
  },
  {
    id: 'support',
    icon: '🎧',
    title: 'Customer Support',
    category: 'CRM',
    desc: 'Omnichannel customer support platform with ticketing, SLA management, and analytics dashboard.',
    features: ['Ticket Management', 'SLA Tracking', 'Multi-channel', 'Analytics'],
    deployments: ['SaaS', 'Cloud'],
  },
  {
    id: 'auction',
    icon: '🔨',
    title: 'Auction Platform',
    category: 'Commerce',
    desc: 'Real-time online auction system for government and enterprise procurement with full audit trails.',
    features: ['Real-time Bidding', 'Vendor Management', 'Audit Trail', 'Reporting'],
    deployments: ['Cloud', 'SaaS'],
  },
  {
    id: 'loans',
    icon: '💰',
    title: 'Loan Management',
    category: 'FinTech',
    desc: 'Complete loan lifecycle management for NBFCs and PF Trusts — from origination to closure.',
    features: ['Loan Origination', 'EMI Calculation', 'Collections', 'Compliance'],
    deployments: ['Cloud', 'On-Premise'],
  },
]

const deploymentColors = {
  'Cloud': '#0057FF',
  'SaaS': '#00C2FF',
  'On-Premise': '#7B61FF',
  'Edge': '#FF6B35',
  'Multi-Tenant': '#00B894',
}

export default function Products() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [activeProduct, setActiveProduct] = useState(null)

  return (
    <section id="products" className={styles.products} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.span className={styles.sectionTag} variants={fadeUp}>
            Products We Offer
          </motion.span>
          <motion.h2 className={styles.title} variants={fadeUp}>
            Enterprise Products for
            <span className={styles.titleAccent}> Every Application</span>
          </motion.h2>
          <motion.p className={styles.desc} variants={fadeUp}>
            ERP, Applicant Tracking, Citizen Services, Customer Support, Auction, Loans and more —
            covering the entire spectrum of enterprise business processes with various ROI models.
          </motion.p>
        </motion.div>

        {/* Deployment badges */}
        <motion.div
          className={styles.deployBadges}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {['Cloud', 'Edge', 'On-Premise', 'SaaS', 'Managed SaaS', 'Web', 'Desktop', 'Mobile'].map(d => (
            <span key={d} className={styles.deployBadge}>{d}</span>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className={styles.grid}>
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              className={`${styles.card} ${activeProduct === product.id ? styles.cardActive : ''}`}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => setActiveProduct(activeProduct === product.id ? null : product.id)}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardIconWrap}>
                  <span className={styles.cardIcon}>{product.icon}</span>
                </div>
                <span className={styles.cardCategory}>{product.category}</span>
              </div>

              <h3 className={styles.cardTitle}>{product.title}</h3>
              <p className={styles.cardDesc}>{product.desc}</p>

              <AnimatePresence>
                {activeProduct === product.id && (
                  <motion.div
                    className={styles.cardExpanded}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.featureList}>
                      {product.features.map(f => (
                        <div key={f} className={styles.featureItem}>
                          <span className={styles.featureDot} />
                          {f}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className={styles.cardFooter}>
                <div className={styles.deployTags}>
                  {product.deployments.map(d => (
                    <span
                      key={d}
                      className={styles.deployTag}
                      style={{ '--deploy-color': deploymentColors[d] || '#0057FF' }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
                <button className={styles.expandBtn} aria-label="Expand details">
                  <motion.span
                    animate={{ rotate: activeProduct === product.id ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    +
                  </motion.span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tenancy note */}
        <motion.div
          className={styles.tenancyNote}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <span>🔧</span>
          <span>Single Tenant or Multi-Tenant &nbsp;·&nbsp; Various ROI Models Available</span>
        </motion.div>
      </div>
    </section>
  )
}
