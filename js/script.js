
function filterApply() {

  //gets input from the filters and parses it 
  const minimumYear =
    parseInt(document.getElementById("minimum-year").value) || 0;
  const maximumYear =
    parseInt(document.getElementById("maximum-year").value) || Infinity;

  const maximumMileage =
    parseInt(document.getElementById("maximum-mileage").value) || Infinity;

  const minimumPrice =
    parseFloat(document.getElementById("minimum-price").value) || 0;

  const maximumPrice =
    parseFloat(document.getElementById("maximum-price").value) || Infinity;

//takes all values from the select inputs & converts it into an array then gets value of the selected option
  const carMake = Array.from(
    document.getElementById("car-make").selectedOptions
  ).map((opt) => opt.value);

  const carColor = Array.from(
    document.getElementById("car-color").selectedOptions
  ).map((opt) => opt.value);

//checks each car against the filter criteria (skips if filter is left blank)
  let filteredCars = usedCars.filter((car) => {
    const check =
      (!minimumYear || car.year >= minimumYear) &&
      (!maximumYear || car.year <= maximumYear) &&
      (!carMake.length || carMake.includes(car.make)) &&
      (!carColor.length || carColor.includes(car.color)) &&
      (!maximumMileage || car.mileage <= maximumMileage) &&
      (!minimumPrice || car.price >= minimumPrice) &&
      (!maximumPrice || car.price <= maximumPrice);
    return check;
  });

//displays the filtered cars on the page
  displayCars(filteredCars);
}


function displayCars(cars) {

  //clears car listings
  const carList = document.getElementById("car-listings");
  carList.innerHTML = "";

  //displays an alert and returns to page to normal if no search results are found
  if (cars.length === 0) {
    alert("There are no cars that match this search. Please try again.");
    displayCars(usedCars);
    return;
  }

  //correctly reformats results on page
  cars.forEach((car) => {
    const carOption = document.createElement("div");
    carOption.className = "car-option";
    carOption.innerHTML = `
      <img src="${car.image}" alt="${car.make} ${car.model}">
      <h3>${car.year} ${car.make} ${car.model}</h3>
      <p>Mileage: ${car.mileage} miles</p>
      <p>Color: ${car.color}</p>
      <p>Gas Mileage: ${car.gasMileage}</p>
      <p>Price: $${car.price}</p>
    `;
    carList.appendChild(carOption);
  });

}

function resetFilters() {

  //resets all the filter input fields
  document.getElementById("minimum-year").value = "";
  document.getElementById("maximum-year").value = "";
  document.getElementById("car-make").selectedIndex = -1; 
  document.getElementById("car-color").selectedIndex = -1; 
  document.getElementById("maximum-mileage").value = "";
  document.getElementById("minimum-price").value = "";
  document.getElementById("maximum-price").value = "";

  //returns page to normal
  displayCars(usedCars);
}
