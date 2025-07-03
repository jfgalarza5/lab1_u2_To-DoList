import { LitElement, html, css } from 'lit';

export class EspeTaskModal extends LitElement {
  static properties = {
    show: { type: Boolean },
    isEditing: { type: Boolean },
    task: { type: Object },
  };

  static styles = css`
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

    label {
      display: block;
      margin-bottom: 0.25rem;
      color: #8ecdb7;
      font-weight: 500;
    }
    input[type="text"],
    textarea,
    select,
    input[type="time"] {
      width: 100%;
      padding: 0.5rem;
      margin-bottom: 1rem;
      border-radius: 6px;
      border: 1px solid #2f6a55;
      background-color: #10231c;
      color: white;
      font-size: 1rem;
      box-sizing: border-box;
      resize: vertical;
    }
    textarea {
      min-height: 80px;
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
  `;

  render() {
    return html`
      <div class="modal ${this.show ? 'show' : ''}" @click=${this._onBackgroundClick}>
        <div class="modal-content" @click=${e => e.stopPropagation()}>
          <div class="modal-header">
            <button class="close" @click=${this._closeModal} title="Cerrar">&times;</button>
            <h2 style="color:white;">${this.isEditing ? 'Editar Tarea' : 'Agregar Tarea'}</h2>
          </div>
          <form id="task-form" @submit=${this._handleSubmit}>
            <label for="task-name">Nombre</label>
            <input type="text" id="task-name" name="task-name" .value=${this.task?.name || ''} required />

            <label for="task-notes">Notas</label>
            <textarea id="task-notes" name="task-notes">${this.task?.notes || ''}</textarea>

            <label for="task-time">Hora</label>
            <input type="time" id="task-time" name="task-time" .value=${this.task?.time || '10:00'} required />

            <label for="task-priority">Prioridad</label>
            <select id="task-priority" name="task-priority" .value=${this.task?.priority || 'media'}>
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </select>

            <div style="display: flex; justify-content: flex-end; gap: 1rem;">
              <button type="button" class="danger" @click=${this._closeModal}>Cancelar</button>
              <button type="submit" class="primary">${this.isEditing ? 'Guardar cambios' : 'Agregar'}</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  _handleSubmit(e) {
    e.preventDefault();
    const form = this.shadowRoot.getElementById('task-form');
    const formData = new FormData(form);

    const name = formData.get('task-name').trim();
    const notes = formData.get('task-notes').trim();
    const time = formData.get('task-time');
    const priority = formData.get('task-priority');

    if (!name) {
      alert('Por favor, ingresa un nombre para la tarea.');
      return;
    }

    this.dispatchEvent(new CustomEvent('save-task', {
      detail: { name, notes, time, priority },
      bubbles: true,
      composed: true
    }));
  }

  _closeModal() {
    this.dispatchEvent(new CustomEvent('close', {
      bubbles: true,
      composed: true
    }));
  }

  _onBackgroundClick(e) {
    if (e.target.classList.contains('modal')) {
      this._closeModal();
    }
  }
}

customElements.define('espe-task-modal', EspeTaskModal);