const theme = document.getElementById('theme');
const newItemInput = document.getElementById("addItem");
const todoList = document.querySelector(".content ul");
const itemsLeft = document.querySelector(".items-left span");
const clearList = document.querySelector(".clear");

itemsLeft.innerHTML = document.querySelectorAll('.list-item input[type="checkbox"]').length;

theme.addEventListener('click', () => {
    document.querySelector('body').classList = [theme.checked ? 'theme-light' : 'theme-dark'];
});

newItemInput.addEventListener("keypress", (e)=>{ 
  if(e.charCode === 13 && newItemInput.value.length > 0) {
      createNewTodoItem(newItemInput.value);
      newItemInput.value = "";
  }
});

function createNewTodoItem(text) {
    const element = document.createElement("li");

    element.classList.add("flex-row");
    

    element.innerHTML = `
        <label  class="list-item">
        <input type="checkbox" name="todoItem" >
        <span class="checkmark"></span>
        <span class="text">${text}</span>
    </label>
    <span class="remove"></span>
    `;

    if (document.querySelector('.filter input[type="radio"]:checked').id === 'completed') {
        element.classList.add('hidden');
    }

    todoList.append(element);
    updateItemsCount(1);
    
}

function updateItemsCount(number) {
   itemsLeft.innerHTML = +itemsLeft.innerHTML + number ;
}

function removeTodoItem(element) {
    element.remove();
    updateItemsCount(-1);
}

todoList.addEventListener("click", (e)=>{
    if(e.target.classList.contains("remove")){
        removeTodoItem(e.target.parentElement);
    }
});



clearList.addEventListener("click", ()=> {
    document.querySelectorAll('.list-item input[type="checkbox"]:checked').forEach(item => {
       removeTodoItem(item.closest("li"));
    });
});

document.querySelectorAll(".filter input").forEach(radio => {
    radio.addEventListener("change", (e)=> {
      filterTodoItems(e.target.id);
    });
});

function filterTodoItems(id) {
    const allItems = todoList.querySelectorAll('li');

    switch(id) {
        case 'all':
            allItems.forEach(item => {
                item.classList.remove('hidden');
            })
            break;
        case 'active':
            allItems.forEach(item => {
                item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');;
            })
            break;
        case 'completed':
            allItems.forEach(item => {
                !item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');;
            })
            break;
    }
}