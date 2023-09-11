const { createApp, ref } = Vue

createApp({
    setup() {
        const username = ''
        const name = ''
        const users = ref([])

        return {
            username,
            name,
            users
        }
    },

    methods: {
        addUser() {
            if (!this.username || !this.name) return

            this.users.push({
                username: this.username,
                name: this.name
            })
        }
    }
}).mount("#app")
