/**
 * SSR entry point for server-side rendering
 * This file is used by Vite's SSR mode to render React components on the server
 */

import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { AppServer } from './AppServer';

export function render(url: string): string {
  try {
    // Ensure React is properly initialized for SSR
    // Use createElement to ensure proper React context
    const element = React.createElement(AppServer, { url });
    const html = renderToString(element);
    
    // Log success for debugging
    if (html && html.trim().length > 0) {
      console.log(`✅ SSR rendered ${url}, HTML length: ${html.length}`);
    } else {
      console.warn(`⚠️  SSR rendered ${url} but got empty HTML`);
    }
    return html;
  } catch (error) {
    // Log detailed error information
    console.error(`❌ SSR render error for ${url}:`, error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    // Return empty string to allow build to continue
    // The plugin will fall back to static HTML if SSR fails
    return '';
  }
}
