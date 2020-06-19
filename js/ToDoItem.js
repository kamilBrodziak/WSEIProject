class ToDoItem {
    constructor(text = '', isDone = false, isTyping = true) {
        this.text = text;
        this.done = isDone;
        this.isRemoved = false;
        this.isTyping = isTyping;
        this.node = this.createNode();
    }

    getNode() {
        return this.node;
    }

    createNode() {
        const _this = this;
        const toDoText = createElement({type: 'textarea', classes: "toDoText", value:_this.text, textareaRows: 1, placeholder: 'Treść zadania...'});
        const toDoEdit = createElement({type: 'button', classes: "toDoEdit", value: "Edytuj"});
        const toDoRemove = createElement({type: 'button', classes: "toDoRemove", value: 'Usuń'});
        let toDoClasses = "toDoItem";
        let isBeingCreated = true;
        if(this.done) {
            toDoClasses += " done";
        }
        document.getElementsByTagName('body')[0].addEventListener('click', function (e) {
            if(e.target !== toDoText && e.target !== toDoEdit && _this.isTyping && !isBeingCreated) {
                toDoText.setAttribute("disabled", "disabled");
                toDoEdit.removeAttribute('disabled');
                _this.isTyping = false;
            }
            isBeingCreated = false;
        })
        const toDoItem =
            createElement({type: 'li', classes: toDoClasses},
                [toDoText, toDoEdit, toDoRemove]);
        if(!this.isTyping) {
            toDoText.setAttribute('disabled', 'disabled');
        } else {
            toDoEdit.setAttribute('disabled', 'disabled');
        }
        toDoText.addEventListener('keydown', function (e) {
            if(e.keyCode === 13) {
                e.preventDefault();
                toDoText.setAttribute("disabled", "disabled");
                toDoEdit.removeAttribute('disabled');
                _this.isTyping = false;
            } else {
                setTimeout(function(){
                    toDoText.style.cssText = 'padding:0';
                    toDoText.style.cssText = 'height:' + toDoText.scrollHeight + 'px';
                },0);
            }
        });
        toDoText.addEventListener('keyup', function(e) {
            _this.text = toDoText.value;
        })
        toDoText.addEventListener('focusout', function () {
            toDoText.setAttribute("disabled", "disabled");
            toDoEdit.removeAttribute('disabled');
            toDoText.setAttribute('readonly', 'readonly');
            toDoText.setAttribute('unselectable', 'off')
            _this.isTyping = false;
        });

        toDoEdit.addEventListener('click', function () {
            toDoText.removeAttribute('disabled');
            toDoEdit.setAttribute('disabled', 'disabled');
            toDoText.removeAttribute('readonly');
            toDoText.removeAttribute('unselectable');
            _this.isTyping = true;
        });

        toDoRemove.addEventListener('click', function (e) {
            toDoItem.remove();
            _this.isRemoved = true;
        })
        toDoItem.addEventListener('dblclick', function (e) {
            e.preventDefault();
            if(!_this.isTyping) {
                if(_this.done) {
                    toDoItem.classList.remove('done');
                } else {
                    toDoItem.classList.add('done');
                }
                _this.done = !_this.done;
            }
        })
        return toDoItem;
    }
}