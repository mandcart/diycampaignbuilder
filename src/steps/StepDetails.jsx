import { useState, useRef, useEffect } from 'react';
import './StepDetails.css';

const INDUSTRIES = [
  'Healthcare',
  'Financial Services',
  'Retail',
  'Manufacturing',
  'Education',
  'Technology',
  'Media & Entertainment',
  'Public Sector',
  'Other',
];

const GEO_REGIONS = ['Global', 'EMEA', 'NAMER', 'LATAM', 'APJ', 'GCR'];

const GEO_MARKETS_BY_REGION = {
  'Global': ['Global'],
  'EMEA': ['UK & Ireland', 'DACH (Germany, Austria, Switzerland)', 'Nordics (Sweden, Norway, Denmark, Finland)', 'France', 'Benelux (Belgium, Netherlands, Luxembourg)', 'Southern Europe (Spain, Italy, Portugal)', 'Central & Eastern Europe', 'Middle East', 'Africa', 'Israel', 'Turkey'],
  'NAMER': ['United States - East', 'United States - West', 'United States - Central', 'Canada - East', 'Canada - West'],
  'LATAM': ['Mexico', 'Brazil', 'Argentina', 'Colombia', 'Chile', 'Peru', 'Ecuador', 'Venezuela', 'Central America', 'Caribbean'],
  'APJ': ['Australia', 'New Zealand', 'Japan', 'India', 'Singapore', 'Indonesia', 'Thailand', 'Malaysia', 'Philippines', 'Vietnam', 'South Korea', 'Pakistan', 'Bangladesh'],
  'GCR': ['Mainland China', 'Hong Kong', 'Macau', 'Taiwan'],
};

const CAMPAIGN_OBJECTIVES = [
  'Brand Awareness',
  'Lead Generation',
  'Event Promotion',
  'Product Launch',
  'Thought Leadership',
];

const AWS_PRODUCT_AREAS = [
  'Analytics',
  'Application Integration',
  'Blockchain',
  'Business Applications',
  'Cloud Financial Management',
  'Compute',
  'Containers',
  'Customer Enablement',
  'Database',
  'Developer Tools',
  'End User Computing',
  'Front-End Web & Mobile',
  'Game Tech',
  'Internet of Things',
  'Machine Learning',
  'Management & Governance',
  'Media Services',
  'Migration & Transfer',
  'Networking & Content Delivery',
  'Quantum Technologies',
  'Robotics',
  'Satellite',
  'Security, Identity, & Compliance',
  'Serverless',
  'Storage',
];

const AWS_SERVICES_BY_AREA = {
  'Analytics': ['Amazon Athena', 'Amazon EMR', 'Amazon Kinesis', 'Amazon OpenSearch Service', 'Amazon Redshift', 'AWS Glue', 'Amazon QuickSight', 'AWS Data Pipeline', 'AWS Lake Formation'],
  'Application Integration': ['Amazon EventBridge', 'Amazon SNS', 'Amazon SQS', 'AWS Step Functions', 'AWS AppSync', 'Amazon MQ'],
  'Blockchain': ['Amazon Managed Blockchain'],
  'Business Applications': ['Amazon Connect', 'Amazon Chime', 'Amazon WorkMail', 'AWS AppFabric', 'Amazon Q Business'],
  'Cloud Financial Management': ['AWS Cost Explorer', 'AWS Budgets', 'AWS Cost and Usage Report'],
  'Compute': ['Amazon EC2', 'AWS Lambda', 'Amazon Lightsail', 'AWS Batch', 'AWS Elastic Beanstalk', 'AWS Outposts', 'AWS App Runner'],
  'Containers': ['Amazon ECS', 'Amazon EKS', 'AWS Fargate', 'Amazon ECR'],
  'Customer Enablement': ['AWS Support', 'AWS Managed Services', 'AWS IQ', 'AWS Activate'],
  'Database': ['Amazon RDS', 'Amazon DynamoDB', 'Amazon Aurora', 'Amazon ElastiCache', 'Amazon Neptune', 'Amazon DocumentDB', 'Amazon MemoryDB'],
  'Developer Tools': ['AWS CodeCommit', 'AWS CodeBuild', 'AWS CodeDeploy', 'AWS CodePipeline', 'AWS Cloud9', 'AWS CloudShell', 'AWS Amplify', 'AWS App Studio'],
  'End User Computing': ['Amazon WorkSpaces', 'Amazon AppStream 2.0'],
  'Front-End Web & Mobile': ['AWS Amplify', 'AWS AppSync', 'AWS Device Farm'],
  'Game Tech': ['Amazon GameLift', 'Amazon Lumberyard'],
  'Internet of Things': ['AWS IoT Core', 'AWS IoT Greengrass', 'AWS IoT Analytics', 'AWS IoT SiteWise', 'AWS IoT TwinMaker'],
  'Machine Learning': ['Amazon Bedrock', 'Amazon Q', 'Amazon SageMaker', 'Amazon Rekognition', 'Amazon Comprehend', 'Amazon Polly', 'Amazon Transcribe', 'Amazon Translate', 'Amazon Lex', 'Amazon Textract', 'Amazon Kendra'],
  'Management & Governance': ['AWS CloudFormation', 'AWS CloudTrail', 'Amazon CloudWatch', 'AWS Config', 'AWS Systems Manager', 'AWS Organizations', 'AWS Trusted Advisor'],
  'Media Services': ['Amazon Elastic Transcoder', 'AWS Elemental MediaConvert', 'AWS Elemental MediaLive', 'Amazon Interactive Video Service'],
  'Migration & Transfer': ['AWS Migration Hub', 'AWS Application Migration Service', 'AWS Database Migration Service', 'AWS DataSync', 'AWS Transfer Family'],
  'Networking & Content Delivery': ['Amazon VPC', 'Amazon CloudFront', 'Amazon Route 53', 'Elastic Load Balancing', 'AWS Direct Connect', 'AWS Global Accelerator', 'AWS PrivateLink'],
  'Quantum Technologies': ['Amazon Braket'],
  'Robotics': ['AWS RoboMaker'],
  'Satellite': ['AWS Ground Station'],
  'Security, Identity, & Compliance': ['AWS IAM', 'Amazon Cognito', 'AWS WAF', 'AWS Shield', 'AWS KMS', 'AWS Secrets Manager', 'Amazon GuardDuty', 'AWS Security Hub', 'Amazon Inspector', 'Amazon Macie'],
  'Serverless': ['AWS Lambda', 'Amazon API Gateway', 'Amazon DynamoDB', 'Amazon S3', 'AWS Step Functions', 'AWS Fargate'],
  'Storage': ['Amazon S3', 'Amazon EBS', 'Amazon EFS', 'AWS Backup', 'AWS Storage Gateway', 'Amazon FSx'],
};

const TONES = ['Professional', 'Friendly', 'Technical', 'Conversational'];

const BADGE_TIERS = ['Select', 'Advanced', 'Premier', 'None'];

function StepDetails({ data, onChange, onNext, onBack }) {
  const [errors, setErrors] = useState({});
  const [awsDropdownOpen, setAwsDropdownOpen] = useState(false);
  const awsDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (awsDropdownRef.current && !awsDropdownRef.current.contains(e.target)) {
        setAwsDropdownOpen(false);
      }
    }
    if (awsDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [awsDropdownOpen]);

  const update = (field, value) => {
    onChange({ ...data, [field]: value });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!data.partnerName?.trim()) newErrors.partnerName = 'Partner company name is required';
    if (!data.partnerLogo) newErrors.partnerLogo = 'Partner logo is required';
    if (!data.primaryColour?.trim()) newErrors.primaryColour = 'Primary brand colour is required';
    if (!data.targetAudience?.trim()) newErrors.targetAudience = 'Target audience is required';
    if (!data.industry) newErrors.industry = 'Industry is required';
    if (data.industry === 'Other' && !data.industryOther?.trim()) newErrors.industryOther = 'Please specify your industry';
    if (!data.keyMessage?.trim()) newErrors.keyMessage = 'Key message is required';
    if (!data.cta?.trim()) newErrors.cta = 'Call-to-action is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  const toggleGeo = (market) => {
    const current = data.geoMarkets || [];
    if (current.includes(market)) {
      update('geoMarkets', current.filter((m) => m !== market));
    } else {
      update('geoMarkets', [...current, market]);
    }
  };

  const toggleAwsService = (service) => {
    const current = data.awsServices || [];
    if (current.includes(service)) {
      update('awsServices', current.filter((s) => s !== service));
    } else {
      update('awsServices', [...current, service]);
    }
  };

  return (
    <div className="step-details">
      <h2 className="step-details__heading">Campaign Details</h2>
      <p className="step-details__description">
        Tell us about your partner and campaign goals.
      </p>

      <div className="step-details__form">
        {/* Partner company name */}
        <div className="form-field">
          <label className="form-field__label" htmlFor="partnerName">
            Partner company name <span className="form-field__required">*</span>
          </label>
          <input
            id="partnerName"
            type="text"
            className={`form-field__input${errors.partnerName ? ' form-field__input--error' : ''}`}
            value={data.partnerName || ''}
            onChange={(e) => update('partnerName', e.target.value)}
          />
          {errors.partnerName && <span className="form-field__error">{errors.partnerName}</span>}
        </div>

        {/* Partner logo */}
        <div className="form-field">
          <label className="form-field__label" htmlFor="partnerLogo">
            Partner logo <span className="form-field__required">*</span>
          </label>
          <input
            id="partnerLogo"
            type="file"
            accept=".png,.jpg,.jpeg,.svg"
            className="form-field__file"
            onChange={(e) => update('partnerLogo', e.target.files[0] || null)}
          />
          {data.partnerLogo && (
            <span className="form-field__filename">{data.partnerLogo.name}</span>
          )}
          {errors.partnerLogo && <span className="form-field__error">{errors.partnerLogo}</span>}
        </div>

        {/* AWS Partner badge */}
        <div className="form-field">
          <label className="form-field__label" htmlFor="partnerBadge">
            AWS Partner badge
          </label>
          <div className="form-field__badge-group">
            <select
              id="partnerBadge"
              className="form-field__select"
              value={data.partnerBadge || ''}
              onChange={(e) => update('partnerBadge', e.target.value)}
            >
              <option value="">Select tier...</option>
              {BADGE_TIERS.map((tier) => (
                <option key={tier} value={tier}>{tier}</option>
              ))}
            </select>
            <span className="form-field__badge-or">or upload:</span>
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.svg"
              className="form-field__file form-field__file--inline"
              onChange={(e) => update('partnerBadgeFile', e.target.files[0] || null)}
            />
          </div>
        </div>

        {/* Primary brand colour */}
        <div className="form-field">
          <label className="form-field__label" htmlFor="primaryColour">
            Primary brand colour <span className="form-field__required">*</span>
          </label>
          <div className="form-field__colour-group">
            <input
              id="primaryColour"
              type="color"
              className="form-field__colour-picker"
              value={data.primaryColour || '#FF9900'}
              onChange={(e) => update('primaryColour', e.target.value)}
            />
            <input
              type="text"
              className={`form-field__input form-field__input--short${errors.primaryColour ? ' form-field__input--error' : ''}`}
              placeholder="#FF9900"
              value={data.primaryColour || ''}
              onChange={(e) => update('primaryColour', e.target.value)}
            />
          </div>
          {errors.primaryColour && <span className="form-field__error">{errors.primaryColour}</span>}
        </div>

        {/* Secondary brand colour */}
        <div className="form-field">
          <label className="form-field__label" htmlFor="secondaryColour">
            Secondary brand colour
          </label>
          <div className="form-field__colour-group">
            <input
              id="secondaryColour"
              type="color"
              className="form-field__colour-picker"
              value={data.secondaryColour || '#232F3E'}
              onChange={(e) => update('secondaryColour', e.target.value)}
            />
            <input
              type="text"
              className="form-field__input form-field__input--short"
              placeholder="#232F3E"
              value={data.secondaryColour || ''}
              onChange={(e) => update('secondaryColour', e.target.value)}
            />
          </div>
        </div>

        {/* Target audience */}
        <div className="form-field">
          <label className="form-field__label" htmlFor="targetAudience">
            Target audience <span className="form-field__required">*</span>
          </label>
          <textarea
            id="targetAudience"
            className={`form-field__textarea${errors.targetAudience ? ' form-field__input--error' : ''}`}
            placeholder="Describe who you're trying to reach"
            value={data.targetAudience || ''}
            onChange={(e) => update('targetAudience', e.target.value)}
            rows={3}
          />
          {errors.targetAudience && <span className="form-field__error">{errors.targetAudience}</span>}
        </div>

        {/* Industry / sector */}
        <div className="form-field">
          <label className="form-field__label" htmlFor="industry">
            Industry / sector <span className="form-field__required">*</span>
          </label>
          <select
            id="industry"
            className={`form-field__select${errors.industry ? ' form-field__input--error' : ''}`}
            value={data.industry || ''}
            onChange={(e) => update('industry', e.target.value)}
          >
            <option value="">Select industry...</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
          {errors.industry && <span className="form-field__error">{errors.industry}</span>}
          {data.industry === 'Other' && (
            <input
              type="text"
              className={`form-field__input form-field__input--mt${errors.industryOther ? ' form-field__input--error' : ''}`}
              placeholder="Please specify..."
              value={data.industryOther || ''}
              onChange={(e) => update('industryOther', e.target.value)}
            />
          )}
          {errors.industryOther && <span className="form-field__error">{errors.industryOther}</span>}
        </div>

        {/* Geographic region */}
        <div className="form-field">
          <label className="form-field__label" htmlFor="geoRegion">Geographic region</label>
          <select
            id="geoRegion"
            className="form-field__select"
            value={data.geoRegion || ''}
            onChange={(e) => onChange({ ...data, geoRegion: e.target.value, geoMarkets: [] })}
          >
            <option value="">Select region...</option>
            {GEO_REGIONS.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        {/* Geographic market (filtered by region) */}
        {data.geoRegion && (
          <div className="form-field">
            <label className="form-field__label">Geographic market</label>
            <div className="form-field__checkbox-grid">
              {(GEO_MARKETS_BY_REGION[data.geoRegion] || []).map((market) => (
                <label key={market} className="form-field__checkbox-item">
                  <input
                    type="checkbox"
                    checked={(data.geoMarkets || []).includes(market)}
                    onChange={() => toggleGeo(market)}
                  />
                  <span>{market}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Campaign objective */}
        <div className="form-field">
          <label className="form-field__label">Campaign objective</label>
          <div className="form-field__radio-group">
            {CAMPAIGN_OBJECTIVES.map((obj) => (
              <label key={obj} className="form-field__radio-item">
                <input
                  type="radio"
                  name="campaignObjective"
                  value={obj}
                  checked={data.campaignObjective === obj}
                  onChange={(e) => update('campaignObjective', e.target.value)}
                />
                <span>{obj}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Key message */}
        <div className="form-field">
          <label className="form-field__label" htmlFor="keyMessage">
            Key message / value proposition <span className="form-field__required">*</span>
          </label>
          <textarea
            id="keyMessage"
            className={`form-field__textarea${errors.keyMessage ? ' form-field__input--error' : ''}`}
            placeholder="What's the main message you want to communicate?"
            value={data.keyMessage || ''}
            onChange={(e) => update('keyMessage', e.target.value)}
            rows={3}
          />
          {errors.keyMessage && <span className="form-field__error">{errors.keyMessage}</span>}
        </div>

        {/* Call-to-action */}
        <div className="form-field">
          <label className="form-field__label" htmlFor="cta">
            Call-to-action <span className="form-field__required">*</span>
          </label>
          <input
            id="cta"
            type="text"
            className={`form-field__input${errors.cta ? ' form-field__input--error' : ''}`}
            placeholder="e.g. Sign up for a free trial"
            value={data.cta || ''}
            onChange={(e) => update('cta', e.target.value)}
          />
          {errors.cta && <span className="form-field__error">{errors.cta}</span>}
        </div>

        {/* AWS product area */}
        <div className="form-field">
          <label className="form-field__label" htmlFor="awsProductArea">AWS product area</label>
          <select
            id="awsProductArea"
            className="form-field__select"
            value={data.awsProductArea || ''}
            onChange={(e) => {
              onChange({ ...data, awsProductArea: e.target.value, awsServices: [] });
            }}
          >
            <option value="">Select product area...</option>
            {AWS_PRODUCT_AREAS.map((area) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>

        {/* AWS services to highlight (filtered by product area) */}
        {data.awsProductArea && (
          <div className="form-field">
            <label className="form-field__label">AWS services to highlight</label>
            <div className="form-field__multiselect" ref={awsDropdownRef}>
              <button
                type="button"
                className="form-field__multiselect-trigger"
                onClick={() => setAwsDropdownOpen(!awsDropdownOpen)}
                aria-expanded={awsDropdownOpen}
              >
                {(data.awsServices || []).length > 0
                  ? `${(data.awsServices || []).length} selected`
                  : 'Select services...'}
                <span className="form-field__multiselect-arrow">{awsDropdownOpen ? '▲' : '▼'}</span>
              </button>
              {awsDropdownOpen && (
                <div className="form-field__multiselect-dropdown">
                  {(AWS_SERVICES_BY_AREA[data.awsProductArea] || []).map((service) => (
                    <label key={service} className="form-field__multiselect-option">
                      <input
                        type="checkbox"
                        checked={(data.awsServices || []).includes(service)}
                        onChange={() => toggleAwsService(service)}
                      />
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tone of voice */}
        <div className="form-field">
          <label className="form-field__label" htmlFor="tone">
            Tone of voice
          </label>
          <select
            id="tone"
            className="form-field__select"
            value={data.tone || ''}
            onChange={(e) => update('tone', e.target.value)}
          >
            <option value="">Select tone...</option>
            {TONES.map((tone) => (
              <option key={tone} value={tone}>{tone}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="step-details__actions">
        <button className="btn btn--secondary" onClick={onBack}>
          Back
        </button>
        <button className="btn btn--primary" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default StepDetails;
