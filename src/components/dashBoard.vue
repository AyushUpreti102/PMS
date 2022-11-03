<template>
    <v-container>
        <v-snackbar v-model="snackBar.snack" timeout="2000" color="success" top>{{snackBar.message}}</v-snackbar>
        <v-main>
            <navBar>
                <template v-slot:Logout>
                    <ToolTip :items="itemsList"/>
                </template>
            </navBar>
            <DialogBox :btn="btn" :condition="true"/>
            <PollCard @changePage="change"/>
        </v-main>
    </v-container>
</template>
<script>
import PollCard from './PollCard.vue';
import navBar from './navBar.vue';
import DialogBox from './DialogBox.vue'
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
        },
        itemsList(){
            let show = JSON.parse(localStorage.getItem('show'));
            if (show) {
                return  [
                    { title: 'Profile' },
                    { title: 'List Of Users' },
                    { title: 'Logout' },
                ]
            }
            else{
                return [
                    { title: 'Profile' },
                    { title: 'Logout' },
                ]
            }
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
    components: { PollCard, navBar, DialogBox, ToolTip }
}
</script>
