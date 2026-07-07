import fs from 'node:fs';
import path from 'node:path';

const IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif', 'svg'];
const VIDEO_EXTS = ['mp4', 'webm', 'mov'];

/**
 * Resolve a public image/video by folder slug and extension-less base name
 * (naming convention: <folder-slug>-<descriptor>-<n>.<ext>). Returns the
 * public URL path if the file exists at build time, otherwise null — the
 * caller renders a labeled Placeholder so assets can be dropped in later
 * without code changes.
 */
function findPublicMedia(folder: string, base: string, exts: string[]): string | null {
  for (const ext of exts) {
    const rel = `images/${folder}/${base}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), 'public', rel))) {
      return `/${rel}`;
    }
  }
  return null;
}

export function findPublicImage(folder: string, base: string): string | null {
  return findPublicMedia(folder, base, IMAGE_EXTS);
}

export function findPublicVideo(folder: string, base: string): string | null {
  return findPublicMedia(folder, base, VIDEO_EXTS);
}
