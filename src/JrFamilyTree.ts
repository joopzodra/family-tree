import { LitElement, html, TemplateResult, property } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import page from 'page';

export class JrFamilyTree extends LitElement {

  @property({ type: Array }) data = [];
  @property({ type: Number }) mainId = -1
  @property({ type: Number }) themeWidth = 6
  @property({ type: String }) themeColor = 'rgba(125,188,18,0.4'

  constructor() {
    super()
    fetch('/assets/data.json')
      .then((data) => {
        return data.json()
      })
      .then(data => {
        this.data = data
      })
  }

  connectedCallback(): void {
    super.connectedCallback();
    page.base('/family-tree');
    page('/', this.noPerson.bind(this))
    page('/:id', this.onNavigate.bind(this));
    page();
  }

  onNavigate(context: PageJS.Context): void {
    const id = (context.params as { id: string }).id
    document.title = 'FT ' + id
    this.mainId = +id
  }

  noPerson(): void {
    this.mainId = -1
  }

  render(): TemplateResult {
    if (this.mainId === -1) {
      return html`<p>Kies een persoon</p>`
    } else {
      return html`
      <jr-tree .mainId=${this.mainId} .data=${this.data}
      style=${styleMap({
        '--person-border-color': `${this.themeColor}`,
        '--person-border-width': `${this.themeWidth}px`,
        '--person-border-style': 'solid',
        '--connect-color': `${this.themeColor}`,
        '--connect-width': `${this.themeWidth}px`,
        '--connect-width-half': `${this.themeWidth / 2}px`,
        '--one-space': '16px',
        '--three-quarter-space': '12px'
      })}></jr-tree>
    `
    }
  }
}
