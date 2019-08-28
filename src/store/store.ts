import { observable, action } from 'mobx'
import Menu from './system/menu'


class Store {
    /* 菜单*/
    Menu = Menu
}
export default new Store()