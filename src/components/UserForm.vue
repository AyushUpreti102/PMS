<template>
    <v-container>
        <v-form>
            <v-text-field label="Username" required></v-text-field>
            <v-select :items="items" label="Role" outlined></v-select>
            <v-text-field label="Password" type="password" required></v-text-field>
            <v-btn depressed color="primary">Signup</v-btn>
        </v-form>
    </v-container>
</template>
<script>

export default {
    name: 'UserForm',
    data() {
        return {
            items: ['Admin', 'guest'],
        }
    }
}
</script>