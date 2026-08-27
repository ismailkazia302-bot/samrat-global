const fs = require('fs');
const path = require('path');

const LEADS_FILE = path.join(__dirname, 'leads_database.json');
const currentLeads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));

const BATCH_3 = [
  // SAUDI ARABIA - RIYADH & EASTERN PROVINCE (12 leads)
  {
    targetService: 'Digital Marketing & Business Services',
    category: 'Sovereign Wealth & Mega Projects',
    businessName: 'Qiddiya Investment Company (PIF)',
    phone: '+966 11 829 0000',
    email: 'info@qiddiya.com',
    website: 'https://qiddiya.com',
    address: 'Qiddiya Entertainment City, Riyadh',
    city: 'Riyadh',
    country: 'Saudi Arabia',
    leadScore: 99
  },
  {
    targetService: 'Digital Marketing & Business Services',
    category: 'Commercial Conglomerate',
    businessName: 'Olayan Financing Company',
    phone: '+966 11 477 7555',
    email: 'corporate@olayan.com',
    website: 'https://olayan.com',
    address: 'Al-Hasa Street, Riyadh',
    city: 'Riyadh',
    country: 'Saudi Arabia',
    leadScore: 97
  },
  {
    targetService: 'Digital Marketing & Business Services',
    category: 'Industrial Conglomerate',
    businessName: 'Zamil Industrial Investment Company',
    phone: '+966 13 810 8000',
    email: 'corporate@zamilindustrial.com',
    website: 'https://zamilindustrial.com',
    address: 'First Industrial City, Dammam',
    city: 'Dammam',
    country: 'Saudi Arabia',
    leadScore: 96
  },
  {
    targetService: 'Digital Marketing & Business Services',
    category: 'Petrochemical & Energy Services',
    businessName: 'Rawabi Holding Group',
    phone: '+966 13 865 7000',
    email: 'info@rawabiholding.com',
    website: 'https://rawabiholding.com',
    address: 'Prince Turki Street, Al Khobar',
    city: 'Al Khobar',
    country: 'Saudi Arabia',
    leadScore: 97
  },
  {
    targetService: 'Digital Marketing & Business Services',
    category: 'Luxury Hospitality KSA',
    businessName: 'Four Seasons Hotel Riyadh at Kingdom Centre',
    phone: '+966 11 211 5000',
    email: 'events.riyadh@fourseasons.com',
    website: 'https://fourseasons.com/riyadh',
    address: 'Kingdom Tower, Olaya, Riyadh',
    city: 'Riyadh',
    country: 'Saudi Arabia',
    leadScore: 98
  },
  {
    targetService: 'Digital Marketing & Business Services',
    category: 'Fintech Unicorn Saudi',
    businessName: 'Tamara Fintech KSA',
    phone: '+966 11 520 2020',
    email: 'partnerships@tamara.co',
    website: 'https://tamara.co',
    address: 'Al Malqa, Riyadh',
    city: 'Riyadh',
    country: 'Saudi Arabia',
    leadScore: 98
  },
  {
    targetService: 'Digital Marketing & Business Services',
    category: 'Fintech Unicorn Saudi',
    businessName: 'Tabby Saudi Arabia',
    phone: '+966 11 511 8888',
    email: 'merchant@tabby.ai',
    website: 'https://tabby.ai',
    address: 'Digital City, Riyadh',
    city: 'Riyadh',
    country: 'Saudi Arabia',
    leadScore: 97
  },
  {
    targetService: 'Digital Marketing & Business Services',
    category: 'Commercial Real Estate',
    businessName: 'Al Akaria (Saudi Real Estate Co.)',
    phone: '+966 11 460 0000',
    email: 'info@al-akaria.com',
    website: 'https://al-akaria.com',
    address: 'Olaya Towers, King Fahd Rd, Riyadh',
    city: 'Riyadh',
    country: 'Saudi Arabia',
    leadScore: 95
  },
  {
    targetService: 'Digital Marketing & Business Services',
    category: 'Logistics & Supply Chain',
    businessName: 'Almajdouie Logistics Group',
    phone: '+966 13 819 8111',
    email: 'marketing@almajdouie.com',
    website: 'https://almajdouie.com',
    address: 'King Fahad Road, Dammam',
    city: 'Dammam',
    country: 'Saudi Arabia',
    leadScore: 94
  },
  {
    targetService: 'Digital Marketing & Business Services',
    category: 'Private Healthcare KSA',
    businessName: 'Dr. Sulaiman Al Habib Medical Group',
    phone: '+966 11 525 9999',
    email: 'corporate@hmg.com',
    website: 'https://hmg.com',
    address: 'King Fahd Road, Olaya, Riyadh',
    city: 'Riyadh',
    country: 'Saudi Arabia',
    leadScore: 98
  },
  {
    targetService: 'Digital Marketing & Business Services',
    category: 'Automotive Luxury KSA',
    businessName: 'Al Jazirah Vehicles Agencies (Ford Luxury)',
    phone: '+966 11 231 0000',
    email: 'marketing@aljazirah.com.sa',
    website: 'https://aljazirahford.com',
    address: 'Khurais Road, Riyadh',
    city: 'Riyadh',
    country: 'Saudi Arabia',
    leadScore: 93
  },
  {
    targetService: 'Digital Marketing & Business Services',
    category: 'Food & Beverage Chain',
    businessName: 'Herfy Food Services Company',
    phone: '+966 11 450 9767',
    email: 'marketing@herfy.com',
    website: 'https://herfy.com',
    address: 'Al Moroj District, Riyadh',
    city: 'Riyadh',
    country: 'Saudi Arabia',
    leadScore: 92
  },

  // BANGALORE DEEPTECH & LUXURY (12 leads)
  {
    targetService: 'Event Management (Bangalore & Pan-India)',
    category: 'AI & DeepTech Unicorn',
    businessName: 'Hasura Technologies',
    phone: '+91 80 4719 3000',
    email: 'events@hasura.io',
    website: 'https://hasura.io',
    address: 'Koramangala 4th Block, Bangalore',
    city: 'Bangalore',
    country: 'India',
    leadScore: 96
  },
  {
    targetService: 'Event Management (Bangalore & Pan-India)',
    category: 'Logistics Tech Unicorn',
    businessName: 'Delhivery Bangalore Hub',
    phone: '+91 124 671 9500',
    email: 'events@delhivery.com',
    website: 'https://delhivery.com',
    address: 'Electronic City Phase 1, Bangalore',
    city: 'Bangalore',
    country: 'India',
    leadScore: 95
  },
  {
    targetService: 'Event Management (Bangalore & Pan-India)',
    category: 'Gaming & Metaverse',
    businessName: 'Gameskraft Technologies',
    phone: '+91 80 6813 5000',
    email: 'brand@gameskraft.com',
    website: 'https://gameskraft.com',
    address: 'Prestige Tech Park, Marathahalli, Bangalore',
    city: 'Bangalore',
    country: 'India',
    leadScore: 94
  },
  {
    targetService: 'Event Management (Bangalore & Pan-India)',
    category: 'B2B E-commerce Unicorn',
    businessName: 'Udaan (Hiveloop Technology)',
    phone: '+91 80 4683 4000',
    email: 'corporate@udaan.com',
    website: 'https://udaan.com',
    address: 'Indiqube Zeta, Marathahalli, Bangalore',
    city: 'Bangalore',
    country: 'India',
    leadScore: 95
  },
  {
    targetService: 'Event Management (Bangalore & Pan-India)',
    category: 'Luxury Hotel & Convention Venue',
    businessName: 'Four Seasons Hotel Bengaluru at Embassy ONE',
    phone: '+91 80 4522 2222',
    email: 'events.bengaluru@fourseasons.com',
    website: 'https://fourseasons.com/bengaluru',
    address: 'Bellary Road, Ganganagar, Bangalore',
    city: 'Bangalore',
    country: 'India',
    leadScore: 99
  },
  {
    targetService: 'Event Management (Bangalore & Pan-India)',
    category: 'Luxury Heritage Hotel',
    businessName: 'The Oberoi Bengaluru',
    phone: '+91 80 2558 5858',
    email: 'events.bengaluru@oberoihotels.com',
    website: 'https://oberoihotels.com',
    address: '37-39, MG Road, Yellappa Garden, Bangalore',
    city: 'Bangalore',
    country: 'India',
    leadScore: 99
  },
  {
    targetService: 'Event Management (Bangalore & Pan-India)',
    category: 'Enterprise Coworking',
    businessName: 'IndiQube Bangalore Tech Spaces',
    phone: '+91 80 4646 4000',
    email: 'events@indiqube.com',
    website: 'https://indiqube.com',
    address: 'Outer Ring Road, Kadubeesanahalli, Bangalore',
    city: 'Bangalore',
    country: 'India',
    leadScore: 93
  },
  {
    targetService: 'Event Management (Bangalore & Pan-India)',
    category: 'Fintech Unicorn',
    businessName: 'Slice (GaragePreneurs Internet)',
    phone: '+91 80 4709 6430',
    email: 'partnerships@sliceit.com',
    website: 'https://sliceit.com',
    address: 'Indiranagar 100ft Road, Bangalore',
    city: 'Bangalore',
    country: 'India',
    leadScore: 95
  },
  {
    targetService: 'Event Management (Bangalore & Pan-India)',
    category: 'Health & Fitness Unicorn',
    businessName: 'Curefoods / Cult.fit',
    phone: '+91 80 4680 7700',
    email: 'events@cult.fit',
    website: 'https://cult.fit',
    address: 'HSR Layout Sector 2, Bangalore',
    city: 'Bangalore',
    country: 'India',
    leadScore: 96
  },
  {
    targetService: 'Event Management (Bangalore & Pan-India)',
    category: 'Edtech Leader',
    businessName: 'Unacademy (Sorting Hat Technologies)',
    phone: '+91 80 4719 0000',
    email: 'events@unacademy.com',
    website: 'https://unacademy.com',
    address: 'Marathahalli - Sarjapur Outer Ring Rd, Bangalore',
    city: 'Bangalore',
    country: 'India',
    leadScore: 94
  },
  {
    targetService: 'Event Management (Bangalore & Pan-India)',
    category: 'Aerospace & EV Tech',
    businessName: 'Ather Energy Private Limited',
    phone: '+91 80 6646 5700',
    email: 'corporate@atherenergy.com',
    website: 'https://atherenergy.com',
    address: 'IBC Knowledge Park, Bannerghatta Rd, Bangalore',
    city: 'Bangalore',
    country: 'India',
    leadScore: 97
  },
  {
    targetService: 'Event Management (Bangalore & Pan-India)',
    category: 'SaaS Unicorn',
    businessName: 'Postman Labs Bangalore Hub',
    phone: '+91 80 4122 8000',
    email: 'community@postman.com',
    website: 'https://postman.com',
    address: 'Indiranagar, Bangalore',
    city: 'Bangalore',
    country: 'India',
    leadScore: 98
  }
];

const today = new Date().toISOString().split('T')[0];
const existingEmails = new Set(currentLeads.map(l => (l.email || '').toLowerCase().trim()));

let added = 0;
BATCH_3.forEach(lead => {
  if (!existingEmails.has(lead.email.toLowerCase().trim())) {
    currentLeads.push({
      id: `APX-${String(currentLeads.length + 1).padStart(4, '0')}`,
      dateAdded: today,
      ...lead
    });
    existingEmails.add(lead.email.toLowerCase().trim());
    added++;
  }
});

fs.writeFileSync(LEADS_FILE, JSON.stringify(currentLeads, null, 2));

// Save CSV
const csvHeader = 'ID,Target Service,Category,Business Name,Phone,Email,Website,Address,City,Country,Lead Score,Date Added';
const csvRows = currentLeads.map(l =>
  `"${l.id}","${l.targetService}","${l.category}","${l.businessName}","${l.phone}","${l.email}","${l.website}","${l.address}","${l.city}","${l.country}","${l.leadScore}","${l.dateAdded}"`
);
fs.writeFileSync(path.join(__dirname, 'leads_database.csv'), [csvHeader, ...csvRows].join('\n'));

console.log(`✅ Leads expanded! Added ${added} new leads. Total in DB: ${currentLeads.length}`);
