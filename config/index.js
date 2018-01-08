const variables = {
  PORT: process.env.PORT || 5000,
  DATABASE: process.env.DATABASE || 'mongodb://localhost:27017/autodb',
  METRIX_DATABASE: process.env.METRIX_DATABASE || 'mongodb://localhost:27017/metrix',
  SECRET: '@vtobirl1k',

  WS: process.env.PORT || 4408,
  WS_INVERVAL: process.env.WS_INVERVAL || 10000,
}

export default variables;