import { jest, expect, describe, test, beforeEach } from '@jest/globals'

import { Service } from '../../../server/service.js'

describe('#Service', function () {
  describe('test suit for service', function () {
    describe('getFileInfo', function () {
      test.todo('should throw if no filename is provided')

      test.todo('should throw if file does not exist')

      test.todo('should file type and file name')
    })

    describe('createFileStream', function () {
      test.todo('should throw if file does not exist')

      test.todo('should return a ReadStream')
    })

    describe('getFileStream', function () {
      test.todo('should throw if file does not exist')

      test.todo('should return a stream and type')
    })
  })
})
