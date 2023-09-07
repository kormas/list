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

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, done: false }
        ];
        render();
    };

    const toggleTaskDone = (index) => {
        const task = tasks[index];
        tasks = [
            ...tasks.slice(0, index),
            { ...task, done: !task.done },
            ...tasks.slice(index + 1)
        ];
        render();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1)
        ];
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
                <li class="list__block">
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

    // const renderButtons = () => {};

    // const bindButtonsEvents = () => {};

    const render = () => {
       renderTasks();
    //    renderButtons();

       bindRemoveEvents();
       bindToggleDoneEvents();
    //    bindButtonsEvents();
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