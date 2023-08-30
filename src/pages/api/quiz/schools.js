import { promises as fs } from 'fs'
import path from 'path'

export default async function handler(req, res) {
  try {
    // Find the absolute path of the data directory
    const dataDirectory = path.join(process.cwd(), 'src/data')
    // Read the json data file data.json
    const fileContents = await fs.readFile(`${dataDirectory}/schools.json`, 'utf8')
    // Parse the JSON string into an object and extract the schools array
    const data = JSON.parse(fileContents)
    const { schools } = data
    // Return the data object with schools and no error
    res.status(200).json({ data: schools, error: null })
  } catch (error) {
    // Return the error object if there was an error reading or parsing the file
    res.status(500).json({ data: null, error: error.message })
  }
}
