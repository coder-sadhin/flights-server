const express = require('express')
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server Is running")
    // res.send('flights api is running')
})

const flights = require('./data/flights.json')
const routes = require('./data/routes.json')

app.get('/routes', (req, res) => {
    res.send(routes)
})


app.post('/flights', (req, res) => {
    const { from, to, date } = req.body;
    const offerFlight = flights[0].flightOffer;
    // console.log(from, to, date);
    const matched = offerFlight.filter(flight => flight.itineraries[0].segments[0].departure.iataCode === from &&
        flight.itineraries[0].segments[0].arrival.iataCode === to
        && flight.itineraries[0].segments[0].departure.at.includes(date) === true);
    // console.log(matched);
    // console.log("match hoyeche");
    if (matched.length > 0) {
        res.send(matched)
    }
    else {
        res.send([])
    }
})

app.listen(port, () => {
    console.log('news server is running', port);
})