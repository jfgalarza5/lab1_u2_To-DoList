import { LitElement, html, css } from 'lit';

export class EspeTaskItem extends LitElement {
  static get properties(){
    return {
      task: { type: Object }
    };
  };

  static get styles(){
    return css`
      .task-item {
        cursor: pointer;
        transition: background-color 0.2s;
        display: flex;
        align-items: center;
        gap: 1rem;
        background-color: #10231c;
        padding: 0.5rem 1rem;
        min-height: 72px;
        margin-bottom: 8px;
        border-radius: 6px;
      }
      .task-item:hover {
        background-color: #17352b;
      }

      .task-icon {
        background-color: #214a3c;
        color: white;
        border-radius: 8px;
        width: 48px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
      }

      .task-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
      }

      .task-name {
        color: white;
        font-weight: 500;
        font-size: 1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .task-time {
        color: #8ecdb7;
        font-size: 0.875rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .task-actions {
        display: flex;
        gap: 0.5rem;
      }
      .task-actions button {
        background: none;
        border: none;
        cursor: pointer;
        color: #8ecdb7;
        padding: 0.25rem;
        border-radius: 4px;
        transition: color 0.2s;
      }
      .task-actions button:hover {
        color: white;
      }
      .task-actions button.delete:hover {
        color: #f87171;
      }
    `;
  }

  render() {
    return html`
      <div class="task-item" @click=${this._showTaskDetails}>
        <div class="task-icon" aria-label="Ícono tarea">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"></path>
          </svg>
        </div>
        <div class="task-info">
          <p class="task-name">${this.task.name}</p>
          <p class="task-time">${this.task.time}</p>
        </div>
        <div class="task-actions" @click=${e => e.stopPropagation()}>
          <button @click=${this._editTask} title="Editar tarea">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
            </svg>
          </button>
          <button class="delete" @click=${this._deleteTask} title="Eliminar tarea">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  _showTaskDetails() {
    this.dispatchEvent(new CustomEvent('show-task-details', {
      detail: { taskId: this.task.id },
      bubbles: true,
      composed: true
    }));
  }

  _editTask(e) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('edit-task', {
      detail: { taskId: this.task.id },
      bubbles: true,
      composed: true
    }));
  }

  _deleteTask(e) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('delete-task', {
      detail: { taskId: this.task.id },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('espe-task-item', EspeTaskItem);