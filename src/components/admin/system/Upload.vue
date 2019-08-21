<template>
  <v-container align-center justify-center fill-height align-content-center>
    <v-layout row>
      <v-card min-width="300">
        <v-card-title>อัปโหลดข้อมูลนักศึกษา</v-card-title>
        <v-card-text>
          <v-layout column>
            <v-flex xs12 sm6 md4 d-flex>
              <v-csv-import v-model="fileInput" :map-fields="headers">
                <template slot="hasHeaders" slot-scope="{headers, toggle}">
                  <v-checkbox label="Header?" :value="headers" @change="toggle"></v-checkbox>
                </template>
                <template slot="error">ชนิดไฟล์ไม่ถูกต้อง</template>
                <template slot="next" slot-scope="{load}">
                  <v-btn @click.prevent="load" class="mt-3" color="primary">โหลดข้อมูล</v-btn>
                </template>
                <template slot="submit" slot-scope="{submit}">
                  <v-btn @click.prevent="submit" color="primary">send!</v-btn>
                </template>
              </v-csv-import>
            </v-flex>
            <v-flex>
              <v-btn color="success" class="mt-3" @click="importData">นำเข้าข้อมูล</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-card class="ml-3" min-width="900">
        <v-card-text>
          <v-flex>
            <v-simple-table>
              <thead>
                <tr>
                  <th>รหัสนักศึกษา</th>
                  <th>ชื่อ</th>
                  <th>สกุล</th>
                  <th>ปีการศึกษา</th>
                  <th>GPAX</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="file in fileInput" :key="file.รหัสนักศึกษา">
                  <td>{{ file.รหัสนักศึกษา }}</td>
                  <td>{{ file.ชื่อ }}</td>
                  <td>{{ file.สกุล }}</td>
                  <td>{{ file.ปีการศึกษา }}</td>
                  <td>{{ file.GPAX }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-flex>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import VCsvImport from "vue-csv-import";
import firebase from 'firebase'

export default {
  components: {
    VCsvImport
  },
  data() {
    return {
      headers: ["รหัสนักศึกษา", "ชื่อ", "สกุล", "ปีการศึกษา", "GPAX"],
      fileInput: []
    };
  },
  methods: {
    importData: function () {
      if (this.fileInput.length > 0) {
        this.fileInput.forEach(data => {
          firebase.database().ref('student/' + data.รหัสนักศึกษา).set({
            firstname: data.ชื่อ,
            lastname: data.สกุล,
            year: data.ปีการศึกษา,
            gpax: data.GPAX
          })
        })

        this.fileInput.forEach(data => {
          firebase.database().ref('student_login/' + data.รหัสนักศึกษา).set({
            username: data.รหัสนักศึกษา,
            password: data.รหัสนักศึกษา.slice(4)
          })
        })
      }
    }
  }
};
</script>
