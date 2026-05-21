import { useState } from 'react';
import './ResultsPage.css';

const ASSET_LABELS = {
  'social-media': 'Social Media',
  'email': 'Email',
  'banner-ads': 'Banner Ads',
  'landing-page': 'Landing Page',
};

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      className={`btn--copy${copied ? ' btn--copy--copied' : ''}`}
      onClick={handleCopy}
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  );
}

function DownloadImageButton({ dataUrl, filename }) {
  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <button className="btn--copy" onClick={handleDownload}>
      ⬇ Download Image
    </button>
  );
}

/* ─── Social Media Tab ─── */
function SocialMediaTab({ data, images }) {
  return (
    <div>
      {Object.entries(data).map(([platform, posts]) => (
        <div key={platform}>
          <h3 className="results__platform-heading">{platform}</h3>
          {posts.map((post, i) => {
            const fullText = `${post.copy}\n\nCTA: ${post.cta}${post.hashtags.length > 0 ? '\n\n' + post.hashtags.join(' ') : ''}`;
            const imageDataUrl = images?.[platform]?.[i];
            return (
              <div key={i} className="results__card">
                <div className="results__card-header">
                  <span className="results__card-title">Post {i + 1}</span>
                  <CopyButton text={fullText} />
                </div>
                {imageDataUrl && (
                  <div className="results__image-preview">
                    <img src={imageDataUrl} alt={`${platform} post ${i + 1} graphic`} className="results__image-preview-img" />
                    <DownloadImageButton dataUrl={imageDataUrl} filename={`${platform.toLowerCase().replace(/\//g, '-')}-post-${i + 1}.png`} />
                  </div>
                )}
                <div className="results__card-body">
                  <div className="results__field">
                    <span className="results__field-label">Post Copy</span>
                    <span className="results__field-value">{post.copy}</span>
                  </div>
                  <div className="results__field">
                    <span className="results__field-label">Image Copy</span>
                    <span className="results__image-badge">{post.imageCopy}</span>
                  </div>
                  <div className="results__field">
                    <span className="results__field-label">CTA</span>
                    <span className="results__field-value">{post.cta}</span>
                  </div>
                  {post.hashtags.length > 0 && (
                    <div className="results__field">
                      <span className="results__field-label">Hashtags</span>
                      <div className="results__hashtags">
                        {post.hashtags.map((tag) => (
                          <span key={tag} className="results__hashtag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ─── Email Tab ─── */
function EmailTab({ data }) {
  return (
    <div>
      {data.map((email, i) => {
        const fullText = `Subject: ${email.subjectLine}\nPre-header: ${email.preHeader}\n\n${email.headline}\n\n${email.partnerSection}\n\nCTA: ${email.ctaText}\n\n${email.awsSection}`;
        return (
          <div key={i} className="results__card">
            <div className="results__card-header">
              <span className="results__card-title">Email Variation {i + 1}</span>
              <CopyButton text={fullText} />
            </div>
            <div className="results__card-body">
              <div className="results__field">
                <span className="results__field-label">Subject Line</span>
                <span className="results__field-value">{email.subjectLine}</span>
              </div>
              <div className="results__field">
                <span className="results__field-label">Pre-header</span>
                <span className="results__field-value">{email.preHeader}</span>
              </div>
              <div className="results__field">
                <span className="results__field-label">Headline</span>
                <span className="results__field-value">{email.headline}</span>
              </div>
              <div className="results__field">
                <span className="results__field-label">Partner Section</span>
                <span className="results__field-value">{email.partnerSection}</span>
              </div>
              <div className="results__field">
                <span className="results__field-label">CTA Button Text</span>
                <span className="results__field-value">{email.ctaText}</span>
              </div>
              <div className="results__field">
                <span className="results__field-label">AWS Section</span>
                <span className="results__field-value">{email.awsSection}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Banner Ads Tab ─── */
function BannerAdsTab({ data, images }) {
  return (
    <div>
      {data.map((banner, i) => (
        <div key={i} className="results__banner-card">
          <div className="results__banner-headline">{banner.headline}</div>
          <div className="results__banner-subheadline">{banner.subheadline}</div>
          <div className="results__banner-cta">{banner.ctaText}</div>
          <div className="results__banner-sizes">
            {banner.sizes.map((size) => (
              <span key={size} className="results__size-badge">{size}</span>
            ))}
          </div>
          {images?.[i] && images[i].length > 0 && (
            <div className="results__banner-images">
              {images[i].map((img, j) => (
                <div key={j} className="results__image-preview results__image-preview--banner">
                  <img src={img.dataUrl} alt={`Banner ad ${i + 1} - ${img.sizeName}`} className="results__image-preview-img results__image-preview-img--banner" />
                  <div className="results__image-preview-meta">
                    <span className="results__size-badge">{img.sizeName}</span>
                    <DownloadImageButton dataUrl={img.dataUrl} filename={`banner-${i + 1}-${img.width}x${img.height}.png`} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Landing Page Tab ─── */
function LandingPageTab({ data }) {
  return (
    <div>
      {/* Wireframe */}
      <div className="results__wireframe">
        <div className="results__wireframe-section">
          <div className="results__wireframe-label">Hero Section</div>
          <div className="results__wireframe-content">{data.hero.headline}</div>
        </div>
        <div className="results__wireframe-section">
          <div className="results__wireframe-label">Value Propositions</div>
          <div className="results__wireframe-content">{data.valueProps.map((v) => v.title).join(' • ')}</div>
        </div>
        <div className="results__wireframe-section">
          <div className="results__wireframe-label">Partner Section</div>
          <div className="results__wireframe-content">{data.partnerSection.headline}</div>
        </div>
        <div className="results__wireframe-section">
          <div className="results__wireframe-label">AWS Section</div>
          <div className="results__wireframe-content">{data.awsSection.headline}</div>
        </div>
        {data.form && (
          <div className="results__wireframe-section">
            <div className="results__wireframe-label">Form</div>
            <div className="results__wireframe-content">{data.form.fields.join(' | ')}</div>
          </div>
        )}
        {data.socialProof && (
          <div className="results__wireframe-section">
            <div className="results__wireframe-label">Social Proof</div>
            <div className="results__wireframe-content">{data.socialProof.headline}</div>
          </div>
        )}
        {data.faq && (
          <div className="results__wireframe-section">
            <div className="results__wireframe-label">FAQ</div>
            <div className="results__wireframe-content">{data.faq.length} questions</div>
          </div>
        )}
      </div>

      {/* Full copy */}
      <div className="results__landing-copy">
        <div className="results__landing-section">
          <div className="results__landing-section-title">Hero</div>
          <div className="results__landing-headline">{data.hero.headline}</div>
          <div className="results__landing-body">{data.hero.subheadline}</div>
        </div>

        <div className="results__landing-section">
          <div className="results__landing-section-title">Value Propositions</div>
          {data.valueProps.map((vp, i) => (
            <div key={i} style={{ marginBottom: '0.75rem' }}>
              <div className="results__landing-headline">{vp.title}</div>
              <div className="results__landing-body">{vp.description}</div>
            </div>
          ))}
        </div>

        <div className="results__landing-section">
          <div className="results__landing-section-title">Partner Section</div>
          <div className="results__landing-headline">{data.partnerSection.headline}</div>
          <div className="results__landing-body">{data.partnerSection.body}</div>
        </div>

        <div className="results__landing-section">
          <div className="results__landing-section-title">AWS Section</div>
          <div className="results__landing-headline">{data.awsSection.headline}</div>
          <div className="results__landing-body">{data.awsSection.body}</div>
        </div>

        {data.form && (
          <div className="results__landing-section">
            <div className="results__landing-section-title">Form Section</div>
            <div className="results__landing-headline">{data.form.headline}</div>
            <div className="results__landing-body">{data.form.subtext}</div>
            <div className="results__landing-body" style={{ marginTop: '0.5rem' }}>
              <strong>Fields:</strong> {data.form.fields.join(', ')}
            </div>
          </div>
        )}

        {data.socialProof && (
          <div className="results__landing-section">
            <div className="results__landing-section-title">Social Proof</div>
            <div className="results__landing-headline">{data.socialProof.headline}</div>
            <div className="results__landing-body">{data.socialProof.testimonial}</div>
          </div>
        )}

        {data.faq && (
          <div className="results__landing-section">
            <div className="results__landing-section-title">FAQ</div>
            {data.faq.map((item, i) => (
              <div key={i} style={{ marginBottom: '0.75rem' }}>
                <div className="results__landing-headline">{item.q}</div>
                <div className="results__landing-body">{item.a}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Download helper ─── */
function buildDownloadText(generatedContent, formData) {
  const lines = [];
  const company = formData.details.partnerName || 'Campaign';

  lines.push(`=== ${company} — Campaign Assets ===`);
  lines.push(`Generated: ${new Date().toLocaleDateString()}`);
  lines.push('');

  if (generatedContent.socialMedia) {
    lines.push('═══════════════════════════════════');
    lines.push('SOCIAL MEDIA');
    lines.push('═══════════════════════════════════');
    Object.entries(generatedContent.socialMedia).forEach(([platform, posts]) => {
      lines.push('');
      lines.push(`── ${platform} ──`);
      posts.forEach((post, i) => {
        lines.push('');
        lines.push(`Post ${i + 1}:`);
        lines.push(post.copy);
        lines.push(`Image direction: ${post.imageCopy}`);
        lines.push(`CTA: ${post.cta}`);
        if (post.hashtags.length > 0) lines.push(`Hashtags: ${post.hashtags.join(' ')}`);
      });
    });
    lines.push('');
  }

  if (generatedContent.email) {
    lines.push('═══════════════════════════════════');
    lines.push('EMAIL');
    lines.push('═══════════════════════════════════');
    generatedContent.email.forEach((email, i) => {
      lines.push('');
      lines.push(`── Variation ${i + 1} ──`);
      lines.push(`Subject: ${email.subjectLine}`);
      lines.push(`Pre-header: ${email.preHeader}`);
      lines.push(`Headline: ${email.headline}`);
      lines.push('');
      lines.push('Partner Section:');
      lines.push(email.partnerSection);
      lines.push('');
      lines.push(`CTA: ${email.ctaText}`);
      lines.push('');
      lines.push('AWS Section:');
      lines.push(email.awsSection);
    });
    lines.push('');
  }

  if (generatedContent.bannerAds) {
    lines.push('═══════════════════════════════════');
    lines.push('BANNER ADS');
    lines.push('═══════════════════════════════════');
    generatedContent.bannerAds.forEach((banner, i) => {
      lines.push('');
      lines.push(`── Variation ${i + 1} ──`);
      lines.push(`Headline: ${banner.headline}`);
      lines.push(`Subheadline: ${banner.subheadline}`);
      lines.push(`CTA: ${banner.ctaText}`);
      lines.push(`Sizes: ${banner.sizes.join(', ')}`);
    });
    lines.push('');
  }

  if (generatedContent.landingPage) {
    const lp = generatedContent.landingPage;
    lines.push('═══════════════════════════════════');
    lines.push('LANDING PAGE');
    lines.push('═══════════════════════════════════');
    lines.push('');
    lines.push('── Hero ──');
    lines.push(`Headline: ${lp.hero.headline}`);
    lines.push(`Subheadline: ${lp.hero.subheadline}`);
    lines.push(`CTA: ${lp.hero.ctaText}`);
    lines.push('');
    lines.push('── Value Propositions ──');
    lp.valueProps.forEach((vp) => {
      lines.push(`• ${vp.title}: ${vp.description}`);
    });
    lines.push('');
    lines.push('── Partner Section ──');
    lines.push(lp.partnerSection.headline);
    lines.push(lp.partnerSection.body);
    lines.push('');
    lines.push('── AWS Section ──');
    lines.push(lp.awsSection.headline);
    lines.push(lp.awsSection.body);
    if (lp.form) {
      lines.push('');
      lines.push('── Form ──');
      lines.push(lp.form.headline);
      lines.push(lp.form.subtext);
      lines.push(`Fields: ${lp.form.fields.join(', ')}`);
    }
    if (lp.socialProof) {
      lines.push('');
      lines.push('── Social Proof ──');
      lines.push(lp.socialProof.testimonial);
    }
    if (lp.faq) {
      lines.push('');
      lines.push('── FAQ ──');
      lp.faq.forEach((item) => {
        lines.push(`Q: ${item.q}`);
        lines.push(`A: ${item.a}`);
        lines.push('');
      });
    }
  }

  return lines.join('\n');
}

/* ─── Main Results Page ─── */
function ResultsPage({ generatedContent, generatedImages, formData, onStartOver, onBack, onSave, readOnly }) {
  const availableTabs = formData.assets.filter((a) => {
    if (a === 'social-media') return !!generatedContent.socialMedia;
    if (a === 'email') return !!generatedContent.email;
    if (a === 'banner-ads') return !!generatedContent.bannerAds;
    if (a === 'landing-page') return !!generatedContent.landingPage;
    return false;
  });

  const [activeTab, setActiveTab] = useState(availableTabs[0] || '');

  const handleDownload = () => {
    const text = buildDownloadText(generatedContent, formData);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(formData.details.partnerName || 'campaign').replace(/\s+/g, '-').toLowerCase()}-campaign-assets.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Also download all images
    if (generatedImages) {
      let delay = 300;
      // Social media images
      if (generatedImages.socialMedia) {
        Object.entries(generatedImages.socialMedia).forEach(([platform, imgs]) => {
          imgs.forEach((dataUrl, i) => {
            setTimeout(() => {
              const link = document.createElement('a');
              link.href = dataUrl;
              link.download = `${platform.toLowerCase().replace(/\//g, '-')}-post-${i + 1}.png`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }, delay);
            delay += 300;
          });
        });
      }
      // Banner ad images
      if (generatedImages.bannerAds) {
        generatedImages.bannerAds.forEach((bannerImgs, i) => {
          bannerImgs.forEach((img) => {
            setTimeout(() => {
              const link = document.createElement('a');
              link.href = img.dataUrl;
              link.download = `banner-${i + 1}-${img.width}x${img.height}.png`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }, delay);
            delay += 300;
          });
        });
      }
    }
  };

  return (
    <div className="results">
      <div className="results__beta-banner">
        🧪 Beta Preview — This demo uses sample healthcare campaign content. In the full version, AI will generate bespoke copy based on your specific brief inputs.
      </div>

      <div className="results__banner">
        <span className="results__banner-text">Your campaign is ready! 🎉</span>
      </div>

      <div className="results__top-actions">
        <div className="results__top-actions-left">
          <button className="btn--outline" onClick={onBack}>
            ← Back to Edit
          </button>
          {!readOnly && (
            <button className="btn--outline" onClick={onStartOver}>
              Start Over
            </button>
          )}
          {readOnly && (
            <button className="btn--outline" onClick={onStartOver}>
              Start Over
            </button>
          )}
        </div>
        <div className="results__top-actions-right">
          {onSave && (
            <button className="btn--outline btn--outline-save" onClick={onSave}>
              💾 Save to Library
            </button>
          )}
          <button className="btn--download" onClick={handleDownload}>
            Download All Assets
          </button>
        </div>
      </div>

      <div className="results__tabs" role="tablist">
        {availableTabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            className={`results__tab${activeTab === tab ? ' results__tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {ASSET_LABELS[tab]}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {activeTab === 'social-media' && generatedContent.socialMedia && (
          <SocialMediaTab data={generatedContent.socialMedia} images={generatedImages?.socialMedia} />
        )}
        {activeTab === 'email' && generatedContent.email && (
          <EmailTab data={generatedContent.email} />
        )}
        {activeTab === 'banner-ads' && generatedContent.bannerAds && (
          <BannerAdsTab data={generatedContent.bannerAds} images={generatedImages?.bannerAds} />
        )}
        {activeTab === 'landing-page' && generatedContent.landingPage && (
          <LandingPageTab data={generatedContent.landingPage} />
        )}
      </div>
    </div>
  );
}

export default ResultsPage;
