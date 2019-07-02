import { observable, action } from 'mobx'
import AsyncStorage from '@react-native-community/async-storage'
import { Directory } from '../filesystem/directory'
import { Note } from '../note/Note'
import { Notebook } from '../note/Notebook'

class DirectoryContext {

  static DB_DIR_KEY: string = '@notable_dir'

  @observable dir: Directory = new Directory('')
  @observable dirPath: string = ''
  @observable noteList: Note[] = []
  @observable initialized: boolean = false

  constructor() {
    AsyncStorage.getItem(DirectoryContext.DB_DIR_KEY)
      .then((dirPath) => {
        if (dirPath !== null) {
          this.updateDir(dirPath)
        } else {
          this.initialize()
        }
      })
      .catch((e) => {
        this.initialize()
      })
  }

  @action
  setDir = (dirPath: string, success: Function) => {
    AsyncStorage.setItem(DirectoryContext.DB_DIR_KEY, dirPath)
      .then(() => {
        this.updateDir(dirPath)
        success()
      })
      .catch((e) => {
        console.warn(e)
      })
  }

  initialize = () => {
    this.initialized = true
  }

  updateDir = (dirPath: string) => {
    this.dirPath = dirPath,
    this.dir = new Directory(dirPath),
    this.initialized = true
    this.updateNoteList()
  }

  @action
  updateNoteList = () => {
    this.dir.getNoteList()
      .then((noteList: Note[]) => {
        this.noteList = noteList
      })
  }

  getNoteList = (activeNotebook: string): Note[] => {
    if (activeNotebook.length > 0) {
      return this.noteList.filter(note => note.header.isPartOfNotebook(activeNotebook))
    }
    return this.noteList
  }

  getLinkedRootNotebook = (): Notebook => {
    const notbookStrings = this.noteList.reduce((prev: string[], note: Note) => {
      return [...prev, ...note.header.getTags()].filter((n: string) => n)
    },                                          [])
    return Notebook.getLinkedRootNotebook(notbookStrings)
  }
}

export const directoryContext = new DirectoryContext()
