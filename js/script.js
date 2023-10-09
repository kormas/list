{
    let tasks = [
        {
            content: "przykład nr 1",
            done: false,
        },
        {
            content: "przykład nr 2",
            done: true,
        },
    ];

    let hideCompletedTasks = false;
    
    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, done: false }
        ];
        render();
    };

    const toggleTaskDone = (index) => {
        tasks = tasks.map((task, taskIndex) => 
            taskIndex === index ? { ...task, done: !task.done } : task
        );
        render();
    };    

    const removeTask = (index) => {
        tasks = tasks.filter((_, taskIndex) => taskIndex !== index);
        render();
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");
        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    }

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="list__block ${task.done && hideCompletedTasks ? "list__block--hidden" : ""}">
                    <div class="list__button">
                        <p class="list__leftParagraph">
                            <button class="list__markButton js-done">${task.done ? "✓" : ""}</button>
                        </p>
                    </div>
                    <div class="list__item">
                        <p class="list__content ${task.done ? "list__content--done" : ""}">
                            ${task.content}
                        </p>
                    </div>
                    <div class="list__button">
                        <p class="list__rightParagraph">
                            <button class="list__binButton js-remove"><span>🗑️</span></button>
                        </p>
                    </div>
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    let container = document.querySelector(".js-buttonsContainer");

    const renderButtons = () => {

        if (tasks.length === 0) {
            container.innerHTML = "";
            return;
        }

        const allDone = tasks.every(task => task.done);
        
        const toggleAllButtonHTML = `
            <button class="section__button js-toggleAll">${hideCompletedTasks ? "Pokaż ukończone" : "Ukryj ukończone"}</button>
        `;
    
        const doneAllButtonHTML = `
            <button class="section__button js-doneAll ${allDone ? "section__button--disabled" : ""}" ${allDone ? "disabled" : ""}>Ukończ wszystkie</button>
        `;
    
        container.innerHTML = toggleAllButtonHTML + doneAllButtonHTML;
    };

    const markAllTasksDone = () => {
        tasks = tasks.map(task => ({ ...task, done: true }));
        render();
    };

    const bindButtonsEvents = () => {
        const doneAllButton = document.querySelector(".js-doneAll");
        const toggleAllButton = document.querySelector(".js-toggleAll");
        
        doneAllButton.addEventListener("click", () => {
            if (!doneAllButton.hasAttribute("disabled")) {
                markAllTasksDone();
            }
        });
        
        toggleAllButton.addEventListener("click", () => {
            hideCompletedTasks = !hideCompletedTasks;
            render();
        });
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        const newTaskElement = document.querySelector(".js-newTask");

        newTaskElement.value = "";
        newTaskElement.focus();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}