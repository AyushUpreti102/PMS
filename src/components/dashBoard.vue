<template>
    <v-container>
        <v-main style="padding: 0;">
            <DialogBox :btn="btn" v-if="!boilerplate"/>
            <v-skeleton-loader type="card" v-if="boilerplate"></v-skeleton-loader>
            <PollCard @changePage="change" v-if="!boilerplate"/>
        </v-main>
    </v-container>
</template>
<script>
import PollCard from './PollCard.vue';
import DialogBox from './DialogBox.vue'

export default {
    name: "dashBoard",
    components: { PollCard, DialogBox },
    computed: {
        show(){
            let show = localStorage.getItem('show')
            return JSON.parse(show);
        },
        boilerplate() {
            return this.$store.getters.boilerplate.pollPage;
        },
    },
    mounted() {
        this.$store.dispatch('listPolls');
        this.$store.dispatch('access', localStorage.getItem('token'));
        this.$store.dispatch('showBtnsInNavBar', 'dashBoard');
    },
    data() {
        return {
            dialog: false,
            btn: 'Add_Poll',
        };
    },
    methods: {
        change(){
            this.$store.dispatch('listPolls')
        }
    }
}
</script>
