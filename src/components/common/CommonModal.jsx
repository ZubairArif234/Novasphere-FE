import { Modal } from '@mantine/core'
import React from 'react'

const CommonModal = ({opened,close ,title , content}) => {
  return (
    <Modal size={"lg"} opened={opened} onClose={close} title={title} centered>
  {content}
  </Modal>
  )
}

export default CommonModal