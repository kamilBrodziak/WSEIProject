window.onload = function() {
    let mobileNav = new MobileNav(document.getElementById('siteNav'),
        document.getElementById('siteNavMobileButton'), 'mobileNavActive');
    mobileNav.addNav();
    mobileNav.closeOnResize();
    if(document.getElementById('toDos')) {
        let toDos = new ToDoController(document.getElementById('toDos'));
        toDos.newToDoButton(document.getElementById('toDosAdd'))
        toDos.minimizeAllButton(document.getElementById('toDosMinimize'));
        toDos.clearAllButton(document.getElementById('toDosClear'));
        toDos.saveButton(document.getElementById('toDosSave'));
    }
    if(document.getElementById('gameStartForm')) {
        let ticTacToeController = new TicTacToeController( document.getElementById('gameContainer'),
            document.getElementById('gameStartForm'));
        ticTacToeController.addStartByForm();
    }
};

function createElement(params, childs = []) {
    const element = document.createElement(params.type);
    if(params.classes) {
        element.className = params.classes;
    }
    if(params.id) {
        element.id = params.id
    }

    if(params.html) {
        element.innerHTML = params.html;
    }

    if(params.value) {
        element.value = params.value;
    }

    if(params.data) {
        for(let {dataName, dataValue} in params.data) {
            element.setAttribute('data-' + dataName, dataValue);
        }
    }

    if(params.type === "img") {
        element.src = params.src;
    }

    if(params.type === 'textarea') {
        if(params.placeholder) {
            element.setAttribute('placeholder', params.placeholder);
        }
        if(params.textareaRows) {
            element.setAttribute('rows', params.textareaRows);
        }
    }
    if(params.type === 'input') {
        if(params.inputType) {
            element.setAttribute('type', params.inputType);
        }

        if(params.inputMin) {
            element.setAttribute('min', params.inputMin);
        }
        if(params.inputMax) {
            element.setAttribute('max', params.inputMax);
        }
        if(params.inputPlaceholder) {
            element.setAttribute('placeholder', params.inputPlaceholder);
        }
    }
    if(childs) {
        for(let i = 0; i < childs.length; ++i) {
            element.appendChild(childs[i]);
        }
    }


    return element;
}

class MobileNav {
    constructor(nav, mobileButton, activeClass) {
        this.nav = nav;
        this.mobileButton = mobileButton;
        this.activeClass = activeClass;
    }

    addNav() {
        let _this = this;
        this.mobileButton.addEventListener('click', function() {
            if(_this.nav.classList.contains(_this.activeClass)) {
                _this.closeNav();
            } else {
                _this.showNav();
            }
        });
    }

    closeOnResize() {
        let _this = this;
        window.onresize = function (e) {
            _this.closeNav();
        }
    }

    closeNav() {
        this.nav.classList.remove(this.activeClass);
        this.mobileButton.classList.remove(this.activeClass)
        document.getElementsByTagName('body')[0].classList.remove(this.activeClass);
    }

    showNav() {
        this.nav.classList.add(this.activeClass);
        this.mobileButton.classList.add(this.activeClass);
        document.getElementsByTagName('body')[0].classList.add(this.activeClass);
    }
}







