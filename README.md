Here's a `README.md` file for your project:

```markdown
# Country Tracker

A Node.js application to track visited countries. The app allows users to add countries they have visited, ensuring no duplicates, and displays the list of visited countries.

## Features

- Add a visited country by name.
- Prevent duplicate entries of country codes.
- Display a list of visited countries.

## Technologies Used

- Node.js
- Express
- PostgreSQL
- Body-parser
- dotenv
- EJS (for rendering views)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:

   Create a `.env` file in the root of your project and add your database credentials:
   ```env
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=your_db_host
   DB_PORT=5432
   DB_DATABASE=your_db_name
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Usage

1. Ensure your PostgreSQL database is set up with the necessary tables:
   ```sql
   CREATE TABLE countries (
     country_name VARCHAR(255),
     country_code VARCHAR(2)
   );

   CREATE TABLE world_tracker (
     country_code VARCHAR(2)
   );
   ```

2. To add a visited country, make a POST request to `/add` with the country name:
   ```bash
   curl -X POST -d "country=CountryName" http://localhost:3001/add
   ```

3. View the list of visited countries by navigating to:
   ```
   http://localhost:3001/
   ```

## File Structure

```
.
├── public
│   └── [Static files]
├── views
│   └── index.ejs
├── .env
├── .gitignore
├── README.md
├── package.json
└── index.js
```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).



### Notes:
1. **Replace `your-username` and `your-repository`**: Replace these placeholders with your actual GitHub username and repository name.
2. **Ensure Database Setup**: Make sure your database schema matches the one in the README.
3. **Running the Project**: Ensure you have a PostgreSQL instance running and properly configured according to your `.env` file.

This `README.md` should provide a comprehensive guide to understanding, setting up, and using your project.
