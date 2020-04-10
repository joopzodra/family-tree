import { LitElement, html, TemplateResult, property } from 'lit-element';
import page from 'page';

export class JrFamilyTree extends LitElement {

  @property() mainId: Number = 32

  render(): TemplateResult {
    return html`
      <jr-tree .mainId=${this.mainId}></jr-tree>
    `;
  }

  constructor() {
    super();
  }

  connectedCallback(): void {
    super.connectedCallback();
    page.base('');
    page('/:id', this.onNavigate.bind(this));
    page();
  }

  onNavigate(context: PageJS.Context): void {
    const id = (context.params as {id: string}).id
    document.title = 'FT ' + id
    console.log('hi', context)
    this.mainId = +id
  }
}
