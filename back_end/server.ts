import createServer from './app';

const PORT = process.env.PORT || 8080;
const server = createServer();
// Run the server!

if (require.main === module) {
  server.listen(+PORT, "0.0.0.0", (err, address) => {
    if (err) throw err
    console.log(`server listening on ${address}`)
  })
} else {
  module.exports = server;
}
