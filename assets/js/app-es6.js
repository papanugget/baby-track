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
        items: [
            {id: 0, date: 'Apr 24, 2018', time: '04:50 PM', formula: true, formulaAmt: 2, formulaMeasure: 'oz', breast: true, breastAmt: .25, breastMeasure: 'oz', pee: true, poop: true}, 
            {id: 1, date: 'Apr 10, 2018', time: '01:50 PM', formula: false, formulaAmt: null, formulaMeasure: 'oz', breast: true, breastAmt: 1, breastMeasure: 'oz', pee: true, poop: false},
            {id: 2, date: 'Apr 21, 2018', time: '12:50 PM', formula: true, formulaAmt: 2, formulaMeasure: 'oz', breast: false, breastAmt: null, breastMeasure: 'oz', pee: false, poop: true},
        ],
        currentItem: null,
        totalFormulaAmt: 0,
        totalBreastAmt: 0,
        totalPee: 0,
        totalPoop: 0
    }
    //public method
    return {
        getData: () => {
            return data.items;
        },
        addFeed: function(date, time, formula, formulaAmt, formulaMeasure, breast, breastAmt, breastMeasure, pee, poop){
            console.log(date);
        },
        logdata: () => {
            return data;
        }
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
        formulaAmount: '#formulaAmt',
        breastAmount: '#breastAmt',
        formulaMeasurement: '#formulaMeasure',
        breastMeasurement: '#breastMeasure',
        peeCheck: '#pee',
        poopCheck: '#poop',
        output: ".feedContent"
    }
    return {
        populateOutput: (items) => {
            let html = '';
            //loop through each item and check if date is same
            items.forEach((item) => {
                html += "Hello World";
            });
            // insert items into DOM
            document.querySelector(UISelectors.output).textContent = html;
        },
        getIOInput: () => {
            return {
                dateEntry:document.querySelector(UISelectors.dateEntry).value,
                timeEntry:document.querySelector(UISelectors.timeEntry).value,
                formula:document.querySelector(UISelectors.formulaCheck).value,
                formulaAmt:document.querySelector(UISelectors.formulaAmount).value,
                formulaMeasure:document.querySelector(UISelectors.formulaMeasurement).value,
                breast:document.querySelector(UISelectors.breastCheck).value,
                breastAmt:document.querySelector(UISelectors.breastAmount).value,
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
const App = ((IOCtrl, UICtrl) => {
    //load event listeners
    const loadEvents = () => {
        // get UISelectors List
        const UISelectors = UICtrl.getSelectors();
        //submit item button
        document.querySelector(UISelectors.submitBtn).addEventListener('click', itemAddSubmit);
    }
    //add item submit function
    const itemAddSubmit = (e) => {
        //get ui selectors
        const UISelectors = UICtrl.getSelectors();
        const input = UICtrl.getIOInput();
        //get form inputs
        const date = document.querySelector(UISelectors.dateEntry).value;
        const time = document.querySelector(UISelectors.timeEntry).value;
        const formula = document.querySelector(UISelectors.formulaCheck).checked;
        const formulaAmt = document.querySelector(UISelectors.formulaAmt).value;
        const formulaMeasure = document.querySelector(UISelectors.formulaMeasure).value;
        const breast = document.querySelector(UISelectors.breastCheck).checked;
        const breastAmt = document.querySelector(UISelectors.breastAmt).value;
        const breastMeasure = document.querySelector(UISelectors.breastMeasure).value;
        const pee = document.querySelector(UISelectors.peeCheck).checked;
        const poop = document.querySelector(UISelectors.poopCheck).checked;
        if(input.date !== '' && input.time !== ''){
            const newFeed = IOCtrl.addFeed(input.date, input.time, input.formula, input.formulaAmt, input.formulaMeasure, input.breast, input.breastAmt, input.breastMeasure, input.pee, input.poop);
            //add feed to UI output table
            UICtrl.addNewFeed(newFeed);
        }
        e.preventDefault();
    }
    //public methods
    return {
        init: () => {
            loadEvents();
        }
    }
})(IOCtrl, UICtrl);

//Init App
App.init();