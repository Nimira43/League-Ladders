import { divisionsV2 } from './data/teamData-v2.js'
import { divisionRules } from './data/rules.js'
import { colourMap } from './data/colourMap.js'

const normaliseId = name => name.toLowerCase().replace(/ /g, '-')
const normaliseColourKey = str => str?.toLowerCase().replace(/ /g, '_')
const getHex = colour => colourMap[normaliseColourKey(colour)] || colour || '#999'

const getZoneLabel = (division, index) => {
  const rules = divisionRules[division] || {}
  if (rules.promoted?.includes(index)) return 'Promoted'
  if (rules.playoffs?.includes(index)) return 'Playoffs'
  if (rules.relegated?.includes(index)) return 'Relegated'
  return null
}

function renderLadder(division) {
  const ul = document.querySelector(`#${normaliseId(division)} ul`)
  if (!ul) return

  const teams = divisionsV2[division]
  const rules = divisionRules[division] || {}
  const breaks = rules.breaks || []

  ul.innerHTML = ''

  teams.forEach((teamObj, index) => {
    const { team, main_colour, support_colour } = teamObj

    const li = document.createElement('li')
    li.textContent = team
    li.draggable = true
    li.style.backgroundColor = getHex(main_colour)
    li.style.color = getHex(support_colour)
    li.style.fontWeight = 'bold'

    li.addEventListener('dragstart', e => {
      e.dataTransfer.setData('team', team)
      e.dataTransfer.setData('originDivision', division)
      e.dataTransfer.effectAllowed = 'move'
      li.classList.add('dragging')
    })

    li.addEventListener('dragend', () => li.classList.remove('dragging'))
    ul.appendChild(li)

    if (breaks.includes(index + 1)) {
      const line = document.createElement('div')
      line.className = 'zone-line'

      const label = document.createElement('span')
      label.className = 'zone-label'
      label.textContent = getZoneLabel(division, index + 1) || ''
      line.appendChild(label)

      ul.appendChild(line)
    }
  })

  ul.addEventListener('dragover', e => {
    e.preventDefault()
    const dragging = document.querySelector('.dragging')
    const afterElement = [...ul.querySelectorAll('li')].find(el => {
      const box = el.getBoundingClientRect()
      return e.clientY < box.top + box.height / 2
    })
    if (afterElement) {
      ul.insertBefore(dragging, afterElement)
    } else {
      ul.appendChild(dragging)
    }
  })

  ul.addEventListener('drop', e => {
    const teamName = e.dataTransfer.getData('team')
    const originDivision = e.dataTransfer.getData('originDivision')
    if (!teamName || !originDivision) return

    const originTeams = divisionsV2[originDivision]
    const teamObj = originTeams.find(t => t.team === teamName)
    if (!teamObj) return

    divisionsV2[originDivision] = originTeams.filter(t => t.team !== teamName)

    const targetTeams = divisionsV2[division]
    const items = [...ul.querySelectorAll('li')]
    const newOrder = items.filter(el => el.tagName === 'LI').map(li => li.textContent)

    const updatedTeams = newOrder.map(name => {
      return name === teamName ? teamObj : targetTeams.find(t => t.team === name)
    })

    divisionsV2[division] = updatedTeams

    renderLadder(originDivision)
    renderLadder(division)
  })
}

Object.keys(divisionsV2).forEach(renderLadder)
