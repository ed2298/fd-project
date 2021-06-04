import { LitElement, html, css, customElement, property } from 'lit-element';
import { products } from '../products';

@customElement('products-app')
class ProductsAppElement extends LitElement {
    @property({type: Object})
    products = products;

    @property()
    myCart : Object[] = [];

    @property()
    name : string = "Items";

    @property()
    buttonColor: string = "#4CAF50";

    @property()
    cardColor: string = "#f7f7f7";
    
    
    static styles = [css`
        .row {
            display: flex;
        }
        .column {
            flex: 50%;
            padding: 10px;
        }
        .empty {
            color: #808080;
        }
    `];
    
    insertProduct(products : Object[], product: Object) {
        const productId = product["id"];
        let index : number = 0;
        while (index < products.length) {
            if (productId < products[index]["id"]) {
                break;
            }
            index++;
        }
        products.splice(index, 0, product); 
    }

    computeTotalPrice(products: Object[]) {
        let total : number = 0;
        products.forEach(element => {
            let value : number = Number(element["price"].slice(1));
            total += value;
        });
        return total;
    }

    onMoveCard(event: CustomEvent) {
        const index = this.products.indexOf(event.detail);
        if (index > -1) {
            this.products.splice(index, 1)[0];
            this.insertProduct(this.myCart, event.detail);
        }
        else {
            const indexInMyCart = this.myCart.indexOf(event.detail);
            if (indexInMyCart > -1) {
                this.myCart.splice(indexInMyCart, 1)[0];
                this.insertProduct(this.products, event.detail);
            }
        }        
        this.requestUpdate();
    }

    render() {
        return html`
            <div class="row">
                <div class="column">
                    <h1>Available ${this.name}</h1>
                    ${this.products.length > 0 ? this.products.map(product => html`
                        <product-card .product=${product} cardColor=${this.cardColor} buttonText="Add To Cart" buttonColor=${this.buttonColor} @moveCard=${this.onMoveCard}></product-card>
                    `) : html`<h1 class="empty">There are no available ${this.name}!</h1>`}
                </div>
                <div class="column">
                    <h1>${this.name} Added to My Cart</h1>
                    ${this.myCart.length > 0 ? this.myCart.map(product => html`
                        <product-card .product=${product} cardColor=${this.cardColor} buttonText="Remove From Cart" buttonColor=${this.buttonColor} @moveCard=${this.onMoveCard}></product-card>
                    `) : html`<h1 class="empty">There are no ${this.name} in my cart! </h1>`}
                    ${ this.myCart.length > 0 && Object.getOwnPropertyNames(this.myCart[0]).includes("price") ? html`<h2>Total price: ${this.computeTotalPrice(this.myCart).toFixed(2)}</h2>` : ''}
                </div>
            </div>
        `;
    }
}