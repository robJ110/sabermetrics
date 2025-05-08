class Player {
    constructor(id) {
        this.id = id;
        this.score = 0;
        this.throws = 0;
        this.makes = 0;
        this.rebutalsThrown = 0;
        this.rebutalsMade = 0;
    }

    recordThrow(isMake, isRebutal)  {
        this.throws++;
        if (isMake) {
            this.makes++;
            this.score++;
        }

        if (isRebutal) {
            this.rebutals++;
            if (isMake) {
                this.rebutalsMade++;
            }
            this.rebutalsThrown++;
        }
    }

    getAccuracy() {
        return this.throws > 0 ? (this.makes / this.throws) * 100 : 0;
    }

    resetStats() {
        this.score = 0;
        this.throws = 0;
        this.makes = 0;
    }
}

export default Player;