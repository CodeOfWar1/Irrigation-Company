/**
 * Portfolio projects built from WEB SITE PICS subfolders.
 * Each top-level subfolder and each subfolder under "Residencial areas" is one project.
 *
 * Vite: use import.meta.glob instead of require.context.
 */
const imageModules = import.meta.glob('../images/WEB SITE PICS/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
});

const keys = Object.keys(imageModules);

function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function getProjectKey(path) {
  // path is a full relative path like "../images/WEB SITE PICS/FOLDER/file.jpg"
  const withoutPrefix = path.replace(/^\.{0,2}\//, '');
  const parts = withoutPrefix.split('/').filter(Boolean);
  // parts example:
  // ["images","WEB SITE PICS","Some Project","image.jpg"]
  const startIndex = parts.indexOf('WEB SITE PICS') + 1;
  const projectParts = parts.slice(startIndex);

  if (projectParts[0] === 'Residencial areas' && projectParts.length >= 2) {
    return projectParts.slice(0, 2).join('/');
  }
  return projectParts[0] || '';
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
  const mod = imageModules[key];
  // Vite's eager glob returns either the URL string as default export or the URL directly
  const src = typeof mod === 'string' ? mod : mod.default || mod;
  byFolder[folderKey].push(src);
});

const isResidential = (folderKey) => folderKey.startsWith('Residencial areas');

export const portfolioProjects = Object.entries(byFolder)
  .map(([folderKey, images]) => {
    let name = getDisplayName(folderKey);
    // Ensure proper casing for specific known names
    if (name && name.toLowerCase() === 'choma') {
      name = 'Choma';
    }
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
