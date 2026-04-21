# Experiment 2.2: Authentication & Security SPA
# AVAILABLE AT: https://coderjangra.github.io/FS-Exp-5/

## Aim
To implement authentication and security utilizing concepts derived from Spring Security, specifically focusing on JSON Web Tokens (JWT), Role-Based Access Control (RBAC), and OAuth2 integration.

## Objective
1. **JWT-based Authentication**: Implement a secure login portal that processes credentials and stores decoded JWT payloads to manage user sessions.
2. **RBAC with @PreAuthorize**: Create Role-Based Access Control protecting specific client routes and simulating 403 Forbidden scenarios when an unauthorized user accesses an Admin-only resource.
3. **Google OAuth2 Login**: Provide an alternate sign-in flow simulating the OAuth2 redirect and token-acquisition lifecycle.

## Implementation Details
- **Tech Stack**: React, Vite, Material UI (`@mui/material`), `jwt-decode`.
- **UI Design**: Features a highly interactive, modern, and simplistic dark-mode glassmorphism theme using pure OLED blacks and sleek, sharp aesthetics.
- **Mock API (`api.js`)**: All "backend" logic is contained within a mock API layer. It creates base64 encoded JWTs that mimic real Spring Security tokens containing `sub`, `name`, and `roles` claims. It strictly validates these tokens before returning data to the Dashboard and Admin Panel components.
