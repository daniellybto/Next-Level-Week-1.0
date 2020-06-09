function returnAPIsAndInsertOptions(URL, selecElement){
  fetch(URL)
  .then((res) => {
    return res.json()
  })
  .then( states =>{
    for( const state of states){
      selecElement.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
    }
  });
}


function populateUFs(){
  const ufSelect = document.querySelector("select[name=uf]");
  const URL = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

  returnAPIsAndInsertOptions(URL, ufSelect);
}

populateUFs();

function getCities(event){
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const URL = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  returnAPIsAndInsertOptions(URL, citySelect);
  citySelect.disabled = false;
}

document.querySelector("select[name = uf]").addEventListener("change",getCities);