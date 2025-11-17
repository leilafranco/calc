// ============================================================================ 
//  Calculadora Web - Base estática em JavaScript
// ---------------------------------------------------------------------------- 
//  Esta versão não realiza cálculos reais ainda. A ideia é mostrar como você
//  pode estruturar o código e onde adicionar cada parte da lógica quando estiver
//  pronto(a). Sinta-se à vontade para modificar e experimentar!
// ============================================================================

// Seleciona os elementos principais do display para você reutilizar depois
const displayHistory = document.getElementById("display-history");
const displayCurrent = document.getElementById("display-current");

// Seleciona todos os botões da calculadora
const buttons = document.querySelectorAll(".calculator-grid button");

// Estado inicial. Conforme você evoluir a calculadora, pode adicionar outros campos.
const calculatorState = {
  currentValue: "0", // número que está sendo digitado agora
  storedValue: null, // número guardado para aplicar o operador
  operator: null, // operador atual (+, -, ×, ÷)
  overwrite: false, // indica se o próximo número deve substituir o atual
};

/**
 * Atualiza o display com base no estado atual.
 */
function renderDisplay() {
  const { currentValue, storedValue, operator } = calculatorState;

  displayCurrent.textContent = currentValue;

  if (storedValue !== null && operator) {
    displayHistory.textContent = `${storedValue} ${operator}`;
  } else {
    displayHistory.textContent = "Pronto para calcular";
  }
}

/**
 * Adiciona dígitos ao número atual.
 * Se overwrite for true (por exemplo, após um operador), substitui o valor todo.
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
 * Lida com o botão de ponto decimal.
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
 * Guarda o operador escolhido e prepara para o próximo número.
 * Se já houver um operador pendente, primeiro realiza o cálculo.
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
 * Executa a operação matemática básica.
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
      result = current === 0 ? "Erro" : prev / current;
      break;
    default:
      return;
  }

  calculatorState.currentValue = String(result);
  calculatorState.operator = null;
  calculatorState.storedValue = result === "Erro" ? null : result;
  calculatorState.overwrite = true;
}

/**
 * Alterna o sinal do número atual.
 */
function toggleSign() {
  if (calculatorState.currentValue === "0") return;
  calculatorState.currentValue = calculatorState.currentValue.startsWith("-")
    ? calculatorState.currentValue.slice(1)
    : `-${calculatorState.currentValue}`;
}

/**
 * Converte o número atual em percentual.
 */
function convertPercent() {
  const value = parseFloat(calculatorState.currentValue) || 0;
  calculatorState.currentValue = String(value / 100);
}

/**
 * Limpa toda a calculadora.
 */
function resetCalculator() {
  calculatorState.currentValue = "0";
  calculatorState.storedValue = null;
  calculatorState.operator = null;
  calculatorState.overwrite = false;
}

/**
 * Handler principal de clique nos botões.
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

// Adiciona o listener de clique em cada botão
buttons.forEach((button) => button.addEventListener("click", handleButtonClick));

// Renderiza o display na primeira carga
renderDisplay();

