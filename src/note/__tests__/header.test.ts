import { Header } from '../Header'
const fs = require('fs')

// const mockFileContent = fs.readFileSync(`${__dirname}/../../../note/__mocks__/note.md`, 'utf8')
// const mockFileContent = fs.readFileSync(
//   path.join(__dirname, '..', '..', 'note', '__mocks__', 'note.md'),
//   'utf8',
// )

describe('Header', () => {

  // const parts = mockFileContent.split('---')
  // const header = parts[1].trim()
  // const content = [parts[2], parts[3]].join('---').trim()
  // const headerFields = {
  //   title: 'Test File',
  //   tags: ['Notebooks/Test/Bla Blub', 'Notebooks/Test/Bla Blub2'],
  //   created: "'2019-04-14T15:29:58.877Z'",
  //   modified: "'2019-04-14T16:51:51.674Z'",
  // }

  const validateDateFormat = (dateString: string) => {
    const dateFormat = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}Z/
    expect(dateFormat.test(dateString)).toBe(true)
  }

  it('sets title and update modified date', () => {
    const header = new Header('')
    const modifiedDate = header.getModified()
    setTimeout(() => {
      header.setTitle('mock')
      expect(header.getTitle()).toEqual('mock')
      expect(modifiedDate).not.toEqual(header.getModified())
      validateDateFormat(header.getModified())
    })
  })

  it('adds a new tag and update modified date', () => {
    const header = new Header('')
    const modifiedDate = header.getModified()
    setTimeout(() => {
      header.addTag('custom-tag')
      expect(header.getTags()).toEqual(['custom-tag'])
      expect(modifiedDate).not.toEqual(header.getModified())
      validateDateFormat(header.getModified())
    })
  })

  it('sets created and modified date on initialize', () => {
    const header = new Header('')
    validateDateFormat(header.getCreated())
    validateDateFormat(header.getModified())
  })
})
