<template>
    <v-container>
        <v-layout row wrap>
            <v-flex v-for="(value) in users.poll" :key="value.id" xs12 sm6 md4 lg3 style="padding: 10px;">
                <v-card elevation="0" class="mx-auto">
                    {{ value.id }}
                    <v-card-title>{{ value.title }}</v-card-title>
                    <v-card-text>
                        <v-radio-group v-model="radioGroup">
                            <v-radio v-for="n in value.options" :key="n.option" :label="`${n.option}`" :value="n.option"
                                @click="vote">
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
            radioGroup: null,
        }
    },
    computed: {
        users() {
            return this.$store.getters.users;
        }
    },
    methods: {
        vote() {
            // this.$store.dispatch('vote', this.radioGroup);
        }
    }
}
</script>
<style scoped>
.mx-auto {
    border: 1px solid lightgray;
}
</style>