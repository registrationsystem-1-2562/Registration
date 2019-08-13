<template>
  <v-container>
    <v-card class="elevation-3 mx-auto">
      <v-card-title>ข้อมูลปีการศึกษา</v-card-title>
      <v-card-text>
        <v-layout column wrap align-start d-flex>
          <v-flex xs12 sm6 md4>
            <Seat :dialog="dialog"></Seat>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Seat from './parts/Seat'

export default {
    components: {
        Seat
    },
    data () {
        return {
            dialog: null
        }
    }
}
</script>
