<template>
  <div>
    <h1 class="font-bold text-2xl text-center mb-10">
      Interface de téléchargements de fichier
    </h1>
    <div class="w-full flex flex-col">
      <div class="grid md:grid-cols-2 grid-cols-1 w-full gap-x-2 h-56">
        <label
          ref="onDropZone"
          class="border border-blue-200 rounded h-full grid place-content-center border-dashed !text-center"
        >
          <div>
            <p v-if="newFileData.fileName">{{ newFileData.fileName }}</p>
            <div v-else>
              <Icon
                name="material-symbols:cloud-upload"
                class="text-blue-500 text-[100px]"
              />
              <p class="text-blue-500">
                Déposez un fichier ici ou<br />
                cliquez pour parcourir votre ordinateur
              </p>
            </div>
            <input type="file" id="input-file" hidden @change="uploadFile($event)" />
          </div>
        </label>
        <div class="rounded h-full px-1">
          <form action="" class="flex flex-col text-xs justify-between">
            <label for="" class="flex flex-col">
              <p class="font-bold">Libellé</p>
              <input
                type="text"
                class="border border-blue-200 h-6 px-1"
                placeholder="Libellé..."
                v-model="newFileData.libelle"
              />
            </label>
            <label for="" class="flex flex-col">
              <p class="font-bold">Catégorie</p>
              <select
                name="categories"
                id="categorie-input"
                v-model="newFileData.categorie"
                class="border border-blue-200"
              >
                <option value="option">Proposition commerciale</option>
                <option value="option">Présentation</option>
                <option value="Document marketing">Document marketing</option>
                <option value="Réponse AO">Réponse AO</option>
                <option value="Data">Data</option>
                <option value="Signature du contrat">Signature du contrat</option>
                <option value="Formulaire d'engagement">Formulaire d'engagement</option>
                <option value="Devis">Devis</option>
                <option value="Renouvellement de contrat">
                  Renouvellement de contrat
                </option>
                <option value="Rapport">Rapport</option>
                <option value="Proposition de renouvellemen">
                  Proposition de renouvellemen
                </option>
                <option value="Autre">Autre</option>
              </select>
            </label>
            <label for="" class="flex flex-col">
              <p class="font-bold">Destinataire(s)</p>
              <input
                type="text"
                class="border border-blue-200 h-6 px-1"
                v-model="newFileData.destinataires"
                placeholder="Destinataire(s)..."
              />
            </label>
            <label for="" class="flex flex-col">
              <p class="font-bold">Commentaire</p>
              <textarea
                name=""
                id=""
                cols="30"
                rows="6"
                class="border border-blue-200 px-1"
                v-model="newFileData.commentaire"
                placeholder="Commentaire..."
              ></textarea>
            </label>
          </form>
        </div>
      </div>
      <button
        class="p-2 px-6 bg-blue-500 text-white font-bold rounded my-2 mx-auto block"
        @click="onSubmit()"
      >
        Ajouter le fichier
      </button>
      <div class="w-full"></div>
      <h2 class="font-bold my-1">Historique de téléchargements</h2>
      <div class="ml-2">
        <h3 class="text-slate-400">Filtrer le tableau</h3>
        <table class="border border-blue-200 my-2">
          <tr>
            <td class="p-1">
              <select
                id="filter-field"
                v-model="filterField"
                class="border border-blue-200 rounded p-1"
              >
                <option>select an option</option>
                <option value="libelle">Libbelé</option>
                <option value="fileName">Nom du fichier</option>
                <option value="categorie">Catégorie</option>
                <option value="createdby">Crée par</option>
                <option value="destinataires">Destinataire(s)</option>
              </select>
            </td>
            <td class="p-1">
              <select
                id="filter-type"
                v-model="filterType"
                class="bg-blue-500 text-white rounded p-1"
              >
                <option value="=">=</option>
                <option value="<"><</option>
                <option value="<="><=</option>
                <option value=">">></option>
                <option value=">=">>=</option>
                <option value="!=">!=</option>
                <option value="like">like</option>
              </select>
            </td>
            <td class="p-1">
              <input
                id="filter-value"
                type="text"
                placeholder="value to filter"
                v-model="filterValue"
                class="border border-blue-500 rounded p-[2px]"
              />
            </td>
            <td class="p-1">
              <button
                id="filter-clear"
                @click="tabulator.clearFilter()"
                class="bg-blue-500 p-1 text-white rounded"
              >
                Clear Filter
              </button>
            </td>
          </tr>
        </table>
      </div>
      <Notification :notification="newRowNotification" />
      <div ref="table" class="tabulator-editable"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TabulatorFull as Tabulator } from "tabulator-tables"; //import Tabulator library
const onDropZone = ref<HTMLInputElement>();
const { files } = useDropZone(onDropZone, { onDrop });
import { v4 as uuidv4 } from "uuid";

const formData = new FormData();
function onDrop() {
  if (files.value) {
    newFileData.value.fileName = files.value[0].name;
    newFileData.value.fileSize = `${(files.value[0].size / 1024 / 1024).toFixed(2)}MB`;
    files.value.forEach((file) => {
      formData.append("file", file, file.name.replaceAll(" ", "-").toLowerCase());
    });
  }
}
const newFileData = ref<object>({
  id: uuidv4(),
  fileName: "",
  libelle: "",
  categorie: "",
  destinataires: "",
  commentaire: "",
  fileSize: "",
});

const file = ref<File | null>(null);

// function to upload file
function uploadFile(event) {
  event.preventDefault();
  const [_file] = (event.target as HTMLInputElement).files as FileList;
  file.value = _file;
  newFileData.value.fileName = _file.name;
  newFileData.value.fileSize = `${(_file.size / 1024 / 1024).toFixed(2)}MB`;
  formData.append("file", file.value, file.value.name.replaceAll(" ", "-").toLowerCase());
}

// function to handle drag over
function dragOver(event: Event) {
  event.preventDefault();
}

async function onSubmit() {
  if (Object.values(newFileData.value).some((value) => value === "")) {
    alert("Veuillez remplir tous les champs");
    return;
  }
  tableData.value.push({
    ...newFileData.value,
    datetime: useDateFormat(new Date(), "YYYY-MM-DD HH:mm:ss").value,
    createdby: "Admin",
    status: true,
    uploadDate: useDateFormat(new Date(), "YYYY-MM-DD HH:mm:ss").value,
  });
  newFileData.value = {
    id: uuidv4(),
    fileName: "",
    libelle: "",
    categorie: "",
    destinataires: "",
    commentaire: "",
  };
  const isLoading = ref(false);
  isLoading.value = true;
  try {
    const data = await $fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    if (data) {
      newRowNotification.value = "Fichier ajouté avec succès";
      setTimeout(() => {
        newRowNotification.value = "";
      }, 5000);
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

const table = ref(null); //reference to your table element
const tabulator = ref(null); //variable to hold your table
const tableData = ref([]); //data for table to display
const newRowNotification = ref("");

//onMounted lifecycle hook
onMounted(() => {
  tabulator.value = new Tabulator(table.value, {
    data: tableData.value, //link data to table
    reactiveData: true, //enable data reactivity
    layout: "fitColumns", //fit columns to width of table (optional)
    columns: [
      { title: "Fichier", field: "fileName", width: 150 },
      { title: "Libellé", field: "libelle", hozAlign: "center", width: 150 },
      { title: "Catégorie", field: "categorie", hozAlign: "center", width: 150 },
      {
        title: "Date et heure",
        field: "datetime",
        hozAlign: "center",
        formatter: "plaintext",
        width: 150,
      },
      { title: "Crée par", field: "createdby", hozAlign: "center", width: 150 },

      {
        title: "Destinataire(s)",
        field: "destinataires",
        hozAlign: "center",
        width: 150,
      },
      {
        title: "Status",
        field: "status",
        hozAlign: "center",
        width: 150,
        formatter: "tickCross",
      },
      {
        title: "Date de téléchargement",
        field: "uploadDate",
        hozAlign: "center",
        formatter: "plaintext",
        width: 150,
      },
      {
        title: "Taille du fichier",
        field: "fileSize",
        hozAlign: "center",
        width: 150,
      },
      {
        title: "Télécharger",
        field: "download",
        width: 150,
        hozAlign: "center",
        formatter: "buttonTick",
        cellClick: function (e, cell) {
          const rowData = cell.getRow().getData();
          // Add your logic to download the file here
          const downloadLink = document.createElement("a");

          downloadLink.href = `public/${encodedFileName}`;
          downloadLink.download = rowData.fileName;
          downloadLink.click();
        },
      },
      {
        title: "Supprimer",
        field: "delete",
        width: 150,
        hozAlign: "center",
        formatter: "buttonCross",
        cellClick: async function (e, cell) {
          const rowData = cell.getRow().getData();
          // Add your logic to delete the file here
          await $fetch("api/delete", {
            method: "PUT",
            body: {
              id: rowData.id,
              fileName: rowData.fileName.replaceAll(" ", "-").toLowerCase(),
            },
          });
          tableData.value = tableData.value.filter((row) => {
            return row.id !== rowData.id;
          });
        },
      },
    ], //define table columns
  });
});

const filterField = ref("libelle");
const filterType = ref("like");
const filterValue = ref("");

watch([filterField, filterType, filterValue], () => {
  if (filterField.value === "" || filterType.value === "" || filterValue.value === "") {
    return;
  }
  tabulator.value.setFilter(filterField.value, filterType.value, filterValue.value);
});
</script>

<style>
@import "tabulator-tables/dist/css/tabulator_modern.min.css";
</style>
