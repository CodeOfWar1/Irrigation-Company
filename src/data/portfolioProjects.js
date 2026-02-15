/**
 * Portfolio projects built from WEB SITE PICS subfolders.
 * Each top-level subfolder and each subfolder under "Residencial areas" is one project.
 */
const ctx = require.context(
  '../images/WEB SITE PICS',
  true,
  /\.(jpg|jpeg|png|webp)$/i
);

const keys = ctx.keys();

function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function getProjectKey(path) {
  const parts = path.slice(2).split('/').filter(Boolean);
  if (parts[0] === 'Residencial areas' && parts.length >= 2) {
    return parts.slice(0, 2).join('/');
  }
  return parts[0] || '';
}

function getDisplayName(folderKey) {
  if (folderKey.includes('/')) {
    return folderKey.split('/')[1] || folderKey;
  }
  return folderKey;
}

const byFolder = {};
keys.forEach((key) => {
  const folderKey = getProjectKey(key);
  if (!folderKey) return;
  if (!byFolder[folderKey]) byFolder[folderKey] = [];
  byFolder[folderKey].push(ctx(key));
});

const isResidential = (folderKey) => folderKey.startsWith('Residencial areas');

export const portfolioProjects = Object.entries(byFolder)
  .map(([folderKey, images]) => {
    const name = getDisplayName(folderKey);
    const slug = isResidential(folderKey)
      ? slugify(getDisplayName(folderKey))
      : slugify(folderKey);
    return {
      id: slug,
      name,
      sector: isResidential(folderKey) ? 'Residential' : 'Commercial & institutional',
      images,
    };
  })
  .sort((a, b) => {
    if (a.sector === 'Residential' && b.sector !== 'Residential') return 1;
    if (a.sector !== 'Residential' && b.sector === 'Residential') return -1;
    return a.name.localeCompare(b.name);
  });
