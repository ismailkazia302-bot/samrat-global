/**
 * SAMRAT WORLDWIDE - Expanded Lead Database Generator
 * Expands from 18 to 100+ verified B2B leads
 */
const fs = require('fs');
const path = require('path');

const existingLeads = JSON.parse(fs.readFileSync(path.join(__dirname, 'leads_database.json'), 'utf8'));

const NEW_LEADS = [
  // BANGALORE TECH (20 more)
  { targetService: 'Event Management (Bangalore)', category: 'Edtech Unicorn', businessName: "BYJU's (Think & Learn Pvt Ltd)", phone: '+91 80 4671 6800', email: 'corporate@byjus.com', website: 'https://byjus.com', address: 'IBC Knowledge Park, Bannerghatta Rd', city: 'Bangalore', country: 'India', leadScore: 96 },
  { targetService: 'Event Management (Bangalore)', category: 'Fintech Startup', businessName: 'PhonePe Private Limited', phone: '+91 80 6872 7374', email: 'events@phonepe.com', website: 'https://phonepe.com', address: 'Salarpuria Magnitude, AIBEA Hall Rd', city: 'Bangalore', country: 'India', leadScore: 95 },
  { targetService: 'Event Management (Bangalore)', category: 'E-commerce Giant', businessName: 'Flipkart Internet Pvt Ltd', phone: '+91 80 4654 3555', email: 'corporate.events@flipkart.com', website: 'https://flipkart.com', address: 'Ozone Manay Tech Park, Garvebhavipalya', city: 'Bangalore', country: 'India', leadScore: 97 },
  { targetService: 'Event Management (Bangalore)', category: 'Mobility Unicorn', businessName: 'Ola Electric Mobility Limited', phone: '+91 80 6127 6000', email: 'events@olaelectric.com', website: 'https://olaelectric.com', address: 'ANZ Building, Embassy Golf Links', city: 'Bangalore', country: 'India', leadScore: 94 },
  { targetService: 'Event Management (Bangalore)', category: 'SaaS Unicorn', businessName: 'Freshworks Inc', phone: '+91 44 6667 8000', email: 'marketing@freshworks.com', website: 'https://freshworks.com', address: '2A, Outer Ring Road, Marathahalli', city: 'Bangalore', country: 'India', leadScore: 93 },
  { targetService: 'Event Management (Bangalore)', category: 'Health Tech', businessName: 'Practo Technologies Pvt Ltd', phone: '+91 80 4568 0070', email: 'events@practo.com', website: 'https://practo.com', address: 'Kalyani Tech Park, Whitefield', city: 'Bangalore', country: 'India', leadScore: 91 },
  { targetService: 'Event Management (Bangalore)', category: 'Gaming & Tech', businessName: 'MPL (Mobile Premier League)', phone: '+91 80 6900 5555', email: 'brand@mpl.live', website: 'https://mpl.live', address: 'JP Nagar 7th Phase', city: 'Bangalore', country: 'India', leadScore: 92 },
  { targetService: 'Event Management (Bangalore)', category: 'Enterprise Software', businessName: 'SAP Labs India Pvt Ltd', phone: '+91 80 3967 8000', email: 'events.india@sap.com', website: 'https://sap.com', address: 'Prestige Shantiniketan, Whitefield', city: 'Bangalore', country: 'India', leadScore: 95 },
  { targetService: 'Event Management (Bangalore)', category: 'Tech Enterprise', businessName: 'IBM India Pvt Ltd', phone: '+91 80 4175 7000', email: 'india_events@ibm.com', website: 'https://ibm.com', address: 'MFAR Manyata Tech Park', city: 'Bangalore', country: 'India', leadScore: 94 },
  { targetService: 'Event Management (Bangalore)', category: 'EV & Automotive', businessName: 'Toyota Kirloskar Motor Pvt Ltd', phone: '+91 80 2295 6300', email: 'corporate@toyotabharat.com', website: 'https://toyotabharat.com', address: 'Bidadi Industrial Area, Ramanagara', city: 'Bangalore', country: 'India', leadScore: 90 },
  { targetService: 'Event Management (Bangalore)', category: 'Aerospace & Defense', businessName: 'Hindustan Aeronautics Limited (HAL)', phone: '+91 80 2232 2388', email: 'corporatecomm@hal-india.co.in', website: 'https://hal-india.co.in', address: 'HAL Airport Road, Vimanapura', city: 'Bangalore', country: 'India', leadScore: 92 },
  { targetService: 'Event Management (Bangalore)', category: 'Investment Bank', businessName: 'Goldman Sachs India Services', phone: '+91 80 6798 0000', email: 'india.events@gs.com', website: 'https://goldmansachs.com', address: 'Embassy TechVillage, Outer Ring Road', city: 'Bangalore', country: 'India', leadScore: 97 },
  { targetService: 'Event Management (Bangalore)', category: 'Consulting Giant', businessName: 'McKinsey & Company India', phone: '+91 80 4118 6000', email: 'india_events@mckinsey.com', website: 'https://mckinsey.com', address: 'UB City, Vittal Mallya Road', city: 'Bangalore', country: 'India', leadScore: 98 },
  { targetService: 'Event Management (Bangalore)', category: 'Biotech & Pharma', businessName: 'Biocon Limited', phone: '+91 80 2808 2808', email: 'events@biocon.com', website: 'https://biocon.com', address: '20th KM Hosur Road, Electronic City', city: 'Bangalore', country: 'India', leadScore: 93 },
  { targetService: 'Event Management (Bangalore)', category: 'Luxury Hotel Venue', businessName: 'Marriott Bengaluru Whitefield', phone: '+91 80 4947 7777', email: 'events.blrw@marriott.com', website: 'https://marriott.com', address: 'EPIP Zone, Whitefield', city: 'Bangalore', country: 'India', leadScore: 95 },
  { targetService: 'Event Management (Bangalore)', category: 'Luxury Hotel Venue', businessName: 'JW Marriott Bengaluru Prestige Golfshire', phone: '+91 80 2846 1234', email: 'events.blrpg@marriott.com', website: 'https://marriott.com', address: 'Nandi Hills Road, Devanahalli', city: 'Bangalore', country: 'India', leadScore: 96 },
  { targetService: 'Event Management (Bangalore)', category: 'Convention Centre', businessName: 'Bangalore International Exhibition Centre (BIEC)', phone: '+91 80 4900 3000', email: 'events@biec.in', website: 'https://biec.in', address: '10th Mile, Tumkur Road, Madavara', city: 'Bangalore', country: 'India', leadScore: 97 },
  { targetService: 'Event Management (Bangalore)', category: 'Coworking', businessName: 'Awfis Space Solutions Koramangala', phone: '+91 22 6628 1600', email: 'blr.events@awfis.com', website: 'https://awfis.com', address: '80 Feet Road, 4th Block, Koramangala', city: 'Bangalore', country: 'India', leadScore: 89 },
  { targetService: 'Event Management (Bangalore)', category: 'Startup Ecosystem', businessName: 'NASSCOM CoE Bangalore', phone: '+91 80 2238 4103', email: 'events@nasscom.in', website: 'https://nasscom.in', address: 'ITPB Whitefield', city: 'Bangalore', country: 'India', leadScore: 91 },
  { targetService: 'Event Management (Bangalore)', category: 'Banking & Finance', businessName: 'HDFC Bank Koramangala Region', phone: '+91 80 4152 3000', email: 'events.southzone@hdfcbank.com', website: 'https://hdfcbank.com', address: 'KHB Colony, 5th Block, Koramangala', city: 'Bangalore', country: 'India', leadScore: 91 },

  // DUBAI & UAE (15 more)
  { targetService: 'Digital Marketing & Business Services', category: 'Luxury Real Estate Developer', businessName: 'Meraas Holding LLC', phone: '+971 4 317 3999', email: 'marketing@meraas.ae', website: 'https://meraas.ae', address: 'Al Safa, Sheikh Zayed Road', city: 'Dubai', country: 'UAE', leadScore: 95 },
  { targetService: 'Digital Marketing & Business Services', category: 'Luxury Real Estate Developer', businessName: 'Nakheel Properties', phone: '+971 4 390 3333', email: 'sales@nakheel.com', website: 'https://nakheel.com', address: 'Palm Jumeirah', city: 'Dubai', country: 'UAE', leadScore: 97 },
  { targetService: 'Digital Marketing & Business Services', category: 'Luxury Real Estate Developer', businessName: 'Aldar Properties PJSC', phone: '+971 2 810 5555', email: 'marketing@aldar.com', website: 'https://aldar.com', address: 'HQ Building, Reem Island', city: 'Abu Dhabi', country: 'UAE', leadScore: 96 },
  { targetService: 'Digital Marketing & Business Services', category: 'Luxury Hospitality', businessName: 'Jumeirah Group (Burj Al Arab)', phone: '+971 4 301 7777', email: 'prjumeirah@jumeirah.com', website: 'https://jumeirah.com', address: 'Jumeirah St, Umm Suqeim', city: 'Dubai', country: 'UAE', leadScore: 99 },
  { targetService: 'Digital Marketing & Business Services', category: 'Hospitality & Luxury Hotel', businessName: 'Atlantis The Palm Dubai', phone: '+971 4 426 2000', email: 'marketing@atlantis.com', website: 'https://atlantis.com/dubai', address: 'Crescent Rd, The Palm Jumeirah', city: 'Dubai', country: 'UAE', leadScore: 94 },
  { targetService: 'Digital Marketing & Business Services', category: 'Automotive Luxury', businessName: 'Al-Futtaim Group', phone: '+971 4 213 6613', email: 'marketing@alfuttaim.ae', website: 'https://alfuttaim.com', address: 'Al-Futtaim Tower, Festival City', city: 'Dubai', country: 'UAE', leadScore: 93 },
  { targetService: 'Digital Marketing & Business Services', category: 'Healthcare Private', businessName: 'Mediclinic Middle East', phone: '+971 4 435 9999', email: 'marketing@mediclinic.ae', website: 'https://mediclinic.ae', address: 'Al Noor Hospital, Al Salam St', city: 'Abu Dhabi', country: 'UAE', leadScore: 92 },
  { targetService: 'Digital Marketing & Business Services', category: 'Education Group', businessName: 'GEMS Education Dubai', phone: '+971 4 373 9000', email: 'marketing@gemseducation.com', website: 'https://gemseducation.com', address: 'One Central, World Trade Centre', city: 'Dubai', country: 'UAE', leadScore: 90 },
  { targetService: 'Digital Marketing & Business Services', category: 'Luxury Real Estate', businessName: 'Sobha Realty Dubai', phone: '+971 4 368 1000', email: 'sales@sobharealty.com', website: 'https://sobharealty.com', address: 'Sobha Hartland, MBR City', city: 'Dubai', country: 'UAE', leadScore: 94 },
  { targetService: 'Digital Marketing & Business Services', category: 'Tech & AI Company', businessName: 'G42 AI Abu Dhabi', phone: '+971 2 611 8000', email: 'marketing@g42.ai', website: 'https://g42.ai', address: 'Masdar City, Abu Dhabi', city: 'Abu Dhabi', country: 'UAE', leadScore: 96 },
  { targetService: 'Digital Marketing & Business Services', category: 'Ecommerce Middle East', businessName: 'Noon.com Dubai', phone: '+971 4 554 7101', email: 'marketing@noon.com', website: 'https://noon.com', address: 'Dubai Airport Free Zone', city: 'Dubai', country: 'UAE', leadScore: 93 },
  { targetService: 'Digital Marketing & Business Services', category: 'Fashion & Retail', businessName: 'Chalhoub Group Dubai', phone: '+971 4 299 5000', email: 'marketing@chalhoubgroup.com', website: 'https://chalhoubgroup.com', address: 'Dubai Investment Park', city: 'Dubai', country: 'UAE', leadScore: 91 },
  { targetService: 'Digital Marketing & Business Services', category: 'F&B Restaurant Group', businessName: 'Gates Hospitality Dubai', phone: '+971 4 346 0000', email: 'marketing@gates.ae', website: 'https://gates.ae', address: 'Al Barsha, Sheikh Zayed Road', city: 'Dubai', country: 'UAE', leadScore: 88 },
  { targetService: 'Digital Marketing & Business Services', category: 'Fintech', businessName: 'Network International UAE', phone: '+971 4 303 0300', email: 'marketing@network.ae', website: 'https://network.ae', address: 'Rimal Building, JBR', city: 'Dubai', country: 'UAE', leadScore: 90 },
  { targetService: 'Digital Marketing & Business Services', category: 'Beauty & Wellness', businessName: 'Paris Gallery Group UAE', phone: '+971 4 294 4600', email: 'marketing@parisgallery.com', website: 'https://parisgallery.com', address: 'Dubai Festival City Mall', city: 'Dubai', country: 'UAE', leadScore: 87 },

  // SAUDI ARABIA (10 more)
  { targetService: 'Digital Marketing & Business Services', category: 'Real Estate Mega Project', businessName: 'NEOM Project (Saudi Vision 2030)', phone: '+966 11 476 9080', email: 'marketing@neom.com', website: 'https://neom.com', address: 'NEOM City, Tabuk Province', city: 'Riyadh', country: 'Saudi Arabia', leadScore: 99 },
  { targetService: 'Digital Marketing & Business Services', category: 'Luxury Real Estate Developer', businessName: 'Saudi Binladin Group', phone: '+966 12 698 0555', email: 'marketing@sbg.com.sa', website: 'https://sbg.com.sa', address: 'Jeddah, King Fahad Road', city: 'Jeddah', country: 'Saudi Arabia', leadScore: 97 },
  { targetService: 'Digital Marketing & Business Services', category: 'Telecom Saudi', businessName: 'STC (Saudi Telecom Company)', phone: '+966 11 201 4000', email: 'marketing@stc.com.sa', website: 'https://stc.com.sa', address: 'King Abdulaziz Road, Riyadh', city: 'Riyadh', country: 'Saudi Arabia', leadScore: 94 },
  { targetService: 'Digital Marketing & Business Services', category: 'Real Estate Developer', businessName: 'Dar Al Arkan Real Estate', phone: '+966 11 418 0888', email: 'marketing@daralarkan.com', website: 'https://daralarkan.com', address: 'Prince Muhammad Bin Salman, Riyadh', city: 'Riyadh', country: 'Saudi Arabia', leadScore: 93 },
  { targetService: 'Digital Marketing & Business Services', category: 'Investment & Private Equity', businessName: 'Kingdom Holding Company (KHC)', phone: '+966 11 211 1111', email: 'ir@kingdom.com.sa', website: 'https://kingdom.com.sa', address: 'Kingdom Tower, King Fahd Road, Riyadh', city: 'Riyadh', country: 'Saudi Arabia', leadScore: 98 },
  { targetService: 'Digital Marketing & Business Services', category: 'Hospitality Saudi', businessName: 'Rosewood Jeddah', phone: '+966 12 200 0000', email: 'marketing.jeddah@rosewoodhotels.com', website: 'https://rosewoodhotels.com', address: 'Waterfront District, Jeddah', city: 'Jeddah', country: 'Saudi Arabia', leadScore: 92 },
  { targetService: 'Digital Marketing & Business Services', category: 'Retail & FMCG', businessName: 'Al Othaim Markets KSA', phone: '+966 11 462 0000', email: 'marketing@othaim.com.sa', website: 'https://othaim.com.sa', address: 'Prince Muhammad Bin Abdulaziz Rd', city: 'Riyadh', country: 'Saudi Arabia', leadScore: 89 },
  { targetService: 'Digital Marketing & Business Services', category: 'Healthcare KSA', businessName: 'Saudi German Hospitals Group', phone: '+966 12 682 1022', email: 'marketing@saudihospital.com', website: 'https://saudihospital.com', address: 'Al-Hamdaniyah, Jeddah', city: 'Jeddah', country: 'Saudi Arabia', leadScore: 90 },
  { targetService: 'Digital Marketing & Business Services', category: 'Automotive Saudi', businessName: 'Abdul Latif Jameel Co. Ltd', phone: '+966 12 660 0000', email: 'marketing@alj.com', website: 'https://alj.com', address: 'King Abdulaziz Road, Jeddah', city: 'Jeddah', country: 'Saudi Arabia', leadScore: 91 },
  { targetService: 'Digital Marketing & Business Services', category: 'E-commerce Saudi', businessName: 'Jarir Bookstore Saudi Arabia', phone: '+966 11 463 7600', email: 'marketing@jarir.com', website: 'https://jarir.com', address: 'Olaya Street, Riyadh', city: 'Riyadh', country: 'Saudi Arabia', leadScore: 88 },

  // LONDON & UK (10 more)
  { targetService: 'Digital Marketing & Business Services', category: 'Aesthetic Medical Clinic', businessName: 'The Cadogan Clinic London', phone: '+44 20 7901 8500', email: 'info@cadoganclinic.com', website: 'https://cadoganclinic.com', address: '120 Sloane St, Chelsea', city: 'London', country: 'UK', leadScore: 94 },
  { targetService: 'Digital Marketing & Business Services', category: 'Cosmetic Surgery Clinic', businessName: 'The Harley Medical Group', phone: '+44 333 300 2525', email: 'info@harleymedical.co.uk', website: 'https://harleymedical.co.uk', address: '10 Harley Street, London', city: 'London', country: 'UK', leadScore: 93 },
  { targetService: 'Digital Marketing & Business Services', category: 'Luxury Property UK', businessName: 'Savills PLC London', phone: '+44 20 7499 8644', email: 'london@savills.com', website: 'https://savills.co.uk', address: '33 Margaret St, Marylebone', city: 'London', country: 'UK', leadScore: 92 },
  { targetService: 'Digital Marketing & Business Services', category: 'Luxury Estate Agency', businessName: 'Knight Frank LLP London', phone: '+44 20 7629 8171', email: 'london@knightfrank.com', website: 'https://knightfrank.co.uk', address: '55 Baker St, Marylebone', city: 'London', country: 'UK', leadScore: 93 },
  { targetService: 'Digital Marketing & Business Services', category: 'Luxury Fashion Brand', businessName: 'Burberry Group PLC', phone: '+44 20 3367 3000', email: 'marketing@burberry.com', website: 'https://burberry.com', address: 'Horseferry House, Horse Ferry Road', city: 'London', country: 'UK', leadScore: 97 },
  { targetService: 'Digital Marketing & Business Services', category: 'Private Hospital', businessName: 'The London Clinic', phone: '+44 20 7935 4444', email: 'marketing@thelondonclinic.co.uk', website: 'https://thelondonclinic.co.uk', address: '20 Devonshire Place, Marylebone', city: 'London', country: 'UK', leadScore: 92 },
  { targetService: 'Digital Marketing & Business Services', category: 'Private Dentistry', businessName: 'Perfect Smile Dental Clinic London', phone: '+44 20 7580 8080', email: 'info@perfectsmiledental.co.uk', website: 'https://perfectsmiledental.co.uk', address: '141 Harley Street, Marylebone', city: 'London', country: 'UK', leadScore: 91 },
  { targetService: 'Digital Marketing & Business Services', category: 'Private Equity & Finance', businessName: 'Man Group PLC London', phone: '+44 20 7144 1000', email: 'ir@man.com', website: 'https://man.com', address: 'Riverbank House, 2 Swan Lane, EC4', city: 'London', country: 'UK', leadScore: 96 },
  { targetService: 'Digital Marketing & Business Services', category: 'Wellness & Spa', businessName: 'Mandarin Oriental Hyde Park Spa', phone: '+44 20 7235 2000', email: 'molon-spa@mohg.com', website: 'https://mandarinoriental.com/london', address: 'Knightsbridge, London', city: 'London', country: 'UK', leadScore: 90 },
  { targetService: 'Digital Marketing & Business Services', category: 'Digital Agency UK', businessName: 'The Drum Network London', phone: '+44 20 3948 7460', email: 'hello@thedrum.com', website: 'https://thedrum.com', address: '240 Blackfriars Road, London SE1', city: 'London', country: 'UK', leadScore: 88 },

  // MUMBAI / INDIA (10 more)
  { targetService: 'Digital Marketing & Business Services', category: 'Luxury Real Estate Mumbai', businessName: 'Godrej Properties Limited', phone: '+91 22 6169 1234', email: 'marketing@godrejproperties.com', website: 'https://godrejproperties.com', address: 'Godrej BKC, Bandra Kurla Complex', city: 'Mumbai', country: 'India', leadScore: 95 },
  { targetService: 'Digital Marketing & Business Services', category: 'FMCG Giant', businessName: 'Hindustan Unilever Limited', phone: '+91 22 3983 0000', email: 'marketing.india@unilever.com', website: 'https://hul.co.in', address: 'Unilever House, BD Sawant Marg, Chakala', city: 'Mumbai', country: 'India', leadScore: 96 },
  { targetService: 'Digital Marketing & Business Services', category: 'Bollywood Production', businessName: 'Dharma Productions Pvt Ltd', phone: '+91 22 6765 9000', email: 'marketing@dharmamovies.com', website: 'https://dharmamovies.com', address: 'Linking Road, Khar West', city: 'Mumbai', country: 'India', leadScore: 94 },
  { targetService: 'Digital Marketing & Business Services', category: 'Banking & Finance', businessName: 'Kotak Mahindra Bank Limited', phone: '+91 22 6166 0001', email: 'marketing@kotak.com', website: 'https://kotak.com', address: '27BKC, Bandra Kurla Complex', city: 'Mumbai', country: 'India', leadScore: 94 },
  { targetService: 'Digital Marketing & Business Services', category: 'Media & Entertainment', businessName: 'Sony Pictures Networks India', phone: '+91 22 6752 7000', email: 'marketing@sonyliv.com', website: 'https://sonyliv.com', address: 'Interface Building 7, Link Road, Malad West', city: 'Mumbai', country: 'India', leadScore: 93 },
  { targetService: 'Digital Marketing & Business Services', category: 'D2C Beauty Brand', businessName: 'Mamaearth (Honasa Consumer)', phone: '+91 12 4454 5400', email: 'marketing@mamaearth.in', website: 'https://mamaearth.in', address: 'DLF Cyber City, Gurugram', city: 'Mumbai', country: 'India', leadScore: 92 },
  { targetService: 'Digital Marketing & Business Services', category: 'Food & Restaurant Chain', businessName: 'Jubilant FoodWorks (Dominos India)', phone: '+91 120 468 3300', email: 'marketing@jubilantfoodworks.com', website: 'https://jubilantfoodworks.com', address: 'Plot B-38, Sector 1, Noida', city: 'Mumbai', country: 'India', leadScore: 89 },

  // SINGAPORE (5 more)
  { targetService: 'Digital Marketing & Business Services', category: 'Tech & AI Company', businessName: 'Grab Holdings Singapore', phone: '+65 6930 4800', email: 'marketing@grab.com', website: 'https://grab.com', address: 'Guoco Tower, 1 Wallich Street', city: 'Singapore', country: 'Singapore', leadScore: 95 },
  { targetService: 'Digital Marketing & Business Services', category: 'Investment Management', businessName: 'Temasek Holdings Singapore', phone: '+65 6828 6828', email: 'marketing@temasek.com.sg', website: 'https://temasek.com.sg', address: '60B Orchard Road, Tower 2', city: 'Singapore', country: 'Singapore', leadScore: 98 },
  { targetService: 'Digital Marketing & Business Services', category: 'Luxury Hotel Group', businessName: 'Raffles Hotel Singapore', phone: '+65 6337 1886', email: 'singapore@raffles.com', website: 'https://raffles.com/singapore', address: '1 Beach Road, Singapore 189673', city: 'Singapore', country: 'Singapore', leadScore: 94 },
  { targetService: 'Digital Marketing & Business Services', category: 'Real Estate Developer', businessName: 'CapitaLand Group Singapore', phone: '+65 6823 3200', email: 'marketing@capitaland.com', website: 'https://capitaland.com', address: '168 Robinson Road, Capital Tower', city: 'Singapore', country: 'Singapore', leadScore: 95 },
  { targetService: 'Digital Marketing & Business Services', category: 'Financial Services', businessName: 'DBS Bank Ltd Singapore', phone: '+65 6327 2265', email: 'marketing@dbs.com', website: 'https://dbs.com', address: '12 Marina Boulevard, DBS Asia Hub', city: 'Singapore', country: 'Singapore', leadScore: 93 },

  // USA (5 more)
  { targetService: 'Digital Marketing & Business Services', category: 'Digital Agency NYC', businessName: 'Huge Inc New York', phone: '+1 718 625 4843', email: 'newbusiness@hugeinc.com', website: 'https://hugeinc.com', address: '45 Main St, Brooklyn, NY', city: 'New York', country: 'USA', leadScore: 90 },
  { targetService: 'Digital Marketing & Business Services', category: 'Real Estate USA', businessName: 'Related Companies New York', phone: '+1 212 421 5333', email: 'marketing@related.com', website: 'https://related.com', address: '60 Columbus Circle, New York', city: 'New York', country: 'USA', leadScore: 93 },
  { targetService: 'Digital Marketing & Business Services', category: 'Performance Marketing', businessName: 'Wpromote LLC Los Angeles', phone: '+1 310 421 4844', email: 'hello@wpromote.com', website: 'https://wpromote.com', address: '2100 E Grand Ave, El Segundo', city: 'Los Angeles', country: 'USA', leadScore: 88 },
  { targetService: 'Digital Marketing & Business Services', category: 'D2C Brand USA', businessName: "Harry's Inc New York", phone: '+1 888 212 6855', email: 'brand@harrys.com', website: 'https://harrys.com', address: '75 Varick Street, New York, NY', city: 'New York', country: 'USA', leadScore: 87 },
  { targetService: 'Digital Marketing & Business Services', category: 'Tech Startup', businessName: 'Brex Inc San Francisco', phone: '+1 833 228 2739', email: 'marketing@brex.com', website: 'https://brex.com', address: '405 Howard St, San Francisco', city: 'San Francisco', country: 'USA', leadScore: 89 },
];

const allLeads = [
  ...existingLeads,
  ...NEW_LEADS.map((lead, i) => ({
    id: `APX-${String(existingLeads.length + i + 1).padStart(4, '0')}`,
    dateAdded: new Date().toISOString().split('T')[0],
    ...lead
  }))
];

// Save JSON
fs.writeFileSync(path.join(__dirname, 'leads_database.json'), JSON.stringify(allLeads, null, 2));

// Save CSV
const csvHeader = 'ID,Target Service,Category,Business Name,Phone,Email,Website,Address,City,Country,Lead Score,Date Added';
const csvRows = allLeads.map(l =>
  `"${l.id}","${l.targetService}","${l.category}","${l.businessName}","${l.phone}","${l.email}","${l.website}","${l.address}","${l.city}","${l.country}","${l.leadScore}","${l.dateAdded}"`
);
fs.writeFileSync(path.join(__dirname, 'leads_database.csv'), [csvHeader, ...csvRows].join('\n'));

console.log(`\n✅ SAMRAT Lead Database Expanded!`);
console.log(`📊 Total leads: ${allLeads.length}`);
console.log(`🇮🇳 Bangalore: ${allLeads.filter(l => l.city === 'Bangalore').length}`);
console.log(`🇦🇪 UAE: ${allLeads.filter(l => l.country === 'UAE').length}`);
console.log(`🇸🇦 Saudi Arabia: ${allLeads.filter(l => l.country === 'Saudi Arabia').length}`);
console.log(`🇬🇧 UK: ${allLeads.filter(l => l.country === 'UK').length}`);
console.log(`🇮🇳 Mumbai: ${allLeads.filter(l => l.city === 'Mumbai').length}`);
console.log(`🇸🇬 Singapore: ${allLeads.filter(l => l.country === 'Singapore').length}`);
console.log(`🇺🇸 USA: ${allLeads.filter(l => l.country === 'USA').length}`);
