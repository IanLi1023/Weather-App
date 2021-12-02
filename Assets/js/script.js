$(document).ready(function () {

  let successResult = false;
  const clearHistoryEl = $('#clear-history-btn');
  const formEl = $('#city-search');
  const cityDisplayEl = $("#city-search-display");
  const cityInputEl = $("#city-input");
  const apiKey = '431dd6371869dd989989366774b6e8c7';
  let searchHistory = new Array();
  let localStorageHistory = localStorage.getItem('weather-app-history');
  if(localStorageHistory === null
      || localStorageHistory == null  || localStorageHistory == undefined || localStorageHistory.length == 0){
    localStorage.setItem('weather-app-history', searchHistory);
  }
  else {
    searchHistory = JSON.parse(localStorage.getItem('weather-app-history'));
  }

  /*if (localStorage.getItem('weather-app-history') !== null || localStorage.getItem('weather-app-history') !== ""){
    console.log(JSON.parse(localStorage.getItem('weather-app-history')));
  }
  else {
    localStorage.setItem('weather-app-history', searchHistory);
  }*/

  const printSearchedCities = function (cityInput) {
    getApiWeather(cityInput);
  };

  console.log(searchHistory);
  

  const loadSearchHistory = function(){
    for (let index in searchHistory){
      let cityInput = searchHistory[index];
      let citySearchedEl = $('<div id="city-' + cityInput + '"></div>');
      citySearchedEl.append(cityInput);
      citySearchedEl.addClass('col-12 btn btn-secondary btn-lg mb-2');
      citySearchedEl.on('click', function() {
        printSearchedCities(cityInput);
      });
      cityDisplayEl.prepend(citySearchedEl);
    }
  }
  loadSearchHistory();

  const handleFormSubmit = function (event) {
    event.preventDefault();
    
    let cityInput = cityInputEl.val();

    printSearchedCities(cityInput);

    console.log(successResult)
    
    // reset form
    cityInputEl.val('');
  };

  formEl.on('submit', handleFormSubmit);

  //API Call
  function getApiWeather(searchValue) {
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=imperial&appid=${apiKey}`
    $.ajax({ url: requestUrl, method: 'GET' }).then(function (response) {
      console.log(response);
      displayOneDay(response);
      getUVIndex(response.coord.lat, response.coord.lon);
      display5days(searchValue);
      AddToHistory(searchValue);

    })
  }
console.log(cityInputEl.val())

const AddToHistory = function(cityInput){
  if(!searchHistory.includes(cityInput)){
    let citySearchedEl = $('<div id="city-' + cityInput + '"></div>');
    citySearchedEl.append(cityInput);
    citySearchedEl.addClass('col-12 btn btn-secondary btn-lg mb-2');
    citySearchedEl.on('click', function() {
      printSearchedCities(cityInput);
    });
    cityDisplayEl.prepend(citySearchedEl);

    searchHistory.push(cityInput);

    localStorage.setItem("weather-app-history", JSON.stringify(searchHistory));
  }
  else {
    let citySearchedEl = $('#city-' + cityInput);
    cityDisplayEl.prepend(citySearchedEl);
  }
}

function displayOneDay(data) {
    let date = new Date(data.dt*1000)
    let dateString = (date.getMonth()+1)+ "/" + date.getDate() + "/"+ date.getFullYear();

    let icon = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`

    console.log(icon);

    const main = $('#main-content');
    main.html(`
    <h1>${data.name + " " + icon}</h1>
    <p> ${dateString} </p>
    <p>${data.main.temp} &degF; </p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind: ${data.wind.speed} MPH</p>
    <div class='btn' id='uv-index'></div>
    <p id='5-day-forecast'></p>
    `)
}

function getUVIndex(lat, lon) {
  const requestUrl = `http://api.openweathermap.org/data/2.5/uvi?&lat=${lat}&lon=${lon}&appid=${apiKey}`
  $.ajax({ url: requestUrl, method: 'GET' }).then(function (response) {
    console.log('uv', response);
    $('#uv-index').append("UV Index: " + response.value);
    let uv = response.value;
    if (uv >= 0 && uv <3) {
      $('#uv-index').css("background-color", "Green");
      $('#uv-index').css("color", "White");
    } else if (uv >= 3 && uv <8) {
      $('#uv-index').css("background-color", "Yellow");
    } else {
      $('#uv-index').css("background-color", "Red");
      $('#uv-index').css("color", "White");
    }
    })
}

function ClearHistory(){
  localStorage.removeItem("weather-app-history")
  searchHistory = new Array();
  cityDisplayEl.html("");
}
clearHistoryEl.on('click', ClearHistory);

function display5days(searchValue) {
  const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=imperial&appid=${apiKey}`
  $.ajax({ url: requestUrl, method: 'GET' }).then(function (response) {
    console.log(response)
    const dataOutput = $('#5-day-forecast')
    dataOutput.addClass('row justify-content-between my-3')
    for (let i = 0; i < response.list.length; i++) {
      if (response.list[i].dt_txt.includes('03:00:00')) {
        console.log('Here');
        const dataColumn = $('<div>')
        dataColumn.addClass('col-md-2 card my-3')
        dataColumn.html(``)
        let date = new Date(response.list[i].dt*1000)

        let dateString = (date.getMonth()+1)+ "/" + date.getDate() + "/"+ date.getFullYear();
        dataColumn.append(dateString)
        let icon = `<img src="http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png" class="five-box-icon">`
        dataColumn.append(icon);
        dataColumn.appendTo(dataOutput);
        dataColumn.append(`
        <p>${response.list[i].main.temp} &degF; </p>
        <p>Humidity: ${response.list[i].main.humidity}%</p>
        <p>Wind: ${response.list[i].wind.speed} MPH</p>
        `)


      }
      $('#main-content').append(dataOutput);
    }
    })
}

})

  //Create a local storage



