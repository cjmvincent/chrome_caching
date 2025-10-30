function FindProxyForURL(url, host) {
  // Define your cache server variable; routing to internal server, using direct as a fallback //
  var cacheServer = "PROXY cache_server.contoso.com:80; DIRECT";

  /* Update Services */
  if (
    dnsDomainIs(host, "dl.google.com") ||
    shExpMatch(host, "*.gvt1.com")
  ) {
    return cacheServer;
  }

  /* Default rule */
  return "DIRECT";
}
