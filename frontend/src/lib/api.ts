// Frontend API client for backend integration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export interface ApiError {
  detail: string;
  status: number;
}

export class ApiClient {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("access_token");
    }
    return this.token;
  }

  private getHeaders() {
    const token = this.getToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  }

  async request<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    endpoint: string,
    data?: unknown
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const options: RequestInit = {
      method,
      headers: this.getHeaders(),
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        detail: "Unknown error",
        status: response.status,
      }));
      throw error;
    }

    return response.json();
  }

  // Auth endpoints
  async signup(email: string, password: string, fullName: string) {
    return this.request("POST", "/auth/signup", {
      email,
      password,
      full_name: fullName,
    });
  }

  async login(email: string, password: string) {
    return this.request<{ access_token: string; token_type: string }>(
      "POST",
      "/auth/login",
      new URLSearchParams({
        username: email,
        password,
      })
    );
  }

  async getCurrentUser() {
    return this.request("GET", "/users/me");
  }

  // Course endpoints
  async listCourses(category?: string) {
    const params = category ? `?category=${category}` : "";
    return this.request("GET", `/courses${params}`);
  }

  async getCourse(courseId: string) {
    return this.request("GET", `/courses/${courseId}`);
  }

  async enrollCourse(courseId: string) {
    return this.request("POST", `/courses/${courseId}/enroll`);
  }

  // Problem endpoints
  async getProblem(problemId: string) {
    return this.request("GET", `/problems/${problemId}`);
  }

  async getCourseProblem(courseId: string) {
    return this.request("GET", `/courses/${courseId}/problems`);
  }

  async submitProblem(
    problemId: string,
    submittedCode?: string,
    submittedAnswer?: string
  ) {
    return this.request("POST", `/problems/${problemId}/submit`, {
      problem_id: problemId,
      submitted_code: submittedCode,
      submitted_answer: submittedAnswer,
    });
  }

  // Progress endpoints
  async getUserProgress() {
    return this.request("GET", "/user/progress");
  }
}

export const apiClient = new ApiClient();
