import { jest, expect, describe, test, beforeEach } from '@jest/globals'

import { Controller } from '../../../server/controller.js'
import { Service } from '../../../server/service.js'

describe('#Controller - test suit ', function () {
  describe('getFileStream', function () {
    beforeEach(function () {
      jest.resetAllMocks()
      jest.clearAllMocks()
    })

    test('shoud throw if Service.getFileStream throws', function () {
      const controller = new Controller()

      jest
        .spyOn(Service.prototype, Service.prototype.getFileStream.name)
        .mockImplementation(function () {
          throw new Error('ANY_ERROR')
        })

      const fileStream = controller.getFileStream('any_file')

      expect(fileStream).rejects.toThrow(new Error('ANY_ERROR'))
    })

    test('shoud throw if no file name is provided', function () {
      const controller = new Controller()
      const service = new Service()

      jest
        .spyOn(service, 'getFileStream')
        .mockImplementation(function () {
          throw new Error('NO_FILE_NAME')
        })

      const fileStream = controller.getFileStream()

      expect(fileStream).rejects.toThrow(new Error('NO_FILE_NAME'))
    })

    test('shoud return correct stream and type', async function () {
      const controller = new Controller()
      const service = new Service()

      const mockedStream = {
        write: () => {}
      }

      const expectedFileInfo = {
        stream: mockedStream,
        type: 'any_type'
      }

      jest
        .spyOn(service, 'getFileStream')
        .mockReturnValue(expectedFileInfo)

      const fileStream = await controller.getFileStream('any_file')

      expect(fileStream).toEqual(expectedFileInfo)
    })
  })
})
