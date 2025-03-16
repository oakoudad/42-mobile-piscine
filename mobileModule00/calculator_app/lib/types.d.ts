export interface ButtonsProps {
    orientation?: 'PORTRAIT' | 'LANDSCAPE';
    expression: string[];
    result?: string;
    setResult: (result: string) => void;
    setExpression: (expression: string[]) => void;
}