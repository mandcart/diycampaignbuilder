import { useState } from 'react';
import './StepAssetDetails.css';

function Toggle({ label, checked, onChange }) {
  return (
    <label className="toggle">
      <span className="toggle__label">{label}</span>
      <span className={`toggle__switch${checked ? ' toggle__switch--on' : ''}`} role="switch" aria-checked={checked}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="toggle__input"
        />
        <span className="toggle__track">
          <span className="toggle__thumb" />
        </span>
      </span>
    </label>
  );
}

/* ─── Social Media Section ─── */
function SocialMediaSection({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value });

  const platforms = ['LinkedIn', 'Twitter/X', 'Facebook', 'Instagram'];
  const styles = ['Short & punchy', 'Informative', 'Story-driven'];
  const variations = ['1', '2', '3'];

  const togglePlatform = (p) => {
    const current = data.platforms || [];
    update('platforms', current.includes(p) ? current.filter((x) => x !== p) : [...current, p]);
  };

  return (
    <section className="asset-section">
      <h3 className="asset-section__heading"><span className="asset-section__icon">📱</span> Social Media</h3>

      <div className="form-field">
        <label className="form-field__label">Which platforms?</label>
        <div className="form-field__checkbox-grid">
          {platforms.map((p) => (
            <label key={p} className="form-field__checkbox-item">
              <input type="checkbox" checked={(data.platforms || []).includes(p)} onChange={() => togglePlatform(p)} />
              <span>{p}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label className="form-field__label">Content style</label>
        <div className="form-field__radio-group">
          {styles.map((s) => (
            <label key={s} className="form-field__radio-item">
              <input type="radio" name="socialStyle" value={s} checked={data.contentStyle === s} onChange={() => update('contentStyle', s)} />
              <span>{s}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label className="form-field__label" htmlFor="socialVariations">Number of post variations</label>
        <select id="socialVariations" className="form-field__select form-field__select--narrow" value={data.variations || ''} onChange={(e) => update('variations', e.target.value)}>
          <option value="">Select...</option>
          {variations.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>

      <Toggle label="Include hashtag suggestions?" checked={data.hashtags !== false} onChange={(v) => update('hashtags', v)} />

      <div className="form-field">
        <label className="form-field__label">Graphic style</label>
        <div className="form-field__radio-group">
          {['Modern Gradient', 'Abstract Geometric', 'Dark & Bold', 'Light & Clean'].map((s) => (
            <label key={s} className="form-field__radio-item">
              <input type="radio" name="socialGraphicStyle" value={s} checked={data.graphicStyle === s} onChange={() => update('graphicStyle', s)} />
              <span>{s}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label className="form-field__label" htmlFor="socialImagery">Imagery direction <span className="form-field__optional">(optional)</span></label>
        <textarea id="socialImagery" className="form-field__textarea" placeholder="Describe your desired visual style" value={data.imagery || ''} onChange={(e) => update('imagery', e.target.value)} rows={2} />
      </div>
    </section>
  );
}

/* ─── Email Section ─── */
function EmailSection({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value });

  const types = ['Newsletter', 'Promotional', 'Event invitation', 'Product announcement'];
  const subjects = ['Question-based', 'Benefit-led', 'Urgency-driven', 'Curiosity'];
  const lengths = ['Short (under 150 words)', 'Medium (150-300 words)', 'Detailed (300+ words)'];
  const variations = ['1', '2', '3'];

  return (
    <section className="asset-section">
      <h3 className="asset-section__heading"><span className="asset-section__icon">✉️</span> Email</h3>

      <div className="form-field">
        <label className="form-field__label">Email type</label>
        <div className="form-field__radio-group">
          {types.map((t) => (
            <label key={t} className="form-field__radio-item">
              <input type="radio" name="emailType" value={t} checked={data.emailType === t} onChange={() => update('emailType', t)} />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label className="form-field__label">Subject line approach</label>
        <div className="form-field__radio-group">
          {subjects.map((s) => (
            <label key={s} className="form-field__radio-item">
              <input type="radio" name="emailSubject" value={s} checked={data.subjectApproach === s} onChange={() => update('subjectApproach', s)} />
              <span>{s}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label className="form-field__label">Email length</label>
        <div className="form-field__radio-group">
          {lengths.map((l) => (
            <label key={l} className="form-field__radio-item">
              <input type="radio" name="emailLength" value={l} checked={data.emailLength === l} onChange={() => update('emailLength', l)} />
              <span>{l}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label className="form-field__label" htmlFor="emailVariations">Number of email variations</label>
        <select id="emailVariations" className="form-field__select form-field__select--narrow" value={data.variations || ''} onChange={(e) => update('variations', e.target.value)}>
          <option value="">Select...</option>
          {variations.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>

      <Toggle label="Include pre-header text?" checked={data.preHeader !== false} onChange={(v) => update('preHeader', v)} />
    </section>
  );
}

/* ─── Banner Ads Section ─── */
function BannerAdsSection({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value });

  const sizes = [
    'Leaderboard (728x90)',
    'Medium Rectangle (300x250)',
    'Skyscraper (160x600)',
    'Large Rectangle (336x280)',
  ];
  const headlines = ['Benefit-led', 'Problem-solution', 'Statistic-led'];
  const variations = ['1', '2', '3'];

  const toggleSize = (s) => {
    const current = data.sizes || [];
    update('sizes', current.includes(s) ? current.filter((x) => x !== s) : [...current, s]);
  };

  return (
    <section className="asset-section">
      <h3 className="asset-section__heading"><span className="asset-section__icon">🖼️</span> Banner Ads</h3>

      <div className="form-field">
        <label className="form-field__label">Ad sizes needed</label>
        <div className="form-field__checkbox-grid">
          {sizes.map((s) => (
            <label key={s} className="form-field__checkbox-item">
              <input type="checkbox" checked={(data.sizes || []).includes(s)} onChange={() => toggleSize(s)} />
              <span>{s}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label className="form-field__label">Headline approach</label>
        <div className="form-field__radio-group">
          {headlines.map((h) => (
            <label key={h} className="form-field__radio-item">
              <input type="radio" name="bannerHeadline" value={h} checked={data.headlineApproach === h} onChange={() => update('headlineApproach', h)} />
              <span>{h}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label className="form-field__label" htmlFor="bannerUrl">Destination URL</label>
        <input id="bannerUrl" type="url" className="form-field__input" placeholder="https://..." value={data.destinationUrl || ''} onChange={(e) => update('destinationUrl', e.target.value)} />
      </div>

      <div className="form-field">
        <label className="form-field__label" htmlFor="bannerVariations">Number of creative variations</label>
        <select id="bannerVariations" className="form-field__select form-field__select--narrow" value={data.variations || ''} onChange={(e) => update('variations', e.target.value)}>
          <option value="">Select...</option>
          {variations.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>

      <div className="form-field">
        <label className="form-field__label">Graphic style</label>
        <div className="form-field__radio-group">
          {['Modern Gradient', 'Abstract Geometric', 'Dark & Bold', 'Light & Clean'].map((s) => (
            <label key={s} className="form-field__radio-item">
              <input type="radio" name="bannerGraphicStyle" value={s} checked={data.graphicStyle === s} onChange={() => update('graphicStyle', s)} />
              <span>{s}</span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Landing Page Section ─── */
function LandingPageSection({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value });

  const purposes = ['Lead capture', 'Event registration', 'Product information', 'Free trial signup'];
  const sections = ['3', '4', '5', '6'];
  const formFields = ['Name', 'Email', 'Company', 'Phone', 'Job title', 'Message'];

  const toggleFormField = (f) => {
    const current = data.formFields || [];
    update('formFields', current.includes(f) ? current.filter((x) => x !== f) : [...current, f]);
  };

  return (
    <section className="asset-section">
      <h3 className="asset-section__heading"><span className="asset-section__icon">🌐</span> Landing Page</h3>

      <div className="form-field">
        <label className="form-field__label">Page purpose</label>
        <div className="form-field__radio-group">
          {purposes.map((p) => (
            <label key={p} className="form-field__radio-item">
              <input type="radio" name="landingPurpose" value={p} checked={data.purpose === p} onChange={() => update('purpose', p)} />
              <span>{p}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label className="form-field__label" htmlFor="landingSections">Number of sections</label>
        <select id="landingSections" className="form-field__select form-field__select--narrow" value={data.sections || ''} onChange={(e) => update('sections', e.target.value)}>
          <option value="">Select...</option>
          {sections.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <Toggle label="Include form on page?" checked={data.includeForm !== false} onChange={(v) => update('includeForm', v)} />

      {data.includeForm !== false && (
        <div className="form-field form-field--indented">
          <label className="form-field__label">Form fields needed</label>
          <div className="form-field__checkbox-grid">
            {formFields.map((f) => (
              <label key={f} className="form-field__checkbox-item">
                <input type="checkbox" checked={(data.formFields || []).includes(f)} onChange={() => toggleFormField(f)} />
                <span>{f}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <Toggle label="Include social proof section?" checked={data.socialProof === true} onChange={(v) => update('socialProof', v)} />
      <Toggle label="Include FAQ section?" checked={data.faq === true} onChange={(v) => update('faq', v)} />
    </section>
  );
}

/* ─── Main Step Component ─── */
function StepAssetDetails({ selectedAssets, data, onChange, onNext, onBack }) {
  const update = (assetKey, value) => {
    onChange({ ...data, [assetKey]: value });
  };

  return (
    <div className="step-asset-details">
      <h2 className="step-asset-details__heading">Asset Details</h2>
      <p className="step-asset-details__description">
        Tell us more about your specific asset requirements.
      </p>

      {selectedAssets.includes('social-media') && (
        <SocialMediaSection data={data.socialMedia || {}} onChange={(v) => update('socialMedia', v)} />
      )}

      {selectedAssets.includes('email') && (
        <EmailSection data={data.email || {}} onChange={(v) => update('email', v)} />
      )}

      {selectedAssets.includes('banner-ads') && (
        <BannerAdsSection data={data.bannerAds || {}} onChange={(v) => update('bannerAds', v)} />
      )}

      {selectedAssets.includes('landing-page') && (
        <LandingPageSection data={data.landingPage || {}} onChange={(v) => update('landingPage', v)} />
      )}

      <div className="step-asset-details__actions">
        <button className="btn btn--secondary" onClick={onBack}>
          Back
        </button>
        <button className="btn btn--primary" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default StepAssetDetails;
