function returnAPIsAndInsertOptions(URL, optionValue ,selecElement){
  fetch(URL)
  .then((res) => {
    return res.json()
  })
  .then( states =>{
    for( const state of states){
      selecElement.innerHTML += `<option value="${state[optionValue]}">${state.nome}</option>`;
    }
  });
}

function populateUFs(){
  const ufSelect = document.querySelector("select[name=uf]");
  const URL = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

  returnAPIsAndInsertOptions(URL, 'id' ,ufSelect);
}

populateUFs();

function getCities(event){
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const URL = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = "<option value=''>Selecione a Cidade</option>"; //conserta o bug que ficava ao trocar o Estado, pois ficava com a cidades do ultimo estado selecionado!
  citySelect.disabled = true; // trava o campo de options para que enquanto o usuário não selecionar um estado válido ele não poderá escolher qualquer cidade ou option em destaque!

  //nesse caso específico de option quero que o value do meu option seja o próprio 'nome' da cidade, a qual eu irei armazenar no Banco de Dados!
  returnAPIsAndInsertOptions(URL, "nome" ,citySelect);
  citySelect.disabled = false;
}

document.querySelector("select[name = uf]").addEventListener("change",getCities);