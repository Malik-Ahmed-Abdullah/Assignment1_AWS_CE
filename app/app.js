require("dotenv").config();

const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

const API_KEY = process.env.TICKETMASTER_API_KEY;

const API_URL = `https://app.ticketmaster.com/discovery/v2/events.json?size=5&apikey=${API_KEY}`;

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    const events = response.data._embedded.events;

    let html = "<h1>University Events</h1>";

    events.forEach(event => {
      html += `
        <div>
          <h3>${event.name}</h3>
          <p>Date: ${event.dates.start.localDate}</p>
          <p>Venue: ${event._embedded.venues[0].name}</p>
          <img src="${event.images[0].url}" width="200"/>
        </div>
        <hr/>
      `;
    });

    res.send(html);
  } catch (err) {
    res.send("Error fetching events");
  }
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));