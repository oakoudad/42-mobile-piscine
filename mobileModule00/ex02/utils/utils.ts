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