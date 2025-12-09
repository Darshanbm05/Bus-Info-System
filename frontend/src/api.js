const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

async function request(path, opts = {}) {
  const res = await fetch(API_BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    ...opts
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'API error');
  return data;
}

export const api = {
  login: (username, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  getPlaces: () => request('/places'),
  addPlace: (name) => request('/places', { method: 'POST', body: JSON.stringify({ name }) }),
  deletePlace: (id) => request(`/places/${id}`, { method: 'DELETE' }),
  getBuses: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request('/buses' + (qs ? ('?' + qs) : ''));
  },
  addBus: (payload) => request('/buses', { method: 'POST', body: JSON.stringify(payload) }),
  deleteBus: (id) => request(`/buses/${id}`, { method: 'DELETE' }),
  getTimetable: (placeId) => request(`/buses/timetable/${placeId}`),
  submitQuery: (data) => request('/queries', { method: 'POST', body: JSON.stringify(data) }),
  getQueries: () => request('/queries'),
  getUnreadQueries: () => request('/queries/unread'),
  markQueryAsRead: (id) => request(`/queries/${id}/read`, { method: 'PUT' }),
  deleteQuery: (id) => request(`/queries/${id}`, { method: 'DELETE' })
};
