const API_BASE = "http://localhost:8000/api";

// Helper to get CSRF token from cookies
function getCsrfToken(): string {
  const name = "csrftoken";
  let cookieValue = "";
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const resp = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.method && options.method !== "GET"
        ? { "X-CSRFToken": getCsrfToken() }
        : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!resp.ok) {
    const text = await resp.text();
    let detail: any;
    try {
      detail = JSON.parse(text);
    } catch {
      detail = { detail: text || resp.statusText };
    }
    throw new Error(detail.detail || JSON.stringify(detail));
  }

  if (resp.status === 204) return null as T;
  return resp.json() as Promise<T>;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  phone: string;
  region: string;
  membership_tier: string;
}

export interface Service {
  id: number;
  name: string;
  base_price: string;
  duration_minutes: number;
}

export interface Booking {
  id: number;
  order_id: string;
  status: string;
  scheduled_at: string;
  zone: string;
  service: Service;
}

export interface BookingPayload {
  service_id: number;
  vehicle_id: number;
  scheduled_at: string;
  address: string;
  zone: string;
  amount: string;
  gst_percent: string;
}

export const api = {
  me: () => request<User>("/me/"),
  services: () => request<Service[]>("/services/"),
  bookings: () => request<Booking[]>("/bookings/"),
  activeBookings: () => request<Booking[]>("/bookings/active/"),
  pendingAssignment: () =>
    request<Booking[]>("/bookings/pending_assignment/"),
  createBooking: (payload: BookingPayload) =>
    request<Booking>("/bookings/", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
