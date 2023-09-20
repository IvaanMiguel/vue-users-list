const { createApp, ref } = Vue

createApp({
    setup() {
        // const username = ''
        // const name = ''
        const email = 'Sincere@april.biz'
        const password = '1234'
        const isLogged = ref(localStorage.getItem('isLogged') ?? false)
        const usersList = ref([])
        // const users = ref([])

        return {
            // username,
            // name,
            email,
            password,
            isLogged,
            usersList
            // users
        }
    },

    mounted: function() {
        if (!this.isLogged) return

        fetch("users.json")
            .then(response => response.json())
            .then(users => this.usersList = users)
    },

    methods: {
        login(e) {
            e.preventDefault()

            fetch("users.json")
                .then(response => response.json())
                .then(users => {
                    const userFound = users.find(user => user.email === this.email && user.password === this.password)

                    this.isLogged = userFound !== undefined

                    alert(this.isLogged ? 'Bienvenido.' : 'El email o la contraseña no coinciden.')

                    if (!this.isLogged) return

                    localStorage.setItem('userData', JSON.stringify(userFound))
                    localStorage.setItem('isLogged', this.isLogged)
                    this.usersList = users
                })

            // if (!this.username || !this.name) return

            // this.users.push({
            //     username: this.username,
            //     name: this.name
            // })

            // this.username = ""
            // this.name = ""
        }
    }
}).mount("#app")
