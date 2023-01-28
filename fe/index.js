// TODO Display car list from database
async function loadTable() {
    await axios.get('http://localhost:3000/api/cars', {}
    ).then(res => {
        if (res.status === 200) {
            console.log(res.data);
            var trHTML = '';

            for (let object of res.data) {
                trHTML += `
                  <tr> 
                      <td style="width:7%">${object.car_id}</td>
                      <td style="width:10%">${object.brand}</td>
                      <td style="width:7%;font-size:0.8em;">${object.model}</td>
                      <td style="width:5%;font-size:0.8em;">${object.year}</td>
                      <td style="width:5%;font-size:0.8em;">${object.color}</td>
                      <td style="width:7%;font-size:0.8em;">$ ${object.price ? object.price : ""}</td>
                      <td style="width:7%;font-size:0.8em;">${object.time_to_100}s</td>
                      <td style="width:5%;font-size:0.8em;">${object.max_speed}</td>
                      <td style="width:15%;font-size:0.8em;">${object.description}</td>
                      <td style="width:5%;font-size:0.8em;">${object.quantity ? object.quantity : "0"}</td>
                      <td style="width:15%"><button type="button" class="btn btn-outline-success" onclick="carBuy('${object._id}')">Buy</button>
                      <button type="button" class="btn btn-outline-secondary" onclick="showCarEditBox(${object.car_id})">Edit</button>
                      <button type="button" class="btn btn-outline-danger" onclick="carDelete(${object.car_id})">Del</button></td>
                  </tr>`;
            }

            document.getElementById("mytable").innerHTML = trHTML;
        }
    }).catch(err => {
        alert(err.response.status + "\n\r" + err.response.data + "\n\r" + err.message);
    });
}

// TODO Add new car
function showCarCreateBox() {
    Swal.fire({
        title: "Add new car",
        html:
            `<input id="id" class="swal2-input" placeholder="ID">
            <input id="brand" class="swal2-input" placeholder="Brand">
            <input id="model" class="swal2-input" placeholder="Model">
            <input id="year" class="swal2-input" placeholder="Year">
            <input id="color" class="swal2-input" placeholder="Color">
            <input id="price" class="swal2-input" placeholder="Price">
            <input id="time_to_100" class="swal2-input" placeholder="Time to 100">
            <input id="max_speed" class="swal2-input" placeholder="Max speed">
            <input id="description" class="swal2-input" placeholder="Description">
            <input id="quantity" class="swal2-input" placeholder="Quantity">`,
        focusConfirm: false,
        preConfirm: () => {
            carCreate();
        },
    });
}

// POST http://localhost:3000/api/cars
async function carCreate() {

    const car = {
        car_id: document.getElementById("id").value,
        brand: document.getElementById("brand").value,
        model: document.getElementById("model").value,
        year: document.getElementById("year").value,
        color: document.getElementById("color").value,
        price: document.getElementById("price").value,
        time_to_100: document.getElementById("time_to_100").value,
        max_speed: document.getElementById("max_speed").value,
        description: document.getElementById("description").value,
        quantity: document.getElementById("quantity").value
    }

    await axios.post(`http://localhost:3000/api/cars`, car
    ).then(res => {
        if (res.status === 201) {
            Swal.fire(`${res.data.brand} ${res.data.model} Successfully added.`);
            loadTable();
        }
    }).catch(err => {
        alert(err.response.status + "\n\r" + err.response.data + "\n\r" + err.message);
    });
}

// TODO Edit selected car from DB
async function showCarEditBox(car_Id) {
    // 1. Read the car information from the server first
    await axios.get(`http://localhost:3000/api/cars/${car_Id}`, {}
    ).then(res => {
        if (res.status === 200) {
            // 2. Display the car information from the server
            const car = res.data;

            Swal.fire({
                title: 'Edit Car',
                html:
                    `<input id="id" class="swal2-input" placeholder="ID" value="${car.car_id}" disabled>
                    <input id="brand" class="swal2-input" placeholder="Brand" value="${car.brand}">
                    <input id="model" class="swal2-input" placeholder="Model" value="${car.model}">
                    <input id="year" class="swal2-input" placeholder="Year" value="${car.year}">
                    <input id="color" class="swal2-input" placeholder="Color" value="${car.color}">
                    <input id="price" class="swal2-input" placeholder="Price" value="${car.price ? car.price : ""}">
                    <input id="time_to_100" class="swal2-input" placeholder="Time to 100" value="${car.time_to_100}">
                    <input id="max_speed" class="swal2-input" placeholder="Max speed" value="${car.max_speed}">
                    <input id="description" class="swal2-input" placeholder="Description" value="${car.description}">
                    <input id="quantity" class="swal2-input" placeholder="Quantity" value="${car.quantity ? car.quantity : ""}">`,
                focusConfirm: false,
                preConfirm: () => { // 3. Perform the update, and call the server (call the PUT API)
                    carEdit();
                }
            })
        }
    }).catch(err => {
        alert(err.response.status + "\n\r" + err.response.data + "\n\r" + err.message);
    });
}

// http://localhost:3000/api/cars/901234567
async function carEdit() {
    const car = {
        car_id: document.getElementById("id").value,
        brand: document.getElementById("brand").value,
        model: document.getElementById("model").value,
        year: document.getElementById("year").value,
        color: document.getElementById("color").value,
        price: document.getElementById("price").value,
        time_to_100: document.getElementById("time_to_100").value,
        max_speed: document.getElementById("max_speed").value,
        description: document.getElementById("description").value,
        quantity: document.getElementById("quantity").value
    }

    await axios.put(`http://localhost:3000/api/cars/${car.car_id}`, car
    ).then(res => {
        if (res.status === 200) {
            Swal.fire(`${car.brand} ${car.model} successfully updated.`);
            loadTable();
        }
    }).catch(err => {
        alert(err.response.status + "\n\r" + err.response.data + "\n\r" + err.message);
    });
}

// TODO Delete selcted car from DB
// DELETE http://localhost:3000/api/cars/146783250
async function carDelete(car_Id) {

    await axios.delete(`http://localhost:3000/api/cars/${car_Id}`, {}
    ).then(res => {
        if (res.status === 204) {
            Swal.fire(`Car succesfuly deleted`);
            loadTable();
        }
    }).catch(err => {
        alert(err.response.status + "\n\r" + err.response.data + "\n\r" + err.message);
    });
}

// TODO Decrice one car from qty
async function carBuy(id) {
    await axios.put(`http://localhost:3000/api/cars/buy/${id}`, {}
    ).then(res => {
        if (res.status === 200) {
            Swal.fire(`Car quantity succesfuly updated`);
            loadTable();
        }
    }).catch(err => {
        alert(err.response.status + "\n\r" + err.response.data + "\n\r" + err.message);
    });
}