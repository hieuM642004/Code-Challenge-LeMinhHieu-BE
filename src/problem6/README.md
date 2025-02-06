# Problem 6
# Scoreboard API Module

## Overview
This module manages a real-time scoreboard displaying the top 10 users' scores. It provides secure endpoints for updating scores and fetching the leaderboard, with live updates via WebSocket.

## Features
- **Top 10 Scoreboard**: Dynamically updates to show highest scores.
- **Live Updates**: Clients receive real-time scoreboard changes.
- **Secure Score Updates**: JWT authentication and rate limiting to prevent abuse.
- **Atomic Operations**: Ensures accurate score increments under high concurrency.

## API Endpoints

### `POST /update-score`
**Request:**
```json
{
  "increment": integer (required, min=1, max=100)
}
```
**Headers:**
- `Authorization: Bearer <JWT_TOKEN>`

**Responses:**
- `200 OK`: Score updated. 
- `400 Bad Request`: Invalid increment value.
- `401 Unauthorized`: Missing/invalid token.
- `429 Too Many Requests`: Rate limit exceeded.

### `GET /scores`
**Response:**
```json
[
  {"username": "User1", "score": 1500},
  ...
]
```

## Data Models

### Table: `users`
| Column Name   | Data Type   | Description                     |
|---------------|-------------|---------------------------------|
| `user_id`     | UUID        | Unique identifier for the user. |
| `username`    | String      | Username of the user.           |
| `email`       | String      | Email address of the user.      |
| `created_at`  | Timestamp   | Timestamp when the user was created. |

### Table: `scores`
| Column Name   | Data Type   | Description                                   |
|---------------|-------------|-----------------------------------------------|
| `user_id`     | UUID        | Foreign key referencing `users.user_id`.     |
| `score`       | Integer     | Current score of the user (default: 0).      |
| `last_updated`| Timestamp   | Timestamp when the score was last updated.   |

---

## Security
- **JWT Authentication**: Users must include a valid token in the `Authorization` header.
- **Input Validation**: Reject non-integer increments or values outside 1-100.
- **Rate Limiting**: Max 10 requests/minute per user to `/update-score`.

## Live Updates
1. After a score update, an event is published via Redis Pub/Sub.
2. WebSocket server listens for events and broadcasts new top 10 scores to connected clients.

## Setup
1. Install dependencies: `npm install`
2. Configure environment variables (`.env`):
   ```
   DB_URL=postgres://user:pass@host/db
   JWT_SECRET=your_secret_key
   REDIS_URL=redis://localhost:6379
   PORT=3000
   ```
3. Run migrations: `npm run migrate`
4. Start server: `npm start`

## Testing
- **Unit Tests**: `npm test`
- **Integration Tests**: Use Postman collection in `/tests`.

## Improvements
- **Caching**: Cache top 10 scores using Redis to reduce DB load.
- **Enhanced Rate Limiting**: Implement IP-based limits alongside user-based.
- **HTTPS**: Enforce HTTPS in production.
- **Monitoring**: Add logging and alerts for abnormal activity.

---

# Execution Flow Diagram (Mermaid)

```mermaid
sequenceDiagram
    participant User
    participant Client
    participant API_Server
    participant Database
    participant Redis
    participant WebSocket

    User->>Client: Performs action
    Client->>API_Server: POST /update-score (with JWT)
    API_Server->>API_Server: Validate JWT & increment
    API_Server->>Database: Atomic score increment
    Database-->>API_Server: Updated score
    API_Server->>Redis: Publish "score_updated"
    Redis->>WebSocket: Notify subscribers
    WebSocket->>Client: Push new scores via WS
    Client->>User: Update UI
```

# Additional Comments for Improvement
1. **Database Optimization**: Use a Redis sorted set for the leaderboard to enable O(1) complexity on retrievals.
2. **Input Sanitization**: Add stricter validation (e.g., reject non-integer `increment` values).
3. **Idempotency Keys**: Prevent duplicate score updates from retries.
4. **CAPTCHA Integration**: Add CAPTCHA to `/update-score` for unauthenticated endpoints (if applicable).
5. **Load Testing**: Simulate high traffic to identify bottlenecks in concurrent score updates.
