export type UserRole = 'admin' | 'user';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  role: UserRole;
}

export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}

export interface ProjectRecord {
  id: string;
  name: string;
  type: string;
  region: string;
  progress: number;
  status: 'active' | 'pending' | 'closed';
  budget: number;
  updatedAt: string;
}

export interface CreateProjectPayload {
  name: string;
  type: string;
  region: string;
  progress: number;
  status: 'active' | 'pending' | 'closed';
  budget: number;
}

export interface JobRecord {
  id: string;
  title: string;
  department: string;
  location: string;
  level: string;
  applicants: number;
  status: 'open' | 'paused' | 'closed';
  updatedAt: string;
}

export interface CreateJobPayload {
  title: string;
  department: string;
  location: string;
  level: string;
  applicants: number;
  status: 'open' | 'paused' | 'closed';
}

export interface PaymentRecord {
  id: string;
  invoiceId: string;
  customer: string;
  ownerEmail: string;
  method: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  updatedAt: string;
}

export interface CreatePaymentPayload {
  invoiceId: string;
  customer: string;
  ownerEmail: string;
  method: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'suspended';
  phone: string;
  updatedAt: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'suspended';
  phone: string;
}

export type ProjectStats = {
  total: number;
  active: number;
  pending: number;
  closed: number;
  avgProgress: number;
};

export type JobStats = {
  total: number;
  open: number;
  paused: number;
  closed: number;
  applicants: number;
};

export type PaymentStats = {
  totalInvoices: number;
  totalAmount: number;
  paid: number;
  pending: number;
  overdue: number;
};

export type UserStats = {
  total: number;
  admins: number;
  active: number;
  suspended: number;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    let message = `Request failed: ${response.status}`;

    try {
      const data = (await response.json()) as { message?: string | string[] };
      const errorMessage = Array.isArray(data.message) ? data.message.join(', ') : data.message;
      if (errorMessage) {
        message = errorMessage;
      }
    } catch {
      // ignore parse error
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

export function loginWithGoogle(idToken: string) {
  return apiRequest<AuthResponse>('/auth/google', {
    method: 'POST',
    body: JSON.stringify({ idToken }),
  });
}

export function getGoogleOAuthLoginUrl(nextPath?: string | null) {
  const url = new URL('/auth/google/login', API_BASE_URL);
  if (nextPath) {
    url.searchParams.set('next', nextPath);
  }
  return url.toString();
}

export function devLogin(email: string, name?: string) {
  return apiRequest<AuthResponse>('/auth/dev-login', {
    method: 'POST',
    body: JSON.stringify({ email, name }),
  });
}

export function fetchAuthMe(token: string) {
  return apiRequest<{ user: AuthUser }>('/auth/me', {
    headers: authHeaders(token),
  });
}

export function fetchProjects(token: string) {
  return apiRequest<ProjectRecord[]>('/projects', {
    headers: authHeaders(token),
  });
}

export function fetchProjectStats(token: string) {
  return apiRequest<ProjectStats>('/projects/stats', {
    headers: authHeaders(token),
  });
}

export function createProject(token: string, payload: CreateProjectPayload) {
  return apiRequest<ProjectRecord>('/projects', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function updateProject(token: string, id: string, payload: Partial<CreateProjectPayload>) {
  return apiRequest<ProjectRecord>(`/projects/${id}`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function deleteProject(token: string, id: string) {
  return apiRequest<{ deleted: boolean }>(`/projects/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
}

export function fetchJobs(token: string) {
  return apiRequest<JobRecord[]>('/jobs', {
    headers: authHeaders(token),
  });
}

export function fetchJobStats(token: string) {
  return apiRequest<JobStats>('/jobs/stats', {
    headers: authHeaders(token),
  });
}

export function createJob(token: string, payload: CreateJobPayload) {
  return apiRequest<JobRecord>('/jobs', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function updateJob(token: string, id: string, payload: Partial<CreateJobPayload>) {
  return apiRequest<JobRecord>(`/jobs/${id}`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function deleteJob(token: string, id: string) {
  return apiRequest<{ deleted: boolean }>(`/jobs/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
}

export function fetchPayments(token: string) {
  return apiRequest<PaymentRecord[]>('/payments', {
    headers: authHeaders(token),
  });
}

export function fetchMyPayments(token: string) {
  return apiRequest<PaymentRecord[]>('/payments/my', {
    headers: authHeaders(token),
  });
}

export function fetchPaymentStats(token: string) {
  return apiRequest<PaymentStats>('/payments/stats', {
    headers: authHeaders(token),
  });
}

export function createPayment(token: string, payload: CreatePaymentPayload) {
  return apiRequest<PaymentRecord>('/payments', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function updatePayment(token: string, id: string, payload: Partial<CreatePaymentPayload>) {
  return apiRequest<PaymentRecord>(`/payments/${id}`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function deletePayment(token: string, id: string) {
  return apiRequest<{ deleted: boolean }>(`/payments/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
}

export function fetchUsers(token: string) {
  return apiRequest<UserRecord[]>('/users', {
    headers: authHeaders(token),
  });
}

export function fetchUserStats(token: string) {
  return apiRequest<UserStats>('/users/stats', {
    headers: authHeaders(token),
  });
}

export function fetchMyProfile(token: string) {
  return apiRequest<UserRecord>('/users/me', {
    headers: authHeaders(token),
  });
}

export function createUser(token: string, payload: CreateUserPayload) {
  return apiRequest<UserRecord>('/users', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function updateUser(token: string, id: string, payload: Partial<CreateUserPayload>) {
  return apiRequest<UserRecord>(`/users/${id}`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function deleteUser(token: string, id: string) {
  return apiRequest<{ deleted: boolean }>(`/users/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
}
