/**
 * Pre-written high-quality demo campaign content.
 * [COMPANY NAME] is replaced dynamically with the partner's company name.
 */

export function getDemoContent(companyName) {
  const name = companyName || 'Your Company';

  return {
    socialMedia: {
      'LinkedIn': [
        {
          copy: `Healthcare organisations that modernise their IT infrastructure report 62% efficiency gains and improved patient outcomes. Ready to transform yours? Our AWS-certified team has helped 40+ healthcare providers make the shift — securely and without downtime.`,
          imageCopy: 'Better patient care starts here',
          cta: 'Book your assessment',
          hashtags: ['#HealthTech', '#CloudTransformation', '#AWSPartner', '#DigitalHealth'],
        },
        {
          copy: `31% average cost reduction. 69% less downtime. 99.99% uptime. These aren't aspirations — they're the outcomes our healthcare clients achieve when they move to AWS. What could your organisation do with those savings reinvested in patient care?`,
          imageCopy: '31% cost reduction, zero compromise',
          cta: 'See how',
          hashtags: ['#HealthcareIT', '#CloudMigration', '#AWSPartner', '#PatientFirst'],
        },
        {
          copy: `Your patients expect always-on, personalised experiences. Your team deserves tools that work as hard as they do. We help ambitious healthcare providers build secure, scalable infrastructure on AWS — so you can focus on what matters most.`,
          imageCopy: 'Secure. Scalable. Patient-first.',
          cta: 'Talk to us',
          hashtags: ['#HealthcareInnovation', '#AWS', '#CloudSecurity', '#AWSPartner'],
        },
      ],
      'Twitter/X': [
        {
          copy: `62% efficiency gains. 31% cost reduction. 69% less downtime. That's what healthcare providers achieve with AWS. Ready to see what's possible for your organisation? 👇`,
          imageCopy: 'Modernise with confidence',
          cta: 'Book assessment',
          hashtags: ['#HealthTech', '#AWS', '#CloudFirst'],
        },
        {
          copy: `Your patients expect 24/7 availability. Your compliance team demands bulletproof security. AWS delivers both — and we make the migration seamless. No downtime. No drama.`,
          imageCopy: 'Always on. Always secure.',
          cta: 'Learn more',
          hashtags: ['#HealthcareIT', '#AWSPartner', '#CloudSecurity'],
        },
        {
          copy: `40+ healthcare providers trust us to manage their AWS infrastructure. Secure landing zones, automated compliance, peace of mind. What's stopping you?`,
          imageCopy: 'Trusted by 40+ providers',
          cta: 'Get started',
          hashtags: ['#DigitalHealth', '#AWS', '#ManagedCloud'],
        },
      ],
    },
    email: [
      {
        subjectLine: `Your infrastructure shouldn't hold back patient care`,
        preHeader: '62% efficiency gains and 31% cost reduction — see how healthcare leaders achieve both',
        headline: 'Modernise Your Healthcare Infrastructure',
        partnerSection: `At ${name}, we specialise in helping ambitious healthcare organisations move to the cloud — securely, compliantly, and without disrupting patient services.\n\nOur AWS-certified team has guided over 40 healthcare providers through successful cloud transformations, delivering measurable results:\n\n• 62% improvement in operational efficiency\n• 31% average reduction in infrastructure costs\n• 99.99% uptime with automated failover and disaster recovery\n\nWhether you're modernising legacy systems, strengthening your security posture, or preparing for AI-powered patient experiences — we'll build the foundation that makes it possible.`,
        ctaText: 'Book Your Free Assessment',
        awsSection: `${name} is a certified AWS Partner with deep healthcare expertise. AWS provides the most comprehensive cloud platform with 99.99% availability, built-in HIPAA eligibility, and over 200 security and compliance certifications.\n\nWith AWS, healthcare organisations benefit from:\n\n• Enterprise-grade security with automated compliance monitoring\n• Scalable infrastructure that grows with patient demand\n• AI and analytics capabilities to drive better clinical outcomes`,
      },
      {
        subjectLine: 'What would 31% cost savings mean for patient care?',
        preHeader: 'Reinvest infrastructure savings back into what matters most',
        headline: 'Reduce Costs, Improve Patient Outcomes',
        partnerSection: `Healthcare IT budgets are under pressure — but cutting technology spend shouldn't mean compromising on patient experience.\n\n${name} helps organisations like yours optimise infrastructure costs while simultaneously improving performance, security, and resilience.\n\nOur clients typically see a 31% reduction in infrastructure costs within the first year — savings that can be redirected to hiring clinicians, upgrading equipment, or expanding services.\n\nWe handle the complexity so your team can focus on care delivery.`,
        ctaText: 'See Your Savings Potential',
        awsSection: `Built on AWS, the world's most trusted cloud platform, our solutions give healthcare organisations the confidence to innovate without compromise. AWS offers pay-as-you-go pricing with no upfront commitments, automated resource optimisation, and the broadest set of healthcare-specific compliance certifications in the industry.`,
      },
      {
        subjectLine: 'Is your infrastructure ready for what\'s next?',
        preHeader: 'AI, personalisation, 24/7 availability — it all starts with the right foundation',
        headline: 'Future-Proof Your Healthcare Technology',
        partnerSection: `The healthcare organisations leading in patient satisfaction share one thing in common: a modern, cloud-native technology foundation.\n\n${name} builds that foundation on AWS — giving you the agility to adopt AI, the scalability to handle demand spikes, and the security to protect sensitive patient data.\n\nFrom automated compliance monitoring to disaster recovery in under 5 minutes, we design infrastructure that gives your leadership team peace of mind — and your clinical teams the tools they need to deliver exceptional care.`,
        ctaText: 'Book a Free Cloud Assessment',
        awsSection: `AWS is the platform of choice for healthcare innovators. With Amazon Bedrock for generative AI, Amazon Connect for patient engagement, and AWS HealthLake for clinical data — the building blocks for the future of healthcare are ready today. ${name}, an AWS Partner, helps you put them together.`,
      },
    ],
    bannerAds: [
      {
        headline: 'Secure cloud for ambitious healthcare providers',
        subheadline: `${name} — Your Trusted AWS Partner`,
        ctaText: 'Book your assessment',
        sizes: ['Leaderboard (728x90)', 'Medium Rectangle (300x250)', 'Skyscraper (160x600)'],
      },
      {
        headline: '31% cost reduction. Zero compromise on patient care.',
        subheadline: `Proven results with ${name} + AWS`,
        ctaText: 'See how',
        sizes: ['Leaderboard (728x90)', 'Medium Rectangle (300x250)', 'Skyscraper (160x600)'],
      },
      {
        headline: 'Your patients deserve always-on, always-secure technology',
        subheadline: `${name} delivers 99.99% uptime on AWS`,
        ctaText: 'Talk to us',
        sizes: ['Leaderboard (728x90)', 'Medium Rectangle (300x250)', 'Skyscraper (160x600)'],
      },
    ],
    landingPage: {
      hero: {
        headline: 'Modernise Your Healthcare Infrastructure',
        subheadline: 'Deliver better patient outcomes with secure, scalable AWS cloud solutions',
        ctaText: 'Book Your Free Cloud Assessment',
      },
      valueProps: [
        { title: '62% Efficiency Gains', description: 'Streamline operations and free your team to focus on patient care with automated, cloud-native infrastructure.' },
        { title: '31% Cost Reduction', description: 'Optimise your IT spend with pay-as-you-go pricing and intelligent resource management — reinvest savings into frontline services.' },
        { title: '99.99% Uptime', description: 'Deliver always-on patient experiences with automated failover, disaster recovery, and enterprise-grade resilience.' },
      ],
      partnerSection: {
        headline: `Why ${name}?`,
        body: `${name} specialises in cloud transformation for ambitious healthcare organisations. Our AWS-certified team has helped over 40 providers modernise their infrastructure — reducing costs, improving resilience, and enabling the next generation of patient-centred technology.\n\nWe understand the unique challenges of healthcare IT: strict compliance requirements, zero tolerance for downtime, and the need to balance innovation with security. That's why we've built proven frameworks specifically for healthcare migration — so you can modernise with confidence.\n\nOur clients achieve measurable outcomes within the first year: 62% operational efficiency gains, 31% cost reduction, and 99.99% uptime with automated disaster recovery.`,
      },
      awsSection: {
        headline: 'Powered by AWS',
        body: `${name} is a certified AWS Partner. AWS provides the most comprehensive, broadly adopted cloud platform in the world, with over 200 fully-featured services. For healthcare organisations, AWS offers built-in HIPAA eligibility, automated compliance monitoring, and the industry's broadest set of security certifications — giving you the peace of mind to innovate without compromise.`,
      },
      form: {
        headline: `Get Started with ${name}`,
        subtext: 'Fill in your details and our team will be in touch within 24 hours.',
        fields: ['Name', 'Email', 'Company', 'Phone', 'Job title'],
        buttonText: 'Book Your Free Cloud Assessment',
      },
      socialProof: {
        headline: 'Trusted by Industry Leaders',
        testimonial: `"${name} helped us migrate to AWS in half the time we expected. Their expertise with healthcare compliance was invaluable — we achieved full HIPAA compliance from day one." — NHS Trust IT Director`,
        logos: ['NHS Trust', 'Private Hospital Group', 'Health Tech Startup', 'Pharma Enterprise'],
      },
      faq: [
        { q: `What makes ${name} different from other AWS Partners?`, a: `${name} combines deep technical expertise with healthcare-specific knowledge. Our team includes former NHS IT leaders and certified AWS architects who understand both the technology and the regulatory landscape.` },
        { q: 'How long does a typical cloud migration take?', a: 'Most healthcare migrations are delivered within 8-16 weeks depending on scope and complexity. We use phased approaches to ensure zero disruption to patient services.' },
        { q: 'How do you handle data security and compliance?', a: 'Security is built into every layer. We implement automated compliance monitoring, encryption at rest and in transit, and maintain all relevant healthcare certifications including HIPAA, NHS DSPT, and Cyber Essentials Plus.' },
      ],
      confirmation: {
        title: 'Your Healthcare Cloud Assessment Guide',
        recap: 'Your guide includes a cloud readiness checklist, cost comparison framework, and migration timeline template specifically designed for healthcare organisations.',
      },
    },
  };
}
