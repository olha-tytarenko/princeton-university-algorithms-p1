class ArrayDeque {
    constructor() {
        this.deque = [];
    }

    isEmpty() {
        return !!this.deque.length;
    }

    addFirst(item) {
        if (!item) {
            throw 'Illegal Argument Exception'
        }

        this.deque.unshift(item);
    }

    addLast(item) {
        if (!item) {
            throw 'Illegal Argument Exception'
        }

        this.deque.push(item);
    }

    removeFirst() {
        if (this.deque.length) {
            return this.deque.shift();
        } else {
            throw 'No Such Element Exception'
        }
    }

    removeLast() {
        if (this.deque.length) {
            return this.deque.pop();
        } else {
            throw 'No Such Element Exception'
        }
    }

    size() {
        return this.deque.length;
    }

    [Symbol.iterator]() {
        let index = 0;

        const iterator = {
            next() {
                let result;

                if (index < this.deque.length) {
                    result = { value: this.deque[index], done: false };
                    index++;
                } else {
                    result = { value: null, done: true };
                }

                return result;
            }
        }

        iterator.next = iterator.next.bind(this);

        return iterator;
    }
}
