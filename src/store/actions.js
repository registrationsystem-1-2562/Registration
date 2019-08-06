import firebase from 'firebase'
import router from '@/router'

export const actions = {
    // login handler
    loginAdmin({ commit }, payload) {
        commit('setLoading', true)
        firebase.database().ref('admin_login/').once('value')
            .then(snapshot => {
                snapshot.forEach(v => {
                    if (v.val().username === payload.username && v.val().password === payload.password) {
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
                    if (v.val().username === payload.username && v.val().password === payload.password) {
                        commit('setUser', payload.username)
                        router.push('/admin/' + payload.username)
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
                    if (v.val().username === payload.username && v.val().password === payload.password) {
                        commit('setUser', payload.username)
                        router.push('/admin/' + payload.username)
                        return
                    }
                })
            })
        commit('setLoading', false)
    },

    // crud schoolyear model in firebase 
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
        commit('setLoading', true)
    }

}