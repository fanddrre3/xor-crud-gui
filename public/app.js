const apiBase = "/api/users";

const createForm = document.getElementById("createForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const usersTableBody = document.querySelector("#usersTable tbody");

const updatePanel = document.getElementById("updatePanel");
const updateForm = document.getElementById("updateForm");
const updName = document.getElementById("updName");
const updEmail = document.getElementById("updEmail");
const updId = document.getElementById("updId");
const cancelUpdate = document.getElementById("cancelUpdate");

async function fetchUsers() {
  const res = await fetch(apiBase);
  const data = await res.json();
  renderUsers(data);
}

function renderUsers(list) {
  usersTableBody.innerHTML = "";
  if (!list || list.length === 0) {
    usersTableBody.innerHTML = `<tr><td colspan="4">No users</td></tr>`;
    return;
  }
  list.forEach(u => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${u.id}</td>
      <td>${escapeHtml(u.name)}</td>
      <td>${escapeHtml(u.email)}</td>
      <td class="actions">
        <button data-id="${u.id}" data-name="${escapeAttr(u.name)}" data-email="${escapeAttr(u.email)}" class="edit">Edit</button>
        <button data-id="${u.id}" class="delete">Delete</button>
      </td>
    `;
    usersTableBody.appendChild(tr);
  });
}

function escapeHtml(s) {
  return s ? s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c])) : "";
}
function escapeAttr(s){ return (s||"").replace(/"/g,'&quot;'); }

createForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const body = { name: nameInput.value.trim(), email: emailInput.value.trim() };
  if (!body.name || !body.email) return alert("isi semua field");
  const res = await fetch(apiBase, { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(body) });
  if (res.ok) {
    nameInput.value = ""; emailInput.value = "";
    await fetchUsers();
  } else {
    alert("gagal membuat user");
  }
});

// Event delegation for edit/delete
usersTableBody.addEventListener("click", async (e) => {
  const t = e.target;
  if (t.classList.contains("edit")) {
    updId.value = t.dataset.id;
    updName.value = t.dataset.name;
    updEmail.value = t.dataset.email;
    updatePanel.classList.remove("hidden");
  } else if (t.classList.contains("delete")) {
    const id = t.dataset.id;
    if (!confirm("Hapus user id " + id + " ?")) return;
    const resp = await fetch(`${apiBase}/${id}`, { method: "DELETE" });
    if (resp.ok) fetchUsers();
  }
});

updateForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = updId.value;
  const body = { name: updName.value.trim(), email: updEmail.value.trim() };
  if (!body.name || !body.email) return alert("Isi semua");
  const res = await fetch(`${apiBase}/${id}`, { method: "PUT", headers: {"Content-Type":"application/json"}, body: JSON.stringify(body) });
  if (res.ok) {
    updatePanel.classList.add("hidden");
    await fetchUsers();
  } else {
    alert("Update gagal");
  }
});

cancelUpdate.addEventListener("click", () => updatePanel.classList.add("hidden"));

// initial load
fetchUsers();
