// src/stores/stompStore.js
import { defineStore } from 'pinia'
import { Client } from '@stomp/stompjs'
import { ref } from 'vue'
import { useNotificationStore } from "./useNotificationStore"

export const useStompStore = defineStore('stomp', () => {
  const stompClient = ref(null)
  const connected = ref(false)
  const receivedMessages = ref([])
  const NotificationStore = useNotificationStore();

  const connect = (member) => {
    // member.value = member
    console.log(member.idx)

    stompClient.value = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      connectHeaders: {},
      reconnectDelay: 5000,
      onConnect: () => {
        connected.value = true
        console.log('🔌 STOMP 연결됨')

        stompClient.value.subscribe(`/topic/notification/${member.idx}`, (msg) => {
          const data = JSON.parse(msg.body)
          NotificationStore.notifications.unshift(data)



          
          if (Notification.permission === 'default') {
            Notification.requestPermission().then((permission) => {
              if (permission === 'granted') {
                console.log("왜 안돼?")
                showNotification(data);
              } else {
                alert('알림 권한이 거부되었습니다.');
              }
            });
          } else if (Notification.permission === 'granted') {
            showNotification(data);
          } else if (Notification.permission === 'denied') {
            alert('알림 권한이 거부되었습니다.');
          }
          



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

  const sendApprove = (title,content,member,url) => {
    if (connected.value && stompClient.value) {
      
      const payload = JSON.stringify({
        member:member,
        title: title, 
        content:content,
        url:url,
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


  // window 알림
  const showNotification = (data) => {
    const notification = new Notification(data.title, {
      body: data.content,
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_5vmjPA2SvagWqCNABAcAPnIrcw7vp4zk4A&s',
      image: 'https://image.utoimage.com/preview/cp872722/2022/12/202212008555_206.jpg'
    });
  
    notification.addEventListener('click', () => {
      window.open(data.url);
    });
  };

  return {
    stompClient,
    connected,
    receivedMessages,
    connect,
    sendApprove,
  }
})
