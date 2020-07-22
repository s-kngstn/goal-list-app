// UI Variables
const form = document.querySelector('#goal-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#goal');

// LOAD EVENT LISTENERS
loadEventListeners();

function loadEventListeners() {
  // LOAD DOM EVENT
  document.addEventListener('DOMContentLoaded', getGoals);
  // ADD TASK EVENT LISTENER
  form.addEventListener('submit', addTask);
  // REMOVE GOAL EVENT
  taskList.addEventListener('click', removeGoal);
  // CLEAR GOAL EVENT
  clearBtn.addEventListener('click', clearGoals);
  // FILTER GOALS EVENT
  filter.addEventListener('keyup', filterGoals);
}

// GET GOALS FROM LOCAL STORAGE
function getGoals() {
  let goals;
  if (localStorage.getItem('goals') === null) {
    goals = [];
  } else {
    goals = JSON.parse(localStorage.getItem('goals'));
  }

  goals.forEach(function (goal) {
    // CREATE A LIST ELEMENT
    const li = document.createElement('li');
    // ADD CLASS TO LIST ELEMENT
    li.classList = 'collection-item';
    // CREAT TEXT NODE TO APPEND TO THE LIST ELEMENT
    li.appendChild(document.createTextNode(goal));
    // CREATE A NEW LINK('A' TAG) ELEMENT
    const link = document.createElement('a');
    // ADD CLASS TO THE NEW LINK ELEMENT
    link.className = 'delete-item secondary-content';
    // ADD ICON HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // APPEND THE LINK TO THE LIST ELEMENT
    li.appendChild(link);

    // APPEND LI TO UL
    taskList.appendChild(li);
  });
}

// ADD A TASK
function addTask(e) {
  if (taskInput.value === '') {
    alert('Please add a goal');
    return;
  }

  // CREATE A LIST ELEMENT
  const li = document.createElement('li');
  // ADD CLASS TO LIST ELEMENT
  li.classList = 'collection-item';
  // CREAT TEXT NODE TO APPEND TO THE LIST ELEMENT
  li.appendChild(document.createTextNode(taskInput.value));
  // CREATE A NEW LINK('A' TAG) ELEMENT
  const link = document.createElement('a');
  // ADD CLASS TO THE NEW LINK ELEMENT
  link.className = 'delete-item secondary-content';
  // ADD ICON HTML
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // APPEND THE LINK TO THE LIST ELEMENT
  li.appendChild(link);

  // APPEND LI TO UL
  taskList.appendChild(li);

  // STORE THE GOAL INTO LOCAL STORAGE
  storeGoalInLocalStorage(taskInput.value);

  // CLEAR INPUT
  taskInput.value = '';

  e.preventDefault();
}

// STORE GOAL
function storeGoalInLocalStorage(goal) {
  let goals;
  if (localStorage.getItem('goals') === null) {
    goals = [];
  } else {
    goals = JSON.parse(localStorage.getItem('goals'));
  }

  goals.push(goal);

  localStorage.setItem('goals', JSON.stringify(goals));
}

// REMOVE GOAL
function removeGoal(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure you want to remove this item?')) {
      e.target.parentElement.parentElement.remove();

      // REMOVE FROM LOCAL STORAGE
      removeGoalFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// REMOVE GOAL FROM LOCAL STORAGE
function removeGoalFromLocalStorage(goalItem) {
  let goals;
  if (localStorage.getItem('goals') === null) {
    goals = [];
  } else {
    goals = JSON.parse(localStorage.getItem('goals'));
  }

  goals.forEach(function (goal, index) {
    if (goalItem.textContent === goal) {
      goals.splice(index, 1);
    }
  });

  localStorage.setItem('goals', JSON.stringify(goals));
}

// CLEAR GOALS
function clearGoals() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearGoalsFromLocalStorage();
}

// CLEAR GOALS FROM LOCAL STORAGE

function clearGoalsFromLocalStorage() {
  localStorage.clear();
}

// FILTER THROUGH GOALS
function filterGoals(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (goal) {
    const item = goal.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      goal.style.display = 'block';
    } else {
      goal.style.display = 'none';
    }
  });
}
