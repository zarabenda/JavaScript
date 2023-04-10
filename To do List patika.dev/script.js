const liveToastButton = document.querySelector("#liveToastBtn");
const listArea = document.querySelector("#list");
const task = document.querySelector("#task");
const clearButton = document.createElement("button"); // Create new button element
clearButton.textContent = "Temizle"; // Set button text
clearButton.style.borderRadius = "12px";
clearButton.style.backgroundColor = "red";
clearButton.style.color = "white";
clearButton.style.float = "right";
clearButton.style.marginRight = "65px";
clearButton.style.marginBottom = "25px";
document.body.appendChild(clearButton); // Add button to the document

let counter = 1; // Initialize counter to 1

// Function to toggle strikethrough on list item
function toggleStrikeThrough(e) {
  const liElement = e.target;
  if (liElement.style.textDecoration === "line-through") {
    liElement.style.textDecoration = "none";
  } else {
    liElement.style.textDecoration = "line-through";
  }
}

// Function to delete list item
function deleteListItem(e) {
  const liElement = e.target;
  const parentElement = liElement.parentElement;
  const siblings = parentElement.children;
  liElement.remove();

  // Update the counter and indicator of the remaining list items
  counter = 1;
  for (let i = 0; i < siblings.length; i++) {
    siblings[i].innerHTML = counter + ". " + siblings[i].innerHTML.slice(2);
    counter++;
  }
}

// Function to clear all list items
function clearAllListItems() {
  while (listArea.firstChild) {
    listArea.removeChild(listArea.firstChild);
  }
  counter = 1; // Reset the counter to 1
}

// Add event listener to "Clear All" button
clearButton.addEventListener("click", clearAllListItems);

liveToastButton.addEventListener("click", function() {
  if (task.value !== "") {
    const liElement = document.createElement("li");
    listArea.appendChild(liElement);
    const taskTitle = task.value.charAt(0).toUpperCase() + task.value.slice(1); // Capitalize first letter of task
    liElement.innerHTML = counter + ". " + taskTitle; // Add counter to list item
    task.value = "";
    counter++; // Increment counter

    // Add event listener to toggle strikethrough on list item
    liElement.addEventListener("click", toggleStrikeThrough);

    // Add event listener to delete list item on double click
    liElement.addEventListener("dblclick", deleteListItem);
  }
});