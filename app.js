const { createApp, ref } = Vue

createApp({
    setup() {
        const userForm = ref({})
        const loginEmail = 'Sincere@april.biz'
        const password = '1234'
        const isLogged = ref(localStorage.getItem('isLogged') ?? false)
        const usersList = ref([])
        const isInUserForm = ref(false)

        return {
            loginEmail,
            password,
            isLogged,
            usersList,
            isInUserForm,
            userForm
        }
    },

    mounted() {
        if (!this.isLogged) return

        fetch("users.json")
            .then(response => response.json())
            .then(users => this.usersList = users)
    },

    methods: {
        login() {
            fetch("users.json")
                .then(response => response.json())
                .then(users => {
                    const userFound = users.find(user => user.email === this.loginEmail && user.password === this.password)

                    this.isLogged = userFound !== undefined

                    alert(this.isLogged ? 'Bienvenido.' : 'El email o la contraseña no coinciden.')

                    if (!this.isLogged) return  

                    localStorage.setItem('userData', JSON.stringify(userFound))
                    localStorage.setItem('isLogged', this.isLogged)
                    this.usersList = users
                })
        },

        cancelUserForm() {
            this.isInUserForm = false

            this.userForm = {}
        },

        createUser() {
            this.isInUserForm = true
        },

        storeUser() {
            if (Object.values(this.userForm).length < 6) return

            // Cortesía de ChatGPT.
            const userId = this.usersList.reduce((maxId, user) => user.id > maxId ? user.id : maxId, 0)

            this.userForm.id = userId + 1
            this.usersList.push(this.userForm)
            this.isInUserForm = false

            this.userForm = {}
        },

        editUser(e) {
            const userId = +e.target.closest('tr').querySelector('input').value
            const user = this.usersList.find(user => user.id === userId)

            this.userForm = {
                id: user.id,
                username: user.username,
                name: user.name,
                email: user.email,
                city: user.city ?? user.address.city,
                street: user.street ?? user.address.street,
                phone: user.phone
            }

            this.isInUserForm = true
        },

        updateUser() {
            const user = this.usersList.find(user => user.id === this.userForm.id)

            user.username = this.userForm.username
            user.email = this.userForm.email
            user.name = this.userForm.name

            if (user.address) {
                user.address.city = this.userForm.city
                user.address.street = this.userForm.street
            } else {
                user.city = this.userForm.city
                user.street = this.userForm.street
            }

            user.phone = this.userForm.phone

            this.userForm = {}

            this.isInUserForm = false
        },

        destroyUser(e) {
            const userId = +e.target.closest('tr').querySelector('input').value
            const user = this.usersList.find(user => user.id === userId)
            const index = this.usersList.indexOf(user)

            if (JSON.parse(localStorage.getItem('userData')).id === user.id) {
                alert('Cannot delete your own user.')
                return
            }

            this.usersList.splice(index, 1)

            alert(`${user.name} deleted.`)
        },

    }
}).mount("#app")
