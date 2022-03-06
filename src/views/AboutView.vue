<template>
  <div>
    <div class="about">
      <h3>{{ data_firestore }}</h3>
      <br /><br />

      <div>
        <label for="start">Start date:</label>

        <input
          type="date"
          id="start"
          name="trip-start"
          min="2018-01-01"
          max="2018-12-31"
          v-model="date"
        />

        <form
          id="“test”"
          name="“testForm”"
          method="“post”"
          action="“testProcess.php”"
        >
          ชื่อ-นามสกุล
          <input
            v-model="name"
            type="“text”"
            name="“fullname”"
            id="“fullname”"
            size="“20”"
          />
        </form>

        ผลตรวจโควิด
        <input
          type="radio"
          id="html"
          name="fav_language"
          v-model="cv"
          value="Positive"
        />
        <label for="html">+</label>
        <input
          type="radio"
          id="html"
          name="fav_language"
          v-model="cv"
          value="Negative"
        />
        <label for="html">-</label>

        <form
          id="“test”"
          name="“testForm”"
          method="“post”"
          action="“testProcess.php”"
        >
          หมายเลขโทรศัพท์
          <input
            v-model="phone"
            type="“text”"
            name="“fullname”"
            id="“fullname”"
            size="“20”"
          />
        </form>

        <form
          id="“test”"
          name="“testForm”"
          method="“post”"
          action="“testProcess.php”"
        >
          Email
          <input
            type="“text”"
            name="“fullname”"
            id="“fullname”"
            size="“20”"
            v-model="email"
          />
        </form>

        <button @click="addDataInform()">บันทึกข้อมูล</button>
        <div>
          <table>
            <tr>
              <th>วันที่</th>
              <th>ชื่อ-นามสกุล</th>
              <th>ผลตรวจโควิด</th>
              <th>หมายเลขโทรศัพท์</th>
              <th>E-Mail</th>
            </tr>

            <tr v-for="(data, index) in da_ta" :key="index">
              <td>{{ data.date }}</td>
              <td>{{ data.name }}</td>
              <td>{{ data.cv }}</td>
              <td>{{ data.phone }}</td>
              <td>{{ data.email }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import { db } from "../plugins/firebaseinit.js";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { auth } from "../plugins/firebaseinit.js";
import { onAuthStateChanged } from "firebase/auth";

export default {
  data() {
    return {
      data_firestore: "",
      date: "",
      name: "",
      cv: "",
      phone: "",
      phoneno: /^\d{10}$/,
      id: "",
      email: "",
      da_ta: [],
    };
  },

  mounted() {
    this.readData();
    this.checkLogin();
  },

  methods: {
    async addData() {
      try {
        const docRef = await addDoc(collection(db, "Anupat"), {
          first: "Anupat",
          last: "Poothong",
          born: 2002,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    async readData() {
      const querySnapshot = await getDocs(collection(db, "Anupat"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        this.da_ta.push(doc.data());
      });
    },

    checkLogin() {
      //const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log(uid);
          this.email = user.email;
          this.id = user.uid;
          // ...แสดงผล user : email, uid ในหน้าจอ
        } else {
          // User is signed out
          // กรณีไม่ได้ Login ให้เปลี่ยนไปหน้า Login ก่อน !!!
          alert("กรุณา Login ก่อน");
          this.$router.push("/login");
        }
      });
    },

    async addDataInform() {
      if ((this.name == "") | (this.phone == "")) {
        alert("โปรดกรอกข้อมูลก่อนที่จะบันทึก!");
      } else {
        try {
          const docRef = await addDoc(collection(db, "Anupat"), {
            name: this.name,
            phone: this.phone,
            date: this.date,
            cv: this.cv,
            email: this.email,
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        this.name = "";
        this.phone = "";
      }
    },
  },
};
</script>

<style>
table,th,td,tr{
  border: 1px solid black;
}
th{
  background-color: yellow;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
