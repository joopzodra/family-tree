import { LitElement, html, property, TemplateResult } from 'lit-element';
import { Person } from '../models/person.model';

export class JrMainPerson extends LitElement {
  @property({ type: Object }) person: Person | {} = {};

  static isPerson(person: Person | {}): person is Person {
    return (person as Person).id !== undefined;
  }

  render(): TemplateResult {
    if (JrMainPerson.isPerson(this.person)) {
      return html`
        <div class="person main">
          ${this.person.firstNames} ${this.person.surname} ${this.person.dateOfBirth}
        </div>
      `;
    }
    return html``;
  }

  createRenderRoot(): JrMainPerson {
    return this;
  }
}
