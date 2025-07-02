# API Documentation

## 🌍 Countries

- **GET** `/api/countries`  
  Retrieve all countries with their aggregated satisfaction scores.

- **GET** `/api/countries/name/:CountryName`  
  Fetch details of a specific country by its name.

---

## 📝 Surveys

- **POST** `/api/surveys`  
  Submit a survey response for a country.  
  **Fields required**: `username`, `country`, individual domain scores, `total score`.

- **GET** `/api/survey?username=...&country=...`  
  Retrieve a user’s survey response for a specific country.

---

## 👤 User Authentication

- **POST** `/api/signup`  
  Register a new user account.

- **POST** `/api/login`  
  Log in with email/username and password.

---

## 🧭 User Profiles

- **POST** `/api/profile`  
  Create a user profile with personal details.

- **GET** `/api/profile/username/:username`  
  Fetch a profile by username.

- **PUT** `/api/profile/username/:username`  
  Update a user’s profile information.

---

## ⚙️ Country Management

- **POST** `/api/countries`  
  Add a new country record manually.

- **PUT** `/api/countries/:id`  
  Update a country’s aggregated scores.

- **DELETE** `/api/countries/:id`  
  Delete a country by ID.
