import fs from 'react-native-fs'
import { Header } from '../note/Header'

export class File {

  static create = (filePath: string) => {
    return new File(filePath).saveChanges()
  }

  path: string
  header: Header = new Header()
  content: string = ''

  constructor(path: string = '') {
    this.path = path
    this.header.setTitleIfEmpty(this.getName())
  }

  getPath = (): string => {
    return this.path
  }

  getName = (): string => {
    const fullFileName = this.path.split('/').pop() || ''
    return fullFileName.replace('.md', '') || 'undefined'
  }

  getContent = () => {
    return this.content
  }

  loadContent = () => {
    return fs.readFile(this.path, 'utf8')
      .then((content: string) => {
        const parts = content.split('---')
        this.header = new Header(parts[1])
        parts.shift()
        parts.shift()
        this.content = parts
          .join('---')
          .trim()
        return this.content
      })
  }

  updateContent = (content: string) => {
    this.content = content
    this.header.updateModified()
  }

  saveChanges = () => {
    let string = '---\n'
    string += `${this.header.toString()}\n`
    string += '---\n'
    string += '\n'
    string += this.content
    return fs.writeFile(this.path, string, 'utf8')
  }

}
