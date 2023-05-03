## Latest Fixes

- If organization will no longer have acces to specific entity, the data about this entity will still be stored in database where sebscriber info is stored, but info will be no longer displayed to the user.
- The event description is displayed based on current description data for specific event. However, the database (where subscriber information is stored) will store descriptive data from the time the subscriber was created.

## Important info

- In case of changing the structure of the database, please contact me so that I can adapt the application.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `../static` directory.







## READ
Use: npm install --legacy-peer-deps to avoid ng-angular-popup conflicts.

The static folder will be created outside of this project direcotry by using `ng build`.

The project was run on localhost. The redirection settings are in proxy.conf.json.




