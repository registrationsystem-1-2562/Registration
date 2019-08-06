<template>
  <v-container>
    <v-card max-width="510" class="mx-auto elevation-3">
      <v-card-title>เลือกอาจารย์ที่ปรึกษา</v-card-title>
      <v-card-text>
        <v-layout column>
          <v-flex>
            <v-select label="อันดับ 1" :items="teachers" v-model="project.first"></v-select>
            <v-select label="อันดับ 2" :items="teachers" v-model="project.second"></v-select>
            <v-select label="อันดับ 3" :items="teachers" v-model="project.third"></v-select>
            <v-select label="อันดับ 4" :items="teachers" v-model="project.forth"></v-select>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary">ยืนยันการเลือก</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      teachers: [],
      project: {
        first: null,
        second: null,
        third: null,
        forth: null
      }
    };
  },
  methods: {},
  created() {
    this.$store.dispatch("settingTeacher", this.teachers);
  }
};
</script>
