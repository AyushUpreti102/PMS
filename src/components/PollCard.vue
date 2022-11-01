<template>
    <v-container>
        <v-layout row wrap>
            <v-flex v-for="(value, index) in poll" :key="index" xs12 sm6 md4 lg3 style="padding: 10px; min-width: 200px;">
                <v-card elevation="0" class="mx-auto">
                    <v-card-title>{{ value.title }}</v-card-title>
                    <v-card-text>
                        <v-radio-group v-model="value.radioGroup">
                            <v-radio v-for="n in value.options" :key="n.option" :label="`${n.option}`" :value="n.option"
                                @click="vote(value.id, value.radioGroup)">
                            </v-radio>
                        </v-radio-group>
                        <v-card-actions>
                            <div class="text-center">
                                <v-dialog v-model="dialog" width="500">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn text v-bind="attrs" v-on="on">Edit Poll</v-btn>
                                    </template>
                            
                                    <v-card>
                                        <v-card-title class="text-h5 grey lighten-3">
                                            Edit Poll
                                        </v-card-title>
                            
                                        <v-card-text>
                                            <v-form>
                                                <v-text-field v-model="title"></v-text-field>
                                                <div class="d-flex">
                                                    <v-text-field v-model="option" label="Add New Option"></v-text-field>
                                                    <v-spacer></v-spacer>
                                                    <v-icon style="cursor: pointer;">mdi-plus-box</v-icon>
                                                </div>
                                            </v-form>
                                            <v-list-item>
                                                <v-list-item-content>
                                                    <v-list-item-title>Added options</v-list-item-title>
                                                    <!-- <div class="d-flex" v-for="(val, i) in options" :key="i">
                                                        <v-list-item-subtitle>{{'- '+val.option}}</v-list-item-subtitle>
                                                        <v-icon style="cursor: pointer;" @click="deleteOption(value.id, val.option, i, index)">mdi-delete</v-icon>
                                                    </div> -->
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-card-text>
                            
                                        <v-divider></v-divider>
                            
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="primary" text @click="save">Save Changes</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </div>
                            <v-spacer></v-spacer>
                            <v-btn text @click="deletePoll(value._id, index)">delete</v-btn>
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
export default {
    name: 'PollCard',
    data() {
        return {
            dialog: false,
            title: '',
            options: null,
            option: '',
            page: 1,
            totalPage: 12,
            itemsPerPage: 31,
        }
    },
    computed: {
        poll() {
            return this.$store.getters.poll;
        }
    },
    methods: {
        vote(id, radioGroup) {
            this.$store.dispatch('vote', {id: id, radioGroup: radioGroup});
        },
        deletePoll(id, i){
            console.log(id, i);
            this.$store.dispatch('deletePoll', {id: id, idx: i})
        },
        editCard(title, options,i){
            // this.title=title;
            // this.options=options;
            console.log(i, title, options);
        },
        deleteOption(id, option, i, index){
            console.log(id, option, i);
            this.$store.dispatch('deleteOption', {pollIndex: index, optionIndex: i, id: id, option: option});
        },
        addNewOptionsToPoll(id, option, index){
            // this.options.lenght=this.options.lenght+1;
            this.$store.dispatch('addNewOptionsToPoll', {pollIndex: index, id: id, option: option});
            this.option='';
        },
        save(){
            this.dialog=false;
        },
        next(){
            let page = (this.page-1)*this.itemsPerPage;
            let items = (this.page-1)*this.itemsPerPage+this.itemsPerPage
            this.$store.dispatch('pagination', {start: page, end: items});
            this.$emit('changePage')
        }
    }
}
</script>
<style scoped>
.mx-auto {
    border: 1px solid lightgray;
}
</style>