import { LitElement, html, property, TemplateResult } from 'lit-element';
import { Person } from '../models/person.model';

export class JrTree extends LitElement {
  @property({ type: Array }) data = [];
  @property({ type: Number }) mainId = -1;
  treeContainer: HTMLElement | null = null;
  siblingsContainer: HTMLElement | null = null;
  mainPerson: HTMLElement | null = null;

  static mainPersonTemplate(data: Person[], id: number): TemplateResult {
    const person = data.find(p => p.id === id) as Person;
    if (!person) {
      return html`
        <p>Persoon bestaat niet</p>
      `;
    }
    const hasProgeny = data.find(p => p.fatherId === id || p.motherId === id);
    const ancestorsVerticalConnect = html`
      <div class="ancestor vertical connect"></div>
    `;
    return html`
      <div class="tree-container">
        <div class="tree">
          <div class="ancestors-container">${JrTree.ancestors(data, person)}</div>
          ${person.fatherId || person.motherId ? ancestorsVerticalConnect : html``}
          <div class="main-person-container">
            <jr-main-person .person="${person}"></jr-main-person>
            <div class="spouses-container">
              ${JrTree.spousesTemplate(data, person)}
            </div>
          </div>
          ${hasProgeny
            ? html`
                <div class="progeny vertical connect"></div>
              `
            : html``}
          <div class="progeny-container">${JrTree.progenyTemplate(data, person, id, '')}</div>
        </div>
      </div>
    `;
  }

  static ancestors(data: Person[], person: Person, index = 0): TemplateResult {
    let father;
    let mother;
    let indexUpdate = index;
    if (person.fatherId) {
      indexUpdate += 1;
      const fatherData = data.find(p => p.id === person.fatherId) as Person;
      father = JrTree.ancestorsTemplate(data, fatherData, 'left', indexUpdate);
    }
    if (person.motherId) {
      indexUpdate += 1;
      const motherData = data.find(p => p.id === person.motherId) as Person;
      mother = JrTree.ancestorsTemplate(data, motherData, 'right', indexUpdate);
    }
    // TODO placeholder voor als persoon alleen vader of alleen moeder heeft
    // mother = !mother && father ? html`<div>ONBEKEND</div>` : mother
    // father = !father && mother ? html`<div>ONBEKEND</div>` : father
    return html`
      ${father}${mother}
    `;
  }

  static ancestorsTemplate(
    data: Person[],
    person: Person,
    leftOrRight: 'left' | 'right',
    index: number,
  ): TemplateResult {
    const ancestorTemplateResult = JrTree.ancestors(data, person, index);
    const ancestorVerticalConnectTop = ancestorTemplateResult.values.includes(undefined)
      ? html``
      : html`
          <div class="ancestor vertical connect"></div>
        `;
    return html`
      <div class="ancestors">
        <div class="accordion">
          <div class="card">
            <div id=${`ancestors-container-${index}`} class="ancestors-container collapse">
              ${ancestorTemplateResult}
            </div>
            <button
              class="btn btn-link btn-block text-center collapsed"
              type="button"
              data-toggle="collapse"
              data-target="${`#ancestors-container-${index}`}"
            ><span class="open-collapse-sign">+</span>
              <span class="close-collapse-sign">-</span>
            </button>
          </div>
        </div>
          ${ancestorVerticalConnectTop}
          <jr-person .person=${person}></jr-person>
          <div class="connect vertical"></div>
          <div class="connect horizontal ${leftOrRight}"></div>
        </div>
      </div>
    `;
  }

  static progenyTemplate(
    data: Person[],
    person: Person,
    mainId: number,
    position: string,
  ): TemplateResult {
    const progenyTemplateResult = data
      .filter(p => p.fatherId === person.id || p.motherId === person.id)
      .sort(
        (p1: Person, p2: Person) =>
          +p1.dateOfBirth.substring(0, 4) - +p2.dateOfBirth.substring(0, 4),
      )
      .map((p, index, pArray) => {
        // const nextPosition = pArray.length === 1 ? 'single' : (index === 0 ? 'first' : (index === pArray.length - 1 ? 'last' : ''));
        let nextPosition;
        if (pArray.length === 1) {
          nextPosition = 'single';
        } else if (index === 0) {
          nextPosition = 'first';
        } else if (index === pArray.length - 1) {
          nextPosition = 'last';
        } else {
          nextPosition = '';
        }
        return JrTree.progenyTemplate(data, p, mainId, nextPosition);
      });
    const progeny =
      person.id === mainId
        ? html`
            ${progenyTemplateResult}
          `
        : html`
            <div class="progeny">
              <div class="connect horizontal ${position}"></div>
              <div class="vertical connect"></div>
              <jr-person .person=${person}></jr-person>
              ${progenyTemplateResult.length
                ? html`
                    <div class="progeny vertical connect"></div>
                  `
                : html``}
              <div class="progeny-container">${progenyTemplateResult}</div>
            </div>
          `;
    return progeny;
  }

  static spousesTemplate(data: Person[], person: Person): TemplateResult {
    const spousesIds: number[] = JSON.parse(person.marriedWith);
    const spouses = spousesIds.map((spouse: number) => {
      const spousePerson = data.find(p => p.id === spouse);
      return html`
        <jr-person .person="${spousePerson}"></jr-person>
      `;
    });
    return html`
      <div class="spouses">${spouses}</div>
    `;
  }

  setElementRefs(): void {
    const shadow = this.shadowRoot;
    if (shadow) {
      this.treeContainer = shadow.querySelector<HTMLElement>('.tree-container');
      this.siblingsContainer = shadow.querySelector<HTMLElement>('.siblings-container');
      this.mainPerson = shadow.querySelector<HTMLElement>('jr-main-person');
    }
  }

  render(): TemplateResult {
    return html`
      <h1>Stamboom</h1>
      ${JrTree.mainPersonTemplate(this.data, this.mainId)}
    `;
  }

  createRenderRoot(): JrTree {
    return this;
  }
}
