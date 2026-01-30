/**
 * Node.js ESM loader to handle image imports in SSR context.
 * Returns placeholder URLs so React components can render without errors.
 */

import { pathToFileURL } from 'node:url';

const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.bmp'];

export async function resolve(specifier, context, nextResolve) {
  // Check if this is an image import
  const isImage = imageExtensions.some(ext => specifier.endsWith(ext));
  
  if (isImage) {
    // Return a placeholder URL for images
    // In SSR, we don't need the actual image data, just a string URL
    const placeholderUrl = pathToFileURL('data:image/placeholder').href;
    return {
      shortCircuit: true,
      url: placeholderUrl,
    };
  }
  
  // For non-image imports, use the default resolver
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  // Handle our placeholder image URLs
  if (url.includes('data:image/placeholder')) {
    return {
      shortCircuit: true,
      format: 'module',
      source: `export default "/placeholder-image.jpg";`,
    };
  }
  
  // For everything else, use the default loader
  return nextLoad(url, context);
}
