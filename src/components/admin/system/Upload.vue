<template>
  <v-container>
    <v-container column>
      <h6 class="title">อัปโหลดข้อมูลนักศึกษา</h6>
      <v-layout>
        <v-flex xs12 sm6 md4 d-flex>
          <v-file-input label="เลือกไฟล์" :rules="rules"></v-file-input>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      rules: [
        value => {
          const pattern = /\.(csv)$/i
          return pattern.test(value) || 'สกุลไฟล์ไม่ถูกต้อง'
        },
      ],
      fileInput: ''
    }
  }
}
</script>
