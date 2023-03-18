Here's an example docker-compose.yml file for running this app on an Nginx webserver with a Let's Encrypt certificate using certbot.

yaml
Copy code
version: "3"
services:
  web:
    build: .
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    depends_on:
      - api
    networks:
      - webnet
  api:
    build: ./football-app
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - OUTLOOK_CLIENT_ID=<outlook_client_id>
      - OUTLOOK_CLIENT_SECRET=<outlook_client_secret>
      - GOOGLE_CLIENT_ID=<google_client_id>
      - GOOGLE_CLIENT_SECRET=<google_client_secret>
    volumes:
      - ./football-app:/app
      - /app/node_modules
    networks:
      - webnet
  certbot:
    image: certbot/certbot
    volumes:
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    depends_on:
      - web
    command: certonly --webroot --webroot-path=/var/www/certbot --email <your_email> --agree-tos --no-eff-email -d <your_domain>
networks:
  webnet:
In this example, we have three services:

web: This service runs the Nginx web server and forwards requests to the api service. It also listens on ports 80 and 443 for HTTP and HTTPS requests, respectively.
api: This service runs the Node.js app and listens on port 3000.
certbot: This service requests and renews the Let's Encrypt SSL certificate for the web service.
You will need to replace <outlook_client_id>, <outlook_client_secret>, <google_client_id>, <google_client_secret>, <your_email>, and <your_domain> with your own values.

Note that you will need to create a certbot directory in the same directory as your docker-compose.yml file and create two subdirectories inside it: conf and www. The conf directory will contain the Let's Encrypt certificate files, and the www directory will contain the files served by the certbot service to prove domain ownership during the certificate issuance process.

Also, you will need to modify the web service's Dockerfile to copy the Nginx configuration file to the appropriate directory (/etc/nginx/conf.d/default.conf). You can add the following line to the end of the web service's Dockerfile:

javascript
Copy code
COPY nginx.conf /etc/nginx/conf.d/default.conf
This assumes that you have an nginx.conf file in the same directory as your docker-compose.yml file that contains the appropriate Nginx configuration for your app.