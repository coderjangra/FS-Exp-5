/**
 * Mock API Service simulating Spring Security JWT & OAuth2 Operations
 * Exp 2.2: JWT Auth, OAuth2 Login, and RBAC (@PreAuthorize)
 */

// Simulated Database of users
const users = [
  { username: 'admin', password: 'password', role: 'ROLE_ADMIN', name: 'Super Admin' },
  { username: 'user', password: 'password', role: 'ROLE_USER', name: 'Standard User' }
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Create a fake base64 JWT token containing role claims
const createMockJwt = (user) => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({
    sub: user.username,
    name: user.name,
    roles: [user.role], // Spring Security maps this to GrantedAuthority
    exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour exp
  }));
  const signature = btoa("mock_spring_security_signature_2.2");
  return `${header}.${payload}.${signature}`;
};

// Simulated POST /api/auth/login endpoint
export const authenticate = async (username, password) => {
  await delay(800); // simulate bcrypt hashing and db lookup
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    // Simulating Spring Security BadCredentialsException (401 Unauthorized)
    throw { response: { status: 401, data: { message: "BadCredentialsException: Invalid username or password" } } };
  }

  const token = createMockJwt(user);
  return { status: 200, data: { token, type: "Bearer" } };
};

// Simulated OAuth2 Google Authentication Redirect
export const oauth2Login = async () => {
  await delay(1200); // Simulate redirecting to Google, approving consent, and returning
  // In a real Spring Boot OAuth2Client setup, the server issues a JWT after successful OAuth callback
  const googleUser = { username: 'google_user@gmail.com', role: 'ROLE_USER', name: 'Google User' };
  const token = createMockJwt(googleUser);
  return { status: 200, data: { token, type: "Bearer" } };
};

// Simulated Protected Endpoint: @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
export const fetchDashboardData = async (token) => {
  await delay(500);
  if (!token) throw { response: { status: 401, data: { message: "AuthenticationException: Full authentication is required to access this resource" } } };
  
  return {
    status: 200,
    data: {
      welcomeMessage: "Welcome to the Secure Zone!",
      jwtFilterStatus: "Passed OncePerRequestFilter",
      securityContext: "Authenticated via UsernamePasswordAuthenticationToken",
      recentLogins: [
        { id: 1, ip: '192.168.1.5', time: new Date().toISOString() },
        { id: 2, ip: '10.0.0.44', time: new Date(Date.now() - 3600000).toISOString() }
      ]
    }
  };
};

// Simulated Admin Endpoint: @PreAuthorize("hasRole('ADMIN')")
export const fetchAdminData = async (token) => {
  await delay(600);
  if (!token) throw { response: { status: 401, data: { message: "Unauthorized" } } };
  
  try {
    // Decode mock JWT payload (the middle part of the token)
    const payloadStr = atob(token.split('.')[1]);
    const payload = JSON.parse(payloadStr);
    
    // Simulate Spring Security Method Security check
    if (!payload.roles.includes('ROLE_ADMIN')) {
      throw { response: { status: 403, data: { message: "AccessDeniedException: You do not have the required ROLE_ADMIN to view this resource." } } };
    }

    return {
      status: 200,
      data: {
        adminSecret: "Spring Security: Confirmed ROLE_ADMIN authority.",
        systemLogs: [
          "INFO: SecurityFilterChain configured.",
          "WARN: Detected failed login attempt from IP 10.4.5.22",
          "INFO: JWT Signing Key rotated successfully."
        ]
      }
    };
  } catch (e) {
    if (e.response && e.response.status === 403) throw e;
    throw { response: { status: 401, data: { message: "Invalid Token format" } } };
  }
};
