const axios = require('axios');

async function check() {
  const urls = [
    'https://calendly.com/ismailkazia302/30min',
    'https://calendly.com/ismailkazia302',
    'https://calendly.com/ismailkazia'
  ];

  for (const url of urls) {
    try {
      const res = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      const is404 = res.data.includes('Sorry, we can’t find that page') || res.data.includes('404');
      console.log(`URL: ${url} -> Status: ${res.status} | Is 404 in HTML: ${is404}`);
      if (!is404) {
        console.log(`Found active page! Snippet:`, res.data.substring(0, 300));
      }
    } catch (e) {
      console.log(`URL: ${url} -> Error:`, e.response ? e.response.status : e.message);
    }
  }
}

check();
