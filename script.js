let form = document.querySelector("form");
let main = document.querySelector("main");

let arr = JSON.parse(localStorage.getItem("arr")) || [];
let haveId = null;

function render() {
  main.innerHTML = "";

  arr.forEach((e) => {
    main.innerHTML += `
      <div class="card">
        <img id="url" src="${e.url}" alt="">
        <h1 id="name">${e.name}</h1>
        <p id="email">${e.email}</p>

        <div class="btns">
          <button onclick="updateCard(${e.cardId})" class="update">Update</button>
          <button onclick="deleteCard(${e.cardId})" class="delete">Delete</button>
        </div>
      </div>
    `;
  });

  form.reset();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let name = e.target[0].value.trim();
  let email = e.target[1].value.trim();
  let url = e.target[2].value.trim();

  if (!name || !email || !url) {
    alert("Please fill all the fields");
    return;
  }

  if (haveId !== null) {
    let index = arr.findIndex((i) => i.cardId === haveId);

    if (index !== -1) {
      arr[index].name = name;
      arr[index].email = email;
      arr[index].url = url;
    }

    haveId = null;
  } else {
    let card = {
      cardId: Date.now(),
      name,
      email,
      url,
    };

    arr.push(card);
  }
  localStorage.setItem("arr", JSON.stringify(arr));
  render();
});

function deleteCard(id) {
  let index = arr.findIndex((i) => i.cardId === id);
    arr.splice(index, 1);
       localStorage.setItem("arr", JSON.stringify(arr));

    render();
}

function updateCard(id) {
  haveId = id;

  let item = arr.find((i) => i.cardId === id);

  if (item) {
    form[0].value = item.name;
    form[1].value = item.email;
    form[2].value = item.url;
  }
};




render();