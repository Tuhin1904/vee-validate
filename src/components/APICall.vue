<template>
    <div>
    <h1>
        API Call Page
    </h1>
    <div>
    <h4>Add new user</h4>
    <form @submit.prevent="addUser">
        <label for="name">Name:</label>
        <input v-model="newUser.name" type="text" id="name" required>
  
        <label for="email">Email:</label>
        <input v-model="newUser.email" type="email" id="email" required>
  
        <button type="submit">Add User</button>
      </form>
    </div>
              
    <div>
        <label for="search">Search:</label>
        <input v-model="searchTerm" @input="searchUsers" type="text" id="search" placeholder="Search by name or email">
        <!-- <button @click="searchUsers">Search</button> -->
      </div>
    
    <table>
        <thead>
          <tr>
            <th style="width: 50px;">ID</th>
            <th style="width: 150px;">Name</th>
            <th style="width: 200px;">Email</th>
            <th style="width: 100px;">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, i) in (searchTerm ? filteredUsers : users)" :key="user.id">
            <td>{{ i+1 }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
                <button @click="deleteUser(user.id)">Delete</button>
              </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>

export default{
    name:'APICall',
    data(){
        return {
            users:[],
            apiUrl: 'https://jsonplaceholder.typicode.com/users',
            newUser: { name: '', email: '' },
            searchTerm: '',
            filteredUsers: [],
        }
    },
    // calls the function when ever the page is loaded
     mounted() {
           this.getAPIresult()
        },

    methods:{

        // get request using axios 
        getAPIresult(){
            this.$axios
            .get(this.apiUrl)
            .then(response => {
                this.users = response.data
                // console.log(response)
        })
        .catch(error => {
        
          console.error('Error fetching API data:', error);
        });
        },
        // delete request using axios
        deleteUser(id){
                this.$axios.delete(`${this.apiUrl}/${id}`)
                .then(res =>{
                    console.log("User deleted",res)
                   
                    const updatedUsers = this.users.filter(user => user.id !== id);
                    this.users = updatedUsers;
                    if (this.searchTerm) {
                    this.filteredUsers = this.filterUsers(this.searchTerm);
          }
                })
                .catch(err => console.log("Error deleting user", err))
        },
        
        // for adding new user
        addUser() {
                this.$axios.post(this.apiUrl, this.newUser)
                    .then(response => {
                    console.log('User added:', response.data);
                    this.newUser = { name: '', email: '' };
                    this.users.push(response.data);
                    if (this.searchTerm) {
                        this.filteredUsers = this.filterUsers(this.searchTerm);
          }
                })
                .catch(error => {
                    console.error('Error adding user:', error);
                });
        },
        searchUsers() {
            this.filteredUsers = this.filterUsers(this.searchTerm);
            },
            filterUsers(searchTerm) {
                if(!searchTerm){
                    return this.users;
                }
            return this.users.filter(
                (user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
        
    },

}
</script>

<!-- searchUsers() {
    const searchTerm = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(
        user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
    }, -->