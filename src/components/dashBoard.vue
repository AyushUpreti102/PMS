<template>
    <v-container>
        <v-skeleton-loader type="card" v-if="boilerplate"></v-skeleton-loader>
        <v-main>
            <DialogBox :btn="btn" :addClass="true"/>
            <PollCard @changePage="change"/>
        </v-main>
    </v-container>
</template>
<script>
import PollCard from './PollCard.vue';
import DialogBox from './DialogBox.vue'

export default {
    name: "dashBoard",
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
        this.$store.dispatch('access', localStorage.getItem('user'));
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
        },
    },
    components: { PollCard, DialogBox }
}
</script>
