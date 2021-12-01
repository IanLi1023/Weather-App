$(document).ready(function(){

  const formEl = $('#city-search');
  const cityDisplayEl = $("#city-search-display");
  const cityInputEl = $("#city-input")
  const mainContentEl = $("#main-content")
  
  const printSearchedCities = function (cityInput) {
  
      const citySearchedEl = $('<div></div>');
      citySearchedEl.append(cityInput);
      citySearchedEl.addClass('col-12 btn btn-secondary btn-lg mb-2');
      console.log("Kobe");
      
      cityDisplayEl.append(citySearchedEl);
  
      // alert("printing");
  
      // const cardEl = $('<h1>');
      // // cardEl.addClass('card h-100');
      // cardEl.append(cityInput);
      // console.log("Bryant");
  
      // const cityName = $('<h5>').addClass('card-header').text(cityInput);
      // cityName.append(cardEl);
  
      // const cardBodyEl = $('<li>');
      // cardBodyEl.addClass('card-body');
      // cardBodyEl.append(cardEl);
  
  
      // mainContentEl.append(cardBodyEl);
  };
  
  const handleFormSubmit = function (event) {
      event.preventDefault(); // This needs to be called, or else the submit button will refresh the page.
    
      const cityInput = cityInputEl.val();
      printSearchedCities(cityInput);
    
      // reset form
      // cityInputEl.val('<div>');
  
    };
    
    formEl.on('submit', handleFormSubmit);
  })