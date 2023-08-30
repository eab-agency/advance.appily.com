import { promises as fs } from 'fs'
import path from 'path'

export default async function handler(req, res) {
  // Find the absolute path of the data directory
  const dataDirectory = path.join(process.cwd(), 'src/data')
  // Read the json data file data.json
  const fileContents = await fs.readFile(`${dataDirectory}/quiz.json`, 'utf8')
  // Parse the JSON string into an object and extract the questions array
  const data = JSON.parse(fileContents)
  const { questions } = data
  // Return the questions array in json format
  res.status(200).json(questions)
}
