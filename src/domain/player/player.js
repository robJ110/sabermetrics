import Entity from '../entity';
import moment from 'moment';

class Person extends Entity {

    /**
     * Pessoa
     * @param {string} name Player name
     * @param {string} id Identificador da Pessoa
     */
    constructor(name) {
        super(id);

        if (!name) throw new TypeError('Name is not defined.');
        this.name = name;
    }

}

export default Person;