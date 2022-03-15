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

      test('should throw if no file name is provided', function () {
        const service = new Service()

        jest
          .spyOn(fs, 'createReadStream')
          .mockReturnValue(new Error('argument must be of type string'))

        const fileInfo = service.createFileStream()

        expect(fileInfo).toEqual(new Error('argument must be of type string'))
      })

      test('should return a ReadStream', function () {
        const service = new Service()
        const expectedStream = {
          write: () => {}
        }

        jest
          .spyOn(fs, 'createReadStream')
          .mockReturnValue(expectedStream)

        const fileInfo = service.createFileStream()

        expect(fileInfo).toEqual(expectedStream)
      })
    })

    describe('getFileStream', function () {
      test('should throw if getFileInfo throws', function () {
        const service = new Service()

        jest
          .spyOn(service, 'getFileInfo')
          .mockImplementation(function () {
            throw new Error ('ANY_ERROR')
          })

        const fileInfo = service.getFileStream()

        expect(fileInfo).rejects.toThrow(new Error('ANY_ERROR'))
      })

      test('should throw if createFileStream throws', function () {
        const service = new Service()

        jest
          .spyOn(service, 'createFileStream')
          .mockImplementation(function () {
            throw new Error ('ANY_ERROR')
          })

        const fileInfo = service.getFileStream()

        expect(fileInfo).rejects.toThrow(new Error('ANY_ERROR'))
      })

      test.todo('should return a stream and type')
    })
  })
})
