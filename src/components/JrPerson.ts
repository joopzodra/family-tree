import { LitElement, html, css, property, TemplateResult, CSSResult } from 'lit-element'
import { Person } from '../models/person.model'

const connectColor = css`rgba(0,0,0, 0.4)`
const personWidth = 100

export class JrPerson extends LitElement {
  @property({ type: Object }) person: Person | {} = {}

  static get styles(): CSSResult {
    return css`
      .person {
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

  constructor() {
    super()
    this.person
  }

  static isPerson(person: Person | {}): person is Person {
    return (person as Person).id !== undefined
  }

  static navigate(id: number, src: EventTarget | null): void {
    const event = new CustomEvent('navigate', {
      bubbles: true,
      composed: true,
      detail: id.toString()
    });
    if (src) {
      src.dispatchEvent(event);   
    }
  }

  render(): TemplateResult {
    if (JrPerson.isPerson(this.person)) {
      return html`
      <a href=${this.person.id} class="person" @click=${(event: Event): void => JrPerson.navigate((this.person as Person).id, event.srcElement)}>
        <div>${this.person.firstNames} ${this.person.surname}</div><div>${this.person.dateOfBirth}</div>
      </a>`
    } else {
      return html``
    }
  }
}