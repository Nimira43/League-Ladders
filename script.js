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
  })
}