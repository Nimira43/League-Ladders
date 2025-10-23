import TeamItem from './TeamItem'
import ZoneLine from './ZoneLine'
import { getZoneLabel } from '../lib/utils'

function Ladder({
  divisionName,
  teams,
  rules,
}) {
  return (
    <ul className='ladder'>
      {teams.map((teamObj, index) => {
        const isBreak = rules?.breaks?.includes(index + 1)
        const zoneLabel = getZoneLabel(divisionName, index + 1, rules)

        return (
          <div key={teamObj.team}>
            <TeamItem teamObj={teamObj} /> 
            {isBreak && 
              <ZoneLine label={zoneLabel} />
            }           
          </div>
        )
      })}
    </ul>
  )
}

export default Ladder
