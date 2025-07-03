import { LitElement, html, css } from 'lit';

export class EspeTaskDetail extends LitElement {
  static properties = {
    visible: { type: Boolean },
    task: { type: Object }
  };

  static styles = css`
    .modal {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.7);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .content {
      background: #17352b;
      border-radius: 8px;
      padding: 20px;
      color: white;
      max-width: 400px;
      width: 100%;
    }
    button {
      padding: 8px;
      margin: 8px 4px 0 0;
      border: none;
    }
  `;

  render() {
    if (!this.visible || !this.task) return html``;

    return html`
      <div class="modal" @click=${this._close}>
        <div class="content" @click=${e => e.stopPropagation()}>
          <h3>${this.task.name}</h3>
          <p><strong>Notas:</strong> ${this.task.notes}</p>
          <p><strong>Hora:</strong> ${this.task.time}</p>
          <p><strong>Prioridad:</strong> ${this.task.priority}</p>
          <button @click=${this._edit}>Editar</button>
          <button @click=${this._complete}>Completar</button>
        </div>
      </div>
    `;
  }

  _close() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true }));
  }

  _edit() {
    this.dispatchEvent(new CustomEvent('edit', { bubbles: true }));
  }

  _complete() {
    this.dispatchEvent(new CustomEvent('complete', { bubbles: true }));
  }
}

customElements.define('espe-task-detail', EspeTaskDetail);
