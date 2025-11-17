// ============================================================================ 
//  Web Calculator - Static base in JavaScript
// ---------------------------------------------------------------------------- 
//  This version now performs real calculations. The idea is to show how you
//  can structure the code and where to add each part of the logic as you
//  progress. Feel free to modify and experiment!
// ============================================================================

// Selects the main display elements for you to reuse later
const displayHistory = document.getElementById("display-history");
const displayCurrent = document.getElementById("display-current");

// Selects all calculator buttons
const buttons = document.querySelectorAll(".calculator-grid button");

// Initial state. As you evolve the calculator, you can add other fields.
const calculatorState = {
  currentValue: "0", // number currently being typed
  storedValue: null, // number stored to apply the operator
  operator: null, // current operator (+, -, ×, ÷)
  overwrite: false, // indicates if the next number should replace the current one
};

/**
 * Updates the display based on the current state.
 */
function renderDisplay() {
  const { currentValue, storedValue, operator } = calculatorState;

  displayCurrent.textContent = currentValue;

  if (storedValue !== null && operator) {
    displayHistory.textContent = `${storedValue} ${operator}`;
  } else {
    displayHistory.textContent = "Ready to calculate";
  }
}

/**
 * Adds digits to the current number.
 * If overwrite is true (e.g., after an operator), replaces the entire value.
 */
function appendNumber(number) {
  if (calculatorState.overwrite) {
    calculatorState.currentValue = number;
    calculatorState.overwrite = false;
    return;
  }

  if (calculatorState.currentValue === "0") {
    calculatorState.currentValue = number;
  } else {
    calculatorState.currentValue += number;
  }
}

/**
 * Handles the decimal point button.
 */
function addDecimal() {
  if (calculatorState.overwrite) {
    calculatorState.currentValue = "0.";
    calculatorState.overwrite = false;
    return;
  }

  if (!calculatorState.currentValue.includes(".")) {
    calculatorState.currentValue += ".";
  }
}

/**
 * Stores the chosen operator and prepares for the next number.
 * If there's already a pending operator, performs the calculation first.
 */
function chooseOperator(operatorSymbol) {
  if (calculatorState.operator && !calculatorState.overwrite) {
    compute();
  } else {
    calculatorState.storedValue = parseFloat(calculatorState.currentValue);
  }

  calculatorState.operator = operatorSymbol;
  calculatorState.overwrite = true;
}

/**
 * Executes the basic mathematical operation.
 */
function compute() {
  if (calculatorState.operator === null || calculatorState.storedValue === null) {
    return;
  }

  const current = parseFloat(calculatorState.currentValue);
  const prev = calculatorState.storedValue;
  let result = 0;

  switch (calculatorState.operator) {
    case "+":
      result = prev + current;
      break;
    case "−":
      result = prev - current;
      break;
    case "×":
      result = prev * current;
      break;
    case "÷":
      result = current === 0 ? "Error" : prev / current;
      break;
    default:
      return;
  }

  calculatorState.currentValue = String(result);
  calculatorState.operator = null;
  calculatorState.storedValue = result === "Error" ? null : result;
  calculatorState.overwrite = true;
}

/**
 * Toggles the sign of the current number.
 */
function toggleSign() {
  if (calculatorState.currentValue === "0") return;
  calculatorState.currentValue = calculatorState.currentValue.startsWith("-")
    ? calculatorState.currentValue.slice(1)
    : `-${calculatorState.currentValue}`;
}

/**
 * Converts the current number to a percentage.
 */
function convertPercent() {
  const value = parseFloat(calculatorState.currentValue) || 0;
  calculatorState.currentValue = String(value / 100);
}

/**
 * Clears the entire calculator.
 */
function resetCalculator() {
  calculatorState.currentValue = "0";
  calculatorState.storedValue = null;
  calculatorState.operator = null;
  calculatorState.overwrite = false;
}

/**
 * Main button click handler.
 */
function handleButtonClick(event) {
  const button = event.currentTarget;
  const number = button.dataset.number;
  const operator = button.dataset.operator;
  const action = button.dataset.action;

  if (number !== undefined) {
    appendNumber(number);
  } else if (operator) {
    chooseOperator(button.textContent);
  } else if (action) {
    switch (action) {
      case "decimal":
        addDecimal();
        break;
      case "clear":
        resetCalculator();
        break;
      case "equals":
        compute();
        break;
      case "sign":
        toggleSign();
        break;
      case "percent":
        convertPercent();
        break;
      default:
        break;
    }
  }

  renderDisplay();
}

// Adds click listener to each button
buttons.forEach((button) => button.addEventListener("click", handleButtonClick));

// Renders the display on first load
renderDisplay();

