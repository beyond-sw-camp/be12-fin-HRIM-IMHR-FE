import axios from "axios";
import { defineStore } from "pinia";
import { list } from "postcss";

export const useCompanyStore = defineStore('company', {
  state: () => ({
    companys: []
  }),
  actions: {
    async list() {
      const response = await axios.post("/api/company/list");

      console.log("백 -> store ", response.data.data.content);
      this.companys = response.data.data.content;
      return this.companys;
    }
  }
});