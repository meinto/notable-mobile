import { Header } from './Header'
import { Content } from './Content'

export class Note {

  filePath: string
  header: Header
  content: Content

  constructor(fileContent: string = '', filePath: string) {
    this.filePath = filePath
    const parts = fileContent.split('---')
    const headerString = parts[1] || ''
    this.header = new Header(headerString)
    parts.shift()
    parts.shift()
    const contentString = parts
      .join('---')
      .trim()
    this.content = new Content(contentString)
  }

  toString = () => {
    let rawNote = '---\n'
    rawNote += `${this.header.toString()}\n`
    rawNote += '---\n'
    rawNote += '\n'
    rawNote += this.content.toString()
    console.log(rawNote)
    return rawNote
  }

  getFilePath = () => {
    return this.filePath
  }

  getFileName = () => {
    const fullFileName = this.filePath.split('/').pop() || ''
    return fullFileName.replace('.md', '') || 'undefined'
  }
}
