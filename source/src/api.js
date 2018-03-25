const config = {
  //OLD API
  // baseUrl: "https://cors-anywhere.herokuapp.com/http://api.wego.com",
  // getAirports: "https://www.air-port-codes.com/api/v1/autocomplete",
  // getLocation: "https://srv.wego.com/places/search",
  // flightEndpoints: {
  //   clientInfo: "?api_key=047fca814736a1a95010&ts_code=18109",
  //   search: "/flights/api/k/2/searches",
  //   currency: "/flights/api/k/2/currencies",
  //   fares: "/flights/api/k/2/fares"
  // },
  // hotelEndpoints: {
  //   clientInfo: "?key=047fca814736a1a95010&ts_code=18109",
  //   search: "/hotels/api/locations/search",
  //   new: "/hotels/api/search/new",
  //   searchId: "/hotels/api/search/search_id",
  //   redirect: "/hotels/api/search/redirect/search_id"
  // },

  //NEW API
  baseUrl: "https://srv.wego.com/",
  cors: "https://cors-anywhere.herokuapp.com/",
  //auth
  clientId: "&client_id=0dd3120d9b4aa89a92aff5a7",
  clientSecret: "&client_secret=195012c76b7487e6ef1489a8",
  getCredentials: "/users/oauth/token?grant_type=client_credentials&scope=affiliate",
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
  // getAirports: config.getAirports,
  // getLocation: config.getLocation,
  // getFlights: config.baseUrl + config.flightEndpoints.search + config.flightEndpoints.clientInfo,
  // getCurrency: config.baseUrl + config.flightEndpoints.currency + config.flightEndpoints.clientInfo,
  // getFares: config.baseUrl + config.flightEndpoints.fares + config.flightEndpoints.clientInfo,
  // getLocations: config.baseUrl + config.hotelEndpoints.search + config.hotelEndpoints.clientInfo,
  // getHotels: config.baseUrl + config.hotelEndpoints.new + config.hotelEndpoints.clientInfo,
  // getHotelId: config.baseUrl + config.hotelEndpoints.searchId + config.hotelEndpoints.clientInfo,
  // getRoomRates: config.baseUrl + config.hotelEndpoints.redirect + config.hotelEndpoints.clientInfo
  getCredentials: config.baseUrl + config.getCredentials + config.clientId + config.clientSecret, //POST
  getLocation: config.baseUrl + config.getLocation, //GET
  getFlightSearch: config.baseUrl + config.getFlightSearch, //POST
  getFlights: config.cors + config.baseUrl + config.getFlights, //GET
  getTrip: config.baseUrl + config.getTrip, //GET
  getHotelSearch: config.cors + config.baseUrl + config.getHotelSearch, //POST
  getHotels:config.baseUrl + config.getHotels, //GET
}

export default api;
