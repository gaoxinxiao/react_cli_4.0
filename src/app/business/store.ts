import { observable, action } from 'mobx'
import {session} from 'utils/storage'

class Store {
    @observable user = ''

    @action.bound
    initData(){
        const res = session.get('userSession')
        this.user = res.loginName
    }
}
export default new Store()