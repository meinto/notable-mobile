import { File } from '../File'
import { Header } from '../../note/Header'
const fs = require('fs')
const path = require('path')

const mockFileContent = fs.readFileSync(
  path.join(__dirname, '..', '..', 'note', '__mocks__', 'note.md'),
  'utf8',
)

jest.mock('react-native-fs', () => ({
  readFile: jest.fn(() => Promise.resolve(mockFileContent)),
}))

describe('file classes', () => {

  const parts = mockFileContent.split('---')
  const header = parts[1].trim()
  const content = [parts[2], parts[3]].join('---').trim()
  const headerFields = {
    title: 'Test File',
    tags: ['Notebooks/Test/Bla Blub', 'Notebooks/Test/Bla Blub2'],
    created: "'2019-04-14T15:29:58.877Z'",
    modified: "'2019-04-14T16:51:51.674Z'",
  }

  describe('File', () => {

    const mockPath = 'mock-path'

    describe('header', () => {
      it('stores header', async() => {
        const file = new File(mockPath)
        await file.loadContent()
        expect(file.header.toString()).toEqual(header)
      })

      it('stores header fields', async() => {
        const file = new File(mockPath)
        await file.loadContent()
        expect(file.header.getFields()).toEqual(headerFields)
      })
    })

    it('stores content', async() => {
      const file = new File(mockPath)
      await file.loadContent()
      expect(file.content).toEqual(content)
    })

  })

})
