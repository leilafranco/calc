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

// Estado simples inicial. Você pode expandir conforme precisar.
const calculatorState = {
  currentValue: "0",
  historyValue: "",
  operator: null,
};

/**
 * Atualiza visualmente o display com os valores do estado.
 * Esta função será útil quando você implementar as operações de verdade.
 */
function renderDisplay() {
  displayCurrent.textContent = calculatorState.currentValue;
  displayHistory.textContent = calculatorState.historyValue || "Pronto para calcular";
}

/**
 * Handler genérico para clique nos botões.
 * Aqui estamos apenas exibindo no console o tipo de botão clicado para você
 * entender o fluxo. Depois, substitua pelos cálculos reais.
 */
function handleButtonClick(event) {
  const button = event.currentTarget;
  const number = button.dataset.number;
  const operator = button.dataset.operator;
  const action = button.dataset.action;

  if (number !== undefined) {
    console.log("Número clicado:", number);
    calculatorState.currentValue = number;
  } else if (operator) {
    console.log("Operador clicado:", operator);
    calculatorState.historyValue = `${calculatorState.currentValue} ${button.textContent}`;
  } else if (action) {
    console.log("Ação clicada:", action);
    if (action === "clear") {
      calculatorState.currentValue = "0";
      calculatorState.historyValue = "";
    }
  }

  renderDisplay();
}

// Adiciona o listener de clique em cada botão
buttons.forEach((button) => button.addEventListener("click", handleButtonClick));

// Garante que o display seja renderizado uma vez quando a página carrega
renderDisplay();

