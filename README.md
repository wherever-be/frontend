# Wherever be...?

With this web application, you can arrange the flights for meeting with friends from different countries. Currently, only Ryanair flights are considered.

## Development

After cloning this repository, run `npm install` and then `npm start` to launch the local development environment (based on create-react-app).

To update the set of supported airports, cities and countries, run `node misc/fetch-airports-countries-cities.js`.

## Deployment

First, in this repository on your local machine:

1. `ssh ubuntu@16.170.194.97 'rm -rf /home/ubuntu/frontend/build'`
2. `npm run build`
3. `scp -r build ubuntu@16.170.194.97:/home/ubuntu/frontend`
4. `ssh ubuntu@16.170.194.97`

Then in the SSH session:

5. `screen -R frontend`
6. Ctrl+C
7. `git pull`
8. `sudo npm run serve`
9. Ctrl+A, then D

Finally, the server runs at http://wherever.be and https://wherever.be.

## License 

GPL 3.0 or later
