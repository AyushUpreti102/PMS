<template>
    <v-container>
        <v-layout row wrap>
            <v-flex v-for="(value, i) in users.poll" :key="i" xs12 sm6 md4 lg3 style="padding: 10px; min-width: 200px;">
                <v-card elevation="0" class="mx-auto">
                    <v-card-title>{{ value.title }}</v-card-title>
                    <v-card-text>
                        <v-radio-group v-model="value.radioGroup">
                            <v-radio v-for="n in value.options" :key="n.option" :label="`${n.option}`" :value="n.option"
                                @click="vote(value.id, value.radioGroup)">
                            </v-radio>
                        </v-radio-group>
                        <v-card-actions>
                            <v-btn text>edit</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn text>delete</v-btn>
                        </v-card-actions>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    name: 'PollCard',
    data() {
        return {

        }
    },
    computed: {
        users() {
            return this.$store.getters.users;
        }
    },
    methods: {
        vote(id, radioGroup) {
            this.$store.dispatch('vote', {id: id, radioGroup: radioGroup});
        }
    }
}
</script>
<style scoped>
.mx-auto {
    border: 1px solid lightgray;
}
</style>