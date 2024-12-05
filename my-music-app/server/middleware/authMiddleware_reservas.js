const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    if(req.headers?.authorization){
        const token = req.headers.authorization.split(' ')[1];
        console.log(token, "hola")
        if(token == "null" || !token){
            return next();
        }
        console.log(token)
        const decodedToken = jwt.verify(token, 'secret_key');
        req.user = { id: decodedToken.id };
    }
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: 'Auth failed' });
  }
};