console.log('baby trackr connected!');
//init date, time, amount pickers
$(document).ready(function(){
    $('select').formSelect();
});
$(document).ready(function(){
    $('.datepicker').datepicker();
});
$(document).ready(function(){
    $('.timepicker').timepicker();
});


//controller functions
//IO Object controller
const IOCtrl = (() => {
    //item constructor
    const IO = (id, date, time, formula, formulaAmt, formulaMeasure, breast, breastAmt, breastMeasure, pee, poop) => {
        this.id = id;
        this.date = date;
        this.time = time;
        this.formula = formula;
        this.formulaAmt = formulaAmt;
        this.formulaMeasure = formulaMeasure;
        this.breast = breast;
        this.breastAmt = breastAmt;
        this.breastMeasure = breastMeasure;
        this.pee = pee;
        this.poop = poop;        
    }
    const data = {
        io: [
            {id: 0, date: 'Apr 24, 2018', time: '04:50 PM', formula: true, formulaAmt: 2, formulaMeasure: 'oz', breast: true, breastAmt: .25, breastMeasure: 'oz', pee: true, poop: true},
            {id: 1, date: 'Apr 10, 2018', time: '01:50 PM', formula: false, formulaAmt: null, formulaMeasure: 'oz', breast: true, breastAmt: 1, breastMeasure: 'oz', pee: true, poop: false},
            {id: 2, date: 'Apr 21, 2018', time: '12:50 PM', formula: true, formulaAmt: 2, formulaMeasure: 'oz', breast: false, breastAmt: null, breastMeasure: 'oz', pee: false, poop: true},
        ]
    }
})();
//UI controller
const UICtrl = (function() {
    //private methods
    const UISelectors = {
        clearBtn: '.clear-btn',
        resetBtn: '.reset',
        submitBtn: '.add-btn',
        dateEntry: '#date',
        timeEntry: '#time',
        formulaCheck: '#formula',
        breastCheck: '#breast',
        formulaAmt: '#formulaAmt',
        breastAmt: '#breastAmt',
        formulaMeasurement: '#formulaMeasurement',
        breastMeasurement: '#breastMeasurement',
        peeCheck: '#pee',
        poopCheck: '#poop'
    }
    return {
        getIOInput: () => {
            return {
                dateEntry:document.querySelector(UISelectors.dateEntry).value,
                timeEntry:document.querySelector(UISelectors.timeEntry).value,
                formula:document.querySelector(UISelectors.formulaCheck).value,
                formulaAmt:document.querySelector(UISelectors.formulaAmt).value,
                formulaMeasure:document.querySelector(UISelectors.formulaMeasurement).value,
                breast:document.querySelector(UISelectors.breastCheck).value,
                breastAmt:document.querySelector(UISelectors.breastAmt).value,
                breastMeasure:document.querySelector(UISelectors.breastMeasurement).value,
                pee:document.querySelector(UISelectors.peeCheck).value,
                poop:document.querySelector(UISelectors.poopCheck).value
            }
        },
        //public methods
        getSelectors: () => {
            return UISelectors;
        }
    }
})();
//App controller
// const App = ((IOCtrl, UICtrl) => {

// })(IOCtrl, UICtrl);

// //Init App
// App.init();