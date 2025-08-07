import fs from 'fs'
import path from 'path'

const letterOpenerDir = path.join(process.cwd(), 'tmp', 'letter_opener')

const getFiveLatestEmailsFromLetterOpener = () => {
  if (!fs.existsSync(letterOpenerDir)) {
    throw new Error('tmp/letter_opener directory not found')
  }

  // Get all subdirectories (each email gets its own directory)
  const emailDirs = fs
    .readdirSync(letterOpenerDir)
    .filter(item => fs.statSync(path.join(letterOpenerDir, item)).isDirectory())
    .sort((a, b) => {
      // Sort by creation time (newest first)
      const aStat = fs.statSync(path.join(letterOpenerDir, a))
      const bStat = fs.statSync(path.join(letterOpenerDir, b))
      return bStat.birthtime.getTime() - aStat.birthtime.getTime()
    })

  return emailDirs.slice(0, 5)
}

export const searchEmailForString = async regex => {
  const emailDirs = getFiveLatestEmailsFromLetterOpener()

  for (const emailDir of emailDirs) {
    const richHtmlPath = path.join(letterOpenerDir, emailDir, 'rich.html')

    if (fs.existsSync(richHtmlPath)) {
      const emailContent = fs.readFileSync(richHtmlPath, 'utf8')

      const contentMatch = emailContent.match(new RegExp(regex))

      if (contentMatch) {
        return contentMatch[1]
      }
    }
  }

  return null
}
