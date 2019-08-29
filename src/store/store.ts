import { observable, action } from 'mobx'
import Menu from './system/menu'
import Notification from './notification'


class Store {
    /* 菜单*/
    Menu = Menu
    /* 提示框*/
    Notification = Notification

}
export default new Store()