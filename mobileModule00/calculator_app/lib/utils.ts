import { evaluate } from 'mathjs';

interface ButtonProps {
    text: string;
    is_number?: boolean;
    is_copy?: boolean;
    color?: boolean;
    backgroundColor?: boolean;
}

export const buttonsGroups:ButtonProps[][] = [
    [
        { text: '7', is_number: true },
        { text: '8', is_number: true },
        { text: '9', is_number: true },
        { text: 'C',  color: true },
        { text: 'AC', backgroundColor: true }
    ],
    [
        { text: '4', is_number: true },
        { text: '5', is_number: true },
        { text: '6', is_number: true },
        { text: '÷', color: true },
        { text: '×', color: true }
    ],
    [
        { text: '1', is_number: true },
        { text: '2', is_number: true },
        { text: '3', is_number: true },
        { text: '-', color: true },
        { text: '+', color: true }
    ],
    [
        { text: '', is_copy: true },
        { text: '0', is_number: true },
        { text: '.'},
        { text: '00', is_number: true },
        { text: '=', backgroundColor: true },
    ]
]
export const operators = ['+', '-', '×', '÷'];

const getLatestNumber = (expression: string[]) => {
    let latestNumber = '';
    for (let i = expression.length - 1; i >= 0; i--) {
        if (operators.includes(expression[i])) break;
        latestNumber = expression[i] + latestNumber;
    }
    return latestNumber;
}

export function handleButtonPress(expression: string[], setResult: (result: string) => void, setExpression: (expression: string[]) => void, button: ButtonProps) {
    if (button.text === 'C')
    {
        expression.pop();
        setExpression([...expression]);
        if (expression.length === 0) setExpression(['0']);
    }
    else if (button.text === 'AC')
    {
        setExpression(['0']);
        setResult('0');
    }
    else if (operators.includes(button.text)) {
        if (operators.includes(expression[expression.length - 1])) expression.pop()
        setExpression([...expression, button.text]);
    }
    else if (button.is_number) {
        if (expression.length === 1 && expression[0] === '0') setExpression([button.text]);
        else setExpression([...expression, button.text]);
    }
    else if (button.text === '.'){
        const latestNumber = getLatestNumber(expression);
        if (!latestNumber.includes('.')) setExpression([...expression, button.text]);
    }
}

export function calculate(expression: string[], setResult: (result: string) => void) {
    var tmp_expression = expression.join('')

    if ([...operators].includes(expression[expression.length - 1])) tmp_expression = tmp_expression.slice(0, -1);
    tmp_expression = tmp_expression.replaceAll('×', '*').replaceAll('÷', '/');
    try {
        const result = evaluate(tmp_expression)

        if (Number.isFinite(result))
            setResult(result)
        else if (Number.isNaN(result))
            setResult('Indeterminate')
        else
            setResult('Undefined')
    }
    catch(e){
        setResult('Error')
    }
}