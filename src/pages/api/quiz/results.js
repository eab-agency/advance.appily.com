import { promises as fs } from 'fs'
import path from 'path'

export default async function handler(req, res) {
  // Find the absolute path of the data directory
  const dataDirectory = path.join(process.cwd(), 'src/data')
  // Read the json data file data.json
  const fileContents = await fs.readFile(`${dataDirectory}/results.json`, 'utf8')
  // Parse the JSON string into an object and extract the questions array
  const data = JSON.parse(fileContents)
  const { results } = data

  // Get the value to filter by from the query parameter
  const filterValue = req.query.result
  // Filter the results array to only include the result with the specified value
  const filteredResults = results.filter(
    result => result.title.toLowerCase() === filterValue.toLowerCase()
  )
  // Return the filtered results array in json format
  res.status(200).json(filteredResults[0])
}
