const gridMinimum = 1;
const gridMaximum = 100;

let numbers = [];
let numbers2 = [];

for (let i = gridMinimum; i <= gridMaximum; i++) {
  numbers.push(i);
  numbers2.push(i);
}
numbers.forEach((number, index) => {
  document.getElementById(
    "grid"
  ).innerHTML += `<div class ='node' id='node${number}'>${number}</div>`;
  document.getElementById(
    "grid2"
  ).innerHTML += `<div class ='node' id='nodeb${number}'>${number}</div>`;
});
let binarySteps = 0;
let linearSteps = 0;
let timeouts = [];
// Add this function to update speed display
document.getElementById("speed").addEventListener("input", function () {
  const speed = this.value;
  document.getElementById("speed-value").textContent =
    (speed / 1000).toFixed(1) + "s";
});

// Then modify timeout values in both search functions to use the speed value
const getSpeed = () => {
  return parseInt(document.getElementById("speed").value);
};
// Replace binarySearchCall function
const binarySearchCall = () => {
  Clear();
  const targetnum = parseInt(document.getElementById("target").value);

  // Validate input
  if (isNaN(targetnum) || targetnum < 1 || targetnum > 100) {
    document.getElementById("answer").innerHTML =
      "<br>Please enter a valid number between 1 and 100";
    return;
  }

  // Reset counters
  binarySteps = 0;
  linearSteps = 0;

  // Add step counters to the DOM
  document.getElementById("grid-title-binary").innerHTML =
    "Binary Search: 0 steps";
  document.getElementById("grid-title-linear").innerHTML =
    "Linear Search: 0 steps";

  binarySearch(numbers, targetnum);
  linearSearch(1, targetnum);
};

// Improve Clear function
const Clear = () => {
  // Clear all timeouts
  timeouts.forEach((id) => clearTimeout(id));
  timeouts = [];

  document.getElementById("grid").innerHTML = "";
  document.getElementById("grid2").innerHTML = "";
  document.getElementById("answer").innerHTML = "<br>Answer: ";

  // Reset step counters
  binarySteps = 0;
  linearSteps = 0;

  // Regenerate grids
  numbers.forEach((number) => {
    document.getElementById(
      "grid"
    ).innerHTML += `<div class='node' id='node${number}'>${number}</div>`;
    document.getElementById(
      "grid2"
    ).innerHTML += `<div class='node' id='nodeb${number}'>${number}</div>`;
  });
};

// Update binarySearch function
const binarySearch = (array, target, min, max) => {
  if (min === undefined) min = 1;
  if (max === undefined) max = array.length;

  let mid = Math.floor((max - min) / 2 + min);
  let elem = document.getElementById("node" + mid.toString());

  binarySteps++;
  document.getElementById(
    "grid-title-binary"
  ).innerHTML = `Binary Search: ${binarySteps} steps`;

  // Highlight the current range
  for (let i = min; i <= max; i++) {
    let rangeElem = document.getElementById("node" + i.toString());
    rangeElem.style.opacity = "1";
  }

  // Fade out elements outside the range
  for (let i = 1; i < min; i++) {
    let outsideElem = document.getElementById("node" + i.toString());
    outsideElem.style.opacity = "0.3";
  }
  for (let i = max + 1; i <= 100; i++) {
    let outsideElem = document.getElementById("node" + i.toString());
    outsideElem.style.opacity = "0.3";
  }

  elem.style.backgroundColor = "#838718";
  elem.innerHTML = `<span class="step-label">Step ${binarySteps}</span>${mid}`;

  if (mid == target) {
    elem.style.backgroundColor = "#4CAF50";
    elem.innerHTML = `<span class="found-label">Found in ${binarySteps} steps!</span>`;
    elem.classList.add("found");
    document.getElementById(
      "answer"
    ).innerHTML = `<br>Answer: ${mid} found!<br>Binary Search: ${binarySteps} steps`;
    return mid;
  } else if (mid < target) {
    elem.style.backgroundColor = "#590c0c";
    elem.innerHTML = `<span class="direction">Too small →</span>`;

    const timeoutId = setTimeout(() => {
      binarySearch(array, target, mid + 1, max);
    }, getSpeed());
    timeouts.push(timeoutId);
  } else if (mid > target) {
    elem.style.backgroundColor = "#590c0c";
    elem.innerHTML = `<span class="direction">← Too large</span>`;

    const timeoutId = setTimeout(() => {
      binarySearch(array, target, min, mid - 1);
    }, getSpeed());
    timeouts.push(timeoutId);
  }
};

// Update linearSearch function
const linearSearch = (current, target) => {
  if (current > 100) {
    document.getElementById(
      "answer"
    ).innerHTML += `<br>Linear Search: Not found`;
    return null;
  }

  let elem = document.getElementById("nodeb" + current.toString());
  linearSteps++;
  document.getElementById(
    "grid-title-linear"
  ).innerHTML = `Linear Search: ${linearSteps} steps`;

  elem.style.backgroundColor = "#838718";
  elem.innerHTML = `<span class="step-label">Step ${linearSteps}</span>${current}`;

  if (current == target) {
    elem.style.backgroundColor = "#4CAF50";
    elem.innerHTML = `<span class="found-label">Found in ${linearSteps} steps!</span>`;
    elem.classList.add("found");
    document.getElementById(
      "answer"
    ).innerHTML += `<br>Linear Search: ${linearSteps} steps`;
    return current;
  } else {
    const timeoutId = setTimeout(() => {
      elem.style.backgroundColor = "#590c0c";
      linearSearch(current + 1, target);
    }, getSpeed());
    timeouts.push(timeoutId);
  }
};
