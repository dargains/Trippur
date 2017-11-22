const config = {
  baseUrl: "http://api.wego.com",
  flightEndpoints: {
    clientInfo: "?api_key=047fca814736a1a95010&ts_code=18109",
    search: "/flights/api/k/2/searches",
    currency: "/flights/api/k/2/currencies",
    fares: "/flights/api/k/2/fares"
  },
  hotelEndpoints: {
    clientInfo: "?key=047fca814736a1a95010&ts_code=18109",
    search: "/hotels/api/locations/search",
    new: "/hotels/api/search/new",
    searchId: "/hotels/api/search/search_id",
    redirect: "/hotels/api/search/redirect/search_id"
  }
}

const api = {
  getFlighs: config.baseUrl + config.flightEndpoints.search + config.flightEndpoints.clientInfo,
  getCurrency: config.baseUrl + config.flightEndpoints.currency + config.flightEndpoints.clientInfo,
  getFares: config.baseUrl + config.flightEndpoints.fares + config.flightEndpoints.clientInfo,
  getLocations: config.baseUrl + config.hotelEndpoints.search + config.hotelEndpoints.clientInfo,
  getHotels: config.baseUrl + config.hotelEndpoints.new + config.hotelEndpoints.clientInfo,
  getHotelId: config.baseUrl + config.hotelEndpoints.searchId + config.hotelEndpoints.clientInfo,
  redirectHotels: config.baseUrl + config.hotelEndpoints.redirect + config.hotelEndpoints.clientInfo
}

export default api;
