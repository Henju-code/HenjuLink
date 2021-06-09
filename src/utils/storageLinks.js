import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getLinks (key) {
    const myLinks = await AsyncStorage.getItem(key)

    let linkSaves = JSON.parse(myLinks) || []

    return linkSaves
}

export async function saveLink (key, newLink) {
    let linksStored = await getLinks(key)

    const hasLink = linksStored.some( link => link.id === newLink.id )

    if(hasLink){
        console.log('This link already exists!')
        return
    }

    linksStored.push(newLink)
    await AsyncStorage.setItem(key, JSON.stringify(linksStored))
    console.log('Success!')

}

export async function deleteLink (link, id) {
    let myLinks = link.filter( (item) => {
        return (item.id !== id)
    })

    await AsyncStorage.setItem('HenjuLinks', JSON.stringify(myLinks))

    console.log('Link deleted!')

    return myLinks
}