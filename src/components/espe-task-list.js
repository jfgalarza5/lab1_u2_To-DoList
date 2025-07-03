import { LitElement, html, css } from 'lit';
import './espe-task-item.js';
import './espe-task-modal.js';
import './espe-task-detail.js';

export class EspeTaskList extends LitElement {
  static get properties(){
    return {
      tasks: { type: Array },
      _showAddModal: { state: true },
      _showDetailModal: { state: true },
      _currentTaskId: { state: true },
      _isEditing: { state: true },
      _editingTaskId: { state: true },
    };
  };

  static get styles(){
    return css`
      .container-boton{
        display: flex;
        flex-direction: column;
        align-items: end;
        margin-block: 25px;
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
    `; 
  }

  constructor() {
    super();
    this.tasks = [];
    this._showAddModal = false;
    this._showDetailModal = false;
    this._currentTaskId = null;
    this._isEditing = false;
    this._editingTaskId = null;
    this._nextId = 5;
  }

  render() {
    const groupedTasks = this._groupTasksByDate(this.tasks);

    return html`
      ${Object.keys(groupedTasks).map(date => html`
        <h3 class="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          ${this._capitalizeFirstLetter(date)}
        </h3>
        ${groupedTasks[date].map(task => html`
          <espe-task-item 
            .task=${task}
            @edit-task=${this._editTask}
            @delete-task=${this._deleteTask}
            @show-task-details=${this._showTaskDetails}
          ></espe-task-item>
        `)}
      `)}

      <espe-task-modal 
        ?show=${this._showAddModal}
        ?isEditing=${this._isEditing}
        .task=${this._editingTask}
        @close=${this._closeAddModal}
        @save-task=${this._saveTask}
      ></espe-task-modal>

      <div class="container-boton">
        <button class="primary" @click=${this._openAddModal}>+ Agregar tarea</button>
      </div>

      <espe-task-detail 
        ?show=${this._showDetailModal}
        .task=${this._currentTask || null}
        @close=${this._closeDetailModal}
        @edit-task=${this._editCurrentTask}
        @complete-task=${this._completeCurrentTask}
      ></espe-task-detail>
    `;
  }

  _groupTasksByDate(tasks) {
    return tasks.reduce((acc, task) => {
      acc[task.date] = acc[task.date] || [];
      acc[task.date].push(task);
      return acc;
    }, {});
  }

  _capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  _formatTime(time) {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${period}`;
  }

  _showTaskDetails(e) {
    this._currentTaskId = e.detail.taskId;
    this._showDetailModal = true;
    this._showAddModal = false;
  }

  get _currentTask() {
    return this.tasks.find(t => t.id === this._currentTaskId);
  }

  _openAddModal() {
    this._isEditing = false;
    this._editingTaskId = null;
    this._showAddModal = true;
    this._showDetailModal = false;
  }

  _closeAddModal() {
    this._showAddModal = false;
    this._isEditing = false;
    this._editingTaskId = null;
  }

  _closeDetailModal() {
    this._showDetailModal = false;
    this._currentTaskId = null;
  }

  _saveTask(e) {
    e.preventDefault();
    const { name, notes, time, priority } = e.detail;

    if (this._isEditing && this._editingTaskId != null) {
      this.tasks = this.tasks.map(task => {
        if (task.id === this._editingTaskId) {
          return { ...task, name, notes, time, priority };
        }
        return task;
      });
    } else {
      this.tasks = [
        ...this.tasks,
        {
          id: this._nextId++,
          name,
          notes,
          time,
          priority,
          date: 'hoy',
        }
      ];
    }

    this._isEditing = false;
    this._editingTaskId = null;
    this._showAddModal = false;
  }

  _editTask(e) {
    const taskId = e.detail.taskId;
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;

    this._isEditing = true;
    this._editingTaskId = taskId;
    this._editingTask = task;
    this._showAddModal = true;
    this._showDetailModal = false;
  }

  _deleteTask(e) {
    const taskId = e.detail.taskId;
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;

    if (confirm(`¿Estás seguro de que deseas eliminar la tarea "${task.name}"?`)) {
      this.tasks = this.tasks.filter(t => t.id !== taskId);
      if (this._currentTaskId === taskId) {
        this._showDetailModal = false;
        this._currentTaskId = null;
      }
    }
  }

  _editCurrentTask() {
    if (!this._currentTaskId) return;
    this.dispatchEvent(new CustomEvent('edit-task', { 
      detail: { taskId: this._currentTaskId },
      bubbles: true,
      composed: true 
    }));
  }

  _completeCurrentTask() {
    if (!this._currentTaskId) return;
    this.tasks = this.tasks.filter(t => t.id !== this._currentTaskId);
    this._showDetailModal = false;
    this._currentTaskId = null;
  }
}

customElements.define('espe-task-list', EspeTaskList);