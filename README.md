# Movies and TV Shows exploring application

## Build and run

After downloading or cloning the repository, make sure you are positioned in the root folder of the application and open terminal in that folder. To install the necessary dependencies, type:

### `npm install`

When the installation of dependencies is complete, you can start the application by typing the command:

### `npm start`

Depending on the environment you are using, the browser may automatically open to the required location. If not, manually enter the following URL in your browser: [http://localhost:3000](http://localhost:3000).

For code analysis, detecting style issues, and potential problems in the code, you can run **ESLint** using the command:

### `npm run lint`

Potential issues and warnings will be displayed in the terminal after running that command.

To run the tests, type:

### `npm test`

When running the tests, you may need to enter the letter "a" to run all the tests. In any case, follow the instructions. Once all the tests are executed, you will receive a report in the terminal indicating the total number of tests and how many passed/failed.

To build the application for production, i.e., to create the `build` folder, use the following command:

### `npm run build`

## Features
- Upon startup, you are presented with the top 10 highest-rated TV Shows. By switching tabs, you can alternate between viewing the top 10 movies or TV shows.
- To search for movies/TV shows based on their names, you need to type at least 3 letters from the title of the media you are interested in into the search bar. If you've searched for movies and are interested in TV shows with the same name, you don't have to type again, just switch to the other tab.
- The home page displays only basic information about the media. For more details, clicking on any movie/TV show opens a more detailed overview, including a trailer if available.
- Returning back, you won't lose the input and search results that were displayed to you before opening the details.
  
## Aditional information
- The application is fully **responsive** and suitable for use on tablets or mobile devices.
- Tests have been written using **React Testing Library**.
- **ESLint** has been used for code analysis.
- The data is fetched from [TMBD API](https://developers.themoviedb.org/3)

## Languages, Libraries & Tools
<p align="left"> <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="TypeScript" width="40" height="40"/> </a> <a href="https://react.dev/" target="_blank" rel="noreferrer"> <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" width="40" height="40"/> </a> 

## Contact
- Email: [bajricaminaa@gmail.com](mailto:bajricaminaa@gmail.com)
- LinkedIn: [Amina Bajric](https://www.linkedin.com/in/amina-bajric-b75619291/)
- GitHub: [abajric2](https://github.com/abajric2/)



