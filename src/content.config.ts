import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** One image/video slot. `file` is the extension-less base name per the
 *  asset naming convention; the build resolves the extension, or renders
 *  a labeled Placeholder when the file is absent. */
const mediaSlot = z.object({
  file: z.string(),
  alt: z.string(),
  label: z.string().optional(),
  type: z.enum(['image', 'video']).default('image'),
  ratio: z.string().optional(),
});

const heroSlot = mediaSlot.extend({ folder: z.string() });

const projects = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/projects' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    descriptor: z.string(),
    tier: z.enum([
      'Flagship Campaigns',
      'Partnership Spotlight',
      'Events & Activations',
      'Digital Content Management',
    ]),
    role_tag: z.string(),
    /** Position of the card within its tier on Home. */
    order: z.number().default(0),
    stat_strip: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .min(2)
      .max(4)
      .optional(),
    feature_copy: z.string().optional(),
    hero: heroSlot.optional(),
    /** Home-page card image; falls back to `hero` when absent. */
    thumbnail: heroSlot.optional(),
    blocks: z.array(
      z.object({
        heading: z.string(),
        badge: z.string().optional(),
        body: z.string().optional(),
        bullets: z.array(z.string()).optional(),
        /** Labeled entries (term + detail), e.g. a program/agenda. */
        entries: z.array(z.object({ term: z.string(), detail: z.string() })).optional(),
        talent: z
          .array(
            z.object({
              name: z.string(),
              country: z.string(),
              link_label: z.string().optional(),
              url: z.string().optional(),
              portrait: heroSlot.optional(),
            })
          )
          .optional(),
        table: z
          .object({
            columns: z.array(z.string()),
            rows: z.array(z.array(z.string())),
          })
          .optional(),
        /** Name of a gallery (from `galleries`) rendered inline after this
         *  block — used by The Signal's labeled sub-blocks. */
        gallery: z.string().optional(),
      })
    ),
    partner_tags: z.array(z.string()).optional(),
    /** Optional page-specific heading for the proof section (default "Proof"). */
    proof_title: z.string().optional(),
    /** Optional page-specific intro line under the proof heading. */
    proof_lede: z.string().optional(),
    link_list: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().optional(),
          /** Optional sub-heading rendered above this link's platform row. */
          heading: z.string().optional(),
        })
      )
      .optional(),
    galleries: z
      .array(
        z.object({
          name: z.string(),
          purpose: z.string(),
          folder_slug: z.string(),
          slots: z.array(mediaSlot),
        })
      )
      .optional(),
  }),
});

export const collections = { projects };
