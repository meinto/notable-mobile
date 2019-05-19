import fs from 'react-native-fs'

export const rootDirPath = (): string => {
  return fs.DocumentDirectoryPath
}
 
export const parentPath = (path: string): string => {
  return path
    .split('/')
    .slice(0, -1)
    .join('/')
}

export const fetchDirPaths = (path: string): Promise<string[]> => {
  return fs.readDir(path)
    .then((result) => {
      return result
        .filter(r => r.isDirectory())
        .map(folder => folder.path)
    })
}

export const mkdir = (path: string): void => {
  fs.mkdir(path)
}