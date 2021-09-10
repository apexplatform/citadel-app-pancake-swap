import defaultConfig from './default-config.json'
import customConfig from './custom-config.json'
export class Config {
    get tabbarBackgroundColor() {
        if (customConfig.TABBAR.BACKGROUND_COLOR){
            return customConfig.TABBAR.BACKGROUND_COLOR
        } else {
            console.warn('Provide custom TABBAR.BACKGROUND_COLOR!')
        }
        return defaultConfig.TABBAR.BACKGROUND_COLOR
    }

    get tabbarItemColor() {
        if (customConfig.TABBAR.DEFAULT_ITEM_COLOR){
            return customConfig.TABBAR.DEFAULT_ITEM_COLOR
        } else {
            console.warn('Provide custom TABBAR.DEFAULT_ITEM_COLOR!')
        }
        return defaultConfig.TABBAR.DEFAULT_ITEM_COLOR
    }

    get tabbarItemHoverColor() {
        if (customConfig.TABBAR.HOVER_ITEM_COLOR){
            return customConfig.TABBAR.HOVER_ITEM_COLOR
        } else {
            console.warn('Provide custom TABBAR.HOVER_ITEM_COLOR!')
        }
        return defaultConfig.TABBAR.HOVER_ITEM_COLOR
    }

    get tabbarActiveItemColor() {
        if (customConfig.TABBAR.ACTIVE_ITEM_COLOR){
            return customConfig.TABBAR.ACTIVE_ITEM_COLOR
        } else {
            console.warn('Provide custom TABBAR.ACTIVE_ITEM_COLOR!')
        }
        return defaultConfig.TABBAR.ACTIVE_ITEM_COLOR
    }
    get tabbarItemDisabledColor() {
        if (customConfig.TABBAR.DISABLE_ITEM_COLOR){
            return customConfig.TABBAR.DISABLE_ITEM_COLOR
        } else {
            console.warn('Provide custom TABBAR.DISABLE_ITEM_COLOR!')
        }
        return defaultConfig.TABBAR.DISABLE_ITEM_COLOR
    }

    get tabbarMenuItems() {
        if (customConfig.TABBAR.TABBAR_ITEMS){
            return customConfig.TABBAR.TABBAR_ITEMS
        } else {
            console.warn('Provide custom TABBAR.TABBAR_ITEMS!')
        }
        return defaultConfig.TABBAR.TABBAR_ITEMS
    }

    get headerMainTitle() {
        if (customConfig.HEADER.TITLE){
            return customConfig.HEADER.TITLE
        } else {
            console.warn('Provide custom HEADER.TITLE!')
        }
        return defaultConfig.HEADER.TITLE
    }

    get headerBackButtonTitle() {
        if (customConfig.HEADER.BACK_TITLE){
            return customConfig.HEADER.BACK_TITLE
        } else {
            console.warn('Provide custom HEADER.BACK_TITLE!')
        }
        return defaultConfig.HEADER.BACK_TITLE
    }

    get headerBackgroundColor() {
        if (customConfig.HEADER.BACKGROUND_COLOR){
            return customConfig.HEADER.BACKGROUND_COLOR
        } else {
            console.warn('Provide custom HEADER.BACKGROUND_COLOR!')
        }
        return defaultConfig.HEADER.BACKGROUND_COLOR
    }

    get showAddressBlock() {
        if (customConfig.DEFAULT_ADDRESS_BLOCK){
            return customConfig.DEFAULT_ADDRESS_BLOCK
        } else {
            console.warn('Provide DEFAULT_ADDRESS_BLOCK!')
        }
        return defaultConfig.DEFAULT_ADDRESS_BLOCK
    }
}