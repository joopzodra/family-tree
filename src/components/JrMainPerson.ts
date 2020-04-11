import { LitElement, html, css, property, TemplateResult, CSSResult } from 'lit-element'
import { Person } from '../models/person.model'

const connectColor = css`rgba(0,0,0, 0.4)`
const personWidth = 100

export class JrMainPerson extends LitElement {
  @property({ type: Object }) person: Person | {} = {}

  static get styles(): CSSResult {
    return css`
      .person.main {
        display: flex;
        flex-flow: column;
        width: ${personWidth}px;
        height: 150px;
        width: 150px;
        border: solid ${connectColor} 8px;
        margin: 0 16px;
      }  
    `
  }

  static isPerson(person: Person | {}): person is Person {
    return (person as Person).id !== undefined
  }

  render(): TemplateResult {
    if (JrMainPerson.isPerson(this.person)) {
      return html`<div class="person main">${this.person.firstNames} ${this.person.surname} ${this.person.dateOfBirth}</div>`
    } else {
      return html``
    }
  }
}