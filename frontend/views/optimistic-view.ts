import { View } from './view';
import { customElement, state } from 'lit/decorators.js';
import { html } from 'lit';
import Article from 'Frontend/generated/com/example/application/endpoints/ArticleEndpoint/Article';
import { ArticleEndpoint } from 'Frontend/generated/endpoints';
import { marked } from 'marked';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Binder, field } from '@hilla/form';
import CommentModel from 'Frontend/generated/com/example/application/endpoints/ArticleEndpoint/CommentModel';
import '@vaadin/text-field';
import '@vaadin/vaadin-text-field/vaadin-text-area';
import '@vaadin/vaadin-button';

@customElement('optimistic-view')
export class OptimisticView extends View {
  @state() article?: Article;
  binder = new Binder(this, CommentModel);

  async connectedCallback() {
    super.connectedCallback();
    this.article = await ArticleEndpoint.getArticleById(1);
  }

  async submitComment() {}

  render() {
    if (!this.article) return html` <h1>Loading...</h1> `;

    const { model } = this.binder;
    return html`
      <h1 class="text-xl">${this.article.title}</h1>
      <span class="text-l">${this.article.author}</span>

      <p>${unsafeHTML(marked.parse(this.article.content))}</p>

      <h2>Comments</h2>
      ${this.article.comments.map(
        (comment) => html`
          <h3>${comment.username} says</h3>
          <p>${comment.comment}</p>
        `
      )}

      <div class="flex flex-col gap-m">
        <vaadin-text-field label="Name" ${field(model.username)}></vaadin-text-field>
        <vaadin-text-area label="Comment" ${field(model.comment)}></vaadin-text-area>
        <vaadin-button theme="primary" class="self-start" @click=${this.submitComment}>
          Say something smart
        </vaadin-button>
      </div>
    `;
  }
}