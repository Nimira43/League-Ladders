import { divisions } from './data/teamData.js'

for (const [division, teams] of Object.entries(divisions)) {
  const ul = document.querySelector(`
    #${division.toLowerCase().replace(/ /g, '-')}
  `)?.querySelector('ul')
    
  if (!ul) continue

  teams.forEach(team => {
    const li = document.createElement('li')
    li.textContent = team
    li.draggable = true
    li.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', team)
      e.dataTransfer.effectAllowed = 'move'
      li.classList.add('dragging')
    })
  })
}