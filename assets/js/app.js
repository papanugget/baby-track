console.log('Baby Trackr Connected!');
/*
-use browser local storage
-get values from field inputs
-add success message for feeding event adding success
-add warning message for empty date / time fields / field validation
-store feeding events as feeds object using a constructor
 */
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
//feed event constructor
function Feed(id, date, time, formula, formulaAmt, formulaMeasure, breast, breastAmt, breastMeasure, pee, poop){
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
//totals calculator
function getTotals() {
    let total = 0;

}
//UI constructor
function UI(){
}
//add feed event to list
UI.prototype.addFeedToList = (feed) => {
     //select output element
    const output = document.querySelector('.feedContent');
    //create row for date header
    const dateHeader = document.createElement('tr');
    //get date for header
    dateHeader.innerHTML = `<h4>${feed.date}</h4>`;
    //create table body
    const tableBody = document.querySelector('.feedOutput');
    //create table row for feed data
    const tableRow = document.createElement('tr');
    //insert dynamic elements to table body
    tableRow.innerHTML = `
            <td>${feed.date}</td>
            <td>${feed.time}</td>
            ${feed.formula ? `<td>${feed.formulaAmt}${feed.formulaMeasure}</td>` : '<td>None</td>'}
            ${feed.breast ? `<td>${feed.breastAmt}${feed.breastMeasure} </td>` : '<td>None</td>'}   
            ${feed.pee ? '<td>💦</td>' : '<td>None</td>'}
            ${feed.poop ? '<td>💩</td>' : '<td>None</td>'}
            <td><i class="material-icons item-delete">delete</i></td>
    `;
    tableBody.appendChild(tableRow);
    output.classList.remove('noshow');        
}
UI.prototype.showAlert = (message, className) => {
    //create div
    const div = document.createElement('div');
    //add classname
    div.className = `alert ${className}`;
    //add textnode to div
    div.appendChild(document.createTextNode(message));
    //select container and form elements
    const card = document.querySelector('.card-content');
    const form = document.querySelector('#feed-form');
    //insert alert
    card.insertBefore(div, form);
    //timeout after 3 secs
    setTimeout(() => {
        document.querySelector('.alert').remove();
    },3000);
}
UI.prototype.deleteFeed = (target) => {
    if(target.className === 'material-icons item-delete'){
        // console.log(target.parentElement.parentElement);
        target.parentElement.parentElement.remove();
    }
}
UI.prototype.clearAll = () => {
    const feedOutput = document.querySelector('.feedOutput');
    console.log(feedOutput);
    while(feedOutput.firstChild){
        feedOutput.removeChild(feedOutput.firstChild);
    }
}
UI.prototype.clearFields = () => {
    document.getElementById('date').value = '';
    document.getElementById('time').value = '';
    document.getElementById('formula').checked = false;
    document.getElementById('formulaAmt').value = '';
    document.getElementById('breast').checked = false;
    document.getElementById('breastAmt').value = '';
    document.getElementById('pee').checked = false;
    document.getElementById('poop').checked = false;            
}
UI.prototype.editFeed = (target) => {
    if(target.className === 'material-icons item-edit'){

    }
}

//event listener for adding feed event
document.getElementById('feed-form').addEventListener('submit', (e) => {
    //get form values
    const   date = document.getElementById('date').value,
            time = document.getElementById('time').value,
            formula = document.getElementById('formula').checked,
            formulaAmt = document.getElementById('formulaAmt').value,
            formulaMeasure = document.getElementById('formulaMeasure').value,
            breast = document.getElementById('breast').checked,
            breastAmt = document.getElementById('breastAmt').value,          
            breastMeasure = document.getElementById('breastMeasure').value,
            pee = document.getElementById('pee').checked,
            poop = document.getElementById('poop').checked;
    //logic for creating and appending new id's to each feed event
    let id = 0;
    
    //instantiate new Feed event
    const feed = new Feed(id, date, time, formula, formulaAmt, formulaMeasure, breast, breastAmt, breastMeasure, pee, poop)
    //instantiate new UI
    const ui = new UI();
    //validate form
    //check date time
    if(date === '' || time === ''){
        ui.showAlert('Please fill in the date and time', 'card-panel red darken-1 white-text');
    //check formula / breast input
    } else if(formula && formulaAmt === '' || breast && breastAmt === ''){
        // alert('please fill in amounts');
        ui.showAlert('Please fill in all fields', 'card-panel red darken-1 white-text');
    } else {
        ui.addFeedToList(feed);
        //show success message
        ui.showAlert('Feeding successfully added!', 'card-panel green darken-1 white-text');
        ui.clearFields();
    }
    e.preventDefault();
});

//event listener for reset all fields
document.querySelector('.reset').addEventListener('click', (e) => {
    const ui = new UI();
    ui.clearFields();
    // console.log('reset button clicked');
    e.preventDefault();
});

//event listener for delete
//get parent element for dynamically added feedings
document.querySelector('.feedOutput').addEventListener('click', (e) => {
    //new UI
    const ui = new UI();
    //call ui delete book function and pass the event target
    // console.log(e.target);
    ui.deleteFeed(e.target);
    //show delete message
    ui.showAlert('Feed removed!', 'card-panel teal darken-1 white-text')
    e.preventDefault();
});
//event listener for delete all feed events
document.querySelector('.clear-btn').addEventListener('click', () => {
    const ui = new UI();
    ui.clearAll();
    ui.showAlert('All feeding events removed!', 'card-panel red darken-1 white-text')
    const output = document.querySelector('.feedContent');    
    output.classList.add('noshow');            
});
