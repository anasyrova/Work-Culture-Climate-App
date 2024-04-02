const Teams_table = {
    data() {
        return {
            teams: []
        }
      },
    mounted() {
        fetch('/Teams')
            .then(response => response.json())
            .then(data => this.teams = data)
            .catch(err => console.log(err.message))
      },
    template: `
        <h1 class="center">Teams</h1>
        <table>
            <tr>
                <th>Team Name</th>
                <th>Mean Polarity</th>
                <th>Team Standard Deviation</th>
                <th>Mean of all Employees Mean Polarity</th>
                <th>Standard Deviation of Mean Polarity of all Employees</th>
                <th>Z-Score Relative to all Employees</th>
            </tr>
            <tr v-for="team in teams">
                <td>{{team.team_name}}</td>
                <td>{{team.mean_polarity}}</td>
                <td>{{team.team_std}}</td>
                <td>{{team.mean_of_all_employees_mean_polarity}}</td>
                <td>{{team.org_std_of_all_employees_mean_polarity}}</td>
                <td>{{team.z_score_relative_to_the_org}}</td>
            </tr>
        </table>
    `
}

const Employees_table = {
    data() {
        return {
            employees: []
        }
    },
    mounted() {
        fetch('/Employees')
            .then(response => response.json())
            .then(data => this.employees = data)
            .catch(err => console.log(err.message))
    },
    template: `
        <h1 class="center">Employees</h1>
        <table>
            <tr>
                <th>employee id</th>
                <th>team name</th>
                <th>email</th>
                <th>years worked</th>
                <th>mean polarity</th>
                <th>teams mean polarity</th>
                <th>teams std polarity</th>
                <th>z score relative to team</th>
                <th>org mean of all employees mean polarity</th>
                <th>org std of all employees mean polarity</th>
                <th>z score relative to org</th>
            </tr>
            <tr v-for="employee in employees">
                <td>{{employee.employee_id}}</td>
                <td>{{employee.team_name}}</td>
                <td>{{employee.email}}</td>
                <td>{{employee.years_worked}}</td>
                <td>{{employee.mean_polarity}}</td>
                <td>{{employee.teams_mean_polarity}}</td>
                <td>{{employee.teams_std_polarity}}</td>
                <td>{{employee.z_score_relative_to_team}}</td>
                <td>{{employee.org_mean_of_all_employees_mean_polarity}}</td>
                <td>{{employee.org_std_of_all_employees_mean_polarity}}</td>
                <td>{{employee.z_score_relative_to_org}}</td>
            </tr>
        </table>
    `
}

const Messages_table = {
    data() {
        return {
            messages: []
        }
    },
    mounted() {
    fetch('/messages')
        .then(response => response.json())
        .then(data => this.messages = data)
        .catch(err => console.log(err.message))
    },
    template: `
        <h1 class="center">Messages</h1>
        <table>
            <tr>
                <th>message_id</th>
                <th>employee_id</th>
                <th>other_messages</th>
                <th>polarity</th>
            </tr>
            <tr v-for="message in messages">
                <td>{{message.message_id}}</td>
                <td>{{message.employee_id}}</td>
                <td>{{message.other_messages}}</td>
                <td>{{message.polarity}}</td>
            </tr>
        </table>
    `
}
  
const app = Vue.createApp({
    data() {
        return {
            showBooks: true,
            title: "final empire",
            author: "author",
            age: 45,
            books: [
                { title: 'name of the wind', author: 'patrick rothfuss', img: 'assets/1.jpg', isFav: true},
                { title: 'the way of kings', author: 'brandon sanderson', img: 'assets/2.jpg', isFav: false },
                { title: 'the final empire', author: 'brandon sanderson', img: 'assets/3.jpg', isFav: false },
              ],
            x: 0,
            y: 0,
            url: "https://google.com",
            showTeamsTable: false,
            showEmployeesTable: false,
            showMessagesTable: false,
            // teams: [],
            // employees: [],
            // messages: []
        }
    },
    methods: {
        toggleTeamsTable() {
            this.showTeamsTable = !this.showTeamsTable
            this.showEmployeesTable = false;
            this.showMessagesTable = false;
            
        },
        toggleEmployeesTable() {
            this.showTeamsTable = false;
            this.showEmployeesTable = !this.showEmployeesTable
            this.showMessagesTable = false;
        },
        toggleMessagesTable() {
            this.showTeamsTable = false;
            this.showEmployeesTable = false;
            this.showMessagesTable = !this.showMessagesTable
        }
    },
    computed: {
    }, 
    mounted() {
    },
    components: {
        Teams_table,
        Employees_table,
        Messages_table
    },
    template:
        `
        <div class="menu">
            <button v-if="showTeamsTable" :class="{ selected: showTeamsTable}" @click="toggleTeamsTable">Hide Teams Table</button>
            <button v-if="!showTeamsTable" :class="{ selected: showTeamsTable}" @click="toggleTeamsTable">Show Teams Table</button>
            
            <button v-if="showEmployeesTable" :class="{ selected: showEmployeesTable}" @click="toggleEmployeesTable">Hide Employees Table</button>
            <button v-if="!showEmployeesTable" :class="{ selected: showEmployeesTable}"  @click="toggleEmployeesTable">Show Employees Table</button>

            <button v-if="showMessagesTable" :class="{ selected: showMessagesTable}" @click="toggleMessagesTable">Hide Messages Table</button>
            <button v-if="!showMessagesTable" :class="{ selected: showMessagesTable}" @click="toggleMessagesTable">Show Messages Table</button>
        </div>

        <div v-if="showTeamsTable">
            <Teams_table />
        </div>
        <div v-if="showEmployeesTable">
            <Employees_table />
        </div>
        <div v-if="showMessagesTable">
            <Messages_table />
        </div>
        `

})

app.mount('#app')