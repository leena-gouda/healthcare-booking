const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Doctor = require('./models/Doctor');
const BlogPost = require('./models/BlogPost');

dotenv.config();

const doctors = [
  {
    name: 'Dr. Sarah Mitchell',
    specialty: 'Cardiologist',
    experience: 12,
    rating: 4.9,
    reviews: 124,
    available: true,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    about: 'Dr. Mitchell is a board-certified cardiologist with over 12 years of experience in treating heart conditions. She specializes in preventive cardiology and heart failure management.',
    education: 'MD from Cairo University, Fellowship at Johns Hopkins',
    languages: ['English', 'Arabic'],
    fee: 300,
    availability: {
      Monday: ['9:00 AM', '10:00 AM', '2:00 PM'],
      Tuesday: ['11:00 AM', '3:00 PM'],
      Wednesday: ['9:00 AM', '1:00 PM', '4:00 PM'],
      Thursday: [],
      Friday: ['10:00 AM', '2:00 PM'],
    },
  },
  {
    name: 'Dr. James Okafor',
    specialty: 'Neurologist',
    experience: 8,
    rating: 4.7,
    reviews: 89,
    available: true,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    about: 'Dr. Okafor specializes in neurological disorders including migraines, epilepsy, and stroke recovery. He is known for his patient-centered approach.',
    education: 'MD from Alexandria University, Residency at Mayo Clinic',
    languages: ['English', 'French'],
    fee: 350,
    availability: {
      Monday: ['10:00 AM', '3:00 PM'],
      Tuesday: ['9:00 AM', '11:00 AM'],
      Wednesday: [],
      Thursday: ['2:00 PM', '4:00 PM'],
      Friday: ['9:00 AM'],
    },
  },
  {
    name: 'Dr. Layla Hassan',
    specialty: 'Dermatologist',
    experience: 6,
    rating: 4.8,
    reviews: 201,
    available: false,
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    about: 'Dr. Hassan is a dermatologist specializing in acne, eczema, and cosmetic dermatology. She has helped thousands of patients achieve healthy skin.',
    education: 'MD from Ain Shams University',
    languages: ['English', 'Arabic'],
    fee: 250,
    availability: {
      Monday: [],
      Tuesday: ['10:00 AM', '1:00 PM'],
      Wednesday: ['9:00 AM', '3:00 PM'],
      Thursday: ['11:00 AM', '2:00 PM'],
      Friday: [],
    },
  },
  {
    name: 'Dr. Michael Chen',
    specialty: 'Orthopedic Surgeon',
    experience: 15,
    rating: 4.6,
    reviews: 178,
    available: true,
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    about: 'Dr. Chen is a highly experienced orthopedic surgeon specializing in joint replacement, sports injuries, and spine conditions.',
    education: 'MD from Cairo University, Fellowship at HSS New York',
    languages: ['English', 'Mandarin'],
    fee: 400,
    availability: {
      Monday: ['8:00 AM', '11:00 AM'],
      Tuesday: [],
      Wednesday: ['10:00 AM', '2:00 PM'],
      Thursday: ['9:00 AM', '3:00 PM'],
      Friday: ['8:00 AM', '1:00 PM'],
    },
  },
  {
    name: 'Dr. Fatima Al-Rashid',
    specialty: 'Pediatrician',
    experience: 10,
    rating: 4.9,
    reviews: 312,
    available: true,
    image: 'https://randomuser.me/api/portraits/women/26.jpg',
    about: 'Dr. Al-Rashid is a compassionate pediatrician dedicated to the health and wellbeing of children from newborns to teenagers.',
    education: 'MD from Mansoura University, Pediatric Residency at Great Ormond Street',
    languages: ['English', 'Arabic', 'French'],
    fee: 200,
    availability: {
      Monday: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM'],
      Tuesday: ['9:00 AM', '3:00 PM'],
      Wednesday: ['10:00 AM', '1:00 PM'],
      Thursday: ['9:00 AM', '11:00 AM', '4:00 PM'],
      Friday: ['9:00 AM', '2:00 PM'],
    },
  },
  {
    name: 'Dr. Robert Andersen',
    specialty: 'Psychiatrist',
    experience: 9,
    rating: 4.5,
    reviews: 67,
    available: false,
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
    about: 'Dr. Andersen specializes in anxiety, depression, and mood disorders. He combines medication management with evidence-based therapy approaches.',
    education: 'MD from Heidelberg University, Psychiatry Residency at UCLA',
    languages: ['English', 'German'],
    fee: 380,
    availability: {
      Monday: [],
      Tuesday: ['2:00 PM', '4:00 PM'],
      Wednesday: ['10:00 AM'],
      Thursday: ['3:00 PM'],
      Friday: [],
    },
  },
];

const blogPosts = [
  {
    title: 'The Importance of Regular Heart Checkups',
    category: 'Cardiology',
    author: 'Dr. Sarah Mitchell',
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600',
    excerpt: 'Heart disease remains the leading cause of death worldwide. Learn why annual checkups can save your life and what to expect during a cardiac screening.',
    content: 'Heart disease is often called a silent killer because many people have no symptoms until a major event like a heart attack occurs. Regular checkups allow doctors to catch warning signs early — high blood pressure, elevated cholesterol, or irregular heartbeat — before they become life-threatening. During a cardiac screening, your doctor will measure your blood pressure, run an ECG, and review your lifestyle factors. The whole process takes under an hour but can add years to your life. Many patients who discover heart problems early are able to manage them entirely through lifestyle changes — improved diet, regular exercise, and stress reduction. Those who wait until symptoms appear often face more serious interventions. The recommendation from most cardiologists is to begin annual heart screenings at age 40, or earlier if you have a family history of heart disease, high blood pressure, or diabetes. Do not wait for symptoms to appear. The best time to check your heart health is when you feel completely fine.',
    readTime: 5,
  },
  {
    title: 'Managing Anxiety in a Fast-Paced World',
    category: 'Mental Health',
    author: 'Dr. Robert Andersen',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600',
    excerpt: 'Anxiety affects millions of people globally. Here are evidence-based strategies that actually work, from breathing techniques to cognitive reframing.',
    content: 'Anxiety is one of the most common mental health conditions, yet it remains widely misunderstood. Unlike stress, which is triggered by external pressures, anxiety can persist even when there is no obvious threat. Evidence-based treatments include cognitive behavioral therapy (CBT), mindfulness meditation, and in some cases medication. Simple daily habits like consistent sleep schedules, regular exercise, and limiting caffeine can make a significant difference in managing symptoms. One of the most effective immediate techniques is diaphragmatic breathing — breathing deeply into your belly rather than your chest. This activates the parasympathetic nervous system and signals to your brain that you are safe. Practice this for five minutes daily and you will notice a meaningful reduction in baseline anxiety within two weeks. Another powerful tool is cognitive reframing — the practice of identifying anxious thoughts and questioning their validity. Ask yourself: is this thought based on facts or assumptions? What is the realistic worst case scenario, and could I handle it? Most people find that when they examine their anxious thoughts closely, those thoughts do not hold up to scrutiny.',
    readTime: 4,
  },
  {
    title: 'Everything You Need to Know About Skincare Routines',
    category: 'Dermatology',
    author: 'Dr. Layla Hassan',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600',
    excerpt: 'With hundreds of skincare products on the market, it can be overwhelming. A dermatologist breaks down exactly what your skin actually needs.',
    content: 'The skincare industry is worth billions, but most people only need three to four products for healthy skin. A gentle cleanser, a moisturizer suited to your skin type, sunscreen with at least SPF 30, and if needed, a targeted treatment like retinol or niacinamide. The most common mistake people make is over-washing or using too many active ingredients at once, which strips the skin barrier and causes irritation. Less is almost always more. Sunscreen is the single most impactful product you can use. More than 80 percent of visible skin aging — wrinkles, dark spots, uneven texture — is caused by UV exposure, not by the natural aging process. A broad-spectrum SPF 30 or higher applied every morning will do more for your skin than any anti-aging serum on the market. For those dealing with acne, the most evidence-backed ingredients are benzoyl peroxide, salicylic acid, and adapalene. Avoid picking or popping pimples as this introduces bacteria and dramatically increases the chance of scarring. Consistency matters more than the specific products you choose — a simple routine followed daily will always outperform an elaborate routine followed inconsistently.',
    readTime: 6,
  },
  {
    title: 'Nutrition Tips for Strong Bones and Joints',
    category: 'Nutrition',
    author: 'Dr. Michael Chen',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600',
    excerpt: 'What you eat directly impacts your bone density and joint health. Discover the foods and supplements that make the biggest difference.',
    content: 'Calcium and vitamin D are well-known for bone health, but they are just the beginning. Magnesium, vitamin K2, and collagen-supporting nutrients like vitamin C also play critical roles. Dairy products, leafy greens, fatty fish, and nuts are your best food sources. Avoiding excessive alcohol and smoking is equally important, as both directly reduce bone density over time. Weight-bearing exercise like walking, dancing, or resistance training stimulates bone formation and should be part of every adult routine. For joint health specifically, omega-3 fatty acids found in fatty fish like salmon, sardines, and mackerel have strong anti-inflammatory properties that can reduce joint pain and stiffness. Glucosamine and chondroitin supplements have mixed evidence but some patients find meaningful benefit, particularly for knee osteoarthritis. Staying well hydrated is also essential — cartilage is approximately 80 percent water, and chronic dehydration accelerates cartilage breakdown. Aim for at least 8 glasses of water daily, more if you are physically active. The best dietary pattern for bone and joint health overall is the Mediterranean diet — rich in vegetables, legumes, whole grains, fish, and olive oil, with limited processed foods and red meat.',
    readTime: 5,
  },
  {
    title: 'When Should You Take Your Child to a Pediatrician?',
    category: 'Pediatrics',
    author: 'Dr. Fatima Al-Rashid',
    image: 'https://images.unsplash.com/photo-1576765608622-067973a79f53?w=600',
    excerpt: 'New parents often wonder what symptoms are serious and what can wait. A pediatrician shares the definitive guide to knowing when to seek care.',
    content: 'Many parents panic at the first sign of a fever, while others wait too long when something is genuinely urgent. The key indicators that require immediate attention include fever above 38 degrees Celsius in infants under 3 months, difficulty breathing, persistent vomiting or diarrhea leading to dehydration, rashes with fever, and any loss of consciousness. Routine wellness visits on the other hand should happen at 1, 2, 4, 6, 9, 12, 15, 18, and 24 months, then annually. These visits track development and ensure vaccinations are up to date. Fever in older children is often not dangerous on its own — what matters more is how the child looks and behaves. A child with a 39 degree fever who is alert, drinking fluids, and playing is usually fine to monitor at home. A child with a 38 degree fever who is lethargic, refusing all fluids, and difficult to wake needs immediate attention. Trust your instincts as a parent. You know your child better than anyone, and if something feels wrong, it is always better to seek reassurance from a professional than to wait and worry.',
    readTime: 7,
  },
  {
    title: 'Understanding Migraines vs Regular Headaches',
    category: 'Neurology',
    author: 'Dr. James Okafor',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600',
    excerpt: 'Not all headaches are the same. Learn how to tell the difference and when it is time to see a neurologist.',
    content: 'A migraine is not just a bad headache — it is a neurological condition with distinct phases. The prodrome phase can begin up to 48 hours before pain starts, causing mood changes, food cravings, and neck stiffness. The aura phase, experienced by about 25 percent of migraine sufferers, involves visual disturbances like zigzag lines or blind spots. The headache phase itself typically lasts 4 to 72 hours and is characterized by pulsating pain, usually on one side, accompanied by nausea and sensitivity to light and sound. If you experience more than 4 migraines per month, preventive treatment is worth discussing with a neurologist. Common triggers include hormonal changes, certain foods like aged cheese and processed meats, alcohol especially red wine, changes in sleep patterns, and stress. Keeping a headache diary for one month — noting when headaches occur, their duration, severity, and potential triggers — is one of the most useful things you can do before your first neurology appointment. Over-the-counter pain medications can help with occasional migraines but should not be taken more than 10 days per month, as overuse paradoxically leads to more frequent headaches, a condition known as medication overuse headache.',
    readTime: 6,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');

    await Doctor.deleteMany();
    await BlogPost.deleteMany();
    console.log('Cleared old data...');

    await Doctor.insertMany(doctors);
    await BlogPost.insertMany(blogPosts);
    console.log('Database seeded successfully!');

    mongoose.connection.close();
    console.log('Done! You can close this.');
  } catch (err) {
    console.log('Error seeding database:', err);
  }
};

seedDB();