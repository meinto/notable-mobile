import { observable, action } from 'mobx'

class Filter {
  @observable activeNotebook: string = ''

  @action
  setActiveNotebook = (notebook: string) => {
    this.activeNotebook = notebook
  }

  @action
  resetActiveNotebook = () => {
    this.activeNotebook = ''
  }
}

export const filterContext = new Filter()
