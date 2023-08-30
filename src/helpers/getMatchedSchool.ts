
const regionMatching: RegionMatching = {
  northeast: ['ME', 'VT', 'NH', 'MA', 'RI', 'CT', 'NY', 'NJ', 'PA', 'MD', 'DE'],
  midwest: ['OH', 'MI', 'IN', 'IL', 'WI', 'MN', 'IA', 'MO', 'NE', 'KS'],
  southwest: ['NM', 'AZ', 'NV', 'WY'],
  pacific: ['CA', 'OR', 'WA', 'AK', 'HI'],
  mountain: ['MT', 'ID', 'ND', 'SD', 'CO', 'UT'],
  southeast: ['VA', 'NC', 'SC', 'GA', 'FL'],
  southcentral: ['WV', 'KY', 'TN', 'AL', 'MS', 'AR', 'LA', 'OK', 'TX'],
}
type RegionMatching = {
  [key: string]: string[]
}

type School = {
  title: string
  subTitle: string
  description: string
  link: string
  linkText: string
  imageURL: string
  logoUrl: string
  buttonText: string
  schoolMeta: {
    city: string
    state: string
  }
  region: string
}

// get all states from regionMatching, alphabetize and export const
export const allStates: string[] = Object.values(regionMatching)
  .flat()
  .sort((a, b) => a.localeCompare(b))

// function that checks region_iso_code and returns a school if matched from .schools.associatedStates otherwise returns the first school from schools
export const getMatchedSchool = async (state?: string): Promise<School[]> => {
  const response = await fetch('/api/quiz/schools')
  const { data: schools, error }: { data: School[]; error?: string } = await response.json()

  // if there is an error or no schools, return null
  if (error || !schools) {
    return []
  }

  if (!state) {
    // Return 5 random schools as the default list
    return shuffleArray(schools).slice(0, 5)
  } else {
    // Find the region associated with the given state
    const region = Object.keys(regionMatching).find(r => regionMatching[r].includes(state))

    // Filter schools by region. the purpose of the school.region === 'US' condition is to include all schools if no region is found for the given state
    const matchedSchools = shuffleArray(
      schools.filter(school => school.region === region || school.region === 'US')
    )

    // If there are less than 5 matched schools, add additional non-matched schools
    if (matchedSchools.length < 5) {
      const nonMatchedSchools = schools.filter(
        school => school.region !== region && school.region !== 'US'
      )

      const additionalSchools = shuffleArray(nonMatchedSchools).slice(0, 5 - matchedSchools.length)

      return [...matchedSchools, ...additionalSchools]
    }

    return matchedSchools
  }

  // Return an empty array if schools is not defined
  return []
}

// Function to shuffle an array using Fisher-Yates algorithm
const shuffleArray = <T>(array: T[]): T[] => {
  const newArr = [...array]
  for (let i = newArr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArr[i], newArr[j]] = [newArr[j], newArr[i]]
  }
  return newArr
}
