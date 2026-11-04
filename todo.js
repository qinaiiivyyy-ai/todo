let semuaTugas = [];
const info = document.getElementById("info");
const daftarTugas = document.getElementById("daftarTugas");

async function ambilTugas() {
  info.textContent = "Memuat...";
   daftarTugas.innerHTML = "";

  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=15"
    );

    if (!res.ok) {
      throw new Error("Gagal mengambil data!");
    }

    const data = await res.json();
    semuaTugas = data;

    daftarTugas.innerHTML = "";

    data.forEach(function (tugas) {
      const div = document.createElement("div");

      div.className = "tugas";

      div.innerHTML = `
        <h3>${tugas.title}</h3>
        <p class="${tugas.completed ? "selesai" : "belum"}">
          ${tugas.completed ? "Selesai" : "Belum Selesai"}
        </p>
      `;

      daftarTugas.appendChild(div);
    });

    info.textContent = "Berhasil memuat " + data.length + " tugas.";

  } catch (err) {
    info.textContent ="Gagal memuat tugas: " + err.message;
  }
}

ambilTugas();

function filterTugas(pilihan) {
  let hasilFilter = semuaTugas;

  if (pilihan === "selesai") {
    hasilFilter = semuaTugas.filter(function (tugas) {
      return tugas.completed === true;
    });
  } else if (pilihan === "belum") {
    hasilFilter = semuaTugas.filter(function (tugas) {
      return tugas.completed === false;
    });
  }

  daftarTugas.innerHTML = "";

  hasilFilter.forEach(function (tugas) {
    const div = document.createElement("div");

    div.className = "tugas";

    div.innerHTML = `
      <h3>${tugas.title}</h3>
      <p class="${tugas.completed ? "selesai" : "belum"}">
        ${tugas.completed ? "Selesai" : "Belum Selesai"}
      </p>
    `;

    daftarTugas.appendChild(div);
  });

  info.textContent = "Menampilkan " + hasilFilter.length + " tugas.";
}

const inputTugas = document.getElementById("inputTugas");
const btnTambah = document.getElementById("btnTambah");

btnTambah.addEventListener("click", async function () {
  if (inputTugas.value.trim() === "") {
    alert("Tugas tidak boleh kosong!");
    return;
  }

  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/todos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: inputTugas.value,
          completed: false,
          userId: 1
        })
      }
    );

    if (!res.ok) {
      throw new Error("Gagal menambahkan tugas!");
    }

    const data = await res.json();

    semuaTugas.unshift(data);

    inputTugas.value = "";

    filterTugas("semua");

  } catch (err) {
    alert("Terjadi kesalahan: " + err.message);
  }
});