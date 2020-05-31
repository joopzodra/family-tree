import { LitElement, html, TemplateResult, property } from 'lit-element';
import page from 'page';

export class JrFamilyTree extends LitElement {
  @property({ type: Array }) data = [];
  @property({ type: Number }) mainId = -1;

  constructor() {
    super();
    fetch('assets/data.json')
      .then(data => data.json())
      .then(data => {
        this.data = data;
      });
  }

  connectedCallback(): void {
    super.connectedCallback();
    page.base('/family-tree');
    page('/', this.noPerson.bind(this));
    page('/:id', this.onNavigate.bind(this));
    page();
  }

  onNavigate(context: PageJS.Context): void {
    const { id } = context.params as { id: string };
    document.title = `FT ${id}`;
    this.mainId = +id;
  }

  noPerson(): void {
    this.mainId = -1;
  }

  render(): TemplateResult {
    if (this.mainId === -1) {
      return html`
        <p>Kies een persoon</p>
      `;
    }
    return html`
      <jr-tree .mainId=${this.mainId} .data=${this.data}></jr-tree>
    `;
  }

  createRenderRoot(): JrFamilyTree {
    return this;
  }
}
