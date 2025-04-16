// src/stores/stompStore.js
import { defineStore } from 'pinia'
import { Client } from '@stomp/stompjs'
import { ref } from 'vue'

export const useStompStore = defineStore('stomp', () => {
  const stompClient = ref(null)
  const connected = ref(false)
  const receivedMessages = ref([])

  const connect = (member) => {
    // member.value = member

    stompClient.value = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      connectHeaders: {},
      reconnectDelay: 5000,
      onConnect: () => {
        connected.value = true
        console.log('🔌 STOMP 연결됨')

        stompClient.value.subscribe(`/topic/notification/${member.idx}`, (msg) => {
          receivedMessages.value.push(msg.body)
        })
      },
      onStompError: (frame) => {
        console.error('❌ STOMP 오류:', frame)
      },
    })

    stompClient.value.activate()
  }

  // const disconnect = () => {
  //   if (stompClient.value && stompClient.value.active) {
  //     stompClient.value.deactivate()
  //     connected.value = false
  //     console.log('🔌 STOMP 연결 해제됨')
  //   }
  // }

  const sendApprove = (title,content,member) => {

    if (connected.value && stompClient.value) {
      const payload = JSON.stringify({
        member:member,
        title: title, 
        content:content,
      });

      stompClient.value.publish({
        destination: `/app/notification/approve/${member.idx}`,
        body: payload,
        headers: {
          'content-type': 'application/json', // 명시적 content-type (선택사항)
        },
      })
    } else {
      console.warn('❗ STOMP 연결되지 않음')
    }
  }

  return {
    stompClient,
    connected,
    receivedMessages,
    connect,
    sendApprove,
  }
})
