import moment from "moment";

function saveToLocalStorage(data) {
  localStorage.setItem("tasks", JSON.stringify(data));
}

function loadFromLocalStorage() {
  let data = JSON.parse(localStorage.getItem("tasks"));
  if (data) {
    data = data.map((task) => ({
      ...task,
      startTime: moment(task.startTime),
      endTime: moment(task.endTime),
    }));
    return data
  }
  return [];
}

function addTaskToLocalStorage(newTask) {
  const tasks = loadFromLocalStorage();
  tasks.push(newTask);
  saveToLocalStorage(tasks);
}

function editTaskToLocalStorage(id, editedTask) {
  const tasks = loadFromLocalStorage();
  const index = tasks.findIndex((task) => task.id === id);
  tasks[index] = editedTask;
  saveToLocalStorage(tasks);
}

function deleteTaskFromLocalStorage(id) {
  let tasks = loadFromLocalStorage();
  tasks = tasks.filter((task) => task.id !== id);
  saveToLocalStorage(tasks);
}

function updateDateForTaskToLocalStorage(id, newTime) {
  const tasks = loadFromLocalStorage();
  const index = tasks.findIndex((task) => task.id === id);
  const newDate = newTime.format("YYYY-MM-DD");
  const oldStartTime = tasks[index].startTime.format("HH:mm:ss");
  const oldEndTime = tasks[index].endTime.format("HH:mm:ss");
  const newStartTime = moment(newDate + " " + oldStartTime);
  const newEndTime = moment(newDate + " " + oldEndTime);
  tasks[index] = {
    ...tasks[index],
    startTime: newStartTime,
    endTime: newEndTime,
  };
  saveToLocalStorage(tasks);
}

export {
  loadFromLocalStorage,
  addTaskToLocalStorage,
  editTaskToLocalStorage,
  deleteTaskFromLocalStorage,
  updateDateForTaskToLocalStorage
};
