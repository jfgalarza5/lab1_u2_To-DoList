import { LitElement, html, css } from 'lit';
import './espe-task-item.js';
import './espe-task-modal.js';
import './espe-task-detail.js';

export class EspeTaskList extends LitElement {
  static properties = {
    tasks: { type: Array },
    showAddModal: { type: Boolean },
    showDetailModal: { type: Boolean },
    currentTaskId: { type: Number },
    editingTaskId: { type: Number },
    isEditing: { type: Boolean }
  };

  constructor() {
    super();
    this.tasks = [
      { id: 1, name: 'Reunión de Proyecto', notes: 'Preparar presentación.', time: '10:00', priority: 'alta', date: 'hoy' },
      { id: 2, name: 'Almuerzo con el equipo', notes: 'Discutir avances.', time: '13:00', priority: 'media', date: 'hoy' },
      { id: 3, name: 'Presentación de propuesta', notes: 'Cliente final.', time: '09:00', priority: 'alta', date: 'mañana' },
      { id: 4, name: 'Revisión de código', notes: 'Código de implementación.', time: '14:00', priority: 'media', date: 'mañana' }
    ];
    this.showAddModal = false;
    this.showDetailModal = false;
    this.currentTaskId = null;
    this.editingTaskId = null;
    this.isEditing = false;
    this.nextId = 5;
  }

  render() {
    const grouped = this._groupTasksByDate();

    return html`
      ${Object.entries(grouped).map(([date, items]) => html`
        <h3>${this._capitalize(date)}</h3>
        ${items.map(task => html`
          <espe-task-item
            .task=${task}
            @show-detail=${() => this._showDetail(task.id)}
            @edit-task=${() => this._editTask(task.id)}
            @delete-task=${() => this._deleteTask(task.id)}>
          </espe-task-item>
        `)}
      `)}

      <div class="container-boton">
        <button class="primary" @click=${this._openAddModal}>+ Agregar tarea</button>
      </div>

      <espe-task-modal
        .visible=${this.showAddModal}
        .isEditing=${this.isEditing}
        .task=${this._editingTask()}
        @close=${this._closeModal}
        @save=${this._saveTask}>
      </espe-task-modal>

      <espe-task-detail
        .visible=${this.showDetailModal}
        .task=${this._currentTask()}
        @close=${this._closeDetail}
        @edit=${this._editCurrent}
        @complete=${this._completeCurrent}>
      </espe-task-detail>
    `;
  }

  _groupTasksByDate() {
    return this.tasks.reduce((acc, t) => {
      acc[t.date] = acc[t.date] || [];
      acc[t.date].push(t);
      return acc;
    }, {});
  }

  _capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  _currentTask() {
    return this.tasks.find(t => t.id === this.currentTaskId);
  }

  _editingTask() {
    return this.tasks.find(t => t.id === this.editingTaskId) || null;
  }

  _openAddModal() {
    this.showAddModal = true;
    this.isEditing = false;
    this.editingTaskId = null;
  }

  _showDetail(id) {
    this.currentTaskId = id;
    this.showDetailModal = true;
  }

  _closeDetail() {
    this.showDetailModal = false;
    this.currentTaskId = null;
  }

  _editCurrent() {
    this._editTask(this.currentTaskId);
    this.showDetailModal = false;
  }

  _editTask(id) {
    this.isEditing = true;
    this.editingTaskId = id;
    this.showAddModal = true;
  }

  _deleteTask(id) {
    const confirmDelete = confirm('¿Eliminar esta tarea?');
    if (confirmDelete) {
      this.tasks = this.tasks.filter(t => t.id !== id);
      this.requestUpdate();
    }
  }

  _completeCurrent() {
    this.tasks = this.tasks.filter(t => t.id !== this.currentTaskId);
    this._closeDetail();
  }

  _saveTask(e) {
    const detail = e.detail;
    if (this.isEditing && this.editingTaskId !== null) {
      this.tasks = this.tasks.map(t => t.id === this.editingTaskId ? { ...t, ...detail } : t);
    } else {
      this.tasks = [...this.tasks, { id: this.nextId++, ...detail, date: 'hoy' }];
    }

    this._closeModal();
  }

  _closeModal() {
    this.showAddModal = false;
    this.isEditing = false;
    this.editingTaskId = null;
  }
}

customElements.define('espe-task-list', EspeTaskList);
