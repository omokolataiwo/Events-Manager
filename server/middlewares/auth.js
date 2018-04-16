import jwt from 'jsonwebtoken';

const secret = process.env.SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers.auth || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(400).send({ error: 'Oops,Your session has expired,please login again to more-recipes' });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).send({ error: 'You have to login First' });
  }
};

export default verifyToken;
