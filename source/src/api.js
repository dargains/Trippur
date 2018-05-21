const config = {
  baseUrl: "https://srv.wego.com/",
  cors: "https://cors-anywhere.herokuapp.com/",
  //auth
  clientId: "&client_id=0dd3120d9b4aa89a92aff5a7",
  clientSecret: "&client_secret=195012c76b7487e6ef1489a8",
  getCredentials: "/users/oauth/token?grant_type=client_credentials&scope=affiliate",
  ts_code: "18109",
  //location
  getLocation: "places/search",
  //flights
  getFlightSearch: "metasearch/flights/searches/",
  getFlights: "metasearch/flights/", // /{searchid}/results
  getTrip: "metasearch/flights/trips/", // {tripid}
  //hotels
  getHotelSearch: "metasearch/hotels/searches/",
  getHotels: "metasearch/hotels/", // /{searchid}/results
  getHotelRates: "metasearch/hotels/", // {hotelid}/rates
}

const api = {
  getCredentials: config.baseUrl + config.getCredentials + config.clientId + config.clientSecret, //POST
  getLocation: config.baseUrl + config.getLocation, //GET
  getFlightSearch: config.cors + config.baseUrl + config.getFlightSearch, //POST
  getFlights: config.cors + config.baseUrl + config.getFlights, //GET
  getTrip: config.cors + config.baseUrl + config.getTrip, //GET
  getHotelSearch: config.cors + config.baseUrl + config.getHotelSearch, //POST
  getHotels: config.cors + config.baseUrl + config.getHotels, //GET
  tsCode: config.tsCode
}

export default api;
