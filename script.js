function submitdetails(event) {
    event.preventDefault();

    const sprice = event.target.sprice.value
    const pname = event.target.pname.value
    const category = document.getElementById("select").value



    const obj = {
        sprice,
        pname,
        category,
    }



    axios
        .post("https://crudcrud.com/api/8ebe6fa5e9af4a869ba4cb4bf70b93bb/adminData", obj)
        .then((response) => {
            showuseronscreen(response.data)
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })


}


window.addEventListener("DOMContentLoaded", () => {
    axios
        .get("https://crudcrud.com/api/8ebe6fa5e9af4a869ba4cb4bf70b93bb/adminData")
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                showuseronscreen(response.data[i])
            }
        })
        .catch((error) => {
            console.log(error)
        })
})



function showuseronscreen(obj) {
    let parentelem = document.getElementById(obj.category + "list")
    if (!parentelem) {
        parentelem = document.createElement('li')
        parentelem.id = obj.category + "list"
        document.body.appendChild(parentelem)
    }

    let childelem = document.createElement("li")
    childelem.textContent = obj.sprice + " - " + obj.pname + " - " + obj.category

    let del = document.createElement("input")
    del.type = "button"
    del.value = "Delete Product"

    del.onclick = function() {
        axios
            .delete(`https://crudcrud.com/api/8ebe6fa5e9af4a869ba4cb4bf70b93bb/adminData/${obj._id}`)
            .then((response) => {
                parentelem.removeChild(childelem)
            })
            .catch((error) => {
                console.log(error)
            })
    };

    childelem.appendChild(del)
    parentelem.appendChild(childelem)
}