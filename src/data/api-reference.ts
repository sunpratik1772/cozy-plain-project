export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiEndpoint {
  id: string;
  title: string;
  method: HttpMethod;
  href: string;
  path: string;
  description: string;
  longDescription?: string;
  headers?: { key: string; value: string; required: boolean }[];
  requestBody?: { field: string; type: string; required: boolean; description: string }[];
  responseBody?: { field: string; type: string; description: string }[];
  exampleRequest?: string;
  exampleResponse?: string;
}

export interface ApiGroup {
  id: string;
  title: string;
  endpoints: ApiEndpoint[];
}

export const apiGroups: ApiGroup[] = [
  {
    id: "authentication",
    title: "Authentication",
    endpoints: [
      {
        id: "refresh-token",
        title: "Refresh token",
        method: "POST",
        href: "/api/refresh-token",
        path: "/v1/auth/refresh",
        description: "Exchange a refresh token for a new access token without re-authenticating.",
        longDescription: "The Refresh Token endpoint allows you to exchange a valid refresh token for a new access token. Access tokens typically have a short lifespan, while refresh tokens remain valid longer, enabling continuous authentication without requiring the user to log in again.",
        headers: [
          { key: "Content-Type", value: "application/json", required: true },
          { key: "Authorization", value: "Bearer {refresh_token}", required: true },
        ],
        requestBody: [
          { field: "refresh_token", type: "string", required: true, description: "The refresh token obtained during login." },
        ],
        responseBody: [
          { field: "access_token", type: "string", description: "The new access token." },
          { field: "expires_in", type: "number", description: "Token expiration time in seconds." },
          { field: "token_type", type: "string", description: "Type of token (Bearer)." },
        ],
        exampleRequest: `{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}`,
        exampleResponse: `{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600,
  "token_type": "Bearer"
}`,
      },
      {
        id: "invalidate-session",
        title: "Invalidate session",
        method: "DELETE",
        href: "/api/invalidate-session",
        path: "/v1/auth/session",
        description: "Invalidate the current session and revoke all tokens.",
        longDescription: "This endpoint invalidates the current user session and revokes all associated tokens. Use this when a user logs out or when you need to force a re-authentication.",
        headers: [
          { key: "Authorization", value: "Bearer {access_token}", required: true },
        ],
        responseBody: [
          { field: "success", type: "boolean", description: "Indicates if the session was invalidated." },
          { field: "message", type: "string", description: "Confirmation message." },
        ],
        exampleResponse: `{
  "success": true,
  "message": "Session invalidated successfully"
}`,
      },
      {
        id: "authenticate-user",
        title: "Authenticate user",
        method: "POST",
        href: "/api/authenticate-user",
        path: "/v1/auth/login",
        description: "Authenticate a user with email and password.",
        longDescription: "Authenticate a user using their email and password credentials. Returns access and refresh tokens upon successful authentication.",
        headers: [
          { key: "Content-Type", value: "application/json", required: true },
        ],
        requestBody: [
          { field: "email", type: "string", required: true, description: "User's email address." },
          { field: "password", type: "string", required: true, description: "User's password." },
        ],
        responseBody: [
          { field: "access_token", type: "string", description: "JWT access token." },
          { field: "refresh_token", type: "string", description: "JWT refresh token." },
          { field: "user", type: "object", description: "User profile information." },
        ],
        exampleRequest: `{
  "email": "user@example.com",
  "password": "securepassword123"
}`,
        exampleResponse: `{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "usr_123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}`,
      },
    ],
  },
  {
    id: "users",
    title: "Users",
    endpoints: [
      {
        id: "retrieve-user",
        title: "Retrieve a user",
        method: "GET",
        href: "/api/retrieve-user",
        path: "/v1/users/{user_id}",
        description: "Retrieve details of a specific user by their ID.",
        longDescription: "Fetch complete user profile information including their account details, preferences, and metadata.",
        headers: [
          { key: "Authorization", value: "Bearer {access_token}", required: true },
        ],
        responseBody: [
          { field: "id", type: "string", description: "Unique user identifier." },
          { field: "email", type: "string", description: "User's email address." },
          { field: "name", type: "string", description: "User's display name." },
          { field: "created_at", type: "string", description: "Account creation timestamp." },
        ],
        exampleResponse: `{
  "id": "usr_123",
  "email": "user@example.com",
  "name": "John Doe",
  "created_at": "2024-01-15T10:30:00Z"
}`,
      },
      {
        id: "create-user",
        title: "Create a new user",
        method: "POST",
        href: "/api/create-user",
        path: "/v1/users",
        description: "Create a new user account.",
        longDescription: "Register a new user in the system. This endpoint creates a new user account and returns the user object with their assigned ID.",
        headers: [
          { key: "Content-Type", value: "application/json", required: true },
          { key: "Authorization", value: "Bearer {access_token}", required: true },
        ],
        requestBody: [
          { field: "email", type: "string", required: true, description: "User's email address." },
          { field: "name", type: "string", required: true, description: "User's display name." },
          { field: "password", type: "string", required: true, description: "User's password (min 8 characters)." },
        ],
        responseBody: [
          { field: "id", type: "string", description: "Newly created user's ID." },
          { field: "email", type: "string", description: "User's email address." },
          { field: "name", type: "string", description: "User's display name." },
        ],
        exampleRequest: `{
  "email": "newuser@example.com",
  "name": "Jane Smith",
  "password": "securepassword123"
}`,
        exampleResponse: `{
  "id": "usr_456",
  "email": "newuser@example.com",
  "name": "Jane Smith"
}`,
      },
      {
        id: "update-user",
        title: "Update user details",
        method: "PATCH",
        href: "/api/update-user",
        path: "/v1/users/{user_id}",
        description: "Update an existing user's profile information.",
        longDescription: "Partially update a user's profile. Only the fields provided in the request body will be updated.",
        headers: [
          { key: "Content-Type", value: "application/json", required: true },
          { key: "Authorization", value: "Bearer {access_token}", required: true },
        ],
        requestBody: [
          { field: "name", type: "string", required: false, description: "Updated display name." },
          { field: "email", type: "string", required: false, description: "Updated email address." },
        ],
        responseBody: [
          { field: "id", type: "string", description: "User's ID." },
          { field: "email", type: "string", description: "Updated email address." },
          { field: "name", type: "string", description: "Updated display name." },
        ],
        exampleRequest: `{
  "name": "John Updated"
}`,
        exampleResponse: `{
  "id": "usr_123",
  "email": "user@example.com",
  "name": "John Updated"
}`,
      },
      {
        id: "delete-user",
        title: "Remove a user",
        method: "DELETE",
        href: "/api/delete-user",
        path: "/v1/users/{user_id}",
        description: "Permanently delete a user account.",
        longDescription: "This action permanently removes a user and all associated data. This operation cannot be undone.",
        headers: [
          { key: "Authorization", value: "Bearer {access_token}", required: true },
        ],
        responseBody: [
          { field: "success", type: "boolean", description: "Indicates if deletion was successful." },
          { field: "message", type: "string", description: "Confirmation message." },
        ],
        exampleResponse: `{
  "success": true,
  "message": "User deleted successfully"
}`,
      },
      {
        id: "list-users",
        title: "List all users",
        method: "GET",
        href: "/api/list-users",
        path: "/v1/users",
        description: "Retrieve a paginated list of all users.",
        longDescription: "Fetch a list of all users in the system with pagination support. Use query parameters to filter and sort results.",
        headers: [
          { key: "Authorization", value: "Bearer {access_token}", required: true },
        ],
        responseBody: [
          { field: "data", type: "array", description: "Array of user objects." },
          { field: "total", type: "number", description: "Total number of users." },
          { field: "page", type: "number", description: "Current page number." },
          { field: "per_page", type: "number", description: "Items per page." },
        ],
        exampleResponse: `{
  "data": [
    { "id": "usr_123", "email": "user1@example.com", "name": "John" },
    { "id": "usr_456", "email": "user2@example.com", "name": "Jane" }
  ],
  "total": 42,
  "page": 1,
  "per_page": 10
}`,
      },
    ],
  },
  {
    id: "accounts",
    title: "Accounts",
    endpoints: [
      {
        id: "retrieve-account",
        title: "Retrieve account details",
        method: "GET",
        href: "/api/retrieve-account",
        path: "/v1/accounts/{account_id}",
        description: "Get details of a specific account.",
        longDescription: "Retrieve complete account information including billing details, subscription status, and usage metrics.",
        headers: [
          { key: "Authorization", value: "Bearer {access_token}", required: true },
        ],
        responseBody: [
          { field: "id", type: "string", description: "Account identifier." },
          { field: "name", type: "string", description: "Account name." },
          { field: "plan", type: "string", description: "Current subscription plan." },
          { field: "status", type: "string", description: "Account status (active, suspended, etc.)." },
        ],
        exampleResponse: `{
  "id": "acc_789",
  "name": "Acme Corp",
  "plan": "enterprise",
  "status": "active"
}`,
      },
      {
        id: "create-account",
        title: "Create an account",
        method: "POST",
        href: "/api/create-account",
        path: "/v1/accounts",
        description: "Create a new organization account.",
        longDescription: "Set up a new organization account. This is typically used when onboarding new businesses or teams.",
        headers: [
          { key: "Content-Type", value: "application/json", required: true },
          { key: "Authorization", value: "Bearer {access_token}", required: true },
        ],
        requestBody: [
          { field: "name", type: "string", required: true, description: "Organization name." },
          { field: "plan", type: "string", required: false, description: "Subscription plan (default: starter)." },
        ],
        responseBody: [
          { field: "id", type: "string", description: "New account ID." },
          { field: "name", type: "string", description: "Account name." },
          { field: "plan", type: "string", description: "Selected plan." },
        ],
        exampleRequest: `{
  "name": "Acme Corp",
  "plan": "pro"
}`,
        exampleResponse: `{
  "id": "acc_new123",
  "name": "Acme Corp",
  "plan": "pro"
}`,
      },
      {
        id: "update-account",
        title: "Update account info",
        method: "PATCH",
        href: "/api/update-account",
        path: "/v1/accounts/{account_id}",
        description: "Update account settings and information.",
        longDescription: "Modify account details such as name, billing information, or plan. Only provided fields will be updated.",
        headers: [
          { key: "Content-Type", value: "application/json", required: true },
          { key: "Authorization", value: "Bearer {access_token}", required: true },
        ],
        requestBody: [
          { field: "name", type: "string", required: false, description: "Updated account name." },
          { field: "plan", type: "string", required: false, description: "New subscription plan." },
        ],
        responseBody: [
          { field: "id", type: "string", description: "Account ID." },
          { field: "name", type: "string", description: "Updated name." },
          { field: "plan", type: "string", description: "Current plan." },
        ],
        exampleRequest: `{
  "plan": "enterprise"
}`,
        exampleResponse: `{
  "id": "acc_789",
  "name": "Acme Corp",
  "plan": "enterprise"
}`,
      },
    ],
  },
];

export function getEndpointBySlug(slug: string): ApiEndpoint | undefined {
  for (const group of apiGroups) {
    const endpoint = group.endpoints.find((e) => e.id === slug);
    if (endpoint) return endpoint;
  }
  return undefined;
}

export function getGroupForEndpoint(endpointId: string): ApiGroup | undefined {
  return apiGroups.find((group) =>
    group.endpoints.some((e) => e.id === endpointId)
  );
}

export function generateApiTableOfContents(endpointId: string) {
  const endpoint = getEndpointBySlug(endpointId);
  if (!endpoint) return [];

  const items: { id: string; title: string; level: "h2" | "h3" }[] = [
    { id: "endpoint", title: "Endpoint", level: "h2" },
  ];

  if (endpoint.headers && endpoint.headers.length > 0) {
    items.push({ id: "headers", title: "Headers", level: "h2" });
  }

  if (endpoint.requestBody && endpoint.requestBody.length > 0) {
    items.push({ id: "request-body", title: "Request Body", level: "h2" });
  }

  items.push({ id: "response", title: "Response", level: "h2" });

  if (endpoint.exampleRequest || endpoint.exampleResponse) {
    items.push({ id: "example-usage", title: "Example Usage", level: "h2" });
  }

  return items;
}
