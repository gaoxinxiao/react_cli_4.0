import { observable, action } from 'mobx'
import { session } from 'utils/storage'
import Http from 'service/http'
import Api from 'api/index'

class User {
    constructor() {
        this.updateUser()
    }
    /** 登录标识*/
    @observable isUser = false
    /** 登录加载*/
    @observable loading = false

    @action.bound
    async login({ username = 'admin', password = '123456' }) {
        this.loading = true
        try {
            const res = await Http.post(Api.userLogin, {
                loginName: username,
                passWord: password
            }).toPromise()
            const data = JSON.parse(res.userSession)
            session.set('userSession', data)
            this.isUser = true
            this.loading = false
            return res
        } catch (e) {
            this.loading = false
        }
    }
    
    @action.bound
    updateUser() {
        const res = session.get('userSession')
        this.isUser = !!res
    }
}
export default new User()