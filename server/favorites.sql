  DROP TABLE IF EXISTS favorites;
  
  CREATE TABLE favorites(
      id SERIAL PRIMARY KEY,
      uri VARCHAR(500) NOT NULL,
      label VARCHAR(255) NOT NULL,
      url VARCHAR(255) NOT NULL,
      source VARCHAR(255) NOT NULL,
      image VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );