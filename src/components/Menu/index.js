import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { ButtonMenu } from './styles'

function Menu () {
    const navigation = useNavigation()

    return(
        <ButtonMenu onPress={ () => navigation.openDrawer() } >
            <Feather 
                name='menu'
                color='#fff'
                size={40}
            />
        </ButtonMenu>
    )
}

export default Menu