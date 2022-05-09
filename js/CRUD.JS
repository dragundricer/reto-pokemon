
'use strict';

let pokemons = [
    new pokemon('Bulbasaur','planta'),
    new pokemon('Ivysaur', 'planta'),
    new pokemon('Venusaur', 'planta'),
    new pokemon('Charmander', 'fuego'),
    new pokemon('charmeleon', 'fuego'),
    new pokemon('charizard', 'fuego/volador')
  ];

const contenedorAlerta = document.querySelector('#contenedorAlerta');
let timeoutId = 0;

const showAlert = (type, content) => {
  clearTimeout(timeoutId);
  contenedorAlerta.classList.remove('bg-primary');
  contenedorAlerta.classList.remove('bg-success');
  contenedorAlerta.classList.remove('bg-danger');
  switch (type) {
    case 'primary':
      contenedorAlerta.classList.add('bg-primary');
      break;
    case 'success':
      contenedorAlerta.classList.add('bg-success');
      break;
    case 'danger':
      contenedorAlerta.classList.add('bg-danger');
      break;
    default:
      contenedorAlerta.classList.add('bg-primary');
      break;
  }
  contenedorAlerta.innerHTML = content;
  timeoutId = setTimeout(() => {
    contenedorAlerta.innerHTML = '';
  }, 5000);
};

const getFormData = () => {
  const documentFormPokemons = document.forms['formPokemon'];
  const id = documentFormPokemons['id'].value;
  const nombre = documentFormPokemons['nombre'].value;
  const tipo = documentFormPokemons['tipo'].value;

  return ({ id, nombre, tipo });
};

const validateForm = () => {
  const documentFormPokemons = document.forms['formPokemon'];
  const nombre = documentFormPokemons['nombre'].value;
  const tipo = documentFormPokemons['tipo'].value;

  return [nombre.trim(), tipo.trim()].includes('');
};

const resetForm = () => {
  const documentFormPokemons = document.forms['formPokemon'];
  documentFormPokemons['id'].value = '';
  documentFormPokemons['nombre'].value = '';
  documentFormPokemons['tipo'].value = '';
};

const createPokemon = () => {
  const { nombre, tipo } = getFormData();
  if (validateForm()) {
    showAlert('danger', 'Completar todos los campos');
  } else {
    pokemons = [...pokemons, new pokemon(nombre, tipo)];
    resetForm();
    readPokemon();
    showAlert('primary', 'Registro creado');
  }
};

const readPokemo = (pokemonId) => {
    const documentFormPokemon = document.querySelector('#formPokemon');
    const formTitle = document.querySelector('#formTitle');
    const formButton = document.querySelector('#formButton');
  
    const pokemon = pokemons.find((element) => {
      return element.id === pokemonId;
    });
    const { id, nombre, tipo } = pokemon;
  
    formTitle.innerHTML = 'Editar Pokemon';
    formButton.innerHTML = 'Editar';
    documentFormPokemon['id'].value = id;
    documentFormPokemon['nombre'].value = nombre;
    documentFormPokemon['tipo'].value = tipo;
    showAlert('primary', 'Registro leído');
  };
  const deletePokemon = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-2',
        cancelButton: 'btn btn-danger mx-2'
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, elimínalo!',
      cancelButtonText: '¡No, cancélalo!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        productos = productos.filter((element) => {
          return element.id !== id;
        });
        readProducts();
        showAlert('danger', 'Registro eliminado');
        swalWithBootstrapButtons.fire(
          '¡Eliminado!',
          'Tu registro ha sido eliminado.',
          'success'
        );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Tu registro está seguro',
          'error'
        );
      }
    });
  };
  
const readPokemon = () => {
  const tBodyPokemon = document.querySelector('#tBodyPokemon');
  tBodyPokemon.innerHTML = '';

  pokemons.forEach((element) => {
    const { id, nombre, tipo } = element;
    tBodyPokemon.innerHTML += `
    <tr class="">
        <td class="">${id}</td>
        <td class="">${nombre}</td>
        <td class="">${tipo}</td>
        <td class="">
        <button
          class="bg-success rounded border-0 p-0"
          onclick="readPokemo(${id})"
        >
          ✏
        </button>
        <button
          class="bg-warning rounded border-0 p-0"
          onclick="deletePokemon(${id})"
        >
          🗑
        </button>
      </td>
    </tr>
    `
  });
  showAlert('primary', 'Registros leídos');
};

const updatePokemon = () => {
  const { id, nombre, tipo } = getFormData();
  const formTitle = document.querySelector('#formTitle');
  const formButton = document.querySelector('#formButton');

  if (validateForm()) {
    showAlert('danger', 'Completar todos los campos');
  } else {
    pokemon = pokemons.map((element) => {
      if (element.id !== +id) {
        return element;
      } else {
        element.nombre = nombre;
        element.tipo = tipo;
        return element;
      }
    });

    resetForm();
    formTitle.innerHTML = 'Crear Pokemon';
    formButton.innerHTML = 'Crear';
    readPokemon();
    showAlert('success', 'Registro actualizado');
  }
};


const documentReady = () => {
  const formPokemon = document.querySelector('#formPokemon');

  const submitPokemons = (e) => {
    e.preventDefault();
    const id = document.getElementById('formId').value;
    if (id === '') {
      createPokemon();
    } else {
      updatePokemon();
    }
  };

  readPokemon();
  formPokemon.addEventListener('submit', submitPokemons);
};

document.addEventListener('DOMContentLoaded', documentReady);