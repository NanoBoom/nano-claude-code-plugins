# .http File Usage Guide

> Complete reference for writing and executing HTTP requests using .http files - covers syntax, variables, authentication, testing, and advanced features.

## Overview

.http files provide a text-based format for defining and executing HTTP requests. They support variables, authentication, scripting, testing, and advanced protocols like GraphQL and gRPC. This guide consolidates all essential features for practical use.

**Key Capabilities:**

- HTTP/HTTPS requests with full header and body support
- Variable system (basic, magic, environment, request-based)
- Multiple authentication methods (Basic, OAuth 2.0, AWS Signature V4, etc.)
- Pre/post-request scripting (JavaScript and Lua)
- Test assertions and reporting
- GraphQL, gRPC, and WebSocket support
- Request chaining and imports

---

## Quick Start

**Minimal Example:**

```http
GET https://api.example.com/users HTTP/1.1
Accept: application/json
```

**Execute:**

- Position cursor on request line and press `<CR>` or `<leader>Rs`
- Select multiple requests in visual mode and press `<CR>`
- Press `<leader>Ra` to run all requests

**Delimit Multiple Requests:**

```http
GET https://api.example.com/users HTTP/1.1

###

POST https://api.example.com/users HTTP/1.1
Content-Type: application/json

{"name": "John Doe"}
```

---

## Core Syntax

### Request Formats

**Absolute Format:** Full URL with optional HTTP version

```http
GET https://api.example.com:443/users?page=1&limit=10 HTTP/1.1
```

**Origin Format:** Host specified in header

```http
GET /api/users?page=1 HTTP/1.1
Host: api.example.com
```

**Multiline URLs:**

```http
GET http://example.com
 /api
 /users
 ?page=1
 &limit=10
```

**Asterisk Format:**

```http
OPTIONS * HTTP/1.1
Host: api.example.com
```

### HTTP Methods

Supported methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`, `TRACE`, `CONNECT`, `GRAPHQL`, `GRPC`, `WS`

Method is optional (defaults to `GET`).

### Delimiters and Comments

**Request Delimiter:**

```http
###
```

**Named Requests:**

```http
### Get User Profile
GET https://api.example.com/users/123 HTTP/1.1
```

**Comments:**

```http
# This is a comment
// This is also a comment
```

### Headers and Body

**Headers:** One per line, immediately after request line (no blank lines)

```http
POST https://api.example.com/users HTTP/1.1
Content-Type: application/json
Authorization: Bearer {{token}}
Accept: application/json

{"name": "John", "email": "john@example.com"}
```

**Body:** After blank line following headers

---

## Variables System

### Basic Variables

**Declaration:**

```http
@hostname=api.example.com
@port=443
@base_url=https://{{hostname}}:{{port}}
```

**Usage:**

```http
GET {{base_url}}/users HTTP/1.1
```

**Scope:**

- Default: Document scope (available to all requests)
- Can be changed to request scope via configuration

**Prompt Variables:**

```http
# @prompt username
# @secret password

POST https://api.example.com/login HTTP/1.1
Content-Type: application/json

{"username": "{{username}}", "password": "{{password}}"}
```

### Magic Variables

Built-in dynamic variables:

| Variable         | Description         | Example Output                         |
| :--------------- | :------------------ | :------------------------------------- |
| `{{$uuid}}`      | UUID v4             | `550e8400-e29b-41d4-a716-446655440000` |
| `{{$timestamp}}` | Unix timestamp (ms) | `1609459200000`                        |
| `{{$date}}`      | Current date        | `2024-01-15`                           |
| `{{$randomInt}}` | Random integer      | `7234891` (0-9999999)                  |

**Example:**

```http
POST https://api.example.com/events HTTP/1.1
Content-Type: application/json

{
  "id": "{{$uuid}}",
  "timestamp": {{$timestamp}},
  "value": {{$randomInt}}
}
```

### Environment Variables

**http-client.env.json Format:**

```json
{
  "$schema": "https://raw.githubusercontent.com/mistweaverco/kulala.nvim/main/schemas/http-client.env.schema.json",
  "$shared": {
    "$default_headers": {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  },
  "dev": {
    "API_URL": "https://dev-api.example.com",
    "API_KEY": ""
  },
  "prod": {
    "API_URL": "https://api.example.com",
    "API_KEY": ""
  }
}
```

**http-client.private.env.json (for secrets):**

```json
{
  "$schema": "https://raw.githubusercontent.com/mistweaverco/kulala.nvim/main/schemas/http-client.private.env.schema.json",
  "dev": {
    "API_KEY": "dev_secret_key_123"
  },
  "prod": {
    "API_KEY": "prod_secret_key_456"
  }
}
```

**Usage in Requests:**

```http
GET {{API_URL}}/users HTTP/1.1
Authorization: Bearer {{API_KEY}}
```

**Switch Environment:** Use `<leader>Re` or `:lua require('kulala').set_selected_env('prod')`

**Resolution Order:**

1. System environment variables
2. http-client.env.json
3. .env file (legacy, not recommended)

**Legacy .env Format:**

```env
API_URL=https://api.example.com
API_KEY=your-api-key
```

### Request Variables

Reference data from other requests:

**Syntax:** `{{REQUEST_NAME.response|request.body|headers.*}}`

**JSONPath for Body:**

```http
### Login
POST https://api.example.com/auth/login HTTP/1.1
Content-Type: application/json

{"username": "user", "password": "pass"}

###

### Get Profile
GET https://api.example.com/profile HTTP/1.1
Authorization: Bearer {{Login.response.body.$.access_token}}
```

**Header Access:**

```http
### Request_One
GET https://api.example.com/data HTTP/1.1

###

POST https://api.example.com/track HTTP/1.1
Content-Type: application/json

{
  "request_date": "{{Request_One.response.headers.Date}}"
}
```

**Cookie Access:**

```http
### Get_Session
GET https://api.example.com/login HTTP/1.1

###

GET https://api.example.com/dashboard HTTP/1.1
Cookie: session={{Get_Session.response.cookies.sessionId.value}}
```

**Multiple Header Values:**

```http
{{REQUEST_NAME.response.headers.HeaderName[0]}}
{{REQUEST_NAME.response.headers.HeaderName[1]}}
```

### Dynamic Variables

**Set from Response JSON:**

```http
POST https://api.example.com/auth HTTP/1.1
Content-Type: application/json

{"username": "user"}

# @env-json-key token = $.access_token
```

**Set from Response Headers:**

```http
GET https://api.example.com/resource HTTP/1.1

# @env-header-key etag = ETag
```

**Set from External Command:**

```http
GET https://api.example.com/data HTTP/1.1

# @env-stdin-cmd MY_VAR = echo "value"
# @env-stdin-cmd-pre TIMESTAMP = date +%s
```

---

## Authentication

### Basic Authentication

```http
GET https://api.example.com/resource HTTP/1.1
Authorization: Basic {{username}}:{{password}}
```

Auto-encodes to Base64. You can also provide pre-encoded value:

```http
Authorization: Basic TXlVc2VyOlByaXZhdGU=
```

### Digest Authentication

```http
GET https://api.example.com/resource HTTP/1.1
Authorization: Digest {{username}}:{{password}}
```

Or with space separator:

```http
Authorization: Digest {{username}} {{password}}
```

### Bearer Token

```http
GET https://api.example.com/resource HTTP/1.1
Authorization: Bearer {{token}}
```

**Workflow with Login:**

```http
### Login
POST https://api.example.com/oauth/token HTTP/1.1
Content-Type: application/x-www-form-urlencoded

client_id={{client_id}}&client_secret={{client_secret}}&grant_type=client_credentials

###

### Get Resource
GET https://api.example.com/resource HTTP/1.1
Authorization: Bearer {{Login.response.body.$.access_token}}
```

### OAuth 2.0

**Configuration in http-client.env.json:**

```json
{
  "dev": {
    "Security": {
      "Auth": {
        "my-oauth": {
          "Type": "OAuth2",
          "Grant Type": "Authorization Code",
          "Client ID": "your-client-id",
          "Auth URL": "https://auth.example.com/authorize",
          "Token URL": "https://auth.example.com/token",
          "Redirect URL": "http://localhost:1234",
          "Scope": "read write"
        }
      }
    }
  }
}
```

**Usage:**

```http
GET https://api.example.com/resource HTTP/1.1
Authorization: Bearer {{$auth.token("my-oauth")}}
```

**Manage Authentication:** `<leader>Ru` opens Authentication Manager

**Supported Grant Types:**

- Authorization Code
- Client Credentials
- Device Authorization
- Implicit
- Password

### NTLM / Negotiate

```http
GET https://api.example.com/resource HTTP/1.1
Authorization: NTLM {{username}}:{{password}}
```

Without credentials (uses current user):

```http
Authorization: NTLM
```

**Negotiate (SPNEGO):**

```http
Authorization: Negotiate
```

### AWS Signature V4

```http
GET https://s3.amazonaws.com/bucket/object HTTP/1.1
Authorization: AWS <access-key-id> <secret-access-key> token:<session-token> region:<region> service:<service>
```

### SSL Client Certificates

Configure in plugin options (per-host basis):

```lua
{
  certificates = {
    ["api.example.com"] = {
      cert = "/path/to/cert.crt",
      key = "/path/to/key.key"
    }
  }
}
```

### Browser-Based Authentication Example

```http
### Acquire_XSRF_TOKEN
GET localhost:8000/login

> {%
  client.global.token = response.cookies["XSRF-TOKEN"].value
  client.global.decoded_token = vim.uri_decode(client.global.token)
  client.global.session = response.cookies["laravel_session"].value
%}

### Authenticate
POST localhost:8000/login
Content-Type: application/json
X-Xsrf-Token: {{decoded_token}}
Cookie: XSRF-TOKEN={{token}}
Cookie: laravel_session={{session}}

{"email": "user@example.com", "password": "secret"}

> {%
  client.global.session = response.cookies["laravel_session"].value
%}

### Dashboard
run #Acquire_XSRF_TOKEN
run #Authenticate

GET http://localhost:8000/dashboard
Cookie: laravel_session={{session}}
```

---

## Request Body and Data Handling

### JSON Body

```http
POST https://api.example.com/users HTTP/1.1
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
```

### Form Data

**URL-Encoded:**

```http
POST https://api.example.com/form HTTP/1.1
Content-Type: application/x-www-form-urlencoded

name={{name}}&age={{age}}&city=New York
```

**Multipart Form Data:**

```http
@filename=logo.png
@filepath=/path/to/logo.png

POST https://api.example.com/upload HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary{{$timestamp}}

------WebKitFormBoundary{{$timestamp}}
Content-Disposition: form-data; name="file"; filename="{{filename}}"
Content-Type: image/png

< {{filepath}}

------WebKitFormBoundary{{$timestamp}}
Content-Disposition: form-data; name="description"

Logo for application
------WebKitFormBoundary{{$timestamp}}--
```

### File Operations

**Include File Content in Request:**

```http
POST https://api.example.com/data HTTP/1.1
Content-Type: application/json

< /path/to/data.json
```

**Save Response to File:**

```http
GET https://api.example.com/report HTTP/1.1

>> /path/to/output.json
```

**Overwrite Existing File:**

```http
GET https://api.example.com/report HTTP/1.1

>>! /path/to/output.json
```

---

## Advanced Protocols

### GraphQL

**With Variables:**

```http
GRAPHQL https://graphql.example.com/api HTTP/1.1
Content-Type: application/json

query GetUser($id: ID!) {
  user(id: $id) {
    name
    email
    posts {
      title
    }
  }
}

{ "id": "123" }
```

**Without Variables:**

```http
GRAPHQL https://graphql.example.com/api HTTP/1.1

query {
  users {
    id
    name
    email
  }
}
```

**Download Schema:** `<leader>Rg` (cursor must be within GraphQL request section)

### gRPC

**Prerequisites:** Install [grpcurl](https://github.com/fullstorydev/grpcurl)

**Basic Request:**

```http
### Shared
# @grpc-import-path ./protos
# @grpc-proto service.proto

###

GRPC localhost:50051 myservice.MyService/MyMethod
Content-Type: application/json

{
  "field1": "value1",
  "field2": 123
}
```

**Common Directives:**

- `# @grpc-import-path <path>` - Proto file directory
- `# @grpc-proto <file>` - Proto file name
- `# @grpc-plaintext` - Use plaintext (no TLS)
- `# @grpc-protoset <file>` - Use compiled protoset
- `# @grpc-v` - Verbose output

**Commands:**

```http
# List services
GRPC localhost:50051 list

# Describe service
GRPC localhost:50051 describe myservice.MyService
```

### WebSockets

**Prerequisites:** Install [websocat](https://github.com/vi/websocat)

**Establish Connection:**

```http
WS wss://echo.websocket.org

{"action": "subscribe", "channel": "updates"}
```

**Usage:**

- Received messages display with `=>` prefix
- Send messages by typing and pressing `<CR>`
- Close connection with `<C-c>`

---

## Scripts and Testing

### Pre/Post-Request Scripts

**Inline Lua Script:**

```http
### Create User
POST https://api.example.com/users HTTP/1.1
Content-Type: application/json

< {%
  -- Pre-request script (Lua)
  local json = require("kulala.utils.json")
  local body = json.parse(request.body)
  body.timestamp = os.time()
  request.body_raw = json.encode(body)
%}

{"name": "John", "email": "john@example.com"}

> {%
  -- Post-request script (Lua)
  client.global.user_id = response.body.json.id
  client.log("User created with ID: " .. client.global.user_id)
%}
```

**Inline JavaScript:**

```http
> {%
  // Post-request script (JavaScript)
  const userId = response.body.json.id;
  client.global.set("userId", userId);
  console.log("User ID:", userId);
%}
```

**External Script Files:**

```http
< /path/to/pre-request.lua

POST https://api.example.com/data HTTP/1.1

> /path/to/post-request.js
```

**Script API Objects:**

- `client` - Client operations (log, test, assert, global vars)
- `request` - Current request data (url, headers, body)
- `response` - Response data (status, headers, body, cookies)

### Testing and Assertions

**Test Structure:**

```http
POST https://api.example.com/users HTTP/1.1
Content-Type: application/json

{"name": "John Doe", "age": 30}

> {%
  const json = response.body.json;

  client.test("User Creation Tests", function() {
    assert(response.status === 201, "Status should be 201");
    assert.same(json.name, "John Doe", "Name should match");
    assert.true(json.id > 0, "ID should be positive");
    assert.responseHas("status", 201);
    assert.jsonHas("name", "John Doe");
  });

  client.test("Response Headers", function() {
    assert.headersHas("Content-Type", "application/json");
    assert.bodyHas("John Doe");
  });
%}
```

**Assert Functions:**

| Function                                      | Description                     |
| :-------------------------------------------- | :------------------------------ |
| `assert(value, message?)`                     | Checks if value is truthy       |
| `assert.true(value, message?)`                | Checks if value is true         |
| `assert.false(value, message?)`               | Checks if value is false        |
| `assert.same(value, expected, message?)`      | Checks equality                 |
| `assert.hasString(value, expected, message?)` | Checks substring                |
| `assert.responseHas(key, expected, message?)` | Checks response field           |
| `assert.headersHas(key, expected, message?)`  | Checks header                   |
| `assert.bodyHas(expected, message?)`          | Checks body content             |
| `assert.jsonHas(key, expected, message?)`     | Checks JSON path (dot notation) |

**View Reports:** Switch to Report view with `R` in Kulala UI

---

## Advanced Features

### Shared Blocks

**Shared (run once before all):**

```http
### Shared

@base_url=https://api.example.com
@api_key=secret123

# @curl-connect-timeout 20

run ./login.http

< {%
  console.log("Global pre-request setup");
%}

POST https://api.example.com/init HTTP/1.1

> {%
  console.log("Global post-request cleanup");
%}

###

### Request 1
GET {{base_url}}/users HTTP/1.1
Authorization: Bearer {{api_key}}
```

**Shared each (run before each request):**

```http
### Shared each

@timestamp={{$timestamp}}

< {%
  console.log("Before each request");
%}
```

### Import and Run

**Run All Requests from File:**

```http
run ./auth-requests.http

POST https://api.example.com/data HTTP/1.1
```

**Import and Run Specific Requests:**

```http
import ./common-requests.http

run #Login
run #Get Token

GET https://api.example.com/profile HTTP/1.1
Authorization: Bearer {{token}}
```

**Override Variables:**

```http
import ./requests.http

run #Get User (@userId=123, @include=details)
```

**Run Request with Metadata Application:**

```http
### Main Request
GET https://api.example.com/data HTTP/1.1

###

### Filtered Output
run #Main Request

# @jq .items[] | {id, name}
```

### Directives

**Request Control:**

- `# @delay <milliseconds>` - Delay before sending
- `# @accept chunked` - Accept streaming responses

**Response Processing:**

- `# @jq <filter>` - Filter response with jq (e.g., `# @jq .data[] | {id, name}`)

**Curl Options:**

- `# @curl-<flag>` - Pass flags to curl (e.g., `# @curl-insecure`, `# @curl-connect-timeout 30`)

**External Commands:**

- `# @stdin-cmd-pre <command>` - Execute before request
- `# @stdin-cmd <command>` - Execute and use output

**Metadata:**

- `# @meta-<name> <value>` - Arbitrary metadata
- `# @prompt <variable>` - Prompt for input
- `# @secret <variable>` - Prompt for secret input (hidden)

### Cookies

**Set Cookies:**

```http
GET https://api.example.com/resource HTTP/1.1
Cookie: session_id=abc123
Cookie: preferences=dark_mode
```

**Auto-Attach from Cookie Jar:**

```http
# @attach-cookie-jar
GET https://api.example.com/profile HTTP/1.1
```

**Prevent Cookie Storage:**

```http
# @no-cookie-jar
GET https://api.example.com/public HTTP/1.1
```

**Access Cookie Jar:** `<leader>Rj` to open cookie.txt file

---

## Practical Recipes

### File Upload

```http
@filename=document.pdf
@filepath=/path/to/document.pdf

POST https://api.example.com/upload HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary{{$timestamp}}

------WebKitFormBoundary{{$timestamp}}
Content-Disposition: form-data; name="file"; filename="{{filename}}"
Content-Type: application/pdf

< {{filepath}}

------WebKitFormBoundary{{$timestamp}}
Content-Disposition: form-data; name="description"

Important document
------WebKitFormBoundary{{$timestamp}}--
```

### Iterating Over Results

```http
### Get Users
GET https://api.example.com/users HTTP/1.1

###

### Process Each User
< {%
  local response = client.responses["Get Users"].json
  if not response then return end

  local user = response.users[request.iteration()]
  if not user then return request.skip() end

  request.url_raw = request.environment.api_url .. "/users/" .. user.id
%}

@api_url=https://api.example.com
GET {{api_url}}/users/placeholder

> {%
  request.replay()
%}
```

### Update Environment Variables from Script

```http
POST https://api.example.com/config HTTP/1.1

> {%
  const fs = require("kulala.utils.fs");
  const vars = fs.read_json("http-client.env.json");

  vars.dev.api_version = response.body.json.version;
  fs.write_json("http-client.env.json", vars, true);
%}
```

### Modify Request Body in Script

```http
### Dynamic Body
< {%
  local json = require("kulala.utils.json")
  local body = json.parse(request.body)

  body.timestamp = os.time()
  body.nonce = math.random(1000000)
  request.body_raw = json.encode(body)
%}

POST https://api.example.com/data HTTP/1.1
Content-Type: application/json

{"action": "create", "data": "original"}
```

---

## Quick Reference

### Variable Syntax

| Type            | Syntax                                | Example                               |
| :-------------- | :------------------------------------ | :------------------------------------ |
| Basic           | `@var=value`                          | `@host=api.example.com`               |
| Usage           | `{{var}}`                             | `GET {{host}}/users`                  |
| Magic UUID      | `{{$uuid}}`                           | `"id": "{{$uuid}}"`                   |
| Magic Timestamp | `{{$timestamp}}`                      | `"ts": {{$timestamp}}`                |
| Magic Date      | `{{$date}}`                           | `"date": "{{$date}}"`                 |
| Magic Random    | `{{$randomInt}}`                      | `"code": {{$randomInt}}`              |
| Environment     | `{{VAR}}`                             | `{{API_KEY}}`                         |
| Request Body    | `{{REQ.response.body.$.path}}`        | `{{Login.response.body.$.token}}`     |
| Request Header  | `{{REQ.response.headers.Name}}`       | `{{Req.response.headers.ETag}}`       |
| Request Cookie  | `{{REQ.response.cookies.name.value}}` | `{{Auth.response.cookies.sid.value}}` |
| OAuth Token     | `{{$auth.token("config")}}`           | `{{$auth.token("my-oauth")}}`         |

### Directive Summary

| Directive              | Purpose              | Example                                  |
| :--------------------- | :------------------- | :--------------------------------------- |
| `# @delay <ms>`        | Delay before request | `# @delay 1000`                          |
| `# @jq <filter>`       | Filter response      | `# @jq .data[]`                          |
| `# @curl-<flag>`       | Curl option          | `# @curl-insecure`                       |
| `# @grpc-<flag>`       | gRPC option          | `# @grpc-plaintext`                      |
| `# @accept chunked`    | Accept streaming     | `# @accept chunked`                      |
| `# @env-json-key`      | Set var from JSON    | `# @env-json-key token = $.access_token` |
| `# @env-header-key`    | Set var from header  | `# @env-header-key etag = ETag`          |
| `# @prompt <var>`      | Prompt for input     | `# @prompt username`                     |
| `# @secret <var>`      | Prompt for secret    | `# @secret password`                     |
| `# @attach-cookie-jar` | Attach cookies       | `# @attach-cookie-jar`                   |
| `# @no-cookie-jar`     | Skip cookie storage  | `# @no-cookie-jar`                       |

### Authentication Types

| Type       | Header Format                                                                       |
| :--------- | :---------------------------------------------------------------------------------- |
| Basic      | `Authorization: Basic {{user}}:{{pass}}`                                            |
| Digest     | `Authorization: Digest {{user}}:{{pass}}`                                           |
| Bearer     | `Authorization: Bearer {{token}}`                                                   |
| OAuth 2.0  | `Authorization: Bearer {{$auth.token("config")}}`                                   |
| NTLM       | `Authorization: NTLM {{user}}:{{pass}}`                                             |
| Negotiate  | `Authorization: Negotiate`                                                          |
| AWS Sig V4 | `Authorization: AWS <key> <secret> token:<token> region:<region> service:<service>` |

### Script API

| Object     | Purpose           | Common Properties/Methods                                           |
| :--------- | :---------------- | :------------------------------------------------------------------ |
| `client`   | Client operations | `.log()`, `.test()`, `.assert.*()`, `.global.*`                     |
| `request`  | Current request   | `.url`, `.headers`, `.body`, `.iteration()`, `.skip()`, `.replay()` |
| `response` | Response data     | `.status`, `.headers`, `.body`, `.cookies`, `.body.json`            |

---

## See Also

- Environment file schemas: <https://raw.githubusercontent.com/mistweaverco/kulala.nvim/main/schemas/>
- gRPCurl: <https://github.com/fullstorydev/grpcurl>
- websocat: <https://github.com/vi/websocat>
- jq manual: <https://jqlang.github.io/jq/manual/>
