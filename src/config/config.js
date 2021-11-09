import defaultConfig from './default-config.json'
import customConfig from './custom-config.json'
export class Config {
    tabbarParamsFromConfig(param){
        if (customConfig['TABBAR'][param]){
            return customConfig['TABBAR'][param]
        } else {
            console.warn('Provide custom TABBAR ' + param)
        }
        return defaultConfig['TABBAR'][param]
    }
    headerParamsFromConfig(param){
        if (customConfig['HEADER'][param]){
            return customConfig['HEADER'][param]
        } else {
            console.warn('Provide custom HEADER ' + param)
        }
        return defaultConfig['HEADER'][param]
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

// Components:
//     Containers (Страницы основных вкладок):
//         Settings
//         Swap
//         Transactions
//     Panels (Страницы панелов):
//         SelectAddressPanel
//         SelectTokenPanel
//         TransactionDetailsPanel
//     UIKIT:
//         AddressBlock - компонент тикера адреса
//         AddressInput - ввод адреса кошелька
//         AddressItem - компонент для списка адресов
//         AlarmBlock - уведомление о ошибке
//         AmountInput - ввод монеты
//         CustomSelect - кастомный селект
//         FeeInfoBlock - блок с инфой о fee, slippage, price impact и тд
//         Header - заголовок страницы
//         Icon - svg иконки
//         InfoView - компонент с позсказкой
//         Loader - загрузка
//         SwapButton - кнопка с несколькими состояниями свапа (swap,swap anyway,insufficient balance и тд)
//         Tabbar - таббар вкладок
//         TabbarItem - элементы вкладок таббара
//         TokenItem - компонент, внутри списка токенов
//         TokenSelect - кастомный селект для токена
//         TransactionDetails - детальная страница транзакций
//         TransactionItem - компонент, внутри списка транзакций