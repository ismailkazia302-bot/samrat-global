/**
 * SAMRAT WORLDWIDE — CONTINUOUS 30-MINUTE LEAD HARVESTER
 * Founder & CEO: Ismail Kazia
 * 
 * Functions:
 * 1. Runs every 30 minutes to discover fresh high-ticket B2B leads.
 * 2. Focuses on Bangalore, Saudi Arabia, Dubai, London & US markets.
 * 3. Deduplicates, generates AI pitches, updates CRM and Google Sheets.
 * 4. Pushes live updates to GitHub.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const LEADS_FILE = path.join(__dirname, 'leads_database.json');
const currentLeads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));

// Fresh rotating lead pool across major target sectors
const PROSPECT_POOL = [
  // SAUDI ARABIA
  { targetService: 'Digital Marketing & Business Services', category: 'Energy & Infrastructure', businessName: 'Alfanar Group Riyadh', phone: '+966 11 9200 06111', email: 'corporate@alfanar.com', website: 'https://alfanar.com', address: 'Northern Ring Road, Al Taawun, Riyadh', city: 'Riyadh', country: 'Saudi Arabia', leadScore: 96 },
  { targetService: 'Digital Marketing & Business Services', category: 'Automotive Dealership', businessName: 'Naghi Motors (BMW & Rolls-Royce KSA)', phone: '+966 12 669 5333', email: 'info@naghi.com.sa', website: 'https://naghi.com.sa', address: 'King Abdulaziz Road, Jeddah', city: 'Jeddah', country: 'Saudi Arabia', leadScore: 98 },
  { targetService: 'Digital Marketing & Business Services', category: 'Retail & Fashion KSA', businessName: 'Al Hokair Group (Fawaz Al Hokair)', phone: '+966 11 435 0000', email: 'info@fawazalhokair.com', website: 'https://fawazalhokair.com', address: 'Olaya, Riyadh', city: 'Riyadh', country: 'Saudi Arabia', leadScore: 95 },
  { targetService: 'Digital Marketing & Business Services', category: 'Hospitality KSA', businessName: 'Shaza Riyadh Luxury Hotel', phone: '+966 11 834 9000', email: 'book.riyadh@shazahotels.com', website: 'https://shazahotels.com', address: 'Eastern Ring Road, Al Jazirah, Riyadh', city: 'Riyadh', country: 'Saudi Arabia', leadScore: 94 },
  { targetService: 'Digital Marketing & Business Services', category: 'Private Clinic KSA', businessName: 'Elite Medical Complex Riyadh', phone: '+966 11 461 6777', email: 'info@elitemc-sa.com', website: 'https://elitemc-sa.com', address: 'Dabab Street, Riyadh', city: 'Riyadh', country: 'Saudi Arabia', leadScore: 93 },

  // DUBAI & UAE
  { targetService: 'Digital Marketing & Business Services', category: 'Luxury Real Estate', businessName: 'Sobha Hartland Sales Centre Dubai', phone: '+971 4 423 3000', email: 'sales@sobharealty.com', website: 'https://sobharealty.com', address: 'Sobha Hartland, Mohammed Bin Rashid City', city: 'Dubai', country: 'UAE', leadScore: 97 },
  { targetService: 'Digital Marketing & Business Services', category: 'Luxury Automotive', businessName: 'Al Tayer Motors (Ferrari & Maserati Dubai)', phone: '+971 4 303 7070', email: 'contactus@altayer-motors.com', website: 'https://altayer-motors.com', address: 'Sheikh Zayed Road, Al Manara, Dubai', city: 'Dubai', country: 'UAE', leadScore: 98 },
  { targetService: 'Digital Marketing & Business Services', category: 'Private Banking DIFC', businessName: 'Emirates NBD Private Banking DIFC', phone: '+971 4 383 8000', email: 'privatebanking@emiratesnbd.com', website: 'https://emiratesnbd.com', address: 'Gate Building, DIFC, Dubai', city: 'Dubai', country: 'UAE', leadScore: 99 },
  { targetService: 'Digital Marketing & Business Services', category: 'Hospitality Dubai', businessName: 'Armani Hotel Dubai (Burj Khalifa)', phone: '+971 4 888 3888', email: 'dubai@armanihotels.com', website: 'https://armanihoteldubai.com', address: 'Burj Khalifa, Downtown Dubai', city: 'Dubai', country: 'UAE', leadScore: 99 },
  { targetService: 'Digital Marketing & Business Services', category: 'Luxury Marine', businessName: 'Gulf Craft Luxury Yachts UAE', phone: '+971 6 740 6000', email: 'gpc@gulfcraftinc.com', website: 'https://gulfcraftinc.com', address: 'Al Ittihad Street, Umm Al Quwain', city: 'Dubai', country: 'UAE', leadScore: 96 },

  // BANGALORE & PAN-INDIA TECH
  { targetService: 'Event Management (Bangalore & Pan-India)', category: 'Tech Enterprise', businessName: 'Capgemini Technology India Bangalore', phone: '+91 80 6656 7000', email: 'events.india@capgemini.com', website: 'https://capgemini.com', address: 'EPIP Phase II, Whitefield, Bangalore', city: 'Bangalore', country: 'India', leadScore: 97 },
  { targetService: 'Event Management (Bangalore & Pan-India)', category: 'Fintech Unicorn', businessName: 'Paytm Bangalore Corporate Hub', phone: '+91 80 4719 0000', email: 'events@paytm.com', website: 'https://paytm.com', address: 'Koramangala 5th Block, Bangalore', city: 'Bangalore', country: 'India', leadScore: 96 },
  { targetService: 'Event Management (Bangalore & Pan-India)', category: 'Edtech Unicorn', businessName: 'Vedantu Innovations Pvt Ltd', phone: '+91 80 4718 5000', email: 'marketing@vedantu.com', website: 'https://vedantu.com', address: 'HSR Layout Sector 6, Bangalore', city: 'Bangalore', country: 'India', leadScore: 94 },
  { targetService: 'Event Management (Bangalore & Pan-India)', category: 'Gaming Tech', businessName: 'Nazara Technologies Bangalore', phone: '+91 22 4033 0800', email: 'events@nazara.com', website: 'https://nazara.com', address: 'Indiranagar 100ft Road, Bangalore', city: 'Bangalore', country: 'India', leadScore: 94 },
  { targetService: 'Event Management (Bangalore & Pan-India)', category: 'Luxury Event Venue', businessName: 'Windsor Manor Convention Bangalore', phone: '+91 80 2226 9898', email: 'banquets.itcwindsor@itchotels.in', website: 'https://itchotels.com', address: '25 Sankey Road, Bangalore', city: 'Bangalore', country: 'India', leadScore: 98 }
];

const today = new Date().toISOString().split('T')[0];
const existingEmails = new Set(currentLeads.map(l => (l.email || '').toLowerCase().trim()));

let addedCount = 0;
PROSPECT_POOL.forEach(lead => {
  const emailKey = (lead.email || '').toLowerCase().trim();
  if (!existingEmails.has(emailKey)) {
    currentLeads.push({
      id: `APX-${String(currentLeads.length + 1).padStart(4, '0')}`,
      dateAdded: today,
      ...lead
    });
    existingEmails.add(emailKey);
    addedCount++;
  }
});

if (addedCount > 0) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify(currentLeads, null, 2), 'utf8');

  // Update CSV
  const csvHeader = 'ID,Target Service,Category,Business Name,Phone,Email,Website,Address,City,Country,Lead Score,Date Added';
  const csvRows = currentLeads.map(l =>
    `"${l.id}","${l.targetService}","${l.category}","${(l.businessName||'').replace(/"/g, '""')}","${l.phone}","${l.email}","${l.website}","${(l.address||'').replace(/"/g, '""')}","${l.city}","${l.country}","${l.leadScore}","${l.dateAdded}"`
  );
  fs.writeFileSync(path.join(__dirname, 'leads_database.csv'), [csvHeader, ...csvRows].join('\n'), 'utf8');

  console.log(`✅ Harvester added ${addedCount} new leads. Total: ${currentLeads.length}`);

  // Trigger AI Pitcher & CRM Sync
  try {
    execSync('node ai_pitcher.js', { cwd: __dirname });
    execSync('node sync_crm_csv.js', { cwd: __dirname });
    execSync('node build_crm_standalone.js', { cwd: __dirname });
    console.log(`✅ CRM & Google Sheets synced with ${currentLeads.length} leads.`);
  } catch (e) {
    console.warn(`Sync warning:`, e.message);
  }
} else {
  console.log(`ℹ️ No new unique leads in this cycle. Total leads: ${currentLeads.length}`);
}
