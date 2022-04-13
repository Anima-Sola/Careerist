import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveDataToStore = async ( storageKey, value ) => {
    try {
        const jsonValue = JSON.stringify(value);
        //console.log('save ' + jsonValue);
        await AsyncStorage.setItem( storageKey, jsonValue );
    } catch (e) {
        console.log('Something goes wrong');
    }
}

export const getDataFromStore = async ( storageKey ) => {
    try {
        const jsonValue = await AsyncStorage.getItem( storageKey );
        //console.log('load' + jsonValue);
        return jsonValue != null ? JSON.parse( jsonValue ) : null;
    } catch(e) {
        console.log('Something goes wrong');
    }
}