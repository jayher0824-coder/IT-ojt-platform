const mongoose = require('mongoose');
const Company = require('../models/Company');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/it-ojt-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Major Philippine Companies that hire OJT students
const philippineCompanies = [
  // Tech Giants & Software Companies
  {
    companyName: "Accenture Philippines",
    industry: "Technology",
    companySize: "500+",
    description: "Leading global professional services company providing strategy, consulting, digital, technology and operations services.",
    website: "https://www.accenture.com/ph-en",
    address: {
      street: "30th Floor, Alphaland Makati Place",
      city: "Makati",
      state: "Metro Manila",
      country: "Philippines"
    },
    contactPerson: {
      firstName: "Maria",
      lastName: "Santos",
      title: "OJT Coordinator",
      phone: "+63-2-8888-0000"
    },
    benefits: ["Health Insurance", "Flexible Hours", "Training Programs", "Mentorship", "Career Development"],
    skillRequirements: [
      { category: "programming", minScore: 75, preferredLevel: "Intermediate" },
      { category: "webDevelopment", minScore: 70, preferredLevel: "Intermediate" },
      { category: "database", minScore: 65, preferredLevel: "Beginner" },
      { category: "problemSolving", minScore: 80, preferredLevel: "Advanced" }
    ],
    ojtProgram: {
      duration: "6 months",
      allowance: 15000,
      positions: 20,
      categories: ["Software Development", "Systems Analysis", "Quality Assurance", "UI/UX Design"],
      requirements: ["3rd or 4th year IT/CS student", "Good English communication", "Willing to work in Makati"]
    }
  },
  {
    companyName: "IBM Philippines",
    industry: "Technology",
    companySize: "500+",
    description: "International technology company offering hardware, software, cloud-based services and cognitive computing.",
    website: "https://www.ibm.com/ph-en",
    address: {
      street: "IBM Plaza, Eastwood City",
      city: "Quezon City",
      state: "Metro Manila",
      country: "Philippines"
    },
    contactPerson: {
      firstName: "John",
      lastName: "Cruz",
      title: "Talent Acquisition Manager",
      phone: "+63-2-7777-1000"
    },
    benefits: ["Healthcare", "Life Insurance", "Professional Development", "Global Exposure", "Innovation Labs"],
    skillRequirements: [
      { category: "programming", minScore: 80, preferredLevel: "Advanced" },
      { category: "database", minScore: 75, preferredLevel: "Intermediate" },
      { category: "problemSolving", minScore: 85, preferredLevel: "Advanced" },
      { category: "networking", minScore: 70, preferredLevel: "Intermediate" }
    ],
    ojtProgram: {
      duration: "6 months",
      allowance: 18000,
      positions: 15,
      categories: ["Cloud Computing", "Data Analytics", "Artificial Intelligence", "Cybersecurity"],
      requirements: ["4th year IT/CS/Engineering student", "GPA of 2.5 or higher", "Strong analytical skills"]
    }
  },
  {
    companyName: "Globe Telecom",
    industry: "Telecommunications",
    companySize: "500+",
    description: "Leading telecommunications company in the Philippines providing mobile, fixed line and broadband services.",
    website: "https://www.globe.com.ph",
    address: {
      street: "Globe Telecom Plaza, Pioneer Street",
      city: "Mandaluyong",
      state: "Metro Manila",
      country: "Philippines"
    },
    contactPerson: {
      firstName: "Ana",
      lastName: "Reyes",
      title: "HR Business Partner",
      phone: "+63-2-7730-1000"
    },
    benefits: ["HMO", "Mobile Allowance", "Internet Subsidy", "Flexible Work", "Learning Budget"],
    skillRequirements: [
      { category: "networking", minScore: 80, preferredLevel: "Advanced" },
      { category: "programming", minScore: 70, preferredLevel: "Intermediate" },
      { category: "webDevelopment", minScore: 65, preferredLevel: "Intermediate" },
      { category: "problemSolving", minScore: 75, preferredLevel: "Intermediate" }
    ],
    ojtProgram: {
      duration: "5 months",
      allowance: 16000,
      positions: 25,
      categories: ["Network Engineering", "Software Development", "Data Science", "Digital Marketing"],
      requirements: ["3rd/4th year Engineering/IT/CS student", "Good communication skills", "Team player"]
    }
  },
  {
    companyName: "Smart Communications",
    industry: "Telecommunications",
    companySize: "500+",
    description: "Major telecommunications services provider in the Philippines, subsidiary of PLDT.",
    website: "https://smart.com.ph",
    address: {
      street: "Smart Tower, 6799 Ayala Avenue",
      city: "Makati",
      state: "Metro Manila",
      country: "Philippines"
    },
    contactPerson: {
      firstName: "Carlos",
      lastName: "Mendoza",
      title: "OJT Program Manager",
      phone: "+63-2-8888-1000"
    },
    benefits: ["Medical Coverage", "Performance Bonus", "Meal Allowance", "Transportation", "Training"],
    skillRequirements: [
      { category: "networking", minScore: 75, preferredLevel: "Intermediate" },
      { category: "programming", minScore: 70, preferredLevel: "Intermediate" },
      { category: "database", minScore: 65, preferredLevel: "Beginner" },
      { category: "problemSolving", minScore: 80, preferredLevel: "Advanced" }
    ],
    ojtProgram: {
      duration: "6 months",
      allowance: 15500,
      positions: 18,
      categories: ["Mobile App Development", "Network Operations", "IT Support", "Business Intelligence"],
      requirements: ["Currently enrolled IT/Telecom/Engineering student", "Minimum 2.5 GPA", "Eager to learn"]
    }
  },

  // Banking & Financial Services
  {
    companyName: "BDO Unibank",
    industry: "Finance",
    companySize: "500+",
    description: "Philippines' largest bank providing comprehensive financial services to individuals and businesses.",
    website: "https://www.bdo.com.ph",
    address: {
      street: "BDO Corporate Center, 7899 Makati Avenue",
      city: "Makati",
      state: "Metro Manila",
      country: "Philippines"
    },
    contactPerson: {
      firstName: "Grace",
      lastName: "Lim",
      title: "IT Recruitment Specialist",
      phone: "+63-2-8631-8000"
    },
    benefits: ["Healthcare", "13th Month Pay", "Rice Allowance", "Life Insurance", "Skills Training"],
    skillRequirements: [
      { category: "database", minScore: 80, preferredLevel: "Advanced" },
      { category: "programming", minScore: 75, preferredLevel: "Intermediate" },
      { category: "problemSolving", minScore: 85, preferredLevel: "Advanced" },
      { category: "webDevelopment", minScore: 70, preferredLevel: "Intermediate" }
    ],
    ojtProgram: {
      duration: "4 months",
      allowance: 14000,
      positions: 12,
      categories: ["Banking Systems", "Data Analytics", "Cybersecurity", "Mobile Banking"],
      requirements: ["IT/CS/MIS student", "Strong database knowledge", "Detail-oriented", "Trustworthy"]
    }
  },
  {
    companyName: "Metrobank",
    industry: "Finance",
    companySize: "500+",
    description: "One of the largest banks in the Philippines offering various financial services.",
    website: "https://www.metrobank.com.ph",
    address: {
      street: "Metrobank Plaza, Gil Puyat Avenue",
      city: "Makati",
      state: "Metro Manila",
      country: "Philippines"
    },
    contactPerson: {
      firstName: "Robert",
      lastName: "Garcia",
      title: "IT Development Manager",
      phone: "+63-2-8898-7000"
    },
    benefits: ["HMO", "Performance Incentives", "Training Programs", "Career Growth", "Work-Life Balance"],
    skillRequirements: [
      { category: "database", minScore: 75, preferredLevel: "Intermediate" },
      { category: "programming", minScore: 70, preferredLevel: "Intermediate" },
      { category: "webDevelopment", minScore: 65, preferredLevel: "Beginner" },
      { category: "problemSolving", minScore: 80, preferredLevel: "Advanced" }
    ],
    ojtProgram: {
      duration: "5 months",
      allowance: 13500,
      positions: 10,
      categories: ["Core Banking Systems", "Web Development", "Data Management", "IT Operations"],
      requirements: ["IT/CS/CIS student", "Minimum 2.75 GPA", "Good analytical skills", "Integrity"]
    }
  },

  // E-commerce & Retail
  {
    companyName: "Lazada Philippines",
    industry: "E-commerce",
    companySize: "201-500",
    description: "Leading e-commerce platform in Southeast Asia, part of Alibaba Group.",
    website: "https://www.lazada.com.ph",
    address: {
      street: "30F Double Dragon Tower, DD Meridian Park",
      city: "Pasay",
      state: "Metro Manila",
      country: "Philippines"
    },
    contactPerson: {
      firstName: "Jenny",
      lastName: "Tan",
      title: "Campus Recruitment Lead",
      phone: "+63-2-7808-0808"
    },
    benefits: ["Healthcare", "Flexible Hours", "Learning Budget", "Free Meals", "Tech Allowance"],
    skillRequirements: [
      { category: "webDevelopment", minScore: 80, preferredLevel: "Advanced" },
      { category: "programming", minScore: 75, preferredLevel: "Intermediate" },
      { category: "database", minScore: 70, preferredLevel: "Intermediate" },
      { category: "problemSolving", minScore: 85, preferredLevel: "Advanced" }
    ],
    ojtProgram: {
      duration: "6 months",
      allowance: 17000,
      positions: 15,
      categories: ["Frontend Development", "Backend Development", "Mobile Development", "Data Engineering"],
      requirements: ["IT/CS student", "Portfolio of projects", "Passion for e-commerce", "Fast learner"]
    }
  },
  {
    companyName: "Shopee Philippines",
    industry: "E-commerce",
    companySize: "201-500",
    description: "Leading e-commerce platform in Southeast Asia with strong presence in Philippines.",
    website: "https://shopee.ph",
    address: {
      street: "30F Robinsons Cybergate Tower 3",
      city: "Mandaluyong",
      state: "Metro Manila",
      country: "Philippines"
    },
    contactPerson: {
      firstName: "Michael",
      lastName: "Wong",
      title: "Technical Recruiter",
      phone: "+63-2-7777-7777"
    },
    benefits: ["Comprehensive HMO", "Performance Bonus", "Meal Subsidy", "Gym Membership", "Tech Gadgets"],
    skillRequirements: [
      { category: "programming", minScore: 80, preferredLevel: "Advanced" },
      { category: "webDevelopment", minScore: 85, preferredLevel: "Advanced" },
      { category: "database", minScore: 75, preferredLevel: "Intermediate" },
      { category: "problemSolving", minScore: 90, preferredLevel: "Expert" }
    ],
    ojtProgram: {
      duration: "6 months",
      allowance: 20000,
      positions: 20,
      categories: ["Full-Stack Development", "Mobile App Development", "DevOps", "Machine Learning"],
      requirements: ["Top IT/CS students", "Strong coding skills", "GitHub portfolio", "Competitive programming experience preferred"]
    }
  },

  // Gaming & Entertainment
  {
    companyName: "Garena Philippines",
    industry: "Gaming/Entertainment",
    companySize: "201-500",
    description: "Digital entertainment platform, publisher of popular games like Mobile Legends and Free Fire.",
    website: "https://www.garena.ph",
    address: {
      street: "26F Net One Center, 26th Street",
      city: "Taguig",
      state: "Metro Manila",
      country: "Philippines"
    },
    contactPerson: {
      firstName: "Kevin",
      lastName: "Lee",
      title: "Talent Acquisition Manager",
      phone: "+63-2-8888-4444"
    },
    benefits: ["Healthcare", "Game Credits", "Flexible Work", "Team Events", "Professional Development"],
    skillRequirements: [
      { category: "programming", minScore: 85, preferredLevel: "Advanced" },
      { category: "webDevelopment", minScore: 75, preferredLevel: "Intermediate" },
      { category: "problemSolving", minScore: 90, preferredLevel: "Expert" },
      { category: "database", minScore: 70, preferredLevel: "Intermediate" }
    ],
    ojtProgram: {
      duration: "6 months",
      allowance: 18000,
      positions: 12,
      categories: ["Game Development", "Backend Services", "Data Analytics", "Quality Assurance"],
      requirements: ["IT/CS/Game Dev student", "Passion for gaming", "Strong programming skills", "Creative mindset"]
    }
  },

  // Government & Healthcare
  {
    companyName: "Department of Information and Communications Technology (DICT)",
    industry: "Government",
    companySize: "500+",
    description: "Government agency responsible for ICT development and digital transformation in the Philippines.",
    website: "https://dict.gov.ph",
    address: {
      street: "Bonifacio Technology Center, 31st Street",
      city: "Taguig",
      state: "Metro Manila",
      country: "Philippines"
    },
    contactPerson: {
      firstName: "Maria Luz",
      lastName: "Santos",
      title: "HR Officer",
      phone: "+63-2-8888-DICT"
    },
    benefits: ["Government Benefits", "Professional Training", "Public Service Experience", "Networking", "Certifications"],
    skillRequirements: [
      { category: "programming", minScore: 70, preferredLevel: "Intermediate" },
      { category: "webDevelopment", minScore: 75, preferredLevel: "Intermediate" },
      { category: "networking", minScore: 80, preferredLevel: "Advanced" },
      { category: "problemSolving", minScore: 75, preferredLevel: "Intermediate" }
    ],
    ojtProgram: {
      duration: "3 months",
      allowance: 10000,
      positions: 30,
      categories: ["Digital Government Services", "Cybersecurity", "Data Management", "System Administration"],
      requirements: ["Filipino citizen", "IT/CS/Engineering student", "Good moral character", "Commitment to public service"]
    }
  },

  // Startups & Tech Companies
  {
    companyName: "Kumu",
    industry: "Technology/Social Media",
    companySize: "51-200",
    description: "Philippine-based social media and live streaming platform.",
    website: "https://kumu.ph",
    address: {
      street: "6F Jollibee Plaza Building, Emerald Avenue",
      city: "Pasig",
      state: "Metro Manila",
      country: "Philippines"
    },
    contactPerson: {
      firstName: "Sarah",
      lastName: "Dela Cruz",
      title: "People Operations Manager",
      phone: "+63-2-8888-KUMU"
    },
    benefits: ["Startup Equity", "Flexible Hours", "Modern Office", "Learning Opportunities", "Team Building"],
    skillRequirements: [
      { category: "webDevelopment", minScore: 85, preferredLevel: "Advanced" },
      { category: "programming", minScore: 80, preferredLevel: "Advanced" },
      { category: "database", minScore: 75, preferredLevel: "Intermediate" },
      { category: "problemSolving", minScore: 85, preferredLevel: "Advanced" }
    ],
    ojtProgram: {
      duration: "4 months",
      allowance: 15000,
      positions: 8,
      categories: ["Mobile Development", "Backend Development", "Data Science", "DevOps"],
      requirements: ["IT/CS student", "Startup mindset", "Adaptable", "Strong technical skills", "Social media savvy"]
    }
  },
  {
    companyName: "PayMongo",
    industry: "FinTech",
    companySize: "51-200", 
    description: "Philippine fintech startup providing payment infrastructure for businesses.",
    website: "https://www.paymongo.com",
    address: {
      street: "25F Robinsons Cyberscape Alpha",
      city: "Ortigas",
      state: "Metro Manila", 
      country: "Philippines"
    },
    contactPerson: {
      firstName: "Alex",
      lastName: "Villanueva",
      title: "Engineering Manager",
      phone: "+63-2-8888-PAY1"
    },
    benefits: ["Competitive Allowance", "Health Benefits", "Remote Work", "Tech Equipment", "Growth Opportunities"],
    skillRequirements: [
      { category: "programming", minScore: 90, preferredLevel: "Expert" },
      { category: "webDevelopment", minScore: 85, preferredLevel: "Advanced" },
      { category: "database", minScore: 80, preferredLevel: "Advanced" },
      { category: "problemSolving", minScore: 95, preferredLevel: "Expert" }
    ],
    ojtProgram: {
      duration: "6 months",
      allowance: 22000,
      positions: 6,
      categories: ["Full-Stack Development", "API Development", "Security Engineering", "Platform Engineering"],
      requirements: ["Top-tier IT/CS student", "Excellent coding skills", "Interest in fintech", "Problem-solving mindset", "High GPA preferred"]
    }
  }
];

const createCompaniesData = async () => {
  try {
    console.log('Creating Philippine companies database...');

    // Check if any companies already exist
    const existingCompanies = await Company.find();
    if (existingCompanies.length > 0) {
      console.log('Companies already exist in database.');
      console.log(`Found ${existingCompanies.length} existing companies.`);
      
      // Just add OJT program data to existing companies that don't have it
      let updatedCount = 0;
      for (const company of existingCompanies) {
        if (!company.ojtProgram) {
          // Find matching company data
          const matchingCompany = philippineCompanies.find(pc => 
            pc.companyName.toLowerCase() === company.companyName.toLowerCase()
          );
          
          if (matchingCompany) {
            company.ojtProgram = matchingCompany.ojtProgram;
            company.skillRequirements = matchingCompany.skillRequirements;
            await company.save();
            updatedCount++;
            console.log(`✓ Updated ${company.companyName} with OJT program data`);
          }
        }
      }
      console.log(`Updated ${updatedCount} existing companies with OJT program data.`);
    } else {
      // Create new companies
      for (const companyData of philippineCompanies) {
        const company = await Company.create(companyData);
        console.log(`✓ Created ${company.companyName} - ${company.industry}`);
      }
      console.log(`\n✓ Created ${philippineCompanies.length} Philippine companies with OJT programs`);
    }

    console.log('\n=== Philippine Companies OJT Database ===');
    console.log('Total companies with OJT programs:', philippineCompanies.length);
    console.log('Industries covered:');
    console.log('- Technology & Software Development');
    console.log('- Telecommunications');
    console.log('- Banking & Financial Services');
    console.log('- E-commerce & Retail');
    console.log('- Gaming & Entertainment');
    console.log('- Government Agencies');
    console.log('- Startups & FinTech');
    console.log('\nSkill matching criteria implemented for:');
    console.log('- Programming skills');
    console.log('- Database management');
    console.log('- Web development');
    console.log('- Networking');
    console.log('- Problem solving');
    console.log('==========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error creating companies data:', error);
    process.exit(1);
  }
};

createCompaniesData();
