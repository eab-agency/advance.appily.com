// import { useUser } from '../../context/context'
// import { allStates } from '../../helpers/getMatchedSchool'

// const LocationInDevMode = () => {
//   const { location, setLocation } = useUser()

//   const setInputLocation = (selectedLocation: string) => {
//     setLocation(prevLocation => ({
//       ...prevLocation,
//       region_iso_code: selectedLocation,
//       country_code: prevLocation?.country_code ?? '',
//       notUS: prevLocation?.notUS ?? false,
//     }))
//   }
//   // only return if in dev mode
//   if (process.env.NODE_ENV !== 'development') {
//     return null
//   }

//   const styles = {
//     position: 'fixed',
//     top: '0',
//     left: '0',
//     zIndex: '9999',
//     backgroundColor: 'white',
//     padding: '1rem',
//   } as React.CSSProperties

//   return (
//     <div style={styles}>
//       {location ? <p>Location: {location.region_iso_code}</p> : <p>Location: loading...</p>}
//       <label htmlFor="location">Change Location:</label>
//       <select id="location" onChange={e => setInputLocation(e.target.value)}>
//         {allStates.map(state => (
//           <option key={state} value={state}>
//             {state}
//           </option>
//         ))}
//       </select>
//     </div>
//   )
// }

// export default LocationInDevMode
