const axios = require('axios');
const fs = require('fs');

async function inspect() {
  try {
    const res = await axios.get('https://calendly.com/ismailkazia302', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    console.log('Status:', res.status);
    fs.writeFileSync('calendly_profile.html', res.data, 'utf8');

    // Look for event types in JSON or HTML
    const jsonMatch = res.data.match(/<script type="application\/json" id="server-state">(.*?)<\/script>/s);
    if (jsonMatch) {
      console.log('Found server-state JSON! Length:', jsonMatch[1].length);
      fs.writeFileSync('server_state.json', jsonMatch[1], 'utf8');
    }

    // Regex for links
    const links = res.data.match(/href="\/ismailkazia302\/[^"]+"/g);
    console.log('Links found:', links);

    // Look for any event slug
    const eventCards = res.data.match(/data-event-type="[^"]+"/g);
    console.log('Event types:', eventCards);

    // Check if there is text like "No events available" or similar
    if (res.data.includes('No events') || res.data.includes('no event')) {
      console.log('Notice: No events active on profile!');
    }
  } catch (e) {
    console.error('Error:', e.message);
  }
}

inspect();
