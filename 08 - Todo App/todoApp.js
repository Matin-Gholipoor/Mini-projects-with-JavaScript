let tasks = JSON.parse(localStorage.getItem('tasks')) ||
  [
    {
      name: 'task 1',
      state: 'completed'
    },
    {
      name: 'task 2',
      state: 'active'
    },
    {
      name: 'task 3',
      state: 'completed'
    }
  ];

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


loadPage();

allTasksTab.addEventListener('click', () => {
  showTasks('all');

  tabs.forEach((tab, index) => {
    if (tab.classList.contains('current-tab')) {
      tab.classList.remove('current-tab');
      tab.classList.add('tab');
    }

    if (index === 0) {
      tab.classList.remove('current-tab');
      tab.classList.add('current-tab');
    }
  });
});
activeTasksTab.addEventListener('click', () => {
  showTasks('active');

  tabs.forEach((tab, index) => {
    if (tab.classList.contains('current-tab')) {
      tab.classList.remove('current-tab');
      tab.classList.add('tab');
    }

    if (index === 1) {
      tab.classList.remove('tab');
      tab.classList.add('current-tab');
    }
  });
});
completedTasksTab.addEventListener('click', () => {
  showTasks('completed');

  tabs.forEach((tab, index) => {
    if (tab.classList.contains('current-tab')) {
      tab.classList.remove('current-tab');
      tab.classList.add('tab');
    }

    if (index === 2) {
      tab.classList.remove('tab');
      tab.classList.add('current-tab');
    }
  });
});

function loadPage() {
  dateText.innerHTML = dayjs().format('dddd, MMM D');

  showTasks('all');

  leftItemsText.textContent = `${getLeftItemsCount()} items left`;
}

function showTasks(state) {
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