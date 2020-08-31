var app = new Vue({
    el: '#main',
    data: {
        numbers_with_props: [],
        swapp1: '',
        swapp2: '',
        iterationsArray: [],
        status: 'idle',
        iteration: {
            id: '',
            swap_number_one: '',
            swap_number_two: '',
            timestamp: ''
        }
    },
    watch: {
        swapp1: function() {
            this.swapp1 = this.swapp1;
        },
        swapp2: function() {
            this.swapp2 = this.swapp2;
        }
    },
    mounted() {
        this.generateSetNumbers();
    },
    computed: {
        customLog: function() {
            if (this.swapp1 !== '') {
                return "Swapping " + this.swapp1 + ' AND ' + this.swapp2;
            }
        }
    },
    methods: {
        generateSetNumbers() {
            this.numbers_with_props = [];
            for (var i = 0; i < 100; i++) {
                var num = Math.floor(Math.random() * 100 + 1);
                var posx = num;

                var obj = {
                    number: num,
                    top: posx,
                    styleBubble: {
                        width: (num * 4) + 'px',
                    },
                };
                this.numbers_with_props.push(obj);
            }
            this.numbers_with_props.sort(() => Math.random - 0.5);
            this.numbers_with_props = this.numbers_with_props.slice(0, 10);
        },
        async bablsort(a) {
            this.status = 'in-progress';
            for (let i = a.length - 1; i >= 0; i--) {
                for (let j = 1; j <= i; j++) {
                    // Compare current number with next one and swap if it is larger.

                    if (a[j - 1].number > a[j].number) {
                        this.swapp1 = a[j - 1].number;
                        this.swapp2 = a[j].number;
                        iteration = {
                            swap_number_one: a[j - 1].number,
                            swap_number_two: a[j].number,
                            timestamp: Date.now()
                        }
                        this.iterationsArray.push(iteration);
                        this.arraySwap(a, j - 1, j);
                        await this.sleepFunction(250);
                    }

                }
            }
        },
        arraySetWithoutIndexes(array, index, value) {
            array.splice(index, 1, value);
        },
        arraySwap(array, indexA, indexB) {
            var x = array[indexA];
            array.splice(indexA, 1, array[indexB]);
            array.splice(indexB, 1, x);
        },
        async shuffleNumbers(a) {
            var j, i;

            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                this.arraySwap(a, i, j);
                await this.sleepFunction();
            }
        },
        sleepFunction(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        },
        shuffle: function() {
            this.iterationsArray = [];
            this.shuffleNumbers(this.numbers_with_props);
            this.status = 'idle';
        },
        /**
         * Do bubble sort and disable button until it's complete.
         */
        sort: async function() {
            await this.bablsort(this.numbers_with_props).then((result) => {
                this.status = 'complete';
            });
        }
    }
});