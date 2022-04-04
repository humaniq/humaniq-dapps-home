import Disposable from './Disposable'

/**
 * Disposable that represents a group of Disposables that are disposed together.
 */
export default class CompositeDisposable<T = any> {
  disposables: Disposable<T>[] = []

  add = (disposable: Disposable<T>) => {
    this.disposables.push(disposable)
  }

  remove = (disposable: Disposable<T>) => {
    let index = this.disposables.indexOf(disposable)

    if (index >= 0) {
      this.disposables.splice(index, 1)
    }
  }

  clear = () => {
    for (let disposable of this.disposables) {
      // dispose request
      disposable.dispose()
    }

    // clear disposables array
    this.clearDisposables()
  }

  isEmpty = () => {
    return this.disposables.length === 0
  }

  clearDisposables = () => {
    this.disposables = []
  }
}