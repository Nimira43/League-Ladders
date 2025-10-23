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

function getZoneLabel() {}