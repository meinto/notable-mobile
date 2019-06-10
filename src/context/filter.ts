import { observable, action } from 'mobx'

class Filter {
  @observable activeNotebook: string = ''

  @action
  setActiveNotebook = (notebook: string) => {
    this.activeNotebook = notebook
  }
}

export const filterContext = new Filter()
