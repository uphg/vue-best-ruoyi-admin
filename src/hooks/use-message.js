import { useDialog, useMessage, useNotification } from 'naive-ui'

let messageInstance = null
let dialogInstance = null
let notificationInstance = null

export function useNaiveMessage() {
  if (!messageInstance) {
    messageInstance = useMessage()
  }
  return messageInstance
}

export function useNaiveDialog() {
  if (!dialogInstance) {
    dialogInstance = useDialog()
  }
  return dialogInstance
}

export function useNaiveNotification() {
  if (!notificationInstance) {
    notificationInstance = useNotification()
  }
  return notificationInstance
}

export default {
  useNaiveMessage,
  useNaiveDialog,
  useNaiveNotification,
}
