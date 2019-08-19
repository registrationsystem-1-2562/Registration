<template>
  <v-card
    class="mx-auto"
    max-width="60%"
    outlined
  >
    <v-list-item three-line>
      
      <v-list-item-content>
        <v-toolbar color="primary"><v-toolbar-title>ผลการเลือกอาจารย์ที่ปรึกษา</v-toolbar-title></v-toolbar>
        <v-list-item-title class="headline mb-1" >{{teacherName}}</v-list-item-title>
        <v-list-item-subtitle>ห้องพัก : {{room}}</v-list-item-subtitle>
        <v-list-item-subtitle>โทรศัพท์ : {{tel}}</v-list-item-subtitle>
        <v-list-item-subtitle>Email : {{email}}</v-list-item-subtitle>
      </v-list-item-content>
  
      <v-list-item-avatar
        tile
        width="200"
        height="240"
        color="grey"
      >
        <v-img
        src="http://reg5.sut.ac.th/registrar/getofficerimage.asp?id=142006"
        ></v-img>
      </v-list-item-avatar>
    
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  data(){
    return{
      teacherName:"รองศาสตราจารย์ ดร. กิตติศักดิ์ เกิดประสพ",
      room:"CPE09",
      tel:"044-224349",
      email:"KittisakThailand@gmail.com"
    };
  }
};
</script>


<!--<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-card>
        <v-card-title>ผลการเลือกอาจารย์ที่ปรึกษา</v-card-title>
        <v-card-text>
          <v-list dense>
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-checkbox-blank-circle</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Mr. John Doe</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>
-->
