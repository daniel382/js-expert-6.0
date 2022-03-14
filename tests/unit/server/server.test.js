import { jest, expect, describe, test, beforeEach } from '@jest/globals'

import { config } from '../../../server/config.js'
import { Controller } from '../../../server/controller.js'
import { handler } from '../../../server/routes.js'
import { TestUtils } from '../_utils/utils.js'

const { pages, location } = config

describe('#Routes', function () {
  describe('test suit for api response', function () {
    beforeEach(function () {
      jest.resetAllMocks()
      jest.clearAllMocks()
    })

    test('GET / - should redirect to home page', async function () {
      const params = TestUtils.defaultHandleParams()
      params.request.method = 'GET'
      params.request.url = '/'

      await handler(...params.values())

      expect(params.response.writeHead).toBeCalledWith(302, { Location: location.home })
      expect(params.response.end).toBeCalled()
    })

    test(`GET /home - should respond with ${pages.homeHTML} file stream`, async function () {
      const params = TestUtils.defaultHandleParams()
      params.request.method = 'GET'
      params.request.url = '/home'

      const mockFileStream = TestUtils.generateReadableStream(['any data'])

      jest
        .spyOn(Controller.prototype, Controller.prototype.getFileStream.name)
        .mockResolvedValue({ stream: mockFileStream })

      jest
        .spyOn(mockFileStream, 'pipe')
        .mockReturnValue()

      await handler(...params.values())

      expect(Controller.prototype.getFileStream).toBeCalledWith(pages.homeHTML)
      expect(mockFileStream.pipe).toBeCalledWith(params.response)
    })

    test(`GET /controller - should respond with ${pages.controllerHTML} file stream`, async function () {
      const params = TestUtils.defaultHandleParams()
      params.request.method = 'GET'
      params.request.url = '/controller'

      const mockFileStream = TestUtils.generateReadableStream(['any data'])

      jest
        .spyOn(Controller.prototype, 'getFileStream')
        .mockResolvedValue({ stream: mockFileStream })

      jest
        .spyOn(mockFileStream, 'pipe')
        .mockReturnValue()

      await handler(...params.values())

      expect(Controller.prototype.getFileStream).toBeCalledWith(pages.controllerHTML)
      expect(mockFileStream.pipe).toBeCalledWith(params.response)
    })

    test.todo('GET /file.ext - should respond with a file stream')

    test.todo('GET /unknown - given an inexistent route it should respond with 404')

    describe('exceptios', function () {
      test.todo('given an inexistent file, should respond with 404')

      test.todo('given an error, should respond with 500')
    })
  })
})
