class LinkedListDeque {
    constructor() {
        this.start = null;
        this.end = null;
        this.size = 0;
    }

    isEmpty() {}

    addFirst(item) {
        if (!item) {
            throw 'Illegal Argument Exception'
        }

        if (!this.start) {
            this.start = {
                value: item,
                next: null,
            }

            this.end = this.start;
        } else {
            const queueItem = {
                value: item,
                next: this.start,
            }

            this.start = queueItem;
        }

        this.size++;
    }

    addLast(item) {
        if (!item) {
            throw 'Illegal Argument Exception'
        }

        if (!this.end) {
            this.end = {
                value: item,
                next: null,
            }

            this.start = this.end;
        } else {
            const queueItem = {
                value: item,
                next: null,
            };

            
            this.end.next = queueItem;
            this.end = this.end.next;
        }

        this.size++;
    }

    removeFirst() {
        if (!this.start) {
            throw 'No Such Element Exception'
        }

        let value = this.start.value;

        this.start = this.start.next;
        this.size--;

        if (this.size === 0) {
            this.end = null;
        }

        return value;
    }

    removeLast() {
        if (!this.end) {
            throw 'No Such Element Exception'
        }

        let current = this.start;
        let value = this.end.value;

        if (this.size === 1) {
            this.start = null;
            this.end = null;
            this.size--;

            return;
        }

        while (current.next.next) {
            current = current.next;
        }

        this.end = current;
        this.end.next = null;

        this.size--;

        return value;
    }

    size() {
        return this.size();
    }

    [Symbol.iterator]() {
        let result;
        let current = this.start;

        const iterator = {
            next() {
                if (current) {
                    result = { value: current.value, done: false };
                    current = current.next;
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
