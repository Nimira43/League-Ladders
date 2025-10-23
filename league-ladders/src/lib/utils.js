import { colourMap } from '../data/colourMap'

export function getHex(colour) {
  const key = colour?.toLowerCase().replace(/ /g, '_')
  return colourMap[key] || colour || '#999'
}

export function getZoneLabel(division, index, rules) {
  if (rules.promoted?.includes(index)) return 'Promoted'
  if (rules.playoffs?.includes(index)) return 'Playoffs'
  if (rules.relegated?.includes(index)) return 'Relegated'
  return null
}
