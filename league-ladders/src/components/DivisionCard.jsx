import Ladder from './Ladder' 

function DivisionCard({ 
  divisionName,
  teams,
  rules
}) {
  return (
    <div className='division'>
      <h2 className='logo'>{divisionName}</h2>
      <Ladder
        divisionName={divisionName}
        teams={teams}
        rules={rules}
      />
    </div>
  )
}

export default DivisionCard