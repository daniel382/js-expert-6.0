import { jest, expect, describe, test } from '@jest/globals'

import { Controller } from '../../../server/controller.js'
import { Service } from '../../../server/service.js'

describe('#Controller - test suit ', function () {
  describe('getFileStream', function () {
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

    test.todo('shoud return correct stream and type')
  })
})
