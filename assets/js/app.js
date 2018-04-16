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
function checked(item){
    if(item){
        console.log(item);
        // ul.innerHTML += `<li class="collection-item">${item}</li>`
    } else {
        console.log('false');
    }
};
//feed event constructor
function Feed(date, time, formula, formulaAmt, formulaMeasure, breast, breastAmt, breastMeasure, pee, poop){
    // this.id = id;
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
//UI constructor
function UI(){
}
//add feed event to list
UI.prototype.addFeedToList = (feed) => {
    //console.log(feed);
     //select output element
    const output = document.querySelector('.feedContent');
    //select thead
    const thead = document.querySelector('#t-head');
    //select title row
    const trow = document.querySelector('#title')
    //get date of feed event
    const dateHeader = document.createElement('tr');
    dateHeader.innerHTML = `<tr><th><h4>${feed.date}</h4></th></tr>`;
    //create new row
    const row = document.createElement('tr');
    //insert HTML into row
    row.innerHTML = `
            <td>${feed.time}</td>
            ${feed.formula ? `<td>${feed.formulaAmt}${feed.formulaMeasure}</td>` : '<td>None</td>'}
            ${feed.breast ? `<td>${feed.breastAmt}${feed.breastMeasure} </td>` : '<td>None</td>'}   
            ${feed.pee ? '<td>💦</td>' : '<td>None</td>'}
            ${feed.poop ? '<td>💩</td>' : '<td>None</td>'}            
    `;
    thead.insertAdjacentElement('afterend', row);
    trow.insertAdjacentElement('beforebegin', dateHeader);
    output.classList.remove('noshow');        
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
    //instantiate new Feed event
    const feed = new Feed(date, time, formula, formulaAmt, formulaMeasure, breast, breastAmt, breastMeasure, pee, poop)
    //instantiate new UI
    const ui = new UI();
    //validate form
    //check date time
    if(date === '' || time === ''){
        alert('enter a date / time');
    //check formula / breast input
    } else if(formula && formulaAmt === '' || breast && breastAmt === ''){
        alert('please fill in amounts');
    } else {
        ui.addFeedToList(feed);
    }
    e.preventDefault();
});

