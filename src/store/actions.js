import firebase from 'firebase'
import router from '@/router'

export const actions = {
    // login handler
    loginAdmin({ commit }, payload) {
        commit('setLoading', true)
        firebase.database().ref('admin_login/').once('value')
            .then(snapshot => {
                snapshot.forEach(v => {
                    if (v.val().username === payload.username && v.val().password.toString() === payload.password) {
                        commit('setUser', payload.username)
                        router.push('/admin/' + payload.username)
                        return
                    }
                })
            })
        commit('setLoading', false)
    },
    loginTeacher({ commit }, payload) {
        commit('setLoading', true)
        firebase.database().ref('teacher_login/').once('value')
            .then(snapshot => {
                snapshot.forEach(v => {
                    if (v.val().username === payload.username && v.val().password.toString() === payload.password) {
                        commit('setUser', payload.username)
                        router.push('/teacher/' + payload.username)
                        return
                    }
                })
            })
        commit('setLoading', false)
    },
    loginStudent({ commit }, payload) {
        commit('setLoading', true)
        firebase.database().ref('student_login/').once('value')
            .then(snapshot => {
                snapshot.forEach(v => {
                    if (v.val().username === payload.username && v.val().password.toString() === payload.password) {
                        commit('setUser', payload.username)
                        router.push('/student/' + payload.username)
                        return
                    }
                })
            })
        commit('setLoading', false)
    },

    // schoolyear
    createYear({ commit }, payload) {
        commit('setLoading', true)
        firebase.database().ref('schoolyear/' + payload).set({
            year: payload,
            status: false
        })
        commit('setLoading', false)
    },
    settingYear({ commit }, payload) {
        commit('setLoading', true)
        firebase
            .database()
            .ref("schoolyear")
            .on("child_added", snapshot => {
                payload.push({
                    id: snapshot.key,
                    ...snapshot.val()
                });
            });
        commit('setLoading', false)
    },
    updateYear({ commit }, payload) {
        commit('setLoading', true)
        firebase.database().ref('schoolyear').on('child_changed', snapshot => {
            const update = payload.find(year => year.id == snapshot.key)
            update.year = snapshot.val().year
            update.status = snapshot.val().status
        })
        commit('setLoading', false)
    },

    // teacher profile
    settingTeacherProfile({ commit }, payload) {
        commit('setLoading', true)
        firebase
            .database()
            .ref("teacher_profile")
            .on("child_added", snapshot => {
                payload.push({
                    id: snapshot.key,
                    ...snapshot.val()
                });
            });
        commit('setLoading', false)
    },

    // teacher
    settingTeacher({ commit }, payload) {
        commit('setLoading', true)
        // beware variable in this structure
        firebase
            .database()
            .ref("teacher")
            .on("child_added", snapshot =>
                payload.push({
                    value: snapshot.key,
                    text:
                        snapshot.val().prefix +
                        " " +
                        snapshot.val().firstname +
                        " " +
                        snapshot.val().lastname
                })
            );
        commit('setLoading', false)
    },

    // student
    settingStudent({ commit }, payload) {
        commit('setLoading', true)
        firebase.database().ref('student').on('child_added', snapshot => {
            payload.push({
                id: snapshot.key,
                ...snapshot.val()
            })
        })
        commit('setLoading', false)
    },
    // teacher register
    teacherRegister({ commit }, payload) {
        commit('setLoading', true)
        if (payload.seat !== 0) {
            firebase.database().ref('teacher_register/' + payload.year + '/' + payload.user).set({
                seat: payload.seat,
                remain: payload.seat
            })
        }
        commit('setLoading', false)
    },

    //notice
    setNotice( {commit} , payload) {
        commit('setLoading', true)
        firebase.database().ref('notice/' + payload).set({
          title: payload.title,
          information: payload.information
        });
      }
      
    

}