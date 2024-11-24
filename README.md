# Blog API

A RESTful API for a blog management system built with Node.js, Express, and MongoDB.

## Features

- **User Management**

  - Authentication using JWT
  - User registration and login
  - Role-based authorization (Admin/User)

- **Blog Management**

  - Create, read, update, and delete blog posts
  - Tag support for blog posts
  - Pagination and filtering capabilities
  - Draft/Published status

- **Comment System**

  - Add comments to blog posts
  - Fetch comments for specific blog posts
  - Pagination for comments

- **Security**

  - JWT authentication
  - Request data validation
  - Security headers (using Helmet)
  - Rate limiting for auth endpoints
  - MongoDB data sanitization
  - Cross-Origin Resource Sharing (CORS)

- **Error Handling**
  - Global error handling
  - Request validation
  - API error responses
  - Not found error handling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/blog-api.git
cd blog-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
# Port number
PORT=3000

# MongoDB URL
MONGODB_URL=mongodb://127.0.0.1:27017/blog-api

# JWT secret key
JWT_SECRET=thisisasamplesecret
JWT_ACCESS_EXPIRATION_MINUTES=30
JWT_REFRESH_EXPIRATION_DAYS=30

# CORS origin
CORS_ORIGIN=http://localhost:3000
```

4. Start the server:

```bash
# Development
npm run dev

# Production
npm start
```

## API Documentation

API documentation is available at `http://localhost:3000/api/docs` when running in development mode.

### API Endpoints

#### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

#### Blogs

- `POST /api/blogs` - Create a new blog post
- `GET /api/blogs` - Get all blog posts
- `GET /api/blogs/:id` - Get a specific blog post
- `PATCH /api/blogs/:id` - Update a blog post
- `DELETE /api/blogs/:id` - Delete a blog post

#### Comments

- `POST /api/blogs/:blogId/comments` - Add a comment to a blog post
- `GET /api/blogs/:blogId/comments` - Get all comments for a blog post

## Project Structure

```
blog-api/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # Route definitions
│   ├── utils/          # Utility functions
│   ├── validators/     # Request validators
│   ├── app.js         # Express app
│   └── index.js       # App entry point
├── tests/             # Tests
├── .env              # Environment variables
├── .env.example      # Environment variables example
├── .gitignore       # Git ignore rules
├── package.json     # Project dependencies
└── README.md        # Project documentation
```

## Environment Variables

| Variable                        | Description                  | Default                            |
| ------------------------------- | ---------------------------- | ---------------------------------- |
| `PORT`                          | Port for the API             | 3000                               |
| `MONGODB_URL`                   | MongoDB connection URL       | mongodb://127.0.0.1:27017/blog-api |
| `JWT_SECRET`                    | Secret key for JWT           | -                                  |
| `JWT_ACCESS_EXPIRATION_MINUTES` | JWT access token expiration  | 30                                 |
| `JWT_REFRESH_EXPIRATION_DAYS`   | JWT refresh token expiration | 30                                 |
| `CORS_ORIGIN`                   | Allowed CORS origin          | http://localhost:3000              |

## API Response Format

### Success Response

```json
{
  "data": {
    // Response data
  },
  "message": "Success message"
}
```

### Error Response

```json
{
  "code": 400,
  "message": "Error message"
}
```

## Testing

Run tests using:

```bash
# Run all tests
npm test

# Run test coverage
npm run coverage
```

## Error Handling

The API uses a centralized error handling mechanism:

- All errors are caught by an error handling middleware
- Errors are transformed into a standard format before being sent to the client
- API errors include appropriate HTTP status codes

## Validation

Request data is validated using Joi:

- Validate request body, query parameters, and URL parameters
- Detailed error messages for invalid requests
- Custom validation rules for specific fields

## Security

Several security measures are implemented:

- JWT tokens for authentication
- Rate limiting on auth endpoints
- Security headers using Helmet
- CORS configuration
- MongoDB query sanitization
- Request data validation

## Development

```bash
# Run in development mode
npm run dev

# Run linter
npm run lint

# Fix linting errors
npm run lint:fix
```

## Production Deployment

1. Update environment variables for production
2. Build the application:

```bash
npm run build
```

3. Start the server:

```bash
npm start
```

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

[MIT](LICENSE)

## Author

Your Name - [Your Email]

## Acknowledgments

- Express.js
- MongoDB
- JWT
- Other dependencies used in the project
