import { useState, useEffect } from 'react';
import { supabase } from '../supabase/client';
import { portfolioProjects as staticProjects } from './portfolioProjects';

const SECTOR_RESIDENTIAL = 'Residential';
const SECTOR_COMMERCIAL = 'Commercial & institutional';

/**
 * Fetches portfolio projects from Supabase and merges with static (file-based) projects.
 * Supabase projects have: id (uuid), name, sector, image_urls (array).
 * Returns same shape as static: { id, name, sector, images }.
 */
export function usePortfolioProjects() {
  const [dbProjects, setDbProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDb = async () => {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('id, name, sector, image_urls')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Portfolio (Supabase):', error.message);
        setDbProjects([]);
      } else {
        const normalized = (data || []).map((row) => ({
          id: String(row.id),
          name: row.name || 'Project',
          sector: row.sector === SECTOR_RESIDENTIAL ? SECTOR_RESIDENTIAL : SECTOR_COMMERCIAL,
          images: Array.isArray(row.image_urls) ? row.image_urls : (row.image_urls ? [row.image_urls] : []),
        })).filter((p) => p.images.length > 0);
        setDbProjects(normalized);
      }
      setLoading(false);
    };
    fetchDb();
  }, []);

  const projects = [...staticProjects, ...dbProjects];
  return { projects, loading, dbProjects };
}
