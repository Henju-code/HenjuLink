import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { Modal, ActivityIndicator } from 'react-native'

import StatusBarPage from '../../components/StatusBarPage'
import Menu from '../../components/Menu'
import ListItem from '../../components/ListItem'
import ModalLink from '../../components/ModalLink'

import {
    Container,
    Title,
    ListLinks,
    ContainerEmpty,
    WarningText
} from './styles'

import { getLinks, deleteLink } from '../../utils/storageLinks'

function MyLinks() {

    const isFocused = useIsFocused()

    const [links, setLinks] = useState([])
    const [data, setData] = useState({})
    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getLinksSaved() {
            const result = await getLinks('HenjuLinks')
            setLinks(result)
            setLoading(false)
        }

        getLinksSaved()
    }, [isFocused])

    function handleItem(item) {
        setData(item)
        setModalVisible(true)
    }

    async function handleDelete(id) {
        const result = await deleteLink(links, id)
        setLinks(result)
    }

    return (
        <Container>
            <StatusBarPage
                backgroundColor='#132742'
                barStyles='light-content'
            />

            <Menu />

            <Title> Meus Links </Title>

            {
                loading && (
                    <ContainerEmpty>
                        <ActivityIndicator 
                            color='#fff'
                            size={25}
                        />
                    </ContainerEmpty>
                )
            }

            {
                !loading && links.length === 0 && (
                    <ContainerEmpty>
                        <WarningText>
                            Você ainda não possui nenhum link :(
                        </WarningText>
                    </ContainerEmpty>
                )
            }

            <ListLinks
                data={links}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) =>
                    <ListItem
                        data={item}
                        selectedItem={handleItem}
                        deleteItem={handleDelete}
                    />
                }
                contentContainerStyle={{ paddingBottom: 22 }}
                showsVerticalScrollIndicator={false}
            />

            <Modal
                visible={modalVisible}
                transparent
                animationType='slide'
            >
                <ModalLink
                    onClose={() => setModalVisible(false)}
                    data={data}
                />
            </Modal>
        </Container>
    )
}

export default MyLinks