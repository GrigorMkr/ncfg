/**
 * API Exports
 * 
 * Re-exports all API functions for easy imports.
 */

// Strapi client
export * from '../lib/strapi';

// News
export * from './news';

// Services
export * from './services';

// People
export * from './people';

// Data Provider (unified interface with fallback)
export * from './data-provider';

// Types
export * from './types/strapi';
export * from './types/service';
