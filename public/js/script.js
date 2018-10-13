document.getElementById("btn").onclick = function() {
	myGetRequest()
};

function myGetRequest() {
	var cityName = document.getElementById("input-city").value;	
	var myRequest = new XMLHttpRequest();

	myRequest.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=" + cityName +  "&units=metric&APPID=044f2b0146dc4727c03499a503f50dc4", true);	
	myRequest.onreadystatechange = function() {
				
		if (this.readyState == 4 && this.status == 200) {
			this.onload = function() {
				var myData = JSON.parse(this.responseText);
				renderHTML(myData);	
			};
		} 
		else if (cityName == "Enter city name" || cityName == "") {
			this.onload = function() {
				document.getElementById('report').innerHTML = "<h3>Type city name, please.</h3>";
			};
		}
		else {
			this.onload = function() {
				document.getElementById('report').innerHTML = "<h3>Error: We cannot process your request.</h3>";
			};
		};	
	};
	myRequest.send();
}; 

function renderHTML(data){
	var HTMLString = "Current weather in <strong>" + data.name + ", " + data.sys.country + "</strong>.";

	document.getElementById('city-state').innerHTML = HTMLString;
	weatherReport(data);
};

function weatherReport(data) {
	var icon = document.getElementById("icon");
  	icon.src = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
  	icon.width = '100';
  	icon.height = '100';

	id('temperature').innerHTML = data.main.temp + "°<p id = 'celsius'>C</p>";
  	id('icon').innerHTML = icon;			
  	id("description").innerHTML = "Description: <strong>" + data.weather[0].description + "</strong>";
  	id("humidity").innerHTML =  "Humidity:<strong> " + data.main.humidity + "%</strong>";	
  	id("wind").innerHTML =  "Wind:<strong> " + data.wind.speed + " meter/sec</strong>";		
};

function id(element) {
  	return document.getElementById(element);
};