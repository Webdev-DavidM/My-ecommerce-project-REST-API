import jwt from 'jsonwebtoken';

const jwtVerify = (req, res, next) => {
  try {
    let decoded = jwt.verify(req.headers.alg, 'crystal palace are the best');
    req.payload = decoded;
    next();
  } catch (err) {
    res.status(401).json('jwt token incorrect');
  }
};

export default jwtVerify;
