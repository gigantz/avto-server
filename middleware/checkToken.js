import jwt from 'jsonwebtoken';
import config from 'config';

export default (req, res, next) => {
  const token = req.body.token || req.headers.token;
  const decodedToken = jwt.decode(token, config.SECRET);

  if(!decodedToken) {
    console.log(decodedToken);
    return res.json({
      message: 'Token problems'
    })
  }

  req.user = decodedToken.userId;

  return next();
}