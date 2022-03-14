import { jest, expect, describe, test, beforeEach } from '@jest/globals'

import { config } from '../../../server/config.js'
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

    test.todo(`GET /home - should respond with ${pages.homeHTML} file stream`)

    test.todo(`GET /controller - should respond with ${pages.controllerHTML} file stream`)

    test.todo('GET /file.ext - should respond with a file stream')

    test.todo('GET /unknown - given an inexistent route it should respond with 404')

    describe('exceptios', function () {
      test.todo('given an inexistent file, should respond with 404')

      test.todo('given an error, should respond with 500')
    })
  })
})
