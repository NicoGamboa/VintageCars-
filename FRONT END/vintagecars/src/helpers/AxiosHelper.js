import axios from "axios";
// import Swal from "sweetalert2";
const URL_API = "http://3.14.246.73:8080/vintage";

export const AxiosRequest = axios.create({
  baseURL: URL_API,
  timeout: 3000,
  headers: { "Content-Type": "application/json" },
});

export async function saveProducto(productoData) {
  const token = localStorage.getItem("Token");
  console.log(productoData);
  console.log(token);
  await axios({
    baseURL: `${URL_API}/producto`,
    method: "POST",
    data: productoData,
    headers: { Authorization: `Bearer ${token}` },
  }).then((respon) => {
    console.log(respon.data);
    console.log(respon.status);
  });
}
