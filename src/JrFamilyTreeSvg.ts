import { LitElement, html, css, property, TemplateResult, CSSResult, svg } from 'lit-element'
import {Person} from './models/person.model'

export class JrFamilyTreeSvg extends LitElement {
  @property() data: Array = []
  @property() mainId: Number = 28

  static get styles(): CSSResult {
    return css`
    
    `;
  }

  static getMainPerson(data: Person[], id: number): TemplateResult {
    const person = data.find(p => p.id === id) as Person
    return svg`
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="500px">
        <g class="main-person-container" transform="translate(0, 20)">${JrFamilyTreeSvg.getParentTree(data, person)}
          <g class="main-person">
            <text>${person.firstNames} ${person.surname} ${person.dateOfBirth}</text>
          </g>
        </g>
      </svg>
    `
  }
  
  static getParentTree(data: Person[], person: Person): TemplateResult {
    let father
    let mother
    if (person.fatherId) {
      const personFather = data.find(p => p.id === person.fatherId) as Person
      father = svg`
        <g class="parent-container" transform="translate(0, 30)">${JrFamilyTreeSvg.getParentTree(data, personFather)}
          <text>${personFather.firstNames} ${personFather.surname} ${personFather.dateOfBirth}</text>
        </g>`
    }
    if (person.motherId) {
      const personMother = data.find(p => p.id === person.motherId) as Person
      mother = svg`
        <g class="parent-container" transform="translate(200, 30)">${JrFamilyTreeSvg.getParentTree(data, personMother)}
          <text>${personMother.firstNames} ${personMother.surname} ${personMother.dateOfBirth}</text>
        </g>`
    }
    return svg`${father}${mother}`
  }
  
  static getChildrenTree(data: Person[], person: Person): Person {
    person.children = data.filter(p => p.fatherId === person.id || p.motherId === person.id).map(child => JrFamilyTreeSvg.getChildrenTree(data, child))
    return person;
  }

  constructor() {
    super()
    fetch('/src/assets/data.json')
    .then((data ) => {
      return data.json()
    })
    .then(data => {
      this.data = data
    })
  }

  render(): TemplateResult {
    return html`
      <h1>My app</h1>
      <div style="height:400px;">
      ${JrFamilyTreeSvg.getMainPerson(this.data, this.mainId as number)}
      </div>
    `;
  }
}
