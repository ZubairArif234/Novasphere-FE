import { create } from "zustand";
import { devtools } from "zustand/middleware";
import custAxios, { attachToken } from "../configs/axiosConfig";
import {  toast } from 'sonner'
// ! this is just an example of how create stores with zustand
const store = (set) => ({
  loading: false,
  tasks:[],
  getAll: async (payload) => {
    try {
      set({ loading: true });
      attachToken()
      const res = await custAxios.get("/task",{params:payload});

      if (res) {
      
        set({ loading: false,tasks:res?.data?.data?.data });
        
        return true;
      }
      set({ loading: false });
    } catch (err) {
      console.log(err);
      set({ loading: false });
    }
  },

  create: async (payload) => {
    try {
      set({ loading: true });
      const res = await custAxios.post("/task", payload);

      if (res) {
          toast.success('Task created successfully')
        set({ loading: false });
        return true;
    }
    toast.success('Task created successfully')
      set({ loading: false });
    } catch (err) {
      console.log(err);
      toast.error(err?.response.data.message)
      set({ loading: false });
    }
  },
  
  update: async (payload,id) => {
    try {
      set({ loading: true });
      const res = await custAxios.patch(`/task/${id}`, payload);

      if (res) {
          toast.success('Task updated successfully')
        set({ loading: false });
        return true;
    }
    toast.success('Task updated successfully')
    set({ loading: false });
} catch (err) {
    console.log(err);
    toast.error(err?.response.data.message)
      set({ loading: false });
    }
  },

  deleteTask: async (id) => {
    try {
      set({ loading: true });
      const res = await custAxios.delete(`/task/${id}`);

      if (res) {
          toast.success('Task deleted successfully')
        set({ loading: false });
        return true;
    }
    toast.success('Task deleted successfully')
    set({ loading: false });
} catch (err) {
    console.log(err);
    toast.error(err?.response.data.message)
      set({ loading: false });
    }
  },
});

export const useTaskStore = create(
  devtools(store, {
    enabled: true,
    store: "task",
  })
);
