/**
 * Mock content generator — produces realistic placeholder campaign assets
 * based on the user's form data. Will be replaced with real AI API later.
 */

export function generateMockContent(formData) {
  const { assets, details, assetDetails } = formData;
  const company = details.partnerName || 'Your Company';
  const cta = details.cta || 'Learn more';
  const objective = details.campaignObjective || 'Brand Awareness';
  const audience = details.targetAudience || 'technology decision-makers';
  const services = (details.awsServices || []).join(', ') || 'AWS Cloud Services';
  const tone = details.tone || 'Professional';

  const result = {};

  if (assets.includes('social-media')) {
    const socialData = assetDetails.socialMedia || {};
    const platforms = socialData.platforms || ['LinkedIn'];
    const variationCount = parseInt(socialData.variations) || 3;
    const hashtags = socialData.hashtags !== false;

    result.socialMedia = {};
    platforms.forEach((platform) => {
      const posts = [];
      for (let i = 0; i < variationCount; i++) {
        posts.push(generateSocialPost(company, cta, services, platform, hashtags, objective, i));
      }
      result.socialMedia[platform] = posts;
    });
  }

  if (assets.includes('email')) {
    const emailData = assetDetails.email || {};
    const variationCount = parseInt(emailData.variations) || 2;
    result.email = [];
    for (let i = 0; i < variationCount; i++) {
      result.email.push(generateEmailVariation(company, cta, services, objective, audience, i));
    }
  }

  if (assets.includes('banner-ads')) {
    const bannerData = assetDetails.bannerAds || {};
    const sizes = bannerData.sizes || ['Medium Rectangle (300x250)'];
    const variationCount = parseInt(bannerData.variations) || 2;
    result.bannerAds = [];
    for (let i = 0; i < variationCount; i++) {
      result.bannerAds.push(generateBannerVariation(company, cta, services, objective, sizes, i));
    }
  }

  if (assets.includes('landing-page')) {
    const landingData = assetDetails.landingPage || {};
    result.landingPage = generateLandingPage(company, cta, services, objective, audience, landingData);
  }

  return result;
}

function generateSocialPost(company, cta, services, platform, hashtags, objective, index) {
  const posts = [
    {
      copy: `🚀 ${company} + AWS: A partnership built for innovation. Together, we're helping organisations harness the power of ${services} to transform their operations and drive real results.\n\nReady to see what's possible?`,
      imageCopy: `Split visual: ${company} logo on left, AWS smile logo on right, connected by a glowing data stream`,
      cta: cta,
      hashtags: hashtags ? [`#${company.replace(/\s+/g, '')}`, '#AWSPartner', '#CloudInnovation', '#DigitalTransformation'] : [],
    },
    {
      copy: `The future of cloud is here. ${company} is leveraging ${services} to deliver faster, smarter, and more secure solutions for our customers.\n\n${objective === 'Lead Generation' ? 'Download our free guide to learn how.' : 'Discover how we can help your business grow.'}`,
      imageCopy: `Abstract cloud architecture diagram with ${company} branding and AWS service icons highlighted`,
      cta: cta,
      hashtags: hashtags ? [`#${company.replace(/\s+/g, '')}`, '#AWS', '#CloudFirst', '#Innovation'] : [],
    },
    {
      copy: `"Working with AWS has allowed us to scale our solutions globally while maintaining enterprise-grade security." — ${company} CTO\n\nLearn how our joint solutions powered by ${services} are making a difference.`,
      imageCopy: `Quote card with ${company} executive headshot placeholder, company colours as background gradient`,
      cta: cta,
      hashtags: hashtags ? [`#${company.replace(/\s+/g, '')}`, '#AWSPartner', '#CustomerSuccess', '#CloudComputing'] : [],
    },
  ];

  return posts[index % posts.length];
}

function generateEmailVariation(company, cta, services, objective, audience, index) {
  const variations = [
    {
      subjectLine: `Unlock Cloud Innovation with ${company} and AWS`,
      preHeader: `Discover how ${services} can transform your business`,
      headline: `Transform Your Business with ${company} + AWS`,
      partnerSection: `${company} brings deep expertise in cloud transformation, helping ${audience} achieve their goals faster. Our certified AWS engineers have delivered 100+ successful migrations and modernisation projects across industries.\n\nWith our proven methodology and AWS best practices, we help you reduce costs by up to 40% while improving performance and security.`,
      ctaText: cta,
      awsSection: `Powered by ${services}, our joint solutions deliver enterprise-grade reliability with 99.99% uptime. AWS's global infrastructure ensures your applications perform at scale, wherever your customers are.`,
    },
    {
      subjectLine: `${company} + AWS: Your Fast Track to Cloud Success`,
      preHeader: `Join leading organisations already benefiting from our partnership`,
      headline: `Why Leading Organisations Choose ${company} on AWS`,
      partnerSection: `As an AWS Partner, ${company} combines industry knowledge with cloud expertise to deliver solutions tailored for ${audience}. Our team has helped organisations of all sizes modernise their infrastructure and unlock new capabilities.\n\nFrom migration to optimisation, we're with you every step of the way.`,
      ctaText: cta,
      awsSection: `Built on ${services}, our solutions leverage the full breadth of AWS's 200+ services. Whether you're looking to innovate with AI/ML, improve data analytics, or strengthen your security posture, we have you covered.`,
    },
    {
      subjectLine: `Ready to Innovate? ${company} Makes It Simple with AWS`,
      preHeader: `See how we're helping businesses like yours succeed in the cloud`,
      headline: `Innovation Made Simple: ${company} + AWS`,
      partnerSection: `At ${company}, we believe cloud transformation shouldn't be complicated. That's why we've built streamlined processes and accelerators that get you to value faster.\n\nOur partnership with AWS means you get the best of both worlds: ${company}'s hands-on expertise and AWS's world-class platform.`,
      ctaText: cta,
      awsSection: `With ${services} at the core, your infrastructure is built for the future. Scale on demand, pay only for what you use, and innovate without limits.`,
    },
  ];

  return variations[index % variations.length];
}

function generateBannerVariation(company, cta, services, objective, sizes, index) {
  const variations = [
    {
      headline: `${company} + AWS: Innovate Without Limits`,
      subheadline: `Harness the power of ${services}`,
      ctaText: cta,
      sizes: sizes,
    },
    {
      headline: `Cloud Transformation Starts Here`,
      subheadline: `${company} — Your Trusted AWS Partner`,
      ctaText: cta,
      sizes: sizes,
    },
    {
      headline: `Faster. Smarter. More Secure.`,
      subheadline: `${company} delivers results with ${services}`,
      ctaText: cta,
      sizes: sizes,
    },
  ];

  return variations[index % variations.length];
}

function generateLandingPage(company, cta, services, objective, audience, landingData) {
  const includeForm = landingData.includeForm !== false;
  const socialProof = landingData.socialProof === true;
  const faq = landingData.faq === true;

  return {
    hero: {
      headline: `Transform Your Business with ${company} and AWS`,
      subheadline: `Unlock the full potential of ${services} with a trusted AWS Partner. Purpose-built solutions for ${audience}.`,
      ctaText: cta,
    },
    valueProps: [
      { title: 'Proven Expertise', description: `${company}'s certified engineers bring deep AWS knowledge to every engagement.` },
      { title: 'Faster Time to Value', description: 'Our accelerators and proven methodology get you to production 3x faster.' },
      { title: 'Enterprise Security', description: `Built on AWS best practices with ${services} for compliance and governance.` },
    ],
    partnerSection: {
      headline: `Why ${company}?`,
      body: `As an AWS Partner, ${company} combines industry expertise with cloud-native solutions to help ${audience} achieve their goals. Our team has delivered hundreds of successful projects across industries, earning the trust of organisations worldwide.`,
    },
    awsSection: {
      headline: 'Powered by AWS',
      body: `Our solutions leverage ${services} to deliver scalable, secure, and cost-effective infrastructure. With AWS's global network of data centres, your applications perform at their best — wherever your users are.`,
    },
    form: includeForm ? {
      headline: `Get Started with ${company}`,
      subtext: 'Fill in your details and our team will be in touch within 24 hours.',
      fields: landingData.formFields || ['Name', 'Email', 'Company'],
      buttonText: cta,
    } : null,
    socialProof: socialProof ? {
      headline: 'Trusted by Industry Leaders',
      testimonial: `"${company} helped us migrate to AWS in half the time we expected. Their expertise with ${services} was invaluable." — Enterprise Customer`,
      logos: ['Company A', 'Company B', 'Company C', 'Company D'],
    } : null,
    faq: faq ? [
      { q: `What makes ${company} different from other AWS Partners?`, a: `${company} combines deep technical expertise with industry-specific knowledge, delivering solutions tailored for ${audience}.` },
      { q: 'How long does a typical engagement take?', a: 'Most projects are delivered within 4-12 weeks depending on scope and complexity.' },
      { q: 'What AWS services do you specialise in?', a: `We have deep expertise in ${services}, with certified engineers across all major AWS service areas.` },
    ] : null,
  };
}
