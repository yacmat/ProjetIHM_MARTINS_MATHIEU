# ClientAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).



## #--------------Partie Projet------------#

Ce projet a été réalisé par MARTINS Benoît ainsi que MATHIEU Yacine, étudiants en L3 MIAGE.

Pour lancer le projet, il suffit de lancer le serveur qui sera disponible sur localhost:8090 et ensuite le client localhost:4200.

## #---------Interface-------#

Toute l'interface ainsi que le drag and drop ont été réalisés à l'aide de la bibliothèque Angular Material.

L'interface comprend les cartes des infirmières avec leur Id, leur avatar, ainsi que la liste des patients qui leur sont affectés.

Les patients sont sous forme d'expansion panel, c'est à dire que lorsque l'on clique sur un patient, nous obtenons plus d'informations sur celui-ci comme
son adresse ou encore son numéro de sécurité sociale.

Ensuite, nous avons la liste des patients non affectés qui sont également sous forme d'expansion panel.

## #---------Ajout patient non affecté-------#

Nous pouvons ajouter un nouveau patient non affecté à l'aide du bouton "Ajouter patient" qui affiche un formulaire avec les informations à rentrer pour ajouter un patient.
Les vérifications du numéro de sécurité sociale ainsi que du code postal sont effectués à l'aide de pattern et une boîte de dialogue s'affiche pour informer l'utilisateur de la validité des informations.

Si les informations sont correctes, un nouveau patient sera affiché dans la liste des patients non affectés.

## #---------Affectation et Désaffectation-------#

Pour affecter un patient à une infirmière, nous avons utilisé le drag and drop d'Angular material. Il suffit de prendre un patient et de le faire glisser sur la zone de l'infirmière à qui l'on veur faire l'affectation.
Idem pour rendre un patient non affecté mais dans l'autre sens avec le drag and drop.
