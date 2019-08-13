<template>
  <v-container>
    <v-card class="elevation-3 mx-auto" width="600">
      <v-card-title>ข้อมูลปีการศึกษา</v-card-title>
      <v-card-text>
        <v-layout column wrap align-start>
          <v-flex xs12 sm6 md4>
            <Seat :dialog="dialog"></Seat>
          </v-flex>
          <v-flex>
            <v-data-table :headers="headers">
              <template v-slot:item.edit="{ item }">
                <v-flex>
                  <v-btn>
                    <v-icon>mdi-content-save-edit</v-icon>
                  </v-btn>
                </v-flex>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Seat from "./parts/Seat";

export default {
  components: {
    Seat
  },
  data() {
    return {
      dialog: null,
      headers: [
        {
          text: "รหัสนักศึกษา",
          value: "id"
        },
        {
          text: "ชื่อ - สกุล",
          value: "name"
        },
        {
          text: "GPAX",
          value: "gpax"
        },
        {
          text: "Edit"
        }
      ]
    };
  },
};
</script>
