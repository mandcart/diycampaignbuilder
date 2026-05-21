import { useState, useEffect } from 'react';
import { getCampaigns, deleteCampaign } from './campaignStorage';
import './Library.css';

const ASSET_SHORT_LABELS = {
  'social-media': 'Social',
  'email': 'Email',
  'banner-ads': 'Banners',
  'landing-page': 'Landing Page',
};

function Library({ onBack, onView, onEdit, onClone }) {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    setCampaigns(getCampaigns());
  }, []);

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      deleteCampaign(id);
      setCampaigns(getCampaigns());
    }
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div>
      <button className="library__back" onClick={onBack}>← Back to Builder</button>
      <h2 className="library__heading">My Campaigns</h2>
      <p className="library__description">Your saved campaigns and generated assets.</p>

      {campaigns.length === 0 ? (
        <div className="library__empty">
          <div className="library__empty-icon">📁</div>
          <p className="library__empty-text">No saved campaigns yet. Generate a campaign and save it to see it here.</p>
        </div>
      ) : (
        <div className="library__grid">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="library__card">
              <div className="library__card-header">
                <span className="library__card-name">{campaign.name}</span>
                <span className="library__card-date">{formatDate(campaign.createdAt)}</span>
              </div>
              <div className="library__card-company">
                {campaign.formData?.details?.partnerName || 'Unknown company'}
              </div>
              <div className="library__card-meta">
                {(campaign.formData?.assets || []).map((asset) => (
                  <span key={asset} className="library__card-badge">
                    {ASSET_SHORT_LABELS[asset] || asset}
                  </span>
                ))}
              </div>
              <div className="library__card-actions">
                <button className="library__btn library__btn--view" onClick={() => onView(campaign)}>
                  View
                </button>
                <button className="library__btn library__btn--edit" onClick={() => onEdit(campaign)}>
                  Edit
                </button>
                <button className="library__btn library__btn--clone" onClick={() => onClone(campaign)}>
                  Clone
                </button>
                <button className="library__btn library__btn--delete" onClick={() => handleDelete(campaign.id, campaign.name)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Library;
