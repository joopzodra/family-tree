import { LitElement, html, css, property, TemplateResult, CSSResult } from 'lit-element';
import { Person } from '../models/person.model';

export class JrPerson extends LitElement {
  @property({ type: Object }) person: Person | {} = {};

  static get styles(): CSSResult {
    return css`
      .person {
        display: flex;
        flex-flow: column;
        height: var(--person-height);
        width: var(--person-width);
        border-style: var(--person-border-style);
        border-width: var(--person-border-width);
        border-color: var(--person-border-color);
        margin-left: var(--one-space);
        margin-right: var(--one-space);
      }
    `;
  }

  static isPerson(person: Person | {}): person is Person {
    return (person as Person).id !== undefined;
  }

  render(): TemplateResult {
    if (JrPerson.isPerson(this.person)) {
      return html`
        <a href=${this.person.id} class="person">
          <div>${this.person.firstNames} ${this.person.surname}</div>
          <div>${this.person.dateOfBirth}</div>
        </a>
      `;
    }
    return html``;
  }
}
