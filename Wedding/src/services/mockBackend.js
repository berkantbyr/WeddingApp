const STORAGE_KEYS = {
  seeded: 'sb_seeded',
  seedVersion: 'sb_seed_version',
  users: 'sb_users',
  venues: 'sb_venues',
  reservations: 'sb_reservations',
  notifications: 'sb_notifications'
};

const CURRENT_SEED_VERSION = '2025-11-username-flip';

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
    username: 'admin',
    email: 'admin@salonbulucu.com',
    password: 'Admin123',
    role: ROLES.ADMIN,
    avatar: 'https://i.pravatar.cc/150?img=12'
  },
  {
    id: 'user-owner-1',
    fullName: 'Miray Tiryaki',
    username: 'owner1',
    email: 'owner@salonbulucu.com',
    password: 'Owner123',
    role: ROLES.OWNER,
    avatar: 'https://i.pravatar.cc/150?img=32',
    company: 'Aurora Events'
  },
  {
    id: 'user-customer-1',
    fullName: 'Hamza Baran',
    username: 'hamza',
    email: 'hamza@salonbulucu.com',
    password: 'Customer123',
    role: ROLES.CUSTOMER,
    avatar: 'https://i.pravatar.cc/150?img=48'
  }
];

const seededVenues = [];

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

const resetSeedData = () => {
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
  window.localStorage.setItem(STORAGE_KEYS.seedVersion, CURRENT_SEED_VERSION);
};

export const ensureSeedData = () => {
  if (!isBrowser) return;
  const storedVersion = window.localStorage.getItem(STORAGE_KEYS.seedVersion);

  if (storedVersion !== CURRENT_SEED_VERSION) {
    Object.values(STORAGE_KEYS).forEach((key) => {
      if (key !== STORAGE_KEYS.seedVersion) {
        window.localStorage.removeItem(key);
      }
    });
  }

  if (window.localStorage.getItem(STORAGE_KEYS.seeded)) {
    window.localStorage.setItem(STORAGE_KEYS.seedVersion, CURRENT_SEED_VERSION);
    return;
  }

  resetSeedData();
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

