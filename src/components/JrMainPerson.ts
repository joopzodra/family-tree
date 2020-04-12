import { LitElement, html, css, property, TemplateResult, CSSResult } from 'lit-element'
import { Person } from '../models/person.model'

export class JrMainPerson extends LitElement {
  @property({ type: Object }) person: Person | {} = {}

  static get styles(): CSSResult {
    return css`
      .person.main {
        display: flex;
        flex-flow: column;
        height: 125px;
        width: 125px;
        border-style: var(--person-border-style);
        border-color: var(--person-border-color);
        border-width: var(--three-quarter-space);
        margin-left: var(--one-space);
        margin-right: var(--one-space);
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