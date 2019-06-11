
export class Notebook {
  path: string
  children: Notebook[] = []

  static getLinkedRootNotebook = (notebookPaths: string[]): Notebook => {
    const root = new Notebook('Notebooks')
    notebookPaths.forEach((path) => {
      const notebook = new Notebook(path)
      const parents = notebook.getParents()
      parents.forEach((parentNotebook) => {
        root.link(parentNotebook)
      })
    })
    return root
  }

  constructor(path: string) {
    this.path = path
  }

  getName = (): string => {
    const parts = this.path.split('/')
    return parts[parts.length - 1]
  }
  getPath = (): string => this.path
  hasParent = (): boolean => this.path.split('/').length > 0
  getParent = (): Notebook => {
    let parts = this.path.split('/')
    parts = parts.reverse()
    parts.shift()
    parts.reverse()
    return new Notebook(parts.join('/'))
  }
  getParents = (): Notebook[] => {
    const parts = this.path.split('/')
    const notebooks: Notebook[] = []
    const parents: string[] = []
    parts.forEach((part) => {
      parents.push(part)
      notebooks.push(new Notebook(parents.join('/')))
    })
    return notebooks
  }
  getChildren = (): Notebook[] => this.children
  hasChildren = (): boolean => this.children.length > 0

  link = (notebook: Notebook) => {
    if (notebook.getParent().getPath() === this.getPath()) {
      const alreadyAdded = this.children
        .filter((child: Notebook) => child.getPath() === notebook.getPath())
        .length > 0
      if (!alreadyAdded) {
        this.children.push(notebook)
      }
    } else {
      this.children.forEach((child: Notebook) => {
        child.link(notebook)
      })
    }
  }
}
