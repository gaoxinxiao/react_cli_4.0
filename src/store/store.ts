import { observable, action } from 'mobx'
import Menu from './system/menu'
import Notification from './notification'
import User from './user'


class Store {
    /* 用户*/
    User = User
    /* 菜单*/
    Menu = Menu
    /* 提示框*/
    Notification = Notification

}
export default new Store()