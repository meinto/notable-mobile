
export class Header {

  raw: string

  fields: {
    [key: string]: any,
    title: string,
    tags: string[],
    created: string,
    modified: string,
  } = {
    title: 'Undefined',
    tags: [
      'Notebooks/test1/bla bla/huiii',
      'Notebooks/brum/bär/blub',
      'Notebooks/test1/bla bla/ffff'],
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
  }

  constructor(header: string = '') {
    this.raw = header.trim()
    if (this.raw.length > 0) {
      this.extract()
    }
  }

  toString = (): string => {
    const lines: string[] = []
    Object.keys(this.fields).forEach((key) => {
      const value = this.fields[key]
      let s = `${key}: `
      if (Array.isArray(value)) {
        s += this.arrayToString(value)
      } else {
        s += `${value}`
      }
      lines.push(s)
    })
    return lines.join('\n')
  }
  getFields = () => this.fields
  getTitle = (): string => this.fields.title
  getTags = (): string[] => this.fields.tags
  getCreated = (): string => this.fields.created
  getModified = (): string => this.fields.modified

  isPartOfNotebook = (notebook: string) => {
    let isPart = false
    this.getTags().forEach((tag) => {
      if (tag.indexOf(notebook) !== -1) {
        isPart = true
      }
    })
    return isPart
  }

  setTitle = (title: string) => {
    this.fields.title = title
    this.updateModified()
  }

  setTitleIfEmpty = (title: string) => {
    if (this.fields.title.length === 0) {
      this.setTitle(title)
    }
  }

  addTag = (tag: string) => {
    this.fields.tags.push(tag)
    this.updateModified()
  }

  updateModified = () => {
    this.fields.modified = new Date().toISOString()
  }

  extract = () => {
    const lines = this.raw.split('\n')
    lines.forEach((line) => {
      if (line.trim().length > 0) {
        this.extractFields(line)
      }
    })
  }

  extractFields = (line: string) => {
    const parts = line.split(': ')
    const key = parts[0].trim()
    const value = parts[1].trim()

    this.fields[key] = this.processValue(key, value)
  }

  processValue = (key: string, value: string) => {
    let normalizedValue = value
    normalizedValue = this.removeComma(normalizedValue)
    normalizedValue = this.removeQuotationMarks(key, normalizedValue)
    const possibleArray = this.convertArray(normalizedValue)
    return possibleArray
  }

  removeComma = (value: string) => {
    return value.replace(/,$/, '')
  }

  removeQuotationMarks = (key: string, value: string) => {
    return key !== 'created' && key !== 'modified'
      ? value
        .replace(/'$/, '')
        .replace(/^'/, '')
      : value
  }

  convertArray = (value: string) => {
    const firstChar = value[0]
    const lastChar = value[value.length - 1]
    if (firstChar === '[' && lastChar === ']') {
      const v = value
        .replace(/\]$/, '')
        .replace(/^\[/, '')
      return v.split(',').map(v => v.trim())
    }
    return value
  }

  arrayToString = (arr: string[]) => {
    return `[${arr.join(', ')}]`
  }

}
