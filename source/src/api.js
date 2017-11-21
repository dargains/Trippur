const api = {
  baseUrl: "http://api.wego.com",
  ts_code: "&ts_code=18109",
  flightEndpoints: {
    key: "?api_key=047fca814736a1a95010",
    search: "/flights/api/k/2/searches",
    currency: "/flights/api/k/2/currencies",
    fares: "/flights/api/k/2/fares"
  },
  hotelEndpoints: {
    key: "?key=047fca814736a1a95010",
    search: "/hotels/api/locations/search",
    new: "/hotels/api/search/new",
    searchId: "/hotels/api/search/search_id",
    redirect: "/hotels/api/search/redirect/search_id"
  }
}

export default api;
