class Heap {
    constructor() {
        this.data = [];
    }

    push(value) {
        this.data.push(value);
        this._heapifyUp();
    }

    pop() {
        if (this.data.length === 0) return null;
        if (this.data.length === 1) return this.data.pop();

        const top = this.data[0];
        this.data[0] = this.data.pop();
        this._heapifyDown();
        return top;
    }

    peek() {
        return this.data[0] || null;
    }

    isEmpty() {
        return this.data.length === 0;
    }

    _heapifyUp() {
        let index = this.data.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.data[index].distancia >= this.data[parentIndex].distancia) break;

            [this.data[index], this.data[parentIndex]] = [this.data[parentIndex], this.data[index]];
            index = parentIndex;
        }
    }

    _heapifyDown() {
        let index = 0;
        const length = this.data.length;

        while (true) {
            const leftIndex = 2 * index + 1;
            const rightIndex = 2 * index + 2;
            let smallest = index;

            if (leftIndex < length && this.data[leftIndex].distancia < this.data[smallest].distancia) {
                smallest = leftIndex;
            }

            if (rightIndex < length && this.data[rightIndex].distancia < this.data[smallest].distancia) {
                smallest = rightIndex;
            }

            if (smallest === index) break;

            [this.data[index], this.data[smallest]] = [this.data[smallest], this.data[index]];
            index = smallest;
        }
    }
}

module.exports = Heap;
