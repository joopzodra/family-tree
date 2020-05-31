import { LitElement, html, property, TemplateResult } from 'lit-element';
import { Person } from '../models/person.model';

export class JrPerson extends LitElement {
  @property({ type: Object }) person: Person | {} = {};

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

  createRenderRoot(): JrPerson {
    return this;
  }
}
