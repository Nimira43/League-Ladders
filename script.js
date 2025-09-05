import { divisionsV2 } from './data/teamData-v2.js' 
import { divisionRules } from './data/rules.js' 
import { colourMap } from './data/colourMap.js' 

const normaliseId = name => name.toLowerCase().replace(/ /g, '-') 
const normaliseColourKey = str => str?.toLowerCase().replace(/ /g, '_') 
const getHex = colour => colourMap[normaliseColourKey(colour)] || colour || '#999' 

for (const [division, teams] of Object.entries(divisionsV2)) {
  const ul = document.querySelector(`#${normaliseId(division)}`)?.querySelector('ul') 
  if (!ul) continue 

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
      e.dataTransfer.setData('text/plain', team) 
      e.dataTransfer.effectAllowed = 'move' 
      li.classList.add('dragging') 
    }) 

    li.addEventListener('dragend', () => li.classList.remove('dragging')) 
    ul.appendChild(li) 

    if (breaks.includes(index + 1)) {
      const line = document.createElement('div') 
      line.className = 'zone-line' 
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

  ul.addEventListener('drop', () => {
    const items = [...ul.querySelectorAll('li')] 
    const newOrder = items.filter(el => el.tagName === 'LI').map(li => li.textContent) 

    const updatedTeams = newOrder.map(name => teams.find(t => t.team === name)) 
    divisionsV2[division] = updatedTeams 

    ul.innerHTML = '' 
    updatedTeams.forEach((teamObj, index) => {
      const { team, main_colour, support_colour } = teamObj 

      const li = document.createElement('li') 
      li.textContent = team 
      li.draggable = true 
      li.style.backgroundColor = getHex(main_colour) 
      li.style.color = getHex(support_colour) 
      li.style.fontWeight = 'bold' 

      li.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', team) 
        e.dataTransfer.effectAllowed = 'move' 
        li.classList.add('dragging') 
      }) 

      li.addEventListener('dragend', () => li.classList.remove('dragging')) 
      ul.appendChild(li) 

      if (breaks.includes(index + 1)) {
        const line = document.createElement('div') 
        line.className = 'zone-line' 
        ul.appendChild(line) 
      }
    }) 
  }) 
}
