import fs from "fs"
import path from "path"

export const getFiles = (dirPath: string, fileList: string[] = []) => {
  const files = fs.readdirSync(dirPath)
  files.forEach((file) => {
    const filePath = path.join(dirPath, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      getFiles(filePath, fileList)
    } else if (file.endsWith(".js") || file.endsWith(".ts")) {
      fileList.push(filePath)
    }
  })
  return fileList
}
