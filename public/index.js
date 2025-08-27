//utkarsh -> instance of socket.io that initiates the connection
const utkarsh = io();
utkarsh.on("connect", () => {
  //=============================================
  const input = document.querySelector("input");
  const button = document.querySelector("button");
  const ul = document.querySelector("ul");

  //==============================================
  utkarsh.on("sendMessage", ({ message, id }) => {
    const li = document.createElement("li");
    li.innerText = `${message}`;
    if (id === utkarsh.id) {
      li.classList.add("my-message");
    } else {
      li.classList.add("other-message");
    }
    ul.appendChild(li);
  });
  button.addEventListener("click", (event) => {
    event.preventDefault();
    utkarsh.emit("message", input.value);
    input.value = "";
  });
});
