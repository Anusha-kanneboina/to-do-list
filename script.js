let tasks = [];


// Load tasks
function loadTasks(){

    let savedTasks = localStorage.getItem("tasks");

    if(savedTasks){
        tasks = JSON.parse(savedTasks);
    }

}


// Display tasks
function displayTasks(){

    document.getElementById("taskList").innerHTML = "";


    for(let i = 0; i < tasks.length; i++){


        let li = document.createElement("li");


        // Checkbox
        let checkBox = document.createElement("input");

        checkBox.type = "checkbox";

        checkBox.checked = tasks[i].completed;


        checkBox.onchange = function(event){

            event.stopPropagation();

            tasks[i].completed = checkBox.checked;

            localStorage.setItem("tasks", JSON.stringify(tasks));

            displayTasks();

            updateCounter();

            showDeleteButton();

        };


        li.appendChild(checkBox);


        let taskText = document.createElement("span");

        taskText.textContent = tasks[i].text;

       li.appendChild(taskText);


       let priority = document.createElement("span");

        priority.textContent = tasks[i].priority || "Medium";

        priority.classList.add(
        "priority",
        tasks[i].priority?.toLowerCase() || "medium"
        );

        li.appendChild(priority);
        
        let dueDate = document.createElement("span");

        dueDate.textContent = tasks[i].dueDate
        ? "Due: " + tasks[i].dueDate
        : "";

        dueDate.classList.add("due-date");

        li.appendChild(dueDate);


        if(tasks[i].completed){

            li.classList.add("completed");

        }
        


        // Edit button
        let editBtn = document.createElement("button");

        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';

        editBtn.classList.add("edit-btn");



        editBtn.onclick = function(event){

            event.stopPropagation();


            document.getElementById("taskInput").value = tasks[i].text;


            tasks.splice(i,1);


            localStorage.setItem("tasks", JSON.stringify(tasks));


            displayTasks();

            updateCounter();

            showDeleteButton();

        };



        // Delete button
        let deleteBtn = document.createElement("button");

        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

        deleteBtn.classList.add("delete-btn");



        deleteBtn.onclick = function(event){

            event.stopPropagation();


            tasks.splice(i,1);


            localStorage.setItem("tasks", JSON.stringify(tasks));


            displayTasks();

            updateCounter();

            showDeleteButton();

        };



        // Buttons container
        let btnContainer = document.createElement("div");

        btnContainer.classList.add("btn-container");


        btnContainer.appendChild(editBtn);

        btnContainer.appendChild(deleteBtn);


        li.appendChild(btnContainer);



        document.getElementById("taskList").appendChild(li);


    }

}


// Add task
function addTask(){


    let task = document.getElementById("taskInput").value.trim();


    if(task === ""){

        alert("Please enter a task!");

        return;

    }



   let priority = document.getElementById("priorityInput").value;
   let dueDate = document.getElementById("dueDateInput").value;

tasks.push({
    text: task,
    completed: false,
    priority: priority,
    dueDate: dueDate
});



    localStorage.setItem("tasks",JSON.stringify(tasks));


    displayTasks();

    updateCounter();

    showDeleteButton();



    document.getElementById("taskInput").value="";


}



// Clear all
function clearAll(){


    if(confirm("Are you sure you want to delete all tasks?")){


        tasks=[];


        localStorage.removeItem("tasks");


        displayTasks();

        updateCounter();

        showDeleteButton();


    }

}



// Delete selected
function deleteSelected(){


    tasks = tasks.filter(function(task){

        return task.completed === false;

    });



    localStorage.setItem("tasks",JSON.stringify(tasks));


    displayTasks();

    updateCounter();

    showDeleteButton();


}



// Show/hide delete selected button
function showDeleteButton(){


    let selected = tasks.some(function(task){

        return task.completed;

    });



    let btn = document.getElementById("deleteSelectedBtn");


    if(selected){

        btn.style.display="block";

    }

    else{

        btn.style.display="none";

    }


}



// Counter
function updateCounter(){


    let total = tasks.length;

    let completed = 0;

    let pending = 0;



    for(let i=0;i<tasks.length;i++){


        if(tasks[i].completed){

            completed++;

        }

        else{

            pending++;

        }

    }



    document.getElementById("totalTasks").textContent = total;

    document.getElementById("completedTasks").textContent = completed;

    document.getElementById("pendingTasks").textContent = pending;


}



// Enter key
document.getElementById("taskInput").addEventListener("keydown",function(event){


    if(event.key==="Enter"){

        addTask();

    }


});



// Dark mode
document.getElementById("themeBtn").onclick=function(){

    document.body.classList.toggle("dark");

};



// Start app
loadTasks();

displayTasks();

updateCounter();

showDeleteButton();
document.getElementById("searchInput")
.addEventListener("input", function(){

    let searchText = this.value.toLowerCase();


    let filteredTasks = tasks.filter(function(task){

        return task.text
        .toLowerCase()
        .includes(searchText);

    });


    displaySearchTasks(filteredTasks);

});
function displaySearchTasks(filteredTasks){


    document.getElementById("taskList").innerHTML="";


    for(let i=0; i<filteredTasks.length; i++){


        let li = document.createElement("li");


        li.textContent = filteredTasks[i].text;


        if(filteredTasks[i].completed){

            li.classList.add("completed");

        }


        document.getElementById("taskList")
        .appendChild(li);

    }

}

function filterTasks(type){

    let filteredTasks;

    if(type === "completed"){
        filteredTasks = tasks.filter(function(task){
            return task.completed === true;
        });
    }
    else if(type === "pending"){
        filteredTasks = tasks.filter(function(task){
            return task.completed === false;
        });
    }
    else{
        filteredTasks = tasks;
    }

    displaySearchTasks(filteredTasks);
}