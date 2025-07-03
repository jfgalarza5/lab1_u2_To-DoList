import { LitElement, html, css } from 'lit';

export class EspeTaskModal extends LitElement {
  static properties = {
    visible: { type: Boolean },
    task: { type: Object },
    isEditing: { type: Boolean }
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
      max-width: 400px;
      width: 100%;
      color: white;
    }
    label, input, textarea, select {
      display: block;
      width: 100%;
      margin-bottom: 10px;
    }
    button {
      padding: 8px 16px;
      border: none;
      margin-top: 8px;
    }
  `;

  render() {
    if (!this.visible) return html``;

    return html`
      <div class="modal" @click=${this._close}>
        <div class="content" @click=${e => e.stopPropagation()}>
          <h3>${this.isEditing ? 'Editar tarea' : 'Nueva tarea'}</h3>
          <form @submit=${this._submit}>
            <label>Nombre
              <input name="name" .value=${this.task?.name || ''} required />
            </label>
            <label>Notas
              <textarea name="notes">${this.task?.notes || ''}</textarea>
            </label>
            <label>Hora
              <input type="time" name="time" .value=${this.task?.time || '10:00'} required />
            </label>
            <label>Prioridad
              <select name="priority">
                <option value="alta" ?selected=${this.task?.priority === 'alta'}>Alta</option>
                <option value="media" ?selected=${this.task?.priority === 'media'}>Media</option>
                <option value="baja" ?selected=${this.task?.priority === 'baja'}>Baja</option>
              </select>
            </label>
            <button type="submit">Guardar</button>
            <button type="button" @click=${this._close}>Cancelar</button>
          </form>
        </div>
      </div>
    `;
  }

  _submit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    this.dispatchEvent(new CustomEvent('save', {
      detail: {
        name: form.get('name'),
        notes: form.get('notes'),
        time: form.get('time'),
        priority: form.get('priority')
      },
      bubbles: true
    }));
  }

  _close() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true }));
  }
}

customElements.define('espe-task-modal', EspeTaskModal);
