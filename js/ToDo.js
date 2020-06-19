class ToDo {
    constructor(title = "", isActive = true, toDoItemsJSON = []) {
        this.title = title;
        this.toDoItems = [];
        this.isRemoved = false;
        this.isActive = isActive;
        this.toDoItemsListNode = null;
        this.loadToDoItems(toDoItemsJSON);
        this.node = this.createNode();
    }

    loadToDoItems(toDoItemsJSON) {
        for(let i = 0; i < toDoItemsJSON.length; ++i) {
            const toDoItem = new ToDoItem(toDoItemsJSON[i].text, toDoItemsJSON[i].isDone, false);
            this.toDoItems.push(toDoItem);
        }
    }

    remove() {
        this.node.remove();
        this.isRemoved = true;
    }

    minimize() {
        this.node.classList.remove('active');
        this.isActive = false;
    }

    maximize() {
        this.node.classList.add('active');
        this.isActive = true;
    }

    getHeaderNode() {
        const _this = this;
        const toDoTitleInput =
            createElement({type: "input", inputType: "text", classes: "toDoTitleInput",value: _this.title, inputPlaceholder: "Tytuł..."})
        const toDoTitleLabel = createElement({type: "label"}, [toDoTitleInput]);
        const toDoTitle = createElement({type: "h3", classes: "toDoTitle"}, [toDoTitleLabel]);
        const toDoMinimize = createElement({type: "button", classes: "toDoMinimize"});
        const toDoDelete = createElement({type: "button", classes: "toDoDelete"});
        const toDoNavListItemM =
            createElement({type: "li", classes: "toDoNavListItem flexCentered"}, [toDoMinimize]);
        const toDoNavListItemD =
            createElement({type: "li", classes: "toDoNavListItem flexCentered"}, [toDoDelete]);
        const toDoNavList =
            createElement({type: 'ul', classes: "toDoNavList"}, [toDoNavListItemM, toDoNavListItemD]);
        const toDoNav =
            createElement({type: 'nav', classes: "toDoNav"}, [toDoNavList]);
        const toDoHeader =
            createElement({type: 'header', classes: "toDoHeader"}, [toDoTitle, toDoNav]);

        toDoTitleInput.addEventListener('keyup', function (e) {
            _this.title = toDoTitleInput.value;
        })
        toDoDelete.addEventListener('click', function () {
            _this.remove();
        });
        toDoMinimize.addEventListener('click', function () {
            if(_this.isActive) {
                _this.minimize();
            } else {
                _this.maximize();
            }
        });
        return toDoHeader;
    }

    getMainNode() {
        const toDoItemsNodes = [];
        for(let i = 0; i < this.toDoItems.length; ++i) {
            toDoItemsNodes.push(this.toDoItems[i].getNode());
        }



        const toDoItemsList = createElement({type: "ul", classes: "toDoItemsList"}, toDoItemsNodes);
        const toDoMain = createElement({type: 'main', classes: "toDoItems"}, [toDoItemsList]);
        this.toDoItemsListNode = toDoItemsList;
        return toDoMain;
    }

    addNewTodoItem() {
        const toDoItem = new ToDoItem();
        this.toDoItems.push(toDoItem);
        this.toDoItemsListNode.appendChild(toDoItem.getNode());
    }

    getFooterNode() {
        const _this = this;
        const addNewButton =
            createElement({type: "button", classes: "toDoItemsAddNew", html: "Dodaj nowe zadanie"});
        const clearDoneButton =
            createElement({type: 'button', classes: "toDoItemsClearDone", html: "Usuń wykonane zadania"});
        const toDoItemsNavListItemA =
            createElement({type: 'li', classes: "toDoItemsNavListItem flexCentered"}, [addNewButton]);
        const toDoItemsNavListItemC =
            createElement({type: 'li', classes: "toDoItemsNavListItem flexCentered"}, [clearDoneButton]);
        const toDoItemsNavList =
            createElement({type:'ul', classes:"toDoItemsNavList"}, [toDoItemsNavListItemA,toDoItemsNavListItemC]);
        const toDoItemsNav = createElement({type: "nav", classes:"toDoItemsNav"}, [toDoItemsNavList]);
        const toDoFooter = createElement({type: "footer", classes: "toDoFooter"}, [toDoItemsNav]);

        addNewButton.addEventListener('click', function(e) {
            e.preventDefault();
            _this.addNewTodoItem();
        });

        clearDoneButton.addEventListener('click', function (e) {
            e.preventDefault();
            for(let i in _this.toDoItems) {
                if(_this.toDoItems[i].done) {
                    _this.toDoItems[i].getNode().remove();
                    _this.toDoItems.splice(i, 1);
                }
            }
        })

        return toDoFooter;

    }

    createNode() {
        const toDoHeader = this.getHeaderNode();
        const toDoMain = this.getMainNode();
        const toDoFooter = this.getFooterNode();
        let toDoClasses = "toDo";
        if(this.isActive) {
            toDoClasses += " active";
        }
        const toDo =
            createElement({type:'article', classes: toDoClasses}, [toDoHeader, toDoMain, toDoFooter]);

        return toDo;
    }

    getNode() {
        return this.node;
    }
}