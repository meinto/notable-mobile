import fs from 'react-native-fs'

export class File {

  static create = (filePath: string) => {
    fs.writeFile(filePath, '', 'utf8')
      .catch((e) => {
        console.warn(e)
      })
  }

  path: string
  content: string = ''

  constructor(path: string) {
    this.path = path
    this.loadContent()
  }

  getPath = (): string => {
    return this.path
  }

  getName = (): string => {
    return this.path.split('/').pop() || 'undefined'
  }

  getContent = () => {
    return this.content
  }

  loadContent = () => {
    return fs.readFile(this.path, 'utf8')
      .then((content: string) => {
        this.content = content
        return content
      })
  }

  updateContent = (content: string) => {
    this.content = content
  }

  saveChanges = () => {
    fs.writeFile(this.path, this.content, 'utf8')
  }

}
