ℹ  info      running for react

{
  status: 200,
  statusText: 'OK',
  headers: {
    date: 'Sat, 02 Nov 2019 14:13:46 GMT',
    'content-type': 'application/json; charset=utf-8',
    'content-length': '407',
    connection: 'close',
    'set-cookie': [
      '__cfduid=d6c4f18b79e2f01aac4e034417dee36e91572704026; expires=Sun, 01-Nov-20 14:13:46 GMT; path=/; domain=.bundlephobia.com; HttpOnly; Secure'
    ],
    'request-id': '50ed8366-af30-44ff-8d9d-83944147ae7d',
    'x-ratelimit-limit': '60',
    'x-ratelimit-reset': '1572677719567',
    vary: 'Accept-Encoding',
    'content-encoding': 'identity',
    'cache-control': 'max-age=86400, no-transform',
    'x-ua-compatible': 'IE=Edge',
    'access-control-allow-origin': '*',
    'access-control-allow-headers': '*',
    'access-control-allow-methods': 'GET, OPTIONS',
    'x-nginx-cache-status': 'EXPIRED',
    'cf-cache-status': 'HIT',
    age: '1993',
    'accept-ranges': 'bytes',
    'expect-ct': 'max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"',
    server: 'cloudflare',
    'cf-ray': '52f6b6066b1bcc30-SIN'
  },
  config: {
    url: 'https://bundlephobia.com/api/size?package=react',
    method: 'get',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'User-Agent': 'axios/0.19.0'
    },
    transformRequest: [ [Function: transformRequest] ],
    transformResponse: [ [Function: transformResponse] ],
    timeout: 0,
    adapter: [Function: httpAdapter],
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    validateStatus: [Function: validateStatus],
    data: undefined
  },
  request: ClientRequest {
    _events: [Object: null prototype] {
      socket: [Function],
      abort: [Function],
      aborted: [Function],
      error: [Function],
      timeout: [Function],
      prefinish: [Function: requestOnPrefinish]
    },
    _eventsCount: 6,
    _maxListeners: undefined,
    outputData: [],
    outputSize: 0,
    writable: true,
    _last: true,
    chunkedEncoding: false,
    shouldKeepAlive: false,
    useChunkedEncodingByDefault: false,
    sendDate: false,
    _removedConnection: false,
    _removedContLen: false,
    _removedTE: false,
    _contentLength: 0,
    _hasBody: true,
    _trailer: '',
    finished: true,
    _headerSent: true,
    socket: TLSSocket {
      _tlsOptions: [Object],
      _secureEstablished: true,
      _securePending: false,
      _newSessionPending: false,
      _controlReleased: true,
      _SNICallback: null,
      servername: 'bundlephobia.com',
      alpnProtocol: false,
      authorized: true,
      authorizationError: null,
      encrypted: true,
      _events: [Object: null prototype],
      _eventsCount: 10,
      connecting: false,
      _hadError: false,
      _parent: null,
      _host: 'bundlephobia.com',
      _readableState: [ReadableState],
      readable: true,
      _maxListeners: undefined,
      _writableState: [WritableState],
      writable: false,
      allowHalfOpen: false,
      _sockname: null,
      _pendingData: null,
      _pendingEncoding: '',
      server: undefined,
      _server: null,
      ssl: [TLSWrap],
      _requestCert: true,
      _rejectUnauthorized: true,
      parser: null,
      _httpMessage: [Circular],
      [Symbol(res)]: [TLSWrap],
      [Symbol(asyncId)]: 43,
      [Symbol(kHandle)]: [TLSWrap],
      [Symbol(lastWriteQueueSize)]: 0,
      [Symbol(timeout)]: null,
      [Symbol(kBytesRead)]: 0,
      [Symbol(kBytesWritten)]: 0,
      [Symbol(connect-options)]: [Object]
    },
    connection: TLSSocket {
      _tlsOptions: [Object],
      _secureEstablished: true,
      _securePending: false,
      _newSessionPending: false,
      _controlReleased: true,
      _SNICallback: null,
      servername: 'bundlephobia.com',
      alpnProtocol: false,
      authorized: true,
      authorizationError: null,
      encrypted: true,
      _events: [Object: null prototype],
      _eventsCount: 10,
      connecting: false,
      _hadError: false,
      _parent: null,
      _host: 'bundlephobia.com',
      _readableState: [ReadableState],
      readable: true,
      _maxListeners: undefined,
      _writableState: [WritableState],
      writable: false,
      allowHalfOpen: false,
      _sockname: null,
      _pendingData: null,
      _pendingEncoding: '',
      server: undefined,
      _server: null,
      ssl: [TLSWrap],
      _requestCert: true,
      _rejectUnauthorized: true,
      parser: null,
      _httpMessage: [Circular],
      [Symbol(res)]: [TLSWrap],
      [Symbol(asyncId)]: 43,
      [Symbol(kHandle)]: [TLSWrap],
      [Symbol(lastWriteQueueSize)]: 0,
      [Symbol(timeout)]: null,
      [Symbol(kBytesRead)]: 0,
      [Symbol(kBytesWritten)]: 0,
      [Symbol(connect-options)]: [Object]
    },
    _header: 'GET /api/size?package=react HTTP/1.1\r\n' +
      'Accept: application/json, text/plain, */*\r\n' +
      'User-Agent: axios/0.19.0\r\n' +
      'Host: bundlephobia.com\r\n' +
      'Connection: close\r\n' +
      '\r\n',
    _onPendingData: [Function: noopPendingOutput],
    agent: Agent {
      _events: [Object: null prototype],
      _eventsCount: 1,
      _maxListeners: undefined,
      defaultPort: 443,
      protocol: 'https:',
      options: [Object],
      requests: {},
      sockets: [Object],
      freeSockets: {},
      keepAliveMsecs: 1000,
      keepAlive: false,
      maxSockets: Infinity,
      maxFreeSockets: 256,
      maxCachedSessions: 100,
      _sessionCache: [Object]
    },
    socketPath: undefined,
    method: 'GET',
    path: '/api/size?package=react',
    _ended: true,
    res: IncomingMessage {
      _readableState: [ReadableState],
      readable: false,
      _events: [Object: null prototype],
      _eventsCount: 3,
      _maxListeners: undefined,
      socket: [TLSSocket],
      connection: [TLSSocket],
      httpVersionMajor: 1,
      httpVersionMinor: 1,
      httpVersion: '1.1',
      complete: true,
      headers: [Object],
      rawHeaders: [Array],
      trailers: {},
      rawTrailers: [],
      aborted: false,
      upgrade: false,
      url: '',
      method: null,
      statusCode: 200,
      statusMessage: 'OK',
      client: [TLSSocket],
      _consuming: false,
      _dumped: false,
      req: [Circular],
      responseUrl: 'https://bundlephobia.com/api/size?package=react',
      redirects: []
    },
    aborted: false,
    timeoutCb: null,
    upgradeOrConnect: false,
    parser: null,
    maxHeadersCount: null,
    _redirectable: Writable {
      _writableState: [WritableState],
      writable: true,
      _events: [Object: null prototype],
      _eventsCount: 2,
      _maxListeners: undefined,
      _options: [Object],
      _redirectCount: 0,
      _redirects: [],
      _requestBodyLength: 0,
      _requestBodyBuffers: [],
      _onNativeResponse: [Function],
      _currentRequest: [Circular],
      _currentUrl: 'https://bundlephobia.com/api/size?package=react'
    },
    [Symbol(kNeedDrain)]: false,
    [Symbol(isCorked)]: false,
    [Symbol(kOutHeaders)]: [Object: null prototype] {
      accept: [Array],
      'user-agent': [Array],
      host: [Array]
    }
  },
  data: {
    assets: [ [Object] ],
    dependencyCount: 3,
    dependencySizes: [ [Object] ],
    description: 'React is a JavaScript library for building user interfaces.',
    gzip: 2630,
    hasJSModule: false,
    hasJSNext: false,
    hasSideEffects: true,
    name: 'react',
    repository: 'https://github.com/facebook/react.git',
    scoped: false,
    size: 6499,
    version: '16.11.0'
  }
}