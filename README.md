# basic-info-site

A simple Node.js server built with Express that serves static HTML pages based on the request URL.

## Routes

Core capabilities:

- / or /home → Home
- /about → About
- /contact → Contact
- Any other route → 404

## Overview

- Uses Express for routing and middleware handling
- Serves HTML files using res.sendFile
- Centralized error handling via middleware

## Run Locally

### Setup

```bash
npm start
```

Alternative:

```bash
node --watch --env-file-if-exists=.env app.cjs
```

Open: http://localhost:8080

## Acknowledgements

- This project was completed as part of **[The Odin Project – Node.js Course](https://www.theodinproject.com/)**
