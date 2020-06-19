class ToDoController {
    constructor(container) {
        this.container = container;
        this.toDoList = [];
        this.loadFromLocalStorage();
    }

    saveToLocalStorage() {
        const toDosJSON = [];
        const toDoList = this.toDoList;
        console.log(this.toDoList);
        for(let i = 0; i < toDoList.length; ++i) {
            if(!toDoList[i].isRemoved) {
                const toDoJSON = {
                    title: toDoList[i].title,
                    isActive: toDoList[i].isActive,
                }

                const toDoItemsJSON = []
                const toDoItems = toDoList[i].toDoItems;
                for(let j = 0; j < toDoItems.length; ++j) {
                    if(!toDoItems[j].isRemoved && toDoItems[j].text !== "") {
                        const toDoItemJSON = {
                            text: toDoItems[j].text,
                            isDone: toDoItems[j].done
                        }
                        toDoItemsJSON.push(toDoItemJSON);
                    }
                }
                toDoJSON.toDoItems = toDoItemsJSON;
                toDosJSON.push(toDoJSON);
            }
        }
        console.log(JSON.stringify(toDosJSON));
        localStorage.setItem("toDos", JSON.stringify(toDosJSON));
    }

    loadFromLocalStorage() {
        const toDosJSON = JSON.parse(localStorage.getItem('toDos'));
        if(toDosJSON) {
            for(let i = 0; i < toDosJSON.length; ++i) {
                const toDo = new ToDo(toDosJSON[i].title, toDosJSON[i].isActive,toDosJSON[i].toDoItems);
                this.toDoList.push(toDo);
                this.container.appendChild(toDo.getNode());
            }
        }
    }

    newToDoButton(button) {
        let _this = this;

        button.addEventListener('click', function () {
            let toDo = new ToDo();
            _this.toDoList.push(toDo);
            _this.container.appendChild(toDo.getNode());
        });
    }

    minimizeAllButton(button) {
        let _this = this;
        button.addEventListener('click', function () {
            for(let i = 0; i < _this.toDoList.length; ++i) {
                let toDo = _this.toDoList[i];
                if(!toDo.removed) {
                    toDo.minimize();
                }
            }
        });
    }

    clearAllButton(button) {
        let _this = this;
        button.addEventListener('click', function () {
            for(let i = 0; i < _this.toDoList.length; ++i) {
                let toDo = _this.toDoList[i];
                if(!toDo.removed) {
                    toDo.remove();
                }
            }
            _this.toDoList = [];
        });
    }

    saveButton(button) {
        const _this = this;
        button.addEventListener('click', function (e) {
            _this.saveToLocalStorage();
        })
    }
}