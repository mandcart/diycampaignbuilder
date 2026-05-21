import { useState } from 'react';
import './StepReview.css';

const ASSET_LABELS = {
  'social-media': 'Social Media',
  'email': 'Email',
  'banner-ads': 'Banner Ads',
  'landing-page': 'Landing Page',
};

function ColourSwatch({ colour, label }) {
  if (!colour) return null;
  return (
    <span className="colour-swatch">
      <span className="colour-swatch__box" style={{ backgroundColor: colour }} />
      <span className="colour-swatch__value">{label}: {colour}</span>
    </span>
  );
}

function SummaryItem({ label, value }) {
  if (!value) return null;
  return (
    <div className="summary-item">
      <span className="summary-item__label">{label}</span>
      <span className="summary-item__value">{value}</span>
    </div>
  );
}

function BadgeList({ items }) {
  return (
    <div className="badge-list">
      {items.map((item) => (
        <span key={item} className="badge-list__badge">{item}</span>
      ))}
    </div>
  );
}

/* ─── Section: Selected Assets ─── */
function AssetsSection({ assets }) {
  return (
    <section className="review-section">
      <h3 className="review-section__heading">Selected Assets</h3>
      <BadgeList items={assets.map((a) => ASSET_LABELS[a] || a)} />
    </section>
  );
}

/* ─── Section: Campaign Details ─── */
function DetailsSection({ details }) {
  const logoUrl = details.partnerLogo ? URL.createObjectURL(details.partnerLogo) : null;

  return (
    <section className="review-section">
      <h3 className="review-section__heading">Campaign Details</h3>
      <div className="review-section__grid">
        <SummaryItem label="Partner company" value={details.partnerName} />
        {logoUrl && (
          <div className="summary-item">
            <span className="summary-item__label">Partner logo</span>
            <img src={logoUrl} alt="Partner logo" className="review-section__logo-preview" />
          </div>
        )}
        <SummaryItem label="AWS Partner badge" value={details.partnerBadge} />
        <div className="summary-item">
          <span className="summary-item__label">Brand colours</span>
          <span className="summary-item__value summary-item__value--colours">
            <ColourSwatch colour={details.primaryColour} label="Primary" />
            <ColourSwatch colour={details.secondaryColour} label="Secondary" />
          </span>
        </div>
        <SummaryItem label="Target audience" value={details.targetAudience} />
        <SummaryItem label="Industry" value={details.industry === 'Other' ? details.industryOther : details.industry} />
        <SummaryItem label="Geographic region" value={details.geoRegion} />
        {(details.geoMarkets || []).length > 0 && (
          <div className="summary-item">
            <span className="summary-item__label">Markets</span>
            <BadgeList items={details.geoMarkets} />
          </div>
        )}
        <SummaryItem label="Campaign objective" value={details.campaignObjective} />
        <SummaryItem label="Key message" value={details.keyMessage} />
        <SummaryItem label="Call-to-action" value={details.cta} />
        <SummaryItem label="AWS product area" value={details.awsProductArea} />
        {(details.awsServices || []).length > 0 && (
          <div className="summary-item">
            <span className="summary-item__label">AWS services</span>
            <BadgeList items={details.awsServices} />
          </div>
        )}
        <SummaryItem label="Tone of voice" value={details.tone} />
      </div>
    </section>
  );
}

/* ─── Section: Asset-Specific Details ─── */
function AssetDetailsSection({ selectedAssets, assetDetails }) {
  return (
    <section className="review-section">
      <h3 className="review-section__heading">Asset-Specific Details</h3>

      {selectedAssets.includes('social-media') && assetDetails.socialMedia && (
        <div className="review-subsection">
          <h4 className="review-subsection__heading">📱 Social Media</h4>
          <div className="review-section__grid">
            {(assetDetails.socialMedia.platforms || []).length > 0 && (
              <div className="summary-item">
                <span className="summary-item__label">Platforms</span>
                <BadgeList items={assetDetails.socialMedia.platforms} />
              </div>
            )}
            <SummaryItem label="Content style" value={assetDetails.socialMedia.contentStyle} />
            <SummaryItem label="Post variations" value={assetDetails.socialMedia.variations} />
            <SummaryItem label="Hashtag suggestions" value={assetDetails.socialMedia.hashtags === false ? 'No' : 'Yes'} />
            <SummaryItem label="Imagery direction" value={assetDetails.socialMedia.imagery} />
          </div>
        </div>
      )}

      {selectedAssets.includes('email') && assetDetails.email && (
        <div className="review-subsection">
          <h4 className="review-subsection__heading">✉️ Email</h4>
          <div className="review-section__grid">
            <SummaryItem label="Email type" value={assetDetails.email.emailType} />
            <SummaryItem label="Subject line approach" value={assetDetails.email.subjectApproach} />
            <SummaryItem label="Email length" value={assetDetails.email.emailLength} />
            <SummaryItem label="Variations" value={assetDetails.email.variations} />
            <SummaryItem label="Pre-header text" value={assetDetails.email.preHeader === false ? 'No' : 'Yes'} />
          </div>
        </div>
      )}

      {selectedAssets.includes('banner-ads') && assetDetails.bannerAds && (
        <div className="review-subsection">
          <h4 className="review-subsection__heading">🖼️ Banner Ads</h4>
          <div className="review-section__grid">
            {(assetDetails.bannerAds.sizes || []).length > 0 && (
              <div className="summary-item">
                <span className="summary-item__label">Ad sizes</span>
                <BadgeList items={assetDetails.bannerAds.sizes} />
              </div>
            )}
            <SummaryItem label="Headline approach" value={assetDetails.bannerAds.headlineApproach} />
            <SummaryItem label="Destination URL" value={assetDetails.bannerAds.destinationUrl} />
            <SummaryItem label="Creative variations" value={assetDetails.bannerAds.variations} />
          </div>
        </div>
      )}

      {selectedAssets.includes('landing-page') && assetDetails.landingPage && (
        <div className="review-subsection">
          <h4 className="review-subsection__heading">🌐 Landing Page</h4>
          <div className="review-section__grid">
            <SummaryItem label="Page purpose" value={assetDetails.landingPage.purpose} />
            <SummaryItem label="Number of sections" value={assetDetails.landingPage.sections} />
            <SummaryItem label="Include form" value={assetDetails.landingPage.includeForm === false ? 'No' : 'Yes'} />
            {assetDetails.landingPage.includeForm !== false && (assetDetails.landingPage.formFields || []).length > 0 && (
              <div className="summary-item">
                <span className="summary-item__label">Form fields</span>
                <BadgeList items={assetDetails.landingPage.formFields} />
              </div>
            )}
            <SummaryItem label="Social proof section" value={assetDetails.landingPage.socialProof ? 'Yes' : 'No'} />
            <SummaryItem label="FAQ section" value={assetDetails.landingPage.faq ? 'Yes' : 'No'} />
          </div>
        </div>
      )}
    </section>
  );
}

/* ─── Main Step Component ─── */
function StepReview({ formData, onBack, onGenerate }) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="step-review">
      <h2 className="step-review__heading">Review & Generate</h2>
      <p className="step-review__description">
        Review your campaign brief before we generate your assets.
      </p>

      <AssetsSection assets={formData.assets} />
      <DetailsSection details={formData.details} />
      <AssetDetailsSection selectedAssets={formData.assets} assetDetails={formData.assetDetails} />

      <div className="step-review__confirm">
        <label className="step-review__checkbox-label">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="step-review__checkbox"
          />
          <span>I confirm I have rights to all uploaded assets and agree to AWS co-branding guidelines</span>
        </label>
      </div>

      <div className="step-review__actions">
        <button className="btn btn--secondary" onClick={onBack}>
          Back
        </button>
        <button
          className="btn btn--generate"
          onClick={onGenerate}
          disabled={!agreed}
          aria-label="Generate campaign assets"
        >
          Generate My Campaign
        </button>
      </div>
    </div>
  );
}

export default StepReview;
