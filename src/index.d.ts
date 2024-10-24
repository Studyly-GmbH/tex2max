declare module 'tex2max' {
    export interface UserOptions {
        // Enable to only allow single variable names.
        // Default: false
        onlySingleVariables?: boolean
        // Enable to let Maxima solve an algebraic equation.
        // Default: false
        handleEquation?: boolean
        // Add multiplication sign where multiplication is implied.
        // Default: true
        addTimesSign?: boolean
        // Enable to disallow decimal point separators . in numbers.
        // Default: false
        disallowDecimalPoints?: boolean
        // Enable to disallow decimal comma separators , in numbers.
        // Default: false
        disallowllowDecimalCommas?: boolean
        // Enable to convert all greek letters to names.
        // Default: false
        onlyGreekName?: boolean
        // Enable to convert all greek letters to symbols.
        // Default: false
        onlyGreekSymbol?: boolean
        // Enable to produce debugging info.
        // Default: false
        debugging?: boolean
    }

    export default class TeX2Max {
        constructor(userOptions?: UserOptions)

        toMaxima(latex: string): string
    }
}