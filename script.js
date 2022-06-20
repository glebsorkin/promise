// var promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(2)
//     }, 2000)
// })
// promise.then(num => num *= 2)
//     .catch(err => console.log(err))
//     .then(num => num *= 3)
//     .finally(() => console.log('finally'))

class MyPromise {
    constructor(callback) {
        this.onCatch = null
        this.onFinally = null
        this.thenCbs = []
        this.isRejected = false

        function resolver(data) {
            if(this.isRejected){
                return
            }
            this.thenCbs.forEach(then => {
                data = then(data)
            })
            if (this.onFinally) {
                this.onFinally()
            }
        }

        function rejecter(error) {
            this.isRejected = true
            if (this.onCatch) {
                this.onCatch(error)
            }
            if (this.onFinally) {
                this.onFinally()
            }
        }

        callback(resolver.bind(this), rejecter.bind(this))
    }

    then(cb) {
        this.thenCbs.push(cb)
        return this
    }

    catch(cb) {
        this.onCatch = cb
        return this
    }

    finally(cb) {
        this.onFinally = cb
        return this
    }
}
const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject('Error')
        resolve(10)
    }, 2000)

})
promise
    .then(num => num *= 2)
    .catch(err => console.log(err))
    .then(num => num *= 3)
    .finally(() => console.log('finally'))
    .then(num => console.log('Done', num))

