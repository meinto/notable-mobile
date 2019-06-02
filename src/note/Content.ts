
export class Content {
  raw: string

  constructor(contentString: string) {
    this.raw = contentString
  }

  toString = () => {
    return this.raw
  }

  update = (value: string) => {
    this.raw = value
  }

}
