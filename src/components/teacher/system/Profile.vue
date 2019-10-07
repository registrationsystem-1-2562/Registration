<template>
  <v-container>
    <v-card class="elevation-3 mx-auto" max-width="510">
      <v-card-title>โปรไฟล์</v-card-title>
      <v-card-text>
        <v-layout column wrap align-start>
          <v-flex xs12 sm6 >
            <v-img height="300" width="300" :src="profile.image"></v-img>
            <v-spacer></v-spacer>
            <v-text>Email : {{profile.email}}</v-text>
            <h6 class="title">ความเชี่ยวชาญ</h6>
            <v-list dense v-for="(pro, i) in profile.professional" :key="i">
              <v-list-item>
                <v-list-item-action>
                  <v-icon>mdi-checkbox-blank-circle</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ pro }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <h6 class="title">หัวข้อโปรเจก</h6>
            <v-list dense v-for="(head, i) in profile.header" :key="i">
              <v-list-item>
                <v-list-item-action>
                  <v-icon>mdi-checkbox-blank-circle</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ head }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
          <v-btn raised color="primary">แก้ไข</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mx-auto" max-width="40%" color>
      <v-toolbar color="primary">
        <v-toolbar-title>บันทึกโปรไฟล์</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field 
            outlined
            label="Email"
            name="title"
            type="text"
            v-model="profileInput.email"
          ></v-text-field>
          <v-text-field
            outlined
            name="information"
            label="ความเชี่ยวชาญ"
            type="text"
            v-model="profileInput.professional"
          ></v-text-field>
          <v-btn @click="addProfessional(index)">เพิ่มความเชี่ยวชาญ</v-btn>
           <v-text-field
            outlined
            name="information"
            label="หัวข้อโปรเจค"
            type="text"
            v-model="profileInput.topic"
          ></v-text-field>
          <v-btn @click="addProfessional(index)">เพิ่มหัวข้อโปรเจค</v-btn>
          <v-text-field
            outlined
            name="information"
            label="Image URL"
            type="text"
            v-model="profileInput.image"
          ></v-text-field>
        </v-form>
        <div>
          <v-btn
            @click.native="selectFile"
            v-if="!uploadEnd && !uploading">
            add photo
            <v-icon
              right
              aria-hidden="true">
            </v-icon>
          </v-btn>
          <form ref="form">
            <input
              id="files"
              type="file"
              name="file"
              ref="uploadInput"
              accept="image/*"
              :multiple="false"
              @change="detectFiles($event)" />
          </form>
          <v-progress-circular
            v-if="uploading && !uploadEnd"
            :size="100"
            :width="15"
            :rotate="360"
            :value="progressUpload"
            color="primary">
            {{ progressUpload }}%
          </v-progress-circular>
          <img
            v-if="uploadEnd"
            :src="downloadURL"
            width="50%" />
          <div v-if="uploadEnd">
          <v-btn
            class="ma-0"
            dark
            small
            color="error"
            @click="deleteImage()"
          >Delete
          </v-btn>
        </div>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="clearMessage" color="#abb2b9">Clear</v-btn>
      <v-btn @click="storeMessage" color="primary">บันทึก</v-btn>
    </v-card-actions>
  </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      profiles: [],
      profile: {},
      user: this.$store.getters.getUser,
      profileInput:[]
    };
  },
  methods: {
    methods: {
      addProfessional: function () {
        this.profileInput.push({ value: '' });
      }
    },
  },
  created() {
    this.$store.dispatch("settingTeacherProfile", this.profiles);
    // eslint-disable-next-line
    console.log(this.profiles)
    this.profiles.forEach(value => {
        if (value.id === this.user) {
            this.profile = value
        }
    })
  }
};
</script>
