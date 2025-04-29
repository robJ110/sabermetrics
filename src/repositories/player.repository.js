import FirebaseRepository from './utils/firebase.repository';

class PlayerRepository extends FirebaseRepository {

    constructor() {
        super('player');
    }

    async getAll() {
        const response = await this.firebaseCollection.get();
        return this.processFirebaseResponse(response);
    }

}

export default new PlayerRepository();