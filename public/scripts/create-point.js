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
const valuesItens = [];
//Ítens de Coleta:
//pegar todos os <li>'s
const itemsToCollect = document.querySelectorAll(".items-grid li");

for( const item of itemsToCollect){
  item.addEventListener("click", handleSelectedItem);
}

const collectedItens = document.querySelector("input[name=items");
let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target;

  //pego os id através do data-id de cada <li>:
  const itemId = itemLi.dataset.id;

  //adicionar ou remover uma classe pelo javascript: >> usa-se a função "classList"
  // as funcionalidades da "classList" podem ser: ".add", ".remove" ou "toggle"
  //a  funcionalidade "toggle" permite adicionar ou removar a classe do elemento de forma automática,
  //ou seja, caso a classe já exista, será então removida, se não existir será adicionada!
  itemLi.classList.toggle("selected")

  //VERIFICA SE EXISTEM ITENS SELECIONADOS...
  // se SIM pegar os itens selecionados!
  //caso o método 'findIndex' encontre o id do <li> selecionado ele então irá retornar qual o index do meu array
  //que se encontra armazenado em meu array 'selectedItems', pois a partira do index eu poderei futuramente
  //excluir o elemento do meu array!
  const alreadySelected = selectedItems.findIndex( item => {
    const itemFound = item == itemId; //isso irá retornar true ou false
    return itemFound;
  });

  //se ja estiver selecionado,...
  if(alreadySelected >= 0){
    //... então tiro da seleção!
    // esse método 'filter' irá filtrar o valor do array, ou seja, caso o retorno seja verdadeiro quer dizer
    // que o item selecionado está no array, então ele irá 'filtrar' e não será adicionado a const 'filteredItems'
    const filteredItems = selectedItems.filter(item => {
      const itemIsDifferent = item != itemId; 
      return itemIsDifferent;
    });

    selectedItems = filteredItems;
  } else{ //se NÃO estiver selecionado,...
    // ... adicionar à seleção
    selectedItems.push(itemId);
  }

  // atualizar o campo escondido com os itens selecionados
  collectedItens.value = selectedItems;
}