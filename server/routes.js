import { config } from './config.js'
import { logger } from './utils.js'
import { Controller } from './controller.js'

const controller = new Controller()
const {
  location,
  pages: {
    homeHTML,
    controllerHTML
  }
} = config

const routes = {
  'GET:/': async function (request, response) {
    response.writeHead(302, { Location: location.home })
    response.end()
  },

  'GET:/home': async function (request, response) {
    const { stream } = await controller.getFileStream(homeHTML)

    // response padrão 'text/html '
    return stream.pipe(response)
  },

  'GET:/controller': async function (request, response) {
    const { stream } = await controller.getFileStream(controllerHTML)

    // response padrão 'text/html '
    return stream.pipe(response)
  }
}

export function handler (request, response) {
  const { method, url } = request
  const httpResource = `${method}:${url}`

  return routes[httpResource](request, response)
    .catch(error => logger.error(`Error: ${error.stack}`))
}
