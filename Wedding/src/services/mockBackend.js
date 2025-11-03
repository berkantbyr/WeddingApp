const STORAGE_KEYS = {
  seeded: 'sb_seeded',
  users: 'sb_users',
  venues: 'sb_venues',
  reservations: 'sb_reservations',
  notifications: 'sb_notifications'
};

export const ROLES = {
  ADMIN: 'admin',
  OWNER: 'owner',
  CUSTOMER: 'customer'
};

export const VENUE_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

const isBrowser = typeof window !== 'undefined';

const seededUsers = [
  {
    id: 'user-admin',
    fullName: 'Berkant Onat Bayar',
    email: 'admin@salonbulucu.com',
    password: 'Admin123',
    role: ROLES.ADMIN,
    avatar: 'https://i.pravatar.cc/150?img=12'
  },
  {
    id: 'user-owner-1',
    fullName: 'Miray Tiryaki',
    email: 'owner@salonbulucu.com',
    password: 'Owner123',
    role: ROLES.OWNER,
    avatar: 'https://i.pravatar.cc/150?img=32',
    company: 'Aurora Events'
  },
  {
    id: 'user-customer-1',
    fullName: 'Hamza Baran',
    email: 'hamza@salonbulucu.com',
    password: 'Customer123',
    role: ROLES.CUSTOMER,
    avatar: 'https://i.pravatar.cc/150?img=48'
  }
];

const seededVenues = [
  {
    id: 'venue-1',
    ownerId: 'user-owner-1',
    name: 'Luna Garden Wedding Hall',
    city: 'Istanbul',
    district: 'Besiktas',
    address: 'Cihannuma Mah. 20. Sokak No:12',
    capacity: 350,
    coverImage: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1100&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1100&q=80',
      'https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=1100&q=80'
    ],
    description:
      'Panoramic Bosphorus view, glass ceiling, customizable lighting and premium catering partners for unforgettable celebrations.',
    packages: [
      {
        id: 'pkg-1',
        name: 'Economic',
        price: 55000,
        features: ['Classic menu', 'Standard decor', 'DJ performance', 'Photo corner']
      },
      {
        id: 'pkg-2',
        name: 'Standard',
        price: 78000,
        features: ['Signature menu', 'Premium decor', 'Live music trio', 'Welcome cocktail']
      },
      {
        id: 'pkg-3',
        name: 'Premium',
        price: 112000,
        features: ['Fine dining menu', 'Luxury decor', 'Fireworks show', 'After party setup']
      }
    ],
    availableDates: ['2025-11-15', '2025-11-22', '2025-12-05', '2025-12-13'],
    status: VENUE_STATUS.APPROVED,
    createdAt: '2025-10-05T10:00:00.000Z'
  },
  {
    id: 'venue-2',
    ownerId: 'user-owner-1',
    name: 'Velvet Royal Ballroom',
    city: 'Ankara',
    district: 'Cankaya',
    address: 'Ataturk Bulvari No:221 Kat:4',
    capacity: 500,
    coverImage: 'https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=1100&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1530023367847-a683933f4177?auto=format&fit=crop&w=1100&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=80'
    ],
    description:
      'Ballroom elegance with crystal chandeliers, LED wall projections, valet service and in-house floral design team.',
    packages: [
      {
        id: 'pkg-4',
        name: 'Economic',
        price: 62000,
        features: ['Buffet menu', 'Classic decor', 'DJ performance', 'Lighting setup']
      },
      {
        id: 'pkg-5',
        name: 'Standard',
        price: 88000,
        features: ['Seated menu', 'Premium decor', 'Live band', 'Cake service']
      },
      {
        id: 'pkg-6',
        name: 'Premium',
        price: 128000,
        features: ['Gourmet menu', 'Designer decor', 'String quartet', 'Private lounge']
      }
    ],
    availableDates: ['2025-11-29', '2025-12-06', '2025-12-20'],
    status: VENUE_STATUS.PENDING,
    createdAt: '2025-10-12T14:30:00.000Z'
  }
];

const seededReservations = [
  {
    id: 'res-1',
    venueId: 'venue-1',
    customerId: 'user-customer-1',
    packageId: 'pkg-2',
    eventDate: '2025-11-22',
    guestCount: 280,
    status: 'confirmed',
    createdAt: '2025-10-20T09:45:00.000Z'
  }
];

const buildNotification = (payload) => ({
  id: `note-${Math.random().toString(36).slice(2, 9)}`,
  createdAt: new Date().toISOString(),
  read: false,
  ...payload
});

const readStorage = (key) => {
  if (!isBrowser) return [];
  try {
    return JSON.parse(window.localStorage.getItem(key) ?? '[]');
  } catch (error) {
    console.error('Failed to parse local storage data', key, error);
    return [];
  }
};

const writeStorage = (key, value) => {
  if (!isBrowser) return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const ensureSeedData = () => {
  if (!isBrowser) return;
  if (window.localStorage.getItem(STORAGE_KEYS.seeded)) return;

  writeStorage(STORAGE_KEYS.users, seededUsers);
  writeStorage(STORAGE_KEYS.venues, seededVenues);
  writeStorage(STORAGE_KEYS.reservations, seededReservations);
  writeStorage(
    STORAGE_KEYS.notifications,
    [
      buildNotification({
        userId: 'user-owner-1',
        title: 'New reservation request',
        message: 'Hamza Baran requested Luna Garden Wedding Hall for 22 November 2025.'
      })
    ]
  );

  window.localStorage.setItem(STORAGE_KEYS.seeded, 'true');
};

export const readCollection = (key) => {
  ensureSeedData();
  return readStorage(key);
};

export const writeCollection = (key, data) => {
  ensureSeedData();
  writeStorage(key, data);
};

export const upsertCollectionItem = (key, item) => {
  const existing = readCollection(key);
  const index = existing.findIndex((entry) => entry.id === item.id);
  if (index >= 0) {
    existing[index] = { ...existing[index], ...item };
  } else {
    existing.push(item);
  }
  writeCollection(key, existing);
  return existing[index >= 0 ? index : existing.length - 1];
};

export const removeCollectionItem = (key, id) => {
  const existing = readCollection(key);
  const filtered = existing.filter((entry) => entry.id !== id);
  writeCollection(key, filtered);
  return filtered;
};

export const delay = (ms = 450) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const createId = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 10)}`;

export const storageKeys = STORAGE_KEYS;

export const getUserFriendlyRole = (role) => {
  switch (role) {
    case ROLES.ADMIN:
      return 'Yönetici';
    case ROLES.OWNER:
      return 'Salon Sahibi';
    case ROLES.CUSTOMER:
      return 'Müşteri';
    default:
      return 'Kullanıcı';
  }
};

export const getPackagesForVenue = (venue, packageId) =>
  venue?.packages?.find((pkg) => pkg.id === packageId);

