// Bind javascript to html div element with id = output
const output = document.getElementById("output");
const start = document.getElementById("start");
const end = document.getElementById("end");
const personInput = document.getElementById("person");
const suitcaseInput = document.getElementById("suitcase");


// Make an output template for the member information
// and CSS styling references. I need to use "let" and
// not "const" since the template will change for 
// each member
let template = ""; // Empty template


function ButtonClickHandler() {

    const atLeastOneCarInList = carlist.length > 0
    if (atLeastOneCarInList) {
        const filteredList = filterCars(carlist)
        const isValidDates = validDates(start.value, end.value)

        if (isValidDates) {
            const days = calculateDays(start.value, end.value);

            for (const car of filteredList) {
                const price = calculatePrice(days, car.dayPrice);

                // Do some finance here
                car.priceForTrip = price * 1.25
                buildList(car)
            }

        }


    }

}

function filterCars(cars) {

    const peopleCount = parseInt(personInput.value)
    const suitcaseCount = parseInt(suitcaseInput.value)

    return cars.filter((car) => {
        const leastAmountOfSeats = car.persons >= peopleCount

        const minimumAmountOfSuitcases = car.suitcases >= suitcaseCount

        return leastAmountOfSeats && minimumAmountOfSuitcases
    })
}

// Iterate through memberlist(objects) and show information
function buildList(member) {

    // Instead of double or single quotation i use
    // backticks (`) to embrace the template content.
    // Backticks allows me to write the codes on 
    // multiple lines and include double and/or 
    // single quotation without javascript becoming 
    // confused. 
    template = `
    <div class="car1">
        <img src="${member.image}" alt="Car" class="image"> 
        <h4>
            ${member.carname}
        </h4>
        <p>
           Category: ${member.category} <br>
           Persons: ${member.persons} <br>
           Suitcases: ${member.suitcases} <br>
        </p> 
        <div class="price">
            <h4>DKK${member.priceForTrip}</h4>
            <button >
                <a href="details.html?image=${member.image}&carname=${member.carname}&days=${calculateDays(start.value, end.value)}&pickup=${start.value}&returndate=${end.value}&price=${member.priceForTrip}">Book Now</a>
            </button>
        </div>
    </div>`

    // Show template content in output div
    output.insertAdjacentHTML("beforeend", template)
}

function validDates(arrivaldate, departuredate) {
    const arrival = new Date(arrivaldate);
    const departure = new Date(departuredate);
    if (arrival > departure) {
        return false;
    } else {
        return true;
    }
}

function calculateDays(arrivaldate, departuredate) {
    const arrival = new Date(arrivaldate);
    const departure = new Date(departuredate);
    const timediff = departure.getTime() - arrival.getTime();
    const diffindays = timediff / (1000 * 3600 * 24) + 1;
    return diffindays;
}

function calculatePrice(days, priceperday) {
    const totalprice = (priceperday * days) + 495;
    return totalprice;
}

// TODO: Clear the list after the filter has been clicked before the list is generated again

