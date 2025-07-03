import { LitElement, html, css } from 'lit';

export class EspeTaskDetail extends LitElement {
  static properties = {
    show: { type: Boolean },
    task: { type: Object },
  };

  static get styles(){
    return css`
      .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(16, 35, 28, 0.9);
        animation: fadeIn 0.3s;
      }
      .modal.show {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .modal-content {
        position: relative;
        background-color: #17352b;
        margin: auto;
        border-radius: 8px;
        border: 1px solid #2f6a55;
        width: 100%;
        max-width: 512px;
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.25);
        animation: slideDown 0.3s;
        padding: 16px;
        box-sizing: border-box;
      }
      .modal-header {
        position: relative;
        border-bottom: 1px solid #2f6a55;
        padding-bottom: 8px;
        margin-bottom: 16px;
      }
      .close {
        position: absolute;
        color: #8ecdb7;
        top: 15px;
        right: 15px;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
        background: none;
        border: none;
      }
      .close:hover {
        color: #019863;
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideDown {
        from { transform: translateY(-50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }

      button.primary {
        background-color: #019863;
        border: none;
        color: white;
        padding: 1rem 1rem;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: background-color 0.3s;
      }
      button.primary:hover {
        background-color: #017a4e;
      }
      button.danger {
        background-color: #f87171;
        border: none;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: background-color 0.3s;
      }
      button.danger:hover {
        background-color: #c85050;
      }

      #detail-task-title {
        color: white;
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
        font-weight: 700;
        word-break: break-word;
      }
      #detail-task-priority {
        color: #8ecdb7;
        font-weight: 600;
        margin-bottom: 1rem;
      }
      #detail-task-time {
        color: #8ecdb7;
        font-weight: 600;
        margin-bottom: 1rem;
      }
    `;
  }

  render() {
     if (!this.task) return null;

    const formatTime = (time) => {
      if (!time) return '';
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours);
      const period = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${period}`;
    };

    const capitalize = (string) => {
      if (!string) return '';
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return html`
      <div class="modal ${this.show ? 'show' : ''}" @click=${this._closeModal}>
        <div class="modal-content" @click=${e => e.stopPropagation()}>
          <div class="modal-header">
            <button class="close" @click=${this._closeModal} title="Cerrar">&times;</button>
            <h2 id="detail-task-title">${this.task.name}</h2>
          </div>
          <p id="detail-task-notes" style="color: #8ecdb7; white-space: pre-wrap;">${this.task.notes}</p>
          <p id="detail-task-time">Hora: ${formatTime(this.task.time)}</p>
          <p id="detail-task-priority">Prioridad: ${capitalize(this.task.priority)}</p>
          <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1rem;">
            <button class="primary" @click=${this._editTask}>Editar</button>
            <button class="danger" @click=${this._completeTask}>Completar</button>
          </div>
        </div>
      </div>
    `;
  }

  _closeModal() {
    this.dispatchEvent(new CustomEvent('close', {
      bubbles: true,
      composed: true
    }));
  }

  _editTask() {
    this.dispatchEvent(new CustomEvent('edit-task', {
      bubbles: true,
      composed: true
    }));
  }

  _completeTask() {
    this.dispatchEvent(new CustomEvent('complete-task', {
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('espe-task-detail', EspeTaskDetail);