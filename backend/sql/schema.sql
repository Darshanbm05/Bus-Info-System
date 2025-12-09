-- schema.sql
CREATE DATABASE IF NOT EXISTS businfo;
USE businfo;

-- admin table (for demo we store plaintext password; see notes below)
CREATE TABLE IF NOT EXISTS admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- places table
CREATE TABLE IF NOT EXISTS places (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- buses table
CREATE TABLE IF NOT EXISTS buses (
  busid INT AUTO_INCREMENT PRIMARY KEY,
  from_place_id INT NOT NULL,
  to_place_id INT NOT NULL,
  class_of_service VARCHAR(100),
  via_places TEXT,
  departure_time TIME,
  FOREIGN KEY (from_place_id) REFERENCES places(id) ON DELETE CASCADE,
  FOREIGN KEY (to_place_id) REFERENCES places(id) ON DELETE CASCADE
);

-- queries/contact us table
CREATE TABLE IF NOT EXISTS queries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL,
  user_name VARCHAR(255),
  query_subject VARCHAR(255),
  query_message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_is_read (is_read),
  INDEX idx_created_at (created_at)
);
