<template>
  <v-container>
    <v-container column>
      <h6 class="title">อัปโหลดข้อมูลนักศึกษา</h6>
      <v-layout>
        <v-flex xs12 sm6 md4 d-flex>
          <v-csv-import v-model="fileInput" :map-fields="headers"></v-csv-import>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import VCsvImport from 'vue-csv-import'

export default {
  components: {
    VCsvImport
  },
  data () {
    return {
      headers: ['รหัสนักศึกษา', 'ชื่อ - สกุล', 'GPAX', 'ปีการศึกษา'],
      fileInput: ''
    }
  }
}
</script>
