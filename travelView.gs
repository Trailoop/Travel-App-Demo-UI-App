function doGet() {
  var app = UiApp.createApplication();
  app.setTitle("Ahold Travel Coordinator");
  var userEmail = Session.getEffectiveUser();
  

  
   var html = '<div style="color:DodgerBlue;font-family: Helvetica, Arial, sans-serif;font-size: 36px;font-style: normal;font-weight: bold;'
  + 'text-transform: normal;letter-spacing: -2px;line-height: 0.9em">Travel App</div>'
  + '<div style="text-indent:40px; position:relative; text-align:left; bottom:80px; line-height:-1em; line-height: 1.45em;color:DimGray">'
  + '<h4>Find a trip buddy!</h4></div>'
  + '<div style="font-size:16px"><h3>Features</h3>'
  + '<p><ul><li>Creates a poplutated meeting agenda google document for any meetings.</li></ul></p>'
  + '<h3>Instructions</h3>'
  + '<p><ul><li>Select a date for which you have a meeting scheduled,</li>'
  + '<li>Meetings are display within categories of <em>Your Meetings</em> and <em>Attending</em>'
  + '<li>Then select the desired meeting, and click <strong>Create Agenda</strong>,</li>'
  + '<li>A link will appear for your newly created agenda document.</li></ul></p></div>';
  
  var feedback = app.createAnchor("feedback", "https://docs.google.com/a/ahold.com/spreadsheet/viewform?formkey=dHRndUNBWDdmUXY2VjZwbWdYN1FKTWc6MQ").setHorizontalAlignment(UiApp.HorizontalAlignment.RIGHT);
  feedback.setStyleAttributes(
    {position:"fixed", left:"-10px", bottom:"0px", height:"20px", width:"100%", background:"DodgerBlue", color:"White", verticalAlign:"text-bottom",fontWeight: "Bold"});
  var footerHtml = ' Created By: Scott Lawrence | for users within Ahold.com domain | version 0.01   ';
  var footer = app.createHTML(footerHtml).setStyleAttributes(
    {position:"fixed", borderTop: "80px" ,left:"-10px", bottom:"20px", height:"20px", width:"100%", background:"DodgerBlue", color:"White", verticalAlign:"text-bottom"}).setHorizontalAlignment(UiApp.HorizontalAlignment.RIGHT);
  
  var instructions = app.createHTML(html, true).setStyleAttributes({position: "relative", left: "50px"});;
  
  var title = app.createHTML("Travel Plans");
  
  var firstNameLabel = app.createLabel("First Name");
  var firstName = app.createTextBox().setName("firstName").setId("firstName");
  var lastNameLabel = app.createLabel("Last Name");
  var lastName = app.createTextBox().setName("lastName").setId("lastName");
  var emaill = app.createLabel('Email Address');
  var email = app.createTextBox().setValue(userEmail).setName('email').setId('email')
  var destinationLabel = app.createLabel("Destination");
  var destinations = app.createListBox().setName("destination").setId("destination");
  destinations.addItem("Carlisle HQ")
  .addItem('Quincy "QCP" HQ');
  var carRentalLabel = app.createLabel("Do you have a car rental already?");
  var carRental = app.createRadioButton("yes", "yes").setName('car').setId('car');
  var hotelLabel = app.createLabel("Hotel");
  var hotels = app.createListBox().setName('hotel').setId('hotel');
  hotels.addItem("Marriot")
  .addItem("Hilton");
  var airportl = app.createLabel('Airport');
  var airport = app.createListBox().setName('airport').setId('airport');
  airport.addItem('boston');
  var departureDateLabel = app.createLabel("Departure Date");
  var departureDate = app.createDateBox().setName("departureDate").setId("departureDate");
  var departureHourLabel = app.createLabel("Arrival Hour");
  var departureHour = app.createListBox().setName('arrivalHour').setId('arrivalHour');
  for (h=0;h<24;++h){if(h<10){var hourstr='0'+h}else{var hourstr=h.toString()}departureHour.addItem(hourstr);}
  var departureMinuteLabel = app.createLabel("Arrival Minute");
  var departureMinute = app.createListBox().setName('arrivalMinute').setId('arrivalMinute');
  for (m=0;m<60;++m){
  if(m<10){var minstr='0'+m}else{var minstr=m.toString()}
  departureMinute.addItem(minstr);}
  var returnDateLabel = app.createLabel("Return Date");
  var returnDate = app.createDateBox().setName('returnDate').setId('returnDate');
  var returnHourLabel = app.createLabel("Return Hour");
  var returnHour = app.createListBox().setName('returnHour').setId('returnHour');
  for (h=0;h<24;++h){if(h<10){var hourstr='0'+h}else{var hourstr=h.toString()}returnHour.addItem(hourstr);}
  var returnMinuteLabel = app.createLabel("Return Minute");
  var returnMinute = app.createListBox().setName('returnMinute').setId('returnMinute');
  for (m=0;m<60;++m){if(m<10){var minstr='0'+m}else{var minstr=m.toString()}
  returnMinute.addItem(minstr);}
  var submitHandler = app.createServerHandler("saveTrip");  //save to db
  var submit = app.createButton("submit", submitHandler);
  
  var grid = app.createGrid(11,4).setId("newTripGrid").setCellPadding(2);
  grid.setWidget(0, 0, title);
  grid.setWidget(1, 0, firstNameLabel).setWidget(1, 1, lastNameLabel).setWidget(1, 2, emaill);
  grid.setWidget(2, 0, firstName).setWidget(2, 1, lastName).setWidget(2, 2, email);
  grid.setWidget(3, 0, destinationLabel).setWidget(3, 1, hotelLabel).setWidget(3, 2, airportl);
  grid.setWidget(4, 0, destinations).setWidget(4, 1, hotels).setWidget(4, 2, airport);
  grid.setWidget(5, 0, carRentalLabel).setWidget(5, 1, carRental);
  grid.setWidget(6, 0, departureDateLabel).setWidget(6, 1, departureHourLabel).setWidget(6, 2, departureMinuteLabel);
  grid.setWidget(7, 0, departureDate).setWidget(7, 1, departureHour).setWidget(7, 2, departureMinute);
  grid.setWidget(8, 0, returnDateLabel).setWidget(8, 1, returnHourLabel).setWidget(8, 2, returnMinuteLabel);
  grid.setWidget(9, 0, returnDate).setWidget(9, 1, returnHour).setWidget(9, 2, returnMinute);
  grid.setWidget(10, 0, submit);
  
  var newTrip = app.createVerticalPanel().setTitle("New Trip");
  newTrip.add(grid);
  
  var updateTrip = app.createVerticalPanel().setTitle("Update Trip");
  var label2 = app.createLabel("Changes");
  updateTrip.add(label2);
  
  var panel = app.createTabPanel().setWidth(800).setStyleAttributes({position: "relative", left: "50px", borderBottom: "50px"});
  panel.add(newTrip, "New Trip").add(updateTrip, "Update Trip");
  panel.selectTab(0);
  submitHandler.addCallbackElement(panel);
  
  app.add(instructions).add(panel).add(footer).add(feedback);
  
  return app;
}

function submitHandler(e) {
 var app = UiApp.getActiveApplication();
 
 var parameter = e.parameter;
 
// todo: create event for departure and store event to scriptDB,
// todo: form trip name

 var departureDate = new Date(parameter.departureDate.getYear());
 var eventDeparture = CalendarApp.getOwnedCalendarById(id).createEvent("Trip Name", m, endTime);
 
 var record = 
 {
   name: {
     first: parameter.firstName, 
     last: parameter.lastName,
     email: parameter.email
     },
   destination: {
     location: parameter.destination,
     hotel: parameter.hotel,
     car: parameter.car
   },
   departure: {
     airport: parameter.airport,
     date: parameter.departureDate.getTime(),
     hour: parameter.departureHour,
     minute: parameter.departureMinute
   },
   returnTrip: {
     date: parameter.returnDate.getTime(),
     hour: parameter.returnHour,
     minute: parameter.returnMinute
   }
 }
}