const axios = require('axios');
const { getCache, setCache } = require('../utils/cache');

const analyzeUrl = async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  const cacheKey = `performance:${url}`;
  const cached = getCache(cacheKey);
  if (cached) return res.json({ fromCache: true, ...cached });

  try {
    const { data } = await axios.get(
      'https://www.googleapis.com/pagespeedonline/v5/runPagespeed',
      {
        params: {
          url,
          strategy: 'mobile',
          key: process.env.PSI_API_KEY
        }
      }
    );

    const lighthouse = data.lighthouseResult;
    const loadTime = lighthouse.audits['speed-index'].displayValue;
    const pageSizeKB = (lighthouse.audits['total-byte-weight'].numericValue / 1024).toFixed(2);
    const requestCount = lighthouse.audits['network-requests'].details.items.length;

    const result = { loadTime, pageSizeKB, requestCount };
    setCache(cacheKey, result);

    return res.json(result);
  } catch (error) {
    console.error('Analysis error:', error.message);
    return res.status(500).json({ error: 'Failed to analyze the URL.' });
  }
};

module.exports = { analyzeUrl };
