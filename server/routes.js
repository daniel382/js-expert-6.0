import { config } from './config.js'
import { logger } from './utils.js'
import { Controller } from './controller.js'

const controller = new Controller()
const {
  location,
  pages: {
    homeHTML,
    controllerHTML
  },
  constants
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
  },

  'GET:/assets': async function (request, response) {
    const { url: filepath } = request
    const { stream, type } = await controller.getFileStream(filepath)

    response.writeHead(200, { 'Content-Type': constants.CONTENT_TYPE[type] })

    return stream.pipe(response)
  },
}

function handleError (error, response) {
  if (error.message.includes('ENOENT')) {
    logger.warn(`asset not found ${error.stack}`)
    response.writeHead(404)
    return response.end()
  }

  logger.error(`caught error on API ${error.stack}`)
  response.writeHead(500)
  return response.end()
}

export function handler (request, response) {
  const { method, url } = request
  const httpResource = `${method}:${url}`

  if (routes[httpResource]) {
    return routes[httpResource](request, response)
      .catch(error => handleError(error, response))
  }

  return routes['GET:/assets'](request, response)
    .catch(error => handleError(error, response))
}
