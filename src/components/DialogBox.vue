<template>
    <div class="text-right">
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" depressed @click="edit" v-if="show">{{ btn+' ' }} <v-icon small>{{icon}}</v-icon></v-btn>
            </template>

            <v-card>
                <v-card-title class="text-h5 grey lighten-3">
                    <p>{{ btn }}</p>
                    <v-spacer></v-spacer>
                    <v-btn text style="position: relative; bottom: 10px;" @click="closePoll">X</v-btn>
                </v-card-title>

                <v-card-text>
                    <v-form>
                        <v-text-field label="Poll Title" v-model="title"></v-text-field>
                        <div class="d-flex">
                            <v-text-field label="Poll Options" v-model="option"></v-text-field>
                            <v-btn depressed color="white" @click="addOptions" style="margin-top: 10px;">
                                <v-icon color="green">mdi-plus-box</v-icon>
                            </v-btn>
                        </div>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>Added options</v-list-item-title>
                                <v-list-item-subtitle v-for="(val, i) in pollOptions" :key="i">
                                    <div class="d-flex">
                                        <p>{{ '- ' + val.option }}</p>
                                        <v-spacer></v-spacer>
                                        <v-icon style="cursor: pointer;" @click="deleteOption(i, val.option)" color="red">mdi-delete
                                        </v-icon>
                                    </div>
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="task">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    name: 'DialogBox',
    props: ['btn', 'icon','options', 'pollTitle', 'id', 'indx', 'addClass'],
    data() {
        return {
            dialog: false,
            title: '',
            option: '',
            pollOptions: [],
            editOptions: null,
            delOption: ''
        };
    },
    computed: {
        show(){
            let show = localStorage.getItem('show')
            return JSON.parse(show);
        }
    },
    methods: {
        edit() {
            if (this.btn === 'Edit') {
                this.pollOptions = this.options.map(el => el);
                this.title = this.pollTitle;
            }
        },
        addOptions() {
            if (this.btn === 'Add_Poll') {
                this.pollOptions.push({ option: JSON.parse(JSON.stringify(this.option)), vote: 0 });
                this.option = ''
            }
            if (this.btn === 'Edit') {
                this.pollOptions.push({ option: JSON.parse(JSON.stringify(this.option)), vote: 0 });
                this.option = ''
                this.$store.dispatch('addNewOptionsToPoll', { id: this.id, index: this.indx, option: this.pollOptions[this.pollOptions.length - 1].option, options: this.pollOptions });
            }
        },
        deleteOption(i, val) {
            if (this.btn === 'Add_Poll') {
                this.pollOptions.splice(i, 1);
            }
            if (this.btn === 'Edit') {
                if(this.pollOptions.length < 3){
                    this.$store.dispatch('validate', '2 options are mandatory else delete the poll');
                }
                else {
                    this.pollOptions.splice(i, 1);
                    this.delOption = val
                    this.$store.dispatch('deletePollOptions', { pollId: this.id, options: this.pollOptions, index: this.indx, option: this.delOption })
                }
            }
        },
        task() {
            if (this.btn === 'Add_Poll') {
                if (this.title !== '') {
                    if (this.pollOptions.length > 1) {
                        this.dialog = false
                        this.$store.dispatch('addPoll', JSON.stringify({ title: this.title, options: this.pollOptions }));
                        this.pollOptions.splice(0, this.pollOptions.length);
                        this.title = ''
                    } else {
                        this.$store.dispatch('validate', '2 options are mandatory in poll');
                    }
                }
                else {
                    this.$store.dispatch('validate', 'Add title for poll');
                }
            }
            else {
                if (this.title !== this.pollTitle) {
                    this.$store.dispatch('changeTitle', { pollId: this.id, pollTitle: this.title, index: this.indx });
                }
                this.dialog = false;
            }
        },
        closePoll() {
            if (this.btn === 'Add Poll') {
                this.pollOptions.splice(0, this.pollOptions.length);
                this.title = ''
                this.dialog = false;
            }
            else {
                this.dialog = false;
            }
        },
    },
}
</script>
