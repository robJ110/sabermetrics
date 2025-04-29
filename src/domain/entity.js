import uuidV4 from 'uuid/v4';

class Entity {

    /**
     * represents an entity
     * @param {string} id Entity identifier
     */
    constructor(id) {
        this.id = !id ? uuidV4() : id;
    }

}

export default Entity;