import { jest, expect, describe, test, beforeEach } from '@jest/globals'

import fs from 'fs'
import path from 'path'
import fsPromise from 'fs/promises'

import { Service } from '../../../server/service.js'

describe('#Service', function () {
  describe('test suit for service', function () {
    describe('getFileInfo', function () {
      test('should throw if no filename is provided', function () {
        const service = new Service()
        const fileInfo = service.getFileInfo()

        expect(fileInfo).rejects.toThrow({
          message: 'The "path" argument must be of type string. Received undefined'
        })
      })

      test('should throw if file does not exist', function () {
        const service = new Service()

        jest
          .spyOn(fsPromise, 'access')
          .mockRejectedValue(new Error('ENOENT'))

        const fileInfo = service.getFileInfo('not_existent')

        expect(fileInfo).rejects.toThrow(new Error('ENOENT'))
      })

      test('should file type and file name', async function () {
        const service = new Service()

        jest
          .spyOn(path, 'join')
          .mockReturnValue('/full/file/path.ext')

        jest
          .spyOn(fsPromise, 'access')
          .mockResolvedValue(true)

        jest
          .spyOn(path, 'extname')
          .mockReturnValue('.ext')

        const fileInfo = await service.getFileInfo('/file/path.ext')

        expect(fileInfo).toEqual({ type: '.ext', name: '/full/file/path.ext' })
      })
    })

    describe('createFileStream', function () {
      test('should throw if file does not exist', function () {
        const service = new Service()

        jest
          .spyOn(fs, 'createReadStream')
          .mockReturnValue(new Error('ENOENT'))

        const fileInfo = service.createFileStream('not_existent')

        expect(fileInfo).toEqual(new Error('ENOENT'))
      })

      test.todo('should return a ReadStream')
    })

    describe('getFileStream', function () {
      test.todo('should throw if file does not exist')

      test.todo('should return a stream and type')
    })
  })
})
