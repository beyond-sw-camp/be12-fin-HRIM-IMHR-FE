import { defineStore } from 'pinia';
import axios from 'axios';

export const useNotificationStore = defineStore('notification', {
    state: () => (
        {
            notifications:[],
        }),

    actions: {
        async getMyNotifications(page){
            const response =await axios("/api/notification/list",{
                params: { page: page }
            });
            if(this.notifications.length===0)
                this.notifications=response.data.data;
            else{
                this.notifications.push(...response.data.data);
            }
        },

        async isRead(idx){
            const response = await axios.post(`/api/notification/isRead/${idx}`);
        },

        async remove(index){
            const target = this.notifications[index];
            
            try {
                const response = await axios.delete(`/api/notification/remove/${target.idx}`);
                
                // 삭제 성공 시 리스트에서 제거
                this.notifications.splice(index, 1);
              } catch (error) {
                console.error("삭제 실패:", error);
                // 필요하면 사용자에게 에러 메시지 표시
              }
        },
    }
})