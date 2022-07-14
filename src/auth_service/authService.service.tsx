import axios from 'axios';

const BASE_URL = "http://localhost:9876/"

export const loginUser = async (user: { email: any; password: any; }) => {
    await axios.get(BASE_URL + "login", {
        auth: {
          username: user.email,
          password: user.password,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("reposnse.data",response.data);
          localStorage.setItem(
            "token",
            "Bearer " + response.data.token
          )
          axios
            .get(BASE_URL + "auth/check-token", {
              headers: { Authorization: "Bearer " + response.data.token },
            })
            .then((response) => {
              localStorage.setItem("user", JSON.stringify(response.data));
              let userinfo = localStorage.getItem("user");
              let userInfoParsed = JSON.parse(userinfo!);
                console.log("userinfo parsed",userInfoParsed)
            });
          
        } else {
          alert("Login did not work. Please check your information and try again.");
        }
      })
      .catch((error) => alert("Error: " + error.status));
}
