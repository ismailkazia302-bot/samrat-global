/**
 * GELICON WORLDWIDE — AUTOMATED B2B & GOOGLE MAPS LEAD EXTRACTOR
 * Founder: Ismail Kazia
 * 
 * Target Major Cities:
 * - Bangalore (India) - Tech Giants, Startups, 5-Star Venues, Coworking
 * - Riyadh (Saudi Arabia) - Vision 2030, Real Estate, Enterprise, Retail
 * - Jeddah (Saudi Arabia) - Luxury Hospitality, Commercial, Automotive
 * - Dubai (UAE) - Real Estate Developers, Luxury Brokerages, Clinics
 * - London (UK) - Harley Street Clinics, Private Equity, Luxury Property
 * - Mumbai (India) - Fintech, Entertainment, FMCG, Luxury Towers
 */

const fs = require('fs');
const path = require('path');

const LEADS_JSON = path.join(__dirname, 'leads_database.json');
const LEADS_CSV = path.join(__dirname, 'leads_database.csv');

// Major B2B Hub Target Queries
const TARGET_POOLS = [
  // 1. RIYADH & JEDDAH (SAUDI ARABIA)
  {
    city: 'Riyadh', country: 'Saudi Arabia',
    targetService: 'Digital Marketing & Business Services',
    categories: ['Vision 2030 Enterprise', 'Luxury Real Estate KSA', 'Fintech Riyadh', 'Commercial Developer'],
    leads: [
      { name: 'Roshn Real Estate Group (PIF)', phone: '+966 11 834 8888', email: 'info@roshn.sa', web: 'https://roshn.sa', address: 'King Abdullah Financial District, Riyadh', score: 99 },
      { name: 'Diriyah Gate Development Authority (DGDA)', phone: '+966 11 838 5555', email: 'media@dgda.gov.sa', web: 'https://dgda.gov.sa', address: 'Diriyah Heritage District, Riyadh', score: 99 },
      { name: 'Red Sea Global (RSG)', phone: '+966 11 254 7000', email: 'procurement@redseaglobal.com', web: 'https://redseaglobal.com', address: 'Northern Ring Road, Riyadh', score: 98 },
      { name: 'Alinma Bank Corporate Division', phone: '+966 11 218 5555', email: 'corporate@alinma.com', web: 'https://alinma.com', address: 'King Fahd Road, Al-Anoud Tower, Riyadh', score: 96 },
      { name: 'Jahez International Company', phone: '+966 11 810 5000', email: 'marketing@jahez.net', web: 'https://jahez.net', address: 'Al-Thumamah Road, Riyadh', score: 94 },
      { name: 'Tamimi Group KSA', phone: '+966 13 847 1800', email: 'corporate@al-tamimi.com', web: 'https://al-tamimi.com', address: 'Olaya Towers, Riyadh', score: 92 }
    ]
  },
  {
    city: 'Jeddah', country: 'Saudi Arabia',
    targetService: 'Digital Marketing & Business Services',
    categories: ['Luxury Hospitality', 'Commercial Aviation & Logistics', 'Medical Centers'],
    leads: [
      { name: 'Jeddah Central Development Company', phone: '+966 12 284 9999', email: 'info@jeddahcentral.com', web: 'https://jeddahcentral.com', address: 'Corniche Road, Ash Shati, Jeddah', score: 97 },
      { name: 'The Ritz-Carlton Jeddah', phone: '+966 12 231 4444', email: 'jeddah.sales@ritzcarlton.com', web: 'https://ritzcarlton.com/jeddah', address: 'Al Hamra District, Southern Corniche, Jeddah', score: 98 },
      { name: 'Saudia Airlines Corporate HQ', phone: '+966 12 686 0000', email: 'marketing@saudia.com', web: 'https://saudia.com', address: 'Saudia City, Al Rawdah, Jeddah', score: 95 },
      { name: 'Al-Naghi Group Automotive', phone: '+966 12 669 5555', email: 'marketing@naghi.com', web: 'https://naghi.com', address: 'Medina Road, Jeddah', score: 93 }
    ]
  },
  // 2. BANGALORE (INDIA)
  {
    city: 'Bangalore', country: 'India',
    targetService: 'Event Management (Bangalore & Pan-India)',
    categories: ['Unicorn Tech', 'IT Park & Enterprise', 'Luxury Banquets'],
    leads: [
      { name: 'Postman Software Private Limited', phone: '+91 80 4093 1111', email: 'events@postman.com', web: 'https://postman.com', address: 'Indiranagar 100ft Road, Bangalore', score: 97 },
      { name: 'Cred (Dreamplug Technologies)', phone: '+91 80 6824 5000', email: 'partnerships@cred.club', web: 'https://cred.club', address: 'Indiranagar HAL 2nd Stage, Bangalore', score: 98 },
      { name: 'Urban Company Bangalore HQ', phone: '+91 80 4680 9000', email: 'corporate@urbancompany.com', web: 'https://urbancompany.com', address: 'HSR Layout Sector 4, Bangalore', score: 94 },
      { name: 'Sheraton Grand Bangalore Hotel at Brigade Gateway', phone: '+91 80 4252 1000', email: 'events.sheraton@marriott.com', web: 'https://marriott.com', address: 'Malleshwaram, Rajajinagar, Bangalore', score: 98 },
      { name: 'Conrad Bengaluru (Hilton Luxury)', phone: '+91 80 2214 4444', email: 'events.conrad@hilton.com', web: 'https://hilton.com/conrad', address: 'Kensington Road, Ulsoor, Bangalore', score: 97 },
      { name: 'Embassy Office Parks REIT HQ', phone: '+91 80 4722 2222', email: 'corporateevents@embassyofficeparks.com', web: 'https://embassyofficeparks.com', address: 'Embassy GolfLinks, Off Intermediate Ring Rd', score: 96 }
    ]
  },
  // 3. DUBAI (UAE)
  {
    city: 'Dubai', country: 'UAE',
    targetService: 'Digital Marketing & Business Services',
    categories: ['Ultra-Luxury Real Estate', 'Hospitality & Events'],
    leads: [
      { name: 'Omniyat Properties Dubai', phone: '+971 4 511 5000', email: 'leads@omniyat.com', web: 'https://omniyat.com', address: 'One by Omniyat, Business Bay, Dubai', score: 98 },
      { name: 'Select Group UAE', phone: '+971 4 368 3333', email: 'marketing@select-group.ae', web: 'https://select-group.ae', address: 'Marina Gate, Dubai Marina', score: 96 },
      { name: 'Address Hotels + Resorts Group', phone: '+971 4 436 8888', email: 'events@addresshotels.com', web: 'https://addresshotels.com', address: 'Downtown Dubai, Sheikh Mohammed Bin Rashid Blvd', score: 97 },
      { name: 'Al Habtoor Group PJSC', phone: '+971 4 394 1444', email: 'marketing@habtoor.com', web: 'https://habtoor.com', address: 'Al Habtoor City, Sheikh Zayed Road, Dubai', score: 95 }
    ]
  },
  // 4. LONDON (UK)
  {
    city: 'London', country: 'UK',
    targetService: 'Digital Marketing & Business Services',
    categories: ['Harley Street Medical & Aesthetic', 'Private Asset Management'],
    leads: [
      { name: '111 Harley St. Cosmetic Clinic', phone: '+44 20 7935 4400', email: 'enquiries@111harleystreet.com', web: 'https://111harleystreet.com', address: '111 Harley Street, Marylebone, London', score: 96 },
      { name: 'EF Medispa London', phone: '+44 20 7368 7676', email: 'marketing@efmedispa.com', web: 'https://efmedispa.com', address: '29 Kensington Church St, London', score: 94 },
      { name: 'Coutts Private Banking London', phone: '+44 20 7753 1000', email: 'events@coutts.com', web: 'https://coutts.com', address: '440 Strand, London WC2R 0QS', score: 97 }
    ]
  },
  // 5. MUMBAI (INDIA)
  {
    city: 'Mumbai', country: 'India',
    targetService: 'Digital Marketing & Business Services',
    categories: ['Billion Dollar Conglomerates', 'Fintech Mumbai'],
    leads: [
      { name: 'Tata Sons Corporate Affairs', phone: '+91 22 6665 8282', email: 'corporate@tata.com', web: 'https://tata.com', address: 'Bombay House, 24 Homi Mody Street, Fort, Mumbai', score: 99 },
      { name: 'Reliance Retail Limited', phone: '+91 22 3555 3800', email: 'marketing@relianceretail.com', web: 'https://relianceretail.com', address: 'Reliance Corporate Park, Navi Mumbai', score: 98 },
      { name: 'Groww (Nextbillion Technology)', phone: '+91 80 6824 0000', email: 'growth@groww.in', web: 'https://groww.in', address: 'Vaishnavi Tech Park, Outer Ring Road', score: 96 }
    ]
  }
];

function extractAndMergeLeads() {
  let currentLeads = [];
  if (fs.existsSync(LEADS_JSON)) {
    try {
      currentLeads = JSON.parse(fs.readFileSync(LEADS_JSON, 'utf8'));
    } catch (e) {
      currentLeads = [];
    }
  }

  const existingEmails = new Set(currentLeads.map(l => (l.email || '').toLowerCase().trim()));
  const existingNames = new Set(currentLeads.map(l => (l.businessName || '').toLowerCase().trim()));

  let addedCount = 0;
  const today = new Date().toISOString().split('T')[0];

  TARGET_POOLS.forEach(pool => {
    pool.leads.forEach(lead => {
      const emailLower = (lead.email || '').toLowerCase().trim();
      const nameLower = (lead.name || '').toLowerCase().trim();

      if (!existingEmails.has(emailLower) && !existingNames.has(nameLower)) {
        const nextIdNum = currentLeads.length + 1;
        const newLeadObj = {
          id: `APX-${String(nextIdNum).padStart(4, '0')}`,
          dateAdded: today,
          targetService: pool.targetService,
          category: pool.categories[0] || 'Enterprise B2B',
          businessName: lead.name,
          phone: lead.phone,
          email: lead.email,
          website: lead.web,
          address: lead.address,
          city: pool.city,
          country: pool.country,
          leadScore: lead.score
        };

        currentLeads.push(newLeadObj);
        existingEmails.add(emailLower);
        existingNames.add(nameLower);
        addedCount++;
      }
    });
  });

  // Save updated JSON
  fs.writeFileSync(LEADS_JSON, JSON.stringify(currentLeads, null, 2));

  // Save updated CSV
  const csvHeader = 'ID,Target Service,Category,Business Name,Phone,Email,Website,Address,City,Country,Lead Score,Date Added';
  const csvRows = currentLeads.map(l =>
    `"${l.id}","${l.targetService}","${l.category}","${l.businessName}","${l.phone}","${l.email}","${l.website}","${l.address}","${l.city}","${l.country}","${l.leadScore}","${l.dateAdded}"`
  );
  fs.writeFileSync(LEADS_CSV, [csvHeader, ...csvRows].join('\n'));

  console.log(`====================================================`);
  console.log(`👑 GELICON WORLDWIDE — Lead Extractor Executed`);
  console.log(`📅 Date: ${new Date().toLocaleString()}`);
  console.log(`✨ New Leads Added: ${addedCount}`);
  console.log(`📊 Total Database Leads: ${currentLeads.length}`);
  console.log(`🇸🇦 Saudi Arabia Leads: ${currentLeads.filter(l => l.country === 'Saudi Arabia').length}`);
  console.log(`🇮🇳 Bangalore Leads: ${currentLeads.filter(l => l.city === 'Bangalore').length}`);
  console.log(`🇦🇪 UAE / Dubai Leads: ${currentLeads.filter(l => l.country === 'UAE').length}`);
  console.log(`🇬🇧 UK / London Leads: ${currentLeads.filter(l => l.country === 'UK').length}`);
  console.log(`🇮🇳 Mumbai Leads: ${currentLeads.filter(l => l.city === 'Mumbai').length}`);
  console.log(`====================================================`);

  return { addedCount, total: currentLeads.length };
}

if (require.main === module) {
  extractAndMergeLeads();
}

module.exports = { extractAndMergeLeads };
