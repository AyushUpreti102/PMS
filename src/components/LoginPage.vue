<template>
    <v-container>
        <v-layout>
            <v-flex>
                <v-card elevation="1" width="60%" class="mx-auto">
                    <v-card-title>Login</v-card-title>
                    <v-card-subtitle>
                        <UserForm />
                    </v-card-subtitle>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import UserForm from './UserForm.vue';

export default {
    name: "LoginPage",
    components: { UserForm }
}
</script>
<style scoped>
.mx-auto {
    padding: 50px 10px;
}
</style>
