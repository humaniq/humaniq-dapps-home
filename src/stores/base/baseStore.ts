import CompositeDisposable from "../../network/CompositeDisposable"
import Disposable from "../../network/Disposable"

export default class BaseStore {
  protected compositeDisposable: CompositeDisposable<any>

  protected constructor() {
    this.compositeDisposable = new CompositeDisposable<any>()
  }

  addDisposable = (disposable: Disposable<any>): void => {
    this.compositeDisposable.add(disposable)
  }

  clearDisposable = (disposable: Disposable<any>): void => {
    this.compositeDisposable.remove(disposable)
  }

  clearComposite = (): void => {
    this.compositeDisposable.clearDisposables()
  }

  public onDestroy = (): void => {
    if (!this.compositeDisposable.isEmpty()) {
      this.compositeDisposable.clear()
    }
  }
}