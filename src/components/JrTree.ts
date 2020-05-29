import { LitElement, html, css, property, TemplateResult, CSSResult } from 'lit-element';
import { Person } from '../models/person.model';
import { tripleBaseSpace } from '../JrFamilyTree';

export class JrTree extends LitElement {
  @property({ type: Array }) data = [];
  @property({ type: Number }) mainId = -1;
  treeContainer: HTMLElement | null = null;
  siblingsContainer: HTMLElement | null = null;
  mainPerson: HTMLElement | null = null;

  static get styles(): CSSResult {
    return css`
      .tree-container {
        margin-top: var(--one-space);
        margin-bottom: var(--one-space);
      }
      .tree,
      .ancestors,
      .progeny {
        display: flex;
        flex-flow: column;
        align-items: center;
      }
      .ancestors-container,
      .progeny-container {
        display: flex;
      }
      .ancestors {
        justify-content: flex-end;
      }
      .connect {
        background-color: var(--connect-color);
      }
      .vertical {
        width: var(--connect-width);
        height: var(--one-space);
      }
      .horizontal {
        height: var(--connect-width);
      }
      .ancestors .horizontal {
        width: 50%;
      }
      .horizontal.left {
        margin-right: var(--connect-width-half);
        margin-left: 50%;
        padding-left: var(--connect-width-half);
      }
      .ancestors .horizontal.right {
        margin-right: 50%;
        margin-left: var(--connect-width-half);
        padding-left: var(--connect-width-half);
      }
      .progeny .horizontal {
        width: 100%;
      }
      .progeny .horizontal.first {
        margin-right: var(--connect-width-half);
        margin-left: 50%;
        padding-left: var(--connect-width-half);
        width: 50%;
      }
      .progeny .horizontal.last {
        margin-right: 50%;
        margin-left: var(--connect-width-half);
        padding-right: var(--connect-width-half);
        width: 50%;
      }
      .progeny .horizontal.single {
        display: none;
      }
      .main-person-container {
        display: flex;
        justify-content: center;
        position: relative;
      }
      .siblings-container {
        position: absolute;
        right: var(--main-person-width);
        margin-right: var(--triple-space);
      }
      .spouses-container {
        position: absolute;
        left: var(--main-person-width);
        margin-left: var(--triple-space);
      }
      jr-main-person {
      }
      .siblings,
      .spouses {
        display: flex;
      }
    `;
  }

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
            <div class="siblings-container">
              ${JrTree.siblingsTemplate(data, person)}
            </div>
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

  static ancestors(data: Person[], person: Person): TemplateResult {
    let father;
    let mother;
    if (person.fatherId) {
      const fatherData = data.find(p => p.id === person.fatherId) as Person;
      father = JrTree.ancestorsTemplate(data, fatherData, 'left');
    }
    if (person.motherId) {
      const motherData = data.find(p => p.id === person.motherId) as Person;
      mother = JrTree.ancestorsTemplate(data, motherData, 'right');
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
  ): TemplateResult {
    const ancestorTemplateResult = JrTree.ancestors(data, person);
    const ancestorVerticalConnectTop = ancestorTemplateResult.values.includes(undefined)
      ? html``
      : html`
          <div class="ancestor vertical connect"></div>
        `;
    return html`
      <div class="ancestors">
        <div class="ancestors-container">${ancestorTemplateResult}</div>
        ${ancestorVerticalConnectTop}
        <jr-person .person=${person}></jr-person>
        <div class="connect vertical"></div>
        <div class="connect horizontal ${leftOrRight}"></div>
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

  static siblingsTemplate(data: Person[], person: Person): TemplateResult {
    const siblings = data
      .filter(
        p =>
          (p.motherId && p.motherId === person.motherId) ||
          (p.fatherId && p.fatherId === person.fatherId),
      )
      .map(
        sibling =>
          html`
            <jr-person .person="${sibling}"></jr-person>
          `,
      );
    return html`
      <div class="siblings">${siblings}</div>
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
    this.updateComplete.then((): void => {
      let siblingsWidth = 0;
      if (!this.siblingsContainer) {
        this.setElementRefs();
      }
      if (this.siblingsContainer) {
        siblingsWidth = this.siblingsContainer.offsetWidth + tripleBaseSpace * 2;
      }
      if (this.treeContainer) {
        if (siblingsWidth > +this.treeContainer.style.width / 2) {
          const currentWidth = this.treeContainer.offsetWidth;
          this.treeContainer.style.marginLeft = `${siblingsWidth -
            this.treeContainer.offsetWidth / 2}px`;
          this.treeContainer.style.width = `${currentWidth}px`;
        }
      }
    });

    return html`
      <h1>Stamboom</h1>
      ${JrTree.mainPersonTemplate(this.data, this.mainId)}
    `;
  }
}
