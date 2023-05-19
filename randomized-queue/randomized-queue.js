class RandomizedQueue {
    constructor() {
        this.queue = [];
        this.queueLength = 0;
    }

    isEmpty() {
        return this.queue === 0;
    }

    size() {
        return this.queue.length;
    }

    enqueue(item) {
        if (item === null) {
            throw 'Illegal Argument Exception'
        }

        this.queue.push(item);
        this.queueLength++;
    }

    dequeue() {
        if (this.queue.length === 0) {
            throw 'No Such Element Exception';
        }

        const removedIndex = this.#getRandomIndex();
        const removedItem = this.queue[removedIndex];
        this.queue[removedIndex] = this.queue[this.queueLength - 1];
        this.queue.pop();
        this.queueLength--;

        return removedItem;
    }

    sample() {
        if (this.queue.length === 0) {
            throw 'No Such Element Exception';
        }

        return this.queue[this.#getRandomIndex()];
    }

    [Symbol.iterator]() {
        let order = [];
        let currentIndex = 0;

        for (let i = 0; i < this.queueLength; i++) {
            order.push(i);
        }

        this.#shuffle(order)

        const iterator = {
            next() {
                let result;

                if (currentIndex < this.queueLength) {
                    result = {
                        value: this.queue[order[currentIndex]],
                        done: false
                    }
                    currentIndex++;
                } else {
                    result = {
                        value: null,
                        done: true
                    }
                }

                return result;
            }
        }

        iterator.next = iterator.next.bind(this);

        return iterator;
    }

    #getRandomIndex() {
        return Math.floor(Math.random() * this.queueLength);
    }

    #shuffle(array) {
        for (let i = array.length - 1; i >= 0; i--) {
            const j = Math.round(Math.random() * i);
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array;
    }
}
