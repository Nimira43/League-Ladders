import { divisions } from './data/teamData.js'
import { divisionRules } from './data/rules.js'
import { divisionsV2 } from './data/teamData-v2.js'

console.log(divisionsV2)

for (const [division, teams] of Object.entries(divisions)) {
  const ul = document.querySelector(`
    #${division.toLowerCase().replace(/ /g, '-')}
  `)?.querySelector('ul')
    
  if (!ul) continue
  const rules = divisionRules[division] || {}

  teams.forEach((team, index) => {
    const li = document.createElement('li')
    li.textContent = team
    li.draggable = true

    const position = index + 1

    if (rules.promoted?.includes(position)) {
      li.classList.add('promoted')
    }
    if (rules.playoffs?.includes(position)) {
      li.classList.add('playoffs')
    }
    if (rules.relegated?.includes(position)) {
      li.classList.add('relegated')
    }
    
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
      const position = index + 1
      li.classList.remove('promoted', 'playoffs', 'relegated')

      if (rules.promoted?.includes(position)) {
        li.classList.add('promoted')
      }
      if (rules.playoffs?.includes(position)) {
        li.classList.add('playoffs')
      }
      if (rules.relegated?.includes(position)) {
        li.classList.add('relegated')
      }
    })
  })
}
