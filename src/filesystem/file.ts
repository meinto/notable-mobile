import fs from 'react-native-fs'
import { Note } from '../note/Note'

export const createFile = (filePath: string) => {
  const emptyNote = new Note('', filePath)
  emptyNote.header.setTitle(emptyNote.getFileName())
  return saveNote(filePath, emptyNote.toString())
}

export const getNote = (filePath: string) => {
  return fs.readFile(filePath, 'utf8')
}

export const saveNote = (filePath: string, content: string) => {
  return fs.writeFile(filePath, content, 'utf8')
}
