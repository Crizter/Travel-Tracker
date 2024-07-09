import express from "express";
import bodyParser from "body-parser";
import pg from 'pg'

const app = express();
const port = 3001;
const { Client } = pg;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


//  SET UP YOUR DATABASE
const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

client.connect((err) => { 
  if(err) {
    console.log(err.stack);
  }
  else { 
    console.log("Database connected successfully");
  }
});

// add method for countries visited
app.post('/add', async (req, res) => {
  const countryName = req.body.country;

  try {
    const result = await client.query("SELECT * FROM countries");
    const countries = result.rows;

    // Find the country code for the given country name
    let countryCode;
    for (let i = 0; i < countries.length; i++) {
      if (countryName.toLowerCase() === countries[i].country_name.toLowerCase()) {
        countryCode = countries[i].country_code;
        break;
      }
    }

    if (!countryCode) {
      res.status(400).send('Country not found.');
      return;
    }

    // Check if the country code already exists in world_tracker
    const duplicateCheck = await client.query('SELECT * FROM world_tracker WHERE country_code = $1', [countryCode]);
    if (duplicateCheck.rows.length > 0) {
      res.status(400).send('Country code already exists.');
     
      return;
    }

    // Insert the country code into world_tracker
    await client.query("INSERT INTO world_tracker (country_code) VALUES ($1)", [countryCode]);
    console.log(`Added country code: ${countryCode}`);
    res.status(200).send(`Country ${countryName} added successfully.`);
  } catch (error) {
    console.log(error.stack);
    res.status(500).send('An error occurred while adding the country.');
  }
  
});
let countries = [] ; 
async function selectingCountries() { 
  try {
    const res = await client.query("SELECT country_code FROM world_tracker");
    res.rows.forEach((country) => { 
      countries.push(country.country_code) ; 
      
    });
   
    console.log(res.rows);
    return countries ; 
  } catch (err) {
    console.log(err.stack);
    return [];
  }
}
async function totalCountries() { 
  let length  = 0 ; 
  try {
    const res = await client.query("SELECT country_code from world_tracker");
    res.rows.forEach((country) => { 
      length++ ; 
    });
    return length ;
  } catch (error) {
    console.log(error.stack);
    return error.stack; 
  }
}

app.get("/", async (req, res) => {
  const count = await selectingCountries(); 
  console.log(count);
  const length = await totalCountries() ; 

  res.render('index.ejs', { countries : count, total :length  }); 
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
