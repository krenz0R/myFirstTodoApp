let listTasks = JSON.parse(localStorage.getItem("tasks")) || [
  {
    id: 1,
    title: "test",
    isDone: false,
  },
  {
    id: 2,
    title: "test",
    isDone: false,
  },
];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(listTasks));
}

function deleteTasks(id) {
  listTasks = listTasks.filter((task) => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(listTasks));
  renderTasks(listTasks);
}

function renderTasks(listTasks) {
  const listTasksEl = document.querySelector(".todo__list");
  listTasksEl.innerHTML = "";

  listTasks.forEach((element) => {
    const todoItemEl = document.createElement("li");
    todoItemEl.classList.add("todo__item");

    const todoChechboxEl = document.createElement("input");
    todoChechboxEl.type = "checkbox";
    todoChechboxEl.classList.add("todo__item-chechbox");

    const todoSpanEl = document.createElement("span");
    todoSpanEl.textContent = element.title;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("todo__item-deleteTask");
    deleteBtn.textContent = "X";

    deleteBtn.addEventListener("click", function () {
      deleteTasks(element.id);
    });

    if (element.isDone === true) {
      todoSpanEl.classList.add("done");
      todoChechboxEl.checked = true;
    } else {
      todoSpanEl.classList.remove("done");
    }

    // element.isDone === true
    //   ? todoSpanEl.classList.add("done") && todoChechboxEl.target.checked = true
    //   : todoSpanEl.classList.remove("done");

    todoChechboxEl.addEventListener("change", (event) => {
      if (event.target.checked) {
        element.isDone = !element.isDone;
        todoSpanEl.classList.add("done");
      } else {
        element.isDone = !element.isDone;
        todoSpanEl.classList.remove("done");
      }
      saveTasks();
    });

    todoItemEl.append(todoChechboxEl);
    todoItemEl.append(todoSpanEl);
    todoItemEl.append(deleteBtn);
    listTasksEl.append(todoItemEl);
  });
}

// renderTasks(listTasks);

function searchTasks() {
  const listCompliteTasks = listTasks.filter((item) => item.isDone === true);
  const listinCompleteTasks = listTasks.filter((item) => item.isDone === false);

  const value = todoVeribleEl.value;
  console.log(value);

  if (value === "Complete") {
    renderTasks(listCompliteTasks);
    console.log("Это комплит");
  } else if (value === "inComplete") {
    renderTasks(listinCompleteTasks);
    console.log("Это не комплит");
  } else {
    renderTasks(listTasks);
    todoVeribleEl.value = "ALL";
  }
}

function addTasks() {
  const inputTaskEl = document.querySelector(".add-task-overlay__input-task");
  const value = inputTaskEl.value.trimStart().trimEnd();

  if (!value) return;

  const newId = listTasks.length
    ? Math.max(...listTasks.map((t) => t.id)) + 1
    : 1;
  listTasks.push({ id: newId, title: value, isDone: false });

  console.log(value);

  inputTaskEl.value = "";
  saveTasks();
  renderTasks(listTasks);
}

const addButtonEl = document.querySelector(".add-task-overlay__apply-button");

addButtonEl.onclick = function () {
  addTasks();

  const dialogEl = document.querySelector("#addTask");
  dialogEl.close();
};

const taskSerchEl = document.querySelector(".todo__search");

taskSerchEl.addEventListener("input", function (event) {
  let value = taskSerchEl.value.toLowerCase();

  const searchedListTasks = listTasks.filter((item) =>
    item.title.toLowerCase().startsWith(value)
  );

  if (value) {
    renderTasks(searchedListTasks);
  } else {
    renderTasks(listTasks);
  }
  console.log(value);
});

const todoVeribleEl = document.querySelector(".todo__verible");
todoVeribleEl.value = "ALL";

todoVeribleEl.addEventListener("change", function () {
  searchTasks();
});

searchTasks();
// Найти все li (todo__item) где есть input с классом done
