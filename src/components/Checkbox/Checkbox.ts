const checkbox = document.createElement("template")

checkbox.innerHTML = `
  <style>
    label {
      color: red;
      display: block;
    }

    .description {
      font-size: 1rem;
      color: yellow;
    }
  </style>

  <label>
    <input type="checkbox" />
    <slot></slot>

    <span class="description">
      <slot name="description"></slot>
    </span>
  </label>
`

class Checkbox extends HTMLElement {
  checkbox: HTMLInputElement | null

  constructor() {
    super()

    const shadow = this.attachShadow({ mode: "open" })
    shadow.append(checkbox.content.cloneNode(true))

    this.checkbox = shadow.querySelector("input")
  }

  // Lifecycles
  // Observando se meus atributos foram alterados, através de um getter.
  static get observedAttributes(){
    return ["checked"] // uma alteração somente neste atributo causará o disparo da callback abaixo.
  }

  /**
   * Callback usada para verificar se um atributo foi alterado.
   * 
   * Recebe três argumentos:
   * 
   * name: nome do atributo que é alterado.
   * oldValue: valor anterior do atributo.
   * newValue: valor atual do atributo.
   * */
  attributeChangedCallback(name: string, oldValue: any, newValue: any){
    console.log(name, oldValue, newValue)

    if (name === "checked") {
      this.updateChecked(newValue)
    }
  }

  // Executa ao adicionar um elemento ao documento.
  connectedCallback() {
    console.log("connected")
  }

  // Executa ao remover um elemento do documento.
  disconnectedCallback() {
    console.log("disconnected")
  }

  // Função responsável por atualizar a propriedade "checked".
  updateChecked(value: string | null){
    (this.checkbox as any).checked = value != null && value !== "false"
  }
}

customElements.define("check-box", Checkbox)

// Testando troca de valor do checked.
// const item = document.querySelector('check-box')
// console.log(item)

// let checked = true

// setInterval(() => {
//   checked = !checked
//   item.setAttribute("checked", checked)
// }, 500)