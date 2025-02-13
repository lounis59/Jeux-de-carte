import { Carte } from "./Carte"

export class JeuxDeCarte {
    constructor () {
        this.cartes = []
    }

    creerJeux () {
        const valeurs = ["2","3","4","5","6","7","8","9","10","Valet","Dame","Roi","As"]
        const couleurs = ["Trefle","Carreau","Pique","Coeur"]

        valeurs.forEach((value) => {
            couleurs.forEach((color) => {
                this.cartes.push(new Carte(value,color))
            })
        })
    }

    melanger () {
        const copy = this.cartes.slice();
        let result = [];
        while (copy.length > 0) {
            const randomIndex = Math.floor(Math.random() * copy.length)
            result.push(copy[randomIndex]);
            copy.splice(randomIndex, 1);
        }
        this.cartes = result;
        
    }

    distibuer () {

    }
}

// a b c d e f
// 0 - 4
// a 

//e 

// e b c d e f
// e b c d a f