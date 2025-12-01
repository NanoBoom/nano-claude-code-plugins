# Define API Contract Between Backend and Frontend

Feature: $ARGUMENTS

## Task: Create detailed API contract specification for backend/frontend coordination

## Core API Design Philosophy

**These principles guide API contract design. When in doubt, keep it simple.**

### 1. Resource-Oriented Design

Model APIs around resources, not actions.

- Use nouns for endpoints (`/users`, `/orders`), not verbs (`/getUsers`)
- HTTP methods define operations: GET (read), POST (create), PUT (update), DELETE (remove)
- Keep resource hierarchy flat (max 2 levels: `/users/{id}/orders`)

### 2. Contract Stability

Never break existing clients.

- Additive changes only: new fields, new endpoints, new optional parameters
- Existing fields must not change type or meaning
- Version APIs (`/api/v1/`, `/api/v2/`) only when breaking changes are unavoidable

### 3. Consistency

Uniform patterns across all endpoints.

- Naming conventions: camelCase for JSON fields, kebab-case for URLs
- Standardized error response structure across all endpoints
- Consistent pagination, filtering, and sorting patterns

### 4. Minimal Exposure

Return only what clients actually need.

- Don't expose internal implementation details (database IDs vs public IDs)
- Separate Request DTOs (write) from Response DTOs (read)
- Avoid deeply nested objects; flatten when possible

### 5. Idempotency & Safety

Predictable behavior on retries and failures.

- GET: safe, cacheable, no side effects
- PUT/DELETE: idempotent, same result on retry
- POST: document side effects clearly, consider idempotency keys

**Applied to Contract Design:**

- Endpoints: Resource nouns with HTTP verb operations
- Evolution: Add new fields/endpoints, never modify existing
- Structure: Same patterns for pagination, errors, validation everywhere
- Responses: Only fields the frontend actually consumes
- Reliability: Clear idempotency guarantees for each operation

**API Design Reality Checks:**

```
WRONG: "Add this field for potential future use" → Only current requirements
WRONG: "Support every possible query combination" → Start with essential filters
WRONG: "Create flexible polymorphic endpoints" → Simple, specific endpoints
RIGHT: "Does the frontend need this right now?" → This is the decision filter
```

**Contract Red Flags (Remove if found):**

- Endpoints not mapped to current UI features
- DTO fields with no immediate consumer
- Complex nested routes beyond 2 levels
- "Flexible" parameters accepting any structure

## Contract Definition Steps

1. **Define RESTful endpoints**:

   ```yaml
   Base URL: /api/v1/{feature}

   Endpoints:
   - GET /api/v1/{features}
     Query params: page, size, sort, filter
     Response: Page<{Feature}Response>

   - GET /api/v1/{features}/{id}
     Path param: id (Long)
     Response: {Feature}Response

   - POST /api/v1/{features}
     Body: {Feature}Request
     Response: {Feature}Response (201 Created)

   - PUT /api/v1/{features}/{id}
     Path param: id (Long)
     Body: {Feature}Request
     Response: {Feature}Response

   - DELETE /api/v1/{features}/{id}
     Path param: id (Long)
     Response: 204 No Content
   ```

2. **Define request/response DTOs**:

   ```typescript
   // Request DTO (for POST/PUT)
   interface {Feature}Request {
     name: string;        // min: 2, max: 100
     description?: string; // max: 1000
     // Add domain-specific fields
   }

   // Response DTO (for GET)
   interface {Feature}Response {
     id: number;
     name: string;
     description?: string;
     createdAt: string;   // ISO 8601
     updatedAt: string;   // ISO 8601
     // Add computed fields
   }

   // Page response wrapper
   interface Page<T> {
     content: T[];
     totalElements: number;
     totalPages: number;
     size: number;
     number: number;
   }
   ```

3. **Define error responses**:

   ```json
   {
     "timestamp": "2024-01-20T10:30:00Z",
     "status": 400,
     "error": "Bad Request",
     "message": "Validation failed",
     "path": "/api/v1/{features}",
     "errors": [
       {
         "field": "name",
         "message": "Name is required"
       }
     ]
   }
   ```

4. **Define validation rules**:
   - Backend: Bean Validation annotations
   - Frontend: Matching Zod schemas

   ```
   name: required, 2-100 chars
   description: optional, max 1000 chars
   email: valid email format
   date: ISO 8601 format
   ```

5. **Define status codes**:
   - 200: OK (GET, PUT)
   - 201: Created (POST)
   - 204: No Content (DELETE)
   - 400: Bad Request (validation)
   - 404: Not Found
   - 409: Conflict (duplicate)
   - 500: Internal Server Error

6. **Integration requirements**:
   - CORS: Allow frontend origin
   - Content-Type: application/json
   - Authentication: Bearer token (if needed)
   - Pagination: Spring Pageable format
   - Sorting: field,direction (e.g., "name,asc")

7. **Backend implementation notes**:

   ```java
   // Entity fields match response DTO
   // Use MapStruct for DTO mapping
   // Repository method naming conventions
   // Service layer validation
   ```

8. **Frontend implementation notes**:
   ```typescript
   // Zod schemas match validation rules
   // API client with base configuration
   // TanStack Query hooks
   // Error handling utilities
   ```

Save this contract as: `PRPs/contracts/{feature}-api-contract.md`

## Contract Quality Checklist

**Design Principle Compliance (Must Pass First):**

- [ ] Resource-Oriented: Endpoints use nouns, HTTP verbs define operations
- [ ] Contract Stability: No breaking changes to existing fields/endpoints
- [ ] Consistency: Uniform naming, error format, pagination across all endpoints
- [ ] Minimal Exposure: Only fields frontend actually needs, no internal details
- [ ] Idempotency: GET safe, PUT/DELETE idempotent, POST side effects documented

**Contract Completeness:**

- [ ] All current UI features have corresponding endpoints
- [ ] Request/Response DTOs match actual data flow
- [ ] Validation rules cover all required fields
- [ ] Error responses handle all failure scenarios
- [ ] Status codes appropriate for each operation

**Red Flags (Reject if found):**

- [ ] Endpoints with no current consumer
- [ ] DTO fields marked "for future extensibility"
- [ ] Complex nested routes (>2 levels)
- [ ] "Flexible" or "generic" endpoint designs

**Integration Alignment:**

- [ ] Backend team confirms feasibility
- [ ] Frontend team confirms sufficiency
- [ ] Both teams agree on validation rules
- [ ] Error handling patterns established

Share this file between backend and frontend teams for alignment.
