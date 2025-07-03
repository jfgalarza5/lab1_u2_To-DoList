import { LitElement, html, css } from 'lit';

export class EspeTaskItem extends LitElement {
  static properties = {
    task: { type: Object }
  };

  static styles = css`
    .task-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #10231c;
      padding: 12px;
      margin: 4px 0;
      border-radius: 8px;
      color: white;
      cursor: pointer;
    }
    .actions {
      display: flex;
      gap: 8px;
    }
    button {
      background: none;
      border: none;
      color: #8ecdb7;
      cursor: pointer;
    }
    button:hover {
      color: white;
    }
  `;

  render() {
    const { task } = this;
    return html`
      <div class="task-item" @click=${this._showDetail}>
        <div>
          <strong>${task.name}</strong><br />
          <small>${task.time}</small>
        </div>
        <div class="actions" @click=${e => e.stopPropagation()}>
          <button @click=${this._edit}>✏️</button>
          <button @click=${this._delete}>🗑️</button>
        </div>
      </div>
    `;
  }

  _showDetail() {
    this.dispatchEvent(new CustomEvent('show-detail', { bubbles: true }));
  }

  _edit() {
    this.dispatchEvent(new CustomEvent('edit-task', { bubbles: true }));
  }

  _delete() {
    this.dispatchEvent(new CustomEvent('delete-task', { bubbles: true }));
  }
}

customElements.define('espe-task-item', EspeTaskItem);
