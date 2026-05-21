import './StepAssets.css';

const ASSET_OPTIONS = [
  {
    id: 'social-media',
    label: 'Social Media',
    icon: '📱',
    description: 'Platform-ready posts for LinkedIn, Twitter/X, Facebook',
  },
  {
    id: 'email',
    label: 'Email',
    icon: '✉️',
    description: 'Professional email campaigns with subject lines and CTAs',
  },
  {
    id: 'banner-ads',
    label: 'Banner Ads',
    icon: '🖼️',
    description: 'Digital display ads in multiple sizes',
  },
  {
    id: 'landing-page',
    label: 'Landing Page',
    icon: '🌐',
    description: 'Wireframe and copy for your campaign destination page',
  },
];

function StepAssets({ selectedAssets, onChange, onNext }) {
  const handleToggle = (assetId) => {
    if (selectedAssets.includes(assetId)) {
      onChange(selectedAssets.filter((id) => id !== assetId));
    } else {
      onChange([...selectedAssets, assetId]);
    }
  };

  return (
    <div className="step-assets">
      <h2 className="step-assets__heading">Select Your Assets</h2>
      <p className="step-assets__description">
        Choose the marketing assets you'd like to include in your campaign.
      </p>

      <fieldset className="step-assets__grid">
        <legend className="sr-only">Marketing asset types</legend>
        {ASSET_OPTIONS.map((asset) => {
          const isSelected = selectedAssets.includes(asset.id);
          return (
            <label
              key={asset.id}
              className={`step-assets__card${isSelected ? ' step-assets__card--selected' : ''}`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleToggle(asset.id)}
                className="step-assets__checkbox"
                aria-label={asset.label}
              />
              <span className="step-assets__card-icon">{asset.icon}</span>
              <span className="step-assets__card-name">{asset.label}</span>
              <span className="step-assets__card-desc">{asset.description}</span>
            </label>
          );
        })}
      </fieldset>

      <div className="step-assets__actions">
        <button
          className="btn btn--primary"
          onClick={onNext}
          disabled={selectedAssets.length === 0}
          aria-label="Proceed to next step"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default StepAssets;
