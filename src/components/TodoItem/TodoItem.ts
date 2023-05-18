const template = document.createElement("template")

template.innerHTML = `
  <style>
    h3 {
      color: green;
    }
  </style>

  <h3>
    <slot></slot>
  </h3>
`

class TodoItem extends HTMLElement {
  constructor() {
    super()

    /**
     * Precisamos criar um componente onde possamos definir seus estilos, que sejam aplicáveis SOMENTE ao Web Component; ou seja, não deve ocorrer vazamento com o resto da página.
     * Então, eu preciso apendar meu componente à Shadow DOM.
     * mode: "open" permite que eu realize modificações à minha Shadow DOM; geralmente, é a opção desejada. 
     */
    const shadow = this.attachShadow({ mode: "open" })
    shadow.append(template.content.cloneNode(true))

    // se "mode" for close, a instrução abaixo retornará null; se for open, retorna o elemento em shadow. Ou seja, o componente em si.
    // this.shadowRoot
  }
}

// Registrando na DOM.
customElements.define("todo-item", TodoItem)