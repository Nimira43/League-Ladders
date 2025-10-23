import TeamItem from './TeamItem'
import ZoneLine from './ZoneLine'

function Ladder({
  divisionName,
  teams,
  rules,
}) {
  return (
    <ul className='ladder'>
      {teams.map((teamObj, index) => {
        const isBreak = rules?.breaks?.includes(index + 1)
        const zoneLabel = getZoneLabel(divisionName, index + 1)
      })}

    </ul>
  )
}

export default Ladder