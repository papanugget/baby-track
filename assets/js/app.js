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
            <td class="noshow">${feed.id}</td>
            <td><i class="material-icons item-delete">delete</i></td>
    `;
    tableBody.appendChild(tableRow);
    output.classList.remove('noshow');        
}
UI.prototype.getTotals = (feed) => {
    let formulaTotal = 0;
    let breastTotal = 0;
    let peeTotal = 0;
    let poopTotal = 0;
    //if formula checked get totals for date
    if(feed.formula && feed.date){

    }
}
//show alert message
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
//delete feed from list
UI.prototype.deleteFeed = (target) => {
    if(target.className === 'material-icons item-delete'){
        target.parentElement.parentElement.remove(); 
    } 
}
//remove all feeds
UI.prototype.clearAll = () => {
    const feedOutput = document.querySelector('.feedOutput');
    // console.log(feedOutput);
    while(feedOutput.firstChild){
        feedOutput.removeChild(feedOutput.firstChild);
    }
    //select output element
    const output = document.querySelector('.feedContent'); 
    output.classList.add('noshow');
}
//reset form fields
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
//add local storage
function Store(){
}
Store.prototype.getFeeds = () => {
    let feeds;
    // console.log(feeds)
    if(localStorage.getItem('feeds') === null){
        feeds = [];
        // console.log(feeds);
    } else {
        feeds = JSON.parse(feeds = localStorage.getItem('feeds'));
    }
    return feeds;
}
Store.prototype.displayFeeds = () => {
    const store = new Store();
    let feeds = store.getFeeds();
    feeds.forEach((feed) => {
        const ui = new UI;
        ui.addFeedToList(feed);
    });
    return feeds;
}
Store.prototype.addFeed = (feed) => {
    const store = new Store();
    const feeds = store.getFeeds();
    for(var i = 0; i < feeds.length; i++){
        let id = feeds[i];
    }
    feeds.push(feed);
    localStorage.setItem('feeds', JSON.stringify(feeds));
}
Store.prototype.removeFeed = (currentItem) => {
    const store = new Store();
    let feeds = store.getFeeds();
    feeds.forEach((feed, index) => {
        if(feed.id === currentItem){
            feeds.splice(index, 1);
        }
    });
    localStorage.setItem('feeds', JSON.stringify(feeds));
}
Store.prototype.removeAllFeeds = () => {
    localStorage.removeItem('feeds');
}
//event listener to display feeds from local store when page loads
document.addEventListener('DomContentLoaded', Store.prototype.displayFeeds());
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
    // //creating and appending new id's to each feed event
    // let id = (date + time).replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g,'');
    let id = Math.floor(Date.now() / 1000);
    //instantiate new Feed event
    const feed = new Feed(id, date, time, formula, formulaAmt, formulaMeasure, breast, breastAmt, breastMeasure, pee, poop)
    //instantiate new UI and Store
    const ui = new UI();
    const store = new Store();
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
        store.addFeed(feed);
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
    //new UI and Store
    const ui = new UI();
    const store = new Store();
    //call ui delete feed function and pass the event target
    // console.log(e.target);
    ui.deleteFeed(e.target);
    // console.log(e.target.parentElement.previousElementSibling.textContent);
    store.removeFeed(parseInt(e.target.parentElement.previousElementSibling.textContent));
    //show delete message
    ui.showAlert('Feed removed!', 'card-panel teal darken-1 white-text');
    e.preventDefault();
});
//event listener for delete all feed events
document.querySelector('.clear-btn').addEventListener('click', () => {
    const ui = new UI();
    const store = new Store();
    ui.clearAll();
    ui.showAlert('All feeding events removed!', 'card-panel red darken-1 white-text');
    store.removeAllFeeds();
    const output = document.querySelector('.feedContent');    
    output.classList.add('noshow');            
});
