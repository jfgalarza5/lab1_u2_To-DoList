# Sistema de Gestión de Tareas (To-Do List) con LitElement

Este proyecto implementa un sistema de gestion de tareas usando **LitElement**, una libreria basada en Web Components. Permite agregar, visualizar, completar y eliminar tareas de forma modular y accesible.

## Objetivo

Encapsular toda la logica, estilos y estado de una aplicacion To-Do List en un conjunto de componentes reutilizables y desacoplados.  


## Componentes Incluidos

- `espe-task-list`: componente principal que administra las tareas.
- `espe-task-item`: muestra una tarea individual.
- `espe-task-detail`: muestra detalles de una tarea seleccionada.
- `espe-task-modal`: modal para crear nuevas tareas.

## Ejemplo de uso

```html
<espe-task-list 
  theme="oscuro"
  .tasks=${[]}
  @task-added=${(e) => console.log('Tarea agregada:', e.detail)}
  @task-completed=${(e) => console.log('Tarea completada:', e.detail)}>
</espe-task-list>
```

> Asegurate de importar los componentes en tu archivo principal:

```js
import './components/espe-task-list.js';
```

## Atributos Soportados

| Atributo | Tipo    | Descripción                                             |
|----------|---------|---------------------------------------------------------|
| `tasks`  | Array   | Lista inicial de tareas a renderizar.                   |

## Eventos Personalizados

| Evento            | Descripción                                                        |
|-------------------|--------------------------------------------------------------------|
| `task-added`      | Se emite cuando el usuario crea una nueva tarea.                   |
| `task-completed`  | Se emite al marcar una tarea como completada.                     |
| `task-selected`   | Se emite al hacer clic en una tarea para ver sus detalles.         |

## Instalacion del Proyecto

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/usuario/laboratorio1-todo-lit.git
   ```
2. Instalar dependencias:

   ```bash
   npm install
   ```
3. Ejecutar en entorno local:

   ```bash
   npm run dev
   ```

## Capturas

Codigo en la dev tools al ejecutar el servidor del To Do List.

![Web Codigo](./docs/web_codigo.png)

Se agrega una tarea al hacer click en Agregar Tarea.

![Agregar Tarea](./docs/Agregar%20tarea.gif)

Se edita la tarea en el boton de lapiz.

![Editar Tarea](./docs/Editar%20tarea.gif)

Se elimina la tarea en el boton de basura.

![Eliminar Tarea](./docs/Eliminar%20tarea.gif)