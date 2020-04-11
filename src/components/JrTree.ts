import { LitElement, html, css, property, TemplateResult, CSSResult } from 'lit-element'
import { Person } from '../models/person.model'

const connectWidth = 6
// const connectColor = css`rgba(0,0,0, 0.4)`
const connectColor = css`rgba(0,0,0, 0.4)`

export class JrTree extends LitElement {
  @property( {type: Array}) data = []
  @property({type: Number}) mainId = 32

  static get styles(): CSSResult {
    return css`
      .tree-container {
        display: flex;
        flex: 1;
        margin: 16px 0;
      }
      .tree, .ancestors, .progeny {
        display: flex;
        flex-flow: column;
        align-items: center;
      }
      .ancestors-container, .progeny-container {
        display: flex;        
      }
      .ancestors {
        justify-content: flex-end;
      }
      .connect {
        background-color: ${connectColor};
        opacity: 0.5;
      }
      .vertical {
        width: ${connectWidth}px;
        height: 16px;
      }
      .horizontal {
        height: ${connectWidth}px;
      }
      .ancestors .horizontal {
        width: 50%;
      }
      .ancestors .horizontal.left {
        margin: 0 ${connectWidth / 2}px 0  50%;
        padding-left: ${connectWidth / 2}px;
      }
      .ancestors .horizontal.right {
        margin: 0 50% 0 ${connectWidth / 2}px;
        padding-left: ${connectWidth / 2}px;
      }
      .progeny .horizontal {
        width: 100%;
      }
      .progeny .horizontal.first  {
        margin: 0 ${connectWidth / 2}px 0 50%;
        padding-left: ${connectWidth / 2}px;
        width: 50%;
      }
      .progeny .horizontal.last  {
        margin: 0 50% 0 ${connectWidth / 2}px;
        padding-right: ${connectWidth / 2}px;
        width: 50%;
      }      
    `;
  }

  static mainPersonTemplate(data: Person[], id: number): TemplateResult {
    const person = data.find(p => p.id === id) as Person
    const hasProgeny = data.find(p => p.fatherId === id || p.motherId === id)
    const ancestorsVerticalConnect = html`<div class="ancestor vertical connect"></div>`
    return html`
      <div class="tree-container">
        <div class="tree">
        <div class="ancestors-container">${JrTree.ancestors(data, person)}</div>
          ${person.fatherId || person.motherId ? ancestorsVerticalConnect : html``}
          <jr-main-person .person="${person}"></jr-main-person>
          ${hasProgeny ? html`<div class="progeny vertical connect"></div>` : html``}
          <div class="progeny-container">${JrTree.progenyTemplate(data, person, id, '')}</div>
        </div>
      </div>
    `
  }

  static ancestors(data: Person[], person: Person): TemplateResult {
    let father
    let mother
    if (person.fatherId) {
      const fatherData = data.find(p => p.id === person.fatherId) as Person
      father = JrTree.ancestorsTemplate(data, fatherData, 'left');
    }
    if (person.motherId) {
      const motherData = data.find(p => p.id === person.motherId) as Person
      mother = JrTree.ancestorsTemplate(data, motherData, 'right')
    }
    // TODO placeholder voor als persoon alleen vader of alleen moeder heeft
    // mother = !mother && father ? html`<div>ONBEKEND</div>` : mother
    // father = !father && mother ? html`<div>ONBEKEND</div>` : father
    return html`${father}${mother}`
  }

  static ancestorsTemplate(data: Person[], person: Person, leftOrRight: 'left' | 'right'): TemplateResult {
    const ancestorTemplateResult = JrTree.ancestors(data, person)
    const ancestorVerticalConnectTop = ancestorTemplateResult.values.includes(undefined) ?
      html`` : html`<div class="ancestor vertical connect"></div>`
    return html`
      <div class="ancestors">
        <div class="ancestors-container">${ancestorTemplateResult}</div>
        ${ancestorVerticalConnectTop}
        <jr-person .person=${person}></jr-person>
        <div class="connect vertical"></div>
        <div class="connect horizontal ${leftOrRight}"></div>
      </div>
      `
  }

  static progenyTemplate(data: Person[], person: Person, mainId: number, position: string): TemplateResult {
    const progenyTemplateResult = data.filter(p => p.fatherId === person.id || p.motherId === person.id)
    .sort((p1: Person, p2: Person) => +p1.dateOfBirth.substring(0, 4) - +p2.dateOfBirth.substring(0, 4))
    .map((p, index, pArray) =>  {
      const position = index === 0 ? 'first' : (index === pArray.length - 1 ? 'last' : '') 
      return JrTree.progenyTemplate(data, p, mainId, position)
    })
    const progeny = person.id === mainId ?
      html`${progenyTemplateResult}` :
      html`
        <div class="progeny">
          <div class="connect horizontal ${position}"></div>
          <div class="vertical connect"></div>
          <jr-person .person=${person}></jr-person>
          ${progenyTemplateResult.length ? html`<div class="progeny vertical connect"></div>` : html``}
          <div class="progeny-container">${progenyTemplateResult}</div>
        </div>
      `
    return progeny
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
      <h1>Stamboom</h1>
      ${JrTree.mainPersonTemplate(this.data, this.mainId)}
    `;
  }
}
