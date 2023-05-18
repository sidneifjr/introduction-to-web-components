class ExpandableList extends HTMLUListElement {
  toggleBtn: HTMLButtonElement

  constructor() {
    super()

    this.style.position = "relative"

    this.toggleBtn = document.createElement("button")
    this.toggleBtn.style.position = "absolute"
    this.toggleBtn.style.border = "none"
    this.toggleBtn.style.background = "none"
    this.toggleBtn.style.padding = "0"
    this.toggleBtn.style.top = "0"
    this.toggleBtn.style.left = "5px"
    this.toggleBtn.style.cursor = "pointer"
    this.toggleBtn.innerText = ">"

    // Tudo que eu posso fazer na DOM, é possível fazer em um custom element.
    this.toggleBtn.addEventListener("click", () => {
      (this.dataset as any).expanded = !this.isExpanded;
    })

    this.appendChild(this.toggleBtn)
  }

  // Verifica se o valor da propriedade é false ou se não foi definida.
  get isExpanded() {
    return this.dataset.expanded !== "false" && this.dataset.expanded != null
  }

  static get observedAttributes() {
    return ["data-expanded"]
  }

  attributeChangedCallback(name:unknown, oldValue:unknown, newValue:unknown){
    this.updateStyles()
    console.log(name, oldValue, newValue)
  }

  updateStyles(){
    const transform = this.isExpanded ? "rotate(90deg)" : "";

    this.toggleBtn.style.transform = transform;

    [...this.children].forEach((child) => {
      if(child !== this.toggleBtn){
        (child as any).style.display = this.isExpanded ? "" : "none"
      }
    })
  }
}

// O uso de 'extends: "ul"' associa todas as ul a este componente.
customElements.define("expandable-list", ExpandableList, { extends: "ul" })