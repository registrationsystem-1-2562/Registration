<template>
  <v-container>
    <v-container row>
      <h6 class="title">สถิติการลงทะเบียน</h6>
      <v-spacer></v-spacer>

      <vue-json-to-csv
        csv-title="statistic"
        :json-data="records"
        :labels="{teacher: {title: 'teacher'}, 
                    register: {title: 'register'},
                    max: {title: 'max'},
                    min: {title: 'min'},
                    mean: {title: 'mean'}}"
        @success="val => handleSuccess(val)"
        @error="val => handleError(val)"
      >
        <v-btn color="info">
          <v-icon>mdi-cloud-download-outline</v-icon>Download
        </v-btn>
      </vue-json-to-csv>
    </v-container>
    <v-data-table :headers="headers" :items="records" class="elevation-1" :items-per-page="5"></v-data-table>
    <line-chart :data="render" :height="200" />
  </v-container>
</template>

<script>
import VueJsonToCsv from 'vue-json-to-csv'
import LineChart from './parts/line-chart'

export default {
  components: {
    VueJsonToCsv,
    LineChart
  },
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
      ],
      render: {
        labels: ['ลงทะเบียน', 'max', 'min', 'mean'],
        datasets: [
          {
            label: 'รศ.ดร กิตติศักดิ์ เกิดประสพ',
            backgroundColor: '#707070',
            data: [20, 4.0, 2.51, 2.78]
          },
          {
            label: 'รศ.ดร นิตยา เกิดประสพ',
            backgroundColor: '#F1F1F1',
            data: [15, 3.97, 2.68, 3.04]
          },
          {
            label: 'ผศ.ดร. พิชโยทัย มหัทธนาภิวัฒน์',
            backgroundColor: '#f87979',
            data: [30, 3.99, 2.44, 2.68]
          },
          {
            label: 'ผศ.ดร ปรเมศวร์ ห่อแก้ว',
            backgroundColor: '#505050',
            data: [19, 3.67, 2.99, 3.42]
          }
        ]
      }
    };
  },
};
</script>
