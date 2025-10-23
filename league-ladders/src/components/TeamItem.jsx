import { colourMap } from '../data/colourMap'

function TeamItem({ teamObj }) {
  const { team, main_colour, support_colour } = teamObj
  const bg = getHex(main_colour)
  const text = getHex(support_colour)

  return (
    <div>
      Team Item
    </div>
  )
}

export default TeamItem

function getHex(colour) {
  const key = colour?.toLowerCase().replace(/ /g, '_')
  return colourMap[key] || colour || '#999'
}