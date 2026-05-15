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
    content: 'Heart disease is often called a silent killer because many people have no symptoms until a major event like a heart attack occurs. Regular checkups allow doctors to catch warning signs early before they become life-threatening.',
    readTime: 5,
  },
  {
    title: 'Managing Anxiety in a Fast-Paced World',
    category: 'Mental Health',
    author: 'Dr. Robert Andersen',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600',
    excerpt: 'Anxiety affects millions of people globally. Here are evidence-based strategies that actually work.',
    content: 'Anxiety is one of the most common mental health conditions, yet it remains widely misunderstood. Evidence-based treatments include cognitive behavioral therapy, mindfulness meditation, and in some cases medication.',
    readTime: 4,
  },
  {
    title: 'Everything You Need to Know About Skincare Routines',
    category: 'Dermatology',
    author: 'Dr. Layla Hassan',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600',
    excerpt: 'With hundreds of skincare products on the market, a dermatologist breaks down exactly what your skin actually needs.',
    content: 'The skincare industry is worth billions, but most people only need three to four products for healthy skin. A gentle cleanser, a moisturizer, sunscreen with at least SPF 30, and if needed, a targeted treatment.',
    readTime: 6,
  },
  {
    title: 'Nutrition Tips for Strong Bones and Joints',
    category: 'Nutrition',
    author: 'Dr. Michael Chen',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600',
    excerpt: 'What you eat directly impacts your bone density and joint health.',
    content: 'Calcium and vitamin D are well-known for bone health, but magnesium, vitamin K2, and collagen-supporting nutrients also play critical roles.',
    readTime: 5,
  },
  {
    title: 'When Should You Take Your Child to a Pediatrician?',
    category: 'Pediatrics',
    author: 'Dr. Fatima Al-Rashid',
    image: 'https://images.unsplash.com/photo-1576765608622-067973a79f53?w=600',
    excerpt: 'New parents often wonder what symptoms are serious and what can wait.',
    content: 'Many parents panic at the first sign of a fever, while others wait too long when something is genuinely urgent. Key indicators that require immediate attention include fever above 38C in infants under 3 months.',
    readTime: 7,
  },
  {
    title: 'Understanding Migraines vs Regular Headaches',
    category: 'Neurology',
    author: 'Dr. James Okafor',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600',
    excerpt: 'Not all headaches are the same. Learn how to tell the difference.',
    content: 'A migraine is not just a bad headache, it is a neurological condition with distinct phases. The prodrome phase can begin up to 48 hours before pain starts.',
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