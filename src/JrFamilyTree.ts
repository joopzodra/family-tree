import { LitElement, html, css, property, TemplateResult, CSSResult } from 'lit-element'
import { Person } from './models/person.model'

const connectWidth = 2
const connectColor = css`rgba(0,0,0, 0.4)`

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
      .person {
        display: flex;
        flex-flow: column;
        width: 100px;
        height: 100px;
        border: solid ${connectColor} 2px;
        margin: 0 16px;
      }
      .ancestor-vertical-connect {
        width: ${connectWidth}px;
        height: 16px;
        background-color: ${connectColor};
        opacity: 0.5;
      }
      .ancestor-horizontal-connect {
        height: ${connectWidth}px;
        background-color:  ${connectColor};
        opacity: 0.5;
        width: 50%;
      }
      .ancestor-horizontal-connect.left {
        margin-left: 50%;
        padding-left: ${connectWidth / 2}px;
        margin-right: ${connectWidth / 2}px;
      }
      .ancestor-horizontal-connect.right {
        margin-right: 50%;
        padding-right: ${connectWidth / 2}px;
        margin-left: ${connectWidth / 2}px;
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
      father = JrFamilyTree.getAncestorTemplate(data, fatherData, 'left');
    }
    if (person.motherId) {
      const motherData = data.find(p => p.id === person.motherId) as Person
      mother = JrFamilyTree.getAncestorTemplate(data, motherData, 'right')
    }
    // mother = !mother && father ? html`<div>ONBEKEND</div>` : mother
    // father = !father && mother ? html`<div>ONBEKEND</div>` : father
    return html`${father}${mother}`
  }

  static getAncestorTemplate(data: Person[], person: Person, leftOrRight: 'left' | 'right'): TemplateResult {
    const ancestorData = JrFamilyTree.getAncestors(data, person)
    const ancestorVerticalConnectTop = ancestorData.values.includes(undefined) ?
      html`` : html`<div class="ancestor-vertical-connect"></div>`
    return html`
      <div class="ancestors">
        <div class="ancestors-container">${ancestorData}</div>
        ${ancestorVerticalConnectTop}
        <a class="person">
          <div>${person.firstNames} ${person.surname}</div><div>${person.dateOfBirth}</div>
        </a>
        <div class="ancestor-vertical-connect"></div>
        <div class="ancestor-horizontal-connect ${leftOrRight}"></div>
      </div>
      `
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
