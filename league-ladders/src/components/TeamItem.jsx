import { getHex } from '../lib/utils'

function TeamItem({ teamObj }) {
  const { team, main_colour, support_colour } = teamObj
  const bg = getHex(main_colour)
  const text = getHex(support_colour)

  return (
    <li
      className='ladder-item'
      style={{
        backgroundColor: bg,
        color: text,
      }}
      draggable
    >
      {team}
    </li>
  )
}

export default TeamItem


