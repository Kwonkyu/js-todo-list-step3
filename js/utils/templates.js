import { MEANING } from './constants.js';

export const teamListTemplate = (teamList) =>
  teamList
    .map(
      (team) => `
          <div class="team-card-container">
            <a href="/kanban.html?name=${team.name}&id=${team._id}#all" class="card">
              <div class="card-title">
                ${team.name}
              </div>
            </a>
          </div>
    `,
    )
    .join('').concat(`
      <div class="add-team-button-container">
        <button id="add-team-button" class="ripple">
          <span class="material-icons">add</span>
        </button>
      </div>
      `);

export const teamTitleTemplate = (teamName) => `
      <span><strong>${teamName}</strong>'s Todo List</span>
    `;

const subTodoPriorityTemplate = (priority) => `
  ${
    priority === MEANING.PRIMARY
      ? '<span class="chip primary">1순위</span>'
      : ''
  }
  ${
    priority === MEANING.SECONDARY
      ? '<span class="chip secondary">2순위</span>'
      : ''
  }
  <select class="chip select${priority !== MEANING.NOTHING ? ' hidden' : ''}">
    <option value="0" selected>순위</option>
    <option value="1">1순위</option>
    <option value="2">2순위</option>
  </select>`;

const TodoPriorityTemplate = {
  [MEANING.NOTHING]: subTodoPriorityTemplate(MEANING.NOTHING),
  [MEANING.PRIMARY]: subTodoPriorityTemplate(MEANING.PRIMARY),
  [MEANING.SECONDARY]: subTodoPriorityTemplate(MEANING.SECONDARY),
};

export const todoCountTemplate = (todoCount) => `
총 <strong>${todoCount}</strong> 개
  `;

export const todoListTemplate = (todoList) =>
  todoList
    .map(
      (todo) => `
      <li class='${
        todo.isCompleted ? 'todo-list-item completed' : 'todo-list-item'
      }' data-item-id=${todo._id}>
        <div class="view">
          <input class="toggle" type="checkbox" ${
            todo.isCompleted ? 'checked' : ''
          } />
          <label class="label">
          <div class="chip-container">
            ${TodoPriorityTemplate[todo.priority]}
          </div>
            ${todo.contents}
          </label>
          <button class="destroy"></button>
        </div>
        <input class="edit" placeholder=${todo.contents} value="" />
      </li>
      `,
    )
    .join('');

export const memberListTemplate = (memberList) =>
  memberList
    .map(
      (member) => `
      <li class="todoapp-container" data-member-id=${member._id}>
      <h2>
        <span><strong>${member.name}</strong>'s Todo List</span>
      </h2>
      <div class="todoapp">
        <section class="input-container">
          <input class="new-todo" placeholder="할 일을 입력해주세요." />
        </section>
        <section class="main">
          <ul class="todo-list" data-member-id=${member._id}>
            ${(member.todoList && todoListTemplate(member.todoList)) || ''}
          </ul>
        </section>
        <div class="count-container">
          <span class="todo-count">${
            member.todoList
              ? todoCountTemplate(member.todoList.length)
              : todoCountTemplate(0)
          }</span>
          <ul class="filters">
            <li>
              <a href="#all" class="selected">전체보기</a>
            </li>
            <li>
              <a href="#priority">우선 순위</a>
            </li>
            <li>
              <a href="#active">해야할 일</a>
            </li>
            <li>
              <a href="#completed">완료한 일</a>
            </li>
          </ul>
          <button class="clear-completed">모두 삭제</button>
        </div>
      </div>
      </li>
      `,
    )
    .join('').concat(`
        <li class="add-user-button-container">
          <button id="add-user-button" class="ripple">
            <span class="material-icons">add</span>
          </button>
        </li>
`);