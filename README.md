# API Documentation

## Authentication API Endpoints

This project uses JSON Web Tokens (JWT) for authentication. Below are the API endpoints provided for obtaining and refreshing JWT tokens.

### 1. Login
**Endpoint**: `auth/login/`  
**Method**: `POST`  
**Description**: This endpoint allows users to obtain an access token and a refresh token by providing their credentials (email field can accept (email/username) and password).

**Request**:
```json
POST auth/login/
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "userpassword"
}
```
**Response**:
```json
{
    "access": "access_token",
    "refresh": "refresh_token"
}
```
**Errors**:
<p><b>401 Unauthorized: </b>No active account found with the given credentials.</p>

### 2. Refresh Token


**Endpoint**: `/auth/token/refresh/`  
**Method**: `POST`  
**Description**: This endpoint allows users to obtain a new access token by providing a valid refresh token, This is useful to maintain an active session without requiring the user to re-login.

**Request**:
```json
POST /auth/token/refresh/
Content-Type: application/json

{
    "refresh": "refresh_token"
}
```
**Response**:
```json
{
    "access": "new_access_token"
}
```
**Errors**:
<p><b>401 Unauthorized: </b>Token is invalid or expired.</p>
  


