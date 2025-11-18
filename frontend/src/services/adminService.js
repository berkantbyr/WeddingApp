import {
  VENUE_STATUS,
  storageKeys,
  delay,
  ensureSeedData,
  readCollection,
  writeCollection
} from './mockBackend';
import { listUsers } from './authService';
import { apiClient, USE_MOCK_API } from './apiClient';

const shouldUseMock = USE_MOCK_API;

const getVenues = () => readCollection(storageKeys.venues);
const persistVenues = (venues) => writeCollection(storageKeys.venues, venues);
const getReservations = () => readCollection(storageKeys.reservations);

export const fetchPendingVenues = async () => {
  if (!shouldUseMock) {
    const { data } = await apiClient.get('/admin/venues?status=pending');
    return data;
  }

  await delay(200);
  ensureSeedData();
  return getVenues().filter((venue) => venue.status === VENUE_STATUS.PENDING);
};

export const updateVenueStatus = async (venueId, status) => {
  if (!shouldUseMock) {
    const { data } = await apiClient.patch(`/admin/venues/${venueId}`, { status });
    return data;
  }

  await delay();
  const venues = getVenues();
  const index = venues.findIndex((venue) => venue.id === venueId);

  if (index === -1) {
    throw new Error('Salon bulunamadı');
  }

  const updated = { ...venues[index], status };
  venues[index] = updated;
  persistVenues(venues);
  return updated;
};

export const fetchDashboardStats = async () => {
  if (!shouldUseMock) {
    const { data } = await apiClient.get('/admin/stats');
    return data;
  }

  await delay(150);
  const venues = getVenues();
  const reservations = getReservations();
  const users = await listUsers();

  return {
    venueCount: venues.length,
    pendingVenueCount: venues.filter((venue) => venue.status === VENUE_STATUS.PENDING).length,
    approvedVenueCount: venues.filter((venue) => venue.status === VENUE_STATUS.APPROVED).length,
    reservationCount: reservations.length,
    userCount: users.length
  };
};

export const fetchAllUsers = listUsers;

