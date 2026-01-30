/**
 * Test script to directly test SSR rendering
 */

import { pathToFileURL } from 'node:url';
import { join } from 'path';
import { existsSync } from 'fs';

async function testSSR() {
  const ssrEntryPath = join(process.cwd(), 'dist/ssr/entry-server.js');
  
  if (!existsSync(ssrEntryPath)) {
    console.error('❌ SSR bundle not found. Please run build first.');
    process.exit(1);
  }

  try {
    console.log('📥 Loading SSR module...');
    const ssrEntryUrl = pathToFileURL(ssrEntryPath).href;
    const { render } = await import(ssrEntryUrl);
    console.log('✅ SSR module loaded');

    console.log('🎨 Testing SSR render for route: /');
    const html = render('/');
    
    if (html && html.trim().length > 0) {
      console.log(`✅ SSR render successful! HTML length: ${html.length}`);
      console.log('\n--- First 500 characters of rendered HTML ---');
      console.log(html.substring(0, 500));
      console.log('\n--- Checking for h tags ---');
      const h1Count = (html.match(/<h1[^>]*>/gi) || []).length;
      const h2Count = (html.match(/<h2[^>]*>/gi) || []).length;
      const h3Count = (html.match(/<h3[^>]*>/gi) || []).length;
      console.log(`Found: ${h1Count} h1 tags, ${h2Count} h2 tags, ${h3Count} h3 tags`);
    } else {
      console.error('❌ SSR render returned empty HTML');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ SSR test failed:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    process.exit(1);
  }
}

testSSR();
