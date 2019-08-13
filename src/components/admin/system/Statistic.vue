<template>
  <v-container>
    <v-container row>
      <h6 class="title">สถิติการลงทะเบียน</h6>
      <v-spacer></v-spacer>
      <v-btn color="info">
        <v-download-csv :data="records">
          <v-icon>mdi-cloud-download-outline</v-icon> Download
        </v-download-csv>
      </v-btn>
    </v-container>
    <v-data-table :headers="headers" :items="records" class="elevation-1" :items-per-page="5"></v-data-table>
  </v-container>
</template>

<script>
import Vue from "vue";
import JsonCSV from "vue-json-csv";

Vue.component("VDownloadCsv", JsonCSV);

export default {
  data() {
    return {
      headers: [
        {
          text: "อาจารย์ที่ปรึกษา",
          value: "teacher"
        },
        {
          text: "จำนวนนักศึกษาลงทะเบียน",
          value: "register"
        },
        {
          text: "Max GPAX",
          value: "max"
        },
        {
          text: "Min GPAX",
          value: "min"
        },
        {
          text: "Mean GPAX",
          value: "mean"
        }
      ],
      records: [
        {
          teacher: "รศ.ดร กิตติศักดิ์ เกิดประสพ",
          register: 20,
          max: 4.0,
          min: 2.51,
          mean: 2.78
        },
        {
          teacher: "รศ.ดร นิตยา เกิดประสพ",
          register: 15,
          max: 3.97,
          min: 2.68,
          mean: 3.04
        },
        {
          teacher: "ผศ.ดร. พิชโยทัย มหัทธนาภิวัฒน์",
          register: 30,
          max: 3.99,
          min: 2.44,
          mean: 2.68
        },
        {
          teacher: "ผศ.ดร ปรเมศวร์ ห่อแก้ว",
          register: 19,
          max: 3.67,
          min: 2.99,
          mean: 3.42
        }
      ]
    };
  }
};
</script>
