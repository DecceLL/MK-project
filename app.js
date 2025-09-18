        let currentOperand = '0';
        let previousOperand = '';
        let operation = null;
        let shouldResetScreen = false;

        const currentOperandElement = document.getElementById('current-operand');
        const previousOperandElement = document.getElementById('previous-operand');

        function updateDisplay() {
            currentOperandElement.textContent = currentOperand;
            previousOperandElement.textContent = previousOperand;
        }

        function appendNumber(number) {
            if (currentOperand === '0' || shouldResetScreen) {
                currentOperand = '';
                shouldResetScreen = false;
            }
            
            if (number === '.' && currentOperand.includes('.')) return;
            
            currentOperand += number;
            updateDisplay();
        }

        function appendOperator(op) {
            if (currentOperand === '') return;
            
            if (previousOperand !== '') {
                calculate();
            }
            
            operation = op;
            previousOperand = `${currentOperand} ${getOperatorSymbol(op)}`;
            shouldResetScreen = true;
            updateDisplay();
        }

        function calculate() {
            if (operation === null || shouldResetScreen) return;
            
            const prev = parseFloat(previousOperand);
            const current = parseFloat(currentOperand);
            let result;
            
            switch (operation) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    result = current === 0 ? 'Ошибка!' : prev / current;
                    break;
                default:
                    return;
            }
            
            currentOperand = result.toString();
            operation = null;
            previousOperand = '';
            shouldResetScreen = true;
            updateDisplay();
        }

        function clearAll() {
            currentOperand = '0';
            previousOperand = '';
            operation = null;
            shouldResetScreen = false;
            updateDisplay();
        }

        function backspace() {
            if (currentOperand.length === 1) {
                currentOperand = '0';
            } else {
                currentOperand = currentOperand.slice(0, -1);
            }
            updateDisplay();
        }

        function getOperatorSymbol(op) {
            switch (op) {
                case '+': return '+';
                case '-': return '-';
                case '*': return '×';
                case '/': return '÷';
                default: return '';
            }
        }

        // Инициализация отображения
        updateDisplay();