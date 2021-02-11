const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/final"
);

//------------------ users-database-------------------------

module.exports.addUser = (first, last, email, hashed_password) => {
    const q = `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id`;
    const params = [first, last, email, hashed_password];
    return db.query(q, params);
};

module.exports.getHashedPassword = (email) => {
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

module.exports.saveFavoriteRecipe = (
    uri,
    label,
    url,
    source,
    image,
    ingredient,
    userId
) => {
    const q = `INSERT INTO favorites (uri, label, url, source, image, ingredient, userId) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING * `;
    const params = [uri, label, url, source, image, ingredient, userId];
    return db.query(q, params);
};
module.exports.getFavoriteRecipe = (userId) => {
    const q = `SELECT * FROM favorites WHERE userid = $1`;
    const query = [userId];
    return db.query(q, query);
};

module.exports.deleteRecipe = (id, userId) => {
    const q = `DELETE FROM favorites WHERE (id = $1 AND userId = $2)`;
    const query = [id, userId];
    return db.query(q, query);
};

module.exports.deleteAccount = (userId) => {
    const q = `DELETE FROM users WHERE id = $1`;
    const query = [userId];
    return db.query(q, query);
};
module.exports.deleteFavs = (userId) => {
    const q = `DELETE FROM favorites WHERE userId = $1`;
    const query = [userId];
    return db.query(q, query);
};
