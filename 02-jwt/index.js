const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const zod = require("zod")

/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 */

const emailschema = zod.string().email();
const passwordschema = zod.string().min(6);

function signJwt(username, password) {
    const usernameresponse = emailschema.safeParse(username);
    const passwordresponse = passwordschema.safeParse(password);
     console.log(usernameresponse);
     console.log(passwordresponse)
    const signature = jwt.sign({username},jwtPassword);
    //console.log(signature)
    if (!usernameresponse.success || !passwordresponse.success ){
        return null;
    }else{
        return signature
    }
}
console.log(signJwt('fatima@gmail.com',jwtPassword))
/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */
function verifyJwt(token) {
    //const verified = jwt.verify(token,jwtPassword)
    try{
        jwt.verify(token,jwtPassword)
            return true
        
    }catch(e){
        
    }
        
    return 'Not valid Token'
}
console.log(verifyJwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZhdGltYUBnbWFpbC5jb20iLCJpYXQiOjE3MDMyNTMzMjN9.LS89v-GezwDhGG_Zzs4u2nDJglRazE0XQlghM68ZSLo'))
/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */
function decodeJwt(token) {
    const decoded = jwt.decode(token)
    if (decoded){
        return true
    }else{
        return false
    }
}
console.log(decodeJwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZhdGltYUBnbWFpbC5jb20iLCJpYXQiOjE3MDMyNTMwNTd9.CuqnlHlgm6Trru3LnAHD2yQFRU30GN08E4-LapjLpZU'));

module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};