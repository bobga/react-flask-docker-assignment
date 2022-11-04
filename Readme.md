# ReactJS + Flask (REST API) + PostgreSQL boilerplate with Docker

This project allows to run a quick application with ReactJS (Javascript front-end), Flask (Python backend) and PostgreSQL (relational database) by running it on Docker containers.

### Features

A database named `sport_stats` (user: myuser / password: mypassword) is initialized when the database container start. These default values can be changed in the `docker-compose.yml` file.
Tables `projects`, `files`, `users` are created by copying the file `db/init/init.sql` into the `/docker-entrypoint-initdb.d/` container directory ([see documentation of postgres official image](https://hub.docker.com/_/postgres/)).

The Flask application uses SQLAlchemy to retrieve the list of the `projects`, ReactJS call the REST API and display it !

On the Frontend side, if you click a project among the list, it redirects to `projects/:project_id` page and display `users` list and `files` list in seperate tabs.

Created tables that supports server-side sorting and filtering using ([react-bootstrap-table2](https://github.com/react-bootstrap-table/react-bootstrap-table2)).

### PostgresQL Table Relationship
Projects <-> Files  :  `1 to Many`

Projects <-> Users :  `Many to Many`

**Hot reloading** is enabled for the React and Flask code, after every code change the container is up-to-date automatically !

### Run the app

Everything is containerized from the client, backend to the database. So all you need is Docker installed, and then you can run :

```
docker-compose up --build
```

And your app will be up on the *port 3000* !

### Special notes

##### Using Docker Toolbox

This project was implemented with [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/), which need some fixes ([read my article on medium for more information](https://medium.com/@thimblot/using-docker-on-windows-without-hyper-v-troubleshooting-tips-2949587f796a)) before running the `docker-compose up` command.
That's the goal of the `docker-compose-up.sh` file at the root of the project, use it instead of the `docker-compose up` command if you are running Docker with the Toolbox.

Flask and ReactJS part of the application use the IP adress / port for containers communication (see `config.py` and `config.js`). You can normally use the name of the service located on the docker-compose.yml, but it doesn't seems to work using Docker Toolbox !

##### Reloading Database configuration

If you change user, password, database name or any other kind of database configuration, you may need to run `docker-compose -up --build` from a fresh start. Make sure to run `docker-compose down` before or even `docker-compose rm` if some containers are stopped but not destroyed.