let genderDefault = document.getElementById("male");
genderDefault.checked = true;
const btnAdd = document.querySelector(".btn");
let students = [];
function isPhone(phone) {
  return /((09|03|07|08|05)+([0-9]{8})\b)/g.test(phone);
}
function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
btnAdd.addEventListener("click", function () {
  let fullname = document.getElementById("fullname").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;
  let gender = "";
  if (document.getElementById("male").checked) {
    gender = document.getElementById("male").value;
  } else if (document.getElementById("female").checked) {
    gender = document.getElementById("female").value;
  }
  if (_.isEmpty(fullname)) {
    document.getElementById("fullname-error").innerText = "Nhập vào họ và tên";
  } else if (fullname.trim().length <= 2) {
    fullname = "";
    document.getElementById("fullname-error").innerText =
      "Họ và tên không được nhỏ hơn 2 ký tự";
  } else if (fullname.trim().length > 50) {
    fullname = "";
    document.getElementById("fullname-error").innerText =
      "Họ và tên không được lớn hơn 50 ký tự";
  } else {
    document.getElementById("fullname-error").innerText = "";
  }
  if (_.isEmpty(email)) {
    document.getElementById("email-error").innerHTML = "Vui lòng nhập email";
  } else if (!isEmail(email)) {
    email = "";
    document.getElementById("email-error").innerHTML =
      "Email không đúng định dạng";
  } else {
    document.getElementById("email-error").innerHTML = "";
  }
  if (_.isEmpty(phone)) {
    document.getElementById("phone-error").innerHTML =
      "Vui lòng nhập số điện thoại";
  } else if (phone.trim().length > 10) {
    phone = "";
    document.getElementById("phone-error").innerHTML =
      "Số điện thoại không đúng";
  } else if (!isPhone(phone)) {
    phone = "";
    document.getElementById("phone-error").innerHTML =
      "Số điện thoại không hợp lệ";
  } else {
    document.getElementById("phone-error").innerHTML = "";
  }
  if (_.isEmpty(address)) {
    address = "";
    document.getElementById("address-error").innerHTML =
      "Vui lòng nhập địa chỉ";
  } else {
    document.getElementById("address-error").innerHTML = "";
  }

  if (fullname && email && phone && address && gender) {
    students.push({
      fullname: fullname,
      email: email,
      phone: phone,
      address: address,
      gender: gender,
    });
    displayStudents();
  }
});

function displayStudents() {
  let tableContent = `<tr>
    <td>#</td>
    <td>Họ tên</td>
    <td>Email</td>
    <td>Điện thoại</td>
    <td>Địa chỉ</td>
    <td>Gender</td>
    <td>Hành động</td>
    <td><button>sắp xếp(alpha b)</button></td>
  </tr>`;
  students.forEach((student, index) => {
    index = index + 1;
    tableContent += `<tr>
  <td>${index}</td>
  <td>${student.fullname}</td>
  <td>${student.email}</td>
  <td>${student.phone}</td>
  <td>${student.address}</td>
  <td>${student.gender}</td>
  <td>
  <button onclick ="upd(${index})">Edit</button>
  <button onclick ="del(${index})">Delete</button>
  </td>
  </tr>`;
  });
  document.getElementById("listStudent").innerHTML = tableContent;
}
displayStudents();
function del(id) {
  students.splice(id - 1, 1);
  displayStudents();
}

function upd(id) {
  let fullnameValue = document.querySelector("#fullname").value;
  let emailValue = document.querySelector("#email").value;
  let phoneValue = document.querySelector("#phone").value;
  let addressValue = document.querySelector("#address").value;
  let genderValue = document.querySelector(".genderx").value;
  let newObj = {
    fullname: fullnameValue,
    email: emailValue,
    phone: phoneValue,
    address: addressValue,
    gender: genderValue,
  };
  students[id - 1] = newObj;
  displayStudents();
}

function search() {
  let input = document.querySelector("#inputSearch").value;
  for (let i = 0; i < students.length; i++) {
    if (input == students[i].fullname) {
      var obj = `<tr>
       <td> Fullname: ${students[i].fullname}</td>
       <td>Email: ${students[i].email} </td>
       <td>Phone: ${students[i].phone}</td>
        <td>Address: ${students[i].address}</td>
        <td>Gender: ${students[i].gender}</td>
</tr>`;
    }
  }
  document.getElementById("table2").innerHTML = obj;
}
