// setting up env based configuration
var getEnv = process.env.NODE_ENV;

let env = {};
// for development
if (getEnv === 'development') {
  env = {
    main: 'https://api.flickr.com/services/rest/'
  }
}
// for production
else if (getEnv === 'production') {
  env = {
    main: 'https://api.flickr.com/services/rest/'
  }
}

export default env;
