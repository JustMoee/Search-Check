const sqlite3 = require('sqlite3').verbose();


// Create SQLite database
const db = new sqlite3.Database(`searchncheck.db`);

// Create table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS compData (
    accID INTEGER,
    nameEN TEXT,
    nameAR TEXT,
    nameC TEXT,
    services TEXT,
    contractStatus TEXT,
    expiryDate TEXT,
    notes Text
  )`);
  
  console.log('Database and table created successfully!');
});

// Close the database connection
db.close();
