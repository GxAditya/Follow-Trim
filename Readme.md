Step 1: Project Overview 
 
Goal: Build a web-based tool named “FollowTrim” that allows users to filter their Instagram 
and Twitter following lists and unfollow accounts based on various criteria. 
 
Core Features: 
✅ Secure OAuth login with Instagram & Twitter. 
✅ Filter & sort following list by last interaction, mutual status, follow date, and name. 
✅ Batch unfollow functionality with undo option. 
✅ Engagement insights showing user interaction trends. 
 
 
--- 
 
Step 2: Tech Stack Selection 
 
2.1 Frontend (User Interface & Interaction Layer) 
 
Framework: React.js (or Next.js for better SSR & SEO). 
 
Styling: Tailwind CSS (for fast, responsive UI). 
 
State Management: Redux Toolkit (for managing user data efficiently). 
 
API Handling: Axios (for API calls to backend). 
 
 
2.2 Backend (API & Logic Layer) 
 
Framework: Node.js with Express.js (lightweight & scalable). 
 
Authentication: OAuth 2.0 via Instagram Graph API & Twitter API. 
 
Data Fetching: Axios (for calling Instagram/Twitter APIs). 
 
Rate Limiting: Express Rate Limit middleware (to comply with API limits). 
 
Caching: Redis (for temporarily storing follow lists & interaction history). 
 
 
2.3 Database (Storage & Retrieval) 
 
Database Type: PostgreSQL (relational DB for structured data). 
 
ORM: Prisma ORM (for managing database queries). 
 
Data Model: Store user follow metadata (username, follow date, last interaction). 
 
 
2.4 API Integration (Social Media Data Handling) 
 
Instagram Graph API: Fetches user following list & last interaction data. 
 
Twitter API v2: Retrieves user following list & engagement history. 
 
OAuth 2.0 Authentication: Secure login & permission handling. 
 
 
 
--- 
 
Step 3: Development Guide 
 
3.1 Authentication & User Login 
 
🔹 Implement OAuth 2.0 login with Instagram & Twitter. 
🔹 Request minimum required permissions (only follow list & interaction data). 
🔹 Store OAuth tokens securely (encrypted in memory or database). 
 
Backend Implementation (Node.js & Express.js) 
 
1. Set up OAuth 2.0 flow for Instagram & Twitter. 
 
 
2. Handle access token retrieval & refresh. 
 
 
3. Store user session securely with JWT or session-based auth. 
 
 
 
Frontend Implementation (React.js & Redux) 
 
1. Provide Login with Instagram/Twitter buttons. 
 
 
2. Redirect user to OAuth flow & handle callback. 
 
 
3. Store session token in Redux or local state. 
 
 
 
 
--- 
 
3.2 Fetching Following List & Engagement Data 
 
🔹 Call Instagram Graph API & Twitter API v2 to retrieve following data. 
🔹 Fetch last interaction date from API response. 
🔹 Store only metadata (username, mutual status, follow date, interaction history). 
 
Backend Implementation 
 
1. Define API routes: /api/followers, /api/following, /api/interactions. 
 
 
2. Use Axios or Fetch API to call Instagram/Twitter APIs. 
 
 
3. Parse API response & send cleaned data to frontend. 
 
 
 
Frontend Implementation 
 
1. Display following list in a table/grid format. 
 
 
2. Implement loading states & API error handling. 
 
 
 
 
--- 
 
3.3 Implementing Filtering & Sorting 
 
🔹 Sort users by last interaction, follow date, or name. 
🔹 Apply mutual filters (mutuals vs. non-mutuals). 
🔹 Provide search functionality for username filtering. 
 
Frontend Implementation 
 
1. Use React state to manage sorting & filtering. 
 
 
2. Implement filter UI (dropdowns, checkboxes, search bar). 
 
 
3. Apply Debounce for efficient search filtering. 
 
 
 
Backend Implementation 
 
1. Allow query parameters in API: 
 
/api/following?sort=interaction 
 
/api/following?mutuals=true 
 
 
 
2. Use PostgreSQL indexes for efficient sorting. 
 
 
 
 
--- 
 
3.4 Batch Unfollow System 
 
🔹 Allow users to select multiple accounts for unfollowing. 
🔹 Ensure compliance with API rate limits (throttle requests). 
🔹 Implement an undo feature (short grace period before action is final). 
 
Frontend Implementation 
 
1. Add checkboxes next to usernames. 
 
 
2. Enable batch selection & action buttons. 
 
 
3. Show confirmation prompt before unfollowing. 
 
 
4. Implement Undo feature (temporary queue before action). 
 
 
 
Backend Implementation 
 
1. Define POST /api/unfollow route. 
 
 
2. Process unfollow requests one by one (to avoid API limits). 
 
 
3. Store undo data in Redis with expiration time. 
 
 
 
 
--- 
 
3.5 Analytics & Engagement Tracking 
 
🔹 Calculate Engagement Score based on likes/comments received. 
🔹 Display Following Trends over time. 
 
Frontend Implementation 
 
1. Show graphs & insights using Chart.js or Recharts. 
 
 
2. Highlight inactive accounts visually. 
 
 
 
Backend Implementation 
 
1. Compute Engagement Score dynamically. 
 
 
2. Store historical following trends for analytics. 
 
 
 
 
--- 
 
3.6 Privacy & Security 
 
🔹 Implement OAuth-based authentication (no password storage). 
🔹 Use HTTPS & secure OAuth flows. 
🔹 Implement rate limiting & API compliance to prevent bans. 
 
Security Best Practices 
 
✅ Encrypt OAuth tokens (do not store them as plaintext). 
✅ Validate API responses to prevent injections. 
✅ Restrict API usage per user to prevent abuse. 
 
 
--- 
 
Step 4: Testing Guide 
 
4.1 Unit Testing (Jest, React Testing Library, Mocha) 
 
✅ Frontend Tests: Validate filtering, sorting, UI interactions. 
✅ Backend Tests: API response validation, OAuth security tests. 
 
4.2 API Testing (Postman, Insomnia) 
 
✅ Test OAuth authentication flow. 
✅ Verify API rate limiting & error handling. 
 
4.3 UI Testing (Cypress, Selenium) 
 
✅ Automate login & unfollow workflows. 
✅ Validate batch unfollow & undo feature. 
 
 
--- 
 
Final Instructions for AI Code Generator 
 
Use this structured plan to generate the full web application. 
 
Ensure API rate compliance & security best practices. 
 
Optimize API requests for smooth data fetching.