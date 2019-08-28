import { observable, action } from 'mobx'
import _ from 'lodash'

interface subMenu {
    Key?: string,
    Name?: string,
    Component?: string,
    Path?: string,
    Id?: string | number
}

class Menu {
    constructor() {
        this.getSubMenu()
    }

    @observable MenuList = []

    getSubMenu() {
        this.getContainers().then(async data => {
            const res = await import("../../subMenu.json");
            res.MenuList.map(item => {
                data.map(subItem => {
                    if (subItem.Key == item.Key) {
                        item.Children.push(subItem)
                    }
                })
            })
            this.MenuList = res.MenuList
        })
    }

    async getContainers() {
        let arr:subMenu[] = []
        const res = await import('app/container').then(res => res.default)
        _.map(res, (item, key) => {
            arr.push(
                {
                    Key: item.Key,
                    Name: item.Name,
                    Component: item.Component,
                    Path: key,
                    Id: item.id
                }
            )
        })
        return arr
    }

}
export default new Menu()