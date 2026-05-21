import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Build the system prompt for campaign generation.
 */
function buildSystemPrompt() {
  return `You are an expert marketing copywriter specialising in AWS Partner co-branded campaigns. You generate professional, compelling marketing content that follows AWS co-branding guidelines.

Your output must be valid JSON matching the exact structure requested. Do not include any text outside the JSON object. Do not wrap in markdown code fences.

Guidelines:
- Use the partner's company name naturally throughout the copy
- Reference specific AWS services they selected
- Match the requested tone of voice
- Tailor content to the target audience and industry
- Align with the stated campaign objective
- Include the specified call-to-action
- Keep social media posts platform-appropriate (LinkedIn = professional, Twitter/X = concise, etc.)
- Email copy should be ready-to-use with clear structure
- Banner ad headlines should be punchy and fit within ad dimensions
- Landing page copy should follow conversion best practices`;
}

/**
 * Build the user prompt from form data.
 */
function buildUserPrompt(formData) {
  const { assets, details, assetDetails } = formData;

  let prompt = `Generate a complete co-branded marketing campaign with the following specifications:

## Campaign Brief
- Partner Company: ${details.partnerName || 'Partner'}
- AWS Partner Badge Tier: ${details.partnerBadge || 'Not specified'}
- Target Audience: ${details.targetAudience || 'Technology decision-makers'}
- Industry: ${details.industry === 'Other' ? details.industryOther : details.industry || 'Technology'}
- Geographic Region: ${details.geoRegion || 'Global'}
- Markets: ${(details.geoMarkets || []).join(', ') || 'Global'}
- Campaign Objective: ${details.campaignObjective || 'Brand Awareness'}
- Key Message: ${details.keyMessage || 'Cloud innovation partnership'}
- Call-to-Action: ${details.cta || 'Learn more'}
- AWS Product Area: ${details.awsProductArea || 'General'}
- AWS Services: ${(details.awsServices || []).join(', ') || 'AWS Cloud Services'}
- Tone of Voice: ${details.tone || 'Professional'}

## Required Output
Generate content as a JSON object with the following structure:
{`;

  if (assets.includes('social-media')) {
    const socialData = assetDetails.socialMedia || {};
    const platforms = socialData.platforms || ['LinkedIn'];
    const variationCount = parseInt(socialData.variations) || 3;

    prompt += `
  "socialMedia": {
    // One key per platform: ${platforms.join(', ')}
    // Each platform has an array of ${variationCount} post objects
    // Each post: { "copy": "post text", "imageCopy": "5-7 word graphic overlay text", "cta": "CTA text", "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4"] }
    ${platforms.map(p => `"${p}": [${variationCount} posts]`).join(',\n    ')}
  },`;

    prompt += `\n\nSocial Media Requirements:
- Content style: ${socialData.contentStyle || 'Informative'}
- Include hashtags: ${socialData.hashtags !== false ? 'Yes (4 relevant hashtags per post)' : 'No (empty array)'}
- Imagery direction: ${socialData.imagery || 'Professional and modern'}
- Make each variation distinct in angle/approach
- imageCopy should be 5-7 impactful words suitable for a graphic overlay\n`;
  }

  if (assets.includes('email')) {
    const emailData = assetDetails.email || {};
    const variationCount = parseInt(emailData.variations) || 2;

    prompt += `
  "email": [
    // Array of ${variationCount} email variation objects
    // Each: { "subjectLine": "", "preHeader": "", "headline": "", "partnerSection": "2-3 paragraphs about the partner", "ctaText": "", "awsSection": "1-2 paragraphs about AWS services" }
  ],`;

    prompt += `\n\nEmail Requirements:
- Email type: ${emailData.emailType || 'Promotional'}
- Subject line approach: ${emailData.subjectApproach || 'Benefit-led'}
- Email length: ${emailData.emailLength || 'Medium (150-300 words)'}
- Include pre-header: ${emailData.preHeader !== false ? 'Yes' : 'No'}
- Each variation should have a different angle/hook\n`;
  }

  if (assets.includes('banner-ads')) {
    const bannerData = assetDetails.bannerAds || {};
    const sizes = bannerData.sizes || ['Medium Rectangle (300x250)'];
    const variationCount = parseInt(bannerData.variations) || 2;

    prompt += `
  "bannerAds": [
    // Array of ${variationCount} banner variation objects
    // Each: { "headline": "short punchy headline", "subheadline": "supporting line", "ctaText": "CTA button text", "sizes": ${JSON.stringify(sizes)} }
  ],`;

    prompt += `\n\nBanner Ad Requirements:
- Headline approach: ${bannerData.headlineApproach || 'Benefit-led'}
- Headlines must be concise (under 8 words)
- Subheadlines under 12 words
- Each variation should have a different angle\n`;
  }

  if (assets.includes('landing-page')) {
    const landingData = assetDetails.landingPage || {};
    const includeForm = landingData.includeForm !== false;
    const socialProof = landingData.socialProof === true;
    const faq = landingData.faq === true;

    prompt += `
  "landingPage": {
    "hero": { "headline": "", "subheadline": "2-3 sentences", "ctaText": "" },
    "valueProps": [
      { "title": "short title", "description": "1-2 sentences" },
      { "title": "", "description": "" },
      { "title": "", "description": "" }
    ],
    "partnerSection": { "headline": "", "body": "2-3 paragraphs" },
    "awsSection": { "headline": "", "body": "1-2 paragraphs" }${includeForm ? `,
    "form": { "headline": "", "subtext": "", "fields": ${JSON.stringify(landingData.formFields || ['Name', 'Email', 'Company'])}, "buttonText": "" }` : ''}${socialProof ? `,
    "socialProof": { "headline": "", "testimonial": "realistic quote with attribution", "logos": ["Company A", "Company B", "Company C", "Company D"] }` : ''}${faq ? `,
    "faq": [
      { "q": "relevant question", "a": "helpful answer" },
      { "q": "", "a": "" },
      { "q": "", "a": "" }
    ]` : ''}
  }`;

    prompt += `\n\nLanding Page Requirements:
- Page purpose: ${landingData.purpose || 'Lead capture'}
- Number of sections: ${landingData.sections || '4'}
- Include form: ${includeForm ? 'Yes' : 'No'}
- Include social proof: ${socialProof ? 'Yes' : 'No'}
- Include FAQ: ${faq ? 'Yes' : 'No'}\n`;
  }

  prompt += `
}

IMPORTANT: Return ONLY the JSON object. No markdown, no explanation, no code fences. Just valid JSON.`;

  return prompt;
}

/**
 * POST /api/generate — Generate campaign content using Claude.
 */
app.post('/api/generate', async (req, res) => {
  try {
    const formData = req.body;

    if (!formData || !formData.assets || formData.assets.length === 0) {
      return res.status(400).json({ error: 'Invalid form data: no assets selected' });
    }

    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt(formData);

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [
        { role: 'user', content: userPrompt },
      ],
    });

    // Extract text content from response
    const textContent = message.content.find((block) => block.type === 'text');
    if (!textContent) {
      return res.status(500).json({ error: 'No text content in AI response' });
    }

    // Parse the JSON response
    let generatedContent;
    try {
      // Strip any accidental markdown fences
      let jsonText = textContent.text.trim();
      if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
      }
      generatedContent = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Failed to parse AI response:', textContent.text);
      return res.status(500).json({
        error: 'Failed to parse AI response as JSON',
        raw: textContent.text,
      });
    }

    res.json({ content: generatedContent });
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({
      error: error.message || 'Failed to generate content',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Campaign Builder API running on http://localhost:${PORT}`);
});
