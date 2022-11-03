<template>
    <v-container>
        <v-layout row wrap>
            <v-flex v-for="(value, index) in poll" :key="index" xs12 sm6 md4 lg3 style="padding: 10px; min-width: 200px;">
                <v-card elevation="0" class="mx-auto">
                    <v-card-title>{{ value.title }}</v-card-title>
                    <v-card-text>
                        <v-radio-group v-model="value.radioGroup">
                            <v-radio v-for="n in value.options" :key="n.option" :label="`${n.option}`" :value="n.option" :disabled="show"
                                @click="vote(value._id, value.radioGroup)">
                            </v-radio>
                        </v-radio-group>
                        <v-card-actions>
                            <PollDetails :btn="btn" :options="value.options" :pollTitle="value.title" :id="value._id" :idx="index"></PollDetails>
                            <v-spacer></v-spacer>
                            <v-btn text @click="deletePoll(value._id, index)" v-if="show">delete</v-btn>
                        </v-card-actions>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <div class="text-center">
            <v-pagination v-model="page" :length="12" style="margin-top: 10px;" @input="next"></v-pagination>
        </div>
    </v-container>
</template>
<script>
import PollDetails from './PollDetails.vue';
export default {
    name: "PollCard",
    data() {
        return {
            page: 1,
            totalPage: 12,
            itemsPerPage: 12,
            btn: 'Edit'
        };
    },
    computed: {
        poll() {
            return this.$store.getters.poll;
        },
        show() {
            let show = localStorage.getItem("show");
            return JSON.parse(show);
        },
        snackBar() {
            return this.$store.getters.snackBar;
        },
    },
    methods: {
        vote(id, radioGroup) {
            this.$store.dispatch("vote", { id: id, radioGroup: radioGroup });
        },
        deletePoll(id, i) {
            this.$store.dispatch("deletePoll", { id: id, idx: i });
        },
        next() {
            let page = (this.page - 1) * this.itemsPerPage;
            let items = (this.page - 1) * this.itemsPerPage + this.itemsPerPage;
            this.$store.dispatch("pagination", { start: page, end: items });
            this.$emit("changePage");
        },

    },
    components: { PollDetails }
}
</script>
<style scoped>
.mx-auto {
    border: 1px solid lightgray;
}
</style>