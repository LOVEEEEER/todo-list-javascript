const tasks = [
  {
    id: "1138465078061",
    completed: false,
    text: "Посмотреть новый урок по JavaScript",
  },
  {
    id: "1138465078062",
    completed: false,
    text: "Выполнить тест после урока",
  },
  {
    id: "1138465078063",
    completed: false,
    text: "Выполнить ДЗ после урока",
  },
];

const tasksList = document.querySelector(".tasks-list");
const renderTasks = (tasks) => {
  tasks.forEach((task) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.dataset.taskId = task.id;

    const taskItemMainContainer = document.createElement("div");
    taskItemMainContainer.className = "task-item__main-container";
    taskItem.append(taskItemMainContainer);

    const taskItemMainContent = document.createElement("div");
    taskItemMainContent.className = "task-item__main-content";
    taskItemMainContainer.append(taskItemMainContent);

    const checkboxForm = document.createElement("form");
    checkboxForm.className = "checkbox-form";
    taskItemMainContent.append(checkboxForm);

    const inputCheckBox = document.createElement("input");
    inputCheckBox.className = "checkbox-form__checkbox";
    inputCheckBox.type = "checkbox";
    inputCheckBox.id = task.id;

    const labelTask = document.createElement("label");
    labelTask.setAttribute("for", task.id);

    checkboxForm.append(inputCheckBox);
    checkboxForm.append(labelTask);

    const taskItemText = document.createElement("span");
    taskItemText.textContent = task.text;
    taskItemText.className = "task-item__text";

    taskItemMainContent.append(taskItemText);

    const taskItemDeleteButton = document.createElement("button");
    taskItemDeleteButton.textContent = "Удалить";
    taskItemDeleteButton.classList.add(
      "task-item__delete-button",
      "default-button",
      "delete-button"
    );
    taskItemMainContainer.append(taskItemDeleteButton);

    tasksList.append(taskItem);
  });
};

renderTasks(tasks);

const createTaskForm = document.body.querySelector(".create-task-block");

createTaskForm.addEventListener("submit", (event) => {
  const isExistErrorMessage = createTaskForm.querySelector(
    ".error-message-block"
  );
  if (isExistErrorMessage) {
    isExistErrorMessage.remove();
  }
  event.preventDefault();
  let inputValue = createTaskForm
    .querySelector(".create-task-block__input")
    .value.trim();
  const randomId = Date.now();
  const spanError = document.createElement("span");
  spanError.classList.add("error-message-block");
  const isExistTask = tasks.some(
    (task) => task.text.toLowerCase() === inputValue.toLowerCase()
  );

  if (!inputValue) {
    spanError.textContent = "Название задачи не должно быть пустым";
    createTaskForm.append(spanError);
  } else if (isExistTask) {
    spanError.textContent = "Задача с таким названием уже существует.";
    createTaskForm.append(spanError);
  } else {
    const newTask = [
      {
        id: String(randomId),
        completed: false,
        text: inputValue,
      },
    ];
    tasks.push(...newTask);
    renderTasks(newTask);
  }

  if (document.body.className.includes("dark-theme")) {
    const taskItem = tasksList.querySelectorAll(".task-item");
    taskItem.forEach((task) => {
      task.style.color = "#ffffff";
    });
  }
  const allButtons = document.querySelectorAll("button");
  allButtons.forEach((button) => {
    button.style.border = "1px solid #ffffff";
  });
  event.target.taskName.value = "";
});

let modalWindow = document.createElement("div");
modalWindow.classList.add("modal-overlay", "modal-overlay_hidden");

modalWindow.innerHTML = `<div class="delete-modal">
<h3 class="delete-modal__question">
  Вы действительно хотите удалить эту задачу?
</h3>
<div class="delete-modal__buttons">
  <button class="delete-modal__button delete-modal__cancel-button">
    Отмена
  </button>
  <button class="delete-modal__button delete-modal__confirm-button">
    Удалить
  </button>
</div>
</div>`;

tasksList.append(modalWindow);

let datasetOfTask;
tasksList.addEventListener("click", (event) => {
  const { target } = event;
  const isTargetOnDeleteButton = target.className.includes(
    "task-item__delete-button"
  );
  const isTargetOnCancelButton = target.className.includes(
    "delete-modal__cancel-button"
  );
  const isTargetOnConfirmDeleteButton = target.className.includes(
    "delete-modal__confirm-button"
  );
  if (isTargetOnDeleteButton) {
    modalWindow.classList.remove("modal-overlay_hidden");
    datasetOfTask = target.closest(".task-item").dataset.taskId;
  } else if (isTargetOnCancelButton) {
    modalWindow.classList.add("modal-overlay_hidden");
  } else if (isTargetOnConfirmDeleteButton) {
    const indexOfDeletingTask = tasks.findIndex(
      (task) => task.id === datasetOfTask
    );
    tasks.splice(indexOfDeletingTask, 1);
    modalWindow.classList.add("modal-overlay_hidden");
    tasksList.querySelector(`[data-task-id="${datasetOfTask}"]`).remove();
  }
});

document.addEventListener("keyup", (event) => {
  const { key } = event;
  if (key === "Tab") {
    document.body.classList.toggle("dark-theme");
    if (document.body.className.includes("dark-theme")) {
      document.body.style.backgroundColor = "#24292E";
      const taskItem = tasksList.querySelectorAll(".task-item");
      taskItem.forEach((task) => {
        task.style.color = "#ffffff";
      });
      const allButtons = document.querySelectorAll("button");
      allButtons.forEach((button) => {
        button.style.border = "1px solid #ffffff";
      });
    } else {
      document.body.style.backgroundColor = "initial";
      const taskItem = tasksList.querySelectorAll(".task-item");
      taskItem.forEach((task) => {
        task.style.color = "initial";
      });
      const allButtons = document.querySelectorAll("button");
      allButtons.forEach((button) => {
        button.style.border = "none";
      });
    }
  }
});
