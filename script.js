import { divisions } from './data/teamData.js'

for (const [division, teams] of Object.entries(divisions)) {
  const ul = document.querySelector(`
    #${division.toLowerCase().replace(/ /g, '-')}
  `)?.querySelector('ul')
    
  if (!ul) continue
}