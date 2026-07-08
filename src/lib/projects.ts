import { getCollection, type CollectionEntry } from 'astro:content';

export const TIER_ORDER = [
  'Flagship Campaigns',
  'Partnership Spotlight',
  'Events & Activations',
  'Digital Content Management',
] as const;

/** All projects in site order: tier order, then per-tier `order`.
 *  Drives both the Home index and case-study prev/next navigation. */
export async function getOrderedProjects(): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getCollection('projects');
  return TIER_ORDER.flatMap((tier) =>
    projects.filter((p) => p.data.tier === tier).sort((a, b) => a.data.order - b.data.order)
  );
}
