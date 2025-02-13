import { JeuxDeCarte } from "./JeuxDeCarte"

export class Jeux {
    constructor (jeuxDeCarte) {
        this.jeuxDeCarte = jeuxDeCarte
        this.joueurs = []
    }
    
    distibuerCarte (nbCarteParJoueur) {
        
        const cartes = new JeuxDeCarte
        cartes.creerJeux()
        cartes.melanger()
        this.joueurs.forEach((i) => {
            for (let index = 0; index < nbCarteParJoueur; index++) {
                i.main?.push(cartes.cartes[index]) 
                cartes.cartes.splice(index,1)  
                // console.log("t la",i.main);
            }
        })
    }

    afficherTout () {

    }

    determienrGagnant () {

    }

    comparerCarte (carte1,carte2) {

        const valeurs = ["2","3","4","5","6","7","8","9","10","Valet","Dame","Roi","As"]

        return valeurs.indexOf(carte1) - valeurs.indexOf(carte2)
    }
}
// [a, b, r, d, f, i ,p , z]
// joueur.foreach => {
    //for( i=0; i < nombre de carte, i++) {
    //    joueur.push(carte[i])
// }
// }