/**
 * Campaign library storage using localStorage.
 * Each campaign stores: form data, generated content, timestamp, name.
 * Note: File objects (logos) cannot be stored in localStorage, so we store
 * them as data URLs when saving.
 */

const STORAGE_KEY = 'campaign-builder-library';

function getLibrary() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLibrary(library) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
}

/**
 * Convert a File object to a data URL for storage.
 */
function fileToDataUrl(file) {
  return new Promise((resolve) => {
    if (!file || !(file instanceof File)) {
      resolve(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}

/**
 * Prepare form data for storage (convert File objects to data URLs).
 */
async function serializeFormData(formData) {
  const serialized = JSON.parse(JSON.stringify(formData, (key, value) => {
    // Skip File objects in initial JSON pass
    if (value instanceof File) return '__FILE_PLACEHOLDER__';
    return value;
  }));

  // Convert logo files to data URLs
  if (formData.details.partnerLogo) {
    serialized.details.partnerLogo = await fileToDataUrl(formData.details.partnerLogo);
    serialized.details._partnerLogoName = formData.details.partnerLogo.name;
  }
  if (formData.details.partnerBadgeFile) {
    serialized.details.partnerBadgeFile = await fileToDataUrl(formData.details.partnerBadgeFile);
    serialized.details._partnerBadgeFileName = formData.details.partnerBadgeFile.name;
  }

  return serialized;
}

/**
 * Save a campaign to the library.
 */
export async function saveCampaign({ name, formData, generatedContent, generatedImages }) {
  const library = getLibrary();
  const serializedFormData = await serializeFormData(formData);

  const campaign = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    name,
    createdAt: new Date().toISOString(),
    formData: serializedFormData,
    generatedContent,
    generatedImages,
  };

  library.unshift(campaign);
  saveLibrary(library);
  return campaign;
}

/**
 * Get all saved campaigns.
 */
export function getCampaigns() {
  return getLibrary();
}

/**
 * Get a single campaign by ID.
 */
export function getCampaignById(id) {
  const library = getLibrary();
  return library.find((c) => c.id === id) || null;
}

/**
 * Delete a campaign by ID.
 */
export function deleteCampaign(id) {
  const library = getLibrary();
  const updated = library.filter((c) => c.id !== id);
  saveLibrary(updated);
}

/**
 * Clone a campaign (returns a new unsaved copy with updated name).
 */
export function cloneCampaignData(campaign) {
  return {
    formData: JSON.parse(JSON.stringify(campaign.formData)),
    generatedContent: null,
    generatedImages: null,
  };
}
