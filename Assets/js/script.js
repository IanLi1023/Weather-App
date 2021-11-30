$(document).ready(function(){

const formEl = $('#city-search');
const cityDisplayEl = $("#city-search-display");
const cityInputEl = $("#city-input")

const printSearchedCities = function (cityInput) {

    const citySearchedEl = $('<h1>');
    citySearchedEl.addClass('col-12 col-sm-4 col-md-3');
    console.log("Kobe")

    const cardEl = $('<h1>');
    cardEl.addClass('card h-100');
    cardEl.append(cityInputEl);
    console.log("Bryant");

    // const cityName = $('<h5>').addClass('card-header').text(cityInput);
    // cityName.append(cardEl);

    const cardBodyEl = $('<div>');
    cardBodyEl.addClass('card-body');
    cardBodyEl.append(cardEl);


    cityDisplayEl.append(cardBodyEl);
};

const handleFormSubmit = function (event) {
    // event.preventDefault();
  
    const cityInput = cityInputEl.val();
    printSearchedCities(cityInputEl);
  
    // reset form
    // cityInputEl.val('<div>');

  };
  
  formEl.on('submit', handleFormSubmit);
})