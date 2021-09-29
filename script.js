const movieSelect = document.getElementById('movieList')

let ticketCost = +movieSelect.value

let totalTickets = document.getElementById('totalTickets')

let totalCost = document.getElementById('totalCost')

const seats = document.querySelectorAll('.row .seat:not(.booked)')

const container = document.querySelector('.seats-container')

//Function to Update the Cost of selected tickets

function updateCost() {

    const selected = document.querySelectorAll('.row .seat.selected')
    totalTickets.innerText = selected.length

    totalCost.innerText = ticketCost * selected.length

}

populate()

//Function to populate the localStorage Data

function populate() {

    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

    if (selectedSeats !== null && selectedSeats.length > 0) {

        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })

        updateMovie()
    }



}

//Function to update movie and price

function updateMovie() {
    const movieIndex = localStorage.getItem('movieIndex')
    const ticketPrice = localStorage.getItem('ticketPrice')
    ticketCost = +ticketPrice
    movieSelect.selectedIndex = movieIndex
    updateCost()

}

//Event Listener for seats container

container.addEventListener('click', (e) => {

    if (e.target.classList.contains('seat') && !e.target.classList.contains('booked')) {
        e.target.classList.toggle('selected')
        const selectedSeats = document.querySelectorAll('.row .seat.selected')
        const seatIndex = [...selectedSeats].map((seat) => {

            return [...seats].indexOf(seat)
        })

        localStorage.setItem('selectedSeats', JSON.stringify(seatIndex))
        localStorage.setItem('movieIndex', movieSelect.selectedIndex)
        localStorage.setItem('ticketPrice', movieSelect.value)
        updateCost()
    }


})

//Event Listener for movieList

movieSelect.addEventListener('change', (e) => {

    ticketCost = e.target.value

    localStorage.setItem('movieIndex', e.target.selectedIndex)
    localStorage.setItem('ticketPrice', e.target.value)

    updateCost()

})