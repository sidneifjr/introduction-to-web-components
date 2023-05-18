import './styles.css'

class HelloWorld extends HTMLElement {
  name: string;

  // constructor é chamado quando o componente é inicializado pela primeira vez.
  constructor() {
    super();

    // Definindo a propriedade 'name' com um valor padrão, para então ser utilizada abaixo.
    this.name = 'test';
  }

  // component attributes -> retorna um array de propriedades a serem observadas.
  static get observedAttributes() {
    return ['name']
  }

  /**
   * É disparado sempre que um atributo observado é alterado.
   * Este método pode necessitar de um nova renderização.
   **/ 
  attributeChangedCallback(property: string | number, oldValue: any, newValue: any) {
    // Se o valor antigo e o novo forem o mesmo, não prosseguir.
    if(oldValue === newValue) return
    console.log(property)

    // this[property] = newValue
  }

  // Disparado quando o componente é apendado à DOM.
  connectedCallback() {
    this.textContent = `Hello, ${this.name}'s World!`

    /**
     * Web Components fornecem funcionalidades únicas que não existem em frameworks JavaScript.
     * 
     * - A ShadowDOM fornece uma forma de encapsular seus estilos para APENAS aquela instância do componente; isso evita vazamentos de estilo, que podem afetar outros componentes.
     * 
     * A ShadowDOM apenda uma nova DOM ao Web Component com o código abaixo:
     * 
     * const shadow = this.attachShadow({ mode: 'closed' })
     * 
     * O parâmetro "mode" em "attachShadow" pode receber dois valores: open (permite que JS da página exterior acesse o ShadowDOM) ou closed (A ShadowDOM pode ser acessada
     * somente no interior do web component).
     * 
     * Embora o mode esteja definido como 'closed', ainda é possível que alguns estilos como font e color sejam herdados da página, pois tais propriedades não foram explicitamente
     * definidas no Web Component.
     * 
     * Os estilos definidos no escopo deste web component não pode afetar outros parágrafos na página ou até mesmo outros componentes 'hello-world'.
     * 
     * Porém, é possível notar que é possível estilizar o exterior do elemento 'hello-world', usando o seletor ":host".
     */
    const shadow = this.attachShadow({ mode: 'closed' })

    shadow.innerHTML = `
      <style>
        :host {
          background: red !important;
          border: solid 2px blue;
        }

        p {
          text-align: center;
          font-weight: normal;
          padding: 16px;
          margin: 0 0 2rem 0;
          background-color: #eee;
          border: solid 1px #777;
          color: #000;
        }
      </style>

      <p>Hello ${this.name}!</p>
    `
  }

  /**
   * Disparado quando o componente é removido da DOM.
   * Pode ser útil para remover um state armazenado ou abordar requisições AJAX.
   *  */
  disconnectedCallback() {
    console.log("Goodbye, cruel World!")
  }

  // Disparado quando o componente é movido de um documento para outro.
  adoptedCallback(){

  }
}

customElements.define("hello-world", HelloWorld)