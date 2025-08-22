let draggedTask = '';

document.querySelectorAll('.js-card').forEach((card, index) => {
  let enterAndLeaveCounter = 0;

  card.addEventListener('dragover', (event) => {
    event.preventDefault();
    card.classList.add('card-dragover');
  });

  card.addEventListener('dragenter', () => {
    enterAndLeaveCounter++
    console.log('card ' + index + ', counter = ' + enterAndLeaveCounter);
  });

  card.addEventListener('dragleave', () => {
    enterAndLeaveCounter--;
    console.log('card ' + index + ', counter = ' + enterAndLeaveCounter);
    if (enterAndLeaveCounter === 0)
      card.classList.remove('card-dragover');
  });

  card.addEventListener('drop', () => {
    enterAndLeaveCounter = 0;
    card.append(draggedTask);
    card.classList.remove('card-dragover');
  });
});

document.querySelectorAll('.js-task').forEach((task) => {
  task.addEventListener('dragstart', () => {
    draggedTask = task;
  });
});