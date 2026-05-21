import { useState } from 'react';
import StepAssets from './steps/StepAssets';
import StepDetails from './steps/StepDetails';
import StepAssetDetails from './steps/StepAssetDetails';
import StepReview from './steps/StepReview';
import ResultsPage from './ResultsPage';
import Library from './Library';
import SaveModal from './SaveModal';
import { generateMockContent } from './mockGenerator';
import { getDemoContent } from './demoContent';
import { generateAllImages } from './imageGenerator';
import { saveCampaign, cloneCampaignData } from './campaignStorage';
import './App.css';

const TOTAL_STEPS = 4;
const API_URL = 'http://localhost:3001/api/generate';
const USE_AI_API = false; // Set to true when API key is configured

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [view, setView] = useState('builder'); // 'builder' | 'library' | 'view-only'
  const [formData, setFormData] = useState({
    assets: [],
    details: {},
    assetDetails: {},
  });
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState(null);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [generatedImages, setGeneratedImages] = useState(null);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setGenerateError(null);

    try {
      let content;

      if (USE_AI_API) {
        // Use real AI API
        const apiFormData = {
          assets: formData.assets,
          details: {
            ...formData.details,
            partnerLogo: undefined,
            partnerBadgeFile: undefined,
          },
          assetDetails: formData.assetDetails,
        };

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(apiFormData),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Server error: ${response.status}`);
        }

        const result = await response.json();
        content = result.content;
      } else {
        // Use pre-written demo content with company name substitution
        await new Promise((resolve) => setTimeout(resolve, 2500)); // Simulate generation time
        content = getDemoContent(formData.details.partnerName);
      }

      const images = await generateAllImages(formData, content);
      setGeneratedContent(content);
      setGeneratedImages(images);
      setCurrentStep(5);
    } catch (error) {
      console.error('Generation failed:', error);
      // Fallback to demo content
      const content = getDemoContent(formData.details.partnerName);
      const images = await generateAllImages(formData, content);
      setGeneratedContent(content);
      setGeneratedImages(images);
      setGenerateError(`AI generation failed (${error.message}). Showing demo content.`);
      setCurrentStep(5);
    } finally {
      setGenerating(false);
    }
  };

  const handleStartOver = () => {
    setCurrentStep(1);
    setFormData({ assets: [], details: {}, assetDetails: {} });
    setGeneratedContent(null);
    setGeneratedImages(null);
    setView('builder');
  };

  const handleSave = async (name) => {
    await saveCampaign({
      name,
      formData,
      generatedContent,
      generatedImages,
    });
    setShowSaveModal(false);
  };

  const getDefaultSaveName = () => {
    const company = formData.details.partnerName || 'Campaign';
    const objective = formData.details.campaignObjective || 'General';
    const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    return `${company} - ${objective} - ${date}`;
  };

  // Library actions
  const handleViewCampaign = (campaign) => {
    setFormData(campaign.formData);
    setGeneratedContent(campaign.generatedContent);
    setGeneratedImages(campaign.generatedImages);
    setCurrentStep(5);
    setView('view-only');
  };

  const handleEditCampaign = (campaign) => {
    setFormData(campaign.formData);
    setGeneratedContent(null);
    setGeneratedImages(null);
    setCurrentStep(1);
    setView('builder');
  };

  const handleCloneCampaign = (campaign) => {
    const cloned = cloneCampaignData(campaign);
    setFormData(cloned.formData);
    setGeneratedContent(null);
    setGeneratedImages(null);
    setCurrentStep(1);
    setView('builder');
  };

  const progressPercent = currentStep <= 4 ? (currentStep / TOTAL_STEPS) * 100 : 100;
  const isComplete = currentStep === 5;

  // Loading overlay
  if (generating) {
    return (
      <div className="campaign-builder">
        <header className="campaign-builder__header">
          <h1 className="campaign-builder__title">DIY Campaign Builder</h1>
          <p className="campaign-builder__subtitle">
            Create your co-branded mini campaign in minutes
          </p>
        </header>
        <div className="loading-overlay">
          <div className="loading-overlay__content">
            <div className="loading-overlay__spinner" />
            <h2 className="loading-overlay__title">Generating your campaign assets...</h2>
            <p className="loading-overlay__subtitle">This usually takes about 30 seconds</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="campaign-builder">
      <header className="campaign-builder__header">
        <div className="campaign-builder__header-row">
          <div>
            <h1 className="campaign-builder__title">DIY Campaign Builder</h1>
            <p className="campaign-builder__subtitle">
              Create your co-branded mini campaign in minutes
            </p>
          </div>
          <button
            className="campaign-builder__nav-link"
            onClick={() => setView(view === 'library' ? 'builder' : 'library')}
          >
            {view === 'library' ? '← Builder' : '📁 My Campaigns'}
          </button>
        </div>
      </header>

      {view === 'library' && (
        <Library
          onBack={() => setView('builder')}
          onView={handleViewCampaign}
          onEdit={handleEditCampaign}
          onClone={handleCloneCampaign}
        />
      )}

      {view !== 'library' && (
        <>
          <div className="progress-bar" role="progressbar" aria-valuenow={isComplete ? TOTAL_STEPS : currentStep} aria-valuemin={1} aria-valuemax={TOTAL_STEPS}>
            <div className="progress-bar__label">
              <span>{isComplete ? 'Complete ✓' : `Step ${currentStep} of ${TOTAL_STEPS}`}</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="progress-bar__track">
              <div
                className="progress-bar__fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {currentStep === 1 && (
            <StepAssets
              selectedAssets={formData.assets}
              onChange={(assets) => setFormData({ ...formData, assets })}
              onNext={handleNext}
            />
          )}

          {currentStep === 2 && (
            <StepDetails
              data={formData.details}
              onChange={(details) => setFormData({ ...formData, details })}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && (
            <StepAssetDetails
              selectedAssets={formData.assets}
              data={formData.assetDetails}
              onChange={(assetDetails) => setFormData({ ...formData, assetDetails })}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 4 && (
            <StepReview
              formData={formData}
              onBack={handleBack}
              onGenerate={handleGenerate}
            />
          )}

          {currentStep === 5 && generatedContent && (
            <>
              {generateError && (
                <div className="campaign-builder__error-banner">
                  ⚠️ {generateError}
                </div>
              )}
              <ResultsPage
                generatedContent={generatedContent}
                generatedImages={generatedImages}
                formData={formData}
                onStartOver={handleStartOver}
                onBack={() => { setCurrentStep(4); setView('builder'); }}
                onSave={() => setShowSaveModal(true)}
                readOnly={view === 'view-only'}
              />
            </>
          )}
        </>
      )}

      {showSaveModal && (
        <SaveModal
          defaultName={getDefaultSaveName()}
          onSave={handleSave}
          onCancel={() => setShowSaveModal(false)}
        />
      )}
    </div>
  );
}

export default App;
