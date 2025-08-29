let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskInput = document.querySelector('.js-task-input');
const addButton = document.querySelector('.js-add-button');
const allTasksTab = document.querySelector('.js-all-tasks-tab');
const activeTasksTab = document.querySelector('.js-active-tasks-tab');
const completedTasksTab = document.querySelector('.js-completed-tasks-tab');
const leftItemsText = document.querySelector('.js-left-items-text');
const clearCompletedButton = document.querySelector('.js-clear-completed-button');
const dateText = document.querySelector('.js-date-text');
const tasksList = document.querySelector('.js-tasks-list');
const tabs = document.querySelectorAll('.js-tab');
const emptyList = document.querySelector('.js-empty-list');

tabs.forEach((tab) => {
  tab.style.color = 'rgb(var(--text-gray))';
  tab.style.borderBottomColor = 'white';
});
tabs[0].style.color = 'rgb(var(--main-purple))';
tabs[0].style.borderBottomColor = 'rgb(var(--main-purple))';
loadPage();

allTasksTab.addEventListener('click', () => {
  tabs.forEach((tab) => {
    tab.style.color = 'rgb(var(--text-gray))';
    tab.style.borderBottomColor = 'white';
  });
  tabs[0].style.color = 'rgb(var(--main-purple))';
  tabs[0].style.borderBottomColor = 'rgb(var(--main-purple))';

  loadPage();
});
activeTasksTab.addEventListener('click', () => {
  tabs.forEach((tab) => {
    tab.style.color = 'rgb(var(--text-gray))';
    tab.style.borderBottomColor = 'white';
  });
  tabs[1].style.color = 'rgb(var(--main-purple))';
  tabs[1].style.borderBottomColor = 'rgb(var(--main-purple))';

  loadPage();
});
completedTasksTab.addEventListener('click', () => {
  tabs.forEach((tab) => {
    tab.style.color = 'rgb(var(--text-gray))';
    tab.style.borderBottomColor = 'white';
  });
  tabs[2].style.color = 'rgb(var(--main-purple))';
  tabs[2].style.borderBottomColor = 'rgb(var(--main-purple))';

  loadPage();
});

addButton.addEventListener('click', () => { addNewTask() });
taskInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter')
    addNewTask();
});

function loadPage() {
  dateText.innerHTML = dayjs().format('dddd, MMM D');
  showTasks();
  leftItemsText.textContent = `${getLeftItemsCount()} items left`;
}

function showTasks() {
  let state;
  tabs.forEach((tab, index) => {
    if (tab.style.color === 'rgb(var(--main-purple))')
      switch (index) {
        case 0:
          state = 'all';
          break;
        case 1:
          state = 'active';
          break;
        case 2:
          state = 'completed';
          break;
      }
  });

  tasksList.innerHTML = '';
  let tasksCount = 0;

  tasks.forEach((task) => {
    switch (state) {
      case 'all':
        tasksList.insertAdjacentHTML("beforeend",
          `
            <div class="task">
              <input type="checkbox" ${task.state === 'completed' ? 'checked' : ''}>
              <p ${task.state === 'completed' ? 'class="completed-task-name"' : ''}>
                ${task.name}
              </p>
              <button class="remove-button">
                X
              </button>
            </div>  
          `
        );
        tasksCount++;
        break;

      case 'active':
        if (task.state === 'active') {
          tasksList.insertAdjacentHTML("beforeend",
            `
              <div class="task">
                <input type="checkbox">
                <p>
                  ${task.name}
                </p>
                <button class="remove-button">
                  X
                </button>
              </div>  
            `
          );
          tasksCount++;
        }
        break;

      case 'completed':
        if (task.state === 'completed') {
          tasksList.insertAdjacentHTML("beforeend",
            `
              <div class="task">
                <input type="checkbox" checked>
                <p class="completed-task-name">
                  ${task.name}
                </p>
                <button class="remove-button">
                  X
                </button>
              </div>  
            `
          );
          tasksCount++;
        }
        break;
    }
  });

  if (tasksCount === 0) {
    emptyList.style.display = 'flex';
    tasksList.style.display = 'none';
  }
  else {
    emptyList.style.display = 'none';
    tasksList.style.display = 'block';
  }
}

function getLeftItemsCount() {
  let count = 0;

  tasks.forEach((task) => {
    if (task.state === 'active') {
      count++;
    }
  });

  return count;
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addNewTask() {
  if (taskInput.value) {
    tasks.push(
      {
        name: taskInput.value,
        state: 'active'
      }
    );

    saveTasks();
    loadPage();

    taskInput.value = '';
  }
}