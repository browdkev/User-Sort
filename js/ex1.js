class Exercise {
    constructor() {
        this.users = [];
        this.template = "";

    }
    /**
     * Initialize
     * @returns {Promise<void>}
     */
    async init() {
        //Need to await since fetch is async (it goes and does it's thing while the program continues)
        this.users = await this.getUsers();
        console.log("Data Imported")
        //Select table template html as a string from templates
        this.tableTemplate = this.getTemplates();
        //Bind events to buttons
        this.bindEvents();
        //Sort Data Alphabetically by username or anything else
        this.sortUsers('name');
    }
    /*
     *Gets current value from drop down list and calls sort on that value
     */
    buttonPress() {
      let ddlSortBy = document.getElementById("ddlSortBy");
      this.sortUsers(ddlSortBy.value);
    }
    
    bindEvents() {
        //For bonus points add event listener to the button to re-sort asc->desc order and vice versa
        let sortButton = document.getElementById("sortButton");
        //call buttonPress when sort button is pressed
        sortButton.addEventListener("click", this.buttonPress.bind(this));  // this.sortUsers.bind(this, ddlSortBy.value)
    }

    /*
     *Renders list using mustache js
     */
    render() {
        let data = { users: this.users };
        let tableContainer = document.getElementById("tableContainer");
        //You will need to edit ex1.mustache to render the correct data
        tableContainer.innerHTML = Mustache.render(this.tableTemplate, data);
    }

    /**
     * Get template for table
     * @returns {String}
     */
    getTemplates() {
        return document.querySelector("#tableTemplate").innerHTML;
    }

    /**
     * Sort the array of users and renders to list
     * @param input string that sends in which element of the object to sort on
     */
    sortUsers(input) {
      //compare method for sort function that sorts on given input key
      function compare(key, order = 'asc') {
        return function innerSort(a, b) {
          if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
          }
          //convert to upper case, ignores case in sorting
          const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
          const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];

          let comparison = 0;
          //determine which is larger
          if (varA > varB) {
            comparison = 1;
          } else if (varA < varB) {
            comparison = -1;
          }
          return (
            //reverse order if decending
            (order === 'desc') ? (comparison * -1) : comparison
          );
        };
      }
      this.users = this.users.sort(compare(input));
      //render the freshly sorted list
      this.render();
    }
    /**
     * Fetch users from 'https://jsonplaceholder.typicode.com/users'
     * @returns {Promise<void>}
     */
    async getUsers() {
        var response = await fetch('https://jsonplaceholder.typicode.com/users')
        return response.json()
    }
}

let ex = new Exercise();
ex.init();
