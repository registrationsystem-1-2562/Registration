<template>
    <v-container>    
        <v-container>
          <form>
            <v-card class="mx-auto" max-width="80%">
                <v-responsive>
                    <v-card-title>เข้าพบอาจารย์ที่ปรึกษาโปรเจค</v-card-title>
                    <v-card-text>
                        &emsp;&emsp;ให้นักศึกษาเข้าพบอาจารย์ที่ปรึกษารายวิชา Computer Engineering Project ตามวันและเวลาที่กำหนด
                    </v-card-text>
                    <v-card-actions>
                        <v-btn depressed color="primary">Edit</v-btn>
                        <v-btn depressed color="error">Delete</v-btn>
                    </v-card-actions>
                         
                </v-responsive>
            </v-card>
          </form>
        </v-container>
        <v-container>
            <form>
                <v-responsive>
                    <v-flex>
                        <v-card class="mx-auto" max-width="80%">
                            <v-toolbar>
                                <v-toolbar-title>สร้างประกาศ</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                <v-text-field 
                                    label="เรื่องประกาศ" 
                                    name="title" 
                                    type="text" 
                                    v-model="comment.title">
                                </v-text-field>

                                <v-textarea
                                    outlined
                                    name="information"
                                    label="รายละเอียด"
                                    type="text"
                                    v-model="comment.information"
                                ></v-textarea>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn >Clear</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="primary">Post</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-responsive>
            </form>
        </v-container>
    </v-container>
</template>


<script>
export default {
  data() {
    return {
      comment: {
        title: null,
        information: null
      }
    };
  }
};
</script>