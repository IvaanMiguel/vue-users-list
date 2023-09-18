const { createApp, ref } = Vue

createApp({
    setup() {
        // const username = ''
        // const name = ''
        const email = ''
        const password = ''
        // const users = ref([])

        return {
            // username,
            // name,
            email,
            password,
            // users
        }
    },

    methods: {
        login(e) {
            e.preventDefault()

            fetch("users.json")
                .then(response => response.json())
                .then(users => {
                    const userFound = users.find(user => user.email === this.email && user.password === this.password)

                    alert(userFound ? 'Bienvenido.' : 'El email o la contraseña no coinciden.')

                    if (!userFound) return

                    console.log('Guardando datos.')
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
