<template>
    <v-container>
        <v-snackbar v-model="snackBar.snack" timeout="2000" color="success" top>{{snackBar.message}}</v-snackbar>
        <v-main>
            <navBar>
                <template v-slot:Logout>
                    <ToolTip />
                </template>
            </navBar>
            <PollDetails :btn="btn" :condition="true"></PollDetails>
            <PollCard @changePage="change"/>
        </v-main>
    </v-container>
</template>
<script>
import PollCard from './PollCard.vue';
import navBar from './navBar.vue';
import PollDetails from './PollDetails.vue';
import ToolTip from './ToolTip.vue';

export default {
    name: "dashBoard",
    computed: {
        snackBar() {
            return this.$store.getters.snackBar;
        },
        show(){
            let show = localStorage.getItem('show')
            return JSON.parse(show);
        }
    },
    mounted() {
        this.$store.dispatch('listPolls');
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
    components: { PollCard, navBar, PollDetails, ToolTip }
}
</script>
