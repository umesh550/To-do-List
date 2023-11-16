const listContainer = document.querySelector("#lst-of-tasks");
const input = document.getElementById("input-box");
const clearTasksBtn = document.getElementById("clear-task");

const LOCAL_STORAGE_LIST_KEY = "task.list";
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [{name: "Pay Bills",checked: "false",id: 1},{name: "Read a book",checked: "false",id: 2}];

document.getElementById("add").addEventListener("click", function () {
  if (input.value) {
    lists.push(createListElements(input.value));
  }
  input.value = null;
  saveAndRender();
});

function createListElements(name) {
  return { id: Date.now().toString(), name: name, checked: false };
}

function saveAndRender() {
  save();
  render();
}

listContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    lists = lists.filter(
      (list) => list.id !== e.target.parentElement.childNodes[1].dataset.listId
    );
    saveAndRender();
  }
  if (e.target.tagName === "INPUT") {
    lists.forEach((list) => {
      if (list.id === e.target.parentElement.childNodes[1].dataset.listId) {
        list.checked = !list.checked;
      }
    });
    saveAndRender();
  }
});

clearTasksBtn.addEventListener("click", () => {
  lists = lists.filter((list) => list.checked === false);
  saveAndRender();
});

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
}

function render() {
  clearElement(listContainer);
  lists.forEach((list) => {
    const li = document.createElement("li");
    li.innerText = list.name;
    li.dataset.listId = list.id;

    const btn = document.createElement("button");
    btn.setAttribute("class", "btn-delete");
    btn.innerText = "X";

    const check = document.createElement("input");
    check.type = "checkbox";
    if (list.checked) {
      check.checked = true;
      li.style.textDecoration = "line-through";
    }

    const div = document.createElement("div");
    div.setAttribute("class", "list-items");

    div.appendChild(check);
    div.appendChild(li);
    div.appendChild(btn);
    listContainer.appendChild(div);
  });
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

render();
