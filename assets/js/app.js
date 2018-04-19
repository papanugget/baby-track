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
function Feed(id, date, time, formula, formulaAmt,  breast, breastAmt, pee, poop){
    this.id = id;
    this.date = date;
    this.time = time;
    this.formula = formula;
    this.formulaAmt = formulaAmt;
    // this.formulaMeasure = formulaMeasure;
    this.breast = breast;
    this.breastAmt = breastAmt;
    // this.breastMeasure = breastMeasure;
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
    //create table body
    const tableBody = document.querySelector('.feedOutput');
    //create table row for feed data
    const tableRow = document.createElement('tr');
    //insert dynamic elements to table body
    tableRow.innerHTML = `
            <td>${feed.date}</td>
            <td>${feed.time}</td>
            ${feed.formula ? `<td>${feed.formulaAmt}oz.</td>` : '<td>None</td>'}
            ${feed.breast ? `<td>${feed.breastAmt}oz. </td>` : '<td>None</td>'}   
            ${feed.pee ? '<td>💦</td>' : '<td>None</td>'}
            ${feed.poop ? '<td>💩</td>' : '<td>None</td>'}
            <td class="noshow">${feed.id}</td>
            <td><i class="material-icons item-delete">delete</i></td>
    `;
    tableBody.appendChild(tableRow);
    output.classList.remove('noshow');        
}
UI.prototype.showTotals = (date) => {
    //select output element
    const totalsRow = document.querySelector('.totalsRow');
    //get feeds on display / in storage
    const store = new Store();
    const o = store.getTotals(date);
    totalsRow.innerHTML = `
        <td>Totals for: <strong>${date}<strong></td>
        <td class="noshow">${o.count}</td>
        <td>Total Formula: <strong>${o.formulaAmt}oz.</strong></td>
        <td>Total Breast Milk: <strong>${o.breastAmt}oz.</strong></td>
        <td>Total Pees: <strong>${o.pee}x</strong> 💦</td>
        <td>Total Poops: <strong>${o.poop}x</strong> 💩</td>
    `;
    const output = document.querySelector('.feedContent');
    //insert after output
    output.appendChild(totalsRow);
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
    document.getElementById('dateTotal').value = '';          
}
//add local storage
function Store(){
}
Store.prototype.getFeeds = () => {
    let feeds;
    if(localStorage.getItem('feeds') === null){
        feeds = [];
    } else {
        feeds = JSON.parse(feeds = localStorage.getItem('feeds'));
    }
    return feeds;
}
Store.prototype.getTotals = (date) => {
    const store = new Store();
    const feeds = store.getFeeds();
    if(feeds)
    return feeds.reduce((o, r) => {
        if(r.date != date) return o;
        o.count = (o.count || 0) +1;
        o.formula = o.formula || r.formula;
        o.formulaAmt = (o.formulaAmt || 0) + (r.formulaAmt);
        o.breast = o.breast || r.breast;
        o.breastAmt = (o.breastAmt || 0) + (r.breastAmt);
        r.pee = r.pee ? 1 : 0;
        o.pee = (o.pee || 0) + (+r.pee);
        r.poop = r.poop ? 1 : 0;
        o.poop = (o.poop || 0) + (+r.poop);
        return o;
    }, {});
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
            formulaAmt = Number(document.getElementById('formulaAmt').value),
            // formulaMeasure = document.getElementById('formulaMeasure').value,
            breast = document.getElementById('breast').checked,
            breastAmt = Number(document.getElementById('breastAmt').value), 
            // breastMeasure = document.getElementById('breastMeasure').value,
            pee = document.getElementById('pee').checked,
            poop = document.getElementById('poop').checked;
    // //creating and appending new id's to each feed event
    // let id = (date + time).replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g,'');
    let id = Math.floor(Date.now() / 1000);
    //instantiate new Feed event
    const feed = new Feed(id, date, time, formula, formulaAmt, breast, breastAmt, pee, poop)
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
    e.preventDefault();
});
//event listener for delete
//get parent element for dynamically added feedings
document.querySelector('.feedOutput').addEventListener('click', (e) => {
    //new UI and Store
    const ui = new UI();
    const store = new Store();
    //call ui delete feed function and pass the event target
    ui.deleteFeed(e.target);
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
//event listener for get totals for day
document.querySelector('.date-btn').addEventListener('click', (e) => {
    const ui = new UI();
    const store = new Store();
    const feeds = store.getFeeds();
    const selectDate = document.querySelector('#dateTotal').value;
    feeds.every((date) => {
        if(selectDate === '' || !selectDate ){
            ui.showAlert('Please select a valid date', 'card-panel red darken-1 white-text');
            return false;
        } else {
            ui.showTotals(selectDate);
            ui.clearFields();
        }
    });
    e.preventDefault();
});

// function summariseFeeding(summary, currentFeeding){
//         const {
//             date,
//             formulaAmt,
//             breastAmt,
//             pee,
//             poop
//         } = currentFeeding;
    
//         const currentAmt = summary[date] || 0;            // get current value for the given date, or default to 0 for new date
//         const newFormulaAmt     = currentAmt + Number(formulaAmt); // add the current item's amount to the current value
//         const newBreastAmt   = currentAmt + Number(breastAmt);
//         function peeAmt(currentAmt, pee){
//             let total;
//             if(pee === true){
//                 return 1;
//             } else {
//                 return 0;
//             }
//             total = currentAmt + pee
//             console.log(total);
//         };
//         const poopAmt = currentAmt + poop;
//         // console.log(poopAmt);
//         summary[date]       = newFormulaAmt, newBreastAmt, peeAmt, poopAmt;                     // store the combined value in the date key
//     }
//     const feeds = Store.prototype.getFeeds();
//     const summary = {};                                 // create an empty object to store the summary in
//     feeds.map(summariseFeeding.bind(true, summary)); // map through each of the items in the array and merge anything with the same date
//     console.table(summary);

// let summary = {};
    // const currentFeed = {
    //     date, 
    //     formulaAmt,
    //     breastAmt,
    //     pee,
    //     poop
    // };
    // const currentAmount = summary[date] || 0;
    // const newFormulaAmt = currentAmount + formulaAmt;
    // const newBreastAmt = currentAmount + breastAmt;
    // const peeAmt = currentAmount + pee;
    // const poopAmt = currentAmount + poop;
    // summary[date] = newFormulaAmt, newBreastAmt, peeAmt, poopAmt;
    // feeds.map(getTotals.bind(true, summary));
    // console.table(summary);
    // loop thru feeds and check if dates on each element matches
    // let match = [];
    // for(let i = 0; i < feeds.length; i++){
    //     if(feeds.indexOf(feeds[i].date === i.date)){
    //         match.push(feeds[i]);
    //     }
    // console.table(match);
    // }
    // function summariseFeeding(summary, currentFeeding){
    //     const {
    //         date,
    //         formulaAmount
    //     } = currentFeeding;
    
    //     const currentAmount = summary[date] || 0;            // get current value for the given date, or default to 0 for new date
    //     const newAmount     = currentAmount + formulaAmount; // add the current item's amount to the current value
    //     summary[date]       = newAmount;                     // store the combined value in the date key
    // }
    
    // const summary = {};                                 // create an empty object to store the summary in
    // feeds.map(summariseFeeding.bind(true, summary)); // map through each of the items in the array and merge anything with the same date
    // console.table(summary);
// UI.prototype.getTotals = (feed) => {
//     let formulaTotal = 0;
//     let breastTotal = 0;
//     let peeTotal = 0;
//     let poopTotal = 0;
//     //if formula checked get totals for date
//     if(feed.formula && feed.date){

//     }
// }

  
//   function aggregate(date){
//     const store = new Store();
//     const feeds = store.getFeeds();
//     let feedsReturn = {};
//     return feeds.reduce((o, r)=>{
//       if(r.date != date) return o;
//       o.count = (o.count || 0) +1;
//       o.formula = o.formula || r.formula;
//       o.formulaAmt = (o.formulaAmt || 0)+(+r.formulaAmt);
//       o.breast = o.breast || r.breast;
//       o.breastAmt = (o.breastAmt || 0)+(+r.breastAmt);
//       if(r.pee){
//           r.pee = 1;
//       } else {
//           r.pee = 0;
//       };
//       o.pee = (o.pee || 0) + (+r.pee);
//       if(r.poop){
//           r.poop = 1;
//       } else {
//           r.poop = 0;
//       }
//       o.poop = (o.poop || 0) + (+r.poop);
//       return o;
//     },{});
//   }
  
//   console.table(aggregate("Apr 20, 2018"))