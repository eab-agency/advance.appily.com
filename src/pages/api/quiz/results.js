import { promises as fs } from 'fs'
import path from 'path'

export default async function handler(req, res) {
  try {
    const dataDirectory = path.resolve(process.cwd(), 'src/data')
    const filePath = path.join(dataDirectory, 'results.json')

    const fileContents = await fs.readFile(filePath, 'utf8')
    const data = JSON.parse(fileContents)
    const { results } = data

    const filterValue = req.query.result
    const filteredResults = results.filter(
      result => result.title.toLowerCase() === filterValue.toLowerCase()
    )

    res.status(200).json(filteredResults[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
