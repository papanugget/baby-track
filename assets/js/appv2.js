console.log('Baby Trackr Connected!');
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
//UI Vars
const form = document.querySelector('.call');
const output = document.querySelector('.output');
const date = document.querySelector('#date');
const time = document.querySelector('#time');
const formula = document.querySelector('#formula');
const formulaAmt = document.querySelector('#formulaAmt');
const formulaMeasure = document.querySelector('#formMeasure');
const breast = document.querySelector('#breast');
const breastAmt = document.querySelector('#breastAmt');
const breastMeasure = document.querySelector('#breastMeasure'); 
const pee = document.querySelector('#pee');
const poop = document.querySelector('#poop');
//load event listeners
loadEventListeners();
//functions
function loadEventListeners(){
    // console.log('Events Loaded');
    //add feeding event
    form.addEventListener('submit', addFeeding);
}
//add feeding event
function addFeeding(e){
    let html = '';
    //validate date / time fields
    if(date.value === ''){
        alert('Please enter a date');
    } else if(time.value === ''){
        alert('Please enter a time');
    }
    //add feeding event to output
    //create html output 
    html += `
    <div class="card">
    <div class="card-content">
        <span class="card-title">Example Date</span>
        <div class="row">
            <div class="col s3">
                <span>🍼 12oz</span>
            </div>
            <div class="col s3">
                <span>( . Y . ) 12oz</span>
            </div>
            <div class="col s3">
                <span>💦 x6</span>
            </div>
            <div class="col s3">
                <span>💩 x3</span>
            </div>
        </div>
        </div>
    </div>
    `
    e.preventDefault();
}
//show feeding events
// function showOutput(){

// }