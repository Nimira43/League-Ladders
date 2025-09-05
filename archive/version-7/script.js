import { divisionsV2 } from './data/teamData-v2.js'
import { divisionRules } from './data/rules.js'
import { colourMap } from './data/colourMap.js'

const normaliseId = name => name.toLowerCase().replace(/ /g, '-')
const normaliseColourKey = str => str?.toLowerCase().replace(/ /g, '_')
const getHex = colour => colourMap[normaliseColourKey(colour)] || colour || '#999'

// const applyStatusClass = (li, position, rules) => {
//   li.classList.remove('promoted', 'playoffs', 'relegated')
//   if (rules.promoted?.includes(position)) li.classList.add('promoted')
//   if (rules.playoffs?.includes(position)) li.classList.add('playoffs')
//   if (rules.relegated?.includes(position)) li.classList.add('relegated')
// }

for (const [division, teams] of Object.entries(divisionsV2)) {
  const ul = document.querySelector(`#${normaliseId(division)}`)?.querySelector('ul')
  if (!ul) continue

  const rules = divisionRules[division] || {}

  teams.forEach((teamObj, index) => {
    const { team, main_colour, support_colour } = teamObj
    const li = document.createElement('li')
    li.textContent = team
    li.draggable = true
    li.style.backgroundColor = getHex(main_colour)
    li.style.color = getHex(support_colour)
    li.style.fontWeight = 'bold'
    
    // applyStatusClass(li, index + 1, rules)

    li.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', team)
      e.dataTransfer.effectAllowed = 'move'
      li.classList.add('dragging')
    })

    li.addEventListener('dragend', () => li.classList.remove('dragging'))

    ul.appendChild(li)
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

  ul.addEventListener('drop', () => {
    const items = [...ul.querySelectorAll('li')]
    items.forEach((li, index) => {
      const teamName = li.textContent
      const teamObj = teams.find(t => t.team === teamName)
      if (!teamObj) return

      li.style.backgroundColor = getHex(teamObj.main_colour)
      li.style.color = getHex(teamObj.support_colour)
      applyStatusClass(li, index + 1, rules)
    })
  })
}
