const seedUsers = [
  {
    email: 'student@example.com',
    password: 'password123',
    role: 'student',
  },
  {
    email: 'college@example.com',
    password: 'password123',
    role: 'college',
  },
  {
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
  },
];

const seedEvents = [
  {
    title: 'Annual Tech Conference 2026',
    description:
      'Join us for the biggest tech conference of the year featuring keynote speakers from leading tech companies.',
    date: '2026-05-15',
    time: '09:00 AM',
    location: 'Convention Center, Hall A',
    category: 'Conference',
    capacity: 500,
    registered: 234,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Web Development Workshop',
    description: 'Learn modern web development techniques with hands-on coding sessions.',
    date: '2026-04-25',
    time: '02:00 PM',
    location: 'Computer Lab, Building B',
    category: 'Workshop',
    capacity: 50,
    registered: 42,
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Data Science Seminar',
    description: 'Introduction to Data Science and Machine Learning applications.',
    date: '2026-05-02',
    time: '11:00 AM',
    location: 'Auditorium, Building C',
    category: 'Seminar',
    capacity: 300,
    registered: 187,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Annual Sports Day',
    description: 'Celebrate sports and fitness with various competitions and events.',
    date: '2026-04-30',
    time: '08:00 AM',
    location: 'Sports Complex',
    category: 'Sports',
    capacity: 1000,
    registered: 756,
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Artificial Intelligence Expo',
    description: 'Explore cutting-edge AI technologies and innovations.',
    date: '2026-05-20',
    time: '10:00 AM',
    location: 'Exhibition Hall',
    category: 'Expo',
    capacity: 800,
    registered: 432,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
  },
];

module.exports = {
  seedUsers,
  seedEvents,
};