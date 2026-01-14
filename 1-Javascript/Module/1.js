// Static import
import configData1 from './config-data.json' with { type: 'json' };

// Dynamic import
const configData2 = await import(
  './config-data.json', { with: { type: 'json' } }
);