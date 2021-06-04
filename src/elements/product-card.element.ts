import { LitElement, html,css, customElement, query, property } from 'lit-element';

@customElement('product-card')
class ProductCardElement extends LitElement {

    @property()
    product!: Object;

    @property()
    buttonText!: string;

    @property()
    buttonColor!: string;

    @property()
    cardColor!: string;

    static styles = [css`
    :host {
        display:block;
        clear:both;
        margin-bottom:20px;
    }
    .card {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        width: 28%;
        border-radius: 5px;
        padding-left: 1.5%;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
    h5 {
        font-size:1.3rem;
        margin-bottom:0;
    }
    #img {
        width:184px;
        height:282px;
        padding-bottom: 0px;
        background-size:cover;
        background-image:var(--image-url);
        background-color:var(--color, #ccc);
        float:center;
        overflow:hidden;
        border-radius: 5px 5px 0 0;
        padding-left: 2%;
        padding-right: 2%;
    }
    .container {
        padding: 2px 2px;
        text-align: left;
        text-justify: inter-word;
    }
    .name {
        margin-top: 2px;
        margin-right: 8px;
        text-align: center;
        text-justify: inter-word;
    }
    p {
        margin-top: 4px;
        margin-bottom: 4px;
    }
    .btn {
        border: none;
        color: white;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        padding: 8px 18px;
        border-radius: 4px;
    }
`];

    @query('#img')
    image;

    updated() {
        if (this.image !== null) {
            this.image.style.setProperty('--image-url',`url(${this.product["image"]})`);
        }
    }

    moveCard() {
        const event = new CustomEvent('moveCard', {detail:this.product})
        this.dispatchEvent(event);
    }

    prettyPrint(word: string) {
        let formatted : string = word.charAt(0).toUpperCase() + word.slice(1);
        formatted = formatted.replace("_", " ");
        return formatted;
      }

    render() {
        const keys = Object.getOwnPropertyNames(this.product);
        const keysWithoutProperties = keys.filter(x => !["id", "image", "color"].includes(x));
        const keysWithoutHeading = keysWithoutProperties.slice(1);
        return html`
            <div class="card" style="background-color:${this.cardColor}">
                ${keys.includes("image") ? html`<div id="img" alt=${this.product["title"]}></div>` : ''}
                <div class="container">
                    <h5 class="name">${this.product[keysWithoutProperties[0]]}</h5>
                    ${keysWithoutHeading.map( key => html`<p><b>${this.prettyPrint(key)}: </b>${this.product[key]}</p>`)}
                    <!-- ${this.product["author"] ? html`${this.product["author"]}<br>`: ''}
                    <p><b>${this.product["price"]}</b> <s>(${this.product["oldPrice"]})</s></p>
                    <p>${this.product["rating"]}</p> -->
                </div>
                <button class="btn" style="background-color:${this.buttonColor}" @click=${this.moveCard}>${this.buttonText}</button>
            </div>
        `;
    }
}
