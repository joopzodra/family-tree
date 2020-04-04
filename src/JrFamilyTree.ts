import { LitElement, html, css, property, TemplateResult, CSSResult } from 'lit-element'
import { Person } from './models/person.model'

export class JrFamilyTree extends LitElement {
  @property() data: Array = []
  @property() mainId: Number = 28

  static get styles(): CSSResult {
    return css`
      .tree-container {
        display: flex;
        flex: 1;
      }
      .tree {
        display: flex;
        flex-flow: column;
        align-items: center;
      }
      .ancestors-container {
        display: flex;        
      }
      .ancestors {
        flex-flow: column;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .parent {
        display: flex;
        flex-flow: column;
        width: 100px;
        height: 100px;
        border: solid 2px red;
        margin: 16px;
      }
    `;
  }

  static getMainPerson(data: Person[], id: number): TemplateResult {
    const person = data.find(p => p.id === id) as Person
    return html`
      <div class="tree-container">
        <div class="tree">
          <div class="ancestors-container">${JrFamilyTree.getAncestors(data, person)}</div>
          <div class="main-person">${person.firstNames} ${person.surname} ${person.dateOfBirth}</div>
        </div>
      </div>
    `
  }

  static getAncestors(data: Person[], person: Person): TemplateResult {
    let father
    let mother
    if (person.fatherId) {
      const fatherData = data.find(p => p.id === person.fatherId) as Person
      father = JrFamilyTree.getAncestorTemplate(data, fatherData);
    }
    if (person.motherId) {
      const motherData = data.find(p => p.id === person.motherId) as Person
      mother = JrFamilyTree.getAncestorTemplate(data, motherData)
    }
    return html`${father}${mother}`
  }

  static getAncestorTemplate(data: Person[], person: Person): TemplateResult {
    return html`
        <div class="ancestors">
          <div class="ancestors-container">${JrFamilyTree.getAncestors(data, person)}</div>  
          <a class="parent">
            <div>${person.firstNames} ${person.surname}</div><div>${person.dateOfBirth}</div>
          </a>
      </div>`
  }

  static getProgeny(data: Person[], person: Person): Person {
    person.children = data.filter(p => p.fatherId === person.id || p.motherId === person.id).map(child => JrFamilyTree.getProgeny(data, child))
    return person;
  }

  constructor() {
    super()
    fetch('/src/assets/data.json')
      .then((data) => {
        return data.json()
      })
      .then(data => {
        this.data = data
      })
  }

  render(): TemplateResult {
    return html`
      <h1>My app</h1>
      ${JrFamilyTree.getMainPerson(this.data, this.mainId as number)}
    `;
  }
}
