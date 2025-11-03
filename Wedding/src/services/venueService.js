import axios from 'axios';
import {
  VENUE_STATUS,
  storageKeys,
  delay,
  createId,
  ensureSeedData,
  readCollection,
  writeCollection,
  getPackagesForVenue
} from './mockBackend';

const API_URL = import.meta.env.VITE_API_URL || '';

const apiClient = API_URL
  ? axios.create({
      baseURL: API_URL,
      withCredentials: true
    })
  : null;

const getVenues = () => readCollection(storageKeys.venues);
const persistVenues = (venues) => writeCollection(storageKeys.venues, venues);
const getReservations = () => readCollection(storageKeys.reservations);
const persistReservations = (reservations) => writeCollection(storageKeys.reservations, reservations);

export const fetchVenues = async () => {
  if (apiClient) {
    const { data } = await apiClient.get('/venues');
    return data;
  }
  await delay(200);
  return getVenues();
};

export const fetchFeaturedVenues = async (limit = 3) => {
  const venues = await fetchVenues();
  return venues
    .filter((venue) => venue.status === VENUE_STATUS.APPROVED)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
};

export const fetchVenueById = async (venueId) => {
  if (apiClient) {
    const { data } = await apiClient.get(`/venues/${venueId}`);
    return data;
  }
  await delay(200);
  return getVenues().find((venue) => venue.id === venueId) ?? null;
};

export const searchVenues = async ({ city, capacity, eventDate, packageTier }) => {
  const venues = await fetchVenues();
  return venues.filter((venue) => {
    if (venue.status !== VENUE_STATUS.APPROVED) return false;
    const matchesCity = city ? venue.city.toLowerCase() === city.toLowerCase() : true;
    const matchesCapacity = capacity ? venue.capacity >= Number(capacity) : true;
    const matchesDate = eventDate ? venue.availableDates?.includes(eventDate) : true;
    const matchesPackage = packageTier
      ? venue.packages?.some((pkg) => pkg.name.toLowerCase() === packageTier.toLowerCase())
      : true;
    return matchesCity && matchesCapacity && matchesDate && matchesPackage;
  });
};

export const fetchOwnerVenues = async (ownerId) => {
  if (!ownerId) return [];
  const venues = await fetchVenues();
  return venues.filter((venue) => venue.ownerId === ownerId);
};

export const createVenue = async (ownerId, payload) => {
  if (apiClient) {
    const { data } = await apiClient.post('/venues', { ...payload, ownerId });
    return data;
  }

  await delay();
  ensureSeedData();
  const venues = getVenues();

  const newVenue = {
    id: createId('venue'),
    ownerId,
    status: VENUE_STATUS.PENDING,
    createdAt: new Date().toISOString(),
    ...payload,
    packages: payload.packages?.length ? payload.packages : [],
    availableDates: payload.availableDates?.length ? payload.availableDates : []
  };

  persistVenues([...venues, newVenue]);
  return newVenue;
};

export const updateVenue = async (venueId, updates) => {
  if (apiClient) {
    const { data } = await apiClient.patch(`/venues/${venueId}`, updates);
    return data;
  }

  await delay();
  const venues = getVenues();
  const index = venues.findIndex((venue) => venue.id === venueId);

  if (index === -1) {
    throw new Error('Salon bulunamadı');
  }

  const updated = { ...venues[index], ...updates };
  venues[index] = updated;
  persistVenues(venues);
  return updated;
};

export const removeVenue = async (venueId) => {
  if (apiClient) {
    await apiClient.delete(`/venues/${venueId}`);
    return true;
  }

  await delay(150);
  const venues = getVenues().filter((venue) => venue.id !== venueId);
  persistVenues(venues);
  return true;
};

const eventDateTaken = (reservations, venueId, eventDate, excludeReservationId) =>
  reservations.some(
    (reservation) =>
      reservation.venueId === venueId &&
      reservation.eventDate === eventDate &&
      reservation.status === 'confirmed' &&
      reservation.id !== excludeReservationId
  );

export const createReservation = async (customerId, payload) => {
  if (apiClient) {
    const { data } = await apiClient.post('/reservations', { ...payload, customerId });
    return data;
  }

  await delay();
  const reservations = getReservations();

  if (eventDateTaken(reservations, payload.venueId, payload.eventDate)) {
    throw new Error('Bu tarih seçilen salon için zaten rezerve edilmiş');
  }

  const reservation = {
    id: createId('res'),
    customerId,
    status: 'pending',
    createdAt: new Date().toISOString(),
    ...payload
  };

  persistReservations([...reservations, reservation]);
  return reservation;
};

export const fetchCustomerReservations = async (customerId) => {
  if (!customerId) return [];
  if (apiClient) {
    const { data } = await apiClient.get(`/customers/${customerId}/reservations`);
    return data;
  }

  await delay(200);
  const reservations = getReservations().filter((res) => res.customerId === customerId);
  const venues = getVenues();
  return reservations.map((reservation) => {
    const venue = venues.find((item) => item.id === reservation.venueId);
    return {
      ...reservation,
      venue,
      package: getPackagesForVenue(venue, reservation.packageId)
    };
  });
};

export const fetchOwnerReservations = async (ownerId) => {
  if (!ownerId) return [];

  if (apiClient) {
    const { data } = await apiClient.get(`/owners/${ownerId}/reservations`);
    return data;
  }

  await delay(200);
  const venues = getVenues().filter((venue) => venue.ownerId === ownerId);
  const reservations = getReservations().filter((res) =>
    venues.some((venue) => venue.id === res.venueId)
  );

  return reservations.map((reservation) => {
    const venue = venues.find((item) => item.id === reservation.venueId);
    return {
      ...reservation,
      venue,
      package: getPackagesForVenue(venue, reservation.packageId)
    };
  });
};

export const updateReservationStatus = async (reservationId, status) => {
  if (apiClient) {
    const { data } = await apiClient.patch(`/reservations/${reservationId}`, { status });
    return data;
  }

  await delay(200);
  const reservations = getReservations();
  const index = reservations.findIndex((res) => res.id === reservationId);

  if (index === -1) {
    throw new Error('Rezervasyon bulunamadı');
  }

  const updated = { ...reservations[index], status };
  reservations[index] = updated;
  persistReservations(reservations);
  return updated;
};

export const fetchSuggestedDates = async (venueId) => {
  const venue = await fetchVenueById(venueId);
  return venue?.availableDates ?? [];
};

