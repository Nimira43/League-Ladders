import divisions from '../data/teamData'
import DivisionCard from './DivisionCard'
import { divisionRules } from '../data/rules'

function DivisionGrid() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
      {Object
        .entries(divisions)
        .map(
          ([divisionName, teams]) => (
            <DivisionCard 
              key={divisionName}
              divisionName={divisionName}
              teams={teams}
              rules={divisionRules[divisionName] || {}}
            />
          ))  
      }
    </div>
  )
}

export default DivisionGrid
