const axios = require('axios');

const geolocationMiddleware = async (req, res, next) => {
  try {
    // Extract IP address
    // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // console.log(ip);
    ip = "8.8.8.8" // example IP address

    // Call a geolocation API (replace 'your_token_here' with your actual API token)
    const response = await axios.get(`https://ipinfo.io/${ip}/json?token=c76d2f2d55499e`);
   
    
    
    // Extract location data
    const { city, region, country, loc } = response.data;
    const [latitude, longitude] = loc.split(',');

    // Log the location information
    console.log(`IP Address: ${ip}`);
    console.log(`City: ${city}`);
    console.log(`Region: ${region}`);
    console.log(`Country: ${country}`);
    console.log(`Latitude: ${latitude}`);
    console.log(`Longitude: ${longitude}`);

    
    next();
  } catch (error) {
    console.error('Error fetching geolocation------:');
    
    
    
    next();
  }
};

module.exports = geolocationMiddleware;