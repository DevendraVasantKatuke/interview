## Benchmarking
Benchmarking is important if you want to measure how a change can affect the
performance of your application. We provide a simple way to benchmark your
application from the point of view of a user and contributor. The setup allows
you to automate benchmarks in different branches and on different Node.js
versions.

The modules we will use:
- [Autocannon](https://github.com/mcollina/autocannon): A HTTP/1.1 benchmarking
  tool written in node.
- [Branch-comparer](https://github.com/StarpTech/branch-comparer): Checkout
  multiple git branches, execute scripts and log the results.
- [Concurrently](https://github.com/kimmobrunfeldt/concurrently): Run commands
  concurrently.
- [Npx](https://github.com/npm/npx): NPM package runner used to run scripts
  against different Node.js Versions and execute local binaries. Shipped with
  npm@5.2.0.

## Simple

### Run the test in the current branch
```sh
npm run benchmark
```

### Run the test against different Node.js versions ✨
```sh
npx -p node@10 -- npm run benchmark
```

## Advanced

### Run the test in different branches
```sh
branchcmp --rounds 2 --script "npm run benchmark"
```

### Run the test in different branches against different Node.js versions ✨
```sh
branchcmp --rounds 2 --script "npm run benchmark"
```

### Compare current branch with main (Gitflow)
```sh
branchcmp --rounds 2 --gitflow --script "npm run benchmark"
```
or
```sh
npm run bench
```

### Run different examples

```sh
branchcmp --rounds 2 -s "node ./node_modules/concurrently -k -s first \"node ./examples/asyncawait.js\" \"node ./node_modules/autocannon -c 100 -d 5 -p 10 localhost:3000/\""
```

## Ecosystem

Plugins maintained by the Fastify team are listed under [Core](#core) while
plugins maintained by the community are listed in the [Community](#community)
section.

#### [Core](#core)

- [`@fastify/accepts`](https://github.com/fastify/fastify-accepts) to have
  [accepts](https://www.npmjs.com/package/accepts) in your request object.
- [`@fastify/accepts-serializer`](https://github.com/fastify/fastify-accepts-serializer)
  to serialize to output according to `Accept` header.
- [`@fastify/auth`](https://github.com/fastify/fastify-auth) Run multiple auth
  functions in Fastify.
- [`@fastify/autoload`](https://github.com/fastify/fastify-autoload) Require all
  plugins in a directory.
- [`@fastify/basic-auth`](https://github.com/fastify/fastify-basic-auth) Basic
  auth plugin for Fastify.
- [`@fastify/bearer-auth`](https://github.com/fastify/fastify-bearer-auth) Bearer
  auth plugin for Fastify.
- [`@fastify/caching`](https://github.com/fastify/fastify-caching) General
  server-side cache and ETag support.
- [`@fastify/circuit-breaker`](https://github.com/fastify/fastify-circuit-breaker)
  A low overhead circuit breaker for your routes.
- [`@fastify/compress`](https://github.com/fastify/fastify-compress) Fastify
  compression utils.
- [`@fastify/cookie`](https://github.com/fastify/fastify-cookie) Parse and set
  cookie headers.
- [`@fastify/cors`](https://github.com/fastify/fastify-cors) Enables the use of
  CORS in a Fastify application.
- [`@fastify/csrf-protection`](https://github.com/fastify/csrf-protection) A plugin for adding
  [CSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery) protection to
  Fastify.
- [`@fastify/diagnostics-channel`](https://github.com/fastify/fastify-diagnostics-channel)
  Plugin to deal with `diagnostics_channel` on Fastify
- [`@fastify/elasticsearch`](https://github.com/fastify/fastify-elasticsearch)
  Plugin to share the same ES client.
- [`@fastify/env`](https://github.com/fastify/fastify-env) Load and check
  configuration.
- [`@fastify/etag`](https://github.com/fastify/fastify-etag) Automatically
  generate ETags for HTTP responses.
- [`@fastify/flash`](https://github.com/fastify/fastify-flash) Set and get flash
  messages using the session.
- [`@fastify/formbody`](https://github.com/fastify/fastify-formbody) Plugin to
  parse x-www-form-urlencoded bodies.
- [`@fastify/funky`](https://github.com/fastify/fastify-funky) Makes functional
  programming in Fastify more convenient. Adds support for Fastify routes
  returning functional structures, such as Either, Task or plain parameterless
  function.
- [`@fastify/helmet`](https://github.com/fastify/fastify-helmet) Important
  security headers for Fastify.
- [`@fastify/hotwire`](https://github.com/fastify/fastify-hotwire) Use the Hotwire pattern with Fastify.
- [`@fastify/http-proxy`](https://github.com/fastify/fastify-http-proxy) Proxy
  your HTTP requests to another server, with hooks.
- [`@fastify/jwt`](https://github.com/fastify/fastify-jwt) JWT utils for Fastify,
  internally uses [fast-jwt](https://github.com/nearform/fast-jwt).
- [`@fastify/leveldb`](https://github.com/fastify/fastify-leveldb) Plugin to
  share a common LevelDB connection across Fastify.
- [`@fastify/mongodb`](https://github.com/fastify/fastify-mongodb) Fastify
  MongoDB connection plugin, with which you can share the same MongoDB
  connection pool across every part of your server.
- [`@fastify/multipart`](https://github.com/fastify/fastify-multipart) Multipart
  support for Fastify.
- [`@fastify/oauth2`](https://github.com/fastify/fastify-oauth2) Wrap around
  [`simple-oauth2`](https://github.com/lelylan/simple-oauth2).
- [`@fastify/postgres`](https://github.com/fastify/fastify-postgres) Fastify
  PostgreSQL connection plugin, with this you can share the same PostgreSQL
  connection pool in every part of your server.
- [`@fastify/rate-limit`](https://github.com/fastify/fastify-rate-limit) A low
  overhead rate limiter for your routes.
- [`@fastify/request-context`](https://github.com/fastify/fastify-request-context)
  Request-scoped storage, based on
  [AsyncLocalStorage](https://nodejs.org/api/async_hooks.html#async_hooks_class_asynclocalstorage)
  (with fallback to [cls-hooked](https://github.com/Jeff-Lewis/cls-hooked)),
  providing functionality similar to thread-local storages.
- [`@fastify/response-validation`](https://github.com/fastify/fastify-response-validation)
  A simple plugin that enables response validation for Fastify.
- [`@fastify/nextjs`](https://github.com/fastify/fastify-nextjs) React
  server-side rendering support for Fastify with
  [Next](https://github.com/zeit/next.js/).
- [`@fastify/redis`](https://github.com/fastify/fastify-redis) Fastify Redis
  connection plugin, with which you can share the same Redis connection across
  every part of your server.
- [`@fastify/reply-from`](https://github.com/fastify/fastify-reply-from) Plugin
  to forward the current HTTP request to another server.
- [`@fastify/routes`](https://github.com/fastify/fastify-routes) Plugin that
  provides a `Map` of routes.
- [`@fastify/sensible`](https://github.com/fastify/fastify-sensible) Defaults for
  Fastify that everyone can agree on. It adds some useful decorators such as
  HTTP errors and assertions, but also more request and reply methods.
- [`@fastify/session`](https://github.com/fastify/session) a session plugin for
  Fastify.
- [`@fastify/static`](https://github.com/fastify/fastify-static) Plugin for
  serving static files as fast as possible.
- [`@fastify/swagger`](https://github.com/fastify/fastify-swagger) Plugin for
  serving Swagger/OpenAPI documentation for Fastify, supporting dynamic
  generation.
- [`@fastify/websocket`](https://github.com/fastify/fastify-websocket) WebSocket
  support for Fastify. Built upon [ws](https://github.com/websockets/ws).
- [`@fastify/url-data`](https://github.com/fastify/fastify-url-data) Decorate the
  `Request` object with a method to access raw URL components.
- [`any-schema-you-like`](https://github.com/fastify/any-schema-you-like) Save multiple
  schemas and decide which one to use to serialize the payload 
- [`aws-lambda-fastify`](https://github.com/fastify/aws-lambda-fastify) allows you to
  easily build serverless web applications/services and RESTful APIs using Fastify
  on top of AWS Lambda and Amazon API Gateway.
- [`fastify-awilix`](https://github.com/fastify/fastify-awilix) Dependency
  injection support for Fastify, based on
  [awilix](https://github.com/jeffijoe/awilix).
- [`fastify-schedule`](https://github.com/fastify/fastify-schedule) Plugin for
  scheduling periodic jobs, based on
  [toad-scheduler](https://github.com/kibertoad/toad-scheduler).
- [`middie`](https://github.com/fastify/middie) Middleware engine for Fastify.
- [`point-of-view`](https://github.com/fastify/point-of-view) Templates
  rendering (_ejs, pug, handlebars, marko_) plugin support for Fastify.
- [`under-pressure`](https://github.com/fastify/under-pressure) Measure process
  load with automatic handling of _"Service Unavailable"_ plugin for Fastify.

#### [Community](#community)

- [`@applicazza/fastify-nextjs`](https://github.com/applicazza/fastify-nextjs)
  Alternate Fastify and Next.js integration.
- [`@coobaha/typed-fastify`](https://github.com/Coobaha/typed-fastify) Strongly
  typed routes with a runtime validation using JSON schema generated from types.
- [`@dnlup/fastify-doc`](https://github.com/dnlup/fastify-doc) A plugin for
  sampling process metrics.
- [`@dnlup/fastify-traps`](https://github.com/dnlup/fastify-traps) A plugin to
  close the server gracefully on `SIGINT` and `SIGTERM` signals.
- [`@gquittet/graceful-server`](https://github.com/gquittet/graceful-server)
  Tiny (~5k), Fast, KISS, and dependency-free Node.JS library to make your
  Fastify API graceful.
- [`@immobiliarelabs/fastify-metrics`](https://github.com/immobiliare/fastify-metrics)
  Minimalistic and opinionated plugin that collects usage/process metrics and
  dispatches to [statsd](https://github.com/statsd/statsd).
- [`@immobiliarelabs/fastify-sentry`](https://github.com/immobiliare/fastify-sentry) Sentry errors handler that just works! Install, add your DSN and you're good to go!
- [`@mgcrea/fastify-graceful-exit`](https://github.com/mgcrea/fastify-graceful-exit)
  A plugin to close the server gracefully
- [`@mgcrea/fastify-request-logger`](https://github.com/mgcrea/fastify-request-logger)
  A plugin to enable compact request logging for Fastify
- [`@mgcrea/fastify-session-redis-store`](https://github.com/mgcrea/fastify-session-redis-store)
  Redis store for @mgcrea/fastify-session using ioredis
- [`@mgcrea/fastify-session-sodium-crypto`](https://github.com/mgcrea/fastify-session-sodium-crypto)
  Fast sodium-based crypto for @mgcrea/fastify-session
- [`@mgcrea/fastify-session`](https://github.com/mgcrea/fastify-session) Session
  plugin for Fastify that supports both stateless and stateful sessions
- [`@mgcrea/pino-pretty-compact`](https://github.com/mgcrea/pino-pretty-compact)
  A custom compact pino-base prettifier
- [`@trubavuong/fastify-seaweedfs`](https://github.com/trubavuong/fastify-seaweedfs)
  SeaweedFS for Fastify
- [`apollo-server-fastify`](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-fastify)
  Run an [Apollo Server](https://github.com/apollographql/apollo-server) to
  serve GraphQL with Fastify.
- [`arecibo`](https://github.com/nucleode/arecibo) Fastify ping responder for
  Kubernetes Liveness and Readiness Probes.
- [`cls-rtracer`](https://github.com/puzpuzpuz/cls-rtracer) Fastify middleware
  for CLS-based request ID generation. An out-of-the-box solution for adding
  request IDs into your logs.
- [`fastify-405`](https://github.com/Eomm/fastify-405) Fastify plugin that adds
  405 HTTP status to your routes
- [`fastify-allow`](https://github.com/mattbishop/fastify-allow) Fastify plugin
  that automatically adds an Allow header to responses with routes. Also sends
  405 responses for routes that have a handler but not for the request's method.
- [`fastify-amqp`](https://github.com/RafaelGSS/fastify-amqp) Fastify AMQP
  connection plugin, to use with RabbitMQ or another connector. Just a wrapper
  to [`amqplib`](https://github.com/squaremo/amqp.node).
- [`fastify-amqp-async`](https://github.com/kffl/fastify-amqp-async) Fastify
  AMQP plugin with a Promise-based API provided by
  [`amqplib-as-promised`](https://github.com/twawszczak/amqplib-as-promised).
- [`fastify-angular-universal`](https://github.com/exequiel09/fastify-angular-universal)
  Angular server-side rendering support using
  [`@angular/platform-server`](https://github.com/angular/angular/tree/master/packages/platform-server)
  for Fastify
- [`fastify-api-key`](https://github.com/arkerone/fastify-api-key) Fastify
  plugin to authenticate HTTP requests based on api key and signature
- [`fastify-appwrite`](https://github.com/Dev-Manny/fastify-appwrite) Fastify
  Plugin for interacting with Appwrite server.
- [`fastify-auth0-verify`](https://github.com/nearform/fastify-auth0-verify):
  Auth0 verification plugin for Fastify, internally uses
  [fastify-jwt](https://npm.im/fastify-jwt) and
  [jsonwebtoken](https://npm.im/jsonwebtoken).
- [`fastify-autocrud`](https://github.com/paranoiasystem/fastify-autocrud)
  Plugin to auto-generate CRUD routes as fast as possible.
- [`fastify-autoroutes`](https://github.com/GiovanniCardamone/fastify-autoroutes)
  Plugin to scan and load routes based on filesystem path from a custom
  directory.
- [`fastify-axios`](https://github.com/davidedantonio/fastify-axios) Plugin to
  send HTTP requests via [axios](https://github.com/axios/axios).
- [`fastify-babel`](https://github.com/cfware/fastify-babel) Fastify plugin for
  development servers that require Babel transformations of JavaScript sources.
- [`fastify-bcrypt`](https://github.com/heply/fastify-bcrypt) A Bcrypt hash
  generator & checker.
- [`fastify-blipp`](https://github.com/PavelPolyakov/fastify-blipp) Prints your
  routes to the console, so you definitely know which endpoints are available.
- [`fastify-bookshelf`](https://github.com/butlerx/fastify-bookshelfjs) Fastify
  plugin to add [bookshelf.js](https://bookshelfjs.org/) ORM support.
- [`fastify-boom`](https://github.com/jeromemacias/fastify-boom) Fastify plugin
  to add [boom](https://github.com/hapijs/boom) support.
- [`fastify-bree`](https://github.com/climba03003/fastify-bree) Fastify plugin
  to add [bree](https://github.com/breejs/bree) support.
- [`fastify-casbin`](https://github.com/nearform/fastify-casbin) Casbin support
  for Fastify.
- [`fastify-casbin-rest`](https://github.com/nearform/fastify-casbin-rest)
  Casbin support for Fastify based on a RESTful model.
- [`fastify-casl`](https://github.com/Inlecom/fastify-casl) Fastify
  [CASL](https://github.com/stalniy/casl) plugin that supports ACL-like
  protection of endpoints via either a preSerialization & preHandler hook,
  sanitizing the inputs and outputs of your application based on user rights.
- [`fastify-cloudevents`](https://github.com/smartiniOnGitHub/fastify-cloudevents)
  Fastify plugin to generate and forward Fastify events in the Cloudevents
  format.
- [`fastify-cockroachdb`](https://github.com/alex-ppg/fastify-cockroachdb)
  Fastify plugin to connect to a CockroachDB PostgreSQL instance via the
  Sequelize ORM.
- [`fastify-couchdb`](https://github.com/nigelhanlon/fastify-couchdb) Fastify
  plugin to add CouchDB support via [nano](https://github.com/apache/nano).
- [`fastify-crud-generator`](https://github.com/heply/fastify-crud-generator) A
  plugin to rapidly generate CRUD routes for any entity.
- [`fastify-custom-healthcheck`](https://github.com/gkampitakis/fastify-custom-healthcheck)
  Fastify plugin to add health route in your server that asserts custom
  functions.
- [`fastify-decorators`](https://github.com/L2jLiga/fastify-decorators) Fastify
  plugin that provides the set of TypeScript decorators.
- [`fastify-disablecache`](https://github.com/Fdawgs/fastify-disablecache)
  Fastify plugin to disable client-side caching, inspired by
  [nocache](https://github.com/helmetjs/nocache).
- [`fastify-dynamodb`](https://github.com/matrus2/fastify-dynamodb) AWS DynamoDB
  plugin for Fastify. It exposes
  [AWS.DynamoDB.DocumentClient()](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html)
  object.
- [`fastify-dynareg`](https://github.com/greguz/fastify-dynareg) Dynamic plugin
  register for Fastify.
- [`fastify-early-hints`](https://github.com/zekth/fastify-early-hints) Plugin
  to add HTTP 103 feature based on [RFC
  8297](https://httpwg.org/specs/rfc8297.html)
- [`fastify-envalid`](https://github.com/alemagio/fastify-envalid) Fastify
  plugin to integrate [envalid](https://github.com/af/envalid) in your Fastify
  project.
- [`fastify-error-page`](https://github.com/hemerajs/fastify-error-page) Fastify
  plugin to print errors in structured HTML to the browser.
- [`fastify-esso`](https://github.com/patrickpissurno/fastify-esso) The easiest
  authentication plugin for Fastify, with built-in support for Single sign-on
  (and great documentation).
- [`fastify-explorer`](https://github.com/Eomm/fastify-explorer) Get control of
  your decorators across all the encapsulated contexts.
- [`fastify-favicon`](https://github.com/smartiniOnGitHub/fastify-favicon)
  Fastify plugin to serve default favicon.
- [`fastify-feature-flags`](https://gitlab.com/m03geek/fastify-feature-flags)
  Fastify feature flags plugin with multiple providers support (e.g. env,
  [config](https://lorenwest.github.io/node-config/),
  [unleash](https://unleash.github.io/)).
- [`fastify-file-routes`](https://github.com/spa5k/fastify-file-routes)
  Get Next.js based file system routing into fastify.
- [`fastify-file-upload`](https://github.com/huangang/fastify-file-upload)
  Fastify plugin for uploading files.
- [`fastify-firebase`](https://github.com/now-ims/fastify-firebase) Fastify
  plugin for [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
  to Fastify so you can easily use Firebase Auth, Firestore, Cloud Storage,
  Cloud Messaging, and more.
- [`fastify-firebase-auth`](https://github.com/oxsav/fastify-firebase-auth)
  Firebase Authentication for Fastify supporting all of the methods relating to
  the authentication API.
- [`fastify-formidable`](https://github.com/climba03003/fastify-formidable)
  Handy plugin to provide multipart support and fastify-swagger integration.
- [`fastify-gcloud-trace`](https://github.com/mkinoshi/fastify-gcloud-trace)
  [Google Cloud Trace API](https://cloud.google.com/trace/docs/reference)
  Connector for Fastify.
- [`fastify-get-head`](https://github.com/MetCoder95/fastify-get-head) Small
  plugin to set a new HEAD route handler for each GET route previously
  registered in Fastify.
- [`fastify-get-only`](https://github.com/DanieleFedeli/fastify-get-only) Small
  plugin used to make fastify accept only GET requests
- [`fastify-good-sessions`](https://github.com/Phara0h/fastify-good-sessions) A
  good Fastify sessions plugin focused on speed.
- [`fastify-google-cloud-storage`](https://github.com/carlozamagni/fastify-google-cloud-storage)
  Fastify plugin that exposes a GCP Cloud Storage client instance.
- [`fastify-grant`](https://github.com/simov/fastify-grant)
  Authentication/Authorization plugin for Fastify that supports 200+ OAuth
  Providers.
- [`fastify-guard`](https://github.com/hsynlms/fastify-guard) A Fastify plugin
  that protects endpoints by checking authenticated user roles and/or scopes.
- [`fastify-graceful-shutdown`](https://github.com/hemerajs/fastify-graceful-shutdown)
  Shutdown Fastify gracefully and asynchronously.
- [`fastify-hasura`](https://github.com/ManUtopiK/fastify-hasura) A Fastify
  plugin to have fun with [Hasura](https://github.com/hasura/graphql-engine).
- [`fastify-healthcheck`](https://github.com/smartiniOnGitHub/fastify-healthcheck)
  Fastify plugin to serve a health check route and a probe script.
- [`fastify-hemera`](https://github.com/hemerajs/fastify-hemera) Fastify Hemera
  plugin, for writing reliable & fault-tolerant microservices with
  [nats.io](https://nats.io/).
- [`fastify-http-context`](https://github.com/thorough-developer/fastify-http-context)
  Fastify plugin for "simulating" a thread of execution to allow for true HTTP
  context to take place per API call within the Fastify lifecycle of calls.
- [`fastify-http2https`](https://github.com/lolo32/fastify-http2https) Redirect
  HTTP requests to HTTPS, both using the same port number, or different response
  on HTTP and HTTPS.
- [`fastify-http-client`](https://github.com/kenuyx/fastify-http-client) Plugin
  to send HTTP(s) requests. Built upon
  [urllib](https://github.com/node-modules/urllib).
- [`fastify-http-errors-enhanced`](https://github.com/ShogunPanda/fastify-http-errors-enhanced)
  An error handling plugin for Fastify that uses enhanced HTTP errors.
- [`fastify-https-redirect`](https://github.com/tomsvogel/fastify-https-redirect)
  Fastify plugin for auto-redirect from HTTP to HTTPS.
- [`fatify-impressions`](https://github.com/manju4ever/fastify-impressions) Fastify
  plugin to track impressions of all the routes.
- [`fastify-influxdb`](https://github.com/alex-ppg/fastify-influxdb) Fastify
  InfluxDB plugin connecting to an InfluxDB instance via the Influx default
  package.
- [`fastify-jwt-authz`](https://github.com/Ethan-Arrowood/fastify-jwt-authz) JWT
  user scope verifier.
- [`fastify-jwt-webapp`](https://github.com/charlesread/fastify-jwt-webapp) JWT
  authentication for Fastify-based web apps.
- [`fastify-kafkajs`](https://github.com/kffl/fastify-kafkajs) Fastify plugin
  that adds support for KafkaJS - a modern Apache Kafka client library.
- [`fastify-knexjs`](https://github.com/chapuletta/fastify-knexjs) Fastify
  plugin for support KnexJS Query Builder.
- [`fastify-knexjs-mock`](https://github.com/chapuletta/fastify-knexjs-mock)
  Fastify Mock KnexJS for testing support.
- [`fastify-kubernetes`](https://github.com/greguz/fastify-kubernetes) Fastify
  Kubernetes client plugin.
- [`fastify-language-parser`](https://github.com/lependu/fastify-language-parser)
  Fastify plugin to parse request language.
- [`fastify-loader`](https://github.com/TheNoim/fastify-loader) Load routes from
  a directory and inject the Fastify instance in each file.
- [`fastify-lured`](https://github.com/lependu/fastify-lured) Plugin to load lua
  scripts with [fastify-redis](https://github.com/fastify/fastify-redis) and
  [lured](https://github.com/enobufs/lured).
- [`fastify-mailer`](https://github.com/coopflow/fastify-mailer) Plugin to
  initialize and encapsulate [Nodemailer](https://nodemailer.com)'s transporters
  instances in Fastify.
- [`fastify-markdown`](https://github.com/freezestudio/fastify-markdown) Plugin
  to markdown support.
- [`fastify-method-override`](https://github.com/corsicanec82/fastify-method-override)
  Plugin for Fastify, which allows the use of HTTP verbs, such as DELETE, PATCH,
  HEAD, PUT, OPTIONS in case the client doesn't support them.
- [`fastify-metrics`](https://gitlab.com/m03geek/fastify-metrics) Plugin for
  exporting [Prometheus](https://prometheus.io) metrics.
- [`fastify-minify`](https://github.com/Jelenkee/fastify-minify) Plugin for
  minification and transformation of responses.
- [`fastify-mongo-memory`](https://github.com/chapuletta/fastify-mongo-memory)
  Fastify MongoDB in Memory Plugin for testing support.
- [`fastify-mongoose-api`](https://github.com/jeka-kiselyov/fastify-mongoose-api)
  Fastify plugin to create REST API methods based on Mongoose MongoDB models.
- [`fastify-mongoose-driver`](https://github.com/alex-ppg/fastify-mongoose)
  Fastify Mongoose plugin that connects to a MongoDB via the Mongoose plugin
  with support for Models.
- [`fastify-mqtt`](https://github.com/love-lena/fastify-mqtt) Plugin to share
  [mqtt](https://www.npmjs.com/package/mqtt) client across Fastify.
- [`fastify-msgpack`](https://github.com/kenriortega/fastify-msgpack) Fastify
  and MessagePack, together at last. Uses @msgpack/msgpack by default.
- [`fastify-multer`](https://github.com/fox1t/fastify-multer) Multer is a plugin
  for handling multipart/form-data, which is primarily used for uploading files.
- [`fastify-nats`](https://github.com/mahmed8003/fastify-nats) Plugin to share
  [NATS](https://nats.io) client across Fastify.
- [`fastify-next-auth`](https://github.com/wobsoriano/fastify-next-auth) NextAuth.js plugin for Fastify.
- [`fastify-no-additional-properties`](https://github.com/greguz/fastify-no-additional-properties)
  Add `additionalProperties: false` by default to your JSON Schemas.
- [`fastify-no-icon`](https://github.com/jsumners/fastify-no-icon) Plugin to
  eliminate thrown errors for `/favicon.ico` requests.
- [`fastify-nodemailer`](https://github.com/lependu/fastify-nodemailer) Plugin
  to share [nodemailer](https://nodemailer.com) transporter across Fastify.
- [`fastify-normalize-request-reply`](https://github.com/ericrglass/fastify-normalize-request-reply)
  Plugin to normalize the request and reply to the Express version 4.x request
  and response, which allows use of middleware, like swagger-stats, that was
  originally written for Express.
- [`fastify-now`](https://github.com/yonathan06/fastify-now) Structure your
  endpoints in a folder and load them dynamically with Fastify.
- [`fastify-nuxtjs`](https://github.com/gomah/fastify-nuxtjs) Vue server-side
  rendering support for Fastify with Nuxt.js Framework.
- [`fastify-oas`](https://gitlab.com/m03geek/fastify-oas) Generates OpenAPI 3.0+
  documentation from routes schemas for Fastify.
- [`fastify-objectionjs`](https://github.com/jarcodallo/fastify-objectionjs)
  Plugin for the Fastify framework that provides integration with objectionjs
  ORM.
- [`fastify-objectionjs-classes`](https://github.com/kamikazechaser/fastify-objectionjs-classes)
  Plugin to cherry-pick classes from objectionjs ORM.
- [`fastify-openapi-docs`](https://github.com/ShogunPanda/fastify-openapi-docs)
  A Fastify plugin that generates OpenAPI spec automatically.
- [`fastify-openapi-glue`](https://github.com/seriousme/fastify-openapi-glue)
  Glue for OpenAPI specifications in Fastify, autogenerates routes based on an
  OpenAPI Specification.
- [`fastify-opentelemetry`](https://github.com/autotelic/fastify-opentelemetry)
  A Fastify plugin that uses the [OpenTelemetry
  API](https://github.com/open-telemetry/opentelemetry-js-api) to provide
  request tracing.
- [`fastify-oracle`](https://github.com/cemremengu/fastify-oracle) Attaches an
  [`oracledb`](https://github.com/oracle/node-oracledb) connection pool to a
  Fastify server instance.
- [`fastify-orientdb`](https://github.com/mahmed8003/fastify-orientdb) Fastify
  OrientDB connection plugin, with which you can share the OrientDB connection
  across every part of your server.
- [`fastify-piscina`](https://github.com/piscinajs/fastify-piscina) A worker
  thread pool plugin using [Piscina](https://github.com/piscinajs/piscina).
- [`fastify-peekaboo`](https://github.com/simone-sanfratello/fastify-peekaboo)
  Fastify plugin for memoize responses by expressive settings.
- [`fastify-polyglot`](https://github.com/heply/fastify-polyglot) A plugin to
  handle i18n using
  [node-polyglot](https://www.npmjs.com/package/node-polyglot).
- [`fastify-postgraphile`](https://github.com/alemagio/fastify-postgraphile)
  Plugin to integrate [PostGraphile](https://www.graphile.org/postgraphile/) in
  a Fastify project.
- [`fastify-prettier`](https://github.com/hsynlms/fastify-prettier) A Fastify
  plugin that uses [prettier](https://github.com/prettier/prettier) under the
  hood to beautify outgoing responses and/or other things in the Fastify server.
- [`fastify-print-routes`](https://github.com/ShogunPanda/fastify-print-routes)
  A Fastify plugin that prints all available routes.
- [`fastify-protobufjs`](https://github.com/kenriortega/fastify-protobufjs)
  Fastify and protobufjs, together at last. Uses protobufjs by default.
- [`fastify-qrcode`](https://github.com/chonla/fastify-qrcode) This plugin
  utilizes [qrcode](https://github.com/soldair/node-qrcode) to generate QR Code.
- [`fastify-qs`](https://github.com/webdevium/fastify-qs) A plugin for Fastify
  that adds support for parsing URL query parameters with
  [qs](https://github.com/ljharb/qs).
- [`fastify-racing`](https://github.com/metcoder95/fastify-racing) Fastify's plugin that adds support to handle an aborted request asynchronous.
- [`fastify-raw-body`](https://github.com/Eomm/fastify-raw-body) Add the
  `request.rawBody` field.
- [`fastify-rbac`](https://gitlab.com/m03geek/fastify-rbac) Fastify role-based
  access control plugin.
- [`fastify-recaptcha`](https://github.com/qwertyforce/fastify-recaptcha)
  Fastify plugin for recaptcha verification.
- [`fastify-redis-channels`](https://github.com/hearit-io/fastify-redis-channels)
  A plugin for fast, reliable, and scalable channels implementation based on
  Redis streams.
- [`fastify-register-routes`](https://github.com/israeleriston/fastify-register-routes)
  Plugin to automatically load routes from a specified path and optionally limit
  loaded file names by a regular expression.
- [`fastify-response-time`](https://github.com/lolo32/fastify-response-time) Add
  `X-Response-Time` header at each request for Fastify, in milliseconds.
- [`fastify-response-caching`](https://github.com/codeaholicguy/fastify-response-caching)
  A Fastify plugin for caching the response.
- [`fastify-resty`](https://github.com/FastifyResty/fastify-resty) Fastify-based
  web framework with REST API routes auto-generation for TypeORM entities using
  DI and decorators.
- [`fastify-reverse-routes`](https://github.com/dimonnwc3/fastify-reverse-routes)
  Fastify reverse routes plugin, allows to defined named routes and build path
  using name and parameters.
- [`fastify-rob-config`](https://github.com/jeromemacias/fastify-rob-config)
  Fastify Rob-Config integration.
- [`fastify-route-group`](https://github.com/TakNePoidet/fastify-route-group)
  Convenient grouping and inheritance of routes
- [`fastify-schema-constraint`](https://github.com/Eomm/fastify-schema-constraint)
  Choose the JSON schema to use based on request parameters.
- [`fastify-schema-to-typescript`](https://github.com/thomasthiebaud/fastify-schema-to-typescript)
  Generate typescript types based on your JSON/YAML validation schemas so they
  are always in sync.
- [`fastify-secure-session`](https://github.com/mcollina/fastify-secure-session)
  Create a secure stateless cookie session for Fastify.
- [`fastify-sentry`](https://github.com/alex-ppg/fastify-sentry) Fastify plugin
  to add the Sentry SDK error handler to requests.
- [`fastify-sequelize`](https://github.com/lyquocnam/fastify-sequelize) Fastify
  plugin work with Sequelize (adapter for NodeJS -> Sqlite, Mysql, Mssql,
  Postgres).
- [`fastify-server-session`](https://github.com/jsumners/fastify-server-session)
  A session plugin with support for arbitrary backing caches via
  `fastify-caching`.
- [`fastify-slonik`](https://github.com/Unbuttun/fastify-slonik) Fastify Slonik
  plugin, with this you can use slonik in every part of your server.
- [`fastify-soap-client`](https://github.com/fastify/fastify-soap-client) a SOAP
  client plugin for Fastify.
- [`fastify-socket.io`](https://github.com/alemagio/fastify-socket.io) a
  Socket.io plugin for Fastify.
- [`fastify-split-validator`](https://github.com/MetCoder95/fastify-split-validator) Small plugin to allow you use multiple validators in one route based on each HTTP part of the request.
- [`fastify-sse`](https://github.com/lolo32/fastify-sse) to provide Server-Sent
  Events with `reply.sse( … )` to Fastify.
- [`fastify-sse-v2`](https://github.com/nodefactoryio/fastify-sse-v2) to provide
  Server-Sent Events using Async Iterators (supports newer versions of Fastify).
- [`fastify-stripe`](https://github.com/coopflow/fastify-stripe) Plugin to
  initialize and encapsulate [Stripe
  Node.js](https://github.com/stripe/stripe-node) instances in Fastify.
- [`fastify-supabase`](https://github.com/coopflow/fastify-supabase) Plugin to
  initialize and encapsulate [Supabase](https://github.com/supabase/supabase-js)
  instances in Fastify.
- [`fastify-tls-keygen`](https://gitlab.com/sebdeckers/fastify-tls-keygen)
  Automatically generate a browser-compatible, trusted, self-signed,
  localhost-only, TLS certificate.
- [`fastify-tokenize`](https://github.com/Bowser65/fastify-tokenize)
  [Tokenize](https://github.com/Bowser65/Tokenize) plugin for Fastify that
  removes the pain of managing authentication tokens, with built-in integration
  for `fastify-auth`.
- [`fastify-totp`](https://github.com/heply/fastify-totp) A plugin to handle
  TOTP (e.g. for 2FA).
- [`fastify-twitch-ebs-tools`](https://github.com/lukemnet/fastify-twitch-ebs-tools)
  Useful functions for Twitch Extension Backend Services (EBS).
- [`fastify-typeorm-plugin`](https://github.com/inthepocket/fastify-typeorm-plugin)
  Fastify plugin to work with TypeORM.
- [`fastify-vhost`](https://github.com/patrickpissurno/fastify-vhost) Proxy
  subdomain HTTP requests to another server (useful if you want to point
  multiple subdomains to the same IP address, while running different servers on
  the same machine).
- [`fastify-vite`](https://github.com/galvez/fastify-vite)
  [Vite](https://vitejs.dev/) plugin for Fastify with SSR data support.
- [`fastify-vue-plugin`](https://github.com/TheNoim/fastify-vue)
  [Nuxt.js](https://nuxtjs.org) plugin for Fastify. Control the routes nuxt
  should use.
- [`fastify-wamp-router`](https://github.com/lependu/fastify-wamp-router) Web
  Application Messaging Protocol router for Fastify.
- [`fast-water`](https://github.com/tswayne/fast-water) A Fastify plugin for
  waterline. Decorates Fastify with waterline models.
- [`fastify-webpack-hmr`](https://github.com/lependu/fastify-webpack-hmr)
  Webpack hot module reloading plugin for Fastify.
- [`fastify-webpack-hot`](https://github.com/gajus/fastify-webpack-hot)
  Webpack Hot Module Replacement for Fastify.
- [`fastify-ws`](https://github.com/gj/fastify-ws) WebSocket integration for
  Fastify — with support for WebSocket lifecycle hooks instead of a single
  handler function. Built upon [ws](https://github.com/websockets/ws) and
  [uws](https://github.com/uNetworking/uWebSockets).
- [`fastify-xml-body-parser`](https://github.com/NaturalIntelligence/fastify-xml-body-parser)
  Parse XML payload / request body into JS / JSON object.
- [`fastify-xray`](https://github.com/jeromemacias/fastify-xray) Fastify plugin
  for AWS XRay recording.
- [`i18next-http-middleware`](https://github.com/i18next/i18next-http-middleware#fastify-usage)
  An [i18next](https://www.i18next.com) based i18n (internationalization)
  middleware to be used with Node.js web frameworks like Express or Fastify and
  also for Deno.
- [`k-fastify-gateway`](https://github.com/jkyberneees/fastify-gateway) API
  Gateway plugin for Fastify, a low footprint implementation that uses the
  `fastify-reply-from` HTTP proxy library.
- [`mercurius`](https://mercurius.dev/) A fully-featured and performant GraphQL
  server implementation for Fastify.
- [`nstats`](https://github.com/Phara0h/nstats) A fast and compact way to get
  all your network and process stats for your node application. Websocket,
  HTTP/S, and prometheus compatible!
- [`oas-fastify`](https://github.com/ahmadnassri/node-oas-fastify) OAS 3.x to
  Fastify routes automation. Automatically generates route handlers with fastify
  configuration and validation.
- [`openapi-validator-middleware`](https://github.com/PayU/openapi-validator-middleware#fastify)
  Swagger and OpenAPI 3.0 spec-based request validation middleware that supports
  Fastify.
- [`sequelize-fastify`](https://github.com/hsynlms/sequelize-fastify) A simple
  and lightweight Sequelize plugin for Fastify.

#### [Community Tools](#community-tools)
- [`fast-maker`](https://github.com/imjuni/fast-maker) route configuration generator by 
  directory structure.

## Fluent Schema

The [Validation and
Serialization](../Reference/Validation-and-Serialization.md) documentation
outlines all parameters accepted by Fastify to set up JSON Schema Validation to
validate the input, and JSON Schema Serialization to optimize the output.

[`fluent-json-schema`](https://github.com/fastify/fluent-json-schema) can be
used to simplify this task while allowing the reuse of constants.

### Basic settings

```js
const S = require('fluent-json-schema')

// You can have an object like this, or query a DB to get the values
const MY_KEYS = {
  KEY1: 'ONE',
  KEY2: 'TWO'
}

const bodyJsonSchema = S.object()
  .prop('someKey', S.string())
  .prop('someOtherKey', S.number())
  .prop('requiredKey', S.array().maxItems(3).items(S.integer()).required())
  .prop('nullableKey', S.mixed([S.TYPES.NUMBER, S.TYPES.NULL]))
  .prop('multipleTypesKey', S.mixed([S.TYPES.BOOLEAN, S.TYPES.NUMBER]))
  .prop('multipleRestrictedTypesKey', S.oneOf([S.string().maxLength(5), S.number().minimum(10)]))
  .prop('enumKey', S.enum(Object.values(MY_KEYS)))
  .prop('notTypeKey', S.not(S.array()))

const queryStringJsonSchema = S.object()
  .prop('name', S.string())
  .prop('excitement', S.integer())

const paramsJsonSchema = S.object()
  .prop('par1', S.string())
  .prop('par2', S.integer())

const headersJsonSchema = S.object()
  .prop('x-foo', S.string().required())

// Note that there is no need to call `.valueOf()`!
const schema = {
  body: bodyJsonSchema,
  querystring: queryStringJsonSchema, // (or) query: queryStringJsonSchema
  params: paramsJsonSchema,
  headers: headersJsonSchema
}

fastify.post('/the/url', { schema }, handler)
```

### Reuse

With `fluent-json-schema` you can manipulate your schemas more easily and
programmatically and then reuse them thanks to the `addSchema()` method. You can
refer to the schema in two different manners that are detailed in the
[Validation and
Serialization](../Reference/Validation-and-Serialization.md#adding-a-shared-schema)
documentation.

Here are some usage examples:

**`$ref-way`**: refer to an external schema.

```js
const addressSchema = S.object()
  .id('#address')
  .prop('line1').required()
  .prop('line2')
  .prop('country').required()
  .prop('city').required()
  .prop('zipcode').required()

const commonSchemas = S.object()
  .id('https://fastify/demo')
  .definition('addressSchema', addressSchema)
  .definition('otherSchema', otherSchema) // You can add any schemas you need

fastify.addSchema(commonSchemas)

const bodyJsonSchema = S.object()
  .prop('residence', S.ref('https://fastify/demo#address')).required()
  .prop('office', S.ref('https://fastify/demo#/definitions/addressSchema')).required()

const schema = { body: bodyJsonSchema }

fastify.post('/the/url', { schema }, handler)
```


**`replace-way`**: refer to a shared schema to replace before the validation
process.

```js
const sharedAddressSchema = {
  $id: 'sharedAddress',
  type: 'object',
  required: ['line1', 'country', 'city', 'zipcode'],
  properties: {
    line1: { type: 'string' },
    line2: { type: 'string' },
    country: { type: 'string' },
    city: { type: 'string' },
    zipcode: { type: 'string' }
  }
}
fastify.addSchema(sharedAddressSchema)

const bodyJsonSchema = {
  type: 'object',
  properties: {
    vacation: 'sharedAddress#'
  }
}

const schema = { body: bodyJsonSchema }

fastify.post('/the/url', { schema }, handler)
```

NB You can mix up the `$ref-way` and the `replace-way` when using
`fastify.addSchema`.

## Getting Started

Hello! Thank you for checking out Fastify!

This document aims to be a gentle introduction to the framework and its
features. It is an elementary preface with examples and links to other parts of
the documentation.

Let's start!

### Install
<a id="install"></a>

Install with npm:
```
npm i fastify
```
Install with yarn:
```
yarn add fastify
```

### Your first server
<a id="first-server"></a>

Let's write our first server:
```js
// Require the framework and instantiate it

// ESM
import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})
// CommonJs
const fastify = require('fastify')({
  logger: true
})

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
```

Do you prefer to use `async/await`? Fastify supports it out-of-the-box.

```js
// ESM
import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})
// CommonJs
const fastify = require('fastify')({
  logger: true
})

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
```

Awesome, that was easy.

Unfortunately, writing a complex application requires significantly more code
than this example. A classic problem when you are building a new application is
how to handle multiple files, asynchronous bootstrapping, and the architecture
of your code.

Fastify offers an easy platform that helps to solve all of the problems outlined
above, and more!

> ## Note
> The above examples, and subsequent examples in this document, default to
> listening *only* on the localhost `127.0.0.1` interface. To listen on all
> available IPv4 interfaces the example should be modified to listen on
> `0.0.0.0` like so:
>
> ```js
> fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err, address) {
>   if (err) {
>     fastify.log.error(err)
>     process.exit(1)
>   }
>   fastify.log.info(`server listening on ${address}`)
> })
> ```
>
> Similarly, specify `::1` to accept only local connections via IPv6. Or specify
> `::` to accept connections on all IPv6 addresses, and, if the operating system
> supports it, also on all IPv4 addresses.
>
> When deploying to a Docker (or another type of) container using `0.0.0.0` or
> `::` would be the easiest method for exposing the application.

### Your first plugin
<a id="first-plugin"></a>

As with JavaScript, where everything is an object, with Fastify everything is a
plugin.

Before digging into it, let's see how it works!

Let's declare our basic server, but instead of declaring the route inside the
entry point, we'll declare it in an external file (check out the [route
declaration](../Reference/Routes.md) docs).
```js
// ESM
import Fastify from 'fastify'
import firstRoute from './our-first-route'
/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
  logger: true
})

fastify.register(firstRoute)

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
```

```js
// CommonJs
/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = require('fastify')({
  logger: true
})

fastify.register(require('./our-first-route'))

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
```

```js
// our-first-route.js

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes (fastify, options) {
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })
}

module.exports = routes
```
In this example, we used the `register` API, which is the core of the Fastify
framework. It is the only way to add routes, plugins, et cetera.

At the beginning of this guide, we noted that Fastify provides a foundation that
assists with asynchronous bootstrapping of your application. Why is this
important?

Consider the scenario where a database connection is needed to handle data
storage. The database connection needs to be available before the server is
accepting connections. How do we address this problem?

A typical solution is to use a complex callback, or promises - a system that
will mix the framework API with other libraries and the application code.

Fastify handles this internally, with minimum effort!

Let's rewrite the above example with a database connection.


First, install `fastify-plugin` and `@fastify/mongodb`:

```
npm i fastify-plugin @fastify/mongodb
```

**server.js**
```js
// ESM
import Fastify from 'fastify'
import dbConnector from './our-db-connector'
import firstRoute from './our-first-route'

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
  logger: true
})
fastify.register(dbConnector)
fastify.register(firstRoute)

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
```

```js
// CommonJs
/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = require('fastify')({
  logger: true
})

fastify.register(require('./our-db-connector'))
fastify.register(require('./our-first-route'))

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})

```

**our-db-connector.js**
```js
// ESM
import fastifyPlugin from 'fastify-plugin'
import fastifyMongo from '@fastify/mongodb'

/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function dbConnector (fastify, options) {
  fastify.register(fastifyMongo, {
    url: 'mongodb://localhost:27017/test_database'
  })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(dbConnector)

```

```js
// CommonJs
/**
 * @type {import('fastify-plugin').FastifyPlugin}
 */
const fastifyPlugin = require('fastify-plugin')


/**
 * Connects to a MongoDB database
 * @param {FastifyInstance} fastify Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function dbConnector (fastify, options) {
  fastify.register(require('@fastify/mongodb'), {
    url: 'mongodb://localhost:27017/test_database'
  })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(dbConnector)

```

**our-first-route.js**
```js
/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes (fastify, options) {
  const collection = fastify.mongo.db.collection('test_collection')

  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

  fastify.get('/animals', async (request, reply) => {
    const result = await collection.find().toArray()
    if (result.length === 0) {
      throw new Error('No documents found')
    }
    return result
  })

  fastify.get('/animals/:animal', async (request, reply) => {
    const result = await collection.findOne({ animal: request.params.animal })
    if (!result) {
      throw new Error('Invalid value')
    }
    return result
  })

  const animalBodyJsonSchema = {
    type: 'object',
    required: ['animal'],
    properties: {
      animal: { type: 'string' },
    },
  }

  const schema = {
    body: animalBodyJsonSchema,
  }

  fastify.post('/animals', { schema }, async (request, reply) => {
    // we can use the `request.body` object to get the data sent by the client
    const result = await collection.insertOne({ animal: request.body.animal })
    return result
  })
}

module.exports = routes
```

Wow, that was fast!

Let's recap what we have done here since we've introduced some new concepts.

As you can see, we used `register` for both the database connector and the
registration of the routes.

This is one of the best features of Fastify, it will load your plugins in the
same order you declare them, and it will load the next plugin only once the
current one has been loaded. In this way, we can register the database connector
in the first plugin and use it in the second *(read
[here](../Reference/Plugins.md#handle-the-scope) to understand how to handle the
scope of a plugin)*.

Plugin loading starts when you call `fastify.listen()`, `fastify.inject()` or
`fastify.ready()`

The MongoDB plugin uses the `decorate` API to add custom objects to the Fastify
instance, making them available for use everywhere. Use of this API is
encouraged to facilitate easy code reuse and to decrease code or logic
duplication.

To dig deeper into how Fastify plugins work, how to develop new plugins, and for
details on how to use the whole Fastify API to deal with the complexity of
asynchronously bootstrapping an application, read [the hitchhiker's guide to
plugins](./Plugins-Guide.md).

### Loading order of your plugins
<a id="plugin-loading-order"></a>

To guarantee consistent and predictable behavior of your application, we highly
recommend to always load your code as shown below:
```
└── plugins (from the Fastify ecosystem)
└── your plugins (your custom plugins)
└── decorators
└── hooks
└── your services
```
In this way, you will always have access to all of the properties declared in
the current scope.

As discussed previously, Fastify offers a solid encapsulation model, to help you
build your application as single and independent services. If you want to
register a plugin only for a subset of routes, you just have to replicate the
above structure.
```
└── plugins (from the Fastify ecosystem)
└── your plugins (your custom plugins)
└── decorators
└── hooks
└── your services
    │
    └──  service A
    │     └── plugins (from the Fastify ecosystem)
    │     └── your plugins (your custom plugins)
    │     └── decorators
    │     └── hooks
    │     └── your services
    │
    └──  service B
          └── plugins (from the Fastify ecosystem)
          └── your plugins (your custom plugins)
          └── decorators
          └── hooks
          └── your services
```

### Validate your data
<a id="validate-data"></a>

Data validation is extremely important and a core concept of the framework.

To validate incoming requests, Fastify uses [JSON
Schema](https://json-schema.org/).

(JTD schemas are loosely supported, but `jsonShorthand` must be disabled first)

Let's look at an example demonstrating validation for routes:
```js
/**
 * @type {import('fastify').RouteShorthandOptions}
 * @const
 */
const opts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        someKey: { type: 'string' },
        someOtherKey: { type: 'number' }
      }
    }
  }
}

fastify.post('/', opts, async (request, reply) => {
  return { hello: 'world' }
})
```
This example shows how to pass an options object to the route, which accepts a
`schema` key that contains all of the schemas for route, `body`, `querystring`,
`params`, and `headers`.

Read [Validation and
Serialization](../Reference/Validation-and-Serialization.md) to learn more.

### Serialize your data
<a id="serialize-data"></a>

Fastify has first-class support for JSON. It is extremely optimized to parse
JSON bodies and serialize JSON output.

To speed up JSON serialization (yes, it is slow!) use the `response` key of the
schema option as shown in the following example:
```js
/**
 * @type {import('fastify').RouteShorthandOptions}
 * @const
 */
const opts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  }
}

fastify.get('/', opts, async (request, reply) => {
  return { hello: 'world' }
})
```
By specifying a schema as shown, you can speed up serialization by a factor of
2-3. This also helps to protect against leakage of potentially sensitive data,
since Fastify will serialize only the data present in the response schema. Read
[Validation and Serialization](../Reference/Validation-and-Serialization.md) to
learn more.

### Parsing request payloads
<a id="request-payload"></a>

Fastify parses `'application/json'` and `'text/plain'` request payloads
natively, with the result accessible from the [Fastify
request](../Reference/Request.md) object at `request.body`.

The following example returns the parsed body of a request back to the client:

```js
/**
 * @type {import('fastify').RouteShorthandOptions}
 */
const opts = {}
fastify.post('/', opts, async (request, reply) => {
  return request.body
})
```

Read [Content-Type Parser](../Reference/ContentTypeParser.md) to learn more
about Fastify's default parsing functionality and how to support other content
types.

### Extend your server
<a id="extend-server"></a>

Fastify is built to be extremely extensible and minimal, we believe that a
bare-bones framework is all that is necessary to make great applications
possible.

In other words, Fastify is not a "batteries included" framework, and relies on
an amazing [ecosystem](./Ecosystem.md)!

### Test your server
<a id="test-server"></a>

Fastify does not offer a testing framework, but we do recommend a way to write
your tests that uses the features and architecture of Fastify.

Read the [testing](./Testing.md) documentation to learn more!

### Run your server from CLI
<a id="cli"></a>

Fastify also has CLI integration thanks to
[fastify-cli](https://github.com/fastify/fastify-cli).

First, install `fastify-cli`:

```
npm i fastify-cli
```

You can also install it globally with `-g`.

Then, add the following lines to `package.json`:
```json
{
  "scripts": {
    "start": "fastify start server.js"
  }
}
```

And create your server file(s):
```js
// server.js
'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })
}
```

Then run your server with:
```bash
npm start
```

### Slides and Videos
<a id="slides"></a>

- Slides
  - [Take your HTTP server to ludicrous
    speed](https://mcollina.github.io/take-your-http-server-to-ludicrous-speed)
    by [@mcollina](https://github.com/mcollina)
  - [What if I told you that HTTP can be
    fast](https://delvedor.github.io/What-if-I-told-you-that-HTTP-can-be-fast)
    by [@delvedor](https://github.com/delvedor)

- Videos
  - [Take your HTTP server to ludicrous
    speed](https://www.youtube.com/watch?v=5z46jJZNe8k) by
    [@mcollina](https://github.com/mcollina)
  - [What if I told you that HTTP can be
    fast](https://www.webexpo.net/prague2017/talk/what-if-i-told-you-that-http-can-be-fast/)
    by [@delvedor](https://github.com/delvedor)

# The hitchhiker's guide to plugins
First of all, `DON'T PANIC`!

Fastify was built from the beginning to be an extremely modular system. We built
a powerful API that allows you to add methods and utilities to Fastify by
creating a namespace. We built a system that creates an encapsulation model,
which allows you to split your application into multiple microservices at any
moment, without the need to refactor the entire application.

**Table of contents**
- [The hitchhiker's guide to plugins](#the-hitchhikers-guide-to-plugins)
  - [Register](#register)
  - [Decorators](#decorators)
  - [Hooks](#hooks)
  - [How to handle encapsulation and
    distribution](#how-to-handle-encapsulation-and-distribution)
  - [ESM support](#esm-support)
  - [Handle errors](#handle-errors)
  - [Custom errors](#custom-errors)
  - [Emit Warnings](#emit-warnings)
  - [Let's start!](#lets-start)

## Register
<a id="register"></a>

As with JavaScript, where everything is an object, in Fastify everything is a
plugin.

Your routes, your utilities, and so on are all plugins. To add a new plugin,
whatever its functionality may be, in Fastify you have a nice and unique API:
[`register`](../Reference/Plugins.md).
```js
fastify.register(
  require('./my-plugin'),
  { options }
)
```
`register` creates a new Fastify context, which means that if you perform any
changes on the Fastify instance, those changes will not be reflected in the
context's ancestors. In other words, encapsulation!

*Why is encapsulation important?*

Well, let's say you are creating a new disruptive startup, what do you do? You
create an API server with all your stuff, everything in the same place, a
monolith!

Ok, you are growing very fast and you want to change your architecture and try
microservices. Usually, this implies a huge amount of work, because of cross
dependencies and a lack of separation of concerns in the codebase.

Fastify helps you in that regard. Thanks to the encapsulation model, it will
completely avoid cross dependencies and will help you structure your code into
cohesive blocks.

*Let's return to how to correctly use `register`.*

As you probably know, the required plugins must expose a single function with
the following signature
```js
module.exports = function (fastify, options, done) {}
```
Where `fastify` is the encapsulated Fastify instance, `options` is the options
object, and `done` is the function you **must** call when your plugin is ready.

Fastify's plugin model is fully reentrant and graph-based, it handles
asynchronous code without any problems and it enforces both the load and close
order of plugins. *How?* Glad you asked, check out
[`avvio`](https://github.com/mcollina/avvio)! Fastify starts loading the plugin
__after__ `.listen()`, `.inject()` or `.ready()` are called.

Inside a plugin you can do whatever you want, register routes, utilities (we
will see this in a moment) and do nested registers, just remember to call `done`
when everything is set up!
```js
module.exports = function (fastify, options, done) {
  fastify.get('/plugin', (request, reply) => {
    reply.send({ hello: 'world' })
  })

  done()
}
```

Well, now you know how to use the `register` API and how it works, but how do we
add new functionality to Fastify and even better, share them with other
developers?

## Decorators
<a id="decorators"></a>

Okay, let's say that you wrote a utility that is so good that you decided to
make it available along with all your code. How would you do it? Probably
something like the following:
```js
// your-awesome-utility.js
module.exports = function (a, b) {
  return a + b
}
```
```js
const util = require('./your-awesome-utility')
console.log(util('that is ', 'awesome'))
```
Now you will import your utility in every file you need it in. (And do not
forget that you will probably also need it in your tests).

Fastify offers you a more elegant and comfortable way to do this, *decorators*.
Creating a decorator is extremely easy, just use the
[`decorate`](../Reference/Decorators.md) API:
```js
fastify.decorate('util', (a, b) => a + b)
```
Now you can access your utility just by calling `fastify.util` whenever you need
it - even inside your test.

And here starts the magic; do you remember how just now we were talking about
encapsulation? Well, using `register` and `decorate` in conjunction enable
exactly that, let me show you an example to clarify this:
```js
fastify.register((instance, opts, done) => {
  instance.decorate('util', (a, b) => a + b)
  console.log(instance.util('that is ', 'awesome'))

  done()
})

fastify.register((instance, opts, done) => {
  console.log(instance.util('that is ', 'awesome')) // This will throw an error

  done()
})
```
Inside the second register call `instance.util` will throw an error because
`util` exists only inside the first register context.

Let's step back for a moment and dig deeper into this: every time you use the
`register` API, a new context is created which avoids the negative situations
mentioned above.

Do note that encapsulation applies to the ancestors and siblings, but not the
children.
```js
fastify.register((instance, opts, done) => {
  instance.decorate('util', (a, b) => a + b)
  console.log(instance.util('that is ', 'awesome'))

  fastify.register((instance, opts, done) => {
    console.log(instance.util('that is ', 'awesome')) // This will not throw an error
    done()
  })

  done()
})

fastify.register((instance, opts, done) => {
  console.log(instance.util('that is ', 'awesome')) // This will throw an error

  done()
})
```
*Take home message: if you need a utility that is available in every part of
your application, take care that it is declared in the root scope of your
application. If that is not an option,  you can use the `fastify-plugin` utility
as described [here](#distribution).*

`decorate` is not the only API that you can use to extend the server
functionality, you can also use `decorateRequest` and `decorateReply`.

*`decorateRequest` and `decorateReply`? Why do we need them if we already have
`decorate`?*

Good question, we added them to make Fastify more developer-friendly. Let's see
an example:
```js
fastify.decorate('html', payload => {
  return generateHtml(payload)
})

fastify.get('/html', (request, reply) => {
  reply
    .type('text/html')
    .send(fastify.html({ hello: 'world' }))
})
```
It works, but it could be much better!
```js
fastify.decorateReply('html', function (payload) {
  this.type('text/html') // This is the 'Reply' object
  this.send(generateHtml(payload))
})

fastify.get('/html', (request, reply) => {
  reply.html({ hello: 'world' })
})
```

In the same way you can do this for the `request` object:
```js
fastify.decorate('getHeader', (req, header) => {
  return req.headers[header]
})

fastify.addHook('preHandler', (request, reply, done) => {
  request.isHappy = fastify.getHeader(request.raw, 'happy')
  done()
})

fastify.get('/happiness', (request, reply) => {
  reply.send({ happy: request.isHappy })
})
```
Again, it works, but it can be much better!
```js
fastify.decorateRequest('setHeader', function (header) {
  this.isHappy = this.headers[header]
})

fastify.decorateRequest('isHappy', false) // This will be added to the Request object prototype, yay speed!

fastify.addHook('preHandler', (request, reply, done) => {
  request.setHeader('happy')
  done()
})

fastify.get('/happiness', (request, reply) => {
  reply.send({ happy: request.isHappy })
})
```

We have seen how to extend server functionality and how to handle the
encapsulation system, but what if you need to add a function that must be
executed whenever the server "[emits](../Reference/Lifecycle.md)" an
event?

## Hooks
<a id="hooks"></a>

You just built an amazing utility, but now you need to execute that for every
request, this is what you will likely do:
```js
fastify.decorate('util', (request, key, value) => { request[key] = value })

fastify.get('/plugin1', (request, reply) => {
  fastify.util(request, 'timestamp', new Date())
  reply.send(request)
})

fastify.get('/plugin2', (request, reply) => {
  fastify.util(request, 'timestamp', new Date())
  reply.send(request)
})
```
I think we all agree that this is terrible. Repeated code, awful readability and
it cannot scale.

So what can you do to avoid this annoying issue? Yes, you are right, use a
[hook](../Reference/Hooks.md)!

```js
fastify.decorate('util', (request, key, value) => { request[key] = value })

fastify.addHook('preHandler', (request, reply, done) => {
  fastify.util(request, 'timestamp', new Date())
  done()
})

fastify.get('/plugin1', (request, reply) => {
  reply.send(request)
})

fastify.get('/plugin2', (request, reply) => {
  reply.send(request)
})
```
Now for every request, you will run your utility. You can register as many hooks
as you need.

Sometimes you want a hook that should be executed for just a subset of routes,
how can you do that? Yep, encapsulation!

```js
fastify.register((instance, opts, done) => {
  instance.decorate('util', (request, key, value) => { request[key] = value })

  instance.addHook('preHandler', (request, reply, done) => {
    instance.util(request, 'timestamp', new Date())
    done()
  })

  instance.get('/plugin1', (request, reply) => {
    reply.send(request)
  })

  done()
})

fastify.get('/plugin2', (request, reply) => {
  reply.send(request)
})
```
Now your hook will run just for the first route!

As you probably noticed by now, `request` and `reply` are not the standard
Nodejs *request* and *response* objects, but Fastify's objects.


## How to handle encapsulation and distribution
<a id="distribution"></a>

Perfect, now you know (almost) all of the tools that you can use to extend
Fastify. Nevertheless, chances are that you came across one big issue: how is
distribution handled?

The preferred way to distribute a utility is to wrap all your code inside a
`register`. Using this, your plugin can support asynchronous bootstrapping
*(since `decorate` is a synchronous API)*, in the case of a database connection
for example.

*Wait, what? Didn't you tell me that `register` creates an encapsulation and
that the stuff I create inside will not be available outside?*

Yes, I said that. However, what I didn't tell you is that you can tell Fastify
to avoid this behavior with the
[`fastify-plugin`](https://github.com/fastify/fastify-plugin) module.
```js
const fp = require('fastify-plugin')
const dbClient = require('db-client')

function dbPlugin (fastify, opts, done) {
  dbClient.connect(opts.url, (err, conn) => {
    fastify.decorate('db', conn)
    done()
  })
}

module.exports = fp(dbPlugin)
```
You can also tell `fastify-plugin` to check the installed version of Fastify, in
case you need a specific API.

As we mentioned earlier, Fastify starts loading its plugins __after__
`.listen()`, `.inject()` or `.ready()` are called and as such, __after__ they
have been declared. This means that, even though the plugin may inject variables
to the external Fastify instance via [`decorate`](../Reference/Decorators.md),
the decorated variables will not be accessible before calling `.listen()`,
`.inject()` or `.ready()`.

In case you rely on a variable injected by a preceding plugin and want to pass
that in the `options` argument of `register`, you can do so by using a function
instead of an object:
```js
const fastify = require('fastify')()
const fp = require('fastify-plugin')
const dbClient = require('db-client')

function dbPlugin (fastify, opts, done) {
  dbClient.connect(opts.url, (err, conn) => {
    fastify.decorate('db', conn)
    done()
  })
}

fastify.register(fp(dbPlugin), { url: 'https://example.com' })
fastify.register(require('your-plugin'), parent => {
  return { connection: parent.db, otherOption: 'foo-bar' }
})
```
In the above example, the `parent` variable of the function passed in as the
second argument of `register` is a copy of the **external Fastify instance**
that the plugin was registered at. This means that we can access any
variables that were injected by preceding plugins in the order of declaration.

## ESM support
<a id="esm-support"></a>

ESM is supported as well from [Node.js
`v13.3.0`](https://nodejs.org/api/esm.html) and above! Just export your plugin
as ESM module and you are good to go!

```js
// plugin.mjs
async function plugin (fastify, opts) {
  fastify.get('/', async (req, reply) => {
    return { hello: 'world' }
  })
}

export default plugin
```
__Note__: Fastify does not support named imports within an ESM context. Instead,
the `default` export is available.

```js
// server.mjs
import Fastify from 'fastify'

const fastify = Fastify()

///...

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
```

## Handle errors
<a id="handle-errors"></a>

One of your plugins may fail during startup. Maybe you expect it
and you have a custom logic that will be triggered in that case. How can you
implement this? The `after` API is what you need. `after` simply registers a
callback that will be executed just after a register, and it can take up to
three parameters.

The callback changes based on the parameters you are giving:

1. If no parameter is given to the callback and there is an error, that error
   will be passed to the next error handler.
1. If one parameter is given to the callback, that parameter will be the error
   object.
1. If two parameters are given to the callback, the first will be the error
   object; the second will be the done callback.
1. If three parameters are given to the callback, the first will be the error
   object, the second will be the top-level context unless you have specified
   both server and override, in that case, the context will be what the override
   returns, and the third the done callback.

Let's see how to use it:
```js
fastify
  .register(require('./database-connector'))
  .after(err => {
    if (err) throw err
  })
```

## Custom errors
<a id="custom-errors"></a>

If your plugin needs to expose custom errors, you can easily generate consistent
error objects across your codebase and plugins with the
[`@fastify/error`](https://github.com/fastify/fastify-error) module.

```js
const createError = require('@fastify/error')
const CustomError = createError('ERROR_CODE', 'message')
console.log(new CustomError())
```

## Emit Warnings
<a id="emit-warnings"></a>

If you want to deprecate an API, or you want to warn the user about a specific
use case, you can use the
[`fastify-warning`](https://github.com/fastify/fastify-warning) module.

```js
const warning = require('fastify-warning')()
warning.create('FastifyDeprecation', 'FST_ERROR_CODE', 'message')
warning.emit('FST_ERROR_CODE')
```

## Let's start!
<a id="start"></a>

Awesome, now you know everything you need to know about Fastify and its plugin
system to start building your first plugin, and please if you do, tell us! We
will add it to the [*ecosystem*](https://github.com/fastify/fastify#ecosystem)
section of our documentation!

If you want to see some real-world examples, check out:
- [`point-of-view`](https://github.com/fastify/point-of-view) Templates
  rendering (*ejs, pug, handlebars, marko*) plugin support for Fastify.
- [`@fastify/mongodb`](https://github.com/fastify/fastify-mongodb) Fastify
  MongoDB connection plugin, with this you can share the same MongoDB connection
  pool in every part of your server.
- [`@fastify/multipart`](https://github.com/fastify/fastify-multipart) Multipart
  support for Fastify
- [`@fastify/helmet`](https://github.com/fastify/fastify-helmet) Important
  security headers for Fastify


*Do you feel like something is missing here? Let us know! :)*

## A Tale of (prototype) Poisoning

This story is a behind-the-scenes look at the process and drama created by a
particularity interesting web security issue. It is also a perfect illustration
of the efforts required to maintain popular pieces of open source software and
the limitations of existing communication channels.

But first, if you use a JavaScript framework to process incoming JSON data, take
a moment to read up on [Prototype
Poisoning](https://medium.com/intrinsic/javascript-prototype-poisoning-vulnerabilities-in-the-wild-7bc15347c96)
in general, and the specific [technical
details](https://github.com/hapijs/hapi/issues/3916) of this issue. I'll explain
it all in a bit, but since this could be a critical issue, you might want to
verify your own code first. While this story is focused on a specific framework,
any solution that uses `JSON.parse()` to process external data is potentially at
risk.

### BOOM
<a id="pp-boom"></a>

Our story begins with a bang.

The engineering team at Lob (long time generous supporters of my work!) reported
a critical security vulnerability they identified in our data validation
module — [joi](https://github.com/hapijs/joi). They provided some technical
details and a proposed solution.

The main purpose of a data validation library is to ensure the output fully
complies with the rules defined. If it doesn't, validation fails. If it passes,
your can blindly trust that the data you are working with is safe. In fact, most
developers treat validated input as completely safe from a system integrity
perspective. This is crucial.

In our case, the Lob team provided an example where some data was able to sneak
by the validation logic and pass through undetected. This is the worst possible
defect a validation library can have.

### Prototype in a nutshell
<a id="pp-nutshell"></a>

To understand this story, you need to understand how JavaScript works a bit.
Every object in JavaScript can have a prototype. It is a set of methods and
properties it "inherits" from another object. I put inherits in quotes because
JavaScript isn't really an object oriented language.

A long time ago, for a bunch of irrelevant reasons, someone decided that it
would be a good idea to use the special property name `__proto__` to access (and
set) an object's prototype. This has since been deprecated but nevertheless,
fully supported.

To demonstrate:

```
> const a = { b: 5 };
> a.b;
5
> a.__proto__ = { c: 6 };
> a.c;
6
> a;
{ b: 5 }
```

As you can see, the object doesn't have a `c` property, but its prototype does.
When validating the object, the validation library ignores the prototype and
only validates the object's own properties. This allows `c` to sneak in via the
prototype.

Another important part of this story is the way `JSON.parse()` — a utility
provided by the language to convert JSON formatted text into objects  —  handles
this magic `__proto__` property name.

```
> const text = '{ "b": 5, "__proto__": { "c": 6 } }';
> const a = JSON.parse(text);
> a;
{ b: 5, __proto__: { c: 6 } }
```

Notice how `a` has a `__proto__` property. This is not a prototype reference. It
is a simple object property key, just like `b`. As we've seen from the first
example, we can't actually create this key through assignment as that invokes
the prototype magic and sets an actual prototype. `JSON.parse()` however, sets a
simple property with that poisonous name.

By itself, the object created by `JSON.parse()` is perfectly safe. It doesn't
have a prototype of its own. It has a seemingly harmless property that just
happens to overlap with a built-in JavaScript magic name.

However, other methods are not as lucky:

```
> const x = Object.assign({}, a);
> x;
{ b: 5}
> x.c;
6;
```

If we take the `a` object created earlier by `JSON.parse()` and pass it to the
helpful `Object.assign()` method (used to perform a shallow copy of all the top
level properties of `a` into the provided empty `{}` object), the magic
`__proto__` property "leaks" and becomes `x` 's actual prototype.

Surprise!

Put together, if you get some external text input, parse it with `JSON.parse()`
then perform some simple manipulation of that object (say, shallow clone and add
an `id` ), and then pass it to our validation library, anything passed through
via `__proto__` would sneak in undetected.

### Oh joi!
<a id="pp-oh-joi"></a>

The first question is, of course, why does the validation module **joi** ignore
the prototype and let potentially harmful data through? We asked ourselves the
same question and our instant thought was "it was an oversight". A bug. A really
big mistake. The joi module should not have allowed this to happen. But…

While joi is used primarily for validating web input data, it also has a
significant user base using it to validate internal objects, some of which have
prototypes. The fact that joi ignores the prototype is a helpful "feature". It
allows validating the object's own properties while ignoring what could be a
very complicated prototype structure (with many methods and literal properties).

Any solution at the joi level would mean breaking some currently working code.

### The right thing
<a id="pp-right-thing"></a>

At this point, we were looking at a devastatingly bad security vulnerability.
Right up there in the upper echelons of epic security failures. All we knew is
that our extremely popular data validation library fails to block harmful data,
and that this data is trivial to sneak through. All you need to do is add
`__proto__` and some crap to a JSON input and send it on its way to an
application built using our tools.

(Dramatic pause)

We knew we had to fix joi to prevent this but given the scale of this issue, we
had to do it in a way that will put a fix out without drawing too much attention
to it — without making it too easy to exploit — at least for a few days until
most systems received the update.

Sneaking a fix isn't the hardest thing to accomplish. If you combine it with an
otherwise purposeless refactor of the code, and throw in a few unrelated bug
fixes and maybe a cool new feature, you can publish a new version without
drawing attention to the real issue being fixed.

The problem was, the right fix was going to break valid use cases. You see, joi
has no way of knowing if you want it to ignore the prototype you set, or block
the prototype set by an attacker. A solution that fixes the exploit will break
code and breaking code tends to get a lot of attention.

On the other hand, if we released a proper ([semantically
versioned](https://semver.org/)) fix, mark it as a breaking change, and add a
new API to explicitly tell joi what you want it to do with the prototype, we
will share with the world how to exploit this vulnerability while also making it
more time consuming for systems to upgrade (breaking changes never get applied
automatically by build tools).

Lose — Lose.

### A detour
<a id="pp-detour"></a>

While the issue at hand was about incoming request payloads, we had to pause and
check if it could also impact data coming via the query string, cookies, and
headers. Basically, anything that gets serialized into objects from text.

We quickly confirmed node default query string parser was fine as well as its
header parser. I identified one potential issue with base64-encoded JSON cookies
as well as the usage of custom query string parsers. We also wrote some tests to
confirm that the most popular third-party query string parser  —
[qs](https://www.npmjs.com/package/qs) —  was not vulnerable (it is not!).

### A development
<a id="pp-a-development"></a>

Throughout this triage, we just assumed that the offending input with its
poisoned prototype was coming into joi from hapi, the web framework connecting
the hapi.js ecosystem. Further investigation by the Lob team found that the
problem was a bit more nuanced.

hapi used `JSON.parse()` to process incoming data. It first set the result
object as a `payload` property of the incoming request, and then passed that
same object for validation by joi before being passed to the application
business logic for processing. Since `JSON.parse()` doesn't actually leak the
`__proto__` property, it would arrive to joi with an invalid key and fail
validation.

However, hapi provides two extension points where the payload data can be
inspected (and processed) prior to validation. It is all properly documented and
well understood by most developers. The extension points are there to allow you
to interact with the raw inputs prior to validation for legitimate (and often
security related) reasons.

If during one of these two extension points, a developer used `Object.assign()`
or a similar method on the payload, the `__proto__` property would leak and
become an actual prototype.

### Sigh of relief
<a id="pp-sigh-of-relief"></a>

We were now dealing with a much different level of awfulness. Manipulating the
payload object prior to validation is not common which meant this was no longer
a doomsday scenario. It was still potentially catastrophic but the exposure
dropped from every joi user to some very specific implementations.

We were no longer looking at a secretive joi release. The issue in joi is still
there, but we can now address it properly with a new API and breaking release
over the next few weeks.

We also knew that we can easily mitigate this vulnerability at the framework
level since it knows which data is coming from the outside and which is
internally generated. The framework is really the only piece that can protect
developers against making such unexpected mistakes.

### Good news, bad news, no news?
<a id="pp-good-news-no-news"></a>

The good news was that this wasn't our fault. It wasn't a bug in hapi or joi. It
was only possible through a complex combination of actions that was not unique
to hapi or joi. This can happen with every other JavaScript framework. If hapi
is broken, then the world is broken.

Great — we solved the blame game.

The bad news is that when there is nothing to blame (other than JavaScript
itself), it is much harder getting it fixed.

The first question people ask once a security issue is found is if there is
going to be a CVE published. A CVE — Common Vulnerabilities and Exposures — is a
[database](https://cve.mitre.org/) of known security issues. It is a critical
component of web security. The benefit of publishing a CVE is that it
immediately triggers alarms and informs and often breaks automated builds until
the issue is resolved.

But what do we pin this to?

Probably, nothing. We are still debating whether we should tag some versions of
hapi with a warning. The "we" is the node security process. Since we now have a
new version of hapi that mitigate the problem by default, it can be considered a
fix. But because the fix isn't to a problem in hapi itself, it is not exactly
kosher to declare older versions harmful.

Publishing an advisory on previous versions of hapi for the sole purpose of
nudging people into awareness and upgrade is an abuse of the advisory process.
I'm personally fine with abusing it for the purpose of improving security but
that's not my call. As of this writing, it is still being debated.

### The solution business
<a id="pp-solution-business"></a>

Mitigating the issue wasn't hard. Making it scale and safe was a bit more
involved. Since we knew where harmful data can enter the system, and we knew
where we used the problematic `JSON.parse()` we could replace it with a safe
implementation.

One problem. Validating data can be costly and we are now planning on validating
every incoming JSON text. The built-in `JSON.parse()` implementation is fast.
Really really fast. It is unlikely we can build a replacement that will be more
secure and anywhere as fast. Especially not overnight and without introducing
new bugs.

It was obvious we were going to wrap the existing `JSON.parse()` method with
some additional logic. We just had to make sure it was not adding too much
overhead. This isn't just a performance consideration but also a security one.
If we make it easy to slow down a system by simply sending specific data, we
make it easy to execute a [DoS
attack](https://en.wikipedia.org/wiki/Denial-of-service_attack) at very low
cost.

I came up with a stupidly simple solution: first parse the text using the
existing tools. If this didn't fail, scan the original raw text for the
offending string "__proto__". Only if we find it, perform an actual scan of the
object. We can't block every reference to "__proto__" — sometimes it is
perfectly valid value (like when writing about it here and sending this text
over to Medium for publication).

This made the "happy path" practically as fast as before. It just added one
function call, a quick text scan (again, very fast built-in implementation), and
a conditional return. The solution had negligible impact on the vast majority of
data expected to pass through it.

Next problem. The prototype property doesn't have to be at the top level of the
incoming object. It can be nested deep inside. This means we cannot just check
for the presence of it at the top level. We need to recursively iterate through
the object.

While recursive functions are a favorite tool, they could be disastrous when
writing security-conscious code. You see, recursive function increase the size
of the runtime call stack. The more times you loop, the longer the call stack
gets. At some point — KABOOM— you reach the maximum length and the process dies.

If you cannot guarantee the shape of the incoming data, recursive iteration
becomes an open threat. An attacker only needs to craft a deep enough object to
crash your servers.

I used a flat loop implementation that is both more memory efficient (less
function calls, less passing of temporary arguments) and more secure. I am not
pointing this out to brag, but to highlight how basic engineering practices can
create (or avoid) security pitfalls.

### Putting it to the test
<a id="pp-putting-to-test"></a>

I sent the code to two people. First to [Nathan
LaFreniere](https://github.com/nlf) to double check the security properties of
the solution, and then to [Matteo Collina](https://github.com/mcollina) to
review the performance. They are among the very best at what they do and often
my go-to people.

The performance benchmarks confirmed that the "happy path" was practically
unaffected. The interesting findings was that removing the offending values was
faster then throwing an exception. This raised the question of what should be
the default behavior of the new module — which I called
[**bourne**](https://github.com/hapijs/bourne) —  error or sanitize.

The concern, again, was exposing the application to a DoS attack. If sending a
request with `__proto__` makes things 500% slower, that could be an easy vector
to exploit. But after a bit more testing we confirmed that sending **any**
invalid JSON text was creating a very similar cost.

In other words, if you parse JSON, invalid values are going to cost you more,
regardless of what makes them invalid. It is also important to remember that
while the benchmark showed the significant % cost of scanning suspected objects,
the actual cost in CPU time was still in the fraction of milliseconds. Important
to note and measure but not actually harmful.

### hapi ever-after
<a id="pp-hapi-ever-after"></a>

There are a bunch of things to be grateful for.

The initial disclosure by the Lob team was perfect. It was reported privately,
to the right people, with the right information. They followed up with
additional findings, and gave us the time and space to resolve it the right way.
Lob also was a major sponsor of my work on hapi over the years and that
financial support is critical to allow everything else to happen. More on that
in a bit.

Triage was stressful but staffed with the right people. Having folks like
[Nicolas Morel](https://github.com/Marsup), Nathan, and Matteo, available and
eager to help is critical. This isn't easy to deal with without the pressure,
but with it, mistakes are likely without proper team collaboration.

We got lucky with the actual vulnerability. What started up looking like a
catastrophic problem, ended up being a delicate but straight-forward problem to
address.

We also got lucky by having full access to mitigate it at the source — didn't
need to send emails to some unknown framework maintainer and hope for a quick
answer. hapi's total control over all of its dependencies proved its usefulness
and security again. Not using [hapi](http://hapijs.com)? [Maybe you
should](https://hueniverse.com/why-you-should-consider-hapi-6163689bd7c2).

### The after in happy ever-after
<a id="pp-after-ever-after"></a>

This is where I have to take advantage of this incident to reiterate the cost
and need for sustainable and secure open source.

My time alone on this one issue exceeded 20 hours. That's half a working week.
It came at the end of a month were I already spent over 30 hours publishing a
new major release of hapi (most of the work was done in December). This puts me
at a personal financial loss of over $5000 this month (I had to cut back on paid
client work to make time for it).

If you rely on code I maintain, this is exactly the level of support, quality,
and commitment you want (and lets be honest — expect). Most of you take it for
granted — not just my work but the work of hundreds of other dedicated open
source maintainers.

Because this work is important, I decided to try and make it not just
financially sustainable but to grow and expand it. There is so much to improve.
This is exactly what motivates me to implement the new [commercial licensing
plan](https://web.archive.org/web/20190201220503/https://hueniverse.com/on-hapi-licensing-a-preview-f982662ee898)
coming in March. You can read more about it
[here](https://web.archive.org/web/20190201220503/https://hueniverse.com/on-hapi-licensing-a-preview-f982662ee898).

Of all the time consuming things, security is at the very top. I hope this story
successfully conveyed not just the technical details, but also the human drama and
what it takes to keep the web secure.

## Recommendations

This document contains a set of recommendations when using Fastify.

- [Use A Reverse Proxy](#use-a-reverse-proxy)
  - [HAProxy](#haproxy)
  - [Nginx](#nginx)
- [Kubernetes](#kubernetes)

## Use A Reverse Proxy
<a id="reverseproxy"></a>

Node.js is an early adopter of frameworks shipping with an easy-to-use web
server within the standard library. Previously, with languages like PHP or
Python, one would need either a web server with specific support for the
language or the ability to set up some sort of [CGI gateway][cgi] that works
with the language. With Node.js, one can write an application that _directly_
handles HTTP requests. As a result, the temptation is to write applications that
handle requests for multiple domains, listen on multiple ports (i.e. HTTP _and_
HTTPS), and then expose these applications directly to the Internet to handle
requests.

The Fastify team **strongly** considers this to be an anti-pattern and extremely
bad practice:

1. It adds unnecessary complexity to the application by diluting its focus.
2. It prevents [horizontal scalability][scale-horiz].

See [Why should I use a Reverse Proxy if Node.js is Production Ready?][why-use]
for a more thorough discussion of why one should opt to use a reverse proxy.

For a concrete example, consider the situation where:

1. The app needs multiple instances to handle load.
1. The app needs TLS termination.
1. The app needs to redirect HTTP requests to HTTPS.
1. The app needs to serve multiple domains.
1. The app needs to serve static resources, e.g. jpeg files.

There are many reverse proxy solutions available, and your environment may
dictate the solution to use, e.g. AWS or GCP. Given the above, we could use
[HAProxy][haproxy] or [Nginx][nginx] to solve these requirements:

### HAProxy

```conf
# The global section defines base HAProxy (engine) instance configuration.
global
  log /dev/log syslog
  maxconn 4096
  chroot /var/lib/haproxy
  user haproxy
  group haproxy

  # Set some baseline TLS options.
  tune.ssl.default-dh-param 2048
  ssl-default-bind-options no-sslv3 no-tlsv10 no-tlsv11
  ssl-default-bind-ciphers ECDH+AESGCM:DH+AESGCM:ECDH+AES256:DH+AES256:ECDH+AES128:DH+AES:RSA+AESGCM:RSA+AES:!aNULL:!MD5:!DSS
  ssl-default-server-options no-sslv3 no-tlsv10 no-tlsv11
  ssl-default-server-ciphers ECDH+AESGCM:DH+AESGCM:ECDH+AES256:DH+AES256:ECDH+AES128:DH+AES:RSA+AESGCM:RSA+AES:!aNULL:!MD5:!DSS

# Each defaults section defines options that will apply to each subsequent
# subsection until another defaults section is encountered.
defaults
  log   global
  mode  http
  option        httplog
  option        dontlognull
  retries       3
  option redispatch
  # The following option makes haproxy close connections to backend servers
  # instead of keeping them open. This can alleviate unexpected connection
  # reset errors in the Node process.
  option http-server-close
  maxconn       2000
  timeout connect 5000
  timeout client 50000
  timeout server 50000

  # Enable content compression for specific content types.
  compression algo gzip
  compression type text/html text/plain text/css application/javascript

# A "frontend" section defines a public listener, i.e. an "http server"
# as far as clients are concerned.
frontend proxy
  # The IP address here would be the _public_ IP address of the server.
  # Here, we use a private address as an example.
  bind 10.0.0.10:80
  # This redirect rule will redirect all traffic that is not TLS traffic
  # to the same incoming request URL on the HTTPS port.
  redirect scheme https code 308 if !{ ssl_fc }
  # Technically this use_backend directive is useless since we are simply
  # redirecting all traffic to this frontend to the HTTPS frontend. It is
  # merely included here for completeness sake.
  use_backend default-server

# This frontend defines our primary, TLS only, listener. It is here where
# we will define the TLS certificates to expose and how to direct incoming
# requests.
frontend proxy-ssl
  # The `/etc/haproxy/certs` directory in this example contains a set of
  # certificate PEM files that are named for the domains the certificates are
  # issued for. When HAProxy starts, it will read this directory, load all of
  # the certificates it finds here, and use SNI matching to apply the correct
  # certificate to the connection.
  bind 10.0.0.10:443 ssl crt /etc/haproxy/certs

  # Here we define rule pairs to handle static resources. Any incoming request
  # that has a path starting with `/static`, e.g.
  # `https://one.example.com/static/foo.jpeg`, will be redirected to the
  # static resources server.
  acl is_static path -i -m beg /static
  use_backend static-backend if is_static

  # Here we define rule pairs to direct requests to appropriate Node.js
  # servers based on the requested domain. The `acl` line is used to match
  # the incoming hostname and define a boolean indicating if it is a match.
  # The `use_backend` line is used to direct the traffic if the boolean is
  # true.
  acl example1 hdr_sub(Host) one.example.com
  use_backend example1-backend if example1

  acl example2 hdr_sub(Host) two.example.com
  use_backend example2-backend if example2

  # Finally, we have a fallback redirect if none of the requested hosts
  # match the above rules.
  default_backend default-server

# A "backend" is used to tell HAProxy where to request information for the
# proxied request. These sections are where we will define where our Node.js
# apps live and any other servers for things like static assets.
backend default-server
  # In this example we are defaulting unmatched domain requests to a single
  # backend server for all requests. Notice that the backend server does not
  # have to be serving TLS requests. This is called "TLS termination": the TLS
  # connection is "terminated" at the reverse proxy.
  # It is possible to also proxy to backend servers that are themselves serving
  # requests over TLS, but that is outside the scope of this example.
  server server1 10.10.10.2:80

# This backend configuration will serve requests for `https://one.example.com`
# by proxying requests to three backend servers in a round-robin manner.
backend example1-backend
  server example1-1 10.10.11.2:80
  server example1-2 10.10.11.2:80
  server example2-2 10.10.11.3:80

# This one serves requests for `https://two.example.com`
backend example2-backend
  server example2-1 10.10.12.2:80
  server example2-2 10.10.12.2:80
  server example2-3 10.10.12.3:80

# This backend handles the static resources requests.
backend static-backend
  server static-server1 10.10.9.2:80
```

[cgi]: https://en.wikipedia.org/wiki/Common_Gateway_Interface
[scale-horiz]: https://en.wikipedia.org/wiki/Scalability#Horizontal
[why-use]: https://web.archive.org/web/20190821102906/https://medium.com/intrinsic/why-should-i-use-a-reverse-proxy-if-node-js-is-production-ready-5a079408b2ca
[haproxy]: https://www.haproxy.org/

### Nginx

```nginx
# This upstream block groups 3 servers into one named backend fastify_app
# with 2 primary servers distributed via round-robin
# and one backup which is used when the first 2 are not reachable
# This also assumes your fastify servers are listening on port 80.
# more info: http://nginx.org/en/docs/http/ngx_http_upstream_module.html
upstream fastify_app {
  server 10.10.11.1:80;
  server 10.10.11.2:80;
  server 10.10.11.3:80 backup;
}

# This server block asks NGINX to respond with a redirect when
# an incoming request from port 80 (typically plain HTTP), to
# the same request URL but with HTTPS as protocol.
# This block is optional, and usually used if you are handling
# SSL termination in NGINX, like in the example here.
server {
  # default server is a special parameter to ask NGINX
  # to set this server block to the default for this address/port
  # which in this case is any address and port 80
  listen 80 default_server;
  listen [::]:80 default_server;

  # With a server_name directive you can also ask NGINX to
  # use this server block only with matching server name(s)
  # listen 80;
  # listen [::]:80;
  # server_name example.tld;

  # This matches all paths from the request and responds with
  # the redirect mentioned above.
  location / {
    return 301 https://$host$request_uri;
  }
}

# This server block asks NGINX to respond to requests from
# port 443 with SSL enabled and accept HTTP/2 connections.
# This is where the request is then proxied to the fastify_app
# server group via port 3000.
server {
  # This listen directive asks NGINX to accept requests
  # coming to any address, port 443, with SSL, and HTTP/2
  # if possible.
  listen 443 ssl http2 default_server;
  listen [::]:443 ssl http2 default_server;

  # With a server_name directive you can also ask NGINX to
  # use this server block only with matching server name(s)
  # listen 443 ssl http2;
  # listen [::]:443 ssl http2;
  # server_name example.tld;

  # Your SSL/TLS certificate (chain) and secret key in the PEM format
  ssl_certificate /path/to/fullchain.pem;
  ssl_certificate_key /path/to/private.pem;

  # A generic best practice baseline for based
  # on https://ssl-config.mozilla.org/
  ssl_session_timeout 1d;
  ssl_session_cache shared:FastifyApp:10m;
  ssl_session_tickets off;

  # This tells NGINX to only accept TLS 1.3, which should be fine
  # with most modern browsers including IE 11 with certain updates.
  # If you want to support older browsers you might need to add
  # additional fallback protocols.
  ssl_protocols TLSv1.3;
  ssl_prefer_server_ciphers off;

  # This adds a header that tells browsers to only ever use HTTPS
  # with this server.
  add_header Strict-Transport-Security "max-age=63072000" always;

  # The following directives are only necessary if you want to
  # enable OCSP Stapling.
  ssl_stapling on;
  ssl_stapling_verify on;
  ssl_trusted_certificate /path/to/chain.pem;

  # Custom nameserver to resolve upstream server names
  # resolver 127.0.0.1;

  # This section matches all paths and proxies it to the backend server
  # group specified above. Note the additional headers that forward
  # information about the original request. You might want to set
  # trustProxy to the address of your NGINX server so the X-Forwarded
  # fields are used by fastify.
  location / {
    # more info: http://nginx.org/en/docs/http/ngx_http_proxy_module.html
    proxy_http_version 1.1;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # This is the directive that proxies requests to the specified server.
    # If you are using an upstream group, then you do not need to specify a port.
    # If you are directly proxying to a server e.g.
    # proxy_pass http://127.0.0.1:3000 then specify a port.
    proxy_pass http://fastify_app;
  }
}
```

[nginx]: https://nginx.org/

## Kubernetes
<a id="kubernetes"></a>

The `readinessProbe` uses [(by
default](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes))
the pod IP as the hostname. Fastify listens on `127.0.0.1` by default. The probe
will not be able to reach the application in this case. To make it work,
the application must listen on `0.0.0.0` or specify a custom hostname in
the `readinessProbe.httpGet` spec, as per the following example:

```yaml
readinessProbe:
    httpGet:
        path: /health
        port: 4000
    initialDelaySeconds: 30
    periodSeconds: 30
    timeoutSeconds: 3
    successThreshold: 1
    failureThreshold: 5
```

## Serverless

Run serverless applications and REST APIs using your existing Fastify
application. By default, Fastify will not work on your serverless platform of
choice, you will need to make some small changes to fix this. This document
contains a small guide for the most popular serverless providers and how to use
Fastify with them.

#### Should you use Fastify in a serverless platform?

That is up to you! Keep in mind that functions as a service should always use
small and focused functions, but you can also run an entire web application with
them. It is important to remember that the bigger the application the slower the
initial boot will be. The best way to run Fastify applications in serverless
environments is to use platforms like Google Cloud Run, AWS Fargate, and Azure
Container Instances, where the server can handle multiple requests at the same
time and make full use of Fastify's features.

One of the best features of using Fastify in serverless applications is the ease
of development. In your local environment, you will always run the Fastify
application directly without the need for any additional tools, while the same
code will be executed in your serverless platform of choice with an additional
snippet of code.

### Contents

- [AWS Lambda](#aws-lambda)
- [Google Cloud Functions](#google-cloud-functions)
- [Google Cloud Run](#google-cloud-run)
- [Netlify Lambda](#netlify-lambda)
- [Vercel](#vercel)

## AWS Lambda

The sample provided allows you to easily build serverless web
applications/services and RESTful APIs using Fastify on top of AWS Lambda and
Amazon API Gateway.

*Note: Using [aws-lambda-fastify](https://github.com/fastify/aws-lambda-fastify)
is just one possible way.*

### app.js

```js
const fastify = require('fastify');

function init() {
  const app = fastify();
  app.get('/', (request, reply) => reply.send({ hello: 'world' }));
  return app;
}

if (require.main === module) {
  // called directly i.e. "node app"
  init().listen({ port: 3000 }, (err) => {
    if (err) console.error(err);
    console.log('server listening on 3000');
  });
} else {
  // required as a module => executed on aws lambda
  module.exports = init;
}
```

When executed in your lambda function we do not need to listen to a specific
port, so we just export the wrapper function `init` in this case. The
[`lambda.js`](#lambdajs) file
will use this export.

When you execute your Fastify application like always, i.e. `node app.js` *(the
detection for this could be `require.main === module`)*, you can normally listen
to your port, so you can still run your Fastify function locally.

### lambda.js

```js
const awsLambdaFastify = require('aws-lambda-fastify')
const init = require('./app');

const proxy = awsLambdaFastify(init())
// or
// const proxy = awsLambdaFastify(init(), { binaryMimeTypes: ['application/octet-stream'] })

exports.handler = proxy;
// or
// exports.handler = (event, context, callback) => proxy(event, context, callback);
// or
// exports.handler = (event, context) => proxy(event, context);
// or
// exports.handler = async (event, context) => proxy(event, context);
```

We just require
[aws-lambda-fastify](https://github.com/fastify/aws-lambda-fastify) (make sure
you install the dependency `npm i aws-lambda-fastify`) and our
[`app.js`](#appjs) file and call
the exported `awsLambdaFastify` function with the `app` as the only parameter.
The resulting `proxy` function has the correct signature to be used as a lambda
`handler` function. This way all the incoming events (API Gateway requests) are
passed to the `proxy` function of
[aws-lambda-fastify](https://github.com/fastify/aws-lambda-fastify).

### Example

An example deployable with
[claudia.js](https://claudiajs.com/tutorials/serverless-express.html) can be
found
[here](https://github.com/claudiajs/example-projects/tree/master/fastify-app-lambda).


### Considerations

- API Gateway does not support streams yet, so you are not able to handle
  [streams](../Reference/Reply.md#streams).
- API Gateway has a timeout of 29 seconds, so it is important to provide a reply
  during this time.

## Google Cloud Functions

### Creation of Fastify instance
```js
const fastify = require("fastify")({
  logger: true // you can also define the level passing an object configuration to logger: {level: 'debug'}
});
```

### Add Custom `contentTypeParser` to Fastify instance

As explained [in issue #946](https://github.com/fastify/fastify/issues/946#issuecomment-766319521),
since the Google Cloud Functions platform parses the body of the request before
it arrives at the Fastify instance, troubling the body request in case of `POST`
and `PATCH` methods, you need to add a custom [`Content-Type
Parser`](../Reference/ContentTypeParser.md) to mitigate this behavior.

```js
fastify.addContentTypeParser('application/json', {}, (req, body, done) => {
  done(null, body.body);
});
```

### Define your endpoint (examples)

A simple `GET` endpoint:
```js
fastify.get('/', async (request, reply) => {
  reply.send({message: 'Hello World!'})
})
```

Or a more complete `POST` endpoint with schema validation:
```js
fastify.route({
  method: 'POST',
  url: '/hello',
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string'}
      },
      required: ['name']
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: {type: 'string'}
        }
      }
    },
  },
  handler: async (request, reply) => {
    const { name } = request.body;
    reply.code(200).send({
      message: `Hello ${name}!`
    })
  }
})
```

### Implement and export the function

Final step, implement the function to handle the request and pass it to Fastify
by emitting `request` event to `fastify.server`:

```js
const fastifyFunction = async (request, reply) => {
  await fastify.ready();
  fastify.server.emit('request', request, reply)
}

export.fastifyFunction = fastifyFunction;
```

### Local test

Install [Google Functions Framework for
Node.js](https://github.com/GoogleCloudPlatform/functions-framework-nodejs).

You can install it globally:
```bash
npm i -g @google-cloud/functions-framework
```

Or as a development library:
```bash
npm i -D @google-cloud/functions-framework
```

Then you can run your function locally with Functions Framework:
```bash
npx @google-cloud/functions-framework --target=fastifyFunction
```

Or add this command to your `package.json` scripts:
```json
"scripts": {
...
"dev": "npx @google-cloud/functions-framework --target=fastifyFunction"
...
}
```
and run it with `npm run dev`.


### Deploy
```bash
gcloud functions deploy fastifyFunction \
--runtime nodejs14 --trigger-http --region $GOOGLE_REGION --allow-unauthenticated
```

#### Read logs
```bash
gcloud functions logs read
```

#### Example request to `/hello` endpoint
```bash
curl -X POST https://$GOOGLE_REGION-$GOOGLE_PROJECT.cloudfunctions.net/me -H "Content-Type: application/json" -d '{ "name": "Fastify" }'
{"message":"Hello Fastify!"}
```

### References
- [Google Cloud Functions - Node.js Quickstart
  ](https://cloud.google.com/functions/docs/quickstart-nodejs)

## Google Cloud Run

Unlike AWS Lambda or Google Cloud Functions, Google Cloud Run is a serverless
**container** environment. Its primary purpose is to provide an
infrastructure-abstracted environment to run arbitrary containers. As a result,
Fastify can be deployed to Google Cloud Run with little-to-no code changes from
the way you would write your Fastify app normally.

*Follow the steps below to deploy to Google Cloud Run if you are already
familiar with gcloud or just follow their
[quickstart](https://cloud.google.com/run/docs/quickstarts/build-and-deploy)*.

### Adjust Fastify server

In order for Fastify to properly listen for requests within the container, be
sure to set the correct port and address:

```js
function build() {
  const fastify = Fastify({ trustProxy: true })
  return fastify
}

async function start() {
  // Google Cloud Run will set this environment variable for you, so
  // you can also use it to detect if you are running in Cloud Run
  const IS_GOOGLE_CLOUD_RUN = process.env.K_SERVICE !== undefined

  // You must listen on the port Cloud Run provides
  const port = process.env.PORT || 3000

  // You must listen on all IPV4 addresses in Cloud Run
  const host = IS_GOOGLE_CLOUD_RUN ? "0.0.0.0" : undefined

  try {
    const server = build()
    const address = await server.listen({ port, host })
    console.log(`Listening on ${address}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = build

if (require.main === module) {
  start()
}
```

### Add a Dockerfile

You can add any valid `Dockerfile` that packages and runs a Node app. A basic
`Dockerfile` can be found in the official [gcloud
docs](https://github.com/knative/docs/blob/2d654d1fd6311750cc57187a86253c52f273d924/docs/serving/samples/hello-world/helloworld-nodejs/Dockerfile).

```Dockerfile
# Use the official Node.js 10 image.
# https://hub.docker.com/_/node
FROM node:10

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
RUN npm i --production

# Copy local code to the container image.
COPY . .

# Run the web service on container startup.
CMD [ "npm", "start" ]
```

### Add a .dockerignore

To keep build artifacts out of your container (which keeps it small and improves
build times) add a `.dockerignore` file like the one below:

```.dockerignore
Dockerfile
README.md
node_modules
npm-debug.log
```

### Submit build

Next, submit your app to be built into a Docker image by running the following
command (replacing `PROJECT-ID` and `APP-NAME` with your GCP project id and an
app name):

```bash
gcloud builds submit --tag gcr.io/PROJECT-ID/APP-NAME
```

### Deploy Image

After your image has built, you can deploy it with the following command:

```bash
gcloud beta run deploy --image gcr.io/PROJECT-ID/APP-NAME --platform managed
```

Your app will be accessible from the URL GCP provides.


## netlify-lambda

First, please perform all preparation steps related to **AWS Lambda**.

Create a folder called `functions`,  then create `server.js` (and your endpoint
path will be `server.js`) inside the `functions` folder.

### functions/server.js

```js
export { handler } from '../lambda.js'; // Change `lambda.js` path to your `lambda.js` path
```

### netlify.toml

```toml
[build]
  # This will be run the site build
  command = "npm run build:functions"
  # This is the directory is publishing to netlify's CDN
  # and this is directory of your front of your app
  # publish = "build"
  # functions build directory
  functions = "functions-build" # always appends `-build` folder to your `functions` folder for builds
```

### webpack.config.netlify.js

**Do not forget to add this Webpack config, or else problems may occur**

```js
const nodeExternals = require('webpack-node-externals');
const dotenv = require('dotenv-safe');
const webpack = require('webpack');

const env = process.env.NODE_ENV || 'production';
const dev = env === 'development';

if (dev) {
  dotenv.config({ allowEmptyValues: true });
}

module.exports = {
  mode: env,
  devtool: dev ? 'eval-source-map' : 'none',
  externals: [nodeExternals()],
  devServer: {
    proxy: {
      '/.netlify': {
        target: 'http://localhost:9000',
        pathRewrite: { '^/.netlify/functions': '' }
      }
    }
  },
  module: {
    rules: []
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.APP_ROOT_PATH': JSON.stringify('/'),
      'process.env.NETLIFY_ENV': true,
      'process.env.CONTEXT': env
    })
  ]
};
```

### Scripts

Add this command to your `package.json` *scripts*

```json
"scripts": {
...
"build:functions": "netlify-lambda build functions --config ./webpack.config.netlify.js"
...
}
```

Then it should work fine


## Vercel

[Vercel](https://vercel.com) provides zero-configuration deployment for Node.js
applications. To use it now, it is as simple as configuring your
`vercel.json` file like the following:

```json
{
    "rewrites": [
        {
            "source": "/(.*)",
            "destination": "/api/serverless.js"
        }
    ]
}
```

Then, write `api/serverless.js` like so:

```js
"use strict";

// Read the .env file.
import * as dotenv from "dotenv";
dotenv.config();

// Require the framework
import Fastify from "fastify";

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
});

// Register your application as a normal plugin.
app.register(import("../src/app"));

export default async (req, res) => {
    await app.ready();
    app.server.emit('request', req, res);
}
```

# Fastify Style Guide

## Welcome

Welcome to *Fastify Style Guide*. This guide is here to provide you with a
conventional writing style for users writing developer documentation on our Open
Source framework. Each topic is precise and well explained to help you write
documentation users can easily understand and implement.

## Who is this guide for?

This guide is for anyone who loves to build with Fastify or wants to contribute
to our documentation. You do not need to be an expert in writing technical
documentation. This guide is here to help you.

Visit the [contribute](https://www.fastify.io/contribute) page on our website or
read the
[CONTRIBUTING.md](https://github.com/fastify/fastify/blob/main/CONTRIBUTING.md)
file on GitHub to join our Open Source folks.

## Before you write

You need to know the following:

* JavaScript
* Node.js
* Git
* GitHub
* Markdown
* HTTP
* NPM

### Consider your Audience

Before you start writing, think about your audience. In this case, your audience
should already know HTTP, JavaScript, NPM, and Node.js. It is necessary to keep
your readers in mind because they are the ones consuming your content. You want
to give as much useful information as possible. Consider the vital things they
need to know and how they can understand them. Use words and references that
readers can relate to easily. Ask for feedback from the community, it can help
you write better documentation that focuses on the user and what you want to
achieve.

### Get straight to the point

Give your readers a clear and precise action to take. Start with what is most
important. This way, you can help them find what they need faster. Mostly,
readers tend to read the first content on a page, and many will not scroll
further.

**Example**

Less like this: Colons are very important to register a parametric path. It lets
the framework know there is a new parameter created. You can place the colon
before the parameter name so the parametric path can be created.

More Like this: To register a parametric path, put a colon before the parameter
name. Using a colon lets the framework know it is a parametric path and not a
static path.

### Avoid adding video or image content


Do not add videos or screenshots to the documentation. It is easier to keep
under version control. Videos and images will eventually end up becoming
outdated as new updates keep developing. Instead, make a referral link or a
YouTube video. You can add links by using `[Title](www.websitename.com)` in the
markdown.

**Example**

```
To learn more about hooks, see [Fastify hooks](https://www.fastify.io/docs/latest/Reference/Hooks/).
```

Result:
>To learn more about hooks, see [Fastify
>hooks](https://www.fastify.io/docs/latest/Reference/Hooks/).



### Avoid plagiarism

Make sure you avoid copying other people's work. Keep it as original as
possible. You can learn from what they have done and reference where it is from
if you used a particular quote from their work.


## Word Choice

There are a few things you need to use and avoid when writing your documentation
to improve readability for readers and make documentation neat, direct, and
clean.


### When to use the second person "you" as the pronoun

When writing articles or guides, your content should communicate directly to
readers in the second person ("you") addressed form. It is easier to give them
direct instruction on what to do on a particular topic. To see an example, visit
the [Plugins Guide](./Plugins-Guide.md).

**Example**

Less like this: we can use the following plugins.

More like this: You can use the following plugins.

> According to [Wikipedia](#), ***You*** is usually a second person pronoun.
> Also, used to refer to an indeterminate person, as a more common alternative
> to a very formal indefinite pronoun.

## When to avoid the second person "you" as the pronoun

One of the main rules of formal writing such as reference documentation, or API
documentation, is to avoid the second person ("you") or directly addressing the
reader.

**Example**

Less like this: You can use the following recommendation as an example.

More like this: As an example, the following recommendations should be
referenced.

To view a live example, refer to the [Decorators](../Reference/Decorators.md)
reference document.


### Avoid using contractions

Contractions are the shortened version of written and spoken forms of a word,
i.e. using "don't" instead of "do not". Avoid contractions to provide a more
formal tone.

### Avoid using condescending terms

Condescending terms are words that include:

* Just
* Easy
* Simply
* Basically
* Obviously

The reader may not find it easy to use Fastify's framework and plugins; avoid
words that make it sound simple, easy, offensive, or insensitive. Not everyone
who reads the documentation has the same level of understanding.


### Starting with a verb

Mostly start your description with a verb, which makes it simple and precise for
the reader to follow. Prefer using present tense because it is easier to read
and understand than the past or future tense.

**Example**

 Less like this: There is a need for Node.js to be installed before you can be
 able to use Fastify.

 More like this: Install Node.js to make use of Fastify.

### Grammatical moods

Grammatical moods are a great way to express your writing. Avoid sounding too
bossy while making a direct statement. Know when to switch between indicative,
imperative, and subjunctive moods.


**Indicative** - Use when making a factual statement or question.

Example: Since there is no testing framework available, "Fastify recommends ways
to write tests".

**Imperative** - Use when giving instructions, actions, commands, or when you
write your headings.

Example: Install dependencies before starting development.


**Subjunctive** -  Use when making suggestions, hypotheses, or non-factual
statements.

Example: Reading the documentation on our website is recommended to get
comprehensive knowledge of the framework.

### Use **active** voice instead of **passive**

Using active voice is a more compact and direct way of conveying your
documentation.

**Example**


Passive: The node dependencies and packages are installed by npm.

Active:  npm installs packages and node dependencies.

## Writing Style

### Documentation titles

When creating a new guide, API, or reference in the `/docs/` directory, use
short titles that best describe the topic of your documentation. Name your files
in kebab-cases and avoid Raw or camelCase. To learn more about kebab-case you
can visit this medium article on [Case
Styles](https://medium.com/better-programming/string-case-styles-camel-pascal-snake-and-kebab-case-981407998841).

**Examples**:

>`hook-and-plugins.md`,

 `adding-test-plugins.md`,

 `removing-requests.md`.

### Hyperlinks

Hyperlinks should have a clear title of what it references. Here is how your
hyperlink should look:

```MD
<!-- More like this -->

// Add clear & brief description
[Fastify Plugins] (https://www.fastify.io/docs/latest/Plugins/)

<!--Less like this -->

// incomplete description
[Fastify] (https://www.fastify.io/docs/latest/Plugins/)

// Adding title in link brackets
[](https://www.fastify.io/docs/latest/Plugins/ "fastify plugin")

// Empty title
[](https://www.fastify.io/docs/latest/Plugins/)

// Adding links localhost URLs instead of using code strings (``)
[http://localhost:3000/](http://localhost:3000/)

```

Include in your documentation as many essential references as possible, but
avoid having numerous links when writing for beginners to avoid distractions.

## Testing

Testing is one of the most important parts of developing an application. Fastify
is very flexible when it comes to testing and is compatible with most testing
frameworks (such as [Tap](https://www.npmjs.com/package/tap), which is used in
the examples below).

Let's `cd` into a fresh directory called 'testing-example' and type `npm init
-y` in our terminal.

Run `npm i fastify && npm i tap pino-pretty -D`

### Separating concerns makes testing easy

First, we are going to separate our application code from our server code:

**app.js**:

```js
'use strict'

const fastify = require('fastify')

function build(opts={}) {
  const app = fastify(opts)
  app.get('/', async function (request, reply) {
    return { hello: 'world' }
  })

  return app
}

module.exports = build
```

**server.js**:

```js
'use strict'

const server = require('./app')({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty'
    }
  }
})

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
})
```

### Benefits of using fastify.inject()

Fastify comes with built-in support for fake HTTP injection thanks to
[`light-my-request`](https://github.com/fastify/light-my-request).

Before introducing any tests, we will use the `.inject` method to make a fake
request to our route:

**app.test.js**:

```js
'use strict'

const build = require('./app')

const test = async () => {
  const app = build()

  const response = await app.inject({
    method: 'GET',
    url: '/'
  })

  console.log('status code: ', response.statusCode)
  console.log('body: ', response.body)
}
test()
```

First, our code will run inside an asynchronous function, giving us access to
async/await.

`.inject` ensures all registered plugins have booted up and our application is
ready to test. Finally, we pass the request method we want to use and a route.
Using await we can store the response without a callback.



Run the test file in your terminal `node app.test.js`

```sh
status code:  200
body:  {"hello":"world"}
```



### Testing with HTTP injection

Now we can replace our `console.log` calls with actual tests!

In your `package.json` change the "test" script to:

`"test": "tap --reporter=list --watch"`

**app.test.js**:

```js
'use strict'

const { test } = require('tap')
const build = require('./app')

test('requests the "/" route', async t => {
  const app = build()

  const response = await app.inject({
    method: 'GET',
    url: '/'
  })
  t.equal(response.statusCode, 200, 'returns a status code of 200')
})
```

Finally, run `npm test` in the terminal and see your test results!

The `inject` method can do much more than a simple GET request to a URL:
```js
fastify.inject({
  method: String,
  url: String,
  query: Object,
  payload: Object,
  headers: Object,
  cookies: Object
}, (error, response) => {
  // your tests
})
```

`.inject` methods can also be chained by omitting the callback function:

```js
fastify
  .inject()
  .get('/')
  .headers({ foo: 'bar' })
  .query({ foo: 'bar' })
  .end((err, res) => { // the .end call will trigger the request
    console.log(res.payload)
  })
```

or in the promisified version

```js
fastify
  .inject({
    method: String,
    url: String,
    query: Object,
    payload: Object,
    headers: Object,
    cookies: Object
  })
  .then(response => {
    // your tests
  })
  .catch(err => {
    // handle error
  })
```

Async await is supported as well!
```js
try {
  const res = await fastify.inject({ method: String, url: String, payload: Object, headers: Object })
  // your tests
} catch (err) {
  // handle error
}
```

#### Another Example:

**app.js**
```js
const Fastify = require('fastify')

function buildFastify () {
  const fastify = Fastify()

  fastify.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
  })

  return fastify
}

module.exports = buildFastify
```

**test.js**
```js
const tap = require('tap')
const buildFastify = require('./app')

tap.test('GET `/` route', t => {
  t.plan(4)

  const fastify = buildFastify()

  // At the end of your tests it is highly recommended to call `.close()`
  // to ensure that all connections to external services get closed.
  t.teardown(() => fastify.close())

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, response) => {
    t.error(err)
    t.equal(response.statusCode, 200)
    t.equal(response.headers['content-type'], 'application/json; charset=utf-8')
    t.same(response.json(), { hello: 'world' })
  })
})
```

### Testing with a running server
Fastify can also be tested after starting the server with `fastify.listen()` or
after initializing routes and plugins with `fastify.ready()`.

#### Example:

Uses **app.js** from the previous example.

**test-listen.js** (testing with
[`Request`](https://www.npmjs.com/package/request))
```js
const tap = require('tap')
const request = require('request')
const buildFastify = require('./app')

tap.test('GET `/` route', t => {
  t.plan(5)

  const fastify = buildFastify()

  t.teardown(() => fastify.close())

  fastify.listen({ port: 0 }, (err) => {
    t.error(err)

    request({
      method: 'GET',
      url: 'http://localhost:' + fastify.server.address().port
    }, (err, response, body) => {
      t.error(err)
      t.equal(response.statusCode, 200)
      t.equal(response.headers['content-type'], 'application/json; charset=utf-8')
      t.same(JSON.parse(body), { hello: 'world' })
    })
  })
})
```

**test-ready.js** (testing with
[`SuperTest`](https://www.npmjs.com/package/supertest))
```js
const tap = require('tap')
const supertest = require('supertest')
const buildFastify = require('./app')

tap.test('GET `/` route', async (t) => {
  const fastify = buildFastify()

  t.teardown(() => fastify.close())

  await fastify.ready()

  const response = await supertest(fastify.server)
    .get('/')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
  t.same(response.body, { hello: 'world' })
})
```

### How to inspect tap tests
1. Isolate your test by passing the `{only: true}` option
```javascript
test('should ...', {only: true}, t => ...)
```
2. Run `tap` using `npx`
```bash
> npx tap -O -T --node-arg=--inspect-brk test/<test-file.test.js>
```
- `-O` specifies to run tests with the `only` option enabled
- `-T` specifies not to timeout (while you're debugging)
- `--node-arg=--inspect-brk` will launch the node debugger
3. In VS Code, create and launch a `Node.js: Attach` debug configuration. No
   modification should be necessary.

Now you should be able to step through your test file (and the rest of
`Fastify`) in your code editor.

# How to write a good plugin
First, thank you for deciding to write a plugin for Fastify. Fastify is a
minimal framework and plugins are its strength, so thank you.

The core principles of Fastify are performance, low overhead, and providing a
good experience to our users. When writing a plugin, it is important to keep
these principles in mind. Therefore, in this document, we will analyze what
characterizes a quality plugin.

*Need some inspiration? You can use the label ["plugin
suggestion"](https://github.com/fastify/fastify/issues?q=is%3Aissue+is%3Aopen+label%3A%22plugin+suggestion%22)
in our issue tracker!*

## Code
Fastify uses different techniques to optimize its code, many of them are
documented in our Guides. We highly recommend you read [the hitchhiker's guide
to plugins](./Plugins-Guide.md) to discover all the APIs you can use to build
your plugin and learn how to use them.

Do you have a question or need some advice? We are more than happy to help you!
Just open an issue in our [help repository](https://github.com/fastify/help).

Once you submit a plugin to our [ecosystem list](./Ecosystem.md), we will review
your code and help you improve it if necessary.

## Documentation
Documentation is extremely important. If your plugin is not well documented we
will not accept it to the ecosystem list. Lack of quality documentation makes it
more difficult for people to use your plugin, and will likely result in it going
unused.

If you want to see some good examples of how to document a plugin take a look
at:
- [`@fastify/caching`](https://github.com/fastify/fastify-caching)
- [`@fastify/compress`](https://github.com/fastify/fastify-compress)
- [`@fastify/cookie`](https://github.com/fastify/fastify-cookie)
- [`point-of-view`](https://github.com/fastify/point-of-view)
- [`under-pressure`](https://github.com/fastify/under-pressure)

## License
You can license your plugin as you prefer, we do not enforce any kind of
license.

We prefer the [MIT license](https://choosealicense.com/licenses/mit/) because we
think it allows more people to use the code freely. For a list of alternative
licenses see the [OSI list](https://opensource.org/licenses) or GitHub's
[choosealicense.com](https://choosealicense.com/).

## Examples
Always put an example file in your repository. Examples are very helpful for
users and give a very fast way to test your plugin. Your users will be grateful.

## Test
It is extremely important that a plugin is thoroughly tested to verify that is
working properly.

A plugin without tests will not be accepted to the ecosystem list. A lack of
tests does not inspire trust nor guarantee that the code will continue to work
among different versions of its dependencies.

We do not enforce any testing library. We use [`tap`](https://www.node-tap.org/)
since it offers out-of-the-box parallel testing and code coverage, but it is up
to you to choose your library of preference.

## Code Linter
It is not mandatory, but we highly recommend you use a code linter in your
plugin. It will ensure a consistent code style and help you to avoid many
errors.

We use [`standard`](https://standardjs.com/) since it works without the need to
configure it and is very easy to integrate into a test suite.

## Continuous Integration
It is not mandatory, but if you release your code as open source, it helps to
use Continuous Integration to ensure contributions do not break your plugin and
to show that the plugin works as intended. Both
[CircleCI](https://circleci.com/) and [GitHub
Actions](https://github.com/features/actions) are free for open source projects
and easy to set up.

In addition, you can enable services like [Dependabot](https://dependabot.com/),
which will help you keep your dependencies up to date and discover if a new
release of Fastify has some issues with your plugin.

## Let's start!
Awesome, now you know everything you need to know about how to write a good
plugin for Fastify! After you have built one (or more!) let us know! We will add
it to the [ecosystem](https://github.com/fastify/fastify#ecosystem) section of
our documentation!

If you want to see some real world examples, check out:
- [`point-of-view`](https://github.com/fastify/point-of-view) Templates
  rendering (*ejs, pug, handlebars, marko*) plugin support for Fastify.
- [`@fastify/mongodb`](https://github.com/fastify/fastify-mongodb) Fastify
  MongoDB connection plugin, with this you can share the same MongoDB connection
  pool in every part of your server.
- [`@fastify/multipart`](https://github.com/fastify/fastify-multipart) Multipart
  support for Fastify.
- [`@fastify/helmet`](https://github.com/fastify/fastify-helmet) Important
  security headers for Fastify.

## `Content-Type` Parser
Natively, Fastify only supports `'application/json'` and `'text/plain'` content
types. If the content type is not one of these, an `FST_ERR_CTP_INVALID_MEDIA_TYPE` 
error will be thrown.

The default charset is `utf-8`. If you need to support different content
types, you can use the `addContentTypeParser` API. *The default JSON and/or
plain text parser can be changed or removed.*

*Note: If you decide to specify your own content type with the `Content-Type`
header, UTF-8 will not be the default. Be sure to include UTF-8 like this
`text/html; charset=utf-8`.*

As with the other APIs, `addContentTypeParser` is encapsulated in the scope in
which it is declared. This means that if you declare it in the root scope it
will be available everywhere, while if you declare it inside a plugin it will be
available only in that scope and its children.

Fastify automatically adds the parsed request payload to the [Fastify
request](./Request.md) object which you can access with `request.body`.

Note that for `GET` and `HEAD` requests the payload is never parsed. For `OPTIONS` and `DELETE` requests the payload is only parsed if 
the content type is given in the content-type header. If it is not given, the [catch-all](#catch-all) parser is not executed as with `POST`, `PUT` and `PATCH`, but the payload is simply not parsed.

### Usage
```js
fastify.addContentTypeParser('application/jsoff', function (request, payload, done) {
  jsoffParser(payload, function (err, body) {
    done(err, body)
  })
})

// Handle multiple content types with the same function
fastify.addContentTypeParser(['text/xml', 'application/xml'], function (request, payload, done) {
  xmlParser(payload, function (err, body) {
    done(err, body)
  })
})

// Async is also supported in Node versions >= 8.0.0
fastify.addContentTypeParser('application/jsoff', async function (request, payload) {
  var res = await jsoffParserAsync(payload)

  return res
})

// Handle all content types that matches RegExp
fastify.addContentTypeParser(/^image\/.*/, function (request, payload, done) {
  imageParser(payload, function (err, body) {
    done(err, body)
  })
})

// Can use default JSON/Text parser for different content Types
fastify.addContentTypeParser('text/json', { parseAs: 'string' }, fastify.getDefaultJsonParser('ignore', 'ignore'))
```

Fastify first tries to match a content-type parser with a `string` value before
trying to find a matching `RegExp`. If you provide overlapping content types,
Fastify tries to find a matching content type by starting with the last one
passed and ending with the first one. So if you want to specify a general
content type more precisely, first specify the general content type and then the
more specific one, like in the example below.

```js
// Here only the second content type parser is called because its value also matches the first one
fastify.addContentTypeParser('application/vnd.custom+xml', (request, body, done) => {} )
fastify.addContentTypeParser('application/vnd.custom', (request, body, done) => {} )

// Here the desired behavior is achieved because fastify first tries to match the `application/vnd.custom+xml` content type parser
fastify.addContentTypeParser('application/vnd.custom', (request, body, done) => {} )
fastify.addContentTypeParser('application/vnd.custom+xml', (request, body, done) => {} )
```

Besides the `addContentTypeParser` API there are further APIs that can be used.
These are `hasContentTypeParser`, `removeContentTypeParser` and
`removeAllContentTypeParsers`.

#### hasContentTypeParser

You can use the `hasContentTypeParser` API to find if a specific content type
parser already exists.

```js
if (!fastify.hasContentTypeParser('application/jsoff')){
  fastify.addContentTypeParser('application/jsoff', function (request, payload, done) {
    jsoffParser(payload, function (err, body) {
      done(err, body)
    })
  })
}
```

=======
#### removeContentTypeParser

With `removeContentTypeParser` a single or an array of content types can be
removed. The method supports `string` and `RegExp` content types.

```js
fastify.addContentTypeParser('text/xml', function (request, payload, done) {
  xmlParser(payload, function (err, body) {
    done(err, body)
  })
})

// Removes the both built-in content type parsers so that only the content type parser for text/html is available
fastify.removeContentTypeParser(['application/json', 'text/plain'])
```

#### removeAllContentTypeParsers

In the example from just above, it is noticeable that we need to specify each
content type that we want to remove. To solve this problem Fastify provides the
`removeAllContentTypeParsers` API. This can be used to remove all currently
existing content type parsers. In the example below we achieve the same
as in the example above except that we do not need to specify each content type
to delete. Just like `removeContentTypeParser`, this API supports encapsulation.
The API is especially useful if you want to register a [catch-all content type
parser](#catch-all) that should be executed for every content type and the
built-in parsers should be ignored as well.

```js
fastify.removeAllContentTypeParsers()

fastify.addContentTypeParser('text/xml', function (request, payload, done) {
  xmlParser(payload, function (err, body) {
    done(err, body)
  })
})
```

**Notice**: The old syntaxes `function(req, done)` and `async function(req)` for
the parser are still supported but they are deprecated.

#### Body Parser
You can parse the body of a request in two ways. The first one is shown above:
you add a custom content type parser and handle the request stream. In the
second one, you should pass a `parseAs` option to the `addContentTypeParser`
API, where you declare how you want to get the body. It could be of type
`'string'` or `'buffer'`. If you use the `parseAs` option, Fastify will
internally handle the stream and perform some checks, such as the [maximum
size](./Server.md#factory-body-limit) of the body and the content length. If the
limit is exceeded the custom parser will not be invoked.
```js
fastify.addContentTypeParser('application/json', { parseAs: 'string' }, function (req, body, done) {
  try {
    var json = JSON.parse(body)
    done(null, json)
  } catch (err) {
    err.statusCode = 400
    done(err, undefined)
  }
})
```

See
[`example/parser.js`](https://github.com/fastify/fastify/blob/main/examples/parser.js)
for an example.

##### Custom Parser Options
+ `parseAs` (string): Either `'string'` or `'buffer'` to designate how the
  incoming data should be collected. Default: `'buffer'`.
+ `bodyLimit` (number): The maximum payload size, in bytes, that the custom
  parser will accept. Defaults to the global body limit passed to the [`Fastify
  factory function`](./Server.md#bodylimit).

#### Catch-All
There are some cases where you need to catch all requests regardless of their
content type. With Fastify, you can just use the `'*'` content type.
```js
fastify.addContentTypeParser('*', function (request, payload, done) {
  var data = ''
  payload.on('data', chunk => { data += chunk })
  payload.on('end', () => {
    done(null, data)
  })
})
```

Using this, all requests that do not have a corresponding content type parser
will be handled by the specified function.

This is also useful for piping the request stream. You can define a content
parser like:

```js
fastify.addContentTypeParser('*', function (request, payload, done) {
  done()
})
```

and then access the core HTTP request directly for piping it where you want:

```js
app.post('/hello', (request, reply) => {
  reply.send(request.raw)
})
```

Here is a complete example that logs incoming [json line](https://jsonlines.org/) objects:

```js
const split2 = require('split2')
const pump = require('pump')

fastify.addContentTypeParser('*', (request, payload, done) => {
  done(null, pump(payload, split2(JSON.parse)))
})

fastify.route({
  method: 'POST',
  url: '/api/log/jsons',
  handler: (req, res) => {
    req.body.on('data', d => console.log(d)) // log every incoming object
  }
})
```

For piping file uploads you may want to check out [this plugin](https://github.com/fastify/fastify-multipart).

If you want the content type parser to be executed on all content types
and not only on those that don't have a specific one, you should call the
`removeAllContentTypeParsers` method first.

```js
// Without this call, the request body with the content type application/json would be processed by the built-in JSON parser
fastify.removeAllContentTypeParsers()

fastify.addContentTypeParser('*', function (request, payload, done) {
  var data = ''
  payload.on('data', chunk => { data += chunk })
  payload.on('end', () => {
    done(null, data)
  })
})
```

## Decorators

The decorators API allows customization of the core Fastify objects, such as the
server instance itself and any request and reply objects used during the HTTP
request lifecycle. The decorators API can be used to attach any type of property
to the core objects, e.g. functions, plain objects, or native types.

This API is *synchronous*. Attempting to define a decoration asynchronously
could result in the Fastify instance booting before the decoration completes its
initialization. To avoid this issue, and register an asynchronous decoration,
the `register` API, in combination with `fastify-plugin`, must be used instead.
To learn more, see the [Plugins](./Plugins.md) documentation.

Decorating core objects with this API allows the underlying JavaScript engine to
optimize the handling of server, request, and reply objects. This is
accomplished by defining the shape of all such object instances before they are
instantiated and used. As an example, the following is not recommended because
it will change the shape of objects during their lifecycle:

```js
// Bad example! Continue reading.

// Attach a user property to the incoming request before the request
// handler is invoked.
fastify.addHook('preHandler', function (req, reply, done) {
  req.user = 'Bob Dylan'
  done()
})

// Use the attached user property in the request handler.
fastify.get('/', function (req, reply) {
  reply.send(`Hello, ${req.user}`)
})
```

Since the above example mutates the request object after it has already been
instantiated, the JavaScript engine must deoptimize access to the request
object. By using the decoration API this deoptimization is avoided:

```js
// Decorate request with a 'user' property
fastify.decorateRequest('user', '')

// Update our property
fastify.addHook('preHandler', (req, reply, done) => {
  req.user = 'Bob Dylan'
  done()
})
// And finally access it
fastify.get('/', (req, reply) => {
  reply.send(`Hello, ${req.user}!`)
})
```

Note that it is important to keep the initial shape of a decorated field as
close as possible to the value intended to be set dynamically in the future.
Initialize a decorator as a `''` if the intended value is a string, and as
`null` if it will be an object or a function.

Remember this example works only with value types as reference types will be
shared amongst all requests. See [decorateRequest](#decorate-request).

See [JavaScript engine fundamentals: Shapes and Inline
Caches](https://mathiasbynens.be/notes/shapes-ics) for more information on this
topic.

### Usage
<a id="usage"></a>

#### `decorate(name, value, [dependencies])`
<a id="decorate"></a>

This method is used to customize the Fastify [server](./Server.md)
instance.

For example, to attach a new method to the server instance:

```js
fastify.decorate('utility', function () {
  // Something very useful
})
```

As mentioned above, non-function values can be attached:

```js
fastify.decorate('conf', {
  db: 'some.db',
  port: 3000
})
```

To access decorated properties, use the name provided to the decoration API:

```js
fastify.utility()

console.log(fastify.conf.db)
```

The decorated [Fastify server](./Server.md) is bound to `this` in
route [route](./Routes.md) handlers:

```js
fastify.decorate('db', new DbConnection())

fastify.get('/', async function (request, reply) {
  reply({hello: await this.db.query('world')})
})
```

The `dependencies` parameter is an optional list of decorators that the
decorator being defined relies upon. This list is simply a list of string names
of other decorators. In the following example, the "utility" decorator depends
upon "greet" and "log" decorators:

```js
fastify.decorate('utility', fn, ['greet', 'log'])
```

Note: using an arrow function will break the binding of `this` to the
`FastifyInstance`.

If a dependency is not satisfied, the `decorate` method will throw an exception.
The dependency check is performed before the server instance is booted. Thus, it
cannot occur during runtime.

#### `decorateReply(name, value, [dependencies])`
<a id="decorate-reply"></a>

As the name suggests, this API is used to add new methods/properties to the core
`Reply` object:

```js
fastify.decorateReply('utility', function () {
  // Something very useful
})
```

Note: using an arrow function will break the binding of `this` to the Fastify
`Reply` instance.

Note: using `decorateReply` will emit a warning if used with a reference type:

```js
// Don't do this
fastify.decorateReply('foo', { bar: 'fizz'})
```
In this example, the reference of the object is shared with all the requests:
**any mutation will impact all requests, potentially creating security
vulnerabilities or memory leaks**. To achieve proper encapsulation across
requests configure a new value for each incoming request in the [`'onRequest'`
hook](./Hooks.md#onrequest). Example:

```js
const fp = require('fastify-plugin')

async function myPlugin (app) {
  app.decorateRequest('foo', null)
  app.addHook('onRequest', async (req, reply) => {
    req.foo = { bar: 42 }
  })
}

module.exports = fp(myPlugin)
```

See [`decorate`](#decorate) for information about the `dependencies` parameter.

#### `decorateRequest(name, value, [dependencies])`
<a id="decorate-request"></a>

As above with [`decorateReply`](#decorate-reply), this API is used add new
methods/properties to the core `Request` object:

```js
fastify.decorateRequest('utility', function () {
  // something very useful
})
```

Note: using an arrow function will break the binding of `this` to the Fastify
`Request` instance.

Note: using `decorateRequest` will emit a warning if used with a reference type:

```js
// Don't do this
fastify.decorateRequest('foo', { bar: 'fizz'})
```
In this example, the reference of the object is shared with all the requests:
**any mutation will impact all requests, potentially creating security
vulnerabilities or memory leaks**.

To achieve proper encapsulation across requests configure a new value for each
incoming request in the [`'onRequest'` hook](./Hooks.md#onrequest). Example:

```js
const fp = require('fastify-plugin')

async function myPlugin (app) {
  app.decorateRequest('foo', null)
  app.addHook('onRequest', async (req, reply) => {
    req.foo = { bar: 42 }
  })
}

module.exports = fp(myPlugin)
```

See [`decorate`](#decorate) for information about the `dependencies` parameter.

#### `hasDecorator(name)`
<a id="has-decorator"></a>

Used to check for the existence of a server instance decoration:

```js
fastify.hasDecorator('utility')
```

#### hasRequestDecorator
<a id="has-request-decorator"></a>

Used to check for the existence of a Request decoration:

```js
fastify.hasRequestDecorator('utility')
```

#### hasReplyDecorator
<a id="has-reply-decorator"></a>

Used to check for the existence of a Reply decoration:

```js
fastify.hasReplyDecorator('utility')
```

### Decorators and Encapsulation
<a id="decorators-encapsulation"></a>

Defining a decorator (using `decorate`, `decorateRequest`, or `decorateReply`)
with the same name more than once in the same **encapsulated** context will
throw an exception.

As an example, the following will throw:

```js
const server = require('fastify')()

server.decorateReply('view', function (template, args) {
  // Amazing view rendering engine
})

server.get('/', (req, reply) => {
  reply.view('/index.html', { hello: 'world' })
})

// Somewhere else in our codebase, we define another
// view decorator. This throws.
server.decorateReply('view', function (template, args) {
  // Another rendering engine
})

server.listen({ port: 3000 })
```


But this will not:

```js
const server = require('fastify')()

server.decorateReply('view', function (template, args) {
  // Amazing view rendering engine.
})

server.register(async function (server, opts) {
  // We add a view decorator to the current encapsulated
  // plugin. This will not throw as outside of this encapsulated
  // plugin view is the old one, while inside it is the new one.
  server.decorateReply('view', function (template, args) {
    // Another rendering engine
  })

  server.get('/', (req, reply) => {
    reply.view('/index.page', { hello: 'world' })
  })
}, { prefix: '/bar' })

server.listen({ port: 3000 })
```

### Getters and Setters
<a id="getters-setters"></a>

Decorators accept special "getter/setter" objects. These objects have functions
named `getter` and `setter` (though the `setter` function is optional). This
allows defining properties via decorators, for example:

```js
fastify.decorate('foo', {
  getter () {
    return 'a getter'
  }
})
```

Will define the `foo` property on the Fastify instance:

```js
console.log(fastify.foo) // 'a getter'
```

## Encapsulation

A fundamental feature of Fastify is the "encapsulation context." The
encapsulation context governs which [decorators](./Decorators.md), registered
[hooks](./Hooks.md), and [plugins](./Plugins.md) are available to
[routes](./Routes.md). A visual representation of the encapsulation context
is shown in the following figure:

![Figure 1](https://www.fastify.io/docs/latest/resources/encapsulation_context.9f299f2791e82cfc.svg)

In the above figure, there are several entities:

1. The _root context_
2. Three _root plugins_
3. Two _child contexts_ where each _child context_ has
    * Two _child plugins_
    * One _grandchild context_ where each _grandchild context_ has
        - Three _child plugins_

Every _child context_ and _grandchild context_ has access to the _root plugins_.
Within each _child context_, the _grandchild contexts_ have access to the
_child plugins_ registered within the containing _child context_, but the
containing _child context_ **does not** have access to the _child plugins_
registered within its _grandchild context_.

Given that everything in Fastify is a [plugin](./Plugins.md), except for the
_root context_, every "context" and "plugin" in this example is a plugin
that can consist of decorators, hooks, plugins, and routes. Thus, to put
this example into concrete terms, consider a basic scenario of a REST API
server that has three routes: the first route (`/one`) requires authentication,
the second route (`/two`) does not, and the third route (`/three`) has
access to the same context as the second route. Using
[@fastify/bearer-auth][bearer] to provide the authentication, the code for this
example is as follows:

```js
'use strict'

const fastify = require('fastify')()

fastify.decorateRequest('answer', 42)

fastify.register(async function authenticatedContext (childServer) {
  childServer.register(require('@fastify/bearer-auth'), { keys: ['abc123'] })

  childServer.route({
    path: '/one',
    method: 'GET',
    handler (request, response) {
      response.send({
        answer: request.answer,
        // request.foo will be undefined as it's only defined in publicContext
        foo: request.foo,
        // request.bar will be undefined as it's only defined in grandchildContext
        bar: request.bar
      })
    }
  })
})

fastify.register(async function publicContext (childServer) {
  childServer.decorateRequest('foo', 'foo')

  childServer.route({
    path: '/two',
    method: 'GET',
    handler (request, response) {
      response.send({
        answer: request.answer,
        foo: request.foo,
        // request.bar will be undefined as it's only defined in grandchildContext
        bar: request.bar
      })
    }
  })

  childServer.register(async function grandchildContext (grandchildServer) {
    grandchildServer.decorateRequest('bar', 'bar')

    grandchildServer.route({
      path: '/three',
      method: 'GET',
      handler (request, response) {
        response.send({
          answer: request.answer,
          foo: request.foo,
          bar: request.bar
        })
      }
    })
  })
})

fastify.listen({ port: 8000 })
```

The above server example shows all of the encapsulation concepts outlined in the
original diagram:

1. Each _child context_ (`authenticatedContext`, `publicContext`, and
`grandchildContext`) has access to the `answer` request decorator defined in
the _root context_.
2. Only the `authenticatedContext` has access to the `@fastify/bearer-auth`
plugin.
3. Both the `publicContext` and `grandchildContext` have access to the `foo`
request decorator.
4. Only the `grandchildContext` has access to the `bar` request decorator.

To see this, start the server and issue requests:

```sh
# curl -H 'authorization: Bearer abc123' http://127.0.0.1:8000/one
{"answer":42}
# curl http://127.0.0.1:8000/two
{"answer":42,"foo":"foo"}
# curl http://127.0.0.1:8000/three
{"answer":42,"foo":"foo","bar":"bar"}
```

[bearer]: https://github.com/fastify/fastify-bearer-auth

## Sharing Between Contexts
<a id="shared-context"></a>

Notice that each context in the prior example inherits _only_ from the parent
contexts. Parent contexts cannot access any entities within their descendent
contexts. This default is occasionally not desired. In such cases, the
encapsulation context can be broken through the usage of
[fastify-plugin][fastify-plugin] such that anything registered in a descendent
context is available to the containing parent context.

Assuming the `publicContext` needs access to the `bar` decorator defined
within the `grandchildContext` in the previous example, the code can be
rewritten as:

```js
'use strict'

const fastify = require('fastify')()
const fastifyPlugin = require('fastify-plugin')

fastify.decorateRequest('answer', 42)

// `authenticatedContext` omitted for clarity

fastify.register(async function publicContext (childServer) {
  childServer.decorateRequest('foo', 'foo')

  childServer.route({
    path: '/two',
    method: 'GET',
    handler (request, response) {
      response.send({
        answer: request.answer,
        foo: request.foo,
        bar: request.bar
      })
    }
  })

  childServer.register(fastifyPlugin(grandchildContext))

  async function grandchildContext (grandchildServer) {
    grandchildServer.decorateRequest('bar', 'bar')

    grandchildServer.route({
      path: '/three',
      method: 'GET',
      handler (request, response) {
        response.send({
          answer: request.answer,
          foo: request.foo,
          bar: request.bar
        })
      }
    })
  }
})

fastify.listen({ port: 8000 })
```

Restarting the server and re-issuing the requests for `/two` and `/three`:

```sh
# curl http://127.0.0.1:8000/two
{"answer":42,"foo":"foo","bar":"bar"}
# curl http://127.0.0.1:8000/three
{"answer":42,"foo":"foo","bar":"bar"}
```

[fastify-plugin]: https://github.com/fastify/fastify-plugin

## Errors
<a id="errors"></a>

### Error Handling In Node.js
<a id="error-handling"></a>

#### Uncaught Errors
In Node.js, uncaught errors are likely to cause memory leaks, file descriptor
leaks, and other major production issues.
[Domains](https://nodejs.org/en/docs/guides/domain-postmortem/) were a failed
attempt to fix this.

Given that it is not possible to process all uncaught errors sensibly, the best
way to deal with them is to
[crash](https://nodejs.org/api/process.html#process_warning_using_uncaughtexception_correctly).

#### Catching Errors In Promises
If you are using promises, you should attach a `.catch()` handler synchronously.

### Errors In Fastify
Fastify follows an all-or-nothing approach and aims to be lean and optimal as
much as possible. The developer is responsible for making sure that the errors
are handled properly.

#### Errors In Input Data
Most errors are a result of unexpected input data, so we recommend [validating
your input data against a JSON schema](./Validation-and-Serialization.md).

#### Catching Uncaught Errors In Fastify
Fastify tries to catch as many uncaught errors as it can without hindering
performance. This includes:

1. synchronous routes, e.g. `app.get('/', () => { throw new Error('kaboom') })`
2. `async` routes, e.g. `app.get('/', async () => { throw new Error('kaboom')
   })`

The error in both cases will be caught safely and routed to Fastify's default
error handler for a generic `500 Internal Server Error` response.

To customize this behavior you should use
[`setErrorHandler`](./Server.md#seterrorhandler).

### Errors In Fastify Lifecycle Hooks And A Custom Error Handler

From the [Hooks documentation](./Hooks.md#manage-errors-from-a-hook):
> If you get an error during the execution of your hook, just pass it to
> `done()` and Fastify will automatically close the request and send the
> appropriate error code to the user.

When a custom error handler has been defined through
[`setErrorHandler`](./Server.md#seterrorhandler), the custom error handler will
receive the error passed to the `done()` callback (or through other supported
automatic error handling mechanisms). If `setErrorHandler` has been used
multiple times to define multiple handlers, the error will be routed to the most
precedent handler defined within the error [encapsulation context](./Encapsulation.md).
Error handlers are fully encapsulated, so a `setErrorHandler` call within a
plugin will limit the error handler to that plugin's context.

The root error handler is Fastify's generic error handler. This error handler
will use the headers and status code in the `Error` object, if they exist. The
headers and status code will not be automatically set if a custom error handler
is provided.

Some things to consider in your custom error handler:

- you can `reply.send(data)`, which will behave as it would in [regular route
  handlers](./Reply.md#senddata)
  - objects are serialized, triggering the `preSerialization` lifecycle hook if
    you have one defined
  - strings, buffers, and streams are sent to the client, with appropriate
    headers (no serialization)

- You can throw a new error in your custom error handler
	- errors (new error or the received error parameter re-thrown) - will call the parent `errorHandler`.
  - `onError` hook will be triggered once only for the first error being thrown.
  - an error will not be triggered twice from a lifecycle hook - Fastify
    internally monitors the error invocation to avoid infinite loops for errors
    thrown in the reply phases of the lifecycle. (those after the route handler)

### Fastify Error Codes
<a id="fastify-error-codes"></a>

#### FST_ERR_BAD_URL
<a id="FST_ERR_BAD_URL"></a>

The router received an invalid url.

<a name="FST_ERR_DUPLICATED_ROUTE"></a>
#### FST_ERR_DUPLICATED_ROUTE

The HTTP method already has a registered controller for that URL

<a name="FST_ERR_CTP_ALREADY_PRESENT"></a>
#### FST_ERR_CTP_ALREADY_PRESENT
<a id="FST_ERR_CTP_ALREADY_PRESENT"></a>

The parser for this content type was already registered.

#### FST_ERR_CTP_BODY_TOO_LARGE
<a id="FST_ERR_CTP_BODY_TOO_LARGE"></a>

The request body is larger than the provided limit.

This setting can be defined in the Fastify server instance:
[`bodyLimit`](./Server.md#bodylimit)

#### FST_ERR_CTP_EMPTY_TYPE
<a id="FST_ERR_CTP_EMPTY_TYPE"></a>

The content type cannot be an empty string.

#### FST_ERR_CTP_INVALID_CONTENT_LENGTH
<a id="FST_ERR_CTP_INVALID_CONTENT_LENGTH"></a>

Request body size did not match Content-Length.

#### FST_ERR_CTP_INVALID_HANDLER
<a id="FST_ERR_CTP_INVALID_HANDLER"></a>

An invalid handler was passed for the content type.

#### FST_ERR_CTP_INVALID_MEDIA_TYPE
<a id="FST_ERR_CTP_INVALID_MEDIA_TYPE"></a>

The received media type is not supported (i.e. there is no suitable
`Content-Type` parser for it).

#### FST_ERR_CTP_INVALID_PARSE_TYPE
<a id="FST_ERR_CTP_INVALID_PARSE_TYPE"></a>

The provided parse type is not supported. Accepted values are `string` or
`buffer`.

#### FST_ERR_CTP_INVALID_TYPE
<a id="FST_ERR_CTP_INVALID_TYPE"></a>

The `Content-Type` should be a string.

#### FST_ERR_DEC_ALREADY_PRESENT
<a id="FST_ERR_DEC_ALREADY_PRESENT"></a>

A decorator with the same name is already registered.

#### FST_ERR_DEC_MISSING_DEPENDENCY
<a id="FST_ERR_DEC_MISSING_DEPENDENCY"></a>

The decorator cannot be registered due to a missing dependency.

#### FST_ERR_HOOK_INVALID_HANDLER
<a id="FST_ERR_HOOK_INVALID_HANDLER"></a>

The hook callback must be a function.

#### FST_ERR_HOOK_INVALID_TYPE
<a id="FST_ERR_HOOK_INVALID_TYPE"></a>

The hook name must be a string.

#### FST_ERR_LOG_INVALID_DESTINATION
<a id="FST_ERR_LOG_INVALID_DESTINATION"></a>

The logger accepts either a `'stream'` or a `'file'` as the destination.

#### FST_ERR_PROMISE_NOT_FULFILLED
<a id="FST_ERR_PROMISE_NOT_FULFILLED"></a>

A promise may not be fulfilled with 'undefined' when statusCode is not 204.

#### FST_ERR_REP_ALREADY_SENT
<a id="FST_ERR_REP_ALREADY_SENT"></a>

A response was already sent.

#### FST_ERR_REP_INVALID_PAYLOAD_TYPE
<a id="FST_ERR_REP_INVALID_PAYLOAD_TYPE"></a>

Reply payload can be either a `string` or a `Buffer`.

#### FST_ERR_SCH_ALREADY_PRESENT
<a id="FST_ERR_SCH_ALREADY_PRESENT"></a>

A schema with the same `$id` already exists.

#### FST_ERR_SCH_MISSING_ID
<a id="FST_ERR_SCH_MISSING_ID"></a>

The schema provided does not have `$id` property.

#### FST_ERR_SCH_SERIALIZATION_BUILD
<a id="FST_ERR_SCH_SERIALIZATION_BUILD"></a>

The JSON schema provided for serialization of a route response is not valid.

#### FST_ERR_SCH_VALIDATION_BUILD
<a id="FST_ERR_SCH_VALIDATION_BUILD"></a>

The JSON schema provided for validation to a route is not valid.

#### FST_ERR_SEND_INSIDE_ONERR
<a id="FST_ERR_SEND_INSIDE_ONERR"></a>

You cannot use `send` inside the `onError` hook.

#### FST_ERR_SEND_UNDEFINED_ERR
<a id="FST_ERR_SEND_UNDEFINED_ERR"></a>

Undefined error has occurred.

<a name="FST_ERR_PLUGIN_NOT_VALID"></a>
#### FST_ERR_PLUGIN_NOT_VALID

Plugin must be a function or a promise.

<a name="FST_ERR_PLUGIN_TIMEOUT"></a>
#### FST_ERR_PLUGIN_TIMEOUT

Plugin did not start in time. Default timeout (in millis): `10000`

<a name="FST_ERR_HOOK_TIMEOUT"></a>
#### FST_ERR_HOOK_TIMEOUT

A callback for a hook timed out

<a name="FST_ERR_ROOT_PLG_BOOTED"></a>
#### FST_ERR_ROOT_PLG_BOOTED

Root plugin has already booted (mapped directly from `avvio`)

<a name="FST_ERR_PARENT_PLUGIN_BOOTED"></a>
#### FST_ERR_PARENT_PLUGIN_BOOTED

Impossible to load plugin because the parent (mapped directly from `avvio`)

<a name="FST_ERR_PLUGIN_CALLBACK_NOT_FN"></a>
#### FST_ERR_PLUGIN_CALLBACK_NOT_FN

Callback for a hook is not a function (mapped directly from `avvio`)

## HTTP2

_Fastify_ offers **experimental support** for HTTP2 starting from Node 8 LTS,
which includes HTTP2 without a flag; HTTP2 is supported over either HTTPS or
plaintext.

Currently, none of the HTTP2-specific APIs are available through _Fastify_, but
Node's `req` and `res` can be accessed through our `Request` and `Reply`
interface. PRs are welcome.

### Secure (HTTPS)

HTTP2 is supported in all modern browsers __only over a secure connection__:

```js
'use strict'

const fs = require('fs')
const path = require('path')
const fastify = require('fastify')({
  http2: true,
  https: {
    key: fs.readFileSync(path.join(__dirname, '..', 'https', 'fastify.key')),
    cert: fs.readFileSync(path.join(__dirname, '..', 'https', 'fastify.cert'))
  }
})

fastify.get('/', function (request, reply) {
  reply.code(200).send({ hello: 'world' })
})

fastify.listen({ port: 3000 })
```

ALPN negotiation allows support for both HTTPS and HTTP/2 over the same socket.
Node core `req` and `res` objects can be either
[HTTP/1](https://nodejs.org/api/http.html) or
[HTTP/2](https://nodejs.org/api/http2.html). _Fastify_ supports this out of the
box:

```js
'use strict'

const fs = require('fs')
const path = require('path')
const fastify = require('fastify')({
  http2: true,
  https: {
    allowHTTP1: true, // fallback support for HTTP1
    key: fs.readFileSync(path.join(__dirname, '..', 'https', 'fastify.key')),
    cert: fs.readFileSync(path.join(__dirname, '..', 'https', 'fastify.cert'))
  }
})

// this route can be accessed through both protocols
fastify.get('/', function (request, reply) {
  reply.code(200).send({ hello: 'world' })
})

fastify.listen({ port: 3000 })
```

You can test your new server with:

```
$ npx h2url https://localhost:3000
```

### Plain or insecure

If you are building microservices, you can connect to HTTP2 in plain text,
however, this is not supported by browsers.

```js
'use strict'

const fastify = require('fastify')({
  http2: true
})

fastify.get('/', function (request, reply) {
  reply.code(200).send({ hello: 'world' })
})

fastify.listen({ port: 3000 })
```

You can test your new server with:

```
$ npx h2url http://localhost:3000
```

## Hooks

Hooks are registered with the `fastify.addHook` method and allow you to listen
to specific events in the application or request/response lifecycle. You have to
register a hook before the event is triggered, otherwise, the event is lost.

By using hooks you can interact directly with the lifecycle of Fastify. There
are Request/Reply hooks and application hooks:

- [Request/Reply Hooks](#requestreply-hooks)
  - [onRequest](#onrequest)
  - [preParsing](#preparsing)
  - [preValidation](#prevalidation)
  - [preHandler](#prehandler)
  - [preSerialization](#preserialization)
  - [onError](#onerror)
  - [onSend](#onsend)
  - [onResponse](#onresponse)
  - [onTimeout](#ontimeout)
  - [Manage Errors from a hook](#manage-errors-from-a-hook)
  - [Respond to a request from a hook](#respond-to-a-request-from-a-hook)
- [Application Hooks](#application-hooks)
  - [onReady](#onready)
  - [onClose](#onclose)
  - [onRoute](#onroute)
  - [onRegister](#onregister)
- [Scope](#scope)
- [Route level hooks](#route-level-hooks)
- [Diagnostics Channel Hooks](#diagnostics-channel-hooks)

**Notice:** the `done` callback is not available when using `async`/`await` or
returning a `Promise`. If you do invoke a `done` callback in this situation
unexpected behavior may occur, e.g. duplicate invocation of handlers.

## Request/Reply Hooks

[Request](./Request.md) and [Reply](./Reply.md) are the core Fastify objects.

`done` is the function to continue with the [lifecycle](./Lifecycle.md).

It is easy to understand where each hook is executed by looking at the
[lifecycle page](./Lifecycle.md).

Hooks are affected by Fastify's encapsulation, and can thus be applied to
selected routes. See the [Scopes](#scope) section for more information.

There are eight different hooks that you can use in Request/Reply *(in order of
execution)*:

### onRequest
```js
fastify.addHook('onRequest', (request, reply, done) => {
  // Some code
  done()
})
```
Or `async/await`:
```js
fastify.addHook('onRequest', async (request, reply) => {
  // Some code
  await asyncMethod()
})
```

**Notice:** in the [onRequest](#onrequest) hook, `request.body` will always be
`undefined`, because the body parsing happens before the
[preValidation](#prevalidation) hook.

### preParsing

If you are using the `preParsing` hook, you can transform the request payload
stream before it is parsed. It receives the request and reply objects as other
hooks, and a stream with the current request payload.

If it returns a value (via `return` or via the callback function), it must
return a stream.

For instance, you can uncompress the request body:

```js
fastify.addHook('preParsing', (request, reply, payload, done) => {
  // Some code
  done(null, newPayload)
})
```
Or `async/await`:
```js
fastify.addHook('preParsing', async (request, reply, payload) => {
  // Some code
  await asyncMethod()
  return newPayload
})
```

**Notice:** in the [preParsing](#preparsing) hook, `request.body` will always be
`undefined`, because the body parsing happens before the
[preValidation](#prevalidation) hook.

**Notice:** you should also add a `receivedEncodedLength` property to the
returned stream. This property is used to correctly match the request payload
with the `Content-Length` header value. Ideally, this property should be updated
on each received chunk.

### preValidation

If you are using the `preValidation` hook, you can change the payload before it
is validated. For example:

```js
fastify.addHook('preValidation', (request, reply, done) => {
  request.body = { ...request.body, importantKey: 'randomString' }
  done()
})
```
Or `async/await`:
```js
fastify.addHook('preValidation', async (request, reply) => {
  const importantKey = await generateRandomString()
  request.body = { ...request.body, importantKey }
})
```

### preHandler
```js
fastify.addHook('preHandler', (request, reply, done) => {
  // some code
  done()
})
```
Or `async/await`:
```js
fastify.addHook('preHandler', async (request, reply) => {
  // Some code
  await asyncMethod()
})
```
### preSerialization

If you are using the `preSerialization` hook, you can change (or replace) the
payload before it is serialized. For example:

```js
fastify.addHook('preSerialization', (request, reply, payload, done) => {
  const err = null
  const newPayload = { wrapped: payload }
  done(err, newPayload)
})
```
Or `async/await`:
```js
fastify.addHook('preSerialization', async (request, reply, payload) => {
  return { wrapped: payload }
})
```

Note: the hook is NOT called if the payload is a `string`, a `Buffer`, a
`stream`, or `null`.

### onError
```js
fastify.addHook('onError', (request, reply, error, done) => {
  // Some code
  done()
})
```
Or `async/await`:
```js
fastify.addHook('onError', async (request, reply, error) => {
  // Useful for custom error logging
  // You should not use this hook to update the error
})
```
This hook is useful if you need to do some custom error logging or add some
specific header in case of error.

It is not intended for changing the error, and calling `reply.send` will throw
an exception.

This hook will be executed only after the `customErrorHandler` has been
executed, and only if the `customErrorHandler` sends an error back to the user
*(Note that the default `customErrorHandler` always sends the error back to the
user)*.

**Notice:** unlike the other hooks, passing an error to the `done` function is not
supported.

### onSend
If you are using the `onSend` hook, you can change the payload. For example:

```js
fastify.addHook('onSend', (request, reply, payload, done) => {
  const err = null;
  const newPayload = payload.replace('some-text', 'some-new-text')
  done(err, newPayload)
})
```
Or `async/await`:
```js
fastify.addHook('onSend', async (request, reply, payload) => {
  const newPayload = payload.replace('some-text', 'some-new-text')
  return newPayload
})
```

You can also clear the payload to send a response with an empty body by
replacing the payload with `null`:

```js
fastify.addHook('onSend', (request, reply, payload, done) => {
  reply.code(304)
  const newPayload = null
  done(null, newPayload)
})
```

> You can also send an empty body by replacing the payload with the empty string
> `''`, but be aware that this will cause the `Content-Length` header to be set
> to `0`, whereas the `Content-Length` header will not be set if the payload is
> `null`.

Note: If you change the payload, you may only change it to a `string`, a
`Buffer`, a `stream`, or `null`.


### onResponse
```js
fastify.addHook('onResponse', (request, reply, done) => {
  // Some code
  done()
})
```
Or `async/await`:
```js
fastify.addHook('onResponse', async (request, reply) => {
  // Some code
  await asyncMethod()
})
```

The `onResponse` hook is executed when a response has been sent, so you will not
be able to send more data to the client. It can however be useful for sending
data to external services, for example, to gather statistics.

### onTimeout

```js
fastify.addHook('onTimeout', (request, reply, done) => {
  // Some code
  done()
})
```
Or `async/await`:
```js
fastify.addHook('onTimeout', async (request, reply) => {
  // Some code
  await asyncMethod()
})
```
`onTimeout` is useful if you need to monitor the request timed out in your
service (if the `connectionTimeout` property is set on the Fastify instance).
The `onTimeout` hook is executed when a request is timed out and the HTTP socket
has been hanged up. Therefore, you will not be able to send data to the client.


### Manage Errors from a hook
If you get an error during the execution of your hook, just pass it to `done()`
and Fastify will automatically close the request and send the appropriate error
code to the user.

```js
fastify.addHook('onRequest', (request, reply, done) => {
  done(new Error('Some error'))
})
```

If you want to pass a custom error code to the user, just use `reply.code()`:
```js
fastify.addHook('preHandler', (request, reply, done) => {
  reply.code(400)
  done(new Error('Some error'))
})
```
*The error will be handled by [`Reply`](./Reply.md#errors).*

Or if you're using `async/await` you can just throw an error:
```js
fastify.addHook('onResponse', async (request, reply) => {
  throw new Error('Some error')
})
```

### Respond to a request from a hook

If needed, you can respond to a request before you reach the route handler, for
example when implementing an authentication hook. Replying from a hook implies
that the hook chain is __stopped__ and the rest of the hooks and handlers are
not executed. If the hook is using the callback approach, i.e. it is not an
`async` function or it returns a `Promise`, it is as simple as calling
`reply.send()` and avoiding calling the callback. If the hook is `async`,
`reply.send()` __must__ be called _before_ the function returns or the promise
resolves, otherwise, the request will proceed. When `reply.send()` is called
outside of the promise chain, it is important to `return reply` otherwise the
request will be executed twice.

It is important to __not mix callbacks and `async`/`Promise`__, otherwise the
hook chain will be executed twice.

If you are using `onRequest` or `preHandler` use `reply.send`.

```js
fastify.addHook('onRequest', (request, reply, done) => {
  reply.send('Early response')
})

// Works with async functions too
fastify.addHook('preHandler', async (request, reply) => {
  await something()
  reply.send({ hello: 'world' })
  return reply // mandatory, so the request is not executed further
})
```

If you want to respond with a stream, you should avoid using an `async` function
for the hook. If you must use an `async` function, your code will need to follow
the pattern in
[test/hooks-async.js](https://github.com/fastify/fastify/blob/94ea67ef2d8dce8a955d510cd9081aabd036fa85/test/hooks-async.js#L269-L275).

```js
fastify.addHook('onRequest', (request, reply, done) => {
  const stream = fs.createReadStream('some-file', 'utf8')
  reply.send(stream)
})
```

If you are sending a response without `await` on it, make sure to always `return
reply`:

```js
fastify.addHook('preHandler', async (request, reply) => {
  setImmediate(() => { reply.send('hello') })

  // This is needed to signal the handler to wait for a response
  // to be sent outside of the promise chain
  return reply
})

fastify.addHook('preHandler', async (request, reply) => {
  // the @fastify/static plugin will send a file asynchronously,
  // so we should return reply
  reply.sendFile('myfile')
  return reply
})
```

## Application Hooks

You can hook into the application-lifecycle as well.

- [onReady](#onready)
- [onClose](#onclose)
- [onRoute](#onroute)
- [onRegister](#onregister)

### onReady
Triggered before the server starts listening for requests and when `.ready()` is
invoked. It cannot change the routes or add new hooks. Registered hook functions
are executed serially. Only after all `onReady` hook functions have completed
will the server start listening for requests. Hook functions accept one
argument: a callback, `done`, to be invoked after the hook function is complete.
Hook functions are invoked with `this` bound to the associated Fastify instance.

```js
// callback style
fastify.addHook('onReady', function (done) {
  // Some code
  const err = null;
  done(err)
})

// or async/await style
fastify.addHook('onReady', async function () {
  // Some async code
  await loadCacheFromDatabase()
})
```

### onClose
<a id="on-close"></a>

Triggered when `fastify.close()` is invoked to stop the server. It is useful
when [plugins](./Plugins.md) need a "shutdown" event, for example, to close an
open connection to a database.

The hook function takes the Fastify instance as a first argument, 
and a `done` callback for synchronous hook functions.
```js
// callback style
fastify.addHook('onClose', (instance, done) => {
  // Some code
  done()
})

// or async/await style
fastify.addHook('onClose', async (instance) => {
  // Some async code
  await closeDatabaseConnections()
})
```

### onRoute
<a id="on-route"></a>

Triggered when a new route is registered. Listeners are passed a `routeOptions`
object as the sole parameter. The interface is synchronous, and, as such, the
listeners are not passed a callback. This hook is encapsulated.

```js
fastify.addHook('onRoute', (routeOptions) => {
  //Some code
  routeOptions.method
  routeOptions.schema
  routeOptions.url // the complete URL of the route, it will include the prefix if any
  routeOptions.path // `url` alias
  routeOptions.routePath // the URL of the route without the prefix
  routeOptions.bodyLimit
  routeOptions.logLevel
  routeOptions.logSerializers
  routeOptions.prefix
})
```

If you are authoring a plugin and you need to customize application routes, like
modifying the options or adding new route hooks, this is the right place.

```js
fastify.addHook('onRoute', (routeOptions) => {
  function onPreSerialization(request, reply, payload, done) {
    // Your code
    done(null, payload)
  }
  // preSerialization can be an array or undefined
  routeOptions.preSerialization = [...(routeOptions.preSerialization || []), onPreSerialization]
})
```

### onRegister
<a id="on-register"></a>

Triggered when a new plugin is registered and a new encapsulation context is
created. The hook will be executed **before** the registered code.

This hook can be useful if you are developing a plugin that needs to know when a
plugin context is formed, and you want to operate in that specific context, thus
this hook is encapsulated.

**Note:** This hook will not be called if a plugin is wrapped inside
[`fastify-plugin`](https://github.com/fastify/fastify-plugin).
```js
fastify.decorate('data', [])

fastify.register(async (instance, opts) => {
  instance.data.push('hello')
  console.log(instance.data) // ['hello']

  instance.register(async (instance, opts) => {
    instance.data.push('world')
    console.log(instance.data) // ['hello', 'world']
  }, { prefix: '/hola' })
}, { prefix: '/ciao' })

fastify.register(async (instance, opts) => {
  console.log(instance.data) // []
}, { prefix: '/hello' })

fastify.addHook('onRegister', (instance, opts) => {
  // Create a new array from the old one
  // but without keeping the reference
  // allowing the user to have encapsulated
  // instances of the `data` property
  instance.data = instance.data.slice()

  // the options of the new registered instance
  console.log(opts.prefix)
})
```

## Scope
<a id="scope"></a>

Except for [onClose](#onclose), all hooks are encapsulated. This means that you
can decide where your hooks should run by using `register` as explained in the
[plugins guide](../Guides/Plugins-Guide.md). If you pass a function, that
function is bound to the right Fastify context and from there you have full
access to the Fastify API.

```js
fastify.addHook('onRequest', function (request, reply, done) {
  const self = this // Fastify context
  done()
})
```

Note that the Fastify context in each hook is the same as the plugin where the
route was registered, for example:

```js
fastify.addHook('onRequest', async function (req, reply) {
  if (req.raw.url === '/nested') {
    assert.strictEqual(this.foo, 'bar')
  } else {
    assert.strictEqual(this.foo, undefined)
  }
})

fastify.get('/', async function (req, reply) {
  assert.strictEqual(this.foo, undefined)
  return { hello: 'world' }
})

fastify.register(async function plugin (fastify, opts) {
  fastify.decorate('foo', 'bar')

  fastify.get('/nested', async function (req, reply) {
    assert.strictEqual(this.foo, 'bar')
    return { hello: 'world' }
  })
})
```

Warn: if you declare the function with an [arrow
function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions),
the `this` will not be Fastify, but the one of the current scope.


## Route level hooks
<a id="route-hooks"></a>

You can declare one or more custom lifecycle hooks ([onRequest](#onrequest),
[onResponse](#onresponse), [preParsing](#preparsing),
[preValidation](#prevalidation), [preHandler](#prehandler),
[preSerialization](#preserialization), [onSend](#onsend),
[onTimeout](#ontimeout), and [onError](#onerror)) hook(s) that will be
**unique** for the route. If you do so, those hooks are always executed as the
last hook in their category.

This can be useful if you need to implement authentication, where the
[preParsing](#preparsing) or [preValidation](#prevalidation) hooks are exactly
what you need. Multiple route-level hooks can also be specified as an array.

```js
fastify.addHook('onRequest', (request, reply, done) => {
  // Your code
  done()
})

fastify.addHook('onResponse', (request, reply, done) => {
  // your code
  done()
})

fastify.addHook('preParsing', (request, reply, done) => {
  // Your code
  done()
})

fastify.addHook('preValidation', (request, reply, done) => {
  // Your code
  done()
})

fastify.addHook('preHandler', (request, reply, done) => {
  // Your code
  done()
})

fastify.addHook('preSerialization', (request, reply, payload, done) => {
  // Your code
  done(null, payload)
})

fastify.addHook('onSend', (request, reply, payload, done) => {
  // Your code
  done(null, payload)
})

fastify.addHook('onTimeout', (request, reply, done) => {
  // Your code
  done()
})

fastify.addHook('onError', (request, reply, error, done) => {
  // Your code
  done()
})

fastify.route({
  method: 'GET',
  url: '/',
  schema: { ... },
  onRequest: function (request, reply, done) {
    // This hook will always be executed after the shared `onRequest` hooks
    done()
  },
  onResponse: function (request, reply, done) {
    // this hook will always be executed after the shared `onResponse` hooks
    done()
  },
  preParsing: function (request, reply, done) {
    // This hook will always be executed after the shared `preParsing` hooks
    done()
  },
  preValidation: function (request, reply, done) {
    // This hook will always be executed after the shared `preValidation` hooks
    done()
  },
  preHandler: function (request, reply, done) {
    // This hook will always be executed after the shared `preHandler` hooks
    done()
  },
  // // Example with an array. All hooks support this syntax.
  //
  // preHandler: [function (request, reply, done) {
  //   // This hook will always be executed after the shared `preHandler` hooks
  //   done()
  // }],
  preSerialization: (request, reply, payload, done) => {
    // This hook will always be executed after the shared `preSerialization` hooks
    done(null, payload)
  },
  onSend: (request, reply, payload, done) => {
    // This hook will always be executed after the shared `onSend` hooks
    done(null, payload)
  },
  onTimeout: (request, reply, done) => {
    // This hook will always be executed after the shared `onTimeout` hooks
    done()
  },
  onError: (request, reply, error, done) => {
    // This hook will always be executed after the shared `onError` hooks
    done()
  },
  handler: function (request, reply) {
    reply.send({ hello: 'world' })
  }
})
```

**Note**: both options also accept an array of functions.

## Diagnostics Channel Hooks

> **Note:** The `diagnostics_channel` is currently experimental on Node.js, so
> its API is subject to change even in semver-patch releases of Node.js. For
> versions of Node.js supported by Fastify where `diagnostics_channel` is
> unavailable, the hook will use the
> [polyfill](https://www.npmjs.com/package/diagnostics_channel) if it is
> available. Otherwise, this feature will not be present.

Currently, one
[`diagnostics_channel`](https://nodejs.org/api/diagnostics_channel.html) publish
event, `'fastify.initialization'`, happens at initialization time. The Fastify
instance is passed into the hook as a property of the object passed in. At this
point, the instance can be interacted with to add hooks, plugins, routes, or any
other sort of modification.

For example, a tracing package might do something like the following (which is,
of course, a simplification). This would be in a file loaded in the
initialization of the tracking package, in the typical "require instrumentation
tools first" fashion.

```js
const tracer = /* retrieved from elsehwere in the package */
const dc = require('diagnostics_channel')
const channel = dc.channel('fastify.initialization')
const spans = new WeakMap()

channel.subscribe(function ({ fastify }) {
  fastify.addHook('onRequest', (request, reply, done) => {
    const span = tracer.startSpan('fastify.request')
    spans.set(request, span)
    done()
  })

  fastify.addHook('onResponse', (request, reply, done) => {
    const span = spans.get(request)
    span.finish()
    done()
  })
})
```

## Lifecycle
Following the schema of the internal lifecycle of Fastify.

On the right branch of every section there is the next phase of the lifecycle,
on the left branch there is the corresponding error code that will be generated
if the parent throws an error *(note that all the errors are automatically
handled by Fastify)*.

```
Incoming Request
  │
  └─▶ Routing
        │
        └─▶ Instance Logger
             │
   4**/5** ◀─┴─▶ onRequest Hook
                  │
        4**/5** ◀─┴─▶ preParsing Hook
                        │
              4**/5** ◀─┴─▶ Parsing
                             │
                   4**/5** ◀─┴─▶ preValidation Hook
                                  │
                            400 ◀─┴─▶ Validation
                                        │
                              4**/5** ◀─┴─▶ preHandler Hook
                                              │
                                    4**/5** ◀─┴─▶ User Handler
                                                    │
                                                    └─▶ Reply
                                                          │
                                                4**/5** ◀─┴─▶ preSerialization Hook
                                                                │
                                                                └─▶ onSend Hook
                                                                      │
                                                            4**/5** ◀─┴─▶ Outgoing Response
                                                                            │
                                                                            └─▶ onResponse Hook
```

At any point before or during the `User Handler`, `reply.hijack()` can be called
to prevent Fastify from:
- Running all the following hooks and user handler
- Sending the response automatically

NB (*): If `reply.raw` is used to send a response back to the user, `onResponse`
hooks will still be executed

## Reply Lifecycle

Whenever the user handles the request, the result may be:

- in async handler: it returns a payload
- in async handler: it throws an `Error`
- in sync handler: it sends a payload
- in sync handler: it sends an `Error` instance

If the reply was hijacked, we skip all the below steps. Otherwise, when it is
being submitted, the data flow performed is the following:

```
                        ★ schema validation Error
                                    │
                                    └─▶ schemaErrorFormatter
                                               │
                          reply sent ◀── JSON ─┴─ Error instance
                                                      │
                                                      │         ★ throw an Error
                     ★ send or return                 │                 │
                            │                         │                 │
                            │                         ▼                 │
       reply sent ◀── JSON ─┴─ Error instance ──▶ setErrorHandler ◀─────┘
                                                      │
                                 reply sent ◀── JSON ─┴─ Error instance ──▶ onError Hook
                                                                                │
                                                                                └─▶ reply sent
```

Note: `reply sent` means that the JSON payload will be serialized by:

- the [reply serialized](./Server.md#setreplyserializer) if set
- or by the [serializer compiler](./Server.md#setserializercompiler) when a JSON
  schema has been set for the returning HTTP status code
- or by the default `JSON.stringify` function

## Logging

### Enable logging
Logging is disabled by default, and you can enable it by passing `{ logger: true
}` or `{ logger: { level: 'info' } }` when you create a Fastify instance. Note
that if the logger is disabled, it is impossible to enable it at runtime. We use
[abstract-logging](https://www.npmjs.com/package/abstract-logging) for this
purpose.

As Fastify is focused on performance, it uses
[pino](https://github.com/pinojs/pino) as its logger, with the default log
level, when enabled, set to `'info'`.

Enabling the production JSON logger:

```js
const fastify = require('fastify')({
  logger: true
})
```

Enabling the logger with appropriate configuration for both local development
and production environment requires bit more configuration:
```js
const fastify = require('fastify')({
  logger: {
      transport:
        environment === 'development'
          ? {
              target: 'pino-pretty',
              options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname'
              }
            }
          : undefined
    }
})
```
⚠️ `pino-pretty` needs to be installed as a dev dependency, it is not included
by default for performance reasons.

### Usage
You can use the logger like this in your route handlers:

```js
fastify.get('/', options, function (request, reply) {
  request.log.info('Some info about the current request')
  reply.send({ hello: 'world' })
})
```

You can trigger new logs outside route handlers by using the Pino instance from
the Fastify instance:
```js
fastify.log.info('Something important happened!');
```

If you want to pass some options to the logger, just pass them to Fastify. You
can find all available options in the [Pino
documentation](https://github.com/pinojs/pino/blob/master/docs/api.md#pinooptions-stream).
If you want to specify a file destination, use:

```js
const fastify = require('fastify')({
  logger: {
    level: 'info',
    file: '/path/to/file' // Will use pino.destination()
  }
})

fastify.get('/', options, function (request, reply) {
  request.log.info('Some info about the current request')
  reply.send({ hello: 'world' })
})
```

If you want to pass a custom stream to the Pino instance, just add a stream
field to the logger object.

```js
const split = require('split2')
const stream = split(JSON.parse)

const fastify = require('fastify')({
  logger: {
    level: 'info',
    stream: stream
  }
})
```

<a id="logging-request-id"></a>

By default, Fastify adds an ID to every request for easier tracking. If the
"request-id" header is present its value is used, otherwise a new incremental ID
is generated. See Fastify Factory
[`requestIdHeader`](./Server.md#factory-request-id-header) and Fastify Factory
[`genReqId`](./Server.md#genreqid) for customization options.

The default logger is configured with a set of standard serializers that
serialize objects with `req`, `res`, and `err` properties. The object received
by `req` is the Fastify [`Request`](./Request.md) object, while the object
received by `res` is the Fastify [`Reply`](./Reply.md) object. This behaviour
can be customized by specifying custom serializers.
```js
const fastify = require('fastify')({
  logger: {
    serializers: {
      req (request) {
        return { url: request.url }
      }
    }
  }
})
```
For example, the response payload and headers could be logged using the approach
below (even if it is *not recommended*):

```js
const fastify = require('fastify')({
  logger: {
    transport: {
      target: 'pino-pretty'
    },
    serializers: {
      res (reply) {
        // The default
        return {
          statusCode: reply.statusCode
        }
      },
      req (request) {
        return {
          method: request.method,
          url: request.url,
          path: request.routerPath,
          parameters: request.params,
          // Including the headers in the log could be in violation
          // of privacy laws, e.g. GDPR. You should use the "redact" option to
          // remove sensitive fields. It could also leak authentication data in
          // the logs.
          headers: request.headers
        };
      }
    }
  }
});
```
**Note**: The body cannot be serialized inside a `req` method because the
request is serialized when we create the child logger. At that time, the body is
not yet parsed.

See an approach to log `req.body`

```js
app.addHook('preHandler', function (req, reply, done) {
  if (req.body) {
    req.log.info({ body: req.body }, 'parsed body')
  }
  done()
})
```


*Any logger other than Pino will ignore this option.*

You can also supply your own logger instance. Instead of passing configuration
options, pass the instance. The logger you supply must conform to the Pino
interface; that is, it must have the following methods: `info`, `error`,
`debug`, `fatal`, `warn`, `trace`, `child`.

Example:

```js
const log = require('pino')({ level: 'info' })
const fastify = require('fastify')({ logger: log })

log.info('does not have request information')

fastify.get('/', function (request, reply) {
  request.log.info('includes request information, but is the same logger instance as `log`')
  reply.send({ hello: 'world' })
})
```

*The logger instance for the current request is available in every part of the
[lifecycle](./Lifecycle.md).*

## Log Redaction

[Pino](https://getpino.io) supports low-overhead log redaction for obscuring
values of specific properties in recorded logs. As an example, we might want to
log all the HTTP headers minus the `Authorization` header for security concerns:

```js
const fastify = Fastify({
  logger: {
    stream: stream,
    redact: ['req.headers.authorization'],
    level: 'info',
    serializers: {
      req (request) {
        return {
          method: request.method,
          url: request.url,
          headers: request.headers,
          hostname: request.hostname,
          remoteAddress: request.ip,
          remotePort: request.socket.remotePort
        }
      }
    }
  }
})
```

See https://getpino.io/#/docs/redaction for more details.

## Middleware

Starting with Fastify v3.0.0, middleware is not supported out of the box and
requires an external plugin such as
[`@fastify/express`](https://github.com/fastify/fastify-express) or
[`middie`](https://github.com/fastify/middie).


An example of registering the
[`@fastify/express`](https://github.com/fastify/fastify-express) plugin to `use`
Express middleware:

```js
await fastify.register(require('@fastify/express'))
fastify.use(require('cors')())
fastify.use(require('dns-prefetch-control')())
fastify.use(require('frameguard')())
fastify.use(require('hsts')())
fastify.use(require('ienoopen')())
fastify.use(require('x-xss-protection')())
```

You can also use [`middie`](https://github.com/fastify/middie), which provides
support for simple Express-style middleware but with improved performance:

```js
await fastify.register(require('middie'))
fastify.use(require('cors')())
```

Remember that middleware can be encapsulated; this means that you can decide
where your middleware should run by using `register` as explained in the
[plugins guide](../Guides/Plugins-Guide.md).

Fastify middleware does not expose the `send` method or other methods specific to
the Fastify [Reply](./Reply.md#reply) instance. This is because Fastify wraps
the incoming `req` and `res` Node instances using the
[Request](./Request.md#request) and [Reply](./Reply.md#reply) objects
internally, but this is done after the middleware phase. If you need to create
middleware, you have to use the Node `req` and `res` instances. Otherwise, you
can use the `preHandler` hook that already has the
[Request](./Request.md#request) and [Reply](./Reply.md#reply) Fastify instances.
For more information, see [Hooks](./Hooks.md#hooks).

#### Restrict middleware execution to certain paths
<a id="restrict-usage"></a>

If you need to only run middleware under certain paths, just pass the path as
the first parameter to `use` and you are done!

*Note that this does not support routes with parameters, (e.g.
`/user/:id/comments`) and wildcards are not supported in multiple paths.*

```js
const path = require('path')
const serveStatic = require('serve-static')

// Single path
fastify.use('/css', serveStatic(path.join(__dirname, '/assets')))

// Wildcard path
fastify.use('/css/(.*)', serveStatic(path.join(__dirname, '/assets')))

// Multiple paths
fastify.use(['/css', '/js'], serveStatic(path.join(__dirname, '/assets')))
```

### Alternatives

Fastify offers some alternatives to the most commonly used middleware, such as
[`@fastify/helmet`](https://github.com/fastify/fastify-helmet) in case of
[`helmet`](https://github.com/helmetjs/helmet),
[`@fastify/cors`](https://github.com/fastify/fastify-cors) for
[`cors`](https://github.com/expressjs/cors), and
[`@fastify/static`](https://github.com/fastify/fastify-static) for
[`serve-static`](https://github.com/expressjs/serve-static).

## Plugins
Fastify allows the user to extend its functionalities with plugins. A plugin can
be a set of routes, a server [decorator](./Decorators.md), or whatever. The API
that you will need to use one or more plugins, is `register`.

By default, `register` creates a *new scope*, this means that if you make some
changes to the Fastify instance (via `decorate`), this change will not be
reflected by the current context ancestors, but only by its descendants. This
feature allows us to achieve plugin *encapsulation* and *inheritance*, in this
way we create a *directed acyclic graph* (DAG) and we will not have issues caused
by cross dependencies.

You may have already seen in the [Getting Started]((../Guides/Getting-Started.md#your-first-plugin)) guide how easy it is to use this API:
```
fastify.register(plugin, [options])
```

### Plugin Options
<a id="plugin-options"></a>

The optional `options` parameter for `fastify.register` supports a predefined
set of options that Fastify itself will use, except when the plugin has been
wrapped with [fastify-plugin](https://github.com/fastify/fastify-plugin). This
options object will also be passed to the plugin upon invocation, regardless of
whether or not the plugin has been wrapped. The currently supported list of
Fastify specific options is:

+ [`logLevel`](./Routes.md#custom-log-level)
+ [`logSerializers`](./Routes.md#custom-log-serializer)
+ [`prefix`](#route-prefixing-option)

**Note: Those options will be ignored when used with fastify-plugin**

It is possible that Fastify will directly support other options in the future.
Thus, to avoid collisions, a plugin should consider namespacing its options. For
example, a plugin `foo` might be registered like so:

```js
fastify.register(require('fastify-foo'), {
  prefix: '/foo',
  foo: {
    fooOption1: 'value',
    fooOption2: 'value'
  }
})
```

If collisions are not a concern, the plugin may simply accept the options object
as-is:

```js
fastify.register(require('fastify-foo'), {
  prefix: '/foo',
  fooOption1: 'value',
  fooOption2: 'value'
})
```

The `options` parameter can also be a `Function` that will be evaluated at the
time the plugin is registered while giving access to the Fastify instance via
the first positional argument:

```js
const fp = require('fastify-plugin')

fastify.register(fp((fastify, opts, done) => {
  fastify.decorate('foo_bar', { hello: 'world' })

  done()
}))

// The opts argument of fastify-foo will be { hello: 'world' }
fastify.register(require('fastify-foo'), parent => parent.foo_bar)
```

The Fastify instance passed on to the function is the latest state of the
**external Fastify instance** the plugin was declared on, allowing access to
variables injected via [`decorate`](./Decorators.md) by preceding plugins
according to the **order of registration**. This is useful in case a plugin
depends on changes made to the Fastify instance by a preceding plugin i.e.
utilizing an existing database connection to wrap around it.

Keep in mind that the Fastify instance passed on to the function is the same as
the one that will be passed into the plugin, a copy of the external Fastify
instance rather than a reference. Any usage of the instance will behave the same
as it would if called within the plugins function i.e. if `decorate` is called,
the decorated variables will be available within the plugins function unless it
was wrapped with [`fastify-plugin`](https://github.com/fastify/fastify-plugin).

#### Route Prefixing option
<a id="route-prefixing-option"></a>

If you pass an option with the key `prefix` with a `string` value, Fastify will
use it to prefix all the routes inside the register, for more info check
[here](./Routes.md#route-prefixing).

Be aware that if you use
[`fastify-plugin`](https://github.com/fastify/fastify-plugin) this option will
not work.

#### Error handling
<a id="error-handling"></a>

The error handling is done by
[avvio](https://github.com/mcollina/avvio#error-handling).

As a general rule, it is highly recommended that you handle your errors in the
next `after` or `ready` block, otherwise you will get them inside the `listen`
callback.

```js
fastify.register(require('my-plugin'))

// `after` will be executed once
// the previous declared `register` has finished
fastify.after(err => console.log(err))

// `ready` will be executed once all the registers declared
// have finished their execution
fastify.ready(err => console.log(err))

// `listen` is a special ready,
// so it behaves in the same way
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) console.log(err)
})
```

### async/await
<a id="async-await"></a>

*async/await* is supported by `after`, `ready`, and `listen`, as well as
`fastify` being a [Thenable](https://promisesaplus.com/).

```js
await fastify.register(require('my-plugin'))

await fastify.after()

await fastify.ready()

await fastify.listen({ port: 3000 })
```

#### ESM support
<a id="esm-support"></a>

ESM is supported as well from [Node.js
`v13.3.0`](https://nodejs.org/api/esm.html) and above!

```js
// main.mjs
import Fastify from 'fastify'
const fastify = Fastify()

fastify.register(import('./plugin.mjs'))

fastify.listen({ port: 3000 }, console.log)


// plugin.mjs
async function plugin (fastify, opts) {
  fastify.get('/', async (req, reply) => {
    return { hello: 'world' }
  })
}

export default plugin
```

### Create a plugin
<a id="create-plugin"></a>

Creating a plugin is very easy, you just need to create a function that takes
three parameters, the `fastify` instance, an `options` object, and the `done`
callback.

Example:
```js
module.exports = function (fastify, opts, done) {
  fastify.decorate('utility', function () {})

  fastify.get('/', handler)

  done()
}
```
You can also use `register` inside another `register`:
```js
module.exports = function (fastify, opts, done) {
  fastify.decorate('utility', function () {})

  fastify.get('/', handler)

  fastify.register(require('./other-plugin'))

  done()
}
```
Sometimes, you will need to know when the server is about to close, for example,
because you must close a connection to a database. To know when this is going to
happen, you can use the [`'onClose'`](./Hooks.md#on-close) hook.

Do not forget that `register` will always create a new Fastify scope, if you do
not need that, read the following section.

### Handle the scope
<a id="handle-scope"></a>

If you are using `register` only for extending the functionality of the server
with  [`decorate`](./Decorators.md), it is your responsibility to tell Fastify
not to create a new scope. Otherwise, your changes will not be accessible by the
user in the upper scope.

You have two ways to tell Fastify to avoid the creation of a new context:
- Use the [`fastify-plugin`](https://github.com/fastify/fastify-plugin) module
- Use the `'skip-override'` hidden property

We recommend using the `fastify-plugin` module, because it solves this problem
for you, and you can pass a version range of Fastify as a parameter that your
plugin will support.
```js
const fp = require('fastify-plugin')

module.exports = fp(function (fastify, opts, done) {
  fastify.decorate('utility', function () {})
  done()
}, '0.x')
```
Check the [`fastify-plugin`](https://github.com/fastify/fastify-plugin)
documentation to learn more about how to use this module.

If you do not use the `fastify-plugin` module, you can use the `'skip-override'`
hidden property, but we do not recommend it. If in the future the Fastify API
changes it will be your responsibility to update the module, while if you use
`fastify-plugin`, you can be sure about backward compatibility.
```js
function yourPlugin (fastify, opts, done) {
  fastify.decorate('utility', function () {})
  done()
}
yourPlugin[Symbol.for('skip-override')] = true
module.exports = yourPlugin
```

## Reply
- [Reply](#reply)
  - [Introduction](#introduction)
  - [.code(statusCode)](#codestatuscode)
  - [.statusCode](#statuscode)
  - [.server](#server)
  - [.header(key, value)](#headerkey-value)
      - [set-cookie](#set-cookie)
  - [.headers(object)](#headersobject)
  - [.getHeader(key)](#getheaderkey)
  - [.getHeaders()](#getheaders)
  - [.removeHeader(key)](#removeheaderkey)
  - [.hasHeader(key)](#hasheaderkey)
  - [.trailer(key, function)](#trailerkey-function)
  - [.hasTrailer(key)](#hastrailerkey)
  - [.removeTrailer(key)](#removetrailerkey)
  - [.redirect([code,] dest)](#redirectcode--dest)
  - [.callNotFound()](#callnotfound)
  - [.getResponseTime()](#getresponsetime)
  - [.type(contentType)](#typecontenttype)
  - [.serializer(func)](#serializerfunc)
  - [.raw](#raw)
  - [.sent](#sent)
  - [.hijack()](#hijack)
  - [.send(data)](#senddata)
    - [Objects](#objects)
    - [Strings](#strings)
    - [Streams](#streams)
    - [Buffers](#buffers)
    - [Errors](#errors)
    - [Type of the final payload](#type-of-the-final-payload)
    - [Async-Await and Promises](#async-await-and-promises)
  - [.then(fulfilled, rejected)](#thenfulfilled-rejected)

### Introduction
<a id="introduction"></a>

The second parameter of the handler function is `Reply`. Reply is a core Fastify
object that exposes the following functions and properties:

- `.code(statusCode)` - Sets the status code.
- `.status(statusCode)` - An alias for `.code(statusCode)`.
- `.statusCode` - Read and set the HTTP status code.
- `.server` - A reference to the fastify instance object.
- `.header(name, value)` - Sets a response header.
- `.headers(object)` - Sets all the keys of the object as response headers.
- `.getHeader(name)` - Retrieve value of already set header.
- `.getHeaders()` - Gets a shallow copy of all current response headers.
- `.removeHeader(key)` - Remove the value of a previously set header.
- `.hasHeader(name)` - Determine if a header has been set.
- `.trailer(key, function)` - Sets a response trailer.
- `.hasTrailer(key)` - Determine if a trailer has been set.
- `.removeTrailer(key)` - Remove the value of a previously set trailer.
- `.type(value)` - Sets the header `Content-Type`.
- `.redirect([code,] dest)` - Redirect to the specified url, the status code is
  optional (default to `302`).
- `.callNotFound()` - Invokes the custom not found handler.
- `.serialize(payload)` - Serializes the specified payload using the default
  JSON serializer or using the custom serializer (if one is set) and returns the
  serialized payload.
- `.serializer(function)` - Sets a custom serializer for the payload.
- `.send(payload)` - Sends the payload to the user, could be a plain text, a
  buffer, JSON, stream, or an Error object.
- `.sent` - A boolean value that you can use if you need to know if `send` has
  already been called.
- `.hijack()` - interrupt the normal request lifecycle.
- `.raw` - The
  [`http.ServerResponse`](https://nodejs.org/dist/latest-v14.x/docs/api/http.html#http_class_http_serverresponse)
  from Node core.
- `.log` - The logger instance of the incoming request.
- `.request` - The incoming request.
- `.context` - Access the [Request's context](./Request.md) property.

```js
fastify.get('/', options, function (request, reply) {
  // Your code
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ hello: 'world' })
})
```

Additionally, `Reply` provides access to the context of the request:

```js
fastify.get('/', {config: {foo: 'bar'}}, function (request, reply) {
  reply.send('handler config.foo = ' + reply.context.config.foo)
})
```

### .code(statusCode)
<a id="code"></a>

If not set via `reply.code`, the resulting `statusCode` will be `200`.

### .statusCode
<a id="statusCode"></a>

This property reads and sets the HTTP status code. It is an alias for
`reply.code()` when used as a setter.
```js
if (reply.statusCode >= 299) {
  reply.statusCode = 500
}
```

### .server
<a id="server"></a>

The Fastify server instance, scoped to the current [encapsulation
context](./Encapsulation.md).

```js
fastify.decorate('util', function util () {
  return 'foo'
})

fastify.get('/', async function (req, rep) {
  return rep.server.util() // foo
})
```

### .header(key, value)
<a id="header"></a>

Sets a response header. If the value is omitted or undefined, it is coerced to
`''`.

> Note: the header's value must be properly encoded using [`encodeURI`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) or similar modules such as [`encodeurl`](https://www.npmjs.com/package/encodeurl). Invalid characters will result in a 500 `TypeError` response.

For more information, see
[`http.ServerResponse#setHeader`](https://nodejs.org/dist/latest-v14.x/docs/api/http.html#http_response_setheader_name_value).

- ### set-cookie
  <a id="set-cookie"></a>

    - When sending different values as a cookie with `set-cookie` as the key,
      every value will be sent as a cookie instead of replacing the previous
      value.

    ```js
    reply.header('set-cookie', 'foo');
    reply.header('set-cookie', 'bar');
    ```
  - The browser will only consider the latest reference of a key for the
    `set-cookie` header. This is done to avoid parsing the `set-cookie` header
    when added to a reply and speeds up the serialization of the reply.

  - To reset the `set-cookie` header, you need to make an explicit call to
    `reply.removeHeader('set-cookie')`, read more about `.removeHeader(key)`
    [here](#removeheaderkey).



### .headers(object)
<a id="headers"></a>

Sets all the keys of the object as response headers.
[`.header`](#headerkey-value) will be called under the hood.
```js
reply.headers({
  'x-foo': 'foo',
  'x-bar': 'bar'
})
```

### .getHeader(key)
<a id="getHeader"></a>

Retrieves the value of a previously set header.
```js
reply.header('x-foo', 'foo') // setHeader: key, value
reply.getHeader('x-foo') // 'foo'
```

### .getHeaders()
<a id="getHeaders"></a>

Gets a shallow copy of all current response headers, including those set via the
raw `http.ServerResponse`. Note that headers set via Fastify take precedence
over those set via `http.ServerResponse`.

```js
reply.header('x-foo', 'foo')
reply.header('x-bar', 'bar')
reply.raw.setHeader('x-foo', 'foo2')
reply.getHeaders() // { 'x-foo': 'foo', 'x-bar': 'bar' }
```

### .removeHeader(key)
<a id="getHeader"></a>

Remove the value of a previously set header.
```js
reply.header('x-foo', 'foo')
reply.removeHeader('x-foo')
reply.getHeader('x-foo') // undefined
```

### .hasHeader(key)
<a id="hasHeader"></a>

Returns a boolean indicating if the specified header has been set.

### .trailer(key, function)
<a id="trailer"></a>

Sets a response trailer. Trailer is usually used when you need a header that requires heavy resources to be sent after the `data`, for example, `Server-Timing` and `Etag`. It can ensure the client receives the response data as soon as possible.

*Note: The header `Transfer-Encoding: chunked` will be added once you use the trailer. It is a hard requirement for using trailer in Node.js.*

*Note: Currently, the computation function only supports synchronous function. That means `async-await` and `promise` are not supported.*

```js
reply.trailer('server-timing', function() {
  return 'db;dur=53, app;dur=47.2'
})

const { createHash } = require('crypto')
// trailer function also recieve two argument
// @param {object} reply fastify reply
// @param {string|Buffer|null} payload payload that already sent, note that it will be null when stream is sent
reply.trailer('content-md5', function(reply, payload) {
  const hash = createHash('md5')
  hash.update(payload)
  return hash.disgest('hex')
})
```

### .hasTrailer(key)
<a id="hasTrailer"></a>

Returns a boolean indicating if the specified trailer has been set.

### .removeTrailer(key)
<a id="removeTrailer"></a>

Remove the value of a previously set trailer.
```js
reply.trailer('server-timing', function() {
  return 'db;dur=53, app;dur=47.2'
})
reply.removeTrailer('server-timing')
reply.getTrailer('server-timing') // undefined
```


### .redirect([code ,] dest)
<a id="redirect"></a>

Redirects a request to the specified URL, the status code is optional, default
to `302` (if status code is not already set by calling `code`).

> Note: the input URL must be properly encoded using [`encodeURI`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) or similar modules such as [`encodeurl`](https://www.npmjs.com/package/encodeurl). Invalid URLs will result in a 500 `TypeError` response.

Example (no `reply.code()` call) sets status code to `302` and redirects to
`/home`
```js
reply.redirect('/home')
```

Example (no `reply.code()` call) sets status code to `303` and redirects to
`/home`
```js
reply.redirect(303, '/home')
```

Example (`reply.code()` call) sets status code to `303` and redirects to `/home`
```js
reply.code(303).redirect('/home')
```

Example (`reply.code()` call) sets status code to `302` and redirects to `/home`
```js
reply.code(303).redirect(302, '/home')
```

### .callNotFound()
<a id="call-not-found"></a>

Invokes the custom not found handler. Note that it will only call `preHandler`
hook specified in [`setNotFoundHandler`](./Server.md#set-not-found-handler).

```js
reply.callNotFound()
```

### .getResponseTime()
<a id="getResponseTime"></a>

Invokes the custom response time getter to calculate the amount of time passed
since the request was started.

Note that unless this function is called in the [`onResponse`
hook](./Hooks.md#onresponse) it will always return `0`.

```js
const milliseconds = reply.getResponseTime()
```

### .type(contentType)
<a id="type"></a>

Sets the content type for the response. This is a shortcut for
`reply.header('Content-Type', 'the/type')`.

```js
reply.type('text/html')
```
If the `Content-Type` has a JSON subtype, and the charset parameter is not set, `utf-8` will be used as the charset by default.

### .serializer(func)
<a id="serializer"></a>

By default, `.send()` will JSON-serialize any value that is not one of `Buffer`,
`stream`, `string`, `undefined`, or `Error`. If you need to replace the default
serializer with a custom serializer for a particular request, you can do so with
the `.serializer()` utility. Be aware that if you are using a custom serializer,
you must set a custom `'Content-Type'` header.

```js
reply
  .header('Content-Type', 'application/x-protobuf')
  .serializer(protoBuf.serialize)
```

Note that you don't need to use this utility inside a `handler` because Buffers,
streams, and strings (unless a serializer is set) are considered to already be
serialized.

```js
reply
  .header('Content-Type', 'application/x-protobuf')
  .send(protoBuf.serialize(data))
```

See [`.send()`](#send) for more information on sending different types of
values.

### .raw
<a id="raw"></a>

This is the
[`http.ServerResponse`](https://nodejs.org/dist/latest-v14.x/docs/api/http.html#http_class_http_serverresponse)
from Node core. Whilst you are using the Fastify `Reply` object, the use of
`Reply.raw` functions is at your own risk as you are skipping all the Fastify
logic of handling the HTTP response. e.g.:

```js
app.get('/cookie-2', (req, reply) => {
  reply.setCookie('session', 'value', { secure: false }) // this will not be used

  // in this case we are using only the nodejs http server response object
  reply.raw.writeHead(200, { 'Content-Type': 'text/plain' })
  reply.raw.write('ok')
  reply.raw.end()
})
```
Another example of the misuse of `Reply.raw` is explained in
[Reply](#getheaders).

### .sent
<a id="sent"></a>

As the name suggests, `.sent` is a property to indicate if a response has been
sent via `reply.send()`.
It will also be `true` in case `reply.hijack()` was used.

In case a route handler is defined as an async function or it returns a promise,
it is possible to call `reply.hijack()` to indicate that the automatic
invocation of `reply.send()` once the handler promise resolve should be skipped.
By calling `reply.hijack()`, an application claims full responsibility for
the low-level request and response. Moreover, hooks will not be invoked.

*Modifying the `.sent` property directly is deprecated. Please use the aforementioned
`.hijack()` method to achieve the same effect.*

<a name="hijack"></a>
### .hijack()
Sometimes you might need to halt the execution of the normal request lifecycle and
handle sending the response manually.

To achieve this, Fastify provides the `reply.hijack()` method that can be called
during the request lifecycle (At any point before `reply.send()` is called), and
allows you to prevent Fastify from sending the response, and from running the
remaining hooks (and user handler if the reply was hijacked before).

```js
app.get('/', (req, reply) => {
  reply.hijack()
  reply.raw.end('hello world')

  return Promise.resolve('this will be skipped')
})
```

If `reply.raw` is used to send a response back to the user, the `onResponse`
hooks will still be executed.

### .send(data)
<a id="send"></a>

As the name suggests, `.send()` is the function that sends the payload to the
end user.

#### Objects
<a id="send-object"></a>

As noted above, if you are sending JSON objects, `send` will serialize the
object with
[fast-json-stringify](https://www.npmjs.com/package/fast-json-stringify) if you
set an output schema, otherwise, `JSON.stringify()` will be used.
```js
fastify.get('/json', options, function (request, reply) {
  reply.send({ hello: 'world' })
})
```

#### Strings
<a id="send-string"></a>

If you pass a string to `send` without a `Content-Type`, it will be sent as
`text/plain; charset=utf-8`. If you set the `Content-Type` header and pass a
string to `send`, it will be serialized with the custom serializer if one is
set, otherwise, it will be sent unmodified (unless the `Content-Type` header is
set to `application/json; charset=utf-8`, in which case it will be
JSON-serialized like an object — see the section above).
```js
fastify.get('/json', options, function (request, reply) {
  reply.send('plain string')
})
```

#### Streams
<a id="send-streams"></a>

*send* can also handle streams out of the box. If you are sending a stream and
you have not set a `'Content-Type'` header, *send* will set it at
`'application/octet-stream'`.
```js
fastify.get('/streams', function (request, reply) {
  const fs = require('fs')
  const stream = fs.createReadStream('some-file', 'utf8')
  reply.send(stream)
})
```

#### Buffers
<a id="send-buffers"></a>

If you are sending a buffer and you have not set a `'Content-Type'` header,
*send* will set it to `'application/octet-stream'`.
```js
const fs = require('fs')
fastify.get('/streams', function (request, reply) {
  fs.readFile('some-file', (err, fileBuffer) => {
    reply.send(err || fileBuffer)
  })
})
```

#### Errors
<a id="errors"></a>

If you pass to *send* an object that is an instance of *Error*, Fastify will
automatically create an error structured as the following:

```js
{
  error: String        // the HTTP error message
  code: String         // the Fastify error code
  message: String      // the user error message
  statusCode: Number   // the HTTP status code
}
```

You can add custom properties to the Error object, such as `headers`, that will
be used to enhance the HTTP response.

*Note: If you are passing an error to `send` and the statusCode is less than
400, Fastify will automatically set it at 500.*

Tip: you can simplify errors by using the
[`http-errors`](https://npm.im/http-errors) module or
[`@fastify/sensible`](https://github.com/fastify/fastify-sensible) plugin to
generate errors:

```js
fastify.get('/', function (request, reply) {
  reply.send(httpErrors.Gone())
})
```

To customize the JSON error output you can do it by:

- setting a response JSON schema for the status code you need
- add the additional properties to the `Error` instance

Notice that if the returned status code is not in the response schema list, the
default behaviour will be applied.

```js
fastify.get('/', {
  schema: {
    response: {
      501: {
        type: 'object',
        properties: {
          statusCode: { type: 'number' },
          code: { type: 'string' },
          error: { type: 'string' },
          message: { type: 'string' },
          time: { type: 'string' }
        }
      }
    }
  }
}, function (request, reply) {
  const error = new Error('This endpoint has not been implemented')
  error.time = 'it will be implemented in two weeks'
  reply.code(501).send(error)
})
```

If you want to customize error handling, check out
[`setErrorHandler`](./Server.md#seterrorhandler) API.

*Note: you are responsible for logging when customizing the error handler*

API:

```js
fastify.setErrorHandler(function (error, request, reply) {
  request.log.warn(error)
  var statusCode = error.statusCode >= 400 ? error.statusCode : 500
  reply
    .code(statusCode)
    .type('text/plain')
    .send(statusCode >= 500 ? 'Internal server error' : error.message)
})
```

The not found errors generated by the router will use the
[`setNotFoundHandler`](./Server.md#setnotfoundhandler)

API:

```js
fastify.setNotFoundHandler(function (request, reply) {
  reply
    .code(404)
    .type('text/plain')
    .send('a custom not found')
})
```

#### Type of the final payload
<a id="payload-type"></a>

The type of the sent payload (after serialization and going through any
[`onSend` hooks](./Hooks.md#onsend)) must be one of the following
types, otherwise, an error will be thrown:

- `string`
- `Buffer`
- `stream`
- `undefined`
- `null`

#### Async-Await and Promises
<a id="async-await-promise"></a>

Fastify natively handles promises and supports async-await.

*Note that in the following examples we are not using reply.send.*
```js
const delay = promisify(setTimeout)

fastify.get('/promises', options, function (request, reply) {
 return delay(200).then(() => { return { hello: 'world' }})
})

fastify.get('/async-await', options, async function (request, reply) {
  await delay(200)
  return { hello: 'world' }
})
```

Rejected promises default to a `500` HTTP status code. Reject the promise, or
`throw` in an `async function`, with an object that has `statusCode` (or
`status`) and `message` properties to modify the reply.

```js
fastify.get('/teapot', async function (request, reply) {
  const err = new Error()
  err.statusCode = 418
  err.message = 'short and stout'
  throw err
})

fastify.get('/botnet', async function (request, reply) {
  throw { statusCode: 418, message: 'short and stout' }
  // will return to the client the same json
})
```

If you want to know more please review
[Routes#async-await](./Routes.md#async-await).

### .then(fulfilled, rejected)
<a id="then"></a>

As the name suggests, a `Reply` object can be awaited upon, i.e. `await reply`
will wait until the reply is sent. The `await` syntax calls the `reply.then()`.

`reply.then(fulfilled, rejected)` accepts two parameters:

- `fulfilled` will be called when a response has been fully sent,
- `rejected` will be called if the underlying stream had an error, e.g. the
  socket has been destroyed.

For more details, see:

- https://github.com/fastify/fastify/issues/1864 for the discussion about this
  feature
- https://promisesaplus.com/ for the definition of thenables
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
  for the signature

## Request
The first parameter of the handler function is `Request`.

Request is a core Fastify object containing the following fields:
- `query` - the parsed querystring, its format is specified by
  [`querystringParser`](./Server.md#querystringparser)
- `body` - the request payload, see [Content-Type
  Parser](./ContentTypeParser.md) for details on what request payloads Fastify
  natively parses and how to support other content types
- `params` - the params matching the URL
- [`headers`](#headers) - the headers getter and setter
- `raw` - the incoming HTTP request from Node core
- `server` - The Fastify server instance, scoped to the current [encapsulation
>>>>>>> main:docs/Reference/Request.md
- `id` - the request ID
- `log` - the logger instance of the incoming request
- `ip` - the IP address of the incoming request
- `ips` - an array of the IP addresses, ordered from closest to furthest, in the
  `X-Forwarded-For` header of the incoming request (only when the
  [`trustProxy`](./Server.md#factory-trust-proxy) option is enabled)
- `hostname` - the host of the incoming request (derived from `X-Forwarded-Host`
  header when the [`trustProxy`](./Server.md#factory-trust-proxy) option is
  enabled). For HTTP/2 compatibility it returns `:authority` if no host header
  exists.
- `protocol` - the protocol of the incoming request (`https` or `http`)
- `method` - the method of the incoming request
- `url` - the URL of the incoming request
- `routerMethod` - the method defined for the router that is handling the
  request
- `routerPath` - the path pattern defined for the router that is handling the
  request
- `is404` - true if request is being handled by 404 handler, false if it is not
- `connection` - Deprecated, use `socket` instead. The underlying connection of
  the incoming request.
- `socket` - the underlying connection of the incoming request
- `context` - A Fastify internal object. You should not use it directly or
  modify it. It is useful to access one special key:
  - `context.config` - The route [`config`](./Routes.md#routes-config) object.

### Headers

The `request.headers` is a getter that returns an Object with the headers of the
incoming request. You can set custom headers like this:

```js
request.headers = {
  'foo': 'bar',
  'baz': 'qux'
}
```

This operation will add to the request headers the new values that can be read
calling `request.headers.bar`. Moreover, you can still access the standard
request's headers with the `request.raw.headers` property.

> Note: For performance reason on `not found` route, you may see that we will add
an extra property `Symbol('fastify.RequestAcceptVersion')` on the headers.

```js
fastify.post('/:params', options, function (request, reply) {
  console.log(request.body)
  console.log(request.query)
  console.log(request.params)
  console.log(request.headers)
  console.log(request.raw)
  console.log(request.server)
  console.log(request.id)
  console.log(request.ip)
  console.log(request.ips)
  console.log(request.hostname)
  console.log(request.protocol)
  console.log(request.url)
  console.log(request.routerMethod)
  console.log(request.routerPath)
  request.log.info('some info')
})
```

## Routes

The route methods will configure the endpoints of your application. You have
two ways to declare a route with Fastify: the shorthand method and the full
declaration.

- [Full declaration](#full-declaration)
- [Routes options](#routes-options)
- [Shorthand declaration](#shorthand-declaration)
- [Url building](#url-building)
- [Async Await](#async-await)
- [Promise resolution](#promise-resolution)
- [Route Prefixing](#route-prefixing)
  - [Handling of / route inside prefixed plugins](#handling-of--route-inside-prefixed-plugins)
- [Custom Log Level](#custom-log-level)
- [Custom Log Serializer](#custom-log-serializer)
- [Config](#config)
- [Constraints](#constraints)
  - [Version Constraints](#version-constraints)
  - [Host Constraints](#host-constraints)

### Full declaration
<a id="full-declaration"></a>

```js
fastify.route(options)
```

### Routes options
<a id="options"></a>

*`method`: currently it supports `'DELETE'`, `'GET'`, `'HEAD'`, `'PATCH'`,
  `'POST'`, `'PUT'` and `'OPTIONS'`. It could also be an array of methods.
* `url`: the path of the URL to match this route (alias: `path`).
* `schema`: an object containing the schemas for the request and response. They
  need to be in [JSON Schema](https://json-schema.org/) format, check
  [here](./Validation-and-Serialization.md) for more info.

  * `body`: validates the body of the request if it is a POST, PUT, or PATCH
    method.
  * `querystring` or `query`: validates the querystring. This can be a complete
    JSON Schema object, with the property `type` of `object` and `properties`
    object of parameters, or simply the values of what would be contained in the
    `properties` object as shown below.
  * `params`: validates the params.
  * `response`: filter and generate a schema for the response, setting a schema
    allows us to have 10-20% more throughput.
* `exposeHeadRoute`: creates a sibling `HEAD` route for any `GET` routes.
  Defaults to the value of [`exposeHeadRoutes`](./Server.md#exposeHeadRoutes)
  instance option. If you want a custom `HEAD` handler without disabling this
  option, make sure to define it before the `GET` route.
* `attachValidation`: attach `validationError` to request, if there is a schema
  validation error, instead of sending the error to the error handler.
  The default [error format](https://ajv.js.org/api.html#error-objects) is the Ajv one.
* `onRequest(request, reply, done)`: a [function](./Hooks.md#onrequest) called
  as soon as a request is received, it could also be an array of functions.
* `preParsing(request, reply, done)`: a [function](./Hooks.md#preparsing) called
  before parsing the request, it could also be an array of functions.
* `preValidation(request, reply, done)`: a [function](./Hooks.md#prevalidation)
  called after the shared `preValidation` hooks, useful if you need to perform
  authentication at route level for example, it could also be an array of
  functions.
* `preHandler(request, reply, done)`: a [function](./Hooks.md#prehandler) called
  just before the request handler, it could also be an array of functions.
* `preSerialization(request, reply, payload, done)`: a
  [function](./Hooks.md#preserialization) called just before the serialization,
  it could also be an array of functions.
* `onSend(request, reply, payload, done)`: a [function](./Hooks.md#route-hooks)
  called right before a response is sent, it could also be an array of
  functions.
* `onResponse(request, reply, done)`: a [function](./Hooks.md#onresponse) called
  when a response has been sent, so you will not be able to send more data to
  the client. It could also be an array of functions.
* `onTimeout(request, reply, done)`: a [function](./Hooks.md#ontimeout) called
  when a request is timed out and the HTTP socket has been hanged up.
* `onError(request, reply, error, done)`: a [function](./Hooks.md#onerror)
  called when an Error is thrown or sent to the client by the route handler.
* `handler(request, reply)`: the function that will handle this request. The
  [Fastify server](./Server.md) will be bound to `this` when the handler is
  called. Note: using an arrow function will break the binding of `this`.
* `errorHandler(error, request, reply)`: a custom error handler for the scope of
  the request. Overrides the default error global handler, and anything set by
  [`setErrorHandler`](./Server.md#seterrorhandler), for requests to the route.
  To access the default handler, you can access `instance.errorHandler`. Note
  that this will point to fastify's default `errorHandler` only if a plugin
  hasn't overridden it already.
* `validatorCompiler({ schema, method, url, httpPart })`: function that builds
  schemas for request validations. See the [Validation and
  Serialization](./Validation-and-Serialization.md#schema-validator)
  documentation.
* `serializerCompiler({ { schema, method, url, httpStatus } })`: function that
  builds schemas for response serialization. See the [Validation and
  Serialization](./Validation-and-Serialization.md#schema-serializer)
  documentation.
* `schemaErrorFormatter(errors, dataVar)`: function that formats the errors from
  the validation compiler. See the [Validation and
  Serialization](./Validation-and-Serialization.md#error-handling)
  documentation. Overrides the global schema error formatter handler, and
  anything set by `setSchemaErrorFormatter`, for requests to the route.
* `bodyLimit`: prevents the default JSON body parser from parsing request bodies
  larger than this number of bytes. Must be an integer. You may also set this
  option globally when first creating the Fastify instance with
  `fastify(options)`. Defaults to `1048576` (1 MiB).
* `logLevel`: set log level for this route. See below.
* `logSerializers`: set serializers to log for this route.
* `config`: object used to store custom configuration.
* `version`: a [semver](https://semver.org/) compatible string that defined the
  version of the endpoint. [Example](#version-constraints).
* `prefixTrailingSlash`: string used to determine how to handle passing `/` as a
  route with a prefix.
  * `both` (default): Will register both `/prefix` and `/prefix/`.
  * `slash`: Will register only `/prefix/`.
  * `no-slash`: Will register only `/prefix`.

  Note: this option does not override `ignoreTrailingSlash` in [Server](./Server.md) configuration.

* `request` is defined in [Request](./Request.md).

* `reply` is defined in [Reply](./Reply.md).

**Notice:** The documentation of `onRequest`, `preParsing`, `preValidation`,
`preHandler`, `preSerialization`, `onSend`, and `onResponse` are described in
more detail in [Hooks](./Hooks.md). Additionally, to send a response before the
request is handled by the `handler` please refer to [Respond to a request from a
hook](./Hooks.md#respond-to-a-request-from-a-hook).

Example:
```js
fastify.route({
  method: 'GET',
  url: '/',
  schema: {
    querystring: {
      name: { type: 'string' },
      excitement: { type: 'integer' }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  },
  handler: function (request, reply) {
    reply.send({ hello: 'world' })
  }
})
```

### Shorthand declaration
<a id="shorthand-declaration"></a>

The above route declaration is more *Hapi*-like, but if you prefer an
*Express/Restify* approach, we support it as well:

`fastify.get(path, [options], handler)`

`fastify.head(path, [options], handler)`

`fastify.post(path, [options], handler)`

`fastify.put(path, [options], handler)`

`fastify.delete(path, [options], handler)`

`fastify.options(path, [options], handler)`

`fastify.patch(path, [options], handler)`

Example:
```js
const opts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  }
}
fastify.get('/', opts, (request, reply) => {
  reply.send({ hello: 'world' })
})
```

`fastify.all(path, [options], handler)` will add the same handler to all the
supported methods.

The handler may also be supplied via the `options` object:
```js
const opts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  },
  handler: function (request, reply) {
    reply.send({ hello: 'world' })
  }
}
fastify.get('/', opts)
```

> Note: if the handler is specified in both the `options` and as the third
> parameter to the shortcut method then throws duplicate `handler` error.

### Url building
<a id="url-building"></a>

Fastify supports both static and dynamic URLs.

To register a **parametric** path, use the *colon* before the parameter name.
For **wildcard**, use the *star*. *Remember that static routes are always
checked before parametric and wildcard.*

```js
// parametric
fastify.get('/example/:userId', (request, reply) => {})
fastify.get('/example/:userId/:secretToken', (request, reply) => {})

// wildcard
fastify.get('/example/*', (request, reply) => {})
```

Regular expression routes are supported as well, but be aware that you have to escape slashes. Take note that RegExp is also very expensive in terms of performance!
```js
// parametric with regexp
fastify.get('/example/:file(^\\d+).png', (request, reply) => {})
```

It is possible to define more than one parameter within the same couple of slash
("/"). Such as:
```js
fastify.get('/example/near/:lat-:lng/radius/:r', (request, reply) => {})
```
*Remember in this case to use the dash ("-") as parameters separator.*

Finally, it is possible to have multiple parameters with RegExp:
```js
fastify.get('/example/at/:hour(^\\d{2})h:minute(^\\d{2})m', (request, reply) => {})
```
In this case as parameter separator it is possible to use whatever character is
not matched by the regular expression.

Having a route with multiple parameters may negatively affect performance,
so prefer a single parameter approach whenever possible, especially on routes that
are on the hot path of your application. If you are interested in how we handle
the routing, check out [find-my-way](https://github.com/delvedor/find-my-way).

If you want a path containing a colon without declaring a parameter, use a
double colon. For example:
```js
fastify.post('/name::verb') // will be interpreted as /name:verb
```

### Async Await
<a id="async-await"></a>

Are you an `async/await` user? We have you covered!
```js
fastify.get('/', options, async function (request, reply) {
  var data = await getData()
  var processed = await processData(data)
  return processed
})
```

As you can see, we are not calling `reply.send` to send back the data to the
user. You just need to return the body and you are done!

If you need it you can also send back the data to the user with `reply.send`.
In this case do not forget to `return reply` or `await reply` in your `async`
handler or you will introduce a race condition in certain situations.

```js
fastify.get('/', options, async function (request, reply) {
  var data = await getData()
  var processed = await processData(data)
  return reply.send(processed)
})
```

If the route is wrapping a callback-based API that will call `reply.send()`
outside of the promise chain, it is possible to `await reply`:

```js
fastify.get('/', options, async function (request, reply) {
  setImmediate(() => {
    reply.send({ hello: 'world' })
  })
  await reply
})
```

Returning reply also works:

```js
fastify.get('/', options, async function (request, reply) {
  setImmediate(() => {
    reply.send({ hello: 'world' })
  })
  return reply
})
```

**Warning:**
* When using both `return value` and `reply.send(value)` at the same time, the
  first one that happens takes precedence, the second value will be discarded,
  and a *warn* log will also be emitted because you tried to send a response
  twice.
* Calling `reply.send()` outside of the promise is possible but requires
  special attention. For more details read
  [promise-resolution](#promise-resolution).
* You cannot return `undefined`. For more details read
  [promise-resolution](#promise-resolution).

### Promise resolution
<a id="promise-resolution"></a>

If your handler is an `async` function or returns a promise, you should be aware of
the special behavior that is necessary to support the callback and promise
control-flow. When the handler's promise is resolved, the reply will be
automatically sent with its value unless you explicitly await or return `reply`
in your handler.

1. If you want to use `async/await` or promises but respond with a value with `reply.send`:
    - **Do** `return reply` / `await reply`.
    - **Do not** forget to call `reply.send`.
2. If you want to use `async/await` or promises:
    - **Do not** use `reply.send`.
    - **Do** return the value that you want to send.

In this way, we can support both `callback-style` and `async-await`, with the
minimum trade-off. Despite so much freedom we highly recommend going with
only one style because error handling should be handled in a consistent way
within your application.

**Notice**: Every async function returns a promise by itself.

### Route Prefixing
<a id="route-prefixing"></a>

Sometimes you need to maintain two or more different versions of the same API; a
classic approach is to prefix all the routes with the API version number,
`/v1/user` for example. Fastify offers you a fast and smart way to create
different versions of the same API without changing all the route names by hand,
*route prefixing*. Let's see how it works:

```js
// server.js
const fastify = require('fastify')()

fastify.register(require('./routes/v1/users'), { prefix: '/v1' })
fastify.register(require('./routes/v2/users'), { prefix: '/v2' })

fastify.listen({ port: 3000 })
```

```js
// routes/v1/users.js
module.exports = function (fastify, opts, done) {
  fastify.get('/user', handler_v1)
  done()
}
```

```js
// routes/v2/users.js
module.exports = function (fastify, opts, done) {
  fastify.get('/user', handler_v2)
  done()
}
```
Fastify will not complain because you are using the same name for two different
routes, because at compilation time it will handle the prefix automatically
*(this also means that the performance will not be affected at all!)*.

Now your clients will have access to the following routes:
- `/v1/user`
- `/v2/user`

You can do this as many times as you want, it also works for nested `register`,
and route parameters are supported as well. Be aware that if you use
[`fastify-plugin`](https://github.com/fastify/fastify-plugin) this option will
not work.

#### Handling of / route inside prefixed plugins

The `/` route has different behavior depending on if the prefix ends with `/`
or not. As an example, if we consider a prefix `/something/`, adding a `/` route
will only match `/something/`. If we consider a prefix `/something`, adding a
`/` route will match both `/something` and `/something/`.

See the `prefixTrailingSlash` route option above to change this behavior.

### Custom Log Level
<a id="custom-log-level"></a>

You might need different log levels in your routes; Fastify
achieves this in a very straightforward way.

You just need to pass the option `logLevel` to the plugin option or the route
option with the
[value](https://github.com/pinojs/pino/blob/master/docs/api.md#level-string)
that you need.

Be aware that if you set the `logLevel` at plugin level, also the
[`setNotFoundHandler`](./Server.md#setnotfoundhandler) and
[`setErrorHandler`](./Server.md#seterrorhandler) will be affected.

```js
// server.js
const fastify = require('fastify')({ logger: true })

fastify.register(require('./routes/user'), { logLevel: 'warn' })
fastify.register(require('./routes/events'), { logLevel: 'debug' })

fastify.listen({ port: 3000 })
```

Or you can directly pass it to a route:
```js
fastify.get('/', { logLevel: 'warn' }, (request, reply) => {
  reply.send({ hello: 'world' })
})
```
*Remember that the custom log level is applied only to the routes, and not to
the global Fastify Logger, accessible with `fastify.log`*

### Custom Log Serializer
<a id="custom-log-serializer"></a>

In some contexts, you may need to log a large object but it could be a waste of
resources for some routes. In this case, you can define custom
[`serializers`](https://github.com/pinojs/pino/blob/master/docs/api.md#serializers-object)
and attach them in the right context!

```js
const fastify = require('fastify')({ logger: true })

fastify.register(require('./routes/user'), {
  logSerializers: {
    user: (value) => `My serializer one - ${value.name}`
  }
})
fastify.register(require('./routes/events'), {
  logSerializers: {
    user: (value) => `My serializer two - ${value.name} ${value.surname}`
  }
})

fastify.listen({ port: 3000 })
```

You can inherit serializers by context:

```js
const fastify = Fastify({
  logger: {
    level: 'info',
    serializers: {
      user (req) {
        return {
          method: req.method,
          url: req.url,
          headers: req.headers,
          hostname: req.hostname,
          remoteAddress: req.ip,
          remotePort: req.socket.remotePort
        }
      }
    }
  }
})

fastify.register(context1, {
  logSerializers: {
    user: value => `My serializer father - ${value}`
  }
})

async function context1 (fastify, opts) {
  fastify.get('/', (req, reply) => {
    req.log.info({ user: 'call father serializer', key: 'another key' })
    // shows: { user: 'My serializer father - call father  serializer', key: 'another key' }
    reply.send({})
  })
}

fastify.listen({ port: 3000 })
```

### Config
<a id="routes-config"></a>

Registering a new handler, you can pass a configuration object to it and
retrieve it in the handler.

```js
// server.js
const fastify = require('fastify')()

function handler (req, reply) {
  reply.send(reply.context.config.output)
}

fastify.get('/en', { config: { output: 'hello world!' } }, handler)
fastify.get('/it', { config: { output: 'ciao mondo!' } }, handler)

fastify.listen({ port: 3000 })
```

### Constraints
<a id="constraints"></a>

Fastify supports constraining routes to match only certain requests based on
some property of the request, like the `Host` header, or any other value via
[`find-my-way`](https://github.com/delvedor/find-my-way) constraints.
Constraints are specified in the `constraints` property of the route options.
Fastify has two built-in constraints ready for use: the `version` constraint and
the `host` constraint, and you can add your own custom constraint strategies to
inspect other parts of a request to decide if a route should be executed for a
request.

#### Version Constraints

You can provide a `version` key in the `constraints` option to a route.
Versioned routes allow you to declare multiple handlers for the same HTTP route
path, which will then be matched according to each request's `Accept-Version`
header. The `Accept-Version` header value should follow the
[semver](http://semver.org/) specification, and routes should be declared with
exact semver versions for matching.

Fastify will require a request `Accept-Version` header to be set if the route
has a version set, and will prefer a versioned route to a non-versioned route
for the same path. Advanced version ranges and pre-releases currently are not
supported.

*Be aware that using this feature will cause a degradation of the overall
performances of the router.*

```js
fastify.route({
  method: 'GET',
  url: '/',
  constraints: { version: '1.2.0' },
  handler: function (request, reply) {
    reply.send({ hello: 'world' })
  }
})

fastify.inject({
  method: 'GET',
  url: '/',
  headers: {
    'Accept-Version': '1.x' // it could also be '1.2.0' or '1.2.x'
  }
}, (err, res) => {
  // { hello: 'world' }
})
```

> ## ⚠  Security Notice
> Remember to set a
> [`Vary`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary)
> header in your responses with the value you are using for defining the
> versioning (e.g.: `'Accept-Version'`), to prevent cache poisoning attacks. You
> can also configure this as part of your Proxy/CDN.
>
> ```js
> const append = require('vary').append
> fastify.addHook('onSend', async (req, reply) => {
>   if (req.headers['accept-version']) { // or the custom header you are using
>     let value = reply.getHeader('Vary') || ''
>     const header = Array.isArray(value) ? value.join(', ') : String(value)
>     if ((value = append(header, 'Accept-Version'))) { // or the custom header you are using
>       reply.header('Vary', value)
>     }
>   }
> })
> ```

If you declare multiple versions with the same major or minor, Fastify will
always choose the highest compatible with the `Accept-Version` header value.

If the request will not have the `Accept-Version` header, a 404 error will be
returned.

It is possible to define a custom version matching logic. This can be done
through the [`constraints`](./Server.md#constraints) configuration when creating
a Fastify server instance.

#### Host Constraints

You can provide a `host` key in the `constraints` route option for to limit that
route to only be matched for certain values of the request `Host` header. `host`
constraint values can be specified as strings for exact matches or RegExps for
arbitrary host matching.

```js
fastify.route({
  method: 'GET',
  url: '/',
  constraints: { host: 'auth.fastify.io' },
  handler: function (request, reply) {
    reply.send('hello world from auth.fastify.io')
  }
})

fastify.inject({
  method: 'GET',
  url: '/',
  headers: {
    'Host': 'example.com'
  }
}, (err, res) => {
  // 404 because the host doesn't match the constraint
})

fastify.inject({
  method: 'GET',
  url: '/',
  headers: {
    'Host': 'auth.fastify.io'
  }
}, (err, res) => {
  // => 'hello world from auth.fastify.io'
})
```

RegExp `host` constraints can also be specified allowing constraining to hosts
matching wildcard subdomains (or any other pattern):

```js
fastify.route({
  method: 'GET',
  url: '/',
  constraints: { host: /.*\.fastify\.io/ }, // will match any subdomain of fastify.io
  handler: function (request, reply) {
    reply.send('hello world from ' + request.headers.host)
  }
})
```

### ⚠  HTTP version check

Fastify will check the HTTP version of every request, based on configuration
options ([http2](./Server.md#http2), [https](./Server.md#https), and
[serverFactory](./Server.md#serverfactory)), to determine if it matches one or
all of the > following versions: `2.0`, `1.1`, and `1.0`. If Fastify receives
a different HTTP version in the request it will return a
`505 HTTP Version Not Supported` error.

|                          | 2.0 | 1.1 | 1.0 | skip |
|:------------------------:|:---:|:---:|:---:|:----:|
| http2                    | ✓   |     |     |      |
| http2 + https            | ✓   |     |     |      |
| http2 + https.allowHTTP1 | ✓   | ✓   | ✓   |      |
| https                    |     | ✓   | ✓   |      |
| http                     |     | ✓   | ✓   |      |
| serverFactory            |     |     |     | ✓    |

 Note: The internal HTTP version check will be removed in the future when Node
 implements [this feature](https://github.com/nodejs/node/issues/43115).

## Factory

The Fastify module exports a factory function that is used to create new
<code><b>Fastify server</b></code> instances. This factory function accepts an
options object which is used to customize the resulting instance. This document
describes the properties available in that options object.

- [Factory](#factory)
  - [`http2`](#http2)
  - [`https`](#https)
  - [`connectionTimeout`](#connectiontimeout)
  - [`keepAliveTimeout`](#keepalivetimeout)
  - [`forceCloseConnections`](#forcecloseconnections)
  - [`maxRequestsPerSocket`](#maxrequestspersocket)
  - [`requestTimeout`](#requesttimeout)
  - [`ignoreTrailingSlash`](#ignoretrailingslash)
  - [`ignoreDuplicateSlashes`](#ignoreduplicateslashes)
  - [`maxParamLength`](#maxparamlength)
  - [`bodyLimit`](#bodylimit)
  - [`onProtoPoisoning`](#onprotopoisoning)
  - [`onConstructorPoisoning`](#onconstructorpoisoning)
  - [`logger`](#logger)
  - [`disableRequestLogging`](#disablerequestlogging)
  - [`serverFactory`](#serverfactory)
  - [`jsonShorthand`](#jsonshorthand)
  - [`caseSensitive`](#casesensitive)
  - [`allowUnsafeRegex`](#allowunsaferegex)
  - [`requestIdHeader`](#requestidheader)
  - [`requestIdLogLabel`](#requestidloglabel)
  - [`genReqId`](#genreqid)
  - [`trustProxy`](#trustproxy)
  - [`pluginTimeout`](#plugintimeout)
  - [`querystringParser`](#querystringparser)
  - [`exposeHeadRoutes`](#exposeheadroutes)
  - [`constraints`](#constraints)
  - [`return503OnClosing`](#return503onclosing)
  - [`ajv`](#ajv)
  - [`serializerOpts`](#serializeropts)
  - [`http2SessionTimeout`](#http2sessiontimeout)
  - [`frameworkErrors`](#frameworkerrors)
  - [`clientErrorHandler`](#clienterrorhandler)
  - [`rewriteUrl`](#rewriteurl)
- [Instance](#instance)
  - [Server Methods](#server-methods)
    - [server](#server)
    - [after](#after)
    - [ready](#ready)
    - [listen](#listen)
    - [addresses](#addresses)
    - [getDefaultRoute](#getdefaultroute)
    - [setDefaultRoute](#setdefaultroute)
    - [routing](#routing)
    - [route](#route)
    - [close](#close)
    - [decorate\*](#decorate)
    - [register](#register)
    - [addHook](#addhook)
    - [prefix](#prefix)
    - [pluginName](#pluginname)
    - [hasPlugin](#hasplugin)
    - [log](#log)
    - [version](#version)
    - [inject](#inject)
    - [addSchema](#addschema)
    - [getSchemas](#getschemas)
    - [getSchema](#getschema)
    - [setReplySerializer](#setreplyserializer)
    - [setValidatorCompiler](#setvalidatorcompiler)
    - [setSchemaErrorFormatter](#setschemaerrorformatter)
    - [setSerializerCompiler](#setserializercompiler)
    - [validatorCompiler](#validatorcompiler)
    - [serializerCompiler](#serializercompiler)
    - [schemaErrorFormatter](#schemaerrorformatter)
    - [schemaController](#schemacontroller)
    - [setNotFoundHandler](#setnotfoundhandler)
    - [setErrorHandler](#seterrorhandler)
    - [addConstraintStrategy](#addconstraintstrategy)
    - [hasConstraintStrategy](#hasconstraintstrategy)
    - [printRoutes](#printroutes)
    - [printPlugins](#printplugins)
    - [addContentTypeParser](#addcontenttypeparser)
    - [hasContentTypeParser](#hascontenttypeparser)
    - [removeContentTypeParser](#removecontenttypeparser)
    - [removeAllContentTypeParsers](#removeallcontenttypeparsers)
    - [getDefaultJsonParser](#getdefaultjsonparser)
    - [defaultTextParser](#defaulttextparser)
    - [errorHandler](#errorhandler)
    - [initialConfig](#initialconfig)

### `http2`
<a id="factory-http2"></a>

If `true` Node.js core's
[HTTP/2](https://nodejs.org/dist/latest-v14.x/docs/api/http2.html) module is
used for binding the socket.

+ Default: `false`

### `https`
<a id="factory-https"></a>

An object used to configure the server's listening socket for TLS. The options
are the same as the Node.js core [`createServer`
method](https://nodejs.org/dist/latest-v14.x/docs/api/https.html#https_https_createserver_options_requestlistener).
When this property is `null`, the socket will not be configured for TLS.

This option also applies when the [`http2`](#factory-http2) option is set.

+ Default: `null`

### `connectionTimeout`
<a id="factory-connection-timeout"></a>

Defines the server timeout in milliseconds. See documentation for
[`server.timeout`
property](https://nodejs.org/api/http.html#http_server_timeout) to understand
the effect of this option. When `serverFactory` option is specified, this option
is ignored.

+ Default: `0` (no timeout)

### `keepAliveTimeout`
<a id="factory-keep-alive-timeout"></a>

Defines the server keep-alive timeout in milliseconds. See documentation for
[`server.keepAliveTimeout`
property](https://nodejs.org/api/http.html#http_server_keepalivetimeout) to
understand the effect of this option. This option only applies when HTTP/1 is in
use. Also, when `serverFactory` option is specified, this option is ignored.

+ Default: `72000` (72 seconds)

### `forceCloseConnections`
<a id="forcecloseconnections"></a>

When set to `true`, upon [`close`](#close) the server will iterate the
current persistent connections and [destroy their sockets](https://nodejs.org/dist/latest-v16.x/docs/api/net.html#socketdestroyerror).

> Important: connections are not inspected to determine if requests have been completed.

Fastify will prefer the HTTP server's [`closeAllConnections`](https://nodejs.org/dist/latest-v18.x/docs/api/http.html#servercloseallconnections) method if supported, otherwise it will use internal connection tracking.

When set to `"idle"`, upon [`close`](#close) the server will iterate the
current persistent connections which are not sending a request or waiting for a response and destroy their sockets.
The value is supported only if the HTTP server supports the [`closeIdleConnections`](https://nodejs.org/dist/latest-v18.x/docs/api/http.html#servercloseidleconnections) method, otherwise attempting to set it will throw an exception.

+ Default: `"idle"` if the HTTP server allows it, `false` otherwise

### `maxRequestsPerSocket`
<a id="factory-max-requests-per-socket"></a>

Defines the maximum number of requests socket can handle before closing keep
alive connection. See documentation for [`server.maxRequestsPerSocket`
property](https://nodejs.org/dist/latest/docs/api/http.html#http_server_maxrequestspersocket)
to understand the effect of this option. This option only applies when HTTP/1.1
is in use. Also, when `serverFactory` option is specified, this option is
ignored.
>  At the time of this writing, only node version greater or equal to 16.10.0
>  support this option. Check the Node.js documentation for availability in the
>  version you are running.

+ Default: `0` (no limit)

### `requestTimeout`
<a id="factory-request-timeout"></a>

Defines the maximum number of milliseconds for receiving the entire request from
the client. [`server.requestTimeout`
property](https://nodejs.org/dist/latest/docs/api/http.html#http_server_requesttimeout)
to understand the effect of this option. Also, when `serverFactory` option is
specified, this option is ignored. It must be set to a non-zero value (e.g. 120
seconds) to protect against potential Denial-of-Service attacks in case the
server is deployed without a reverse proxy in front.
>  At the time of this writing, only node version greater or equal to 14.11.0
>  support this option. Check the Node.js documentation for availability in the
>  version you are running.

+ Default: `0` (no limit)

### `ignoreTrailingSlash`
<a id="factory-ignore-slash"></a>

Fastify uses [find-my-way](https://github.com/delvedor/find-my-way) to handle
routing. By default, Fastify is set to take into account the trailing slashes. 
Paths like `/foo` and `/foo/` will be treated as different paths. If you want 
to change this, set this flag to `true`. That way, both `/foo` and `/foo/` will 
point to the same route. This option applies to *all* route registrations for 
the resulting server instance.

+ Default: `false`

```js
const fastify = require('fastify')({
  ignoreTrailingSlash: true
})

// registers both "/foo" and "/foo/"
fastify.get('/foo/', function (req, reply) {
  reply.send('foo')
})

// registers both "/bar" and "/bar/"
fastify.get('/bar', function (req, reply) {
  reply.send('bar')
})
```

### `ignoreDuplicateSlashes`
<a id="factory-ignore-duplicate-slashes"></a>

Fastify uses [find-my-way](https://github.com/delvedor/find-my-way) to handle
routing. You can use `ignoreDuplicateSlashes` option to remove duplicate slashes
from the path. It removes duplicate slashes in the route path and in the request
URL. This option applies to *all* route registrations for the resulting server instance.

Note that when `ignoreTrailingSlash` and `ignoreDuplicateSlashes` are both set to true, Fastify will remove duplicate slashes, and then trailing slashes, meaning //a//b//c// will be converted to /a/b/c.

+ Default: `false`

```js
const fastify = require('fastify')({
  ignoreDuplicateSlashes: true
})

// registers "/foo/bar/"
fastify.get('///foo//bar//', function (req, reply) {
  reply.send('foo')
})
```

### `maxParamLength`
<a id="factory-max-param-length"></a>

You can set a custom length for parameters in parametric (standard, regex, and
multi) routes by using `maxParamLength` option; the default value is 100
characters.

This can be useful especially if you have a regex-based route, protecting you
against [DoS
attacks](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS).

*If the maximum length limit is reached, the not found route will be invoked.*

### `bodyLimit`
<a id="factory-body-limit"></a>

Defines the maximum payload, in bytes, the server is allowed to accept.

+ Default: `1048576` (1MiB)

### `onProtoPoisoning`
<a id="factory-on-proto-poisoning"></a>

Defines what action the framework must take when parsing a JSON object with
`__proto__`. This functionality is provided by
[secure-json-parse](https://github.com/fastify/secure-json-parse). See
[Prototype Poisoning](../Guides/Prototype-Poisoning.md) for more
details about prototype poisoning attacks.

Possible values are `'error'`, `'remove'` and `'ignore'`.

+ Default: `'error'`

### `onConstructorPoisoning`
<a id="factory-on-constructor-poisoning"></a>

Defines what action the framework must take when parsing a JSON object with
`constructor`. This functionality is provided by
[secure-json-parse](https://github.com/fastify/secure-json-parse). See
[Prototype Poisoning](../Guides/Prototype-Poisoning.md) for more
details about prototype poisoning attacks.

Possible values are `'error'`, `'remove'` and `'ignore'`.

+ Default: `'error'`

### `logger`
<a id="factory-logger"></a>

Fastify includes built-in logging via the [Pino](https://getpino.io/) logger.
This property is used to configure the internal logger instance.

The possible values this property may have are:

+ Default: `false`. The logger is disabled. All logging methods will point to a
  null logger [abstract-logging](https://npm.im/abstract-logging) instance.

+ `pinoInstance`: a previously instantiated instance of Pino. The internal
  logger will point to this instance.

+ `object`: a standard Pino [options
  object](https://github.com/pinojs/pino/blob/c77d8ec5ce/docs/API.md#constructor).
  This will be passed directly to the Pino constructor. If the following
  properties are not present on the object, they will be added accordingly:
    * `level`: the minimum logging level. If not set, it will be set to
      `'info'`.
    * `serializers`: a hash of serialization functions. By default, serializers
      are added for `req` (incoming request objects), `res` (outgoing response
      objects), and `err` (standard `Error` objects). When a log method receives
      an object with any of these properties then the respective serializer will
      be used for that property. For example:
        ```js
        fastify.get('/foo', function (req, res) {
          req.log.info({req}) // log the serialized request object
          res.send('foo')
        })
        ```
      Any user-supplied serializer will override the default serializer of the
      corresponding property.
+ `loggerInstance`: a custom logger instance. The logger must conform to the
  Pino interface by having the following methods: `info`, `error`, `debug`,
  `fatal`, `warn`, `trace`, `child`. For example:
  ```js
  const pino = require('pino')();

  const customLogger = {
    info: function (o, ...n) {},
    warn: function (o, ...n) {},
    error: function (o, ...n) {},
    fatal: function (o, ...n) {},
    trace: function (o, ...n) {},
    debug: function (o, ...n) {},
    child: function() {
      const child = Object.create(this);
      child.pino = pino.child(...arguments);
      return child;
    },
  };

  const fastify = require('fastify')({logger: customLogger});
  ```

### `disableRequestLogging`
<a id="factory-disable-request-logging"></a>

By default, when logging is enabled, Fastify will issue an `info` level log
message when a request is received and when the response for that request has
been sent. By setting this option to `true`, these log messages will be
disabled. This allows for more flexible request start and end logging by
attaching custom `onRequest` and `onResponse` hooks.

+ Default: `false`

```js
// Examples of hooks to replicate the disabled functionality.
fastify.addHook('onRequest', (req, reply, done) => {
  req.log.info({ url: req.raw.url, id: req.id }, 'received request')
  done()
})

fastify.addHook('onResponse', (req, reply, done) => {
  req.log.info({ url: req.raw.originalUrl, statusCode: reply.raw.statusCode }, 'request completed')
  done()
})
```

Please note that this setting will also disable an error log written by the
default `onResponse` hook on reply callback errors.

### `serverFactory`
<a id="custom-http-server"></a>

You can pass a custom HTTP server to Fastify by using the `serverFactory`
option.

`serverFactory` is a function that takes a `handler` parameter, which takes the
`request` and `response` objects as parameters, and an options object, which is
the same you have passed to Fastify.

```js
const serverFactory = (handler, opts) => {
  const server = http.createServer((req, res) => {
    handler(req, res)
  })

  return server
}

const fastify = Fastify({ serverFactory })

fastify.get('/', (req, reply) => {
  reply.send({ hello: 'world' })
})

fastify.listen({ port: 3000 })
```

Internally Fastify uses the API of Node core HTTP server, so if you are using a
custom server you must be sure to have the same API exposed. If not, you can
enhance the server instance inside the `serverFactory` function before the
`return` statement.


### `jsonShorthand`
<a id="schema-json-shorthand"></a>

+ Default: `true`

Internally, and by default, Fastify will automatically infer the root properties
of JSON Schemas if it does not find valid root properties according to the JSON
Schema spec. If you wish to implement your own schema validation compiler, for
example: to parse schemas as JTD instead of JSON Schema, then you can explicitly
set this option to `false` to make sure the schemas you receive are unmodified
and are not being treated internally as JSON Schema.

```js
const AjvJTD = require('ajv/dist/jtd'/* only valid for AJV v7+ */)
const ajv = new AjvJTD({
  // This would let you throw at start for invalid JTD schema objects
  allErrors: process.env.NODE_ENV === 'development'
})
const fastify = Fastify({ jsonShorthand: false })
fastify.setValidatorCompiler(({ schema }) => {
  return ajv.compile(schema)
})
fastify.post('/', {
  schema: {
    body: {
      properties: {
        foo: { type: 'uint8' }
      }
    }
  },
  handler (req, reply) { reply.send({ ok: 1 }) }
})
```

**Note: Fastify does not currently throw on invalid schemas, so if you turn this
off in an existing project, you need to be careful that none of your existing
schemas become invalid as a result, since they will be treated as a catch-all.**

### `caseSensitive`
<a id="factory-case-sensitive"></a>

By default, value equal to `true`, routes are registered as case sensitive. That
is, `/foo` is not equivalent to `/Foo`. When set to `false`, routes are
registered in a fashion such that `/foo` is equivalent to `/Foo` which is
equivalent to `/FOO`.

By setting `caseSensitive` to `false`, all paths will be matched as lowercase,
but the route parameters or wildcards will maintain their original letter
casing.

```js
fastify.get('/user/:username', (request, reply) => {
  // Given the URL: /USER/NodeJS
  console.log(request.params.username) // -> 'NodeJS'
})
```

Please note that setting this option to `false` goes against
[RFC3986](https://tools.ietf.org/html/rfc3986#section-6.2.2.1).

Also note, this setting will not affect query strings. If you want to change the
way query strings are handled take a look at
[`querystringParser`](#querystringparser).


### `allowUnsafeRegex`
<a id="factory-allow-unsafe-regex"></a>

The allowUnsafeRegex setting is false by default, so routes only allow safe regular expressions. To use unsafe expressions, set allowUnsafeRegex to true.

```js
fastify.get('/user/:id(^([0-9]+){4}$)', (request, reply) => {
  // Throws an error without allowUnsafeRegex = true
})
```

Under the hood: [FindMyWay](https://github.com/delvedor/find-my-way)
More info about safe regexp: [Safe-regex2](https://www.npmjs.com/package/safe-regex2)


### `requestIdHeader`
<a id="factory-request-id-header"></a>

The header name used to know the request-id. See [the
request-id](./Logging.md#logging-request-id) section.

+ Default: `'request-id'`

### `requestIdLogLabel`
<a id="factory-request-id-log-label"></a>

Defines the label used for the request identifier when logging the request.

+ Default: `'reqId'`

### `genReqId`
<a id="factory-gen-request-id"></a>

Function for generating the request-id. It will receive the incoming request as
a parameter. This function is expected to be error-free.

+ Default: `value of 'request-id' header if provided or monotonically increasing
  integers`

Especially in distributed systems, you may want to override the default ID
generation behavior as shown below. For generating `UUID`s you may want to check
out [hyperid](https://github.com/mcollina/hyperid)

```js
let i = 0
const fastify = require('fastify')({
  genReqId: function (req) { return i++ }
})
```

**Note: genReqId will _not_ be called if the header set in
<code>[requestIdHeader](#requestidheader)</code> is available (defaults to
'request-id').**

### `trustProxy`
<a id="factory-trust-proxy"></a>

By enabling the `trustProxy` option, Fastify will know that it is sitting behind
a proxy and that the `X-Forwarded-*` header fields may be trusted, which
otherwise may be easily spoofed.

```js
const fastify = Fastify({ trustProxy: true })
```

+ Default: `false`
+ `true/false`: Trust all proxies (`true`) or do not trust any proxies
  (`false`).
+ `string`: Trust only given IP/CIDR (e.g. `'127.0.0.1'`). May be a list of
  comma separated values (e.g. `'127.0.0.1,192.168.1.1/24'`).
+ `Array<string>`: Trust only given IP/CIDR list (e.g. `['127.0.0.1']`).
+ `number`: Trust the nth hop from the front-facing proxy server as the client.
+ `Function`: Custom trust function that takes `address` as first arg
    ```js
    function myTrustFn(address, hop) {
      return address === '1.2.3.4' || hop === 1
    }
    ```

For more examples, refer to the
[`proxy-addr`](https://www.npmjs.com/package/proxy-addr) package.

You may access the `ip`, `ips`, `hostname` and `protocol` values on the
[`request`](./Request.md) object.

```js
fastify.get('/', (request, reply) => {
  console.log(request.ip)
  console.log(request.ips)
  console.log(request.hostname)
  console.log(request.protocol)
})
```

**Note: if a request contains multiple <code>x-forwarded-host</code> or
<code>x-forwarded-proto</code> headers, it is only the last one that is used to
derive <code>request.hostname</code> and <code>request.protocol</code>**

### `pluginTimeout`
<a id="plugin-timeout"></a>

The maximum amount of time in *milliseconds* in which a plugin can load. If not,
[`ready`](#ready) will complete with an `Error` with code
`'ERR_AVVIO_PLUGIN_TIMEOUT'`. When set to `0`, disables this check. This controls 
[avvio](https://www.npmjs.com/package/avvio) 's `timeout` parameter.

+ Default: `10000`

### `querystringParser`
<a id="factory-querystring-parser"></a>

The default query string parser that Fastify uses is the Node.js's core
`querystring` module.

You can change this default setting by passing the option `querystringParser`
and use a custom one, such as [`qs`](https://www.npmjs.com/package/qs).

```js
const qs = require('qs')
const fastify = require('fastify')({
  querystringParser: str => qs.parse(str)
})
```

You can also use Fastify's default parser but change some handling behaviour,
like the example below for case insensitive keys and values:

```js
const querystring = require('querystring')
const fastify = require('fastify')({
  querystringParser: str => querystring.parse(str.toLowerCase())
})
```

Note, if you only want the keys (and not the values) to be case insensitive we
recommend using a custom parser to convert only the keys to lowercase.

### `exposeHeadRoutes`
<a id="exposeHeadRoutes"></a>

Automatically creates a sibling `HEAD` route for each `GET` route defined. If
you want a custom `HEAD` handler without disabling this option, make sure to
define it before the `GET` route.

+ Default: `true`

### `constraints`
<a id="constraints"></a>

Fastify's built in route constraints are provided by `find-my-way`, which allow
constraining routes by `version` or `host`. You are able to add new constraint
strategies, or override the built in strategies by providing a `constraints`
object with strategies for `find-my-way`. You can find more information on
constraint strategies in the
[find-my-way](https://github.com/delvedor/find-my-way) documentation.

```js
const customVersionStrategy = {
  storage: function () {
    const versions = {}
    return {
      get: (version) => { return versions[version] || null },
      set: (version, store) => { versions[version] = store }
    }
  },
  deriveVersion: (req, ctx) => {
    return req.headers['accept']
  }
}

const fastify = require('fastify')({
  constraints: {
    version: customVersionStrategy
  }
})
```

### `return503OnClosing`
<a id="factory-return-503-on-closing"></a>

Returns 503 after calling `close` server method. If `false`, the server routes
the incoming request as usual.

+ Default: `true`

### `ajv`
<a id="factory-ajv"></a>

Configure the Ajv v8 instance used by Fastify without providing a custom one.
The default configuration is explained in the [#schema-validator](Validation-and-Serialization.md#schema-validator) section.

```js
const fastify = require('fastify')({
  ajv: {
    customOptions: {
      removeAdditional: 'all' // Refer to [ajv options](https://ajv.js.org/#options)
    },
    plugins: [
      require('ajv-merge-patch'),
      [require('ajv-keywords'), 'instanceof']
      // Usage: [plugin, pluginOptions] - Plugin with options
      // Usage: plugin - Plugin without options
    ]
  }
})
```

### `serializerOpts`
<a id="serializer-opts"></a>

Customize the options of the default
[`fast-json-stringify`](https://github.com/fastify/fast-json-stringify#options)
instance that serialize the response's payload:

```js
const fastify = require('fastify')({
  serializerOpts: {
    rounding: 'ceil'
  }
})
```

### `http2SessionTimeout`
<a id="http2-session-timeout"></a>

Set a default
[timeout](https://nodejs.org/api/http2.html#http2_http2session_settimeout_msecs_callback)
to every incoming HTTP/2 session. The session will be closed on the timeout.
Default: `72000` ms.

Note that this is needed to offer the graceful "close" experience when using
HTTP/2. The low default has been chosen to mitigate denial of service attacks.
When the server is behind a load balancer or can scale automatically this value
can be increased to fit the use case. Node core defaults this to `0`. `

### `frameworkErrors`
<a id="framework-errors"></a>

+ Default: `null`

Fastify provides default error handlers for the most common use cases. It is
possible to override one or more of those handlers with custom code using this
option.

*Note: Only `FST_ERR_BAD_URL` is implemented at the moment.*

```js
const fastify = require('fastify')({
  frameworkErrors: function (error, req, res) {
    if (error instanceof FST_ERR_BAD_URL) {
      res.code(400)
      return res.send("Provided url is not valid")
    } else {
      res.send(err)
    }
  }
})
```

### `clientErrorHandler`
<a id="client-error-handler"></a>

Set a
[clientErrorHandler](https://nodejs.org/api/http.html#http_event_clienterror)
that listens to `error` events emitted by client connections and responds with a
`400`.

It is possible to override the default `clientErrorHandler` using this option.

+ Default:
```js
function defaultClientErrorHandler (err, socket) {
  if (err.code === 'ECONNRESET') {
    return
  }

  const body = JSON.stringify({
    error: http.STATUS_CODES['400'],
    message: 'Client Error',
    statusCode: 400
  })
  this.log.trace({ err }, 'client error')

  if (socket.writable) {
    socket.end(`HTTP/1.1 400 Bad Request\r\nContent-Length: ${body.length}\r\nContent-Type: application/json\r\n\r\n${body}`)
  }
}
```

*Note: `clientErrorHandler` operates with raw socket. The handler is expected to
return a properly formed HTTP response that includes a status line, HTTP headers
and a message body. Before attempting to write the socket, the handler should
check if the socket is still writable as it may have already been destroyed.*

```js
const fastify = require('fastify')({
  clientErrorHandler: function (err, socket) {
    const body = JSON.stringify({
      error: {
        message: 'Client error',
        code: '400'
      }
    })

    // `this` is bound to fastify instance
    this.log.trace({ err }, 'client error')

    // the handler is responsible for generating a valid HTTP response
    socket.end(`HTTP/1.1 400 Bad Request\r\nContent-Length: ${body.length}\r\nContent-Type: application/json\r\n\r\n${body}`)
  }
})
```

### `rewriteUrl`
<a id="rewrite-url"></a>

Set a sync callback function that must return a string that allows rewriting
URLs.

> Rewriting a URL will modify the `url` property of the `req` object

```js
function rewriteUrl (req) { // req is the Node.js HTTP request
  return req.url === '/hi' ? '/hello' : req.url;
}
```

Note that `rewriteUrl` is called _before_ routing, it is not encapsulated and it
is an instance-wide configuration.

## Instance

### Server Methods

#### server
<a id="server"></a>

`fastify.server`: The Node core
[server](https://nodejs.org/api/http.html#http_class_http_server) object as
returned by the [**`Fastify factory function`**](#factory).

#### after
<a id="after"></a>

Invoked when the current plugin and all the plugins that have been registered
within it have finished loading. It is always executed before the method
`fastify.ready`.

```js
fastify
  .register((instance, opts, done) => {
    console.log('Current plugin')
    done()
  })
  .after(err => {
    console.log('After current plugin')
  })
  .register((instance, opts, done) => {
    console.log('Next plugin')
    done()
  })
  .ready(err => {
    console.log('Everything has been loaded')
  })
```

In case `after()` is called without a function, it returns a `Promise`:

```js
fastify.register(async (instance, opts) => {
  console.log('Current plugin')
})

await fastify.after()
console.log('After current plugin')

fastify.register(async (instance, opts) => {
  console.log('Next plugin')
})

await fastify.ready()

console.log('Everything has been loaded')
```

#### ready
<a id="ready"></a>

Function called when all the plugins have been loaded. It takes an error
parameter if something went wrong.
```js
fastify.ready(err => {
  if (err) throw err
})
```
If it is called without any arguments, it will return a `Promise`:

```js
fastify.ready().then(() => {
  console.log('successfully booted!')
}, (err) => {
  console.log('an error happened', err)
})
```

#### listen
<a id="listen"></a>

Starts the server and internally waits for the `.ready()` event. The
signature is `.listen([options][, callback])`. Both the `options` object and the
`callback` parameters follow the [Node.js
core][https://nodejs.org/api/net.html#serverlistenoptions-callback] parameter
definitions.

By default, the server will listen on the address(es) resolved by `localhost` when no
specific host is provided. If listening on any available interface is desired,
then specifying `0.0.0.0` for the address will listen on all IPv4 addresses.
The following table details the possible values for `host` when targeting
`localhost`, and what the result of those values for `host` will be.

 Host          | IPv4 | IPv6
 --------------|------|-------
 `::`            | ✅<sup>*</sup> | ✅
 `::` + [`ipv6Only`](https://nodejs.org/api/net.html#serverlistenoptions-callback) | 🚫 | ✅
 `0.0.0.0`       | ✅ | 🚫
 `localhost`     | ✅ | ✅
 `127.0.0.1`     | ✅ | 🚫
 `::1`           | 🚫 | ✅

<sup>*</sup> Using `::` for the address will listen on all IPv6 addresses and,
depending on OS, may also listen on [all IPv4
addresses](https://nodejs.org/api/net.html#serverlistenport-host-backlog-callback).

Be careful when deciding to listen on all interfaces; it comes with inherent
[security
risks](https://web.archive.org/web/20170831174611/https://snyk.io/blog/mongodb-hack-and-secure-defaults/).

The default is to listen on `port: 0` (which picks the first available open
port) and `host: 'localhost'`:

```js
fastify.listen((err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
```

Specifying an address is also supported:

```js
fastify.listen({ port: 3000, host: '127.0.0.1' }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
```

If no callback is provided a Promise is returned:

```js
fastify.listen({ port: 3000 })
  .then((address) => console.log(`server listening on ${address}`))
  .catch(err => {
    console.log('Error starting server:', err)
    process.exit(1)
  })
```

When deploying to a Docker, and potentially other, containers, it is advisable
to listen on `0.0.0.0` because they do not default to exposing mapped ports to
`localhost`:

```js
fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
```

If the `port` is omitted (or is set to zero), a random available port is
automatically chosen (available via `fastify.server.address().port`).

The default options of listen are:

```js
fastify.listen({
  port: 0,
  host: 'localhost',
  exclusive: false,
  readableAll: false,
  writableAll: false,
  ipv6Only: false
}, (err) => {})
```

#### addresses
<a id="addresses"></a>

This method returns an array of addresses that the server is listening on.
If you call it before `listen()` is called or after the `close()` function,
it will return an empty array.

```js
await fastify.listen({ port: 8080 })
const addresses = fastify.addresses()
// [
//   { port: 8080, family: 'IPv6', address: '::1' },
//   { port: 8080, family: 'IPv4', address: '127.0.0.1' }
// ]
```

Note that the array contains the `fastify.server.address()` too.

#### getDefaultRoute
<a id="getDefaultRoute"></a>

The `defaultRoute` handler handles requests that do not match any URL specified by your Fastify application.
This defaults to the 404 handler, but can be overridden with [setDefaultRoute](#setdefaultroute).
Method to get the `defaultRoute` for the server:

```js
const defaultRoute = fastify.getDefaultRoute()
```

#### setDefaultRoute
<a id="setDefaultRoute"></a>

**Note**: The default 404 handler, or one set using `setNotFoundHandler`, will never trigger if the default route is overridden.
Use [setNotFoundHandler](#setnotfoundhandler) if you want to customize 404 handling instead.
Method to set the `defaultRoute` for the server:

```js
const defaultRoute = function (req, res) {
  res.end('hello world')
}

fastify.setDefaultRoute(defaultRoute)
```

#### routing
<a id="routing"></a>

Method to access the `lookup` method of the internal router and match the
request to the appropriate handler:

```js
fastify.routing(req, res)
```

#### route
<a id="route"></a>

Method to add routes to the server, it also has shorthand functions, check
[here](./Routes.md).

#### close
<a id="close"></a>

`fastify.close(callback)`: call this function to close the server instance and
run the [`'onClose'`](./Hooks.md#on-close) hook.

Calling `close` will also cause the server to respond to every new incoming
request with a `503` error and destroy that request. See [`return503OnClosing`
flags](#factory-return-503-on-closing) for changing this behavior.

If it is called without any arguments, it will return a Promise:

```js
fastify.close().then(() => {
  console.log('successfully closed!')
}, (err) => {
  console.log('an error happened', err)
})
```

#### decorate*
<a id="decorate"></a>

Function useful if you need to decorate the fastify instance, Reply or Request,
check [here](./Decorators.md).

#### register
<a id="register"></a>

Fastify allows the user to extend its functionality with plugins. A plugin can
be a set of routes, a server decorator, or whatever, check [here](./Plugins.md).

#### addHook
<a id="addHook"></a>

Function to add a specific hook in the lifecycle of Fastify, check
[here](./Hooks.md).

#### prefix
<a id="prefix"></a>

The full path that will be prefixed to a route.

Example:

```js
fastify.register(function (instance, opts, done) {
  instance.get('/foo', function (request, reply) {
    // Will log "prefix: /v1"
    request.log.info('prefix: %s', instance.prefix)
    reply.send({ prefix: instance.prefix })
  })

  instance.register(function (instance, opts, done) {
    instance.get('/bar', function (request, reply) {
      // Will log "prefix: /v1/v2"
      request.log.info('prefix: %s', instance.prefix)
      reply.send({ prefix: instance.prefix })
    })

    done()
  }, { prefix: '/v2' })

  done()
}, { prefix: '/v1' })
```

#### pluginName
<a id="pluginName"></a>

Name of the current plugin. The root plugin is called `'fastify'`.
There are three ways to define a name (in order).

1. If you use [fastify-plugin](https://github.com/fastify/fastify-plugin) the
   metadata `name` is used.
2. If you `module.exports` a plugin the filename is used.
3. If you use a regular [function
   declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#Defining_functions)
   the function name is used.

*Fallback*: The first two lines of your plugin will represent the plugin name.
Newlines are replaced by ` -- `. This will help to identify the root cause when
you deal with many plugins.

Important: If you have to deal with nested plugins, the name differs with the
usage of the [fastify-plugin](https://github.com/fastify/fastify-plugin) because
no new scope is created and therefore we have no place to attach contextual
data. In that case, the plugin name will represent the boot order of all
involved plugins in the format of `fastify -> plugin-A -> plugin-B`.

#### hasPlugin
<a id="hasPlugin"></a>

Method to check if a specific plugin has been registered.
Relies on the plugin metadata name.
Returns `true` if the plugin is registered.
Otherwise, returns `false`.

```js
const fastify = require('fastify')()
fastify.register(require('@fastify/cookie'), {
  secret: 'my-secret',
  parseOptions: {}
})

fastify.ready(() => {
  fastify.hasPlugin('@fastify/cookie') // true
})
```

#### log
<a id="log"></a>

The logger instance, check [here](./Logging.md).

#### version
<a id="version"></a>

Fastify version of the instance. Used for plugin support. See
[Plugins](./Plugins.md#handle-the-scope) for information on how the version is
used by plugins.

#### inject
<a id="inject"></a>

Fake HTTP injection (for testing purposes) [here](../Guides/Testing.md#benefits-of-using-fastifyinject).

#### addSchema
<a id="add-schema"></a>

`fastify.addSchema(schemaObj)`, adds a JSON schema to the Fastify instance. This
allows you to reuse it everywhere in your application just by using the standard
`$ref` keyword.

To learn more, read the [Validation and
Serialization](./Validation-and-Serialization.md) documentation.

#### getSchemas
<a id="get-schemas"></a>

`fastify.getSchemas()`, returns a hash of all schemas added via `.addSchema`.
The keys of the hash are the `$id`s of the JSON Schema provided.

#### getSchema
<a id="get-schema"></a>

`fastify.getSchema(id)`, return the JSON schema added with `.addSchema` and the
matching `id`. It returns `undefined` if it is not found.

#### setReplySerializer
<a id="set-reply-serializer"></a>

Set the reply serializer for all the routes. This will be used as default if a
[Reply.serializer(func)](./Reply.md#serializerfunc) has not been set. The
handler is fully encapsulated, so different plugins can set different error
handlers. Note: the function parameter is called only for status `2xx`. Check
out the [`setErrorHandler`](#seterrorhandler) for errors.

```js
fastify.setReplySerializer(function (payload, statusCode){
  // serialize the payload with a sync function
  return `my serialized ${statusCode} content: ${payload}`
})
```

#### setValidatorCompiler
<a id="set-validator-compiler"></a>

Set the schema validator compiler for all routes. See
[#schema-validator](./Validation-and-Serialization.md#schema-validator).

#### setSchemaErrorFormatter
<a id="set-schema-error-formatter"></a>

Set the schema error formatter for all routes. See
[#error-handling](./Validation-and-Serialization.md#schemaerrorformatter).

#### setSerializerCompiler
<a id="set-serializer-resolver"></a>

Set the schema serializer compiler for all routes. See
[#schema-serializer](./Validation-and-Serialization.md#schema-serializer).
**Note:** [`setReplySerializer`](#set-reply-serializer) has priority if set!

#### validatorCompiler
<a id="validator-compiler"></a>

This property can be used to get the schema validator. If not set, it will be
`null` until the server starts, then it will be a function with the signature
`function ({ schema, method, url, httpPart })` that returns the input `schema`
compiled to a function for validating data. The input `schema` can access all
the shared schemas added with [`.addSchema`](#add-schema) function.

#### serializerCompiler
<a id="serializer-compiler"></a>

This property can be used to get the schema serializer. If not set, it will be
`null` until the server starts, then it will be a function with the signature
`function ({ schema, method, url, httpPart })` that returns the input `schema`
compiled to a function for validating data. The input `schema` can access all
the shared schemas added with [`.addSchema`](#add-schema) function.

#### schemaErrorFormatter
<a id="schema-error-formatter"></a>

This property can be used to set a function to format errors that happen while
the `validationCompiler` fails to validate the schema. See
[#error-handling](./Validation-and-Serialization.md#schemaerrorformatter).

#### schemaController
<a id="schema-controller"></a>

This property can be used to fully manage:
- `bucket`: where the schemas of your application will be stored
- `compilersFactory`: what module must compile the JSON schemas

It can be useful when your schemas are stored in another data structure that is
unknown to Fastify. See [issue #2446](https://github.com/fastify/fastify/issues/2446) for an example of what this property helps to resolve.

Another use case is to tweak all the schemas processing.
Doing so it is possible to use Ajv v8 JTD or Standalone feature. To use such
as JTD or the Standalone mode, refers to the
[`@fastify/ajv-compiler` documentation](https://github.com/fastify/ajv-compiler#usage).

```js
const fastify = Fastify({
  schemaController: {
    /**
     * This factory is called whenever `fastify.register()` is called.
     * It may receive as input the schemas of the parent context if some schemas have been added.
     * @param {object} parentSchemas these schemas will be returned by the `getSchemas()` method function of the returned `bucket`.
     */
    bucket: function factory (parentSchemas) {
      return {
        addSchema (inputSchema) {
          // This function must store the schema added by the user.
          // This function is invoked when `fastify.addSchema()` is called.
        },
        getSchema (schema$id) {
          // This function must return the raw schema requested by the `schema$id`.
          // This function is invoked when `fastify.getSchema(id)` is called.
          return aSchema
        },
        getSchemas () {
          // This function must return all the schemas referenced by the routes schemas' $ref
          // It must return a JSON where the property is the schema `$id` and the value is the raw JSON Schema.
          const allTheSchemaStored = {
            'schema$id1': schema1,
            'schema$id2': schema2
          }
          return allTheSchemaStored
        }
      }
    },

    /**
     * The compilers factory let you fully control the validator and serializer
     * in the Fastify's lifecycle, providing the encapsulation to your compilers.
     */
    compilersFactory: {
      /**
       * This factory is called whenever a new validator instance is needed.
       * It may be called whenever `fastify.register()` is called only if new schemas have been added to the
       * encapsulation context.
       * It may receive as input the schemas of the parent context if some schemas have been added.
       * @param {object} externalSchemas these schemas will be returned by the `bucket.getSchemas()`. Needed to resolve the external references $ref.
       * @param {object} ajvServerOption the server `ajv` options to build your compilers accordingly
       */
      buildValidator: function factory (externalSchemas, ajvServerOption) {
        // This factory function must return a schema validator compiler.
        // See [#schema-validator](./Validation-and-Serialization.md#schema-validator) for details.
        const yourAjvInstance = new Ajv(ajvServerOption.customOptions)
        return function validatorCompiler ({ schema, method, url, httpPart }) {
          return yourAjvInstance.compile(schema)
        }
      },

      /**
       * This factory is called whenever a new serializer instance is needed.
       * It may be called whenever `fastify.register()` is called only if new schemas have been added to the
       * encapsulation context.
       * It may receive as input the schemas of the parent context if some schemas have been added.
       * @param {object} externalSchemas these schemas will be returned by the `bucket.getSchemas()`. Needed to resolve the external references $ref.
       * @param {object} serializerOptsServerOption the server `serializerOpts` options to build your compilers accordingly
       */
      buildSerializer: function factory (externalSchemas, serializerOptsServerOption) {
        // This factory function must return a schema serializer compiler.
        // See [#schema-serializer](./Validation-and-Serialization.md#schema-serializer) for details.
        return function serializerCompiler ({ schema, method, url, httpStatus }) {
          return data => JSON.stringify(data)
        }
      }
    }
  }
});
```

#### setNotFoundHandler
<a id="set-not-found-handler"></a>

`fastify.setNotFoundHandler(handler(request, reply))`: set the 404 handler. This
call is encapsulated by prefix, so different plugins can set different not found
handlers if a different [`prefix` option](./Plugins.md#route-prefixing-option)
is passed to `fastify.register()`. The handler is treated as a regular route
handler so requests will go through the full [Fastify
lifecycle](./Lifecycle.md#lifecycle). *async-await* is supported as well.

You can also register
[`preValidation`](./Hooks.md#route-hooks) and
[`preHandler`](./Hooks.md#route-hooks) hooks for
the 404 handler.

_Note: The `preValidation` hook registered using this method will run for a
route that Fastify does not recognize and **not** when a route handler manually
calls [`reply.callNotFound`](./Reply.md#call-not-found)_. In which case, only
preHandler will be run.

```js
fastify.setNotFoundHandler({
  preValidation: (req, reply, done) => {
    // your code
    done()
  },
  preHandler: (req, reply, done) => {
    // your code
    done()
  }
}, function (request, reply) {
    // Default not found handler with preValidation and preHandler hooks
})

fastify.register(function (instance, options, done) {
  instance.setNotFoundHandler(function (request, reply) {
    // Handle not found request without preValidation and preHandler hooks
    // to URLs that begin with '/v1'
  })
  done()
}, { prefix: '/v1' })
```

Fastify calls setNotFoundHandler to add a default 404 handler at startup before
plugins are registered. If you would like to augment the behavior of the default
404 handler, for example with plugins, you can call setNotFoundHandler with no
arguments `fastify.setNotFoundHandler()` within the context of these registered
plugins.

#### setErrorHandler
<a id="set-error-handler"></a>

`fastify.setErrorHandler(handler(error, request, reply))`: Set a function that
will be called whenever an error happens. The handler is bound to the Fastify
instance and is fully encapsulated, so different plugins can set different error
handlers. *async-await* is supported as well.

*Note: If the error `statusCode` is less than 400, Fastify will automatically
set it at 500 before calling the error handler.*

```js
fastify.setErrorHandler(function (error, request, reply) {
  // Log error
  this.log.error(error)
  // Send error response
  reply.status(409).send({ ok: false })
})
```

Fastify is provided with a default function that is called if no error handler
is set. It can be accessed using `fastify.errorHandler` and it logs the error
with respect to its `statusCode`.

```js
var statusCode = error.statusCode
if (statusCode >= 500) {
  log.error(error)
} else if (statusCode >= 400) {
  log.info(error)
} else {
  log.error(error)
}
```

#### addConstraintStrategy
<a id="addConstraintStrategy"></a>

Function to add a custom constraint strategy. To register a new type of constraint, you must add a new constraint strategy that knows how to match values to handlers, and that knows how to get the constraint value from a request.

Add a custom constraint strategy using the `fastify.addConstraintStrategy` method:

```js
const customResponseTypeStrategy = {
  // strategy name for referencing in the route handler `constraints` options
  name: 'accept',
  // storage factory for storing routes in the find-my-way route tree
  storage: function () {
    let handlers = {}
    return {
      get: (type) => { return handlers[type] || null },
      set: (type, store) => { handlers[type] = store }
    }
  },
  // function to get the value of the constraint from each incoming request
  deriveConstraint: (req, ctx) => {
    return req.headers['accept']
  },
  // optional flag marking if handlers without constraints can match requests that have a value for this constraint
  mustMatchWhenDerived: true
}

const router = Fastify();
router.addConstraintStrategy(customResponseTypeStrategy);
```

#### hasConstraintStrategy
<a id="hasConstraintStrategy"></a>

The `fastify.hasConstraintStrategy(strategyName)` checks if there already exists a custom constraint strategy with the same name.

#### printRoutes
<a id="print-routes"></a>

`fastify.printRoutes()`: Prints the representation of the internal radix tree
used by the router, useful for debugging. Alternatively, `fastify.printRoutes({
commonPrefix: false })` can be used to print the flattened routes tree.

*Remember to call it inside or after a `ready` call.*

```js
fastify.get('/test', () => {})
fastify.get('/test/hello', () => {})
fastify.get('/hello/world', () => {})
fastify.get('/helicopter', () => {})

fastify.ready(() => {
  console.log(fastify.printRoutes())
  // └── /
  //     ├── test (GET)
  //     │   └── /hello (GET)
  //     └── hel
  //         ├── lo/world (GET)
  //         └── licopter (GET)

  console.log(fastify.printRoutes({ commonPrefix: false }))
  // └── / (-)
  //     ├── test (GET)
  //     │   └── /hello (GET)
  //     ├── hello/world (GET)
  //     └── helicopter (GET)

})
```

`fastify.printRoutes({ includeMeta: (true | []) })` will display properties from
the `route.store` object for each displayed route. This can be an `array` of
keys (e.g. `['onRequest', Symbol('key')]`), or `true` to display all properties.
A shorthand option, `fastify.printRoutes({ includeHooks: true })` will include
all [hooks](./Hooks.md).

```js
  console.log(fastify.printRoutes({ includeHooks: true, includeMeta: ['metaProperty'] }))
  // └── /
  //     ├── test (GET)
  //     │   • (onRequest) ["anonymous()","namedFunction()"]
  //     │   • (metaProperty) "value"
  //     │   └── /hello (GET)
  //     └── hel
  //         ├── lo/world (GET)
  //         │   • (onTimeout) ["anonymous()"]
  //         └── licopter (GET)

  console.log(fastify.printRoutes({ includeHooks: true }))
  // └── /
  //     ├── test (GET)
  //     │   • (onRequest) ["anonymous()","namedFunction()"]
  //     │   └── /hello (GET)
  //     └── hel
  //         ├── lo/world (GET)
  //         │   • (onTimeout) ["anonymous()"]
  //         └── licopter (GET)
```

#### printPlugins
<a id="print-plugins"></a>

`fastify.printPlugins()`: Prints the representation of the internal plugin tree
used by the avvio, useful for debugging require order issues.

*Remember to call it inside or after a `ready` call.*

```js
fastify.register(async function foo (instance) {
  instance.register(async function bar () {})
})
fastify.register(async function baz () {})

fastify.ready(() => {
  console.error(fastify.printPlugins())
  // will output the following to stderr:
  // └── root
  //     ├── foo
  //     │   └── bar
  //     └── baz
})
```

#### addContentTypeParser
<a id="addContentTypeParser"></a>

`fastify.addContentTypeParser(content-type, options, parser)` is used to pass
custom parser for a given content type. Useful for adding parsers for custom
content types, e.g. `text/json, application/vnd.oasis.opendocument.text`.
`content-type` can be a string, string array or RegExp.

```js
// The two arguments passed to getDefaultJsonParser are for ProtoType poisoning and Constructor Poisoning configuration respectively. The possible values are 'ignore', 'remove', 'error'. ignore  skips all validations and it is similar to calling JSON.parse() directly. See the [`secure-json-parse` documentation](https://github.com/fastify/secure-json-parse#api) for more information.

fastify.addContentTypeParser('text/json', { asString: true }, fastify.getDefaultJsonParser('ignore', 'ignore'))
```

#### hasContentTypeParser
<a id="hasContentTypeParser"></a>

`fastify.hasContentTypeParser(contentType)` is used to check whether there is a content type parser in the current
context for the specified content type.

```js
fastify.hasContentTypeParser('text/json')

fastify.hasContentTypeParser(/^.+\/json$/)
```

#### removeContentTypeParser
<a id="removeContentTypeParser"></a>

`fastify.removeContentTypeParser(contentType)` is used to remove content type parsers in the current context. This
method allows for example to remove the both built-in parsers for `application/json` and `text/plain`.

```js
fastify.removeContentTypeParser('application/json')

fastify.removeContentTypeParser(['application/json', 'text/plain'])
```

#### removeAllContentTypeParsers
<a id="removeAllContentTypeParsers"></a>

The `fastify.removeAllContentTypeParsers()` method allows all content type parsers in the current context to be removed.
A use case of this method is the implementation of catch-all content type parser. Before adding this parser with
`fastify.addContentTypeParser()` one could call the `removeAllContentTypeParsers` method.

For more details about the usage of the different content type parser APIs see [here](./ContentTypeParser.md#usage).

#### getDefaultJsonParser
<a id="getDefaultJsonParser"></a>

`fastify.getDefaultJsonParser(onProtoPoisoning, onConstructorPoisoning)` takes
two arguments. First argument is ProtoType poisoning configuration and second
argument is constructor poisoning configuration. See the [`secure-json-parse`
documentation](https://github.com/fastify/secure-json-parse#api) for more
information.


#### defaultTextParser
<a id="defaultTextParser"></a>

`fastify.defaultTextParser()` can be used to parse content as plain text.

```js
fastify.addContentTypeParser('text/json', { asString: true }, fastify.defaultTextParser())
```

#### errorHandler
<a id="errorHandler"></a>

`fastify.errorHandler` can be used to handle errors using fastify's default
error handler.

```js
fastify.get('/', {
  errorHandler: (error, request, reply) => {
    if (error.code === 'SOMETHING_SPECIFIC') {
      reply.send({ custom: 'response' })
      return
    }

    fastify.errorHandler(error, request, response)
  }
}, handler)
```

#### initialConfig
<a id="initial-config"></a>

`fastify.initialConfig`: Exposes a frozen read-only object registering the
initial options passed down by the user to the Fastify instance.

Currently the properties that can be exposed are:
- connectionTimeout
- keepAliveTimeout
- bodyLimit
- caseSensitive
- allowUnsafeRegex
- http2
- https (it will return `false`/`true` or `{ allowHTTP1: true/false }` if
  explicitly passed)
- ignoreTrailingSlash
- disableRequestLogging
- maxParamLength
- onProtoPoisoning
- onConstructorPoisoning
- pluginTimeout
- requestIdHeader
- requestIdLogLabel
- http2SessionTimeout

```js
const { readFileSync } = require('fs')
const Fastify = require('fastify')

const fastify = Fastify({
  https: {
    allowHTTP1: true,
    key: readFileSync('./fastify.key'),
    cert: readFileSync('./fastify.cert')
  },
  logger: { level: 'trace'},
  ignoreTrailingSlash: true,
  maxParamLength: 200,
  caseSensitive: true,
  trustProxy: '127.0.0.1,192.168.1.1/24',
})

console.log(fastify.initialConfig)
/*
will log :
{
  caseSensitive: true,
  https: { allowHTTP1: true },
  ignoreTrailingSlash: true,
  maxParamLength: 200
}
*/

fastify.register(async (instance, opts) => {
  instance.get('/', async (request, reply) => {
    return instance.initialConfig
    /*
    will return :
    {
      caseSensitive: true,
      https: { allowHTTP1: true },
      ignoreTrailingSlash: true,
      maxParamLength: 200
    }
    */
  })

  instance.get('/error', async (request, reply) => {
    // will throw an error because initialConfig is read-only
    // and can not be modified
    instance.initialConfig.https.allowHTTP1 = false

    return instance.initialConfig
  })
})

// Start listening.
fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
```

## TypeScript

The Fastify framework is written in vanilla JavaScript, and as such type
definitions are not as easy to maintain; however, since version 2 and beyond,
maintainers and contributors have put in a great effort to improve the types.

The type system was changed in Fastify version 3. The new type system introduces
generic constraining and defaulting, plus a new way to define schema types such
as a request body, querystring, and more! As the team works on improving
framework and type definition synergy, sometimes parts of the API will not be
typed or may be typed incorrectly. We encourage you to **contribute** to help us
fill in the gaps. Just make sure to read our
[`CONTRIBUTING.md`](https://github.com/fastify/fastify/blob/main/CONTRIBUTING.md)
file before getting started to make sure things go smoothly!

> The documentation in this section covers Fastify version 3.x typings

> Plugins may or may not include typings. See [Plugins](#plugins) for more
> information. We encourage users to send pull requests to improve typings
> support.

🚨 Don't forget to install `@types/node`

## Learn By Example

The best way to learn the Fastify type system is by example! The following four
examples should cover the most common Fastify development cases. After the
examples there is further, more detailed documentation for the type system.

### Getting Started

This example will get you up and running with Fastify and TypeScript. It results
in a blank http Fastify server.

1. Create a new npm project, install Fastify, and install typescript & node.js
   types as peer dependencies:
  ```bash
  npm init -y
  npm i fastify
  npm i -D typescript @types/node
  ```
2. Add the following lines to the `"scripts"` section of the `package.json`:
  ```json
  {
    "scripts": {
      "build": "tsc -p tsconfig.json",
      "start": "node index.js"
    }
  }
  ```

3. Initialize a TypeScript configuration file:
  ```bash
  npx tsc --init
  ```
  or use one of the [recommended
  ones](https://github.com/tsconfig/bases#node-14-tsconfigjson).

*Note: Set `target` property in `tsconfig.json` to `es2017` or greater to avoid
[FastifyDeprecation](https://github.com/fastify/fastify/issues/3284) warning.*

4. Create an `index.ts` file - this will contain the server code
5. Add the following code block to your file:
   ```typescript
   import fastify from 'fastify'

   const server = fastify()

   server.get('/ping', async (request, reply) => {
     return 'pong\n'
   })

   server.listen({ port: 8080 }, (err, address) => {
     if (err) {
       console.error(err)
       process.exit(1)
     }
     console.log(`Server listening at ${address}`)
   })
   ```
6. Run `npm run build` - this will compile `index.ts` into `index.js` which can
   be executed using Node.js. If you run into any errors please open an issue in
   [fastify/help](https://github.com/fastify/help/)
7. Run `npm run start` to run the Fastify server
8. You should see `Server listening at http://127.0.0.1:8080` in your console
9. Try out your server using `curl localhost:8080/ping`, it should return `pong`
   🏓

🎉 You now have a working Typescript Fastify server! This example demonstrates
the simplicity of the version 3.x type system. By default, the type system
assumes you are using an `http` server. The later examples will demonstrate how
to create more complex servers such as `https` and `http2`, how to specify route
schemas, and more!

> For more examples on initializing Fastify with TypeScript (such as enabling
> HTTP2) check out the detailed API section [here][Fastify]

### Using Generics

The type system heavily relies on generic properties to provide the most
accurate development experience. While some may find the overhead a bit
cumbersome, the tradeoff is worth it! This example will dive into implementing
generic types for route schemas and the dynamic properties located on the
route-level `request` object.

1. If you did not complete the previous example, follow steps 1-4 to get set up.
2. Inside `index.ts`, define two interfaces `IQuerystring` and `IHeaders`:
   ```typescript
   interface IQuerystring {
     username: string;
     password: string;
   }

   interface IHeaders {
     'h-Custom': string;
   }
   ```
3. Using the two interfaces, define a new API route and pass them as generics.
   The shorthand route methods (i.e. `.get`) accept a generic object
   `RouteGenericInterface` containing five named properties: `Body`,
   `Querystring`, `Params`, `Headers` and `Reply`. The interfaces `Body`,
   `Querystring`, `Params` and `Headers` will be passed down through the route
   method into the route method handler `request` instance and the `Reply`
   interface to the `reply` instance.
   ```typescript
   server.get<{
     Querystring: IQuerystring,
     Headers: IHeaders
   }>('/auth', async (request, reply) => {
     const { username, password } = request.query
     const customerHeader = request.headers['h-Custom']
     // do something with request data

     return `logged in!`
   })
   ```

4. Build and run the server code with `npm run build` and `npm run start`
5. Query the api
   ```bash
   curl localhost:8080/auth?username=admin&password=Password123!
   ```
   And it should return back `logged in!`
6. But wait theres more! The generic interfaces are also available inside route
   level hook methods. Modify the previous route by adding a `preValidation`
   hook:
   ```typescript
   server.get<{
     Querystring: IQuerystring,
     Headers: IHeaders
   }>('/auth', {
     preValidation: (request, reply, done) => {
       const { username, password } = request.query
       done(username !== 'admin' ? new Error('Must be admin') : undefined) // only validate `admin` account
     }
   }, async (request, reply) => {
     const customerHeader = request.headers['h-Custom']
     // do something with request data
     return `logged in!`
   })
   ```
7. Build and run and query with the `username` query string option set to
   anything other than `admin`. The API should now return a HTTP 500 error
   `{"statusCode":500,"error":"Internal Server Error","message":"Must be
   admin"}`

🎉 Good work, now you can define interfaces for each route and have strictly
typed request and reply instances. Other parts of the Fastify type system rely
on generic properties. Make sure to reference the detailed type system
documentation below to learn more about what is available.

### JSON Schema

To validate your requests and responses you can use JSON Schema files. If you
didn't know already, defining schemas for your Fastify routes can increase their
throughput! Check out the [Validation and
Serialization](./Validation-and-Serialization.md) documentation for more info.

Also it has the advantage to use the defined type within your handlers
(including pre-validation, etc.).

Here are some options how to achieve this.

#### Fastify Type Providers

Fastify offers two packages wrapping `json-schema-to-ts` and `typebox`:

- `@fastify/type-provider-json-schema-to-ts`
- `@fastify/type-provider-typebox`

They simplify schema validation setup and you can read more about them in [Type Providers](./Type-Providers.md) page.

Below is how to setup schema validation using vanilla `typebox` and `json-schema-to-ts` packages.

#### typebox

A useful library for building types and a schema at once is
[typebox](https://www.npmjs.com/package/@sinclair/typebox). With typebox you
define your schema within your code and use them directly as types or schemas as
you need them.

When you want to use it for validation of some payload in a fastify route you
can do it as follows:

1. Install `typebox` in your project.

    ```bash
    npm i @sinclair/typebox
    ```

2. Define the schema you need with `Type` and create the respective type  with
   `Static`.

    ```typescript
    import { Static, Type } from '@sinclair/typebox'

    const User = Type.Object({
      name: Type.String(),
      mail: Type.Optional(Type.String({ format: "email" })),
    });
    type UserType = Static<typeof User>;
    ```

3. Use the defined type and schema during the definition of your route

    ```typescript
    const app = fastify();

    app.post<{ Body: UserType; Reply: UserType }>(
      "/",
      {
        schema: {
          body: User,
          response: {
            200: User,
          },
        },
      },
      (request, reply) => {
        const { body: user } = request;
        /* user has type
        * const user: StaticProperties<{
        *  name: TString;
        *  mail: TOptional<TString>;
        * }>
        */
        //...
        reply.status(200).send(user);
      }
    );
    ```

#### Schemas in JSON Files

In the last example we used interfaces to define the types for the request
querystring and headers. Many users will already be using JSON Schemas to define
these properties, and luckily there is a way to transform existing JSON Schemas
into TypeScript interfaces!

1. If you did not complete the 'Getting Started' example, go back and follow
   steps 1-4 first.
2. Install the `json-schema-to-typescript` module:

   ```bash
   npm i -D json-schema-to-typescript
   ```

3. Create a new folder called `schemas` and add two files `headers.json` and
   `querystring.json`. Copy and paste the following schema definitions into the
   respective files:

   ```json
   {
     "title": "Headers Schema",
     "type": "object",
     "properties": {
       "h-Custom": { "type": "string" }
     },
     "additionalProperties": false,
     "required": ["h-Custom"]
   }
   ```

   ```json
   {
     "title": "Querystring Schema",
     "type": "object",
     "properties": {
       "username": { "type": "string" },
       "password": { "type": "string" }
     },
     "additionalProperties": false,
     "required": ["username", "password"]
   }
   ```

4. Add a `compile-schemas` script to the package.json:

```json
   {
     "scripts": {
       "compile-schemas": "json2ts -i schemas -o types"
     }
   }
```

   `json2ts` is a CLI utility included in `json-schema-to-typescript`. `schemas`
   is the input path, and `types` is the output path.
5. Run `npm run compile-schemas`. Two new files should have been created in the
   `types` directory.
6. Update `index.ts` to have the following code:

```typescript
   import fastify from 'fastify'

   // import json schemas as normal
   import QuerystringSchema from './schemas/querystring.json'
   import HeadersSchema from './schemas/headers.json'

   // import the generated interfaces
   import { QuerystringSchema as QuerystringSchemaInterface } from './types/querystring'
   import { HeadersSchema as HeadersSchemaInterface } from './types/headers'

   const server = fastify()

   server.get<{
     Querystring: QuerystringSchemaInterface,
     Headers: HeadersSchemaInterface
   }>('/auth', {
     schema: {
       querystring: QuerystringSchema,
       headers: HeadersSchema
     },
     preValidation: (request, reply, done) => {
       const { username, password } = request.query
       done(username !== 'admin' ? new Error('Must be admin') : undefined)
     }
     //  or if using async
     //  preValidation: async (request, reply) => {
     //    const { username, password } = request.query
     //    if (username !== "admin") throw new Error("Must be admin");
     //  }
   }, async (request, reply) => {
     const customerHeader = request.headers['h-Custom']
     // do something with request data
     return `logged in!`
   })

   server.route<{
     Querystring: QuerystringSchemaInterface,
     Headers: HeadersSchemaInterface
   }>({
     method: 'GET',
     url: '/auth2',
     schema: {
       querystring: QuerystringSchema,
       headers: HeadersSchema
     },
     preHandler: (request, reply, done) => {
       const { username, password } = request.query
       const customerHeader = request.headers['h-Custom']
       done()
     },
     handler: (request, reply) => {
       const { username, password } = request.query
       const customerHeader = request.headers['h-Custom']
       reply.status(200).send({username});
     }
   })

   server.listen({ port: 8080 }, (err, address) => {
     if (err) {
       console.error(err)
       process.exit(0)
     }
     console.log(`Server listening at ${address}`)
   })
   ```
   Pay special attention to the imports at the top of this file. It might seem
   redundant, but you need to import both the schema files and the generated
   interfaces.

Great work! Now you can make use of both JSON Schemas and TypeScript
definitions.

#### json-schema-to-ts

If you do not want to generate types from your schemas, but want to use them
diretly from your code, you can use the package
[json-schema-to-ts](https://www.npmjs.com/package/json-schema-to-ts).

You can install it as dev-dependency.

```bash
npm i -D json-schema-to-ts
```

In your code you can define your schema like a normal object. But be aware of
making it *const* like explained in the docs of the module.

```typescript
const todo = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    done: { type: 'boolean' },
  },
  required: ['name'],
} as const; // don't forget to use const !
```

With the provided type `FromSchema` you can build a type from your schema and
use it in your handler.

```typescript
import { FromSchema } from "json-schema-to-ts";
fastify.post<{ Body: FromSchema<typeof todo> }>(
  '/todo',
  {
    schema: {
      body: todo,
      response: {
        201: {
          type: 'string',
        },
      },
    }
  },
  async (request, reply): Promise<void> => {

    /*
    request.body has type
    {
      [x: string]: unknown;
      description?: string;
      done?: boolean;
      name: string;
    }
    */

    request.body.name // will not throw type error
    request.body.notthere // will throw type error

    reply.status(201).send();
  },
);
```

### Plugins

One of Fastify's most distinguishable features is its extensive plugin
ecosystem. Plugin types are fully supported, and take advantage of the
[declaration
merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)
pattern. This example is broken up into three parts: Creating a TypeScript
Fastify Plugin, Creating Type Definitions for a Fastify Plugin, and Using a
Fastify Plugin in a TypeScript Project.

#### Creating a TypeScript Fastify Plugin

1. Initialize a new npm project and install required dependencies
   ```bash
   npm init -y
   npm i fastify fastify-plugin
   npm i -D typescript @types/node
   ```
2. Add a `build` script to the `"scripts"` section and `'index.d.ts'` to the
   `"types"` section of the `package.json` file:
   ```json
   {
     "types": "index.d.ts",
     "scripts": {
       "build": "tsc -p tsconfig.json"
     }
   }
   ```
3. Initialize a TypeScript configuration file:
   ```bash
   npx typescript --init
   ```
   Once the file is generated, enable the `"declaration"` option in the
   `"compilerOptions"` object.
   ```json
   {
     "compileOptions": {
       "declaration": true
     }
   }
   ```
4. Create an `index.ts` file - this will contain the plugin code
5. Add the following code to `index.ts`
   ```typescript
   import { FastifyPluginCallback, FastifyPluginAsync } from 'fastify'
   import fp from 'fastify-plugin'

   // using declaration merging, add your plugin props to the appropriate fastify interfaces
   // if prop type is defined here, the value will be typechecked when you call decorate{,Request,Reply}
   declare module 'fastify' {
     interface FastifyRequest {
       myPluginProp: string
     }
     interface FastifyReply {
       myPluginProp: number
     }
   }

   // define options
   export interface MyPluginOptions {
     myPluginOption: string
   }

   // define plugin using callbacks
   const myPluginCallback: FastifyPluginCallback<MyPluginOptions> = (fastify, options, done) => {
     fastify.decorateRequest('myPluginProp', 'super_secret_value')
     fastify.decorateReply('myPluginProp', options.myPluginOption)

     done()
   }

   // define plugin using promises
   const myPluginAsync: FastifyPluginAsync<MyPluginOptions> = async (fastify, options) => {
     fastify.decorateRequest('myPluginProp', 'super_secret_value')
     fastify.decorateReply('myPluginProp', options.myPluginOption)
   }

   // export plugin using fastify-plugin
   export default fp(myPluginCallback, '3.x')
   // or
   // export default fp(myPluginAsync, '3.x')
   ```
6. Run `npm run build` to compile the plugin code and produce both a JavaScript
   source file and a type definition file.
7. With the plugin now complete you can [publish to npm] or use it locally.
   > You do not _need_ to publish your plugin to npm to use it. You can include
   > it in a Fastify project and reference it as you would any piece of code! As
   > a TypeScript user, make sure the declaration override exists somewhere that
   > will be included in your project compilation so the TypeScript interpreter
   > can process it.

#### Creating Type Definitions for a Fastify Plugin

This plugin guide is for Fastify plugins written in JavaScript. The steps
outlined in this example are for adding TypeScript support for users consuming
your plugin.

1. Initialize a new npm project and install required dependencies
   ```bash
   npm init -y
   npm i fastify-plugin
   ```
2. Create two files `index.js` and `index.d.ts`
3. Modify the package json to include these files under the `main` and `types`
   properties (the name does not have to be `index` explicitly, but it is
   recommended the files have the same name):
   ```json
   {
     "main": "index.js",
     "types": "index.d.ts"
   }
   ```
4. Open `index.js` and add the following code:
   ```javascript
   // fastify-plugin is highly recommended for any plugin you write
   const fp = require('fastify-plugin')

   function myPlugin (instance, options, done) {

     // decorate the fastify instance with a custom function called myPluginFunc
     instance.decorate('myPluginFunc', (input) => {
       return input.toUpperCase()
     })

     done()
   }

   module.exports = fp(myPlugin, {
     fastify: '3.x',
     name: 'my-plugin' // this is used by fastify-plugin to derive the property name
   })
   ```
5. Open `index.d.ts` and add the following code:
   ```typescript
   import { FastifyPlugin } from 'fastify'

   interface PluginOptions {
     //...
   }

   // Optionally, you can add any additional exports.
   // Here we are exporting the decorator we added.
   export interface myPluginFunc {
     (input: string): string
   }

   // Most importantly, use declaration merging to add the custom property to the Fastify type system
   declare module 'fastify' {
     interface FastifyInstance {
       myPluginFunc: myPluginFunc
     }
   }

   // fastify-plugin automatically adds named export, so be sure to add also this type
   // the variable name is derived from `options.name` property if `module.exports.myPlugin` is missing
   export const myPlugin: FastifyPlugin<PluginOptions>

   // fastify-plugin automatically adds `.default` property to the exported plugin. See the note below
   export default myPlugin
   ```

__Note__: [fastify-plugin](https://github.com/fastify/fastify-plugin) v2.3.0 and
newer, automatically adds `.default` property and a named export to the exported
plugin. Be sure to `export default` and `export const myPlugin` in your typings
to provide the best developer experience. For a complete example you can check
out
[@fastify/swagger](https://github.com/fastify/fastify-swagger/blob/master/index.d.ts).

With those files completed, the plugin is now ready to be consumed by any
TypeScript project!

The Fastify plugin system enables developers to decorate the Fastify instance,
and the request/reply instances. For more information check out this blog post
on [Declaration Merging and Generic
Inheritance](https://dev.to/ethanarrowood/is-declaration-merging-and-generic-inheritance-at-the-same-time-impossible-53cp).

#### Using a Plugin

Using a Fastify plugin in TypeScript is just as easy as using one in JavaScript.
Import the plugin with `import/from` and you're all set -- except there is one
exception users should be aware of.

Fastify plugins use declaration merging to modify existing Fastify type
interfaces (check out the previous two examples for more details). Declaration
merging is not very _smart_, meaning if the plugin type definition for a plugin
is within the scope of the TypeScript interpreter, then the plugin types will be
included **regardless** of if the plugin is being used or not. This is an
unfortunate limitation of using TypeScript and is unavoidable as of right now.

However, there are a couple of suggestions to help improve this experience:
- Make sure the `no-unused-vars` rule is enabled in
  [ESLint](https://eslint.org/docs/rules/no-unused-vars) and any imported plugin
  are actually being loaded.
- Use a module such as [depcheck](https://www.npmjs.com/package/depcheck) or
  [npm-check](https://www.npmjs.com/package/npm-check) to verify plugin
  dependencies are being used somewhere in your project.

## Code Completion In Vanilla JavaScript

Vanilla JavaScript can use the published types to provide code completion (e.g.
[Intellisense](https://code.visualstudio.com/docs/editor/intellisense)) by
following the [TypeScript JSDoc
Reference](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html).

For example:

```js
/**  @type {import('fastify').FastifyPluginAsync<{ optionA: boolean, optionB: string }>} */
module.exports = async function (fastify, { optionA, optionB }) {
  fastify.get('/look', () => 'at me');
}
```

## API Type System Documentation

This section is a detailed account of all the types available to you in Fastify
version 3.x

All `http`, `https`, and `http2` types are inferred from `@types/node`

[Generics](#generics) are documented by their default value as well as their
constraint value(s). Read these articles for more information on TypeScript
generics.
- [Generic Parameter
  Default](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-3.html#generic-parameter-defaults)
- [Generic
  Constraints](https://www.typescriptlang.org/docs/handbook/generics.html#generic-constraints)

#### How to import

The Fastify API is powered by the `fastify()` method. In JavaScript you would
import it using `const fastify = require('fastify')`. In TypeScript it is
recommended to use the `import/from` syntax instead so types can be resolved.
There are a couple supported import methods with the Fastify type system.

1. `import fastify from 'fastify'`
   - Types are resolved but not accessible using dot notation
   - Example:
     ```typescript
     import fastify from 'fastify'

     const f = fastify()
     f.listen({ port: 8080 }, () => { console.log('running') })
     ```
   - Gain access to types with destructuring:
     ```typescript
     import fastify, { FastifyInstance } from 'fastify'

     const f: FastifyInstance = fastify()
     f.listen({ port: 8080 }, () => { console.log('running') })
     ```
   - Destructuring also works for the main API method:
     ```typescript
     import { fastify, FastifyInstance } from 'fastify'

     const f: FastifyInstance = fastify()
     f.listen({ port: 8080 }, () => { console.log('running') })
     ```
2. `import * as Fastify from 'fastify'`
   - Types are resolved and accessible using dot notation
   - Calling the main Fastify API method requires a slightly different syntax
     (see example)
   - Example:
     ```typescript
     import * as Fastify from 'fastify'

     const f: Fastify.FastifyInstance = Fastify.fastify()
     f.listen({ port: 8080 }, () => { console.log('running') })
     ```
3. `const fastify = require('fastify')`
   - This syntax is valid and will import fastify as expected; however, types
     will **not** be resolved
   - Example:
     ```typescript
     const fastify = require('fastify')

     const f = fastify()
     f.listen({ port: 8080 }, () => { console.log('running') })
     ```
   - Destructuring is supported and will resolve types properly
     ```typescript
     const { fastify } = require('fastify')

     const f = fastify()
     f.listen({ port: 8080 }, () => { console.log('running') })
     ```

#### Generics

Many type definitions share the same generic parameters; they are all
documented, in detail, within this section.

Most definitions depend on `@node/types` modules `http`, `https`, and `http2`

##### RawServer
Underlying Node.js server type

Default: `http.Server`

Constraints: `http.Server`, `https.Server`, `http2.Http2Server`,
`http2.Http2SecureServer`

Enforces generic parameters: [`RawRequest`][RawRequestGeneric],
[`RawReply`][RawReplyGeneric]

##### RawRequest
Underlying Node.js request type

Default: [`RawRequestDefaultExpression`][RawRequestDefaultExpression]

Constraints: `http.IncomingMessage`, `http2.Http2ServerRequest`

Enforced by: [`RawServer`][RawServerGeneric]

##### RawReply
Underlying Node.js response type

Default: [`RawReplyDefaultExpression`][RawReplyDefaultExpression]

Constraints: `http.ServerResponse`, `http2.Http2ServerResponse`

Enforced by: [`RawServer`][RawServerGeneric]

##### Logger
Fastify logging utility

Default: [`FastifyLoggerOptions`][FastifyLoggerOptions]

Enforced by: [`RawServer`][RawServerGeneric]

##### RawBody
A generic parameter for the content-type-parser methods.

Constraints: `string | Buffer`

---

#### Fastify

##### fastify<[RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [Logger][LoggerGeneric]>(opts?: [FastifyServerOptions][FastifyServerOptions]): [FastifyInstance][FastifyInstance]
[src](https://github.com/fastify/fastify/blob/main/fastify.d.ts#L19)

The main Fastify API method. By default creates an HTTP server. Utilizing
discriminant unions and overload methods, the type system will automatically
infer which type of server (http, https, or http2) is being created purely based
on the options based to the method (see the examples below for more
information). It also supports an extensive generic type system to allow the
user to extend the underlying Node.js Server, Request, and Reply objects.
Additionally, the `Logger` generic exists for custom log types. See the examples
and generic breakdown below for more information.

###### Example 1: Standard HTTP server

No need to specify the `Server` generic as the type system defaults to HTTP.
```typescript
import fastify from 'fastify'

const server = fastify()
```
Check out the Learn By Example - [Getting Started](#getting-started) example for
a more detailed http server walkthrough.

###### Example 2: HTTPS sever

1. Create the following imports from `@types/node` and `fastify`
   ```typescript
   import fs from 'fs'
   import path from 'path'
   import fastify from 'fastify'
   ```
2. Follow the steps in this official [Node.js https server
   guide](https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/)
   to create the `key.pem` and `cert.pem` files
3. Instantiate a Fastify https server and add a route:
   ```typescript
   const server = fastify({
     https: {
       key: fs.readFileSync(path.join(__dirname, 'key.pem')),
       cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
     }
   })

   server.get('/', async function (request, reply) {
     return { hello: 'world' }
   })

   server.listen({ port: 8080 }, (err, address) => {
     if (err) {
       console.error(err)
       process.exit(0)
     }
     console.log(`Server listening at ${address}`)
   })
   ```
4. Build and run! Test your server out by querying with: `curl -k
   https://localhost:8080`

###### Example 3: HTTP2 server

There are two types of HTTP2 server types, insecure and secure. Both require
specifying the `http2` property as `true` in the `options` object. The `https`
property is used for creating a secure http2 server; omitting the `https`
property will create an insecure http2 server.

```typescript
const insecureServer = fastify({ http2: true })
const secureServer = fastify({
  http2: true,
  https: {} // use the `key.pem` and `cert.pem` files from the https section
})
```

For more details on using HTTP2 check out the Fastify [HTTP2](./HTTP2.md)
documentation page.

###### Example 4: Extended HTTP server

Not only can you specify the server type, but also the request and reply types.
Thus, allowing you to specify special properties, methods, and more! When
specified at server instantiation, the custom type becomes available on all
further instances of the custom type.
```typescript
import fastify from 'fastify'
import http from 'http'

interface customRequest extends http.IncomingMessage {
  mySpecialProp: string
}

const server = fastify<http.Server, customRequest>()

server.get('/', async (request, reply) => {
  const someValue = request.raw.mySpecialProp // TS knows this is a string, because of the `customRequest` interface
  return someValue.toUpperCase()
})
```

###### Example 5: Specifying logger types

Fastify uses [Pino](https://getpino.io/#/) logging library under the hood. Since
`pino@7`, all of it's properties can be configured via `logger` field when
constructing Fastify's instance. If properties you need aren't exposed, please
open an Issue to [`Pino`](https://github.com/pinojs/pino/issues) or pass a
preconfigured external instance of Pino (or any other compatible logger) as
temporary fix to Fastify via the same field. This allows creating custom
serializers as well, see the [Logging](Logging.md) documentation for more info.

```typescript
import fastify from 'fastify'

const server = fastify({
  logger: {
    level: 'info',
    redact: ['x-userinfo'],
    messageKey: 'message'
  }
})

server.get('/', async (request, reply) => {
  server.log.info('log message')
  return 'another message'
})
```

---

##### fastify.HTTPMethods
[src](https://github.com/fastify/fastify/blob/main/types/utils.d.ts#L8)

Union type of: `'DELETE' | 'GET' | 'HEAD' | 'PATCH' | 'POST' | 'PUT' |
'OPTIONS'`

##### fastify.RawServerBase
[src](https://github.com/fastify/fastify/blob/main/types/utils.d.ts#L13)

Dependant on `@types/node` modules `http`, `https`, `http2`

Union type of: `http.Server | https.Server | http2.Http2Server |
http2.Http2SecureServer`

##### fastify.RawServerDefault
[src](https://github.com/fastify/fastify/blob/main/types/utils.d.ts#L18)

Dependant on `@types/node` modules `http`

Type alias for `http.Server`

---

##### fastify.FastifyServerOptions<[RawServer][RawServerGeneric], [Logger][LoggerGeneric]>

[src](https://github.com/fastify/fastify/blob/main/fastify.d.ts#L29)

An interface of properties used in the instantiation of the Fastify server. Is
used in the main [`fastify()`][Fastify] method. The `RawServer` and `Logger`
generic parameters are passed down through that method.

See the main [fastify][Fastify] method type definition section for examples on
instantiating a Fastify server with TypeScript.

##### fastify.FastifyInstance<[RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RequestGeneric][FastifyRequestGenericInterface], [Logger][LoggerGeneric]>

[src](https://github.com/fastify/fastify/blob/main/types/instance.d.ts#L16)

Interface that represents the Fastify server object. This is the returned server
instance from the [`fastify()`][Fastify] method. This type is an interface so it
can be extended via [declaration
merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)
if your code makes use of the `decorate` method.

Through the use of generic cascading, all methods attached to the instance
inherit the generic properties from instantiation. This means that by specifying
the server, request, or reply types, all methods will know how to type those
objects.

Check out the main [Learn by Example](#learn-by-example) section for detailed
guides, or the more simplified [fastify][Fastify] method examples for additional
details on this interface.

---

#### Request

##### fastify.FastifyRequest<[RequestGeneric][FastifyRequestGenericInterface], [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric]>
[src](https://github.com/fastify/fastify/blob/main/types/request.d.ts#L15)

This interface contains properties of Fastify request object. The properties
added here disregard what kind of request object (http vs http2) and disregard
what route level it is serving; thus calling `request.body` inside a GET request
will not throw an error (but good luck sending a GET request with a body 😉).

If you need to add custom properties to the `FastifyRequest` object (such as
when using the [`decorateRequest`][DecorateRequest] method) you need to use
declaration merging on this interface.

A basic example is provided in the [`FastifyRequest`][FastifyRequest] section.
For a more detailed example check out the Learn By Example section:
[Plugins](#plugins)

###### Example
```typescript
import fastify from 'fastify'

const server = fastify()

server.decorateRequest('someProp', 'hello!')

server.get('/', async (request, reply) => {
  const { someProp } = request // need to use declaration merging to add this prop to the request interface
  return someProp
})

// this declaration must be in scope of the typescript interpreter to work
declare module 'fastify' {
  interface FastifyRequest { // you must reference the interface and not the type
    someProp: string
  }
}

// Or you can type your request using
type CustomRequest = FastifyRequest<{
  Body: { test: boolean };
}>

server.get('/typedRequest', async (request: CustomRequest, reply: FastifyReply) => {
  return request.body.test
})
```

##### fastify.RequestGenericInterface
[src](https://github.com/fastify/fastify/blob/main/types/request.d.ts#L4)

Fastify request objects have four dynamic properties: `body`, `params`, `query`,
and `headers`. Their respective types are assignable through this interface. It
is a named property interface enabling the developer to ignore the properties
they do not want to specify. All omitted properties are defaulted to `unknown`.
The corresponding property names are: `Body`, `Querystring`, `Params`,
`Headers`.

```typescript
import fastify, { RequestGenericInterface } from 'fastify'

const server = fastify()

interface requestGeneric extends RequestGenericInterface {
  Querystring: {
    name: string
  }
}

server.get<requestGeneric>('/', async (request, reply) => {
  const { name } = request.query // the name prop now exists on the query prop
  return name.toUpperCase()
})
```

If you want to see a detailed example of using this interface check out the
Learn by Example section: [JSON Schema](#jsonschema).

##### fastify.RawRequestDefaultExpression\<[RawServer][RawServerGeneric]\>
[src](https://github.com/fastify/fastify/blob/main/types/utils.d.ts#L23)

Dependant on `@types/node` modules `http`, `https`, `http2`

Generic parameter `RawServer` defaults to [`RawServerDefault`][RawServerDefault]

If `RawServer` is of type `http.Server` or `https.Server`, then this expression
returns `http.IncomingMessage`, otherwise, it returns
`http2.Http2ServerRequest`.

```typescript
import http from 'http'
import http2 from 'http2'
import { RawRequestDefaultExpression } from 'fastify'

RawRequestDefaultExpression<http.Server> // -> http.IncomingMessage
RawRequestDefaultExpression<http2.Http2Server> // -> http2.Http2ServerRequest
```

---

#### Reply

##### fastify.FastifyReply<[RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>
[src](https://github.com/fastify/fastify/blob/main/types/reply.d.ts#L32)

This interface contains the custom properties that Fastify adds to the standard
Node.js reply object. The properties added here disregard what kind of reply
object (http vs http2).

If you need to add custom properties to the FastifyReply object (such as when
using the `decorateReply` method) you need to use declaration merging on this
interface.

A basic example is provided in the [`FastifyReply`][FastifyReply] section. For a
more detailed example check out the Learn By Example section:
[Plugins](#plugins)

###### Example
```typescript
import fastify from 'fastify'

const server = fastify()

server.decorateReply('someProp', 'world')

server.get('/', async (request, reply) => {
  const { someProp } = reply // need to use declaration merging to add this prop to the reply interface
  return someProp
})

// this declaration must be in scope of the typescript interpreter to work
declare module 'fastify' {
  interface FastifyReply { // you must reference the interface and not the type
    someProp: string
  }
}
```

##### fastify.RawReplyDefaultExpression<[RawServer][RawServerGeneric]>
[src](https://github.com/fastify/fastify/blob/main/types/utils.d.ts#L27)

Dependant on `@types/node` modules `http`, `https`, `http2`

Generic parameter `RawServer` defaults to [`RawServerDefault`][RawServerDefault]

If `RawServer` is of type `http.Server` or `https.Server`, then this expression
returns `http.ServerResponse`, otherwise, it returns
`http2.Http2ServerResponse`.

```typescript
import http from 'http'
import http2 from 'http2'
import { RawReplyDefaultExpression } from 'fastify'

RawReplyDefaultExpression<http.Server> // -> http.ServerResponse
RawReplyDefaultExpression<http2.Http2Server> // -> http2.Http2ServerResponse
```

---

#### Plugin

Fastify allows the user to extend its functionalities with plugins. A plugin can
be a set of routes, a server decorator or whatever. To activate plugins, use the
[`fastify.register()`][FastifyRegister] method.

When creating plugins for Fastify, it is recommended to use the `fastify-plugin`
module. Additionally, there is a guide to creating plugins with TypeScript and
Fastify available in the Learn by Example, [Plugins](#plugins) section.

##### fastify.FastifyPluginCallback<[Options][FastifyPluginOptions]>
[src](https://github.com/fastify/fastify/blob/main/types/plugin.d.ts#L9)

Interface method definition used within the
[`fastify.register()`][FastifyRegister] method.

##### fastify.FastifyPluginAsync<[Options][FastifyPluginOptions]>
[src](https://github.com/fastify/fastify/blob/main/types/plugin.d.ts#L20)

Interface method definition used within the
[`fastify.register()`][FastifyRegister] method.

##### fastify.FastifyPlugin<[Options][FastifyPluginOptions]>
[src](https://github.com/fastify/fastify/blob/main/types/plugin.d.ts#L29)

Interface method definition used within the
[`fastify.register()`][FastifyRegister] method. Document deprecated in favor of
`FastifyPluginCallback` and `FastifyPluginAsync` since general `FastifyPlugin`
doesn't properly infer types for async functions.

##### fastify.FastifyPluginOptions
[src](https://github.com/fastify/fastify/blob/main/types/plugin.d.ts#L31)

A loosely typed object used to constrain the `options` parameter of
[`fastify.register()`][FastifyRegister] to an object. When creating a plugin,
define its options as an extension of this interface (`interface MyPluginOptions
extends FastifyPluginOptions`) so they can be passed to the register method.

---

#### Register

##### fastify.FastifyRegister(plugin: [FastifyPluginCallback][FastifyPluginCallback], opts: [FastifyRegisterOptions][FastifyRegisterOptions])
[src](https://github.com/fastify/fastify/blob/main/types/register.d.ts#L9)
##### fastify.FastifyRegister(plugin: [FastifyPluginAsync][FastifyPluginAsync], opts: [FastifyRegisterOptions][FastifyRegisterOptions])
[src](https://github.com/fastify/fastify/blob/main/types/register.d.ts#L9)
##### fastify.FastifyRegister(plugin: [FastifyPlugin][FastifyPlugin], opts: [FastifyRegisterOptions][FastifyRegisterOptions])
[src](https://github.com/fastify/fastify/blob/main/types/register.d.ts#L9)

This type interface specifies the type for the
[`fastify.register()`](./Server.md#register) method. The type interface returns
a function signature with an underlying generic `Options` which is defaulted to
[FastifyPluginOptions][FastifyPluginOptions]. It infers this generic from the
FastifyPlugin parameter when calling this function so there is no need to
specify the underlying generic. The options parameter is the intersection of the
plugin's options and two additional optional properties: `prefix: string` and
`logLevel`: [LogLevel][LogLevel].

Below is an example of the options inference in action:

```typescript
const server = fastify()

const plugin: FastifyPlugin<{
  option1: string;
  option2: boolean;
}> = function (instance, opts, done) { }

fastify().register(plugin, {}) // Error - options object is missing required properties
fastify().register(plugin, { option1: '', option2: true }) // OK - options object contains required properties
```

See the Learn By Example, [Plugins](#plugins) section for more detailed examples
of creating TypeScript plugins in Fastify.

##### fastify.FastifyRegisterOptions
[src](https://github.com/fastify/fastify/blob/main/types/register.d.ts#L16)

This type is the intersection of the `Options` generic and a non-exported
interface `RegisterOptions` that specifies two optional properties: `prefix:
string` and `logLevel`: [LogLevel][LogLevel]. This type can also be specified as
a function that returns the previously described intersection.

---

#### Logger

Check out the [Specifying Logger Types](#example-5-specifying-logger-types)
example for more details on specifying a custom logger.

##### fastify.FastifyLoggerOptions<[RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric]>

[src](https://github.com/fastify/fastify/blob/main/types/logger.d.ts#L17)

An interface definition for the internal Fastify logger. It is emulative of the
[Pino.js](https://getpino.io/#/) logger. When enabled through server options,
use it following the general [logger](./Logging.md) documentation.

##### fastify.FastifyLogFn

[src](https://github.com/fastify/fastify/blob/main/types/logger.d.ts#L7)

An overload function interface that implements the two ways Fastify calls log
methods. This interface is passed to all associated log level properties on the
FastifyLoggerOptions object.

##### fastify.LogLevel

[src](https://github.com/fastify/fastify/blob/main/types/logger.d.ts#L12)

Union type of: `'info' | 'error' | 'debug' | 'fatal' | 'warn' | 'trace'`

---

#### Context

The context type definition is similar to the other highly dynamic pieces of the
type system. Route context is available in the route handler method.

##### fastify.FastifyContext

[src](https://github.com/fastify/fastify/blob/main/types/context.d.ts#L6)

An interface with a single required property `config` that is set by default to
`unknown`. Can be specified either using a generic or an overload.

This type definition is potentially incomplete. If you are using it and can
provide more details on how to improve the definition, we strongly encourage you
to open an issue in the main
[fastify/fastify](https://github.com/fastify/fastify) repository. Thank you in
advanced!

---

#### Routing

One of the core principles in Fastify is its routing capabilities. Most of the
types defined in this section are used under-the-hood by the Fastify instance
`.route` and `.get/.post/.etc` methods.

##### fastify.RouteHandlerMethod<[RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>

[src](https://github.com/fastify/fastify/blob/main/types/route.d.ts#L105)

A type declaration for the route handler methods. Has two arguments, `request`
and `reply` which are typed by `FastifyRequest` and `FastifyReply` respectfully.
The generics parameters are passed through to these arguments. The method
returns either `void` or `Promise<any>` for synchronous and asynchronous
handlers respectfully.

##### fastify.RouteOptions<[RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>

[src](https://github.com/fastify/fastify/blob/main/types/route.d.ts#L78)

An interface that extends RouteShorthandOptions and adds the following three
required properties:
1. `method` which corresponds to a singular [HTTPMethod][HTTPMethods] or a list
   of [HTTPMethods][HTTPMethods]
2. `url` a string for the route
3. `handler` the route handler method, see [RouteHandlerMethod][] for more
   details

##### fastify.RouteShorthandMethod<[RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric]>

[src](https://github.com/fastify/fastify/blob/main/types/route.d.ts#12)

An overloaded function interface for three kinds of shorthand route methods to
be used in conjunction with the `.get/.post/.etc` methods.

##### fastify.RouteShorthandOptions<[RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>

[src](https://github.com/fastify/fastify/blob/main/types/route.d.ts#55)

An interface that covers all of the base options for a route. Each property on
this interface is optional, and it serves as the base for the RouteOptions and
RouteShorthandOptionsWithHandler interfaces.

##### fastify.RouteShorthandOptionsWithHandler<[RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>

[src](https://github.com/fastify/fastify/blob/main/types/route.d.ts#93)

This interface adds a single, required property to the RouteShorthandOptions
interface `handler` which is of type RouteHandlerMethod

---

#### Parsers

##### RawBody

A generic type that is either a `string` or `Buffer`

##### fastify.FastifyBodyParser<[RawBody][RawBodyGeneric], [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric]>

[src](https://github.com/fastify/fastify/blob/main/types/content-type-parser.d.ts#L7)

A function type definition for specifying a body parser method. Use the
`RawBody` generic to specify the type of the body being parsed.

##### fastify.FastifyContentTypeParser<[RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric]>

[src](https://github.com/fastify/fastify/blob/main/types/content-type-parser.d.ts#L17)

A function type definition for specifying a body parser method. Content is typed
via the `RawRequest` generic.

##### fastify.AddContentTypeParser<[RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric]>

[src](https://github.com/fastify/fastify/blob/main/types/content-type-parser.d.ts#L46)

An overloaded interface function definition for the `addContentTypeParser`
method. If `parseAs` is passed to the `opts` parameter, the definition uses
[FastifyBodyParser][] for the `parser` parameter; otherwise, it uses
[FastifyContentTypeParser][].

##### fastify.hasContentTypeParser

[src](https://github.com/fastify/fastify/blob/main/types/content-type-parser.d.ts#L63)

A method for checking the existence of a type parser of a certain content type

---

#### Errors

##### fastify.FastifyError

[src](https://github.com/fastify/fastify/blob/main/types/error.d.ts#L17)

FastifyError is a custom error object that includes status code and validation
results.

It extends the Node.js `Error` type, and adds two additional, optional
properties: `statusCode: number` and `validation: ValiationResult[]`.

##### fastify.ValidationResult

[src](https://github.com/fastify/fastify/blob/main/types/error.d.ts#L4)

The route validation internally relies upon Ajv, which is a high-performance
JSON schema validator.

This interface is passed to instance of FastifyError.

---

#### Hooks

##### fastify.onRequestHookHandler<[RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>(request: [FastifyRequest][FastifyRequest], reply: [FastifyReply][FastifyReply], done: (err?: [FastifyError][FastifyError]) => void): Promise\<unknown\> | void

[src](https://github.com/fastify/fastify/blob/main/types/hooks.d.ts#L17)

`onRequest` is the first hook to be executed in the request lifecycle. There was
no previous hook, the next hook will be `preParsing`.

Notice: in the `onRequest` hook, request.body will always be null, because the
body parsing happens before the `preHandler` hook.

##### fastify.preParsingHookHandler<[RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>(request: [FastifyRequest][FastifyRequest], reply: [FastifyReply][FastifyReply], done: (err?: [FastifyError][FastifyError]) => void): Promise\<unknown\> | void

[src](https://github.com/fastify/fastify/blob/main/types/hooks.d.ts#L35)

`preParsing` is the second hook to be executed in the request lifecycle. The
previous hook was `onRequest`, the next hook will be `preValidation`.

Notice: in the `preParsing` hook, request.body will always be null, because the
body parsing happens before the `preValidation` hook.

Notice: you should also add `receivedEncodedLength` property to the returned
stream. This property is used to correctly match the request payload with the
`Content-Length` header value. Ideally, this property should be updated on each
received chunk.

##### fastify.preValidationHookHandler<[RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>(request: [FastifyRequest][FastifyRequest], reply: [FastifyReply][FastifyReply], done: (err?: [FastifyError][FastifyError]) => void): Promise\<unknown\> | void

[src](https://github.com/fastify/fastify/blob/main/types/hooks.d.ts#L53)

`preValidation` is the third hook to be executed in the request lifecycle. The
previous hook was `preParsing`, the next hook will be `preHandler`.

##### fastify.preHandlerHookHandler<[RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>(request: [FastifyRequest][FastifyRequest], reply: [FastifyReply][FastifyReply], done: (err?: [FastifyError][FastifyError]) => void): Promise\<unknown\> | void

[src](https://github.com/fastify/fastify/blob/main/types/hooks.d.ts#L70)

`preHandler` is the fourth hook to be executed in the request lifecycle. The
previous hook was `preValidation`, the next hook will be `preSerialization`.

##### fastify.preSerializationHookHandler<PreSerializationPayload, [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>(request: [FastifyRequest][FastifyRequest], reply: [FastifyReply][FastifyReply], payload: PreSerializationPayload, done: (err: [FastifyError][FastifyError] | null, res?: unknown) => void): Promise\<unknown\> | void

[src](https://github.com/fastify/fastify/blob/main/types/hooks.d.ts#L94)

`preSerialization` is the fifth hook to be executed in the request lifecycle.
The previous hook was `preHandler`, the next hook will be `onSend`.

Note: the hook is NOT called if the payload is a string, a Buffer, a stream or
null.

##### fastify.onSendHookHandler<OnSendPayload, [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>(request: [FastifyRequest][FastifyRequest], reply: [FastifyReply][FastifyReply], payload: OnSendPayload, done: (err: [FastifyError][FastifyError] | null, res?: unknown) => void): Promise\<unknown\> | void

[src](https://github.com/fastify/fastify/blob/main/types/hooks.d.ts#L114)

You can change the payload with the `onSend` hook. It is the sixth hook to be
executed in the request lifecycle. The previous hook was `preSerialization`, the
next hook will be `onResponse`.

Note: If you change the payload, you may only change it to a string, a Buffer, a
stream, or null.

##### fastify.onResponseHookHandler<[RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>(request: [FastifyRequest][FastifyRequest], reply: [FastifyReply][FastifyReply], done: (err?: [FastifyError][FastifyError]) => void): Promise\<unknown\> | void

[src](https://github.com/fastify/fastify/blob/main/types/hooks.d.ts#L134)

`onResponse` is the seventh and last hook in the request hook lifecycle. The
previous hook was `onSend`, there is no next hook.

The onResponse hook is executed when a response has been sent, so you will not
be able to send more data to the client. It can however be useful for sending
data to external services, for example to gather statistics.

##### fastify.onErrorHookHandler<[RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>(request: [FastifyRequest][FastifyRequest], reply: [FastifyReply][FastifyReply], error: [FastifyError][FastifyError], done: () => void): Promise\<unknown\> | void

[src](https://github.com/fastify/fastify/blob/main/types/hooks.d.ts#L154)

This hook is useful if you need to do some custom error logging or add some
specific header in case of error.

It is not intended for changing the error, and calling reply.send will throw an
exception.

This hook will be executed only after the customErrorHandler has been executed,
and only if the customErrorHandler sends an error back to the user (Note that
the default customErrorHandler always sends the error back to the user).

Notice: unlike the other hooks, pass an error to the done function is not
supported.

##### fastify.onRouteHookHandler<[RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>(opts: [RouteOptions][RouteOptions] & { path: string; prefix: string }): Promise\<unknown\> | void

[src](https://github.com/fastify/fastify/blob/main/types/hooks.d.ts#L174)

Triggered when a new route is registered. Listeners are passed a routeOptions
object as the sole parameter. The interface is synchronous, and, as such, the
listener does not get passed a callback

##### fastify.onRegisterHookHandler<[RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [Logger][LoggerGeneric]>(instance: [FastifyInstance][FastifyInstance], done: (err?: [FastifyError][FastifyError]) => void): Promise\<unknown\> | void

[src](https://github.com/fastify/fastify/blob/main/types/hooks.d.ts#L191)

Triggered when a new plugin is registered and a new encapsulation context is
created. The hook will be executed before the registered code.

This hook can be useful if you are developing a plugin that needs to know when a
plugin context is formed, and you want to operate in that specific context.

Note: This hook will not be called if a plugin is wrapped inside fastify-plugin.

##### fastify.onCloseHookHandler<[RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [Logger][LoggerGeneric]>(instance: [FastifyInstance][FastifyInstance], done: (err?: [FastifyError][FastifyError]) => void): Promise\<unknown\> | void

[src](https://github.com/fastify/fastify/blob/main/types/hooks.d.ts#L206)

Triggered when fastify.close() is invoked to stop the server. It is useful when
plugins need a "shutdown" event, for example to close an open connection to a
database.


<!-- Links -->

[Fastify]: #fastifyrawserver-rawrequest-rawreply-loggeropts-fastifyserveroptions-fastifyinstance
[RawServerGeneric]: #rawserver
[RawRequestGeneric]: #rawrequest
[RawReplyGeneric]: #rawreply
[LoggerGeneric]: #logger
[RawBodyGeneric]: #rawbody
[HTTPMethods]: #fastifyhttpmethods
[RawServerBase]: #fastifyrawserverbase
[RawServerDefault]: #fastifyrawserverdefault
[FastifyRequest]: #fastifyfastifyrequestrawserver-rawrequest-requestgeneric
[FastifyRequestGenericInterface]: #fastifyrequestgenericinterface
[RawRequestDefaultExpression]: #fastifyrawrequestdefaultexpressionrawserver
[FastifyReply]: #fastifyfastifyreplyrawserver-rawreply-contextconfig
[RawReplyDefaultExpression]: #fastifyrawreplydefaultexpression
[FastifyServerOptions]: #fastifyfastifyserveroptions-rawserver-logger
[FastifyInstance]: #fastifyfastifyinstance
[FastifyLoggerOptions]: #fastifyfastifyloggeroptions
[ContextConfigGeneric]: #ContextConfigGeneric
[FastifyPlugin]: #fastifyfastifypluginoptions-rawserver-rawrequest-requestgeneric
[FastifyPluginCallback]: #fastifyfastifyplugincallbackoptions
[FastifyPluginAsync]: #fastifyfastifypluginasyncoptions
[FastifyPluginOptions]: #fastifyfastifypluginoptions
[FastifyRegister]: #fastifyfastifyregisterrawserver-rawrequest-requestgenericplugin-fastifyplugin-opts-fastifyregisteroptions
[FastifyRegisterOptions]: #fastifyfastifytregisteroptions
[LogLevel]: #fastifyloglevel
[FastifyError]: #fastifyfastifyerror
[RouteOptions]: #fastifyrouteoptionsrawserver-rawrequest-rawreply-requestgeneric-contextconfig


## Validation and Serialization

Fastify uses a schema-based approach, and even if it is not mandatory we
recommend using [JSON Schema](https://json-schema.org/) to validate your routes
and serialize your outputs. Internally, Fastify compiles the schema into a
highly performant function.

Validation will only be attempted if the content type is `application-json`,
as described in the documentation for the [content type parser](./ContentTypeParser.md).

All the examples in this section are using the [JSON Schema Draft 7](https://json-schema.org/specification-links.html#draft-7) specification.

> ## ⚠  Security Notice
> Treat the schema definition as application code. Validation and serialization
> features dynamically evaluate code with `new Function()`, which is not safe to
> use with user-provided schemas. See [Ajv](https://npm.im/ajv) and
> [fast-json-stringify](https://npm.im/fast-json-stringify) for more details.
>
> Moreover, the [`$async` Ajv
> feature](https://ajv.js.org/guide/async-validation.html) should not be used as
> part of the first validation strategy. This option is used to access Databases
> and reading them during the validation process may lead to Denial of Service
> Attacks to your application. If you need to run `async` tasks, use [Fastify's
> hooks](./Hooks.md) instead after validation completes, such as `preHandler`.


### Core concepts
The validation and the serialization tasks are processed by two different, and
customizable, actors:
- [Ajv v8](https://www.npmjs.com/package/ajv) for the validation of a request
- [fast-json-stringify](https://www.npmjs.com/package/fast-json-stringify) for
  the serialization of a response's body

These two separate entities share only the JSON schemas added to Fastify's
instance through `.addSchema(schema)`.

#### Adding a shared schema
<a id="shared-schema"></a>

Thanks to the `addSchema` API, you can add multiple schemas to the Fastify
instance and then reuse them in multiple parts of your application. As usual,
this API is encapsulated.

The shared schemas can be reused through the JSON Schema
[**`$ref`**](https://tools.ietf.org/html/draft-handrews-json-schema-01#section-8)
keyword. Here is an overview of _how_ references work:

+ `myField: { $ref: '#foo'}` will search for field with `$id: '#foo'` inside the
  current schema
+ `myField: { $ref: '#/definitions/foo'}` will search for field
  `definitions.foo` inside the current schema
+ `myField: { $ref: 'http://url.com/sh.json#'}` will search for a shared schema
  added with `$id: 'http://url.com/sh.json'`
+ `myField: { $ref: 'http://url.com/sh.json#/definitions/foo'}` will search for
  a shared schema added with `$id: 'http://url.com/sh.json'` and will use the
  field `definitions.foo`
+ `myField: { $ref: 'http://url.com/sh.json#foo'}` will search for a shared
  schema added with `$id: 'http://url.com/sh.json'` and it will look inside of
  it for object with `$id: '#foo'`


**Simple usage:**

```js
fastify.addSchema({
  $id: 'http://example.com/',
  type: 'object',
  properties: {
    hello: { type: 'string' }
  }
})

fastify.post('/', {
  handler () {},
  schema: {
    body: {
      type: 'array',
      items: { $ref: 'http://example.com#/properties/hello' }
    }
  }
})
```

**`$ref` as root reference:**

```js
fastify.addSchema({
  $id: 'commonSchema',
  type: 'object',
  properties: {
    hello: { type: 'string' }
  }
})

fastify.post('/', {
  handler () {},
  schema: {
    body: { $ref: 'commonSchema#' },
    headers: { $ref: 'commonSchema#' }
  }
})
```

#### Retrieving the shared schemas
<a id="get-shared-schema"></a>

If the validator and the serializer are customized, the `.addSchema` method will
not be useful since the actors are no longer controlled by Fastify. To access
the schemas added to the Fastify instance, you can simply use `.getSchemas()`:

```js
fastify.addSchema({
  $id: 'schemaId',
  type: 'object',
  properties: {
    hello: { type: 'string' }
  }
})

const mySchemas = fastify.getSchemas()
const mySchema = fastify.getSchema('schemaId')
```

As usual, the function `getSchemas` is encapsulated and returns the shared
schemas available in the selected scope:

```js
fastify.addSchema({ $id: 'one', my: 'hello' })
// will return only `one` schema
fastify.get('/', (request, reply) => { reply.send(fastify.getSchemas()) })

fastify.register((instance, opts, done) => {
  instance.addSchema({ $id: 'two', my: 'ciao' })
  // will return `one` and `two` schemas
  instance.get('/sub', (request, reply) => { reply.send(instance.getSchemas()) })

  instance.register((subinstance, opts, done) => {
    subinstance.addSchema({ $id: 'three', my: 'hola' })
    // will return `one`, `two` and `three`
    subinstance.get('/deep', (request, reply) => { reply.send(subinstance.getSchemas()) })
    done()
  })
  done()
})
```


### Validation
The route validation internally relies upon
[Ajv v8](https://www.npmjs.com/package/ajv) which is a high-performance
JSON Schema validator.
Validating the input is very easy: just add the fields that you need
inside the route schema, and you are done!

The supported validations are:
- `body`: validates the body of the request if it is a POST, PUT, or PATCH
  method.
- `querystring` or `query`: validates the query string.
- `params`: validates the route params.
- `headers`: validates the request headers.

All the validations can be a complete JSON Schema object (with a `type` property
of `'object'` and a `'properties'` object containing parameters) or a simpler
variation in which the `type` and `properties` attributes are forgone and the
parameters are listed at the top level (see the example below).

> ℹ If you need to use the latest version of Ajv (v8) you should read how to do
> it in the [`schemaController`](./Server.md#schema-controller) section.

Example:
```js
const bodyJsonSchema = {
  type: 'object',
  required: ['requiredKey'],
  properties: {
    someKey: { type: 'string' },
    someOtherKey: { type: 'number' },
    requiredKey: {
      type: 'array',
      maxItems: 3,
      items: { type: 'integer' }
    },
    nullableKey: { type: ['number', 'null'] }, // or { type: 'number', nullable: true }
    multipleTypesKey: { type: ['boolean', 'number'] },
    multipleRestrictedTypesKey: {
      oneOf: [
        { type: 'string', maxLength: 5 },
        { type: 'number', minimum: 10 }
      ]
    },
    enumKey: {
      type: 'string',
      enum: ['John', 'Foo']
    },
    notTypeKey: {
      not: { type: 'array' }
    }
  }
}

const queryStringJsonSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    excitement: { type: 'integer' }
  }
}

const paramsJsonSchema = {
  type: 'object',
  properties: {
    par1: { type: 'string' },
    par2: { type: 'number' }
  }
}

const headersJsonSchema = {
  type: 'object',
  properties: {
    'x-foo': { type: 'string' }
  },
  required: ['x-foo']
}

const schema = {
  body: bodyJsonSchema,
  querystring: queryStringJsonSchema,
  params: paramsJsonSchema,
  headers: headersJsonSchema
}

fastify.post('/the/url', { schema }, handler)
```

*Note that Ajv will try to [coerce](https://ajv.js.org/coercion.html) the values to
the types specified in your schema `type` keywords, both to pass the validation
and to use the correctly typed data afterwards.*

The Ajv default configuration in Fastify supports coercing array
parameters in `querystring`.
Example:

```js
const opts = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        ids: {
          type: 'array',
          default: []
        },
      },
    }
  }
}

fastify.get('/', opts, (request, reply) => {
  reply.send({ params: request.query }) // echo the querystring
})

fastify.listen({ port: 3000 }, (err) => {
  if (err) throw err
})
```

```sh
curl -X GET "http://localhost:3000/?ids=1

{"params":{"hello":["1"]}}
```

You can also specify a custom schema validator for each parameter type (body,
querystring, params, headers).

For example, the following code disable type coercion only for the `body`
parameters, changing the ajv default options:

```js
const schemaCompilers = {
  body: new Ajv({
    removeAdditional: false,
    coerceTypes: false,
    allErrors: true
  }),
  params: new Ajv({
    removeAdditional: false,
    coerceTypes: true,
    allErrors: true
  }),
  querystring: new Ajv({
    removeAdditional: false,
    coerceTypes: true,
    allErrors: true
  }),
  headers: new Ajv({
    removeAdditional: false,
    coerceTypes: true,
    allErrors: true
  })
}

server.setValidatorCompiler(req => {
    if (!req.httpPart) {
      throw new Error('Missing httpPart')
    }
    const compiler = schemaCompilers[req.httpPart]
    if (!compiler) {
      throw new Error(`Missing compiler for ${req.httpPart}`)
    }
    return compiler.compile(req.schema)
})
```

For further information see [here](https://ajv.js.org/coercion.html)

#### Ajv Plugins
<a id="ajv-plugins"></a>

You can provide a list of plugins you want to use with the default `ajv` instance.
Note that the plugin must be **compatible with the Ajv version shipped within Fastify**.

> Refer to [`ajv options`](./Server.md#ajv) to check plugins format

```js
const fastify = require('fastify')({
  ajv: {
    plugins: [
      require('ajv-merge-patch')
    ]
  }
})

fastify.post('/', {
  handler (req, reply) { reply.send({ ok: 1 }) },
  schema: {
    body: {
      $patch: {
        source: {
          type: 'object',
          properties: {
            q: {
              type: 'string'
            }
          }
        },
        with: [
          {
            op: 'add',
            path: '/properties/q',
            value: { type: 'number' }
          }
        ]
      }
    }
  }
})

fastify.post('/foo', {
  handler (req, reply) { reply.send({ ok: 1 }) },
  schema: {
    body: {
      $merge: {
        source: {
          type: 'object',
          properties: {
            q: {
              type: 'string'
            }
          }
        },
        with: {
          required: ['q']
        }
      }
    }
  }
})
```

#### Validator Compiler
<a id="schema-validator"></a>

The `validatorCompiler` is a function that returns a function that validates the
body, URL  parameters, headers, and query string. The default
`validatorCompiler` returns a function that implements the
[ajv](https://ajv.js.org/) validation interface. Fastify uses it internally to
speed the validation up.

Fastify's [baseline ajv configuration](https://github.com/fastify/ajv-compiler#ajv-configuration) is:

```js
{
  coerceTypes: true, // change data type of data to match type keyword
  useDefaults: true, // replace missing properties and items with the values from corresponding default keyword
  removeAdditional: true, // remove additional properties
  // Explicitly set allErrors to `false`.
  // When set to `true`, a DoS attack is possible.
  allErrors: false
}
```

This baseline configuration can be modified by providing
[`ajv.customOptions`](./Server.md#factory-ajv) to your Fastify factory.

If you want to change or set additional config options, you will need to create
your own instance and override the existing one like:

```js
const fastify = require('fastify')()
const Ajv = require('ajv')
const ajv = new Ajv({
  removeAdditional: 'all',
  useDefaults: true,
  coerceTypes: 'array',
  // any other options
  // ...
})
fastify.setValidatorCompiler(({ schema, method, url, httpPart }) => {
  return ajv.compile(schema)
})
```
_**Note:** If you use a custom instance of any validator (even Ajv), you have to
add schemas to the validator instead of Fastify, since Fastify's default
validator is no longer used, and Fastify's `addSchema` method has no idea what
validator you are using._

##### Using other validation libraries
<a id="using-other-validation-libraries"></a>

The `setValidatorCompiler` function makes it easy to substitute `ajv` with
almost any Javascript validation library ([joi](https://github.com/hapijs/joi/),
[yup](https://github.com/jquense/yup/), ...) or a custom one:

```js
const Joi = require('joi')

fastify.post('/the/url', {
  schema: {
    body: Joi.object().keys({
      hello: Joi.string().required()
    }).required()
  },
  validatorCompiler: ({ schema, method, url, httpPart }) => {
    return data => schema.validate(data)
  }
}, handler)
```

```js
const yup = require('yup')
// Validation options to match ajv's baseline options used in Fastify
const yupOptions = {
  strict: false,
  abortEarly: false, // return all errors
  stripUnknown: true, // remove additional properties
  recursive: true
}

fastify.post('/the/url', {
  schema: {
    body: yup.object({
      age: yup.number().integer().required(),
      sub: yup.object().shape({
        name: yup.string().required()
      }).required()
    })
  },
  validatorCompiler: ({ schema, method, url, httpPart }) => {
    return function (data) {
      // with option strict = false, yup `validateSync` function returns the coerced value if validation was successful, or throws if validation failed
      try {
        const result = schema.validateSync(data, yupOptions)
        return { value: result }
      } catch (e) {
        return { error: e }
      }
    }
  }
}, handler)
```


##### Validation messages with other validation libraries

Fastify's validation error messages are tightly coupled to the default
validation engine: errors returned from `ajv` are eventually run through the
`schemaErrorFormatter` function which is responsible for building human-friendly
error messages. However, the `schemaErrorFormatter` function is written with `ajv`
in mind. As a result, you may run into odd or incomplete error messages when
using other validation libraries.

To circumvent this issue, you have 2 main options :

1. make sure your validation function (returned by your custom `schemaCompiler`)
   returns errors in the same structure and format as `ajv` (although this
   could prove to be difficult and tricky due to differences between validation
   engines)
2. or use a custom `errorHandler` to intercept and format your 'custom'
   validation errors

To help you in writing a custom `errorHandler`, Fastify adds 2 properties to all
validation errors:

* `validation`: the content of the `error` property of the object returned by the
  validation function (returned by your custom `schemaCompiler`)
* `validationContext`: the 'context' (body, params, query, headers) where the
  validation error occurred

A very contrived example of such a custom `errorHandler` handling validation
errors is shown below:

```js
const errorHandler = (error, request, reply) => {
  const statusCode = error.statusCode
  let response

  const { validation, validationContext } = error

  // check if we have a validation error
  if (validation) {
    response = {
      // validationContext will be 'body' or 'params' or 'headers' or 'query'
      message: `A validation error occurred when validating the ${validationContext}...`,
      // this is the result of your validation library...
      errors: validation
    }
  } else {
    response = {
      message: 'An error occurred...'
    }
  }

  // any additional work here, eg. log error
  // ...

  reply.status(statusCode).send(response)
}
```

### Serialization
<a id="serialization"></a>

Usually, you will send your data to the clients as JSON, and Fastify has a
powerful tool to help you,
[fast-json-stringify](https://www.npmjs.com/package/fast-json-stringify), which
is used if you have provided an output schema in the route options. We encourage
you to use an output schema, as it can drastically increase throughput and help
prevent accidental disclosure of sensitive information.

Example:
```js
const schema = {
  response: {
    200: {
      type: 'object',
      properties: {
        value: { type: 'string' },
        otherValue: { type: 'boolean' }
      }
    }
  }
}

fastify.post('/the/url', { schema }, handler)
```

As you can see, the response schema is based on the status code. If you want to
use the same schema for multiple status codes, you can use `'2xx'`, for example:
```js
const schema = {
  response: {
    '2xx': {
      type: 'object',
      properties: {
        value: { type: 'string' },
        otherValue: { type: 'boolean' }
      }
    },
    201: {
      // the contract syntax
      value: { type: 'string' }
    }
  }
}

fastify.post('/the/url', { schema }, handler)
```

#### Serializer Compiler
<a id="schema-serializer"></a>

The `serializerCompiler` is a function that returns a function that must return
a string from an input object. When you define a response JSON Schema, you can
change the default serialization method by providing a function to serialize
every route where you do.

```js
fastify.setSerializerCompiler(({ schema, method, url, httpStatus }) => {
  return data => JSON.stringify(data)
})

fastify.get('/user', {
  handler (req, reply) {
    reply.send({ id: 1, name: 'Foo', image: 'BIG IMAGE' })
  },
  schema: {
    response: {
      '2xx': {
        id: { type: 'number' },
        name: { type: 'string' }
      }
    }
  }
})
```

*If you need a custom serializer in a very specific part of your code, you can
set one with [`reply.serializer(...)`](./Reply.md#serializerfunc).*

### Error Handling
When schema validation fails for a request, Fastify will automatically return a
status 400 response including the result from the validator in the payload. As
an example, if you have the following schema for your route

```js
const schema = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' }
    },
    required: ['name']
  }
}
```

and fail to satisfy it, the route will immediately return a response with the
following payload

```js
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "body should have required property 'name'"
}
```

If you want to handle errors inside the route, you can specify the
`attachValidation` option for your route. If there is a _validation error_, the
`validationError` property of the request will contain the `Error` object with
the raw `validation` result as shown below

```js
const fastify = Fastify()

fastify.post('/', { schema, attachValidation: true }, function (req, reply) {
  if (req.validationError) {
    // `req.validationError.validation` contains the raw validation error
    reply.code(400).send(req.validationError)
  }
})
```

#### `schemaErrorFormatter`

If you want to format errors yourself, you can provide a sync function that must
return an error as the `schemaErrorFormatter` option to Fastify when
instantiating. The context function will be the Fastify server instance.

`errors` is an array of Fastify schema errors `FastifySchemaValidationError`.
`dataVar` is the currently validated part of the schema. (params | body |
querystring | headers).

```js
const fastify = Fastify({
  schemaErrorFormatter: (errors, dataVar) => {
    // ... my formatting logic
    return new Error(myErrorMessage)
  }
})

// or
fastify.setSchemaErrorFormatter(function (errors, dataVar) {
  this.log.error({ err: errors }, 'Validation failed')
  // ... my formatting logic
  return new Error(myErrorMessage)
})
```

You can also use
[setErrorHandler](./Server.md#seterrorhandler) to
define a custom response for validation errors such as

```js
fastify.setErrorHandler(function (error, request, reply) {
  if (error.validation) {
     reply.status(422).send(new Error('validation failed'))
  }
})
```

If you want a custom error response in the schema without headaches, and quickly, take a
look at [`ajv-errors`](https://github.com/epoberezkin/ajv-errors).
Check out the
[example](https://github.com/fastify/example/blob/HEAD/validation-messages/custom-errors-messages.js)
usage.
> Make sure to install version 1.0.1 of `ajv-errors`, because later versions of
> it are not compatible with AJV v6 (the version shipped by Fastify v3).

Below is an example showing how to add **custom error messages for each
property** of a schema by supplying custom AJV options. Inline comments in the
schema below describe how to configure it to show a different error message for
each case:

```js
const fastify = Fastify({
  ajv: {
    customOptions: {
      jsonPointers: true,
      allErrors: true // Warning: Enabling this option may lead to this security issue https://www.cvedetails.com/cve/CVE-2020-8192/
    },
    plugins: [
      require('ajv-errors')
    ]
  }
})

const schema = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        errorMessage: {
          type: 'Bad name'
        }
      },
      age: {
        type: 'number',
        errorMessage: {
          type: 'Bad age', // specify custom message for
          min: 'Too young' // all constraints except required
        }
      }
    },
    required: ['name', 'age'],
    errorMessage: {
      required: {
        name: 'Why no name!', // specify error message for when the
        age: 'Why no age!' // property is missing from input
      }
    }
  }
}

fastify.post('/', { schema, }, (request, reply) => {
  reply.send({
    hello: 'world'
  })
})
```

If you want to return localized error messages, take a look at
[ajv-i18n](https://github.com/epoberezkin/ajv-i18n)

```js
const localize = require('ajv-i18n')

const fastify = Fastify()

const schema = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      age: {
        type: 'number',
      }
    },
    required: ['name', 'age'],
  }
}

fastify.setErrorHandler(function (error, request, reply) {
  if (error.validation) {
    localize.ru(error.validation)
    reply.status(400).send(error.validation)
    return
  }
  reply.send(error)
})
```

### JSON Schema support

JSON Schema provides utilities to optimize your schemas that,
in conjunction with Fastify's shared schema, let you reuse all your schemas
easily.

| Use Case                          | Validator | Serializer |
|-----------------------------------|-----------|------------|
| `$ref` to `$id`                   | ️️✔️ | ✔️ |
| `$ref` to `/definitions`          | ✔️ | ✔️ |
| `$ref` to shared schema `$id`          | ✔️ | ✔️ |
| `$ref` to shared schema `/definitions` | ✔️ | ✔️ |

#### Examples

##### Usage of `$ref` to `$id` in same JSON Schema

```js
const refToId = {
  type: 'object',
  definitions: {
    foo: {
      $id: '#address',
      type: 'object',
      properties: {
        city: { type: 'string' }
      }
    }
  },
  properties: {
    home: { $ref: '#address' },
    work: { $ref: '#address' }
  }
}
```


##### Usage of `$ref` to `/definitions` in same JSON Schema
```js
const refToDefinitions = {
  type: 'object',
  definitions: {
    foo: {
      $id: '#address',
      type: 'object',
      properties: {
        city: { type: 'string' }
      }
    }
  },
  properties: {
    home: { $ref: '#/definitions/foo' },
    work: { $ref: '#/definitions/foo' }
  }
}
```

##### Usage `$ref` to a shared schema `$id` as external schema
```js
fastify.addSchema({
  $id: 'http://foo/common.json',
  type: 'object',
  definitions: {
    foo: {
      $id: '#address',
      type: 'object',
      properties: {
        city: { type: 'string' }
      }
    }
  }
})

const refToSharedSchemaId = {
  type: 'object',
  properties: {
    home: { $ref: 'http://foo/common.json#address' },
    work: { $ref: 'http://foo/common.json#address' }
  }
}
```

##### Usage `$ref` to a shared schema `/definitions` as external schema
```js
fastify.addSchema({
  $id: 'http://foo/shared.json',
  type: 'object',
  definitions: {
    foo: {
      type: 'object',
      properties: {
        city: { type: 'string' }
      }
    }
  }
})

const refToSharedSchemaDefinitions = {
  type: 'object',
  properties: {
    home: { $ref: 'http://foo/shared.json#/definitions/foo' },
    work: { $ref: 'http://foo/shared.json#/definitions/foo' }
  }
}
```

### Resources
<a id="resources"></a>

- [JSON Schema](https://json-schema.org/)
- [Understanding JSON
  Schema](https://spacetelescope.github.io/understanding-json-schema/)
- [fast-json-stringify
  documentation](https://github.com/fastify/fast-json-stringify)
- [Ajv documentation](https://github.com/epoberezkin/ajv/blob/master/README.md)
- [Ajv i18n](https://github.com/epoberezkin/ajv-i18n)
- [Ajv custom errors](https://github.com/epoberezkin/ajv-errors)
- Custom error handling with core methods with error file dumping
  [example](https://github.com/fastify/example/tree/master/validation-messages)