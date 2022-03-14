import { server } from './server.js'

server.listen(3000)
  .on('listening', () => console.log(`Server listening on http://localhost:3000`))
