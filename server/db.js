const spicedPg = require('spiced-pg');
const db = spicedPg(process.env.DATABASE_URL || 'postgres:postgres:postgres@localhost:5432/final');



//------------------ users-database-------------------------


module.exports.addUser = (first, last, email, hashed_password) => { 
    const q = `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id`;
    const params =  [first, last, email, hashed_password];
    return db.query(q, params);
};


module.exports.getHashedPassword = email =>{
    const q = `SELECT password, id FROM users WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};

module.exports.getUserByEmail = (email) => {
    const q = `SELECT email FROM users WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};

module.exports.setSecretCode = (email, code) => {
    const q = `INSERT INTO reset_codes (email, code) VALUES ($1, $2)`;
    const params = [email, code];
    return db.query(q, params);
};

module.exports.getSecretCode = (email) => {
    const q = `SELECT code FROM reset_codes WHERE email = $1 AND CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes'`;
    const params = [email];
    return db.query(q, params);
};

module.exports.updateUserPassword = (email, password) => {
    const q = `UPDATE users SET password = $2 WHERE email = $1`;
    const params = [email, password];
    return db.query(q, params);
};

module.exports.getUserData = (id) => {
    const q = `SELECT * FROM users WHERE id = $1`;
    const params = [id];
    return db.query(q, params);
};

module.exports.saveFavoriteRecipe = (uri, label, url, source, image) => {
    const q = `INSERT INTO favorites (uri, label, url, source, image) VALUES ($1, $2, $3, $4, $5)`;
    const params = [uri, label, url, source, image];
    return db.query(q, params);
};